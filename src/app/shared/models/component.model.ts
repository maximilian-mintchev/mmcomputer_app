import { Product } from './product.model';
import { ComponentType } from './component-type.model';
export class Component<ComponentType> {
    componentType: ComponentType
    product: Product;

    constructor(componentType: ComponentType, product: Product) {
        this.componentType = componentType;
        this.product = product;
    }

}