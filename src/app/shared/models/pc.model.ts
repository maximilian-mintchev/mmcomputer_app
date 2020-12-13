import { ComponentType } from './component-type.model';
import { Component } from './component.model';
import { Product } from './product.model';
export class PC {
    //CpU Type
    // Product

    private _CPU: Component<ComponentType.CPU>;
    private _GraphicsCards: Component<ComponentType.GraphicsCard>
    private _SSD: Component<ComponentType.SSD>;
    private _HDD: Component<ComponentType.HDD>;
    private _Mainboard: Component<ComponentType.Mainboard>;
    private _RAM: Component<ComponentType.RAM>;
    private _Soundcard: Component<ComponentType.Soundcard>;
    private _Networkcard: Component<ComponentType.Networkcard>;
    private _Mouse: Component<ComponentType.Mouse>;
    private _OperatingSystem: Component<ComponentType.OperatingSystem>;
    private _Software: Component<ComponentType.Software>;


    


}