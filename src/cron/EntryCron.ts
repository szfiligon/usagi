import * as cron from "node-cron";
import type { BaseCron } from "./BaseCron.ts";
import { paths } from "../config/NormalRequestConfig.ts";
import { PageReader } from "../fetch/PageReader.ts";
import { RateUtil } from "../tool/RateUtil.ts";
import { NewsDb } from "../db/NewsDb.ts";
import type { NewsType } from "../constants/NewsType.ts";
import { HashUtil } from "../tool/HashUtil.ts";
import type { HttpFields } from "../constants/HttpFields.ts";
import { FetchType } from "../constants/FetchType.ts";
import { SlackUtil } from "../tool/SlackUtil.ts";

export class EntryCron implements BaseCron {
    /**
     * news database
     */
    newsDb: NewsDb;

    /**
     * rate map
     */
    map = new Map();

    /**
     * history record
     */
    records = new Set();

    constructor() {
        this.newsDb = new NewsDb();
    }

    task() {
        cron.schedule("*/1 * * * * *", async () => {
            for (const key in paths) {
                try {
                    const { http, rate, extract } = paths[key as keyof typeof paths];

                    // check time
                    if (RateUtil.illegalTime(rate, this.map.get(key))) {
                        continue;
                    }
                    const type = (http as HttpFields).type
                    if (type == FetchType.HTML) {
                        const data = await PageReader.fetchHTML(http as HttpFields)
                        this.doMsgSaveAndSlack(extract(data))
                    } else {
                        const data = await PageReader.fetchByConfig(http as HttpFields)
                        this.doMsgSaveAndSlack(extract(data))
                    }
                    this.map.set(key, Date.now());
                } catch (err) {
                    console.log("EntryCron, err: ", err);
                }
            }
        });
    }

    private async doMsgSaveAndSlack<T extends NewsType>(data: T[]): Promise<void> {
        if (!data || data.length === 0) {
            return;
        }
        const processedData = data
            .map((v) => {
                v.hashcode = HashUtil.hashcode(v.from + v.title);
                return v;
            })
            .filter((v) => !this.records.has(v.hashcode as string));

        // 将新的hashcode存入 record
        processedData.forEach(v => this.records.add(v.hashcode as string));

        if (processedData.length > 0) {
            this.save(processedData)
            this.slack(processedData)
        }
    }

    private async save<T extends NewsType>(data: T[]): Promise<void> {
        try {
            const insertResults = await this.newsDb.insertBulk(data);
            console.log('Bulk insert successful:', insertResults);
        } catch (error) {
            console.error('Bulk insert failed:', error);
        }
    }

    private async slack<T extends NewsType>(data: T[]): Promise<void> {
        if (!data || data.length === 0) {
            return;
        }
        data.forEach(v => {
            SlackUtil.sendMessage(v)
        })
    }
}
