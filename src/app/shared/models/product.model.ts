import { ComponentType } from './component-type.model';
export class Product {
  // public _id: string;
  // public name: string;
  // public description?: string;
  // public category?: string;
  // public tags?: string[];
  // public price: {
  //   sale: number,
  //   previous?: number
  // };
  // public ratings?: {
  //   rating: number,
  //   ratingCount: number
  // };
  // public features?: string[];
  // public photo?: string;
  // public gallery?: string[];
  // public badge?: { text: string, color?: string };
  public artikelNummer: number;
  public name: string;
  public beschreibung: string;
  public preis: number;
  public produktGruppe: string;
  public hersteller: string;
  public kalkulationsPreis: number;
  public herstellerNummer: string;
  public ean: number;
  public zusatzText: string;
  public copID: number;
  public photo?: string;
  public gallery?: string[];
}
