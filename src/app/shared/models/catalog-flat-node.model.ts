/** Flat node with expandable and level information */
export interface CatalogFlatNode {
    expandable: boolean;
    id: number;
    parentID: number;
    name: string;
    nameLang:string;
    link: string;
    level: number;
  }