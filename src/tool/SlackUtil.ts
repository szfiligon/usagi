import moment from "moment";
import type { NewsType } from "../constants/NewsType";

const axios = require('axios');

/**
 * https://api.slack.com/apps/A04V5CWPQNP/incoming-webhooks?
 */
const webhookURL = 'https://hooks.slack.com/services/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';

export class SlackUtil {
    static async sendMessage(msg: NewsType): Promise<void> {
        try {
            const text = `>${SlackUtil.formatTimestamp(msg.time)} ${msg.from} \r\n*${msg.title}* \r\n${msg.content} <${msg.link}|---相关链接>`
            const response = await axios.post(webhookURL,  {text});
            console.log('Message sent: ', response.data);
        } catch (err: any) {
            console.error('Error sending message: ', err.message);
        }
    };

    static formatTimestamp(timestamp: number) {
        return moment(timestamp).format('MM-DD HH:mm');
    }
}

// SlackUtil.sendMessage({"title":"报告：预计LCD TV面板价格走势将持续趋稳","content":"CINNO Research报告显示，“国补”政策以及国内外大促活动带来的市场需求回暖好于预期，促使11月LCD TV面板价格全线止跌趋稳，进入12月，品牌商春节提前备货、国内补贴政策的延续以及美国调整对华关税等因素在短期内将维持需求回升；面板厂则减弱控产力度，上调稼动率以应对。在需求和供应相对平衡的情况下，预计面板价格走势将持续趋稳。","link":"https://news.10jqka.com.cn/20241208/c664280370.shtml","from":"同花顺","time":1733673122485,"hashcode":"0a902d66202e2db87c138e94c551b4f133f004f5f849544736a8be4b20fce5df"})
