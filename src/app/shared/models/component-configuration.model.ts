import { Product } from './product.model';
import { ComponentType } from './component-type.model';
export class ComponentConfiguration {
    private selectedProducts: Product[];
    private readonly _componentName: string;
    private readonly minimumRequired: number;
    private readonly maximumAllowed: number;
    private readonly preSelection: Product[];
    private readonly _changeProductText: string;
    private _iconName: string;

	constructor( $componentName: string, $selectedProducts: Product[] , $minimumRequired: number, $maximumAllowed: number, $preSelection: Product[], $changeProductText: string, $iconName: string) {
        this._componentName = $componentName;
        this.selectedProducts = $selectedProducts;
		this.minimumRequired = $minimumRequired;
		this.maximumAllowed = $maximumAllowed;
        this.preSelection = $preSelection;
        this._changeProductText = $changeProductText;
        this._iconName = $iconName;
    }

    
    addProduct(product: Product): void {
        this.$selectedProducts.push();
    }

    canAddProduct(): boolean {
        if(this.selectedProducts.length < this.maximumAllowed) {
            return true;
        } else {
            return false;
        }
    }

    calculatePrice():number {
        let sumPrice = 0;
        this.selectedProducts.forEach(product => {
            sumPrice += sumPrice + product.price.sale;
        });
        return sumPrice;
    }

    /**
     * Getter $selectedProducts
     * @return {Product[] }
     */
	public get $selectedProducts(): Product[]  {
		return this.selectedProducts;
	}

    /**
     * Getter $minimumRequired
     * @return {number}
     */
	public get $minimumRequired(): number {
		return this.minimumRequired;
	}

    /**
     * Getter $maximumAllowed
     * @return {number}
     */
	public get $maximumAllowed(): number {
		return this.maximumAllowed;
	}

    /**
     * Getter $preSelection
     * @return {Product[] }
     */
	public get $preSelection(): Product[]  {
		return this.preSelection;
	}

    public get $componentName(): string  {
		return this._componentName;
	}

    public get $changeProductText(): string  {
		return this._changeProductText;
    }
    
    public get $iconName(): string  {
		return this._iconName;
	}
    /**
     * Setter $selectedProducts
     * @param {Product[] } value
     */
	public set $selectedProducts(value: Product[] ) {
		this.selectedProducts = value;
    }
	

}