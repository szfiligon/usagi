import puppeteer from 'puppeteer-core'
import axios, { HttpStatusCode, type AxiosRequestConfig } from 'axios'
import type { HttpFields } from '../constants/HttpFields.ts'
; import * as cheerio from 'cheerio'
import type { CssConfig } from '../constants/CssConfig.ts';

export class PageReader {
    static async fetchHTML(http: HttpFields): Promise<any[]> {
        try {
            const { css, pageSize } = http
            if (!css) { 
                throw new Error('CSS configuration is missing'); 
            }
            const html = await this.fetchByConfig(http);
            const $ = cheerio.load(html);
            const elements: any[] = [];

            for (let order = 1; order <= (pageSize || 10); order++) {
                const elementData: any = {};

                for (const [key, field] of Object.entries(css)) {
                    const selector = field.selector.replace('{order}', order.toString());
                    const value = field.attr ? $(selector).attr(field.attr) : $(selector).text();
                    elementData[key] = value;
                }
                elements.push(elementData);
            }
            return elements;
        } catch (error: any) {
            console.error(`There was a problem with the fetch operation: ${error.message}`);
            return [];
        }
    }

    static async fetchHTMLByChrome(url: string): Promise<string> {
        let browser;
        try {
            browser = await puppeteer.launch({
                executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
            });
            const page = await browser.newPage();
            await page.goto(url, { waitUntil: 'networkidle2' });
            return await page.content();
        } finally {
            browser && await browser.close();
        }
    }

    static async fetchByConfig(http: HttpFields) {
        const { url, method, headers, params, data } = http
        console.log('Fetching url: ', url)
        const config: AxiosRequestConfig = { url: url, method: method, headers: headers, };
        if (method === 'GET' && params) {
            config.params = params;
        }
        if (method === 'POST' && data) {
            config.data = data;
        }
        try {
            const response = await axios(config);
            if (response.status != HttpStatusCode.Ok) {
                console.error(`Request failed, msg: `, JSON.stringify(response));
            }
            return response.data
        } catch (error) {
            console.error(`Error with ${method} request:`, error);
        }
    }
}

// TEST FUNCTION
// new PageReader().fetchHTMLByChrome("https://xinsheng.huawei.com/next/index/#/home").then(r => console.log(r))
// new PageReader().fetchHTML("https://www.cls.cn/depth?id=1000").then(r => console.log(r))
// import { paths } from '../config/NormalRequestConfig.ts'
// new PageReader().fetchByConfig(paths.codehub.http).then(r => console.log(r))