export declare type RecipeId = string;
export declare type CollectionId = string;
export declare type DocumentId = string;
export declare type Line = any;
export declare type Lines = Line[];
export declare class Request {
    static URL: string;
    private static request;
    static getDocument(recipe: RecipeId, document: DocumentId): Promise<any>;
    static getLines(recipe: RecipeId, collection: CollectionId, filters?: any): Promise<Lines>;
}
//# sourceMappingURL=DROPin.d.ts.map