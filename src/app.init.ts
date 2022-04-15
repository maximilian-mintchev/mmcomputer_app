import { CatalogNode } from './app/shared/models/catalog-node.model';
import { ShopService } from './app/views/shop/shop.service';
import { CloudService } from 'app/shared/services/cloud.service';
import { AuthConfigService } from './config/auth-config.service';


export function init_app(authConfigService: AuthConfigService) {
    return () => authConfigService.initAuth().then((data) => {
        console.log(data);
    });
}

export function init_catalog(cloudService: CloudService, shopService: ShopService) {
        return () => new Promise((resolve, reject) => {
            resolve(true);
            // cloudService.getCatalog().subscribe((catalog: CatalogNode[]) => {
            //     console.log('Catalog Data');
            //     // console.log(data);
            //     // shopService.catalog$.next(catalog);
            //     shopService.catalog = catalog;
            // })
        })
}