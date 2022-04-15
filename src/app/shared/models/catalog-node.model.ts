export interface CatalogNode {
    id: number;
    parentID: number;
    name: string;
    nameLang: string;
    link: string;
    children?: CatalogNode[];
}