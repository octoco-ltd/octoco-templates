import { Suspense, lazy, FC } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';
import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';
import SuspenseLoader from 'src/components/SuspenseLoader';
import pages from './routes';
import AuthGuard from 'src/Guards/authGuard/AuthGuard';
import Unverified from 'src/pages/Fallbacks/Status/Unverified/Unverified';

const Loader = (Component: FC) => (props: any) =>
(
    <Suspense fallback={<SuspenseLoader />}>
        <Component {...props} />
    </Suspense>
);

// Pages - NOT SURE ABOUT PWA AND LAZY LOADING
const Clients = Loader(lazy(() => import('src/pages/Clients/Clients')));
const Recommendations = Loader(lazy(() => import('src/pages/Recommendations/Recommendations')));
const Recipes = Loader(lazy(() => import('src/pages/Recipes/Recipes')));
const FieldAssessment = Loader(lazy(() => import('src/pages/FieldAssessment/FieldAssessment')));
const Quotes = Loader(lazy(() => import('src/pages/Quotes/Quotes')));
const PriceLists = Loader(lazy(() => import('src/pages/PriceLists/PriceLists')));
const Library = Loader(lazy(() => import('src/pages/Library/Library')));
const MyAccount = Loader(lazy(() => import('src/pages/MyAccount/MyAccount')));
const Register = Loader(lazy(() => import('src/pages/Register/Register')));
const Login = Loader(lazy(() => import('src/pages/Login/Login')));

// Status
const Status404 = Loader(lazy(() => import('src/pages/Fallbacks/Status/Status404/Status404')));
const Status500 = Loader(lazy(() => import('src/pages/Fallbacks/Status/Status500/Status500')));
const StatusComingSoon = Loader(lazy(() => import('src/pages/Fallbacks/Status/ComingSoon/ComingSoon')));
const StatusMaintenance = Loader(lazy(() => import('src/pages/Fallbacks/Status/Maintenance/Maintenance')));
const StatusSuccess = Loader(lazy(() => import('src/pages/Fallbacks/Status/Success/Success')));
const StatusFailure = Loader(lazy(() => import('src/pages/Fallbacks/Status/Failure/Failure')));
const StatusCancel = Loader(lazy(() => import('src/pages/Fallbacks/Status/Cancel/Cancel')));

const routes: RouteObject[] = [
    {
        path: '',
        element: <BaseLayout />,
        /**
        * All children within this element will NOT have a Sidebar and top Navbar
        * All children within this element does not need to be authenticated to access
        */
        children: [
            //#region Base
            {
                //Navigate to home when base routed to base path
                path: '/',
                element: <Navigate to={pages.clients.path} replace />,
            },
            //#endregion Base
            //#region Auth
            {
                //All authentication routes
                //No navbars are shown as the user is not logged in
                path: pages.auth.root,
                children: [
                    {
                        path: '',
                        element: <Login />,
                    },
                    {
                        path: pages.auth.login.name,
                        element: <Login />,
                    },
                    {
                        path: pages.auth.register.name,
                        element: <Register />,
                    },
                ]
            },
            //#endregion Auth
            //#region Status
            {
                //All status routes
                path: pages.status.root,
                children: [
                    {
                        path: '',
                        element: <Navigate to="404" replace />,
                    },
                    {
                        path: pages.status.unverified.name,
                        element: <Unverified />,
                    },
                    {
                        path: pages.status.status404.name,
                        element: <Status404 />,
                    },
                    {
                        path: pages.status.status500.name,
                        element: <Status500 />,
                    },
                    {
                        path: pages.status.statusMaintenance.name,
                        element: <StatusMaintenance />,
                    },
                    {
                        path: pages.status.statusComingSoon.name,
                        element: <StatusComingSoon />,
                    },
                    //TODO: Maybe make paths that shows status within the sidebars as well
                    {
                        path: pages.status.statusSuccess.name,
                        element: <StatusSuccess />,
                    },
                    {
                        path: pages.status.statusFailure.name,
                        element: <StatusFailure />,
                    },
                    {
                        path: pages.status.statusCancel.name,
                        element: <StatusCancel />,
                    },
                ],
            },
            //#endregion Status
            //#region NotFound
            {
                path: '*',
                element: <Status404 />,
            },
            //#endregion NotFound
        ],
    },
    {
        path: '',
        element: (
            /**
             * All children with this element will have a Sidebar and top Navbar
             * AuthGuard checks that the user is logged in before granting access to its children pages
             */
            <AuthGuard>
                <SidebarLayout />
            </AuthGuard>
        ),
        children: [
            //#region Base
            {
                path: '',
                element: <Navigate to={pages.clients.name} replace />,
            },
            //#endregion Base
            //#region clients
            {
                path: pages.clients.name,
                element: <Clients />,
            },
            //#endregion clients
            //#region recommendations
            {
                path: pages.recommendations.name,
                element: <Recommendations />,
            },
            //#endregion recommendations
            //#region recipes
            {
                path: pages.recipes.name,
                element: <Recipes />,
            },
            //#endregion recipes
            //#region fieldAssessment
            {
                path: pages.fieldAssessment.name,
                element: <FieldAssessment />,
            },
            //#endregion fieldAssessment
            //#region quotes
            {
                path: pages.quotes.name,
                element: <Quotes />,
            },
            //#endregion quotes
            //#region priceLists
            {
                path: pages.priceLists.name,
                element: <PriceLists />,
            },
            //#endregion priceLists
            //#region library
            {
                path: pages.library.name,
                element: <Library />,
            },
            //#endregion library
            //#region myAccount
            {
                path: pages.myAccount.name,
                element: <MyAccount />,
            },
            //#endregion myAccount
        ],
    },
];

export default routes;
