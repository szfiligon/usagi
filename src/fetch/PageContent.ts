import * as cheerio from 'cheerio'
import {PageReader} from "./PageReader.ts";
export class PageContent {
    async getAttributeOrTextFromHTML(htmlContent: string, selector?: string, attributeName?: string): Promise<string> {
        const $ = cheerio.load(htmlContent);
        let result = '';
        const element = $(selector);
        if (attributeName) {
            // 获取元素的属性内容
            result = element.attr(attributeName) || '';
        } else {
            // 获取元素的文本内容
            result = element.text() || '';
        }
        return result;
    }
}

// TEST FUNCTION
// const htmlContent = `
// <!DOCTYPE html>
// <html>
// <head>
//     <title>Example Page</title>
// </head>
// <body>
//     <h1 class="header">Hello, World!</h1>
// </body>
// </html>
// `;
// new PageContent().getAttributeOrTextFromHTML(htmlContent, 'h1', 'class').then(result => {
//     console.log(result);  // 打印 h1 元素的 class 属性内容
// });
// new PageContent().getAttributeOrTextFromHTML(htmlContent, 'h1').then(result => {
//     console.log(result);  // 打印 h1 元素的文本内容
// });

// const url: string = 'https://news.163.com/'
// new PageReader().read(url, true).then(html => {
//     new PageContent().getAttributeOrTextFromHTML(html, '#js_top_news > div.news_default_news.news_news_show > ul > li:nth-child(4) > div > div > p.current > a').then(result => {
//         console.log(result);  // 打印 h1 元素的文本内容
//     });
// })
