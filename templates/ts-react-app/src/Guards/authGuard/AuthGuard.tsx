import { Suspense, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { useAuth } from 'src/features/authentication';
import { UserAuthState, useUserAuthStore } from 'src/store/userAuth/userAuthStore';

export default function AuthGuard({ children }: { children: JSX.Element }) {
    try {
        const userSlice: UserAuthState = useUserAuthStore((state) => state.user);
        const setUserState = useUserAuthStore((state) => state.setUserState);
        const location = useLocation();
        const { loading, error, user, emailVerified, isAuthenticated, getTokens } = useAuth()
        const navigate = useNavigate()

        useEffect(() => {
            const prep = async () => {
                try {
                    const tokens = await getTokens();
                    const userSlice: UserAuthState = {
                        user: user,
                        userStatus: 'authenticated',
                        accessToken: tokens?.accessToken ?? null,
                        refreshToken: tokens?.refreshToken ?? null,
                        error: null,
                    };
                    setUserState(userSlice);
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