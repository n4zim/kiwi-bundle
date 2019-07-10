declare type stringsFunction = (language: string, count: number, vars: object) => string;
declare type Languages = {
    [language: string]: string | stringsFunction;
};
export default function stringsByLanguage(languages: Languages): stringsFunction;
export {};
//# sourceMappingURL=stringsByLanguage.d.ts.map