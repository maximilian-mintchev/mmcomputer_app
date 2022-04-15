import { Product } from './product.model';
import { PaginationResponseParams } from "./pagination-response-params.model";

export class ProductPage extends PaginationResponseParams {

    private _products: Array<Product>;

    

    /**
     * Getter products
     * @return {Array<Product>}
     */
	public get products(): Array<Product> {
		return this._products;
	}

    /**
     * Setter products
     * @param {Array<Product>} value
     */
	public set products(value: Array<Product>) {
		this._products = value;
	}



	
  

	



}