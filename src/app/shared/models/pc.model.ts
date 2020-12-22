import { Component } from '@angular/core';
import { ComponentType } from './component-type.model';
import { ComponentConfiguration } from './component-configuration.model';
import { Product } from './product.model';



export class PC {

    private _integratedComponents: Map<ComponentType, ComponentConfiguration> = new Map<ComponentType, ComponentConfiguration>();

    // wenn componenttype nicht inital dann null
    constructor(integratedComponents: Map<ComponentType, ComponentConfiguration>) {
        this._integratedComponents = integratedComponents;
    }

    /**
     * Getter integratedComponents
     * @return {Map<ComponentType, ComponentConfiguration> }
     */
    public get integratedComponents(): Map<ComponentType, ComponentConfiguration> {
        return this._integratedComponents;
    }

    

    public addProduct(componentType: ComponentType, selectedProduct: Product): void {
        const componentConfiguration: ComponentConfiguration = this.integratedComponents.get(componentType);
        componentConfiguration.addProduct(selectedProduct);
        // if(this.canAddProduct(componentType)) {
        // }
    }

    public canAddProduct(componentType: ComponentType): boolean {
        const componentConfiguration: ComponentConfiguration = this.integratedComponents.get(componentType);
        return componentConfiguration.canAddProduct();
    }

    

    calculateFinalPrice(): number {
        let sumPrice: number = 0;
        this.integratedComponents.forEach((componentConfiguration: ComponentConfiguration, componentType: ComponentType) => {
            sumPrice *= sumPrice + componentConfiguration.calculatePrice();
        });
        return sumPrice;
    }

    calculatePrice(componentType: ComponentType) {
        return this._integratedComponents.get(componentType).calculatePrice();
    }

}