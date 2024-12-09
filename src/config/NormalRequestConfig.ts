import { FetchType } from "../constants/FetchType";
import type { NewsType } from "../constants/NewsType";
import { Cookies } from "./Cookies";

export const paths = {
    cailianshe: {
        /**
         * https://www.cls.cn/telegraph
         */
        http: {
            url: 'https://www.cls.cn/nodeapi/updateTelegraphList',
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'en,en-GB;q=0.9,en-US;q=0.8,zh-CN;q=0.7,zh;q=0.6',
                'Connection': 'keep-alive',
                'Content-Type': 'application/json;charset=utf-8',
                'Cookie': 'HWWAFSESID=eea9f16f4b3d2011e5b; HWWAFSESTIME=1733147370006; Hm_lvt_fa5455bb5e9f0f260c32a1d45603ba3e=1733147376; HMACCOUNT=74AA8C3F1FDD5CBB; hasTelegraphNotification=on; hasTelegraphRemind=on; hasTelegraphSound=on; vipNotificationState=on; Hm_lpvt_fa5455bb5e9f0f260c32a1d45603ba3e=1733147450; tfstk=f4CSt32W10mWYeyzC2U2cst_glRCOMNZA2TdSwhrJQd-vDQ90_Re4wKCdnQOUBzlapdC-gIBKzxevHsFJTz4_57lrBApAlPa_xDfalfWvDRKLp8irlra_Sy0eBn7bg7oDtmX-nLJyYK8lEL67Bn-wMKvHFLZ2BIp9rTv8ekKepKRkSLpDHdp9MQxgynX88TdPr5iXdexJz7WcXhsoU9Jz5xj9XCXPZtOyycK9sTWF6Y_InxyU9QMI_7QOjAP5tdv7aVSGCQJ5g-VX5hXMZ7AYdX0xfJcc69dwL0KeZ1BVdCJh2lP5QYdvp60ff8Wat91NT4nDaIwVOdl8VZPld6XIEpxRYdPQN5HB_FSjnJMRg-VX5hXMpIrrf-6qTkIldcBlhzblvDHsMllWXguVyJJoUFalrijKLLDlhzblvDHeEYRQrajcvf..',
                'If-None-Match': 'W/"482-EnYQb0cUuxP5B9ypx5xca3Z3zrk"',
                'Referer': 'https://www.cls.cn/telegraph',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0',
                'sec-ch-ua': '"Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"'
            },
            params: {
                app: 'CailianpressWeb',
                hasFirstVipArticle: 1,
                lastTime: Math.floor(Date.now() / 1000) - 10,
                os: 'web',
                rn: '20',
                sv: '8.4.6',
                sign: 'c85ab0734936a30f71386a31ba5a93eb'
            }
        },
        rate: {
            open: true,
            unit: 'seconds',
            time: 600
        },
        extract: (data: any) : NewsType[] => {
            try {
                return data.vipGlobal.map((v: any) => {
                    return {
                        title: v.title,
                        content: v.brief,
                        link: v.jump_url,
                        from: '财联社',
                        time: Date.now()
                    }
                })
            } catch (err) {
                console.log("Data extract error\r\n: ", err, "\r\n", data, "\r\n")
                return []
            }
        }
    },
    caixin_finance: {
        /**
         * https://finance.caixin.com/
         */
        http: {
            url: 'https://finance.caixin.com/',
            method: 'GET',
            headers: {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'accept-language': 'en,en-GB;q=0.9,en-US;q=0.8,zh-CN;q=0.7,zh;q=0.6',
                'cache-control': 'max-age=0',
                'cookie': 'ADVC=3d973a5a38f927; ADVS=3d973a5a38f927; ASL=20065,0000z,78e5b764; originReferrer=bing; ENTITY_ID=; CX_FROM=null; GUID=1048658342; T_GUID=1733625048053; GID30=1048658342; point=1733673599000; FROM_CHINA=true; gr_user_id=02cd0a65-f08a-4c64-8ef1-09ffb5f4fd49; 872f3eaac31f373e_gr_session_id=2e47fd0d-2d6d-4862-acda-4615bfcc353e; _gid=GA1.2.1259201910.1733625049; 872f3eaac31f373e_gr_session_id_sent_vst=2e47fd0d-2d6d-4862-acda-4615bfcc353e; ENTITY_COUNT=4; lastTime=1733625085047; firstTime=1733625085047; _ga_9L875JSJLT=GS1.1.1733625048.1.1.1733625085.0.0.0; _ga=GA1.2.432925088.1733625048',
                'priority': 'u=0, i',
                'referer': 'https://economy.caixin.com/',
                'sec-ch-ua': '"Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'same-site',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': '1',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0'
            },
            type: FetchType.HTML,
            css: {
                title: {
                    selector: '#listArticle > div:nth-child({order}) > h4 > a'
                },
                link: {
                    selector: '#listArticle > div:nth-child({order}) > h4 > a',
                    attr: 'href'
                },
                content: {
                    selector: '#listArticle > div:nth-child({order}) > p'
                }
            }
        },
        rate: {
            open: true,
            unit: 'seconds',
            time: 600
        },
        extract: (data: any[]) => {
            try {
                return data.map((v: any) => {
                    return {
                        title: v.title,
                        content: v.content,
                        link: v.link,
                        from: '财新网-金融',
                        time: Date.now()
                    }
                })
            } catch (err) {
                console.log("Data extract error\r\n: ", err, "\r\n", data, "\r\n")
                return []
            }
        }
    },
    caixin_economy: {
        /**
         * https://economy.caixin.com/
         */
        http: {
            url: 'https://economy.caixin.com/',
            method: 'GET',
            headers: {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'accept-language': 'en,en-GB;q=0.9,en-US;q=0.8,zh-CN;q=0.7,zh;q=0.6',
                'cache-control': 'max-age=0',
                'cookie': 'ADVC=3d973a5a38f927; ADVS=3d973a5a38f927; ASL=20065,0000z,78e5b764; originReferrer=bing; ENTITY_ID=; CX_FROM=null; GUID=1048658342; T_GUID=1733625048053; GID30=1048658342; point=1733673599000; FROM_CHINA=true; gr_user_id=02cd0a65-f08a-4c64-8ef1-09ffb5f4fd49; 872f3eaac31f373e_gr_session_id=2e47fd0d-2d6d-4862-acda-4615bfcc353e; _gid=GA1.2.1259201910.1733625049; 872f3eaac31f373e_gr_session_id_sent_vst=2e47fd0d-2d6d-4862-acda-4615bfcc353e; ENTITY_COUNT=4; lastTime=1733625085047; firstTime=1733625085047; _ga_9L875JSJLT=GS1.1.1733625048.1.1.1733625085.0.0.0; _ga=GA1.2.432925088.1733625048',
                'priority': 'u=0, i',
                'referer': 'https://economy.caixin.com/',
                'sec-ch-ua': '"Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'same-site',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': '1',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0'
            },
            type: FetchType.HTML,
            css: {
                title: {
                    selector: '#listArticle > div:nth-child({order}) > h4 > a'
                },
                link: {
                    selector: '#listArticle > div:nth-child({order}) > h4 > a',
                    attr: 'href'
                },
                content: {
                    selector: '#listArticle > div:nth-child({order}) > p'
                }
            }
        },
        rate: {
            open: true,
            unit: 'seconds',
            time: 600
        },
        extract: (data: any[]) => {
            try {
                return data.map((v: any) => {
                    return {
                        title: v.title,
                        content: v.content,
                        link: v.link,
                        from: '财新网-经济',
                        time: Date.now()
                    }
                })
            } catch (err) {
                console.log("Data extract error\r\n: ", err, "\r\n", data, "\r\n")
                return []
            }
        }
    },
    tonghuashun: {
        /**
         * https://news.10jqka.com.cn/realtimenews.html
         */
        http: {
            url: 'https://news.10jqka.com.cn/tapp/news/push/stock/?page=1&tag=&track=website&pagesize=10',
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'Accept-Language': 'en,en-GB;q=0.9,en-US;q=0.8,zh-CN;q=0.7,zh;q=0.6',
                'Connection': 'keep-alive',
                'Cookie': 'Hm_lvt_722143063e4892925903024537075d0d=1733629908; HMACCOUNT=74AA8C3F1FDD5CBB; Hm_lvt_929f8b362150b1f77b477230541dbbc2=1733629908; Hm_lvt_78c58f01938e4d85eaf619eae71b4ed1=1733629908; log=; Hm_lpvt_722143063e4892925903024537075d0d=1733636424; Hm_lpvt_929f8b362150b1f77b477230541dbbc2=1733636424; Hm_lpvt_78c58f01938e4d85eaf619eae71b4ed1=1733636424; v=A5FeJ8FZkvU2zf7h0lliVRGYoJYu_gVwr3KphHMmjdh3Gr9Iu04VQD_CuVEA',
                'Referer': 'https://news.10jqka.com.cn/realtimenews.html',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0',
                'X-Requested-With': 'XMLHttpRequest',
                'hexin-v': 'A5FeJ8FZkvU2zf7h0lliVRGYoJYu_gVwr3KphHMmjdh3Gr9Iu04VQD_CuVEA',
                'sec-ch-ua': '"Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"'
              },
            type: FetchType.NORMAL,
        },
        rate: {
            open: true,
            unit: 'seconds',
            time: 10
        },
        extract: (data: any) => {
            try {
                return data.data.list.map((v: any) => {
                    return {
                        title: v.title,
                        content: v.digest,
                        link: v.url,
                        from: '同花顺',
                        time: Date.now()
                    }
                })
            } catch (err) {
                console.log("Data extract error\r\n: ", err, "\r\n", data, "\r\n")
                return []
            }
        }
    }
};