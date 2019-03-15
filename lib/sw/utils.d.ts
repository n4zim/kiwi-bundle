export declare const log: (title: string, ...args: any) => void;
export declare const getSplitedPath: (request: string) => string[];
export declare const isRessourceAccepted: (splitedPath: string[]) => boolean;
export declare const convertRequestToRootDocument: (request: Request) => Request;
export declare const cleanCache: (cache: Cache, splitedPath: string[]) => void;
