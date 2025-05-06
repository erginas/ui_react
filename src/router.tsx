import {createBrowserRouter, Outlet} from 'react-router-dom';
import {BaseLayout} from './common/components/BaseLayout';
import {Unauthorized} from './common/pages/Unauthorized';
import {NotFound} from './common/pages/NotFound';
import {ProtectedRoute} from './common/components/ProtectedRoute';
import UserRoutes from "./modules/User/router.tsx";
import ProductRoutes from "./modules/ex/Product/router.tsx";
import KisiRoutes from "./modules/ex/Kisiler/router.tsx";
import {LoginPage} from "./modules/auth/pages/LoginPage.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <BaseLayout>
                <Outlet/>
            </BaseLayout>
        ),
        children: [
            {
                path: 'user/*',
                element: (
                    <ProtectedRoute allowedRoles={['admin', 'viewer']}>
                        <UserRoutes/>
                    </ProtectedRoute>
                ),
            },
            {
                path: 'product/*',
                element: (
                    <ProtectedRoute allowedRoles={['admin']}>
                        <ProductRoutes/>
                    </ProtectedRoute>
                ),
            },
            {
                path: 'kisi/*',
                element: (
                    <ProtectedRoute allowedRoles={['admin']}>
                        <KisiRoutes/>
                    </ProtectedRoute>
                ),
            },
            {path: 'unauthorized', element: <Unauthorized/>},
            {path: '*', element: <NotFound/>},
        ],
    },
    {
        path: '/login',
        element: <LoginPage/>,
    },
]);
