import type { CssConfig } from "./CssConfig";
import type { FetchType } from "./FetchType";

export interface HttpFields {
    url: string,
    method: string,
    headers: any,
    params?: any,
    data?: any,
    type?: FetchType,
    css?: CssConfig
    pageSize?: number
}