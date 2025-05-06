import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from '../hooks/useAuth';

interface PrivateRouteProps {
    allowedRoles?: string[];
}

export const PrivateRoute = ({allowedRoles}: PrivateRouteProps) => {
    const {user} = useAuth();

    if (!user) {
        return <Navigate to="/login" replace/>;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace/>;
    }

    return <Outlet/>;
};
