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
        } catch (error) {
            console.error('Error sending message: ', error);
        }
    };

    static formatTimestamp(timestamp: number) {
        return moment(timestamp).format('MM-DD HH:mm');
    }
}
