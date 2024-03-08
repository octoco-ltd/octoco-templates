import { Suspense, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { useAuth } from 'src/features/authentication';
import { persistAuth } from 'src/features/authentication/utils/persistAuth';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { IUserSlice } from 'src/store/user/userSlice.contracts';

/**
 * A guard component that handles authentication and authorization logic.
 * 
 * @param children - The child elements to render if the user is authenticated and authorized.
 * @returns The child elements if the user is authenticated and authorized, otherwise it redirects to the appropriate page.
 */
export default function AuthGuard({ children }: { children: JSX.Element }) {
    try {
        const userSlice: IUserSlice = useAppSelector((state) => state.user);
        const location = useLocation();
        const { loading, error, user, emailVerified, isAuthenticated, getTokens } = useAuth()
        const navigate = useNavigate()
        const dispatch = useAppDispatch()

        useEffect(() => {
            const prep = async () => {
                try {
                    const tokens = await getTokens()
                    const userSlice: IUserSlice = {
                        user: user,
                        status: 'authenticated',
                        accessToken: tokens?.accessToken ?? null,
                        refreshToken: tokens?.refreshToken ?? null,
                        error: null,
                    }
                    dispatch(persistAuth({ userAuth: userSlice }))
                } catch (error) {
                    console.log(error)
                    toast.error(
                        'There has been an error getting authentication details. Please try logging in',
                    );
                    navigate('/auth/login')
                }
            };
            if (!loading && user) {
                prep();
            }

            if (error) {
                console.log(error)
                toast.error(
                    'There has been an error getting authentication details. Please try logging in',
                );
                navigate('/auth/login')
            }
        }, [user, loading, error]);

        if (loading || loading) {
            return <Suspense fallback={<SuspenseLoader />}>
                <SuspenseLoader />
            </Suspense>
        }

        if (!isAuthenticated && !user && !loading && !loading) {
            // Redirect users to the login page, but save the current location they were
            // trying to go to when they were redirected. This allows us to send them
            // along to that page after they login, which is a nicer user experience
            // than dropping them off on the home page.
            if (!userSlice || !userSlice?.user) {
                return (<Navigate to='/auth/login' state={{ from: location }} replace />);
            }
        }

        if ((!loading || !loading) && !emailVerified) {
            return (<Navigate to='/status/unverified' state={{ from: location }} replace />);
        }
    } catch (error) {
        //Route to page if anything failed here
        return (<Navigate to='/status/500' replace />);
    }


    return children;
};