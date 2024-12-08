import * as cron from "node-cron";
import {PageReader} from "../fetch/PageReader.ts";
import {PageContent} from "../fetch/PageContent.ts";
import type { BaseCron } from "./BaseCron.ts";

export class PathRequestCron implements BaseCron {
    task() {
        cron.schedule('*/5 * * * * *', () => {
            console.log('Running scheduled task...');
        });
    }
}
