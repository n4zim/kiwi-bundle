import { Name, MultipleNamesByLanguage } from "dropin-recipes";
export declare type i18nStrings = {
    [name: string]: MultipleNamesByLanguage;
};
export declare const currentLanguage: import("dropin-recipes").LanguageSelector;
export declare function i18n(name: Name, count?: number, vars?: {}): string;
//# sourceMappingURL=i18n.d.ts.map