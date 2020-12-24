import { AuthConfigService } from './config/auth-config.service';


export function init_app(authConfigService: AuthConfigService) {
    return () => authConfigService.initAuth().then((data) => {
        console.log(data);
    });
}