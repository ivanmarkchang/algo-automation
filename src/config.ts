import { AlgoConfig } from './types';

export const config = {
    api: {
        baseUrl: 'https://betaapi.avomd.io/api',
        endpoints: {
            signin: '/v2/users/signin/',
            modules: '/v1/modules/'
        }
    },
    defaults: {
        algo: {
            name: "test name",
            description: "test description",
            team: 1321,
            module_sources: [],
            permission_type: "can_view"
        } as AlgoConfig
    }
};