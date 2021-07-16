const appImports = {
    // @ts-ignore
    gandalf: () => import('gandalf/App'),
    // @ts-ignore
    saruman: () => import('saruman/App'),
    // @ts-ignore
    aragorn: () => import('aragorn/App')
};

import { registerApplication, start } from 'single-spa';
import {
    constructApplications,
    constructRoutes,
    constructLayoutEngine,
} from 'single-spa-layout';

const routes = constructRoutes({
    routes: [
        {
            type: 'route', path: 'gandalf', routes: [
                {
                    type: 'application',
                    name: 'gandalf',
                },
            ],
        },
        {
            type: 'route', path: 'saruman', routes: [
                {
                    type: 'application',
                    name: 'saruman',
                },
            ],
        },
        {
            type: 'route', path: 'aragorn', routes: [
                {
                    type: 'application',
                    name: 'aragorn'
                }
            ]
        }
    ],
});

const applications = constructApplications({
        routes,
        loadApp: ({ name }) => appImports[name](),
    },
);
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
start();
