import type { CssConfigField } from "./CssConfigField";

export interface CssConfig {
    css: {
        [key: string]: CssConfigField;
    };
}