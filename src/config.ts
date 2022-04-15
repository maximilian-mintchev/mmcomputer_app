export const config = {
  apiUrl: 'http://localhost:9090',
  authRoles: {
    // superAdmin: ['app-super-admin','offline_access', 'uma_authorization'],
    // admin: ['app-super-admin', 'app-admin'],
    // mitarbeiter: ['app-super-admin', 'app-admin', 'app-mitarbeiter'],
    // business_user: ['app-super-admin', 'app-admin', 'app-mitarbeiter','app-business-user'],
    // user: ['app-super-admin', 'app-admin', 'app-mitarbeiter','app-user']

    superAdmin: ['app-super-admin', 'app-admin', 'app-mitarbeiter', 'app-user', 'app-business-user', 'offline_access', 'uma_authorization'],
    admin: ['app-admin', 'app-mitarbeiter', 'app-business-user', 'app-user', 'offline_access', 'uma_authorization'],
    mitarbeiter: ['app-mitarbeiter', 'app-user', 'app-business-user', 'offline_access', 'uma_authorization'],
    business_user: ['app-business-user', 'offline_access', 'uma_authorization'],
    user: ['app-user', 'offline_access', 'uma_authorization']
    // sa: ['SA'], // Only Super Admin has access
    // admin: ['SA', 'Admin'], // Only SA & Admin has access
    // editor: ['SA', 'Admin', 'Editor'], // Only SA & Admin & Editor has access
    // user: ['SA', 'Admin', 'Editor', 'User'], // Only SA & Admin & Editor & User has access
    // guest: ['SA', 'Admin', 'Editor', 'User', 'Guest'] // Everyone has access
  }
}