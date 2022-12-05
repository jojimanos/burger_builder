import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
    
import 'styles/globals.css';
import "styles/instructions.css";

import { userService } from "../services/user-service"

export default function App({ Component, pageProps }: any) {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // On initial load - run auth check 
        authCheck(router.asPath);

        // On route change start - hide page content by setting authorized to false  
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // On route change complete - run auth check 
        router.events.on('routeChangeComplete', authCheck)

        // Unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }

    }, []);

    function authCheck(url: any) {
        // Redirect to login page if accessing the builder page and not logged in 
        setUser(userService.userValue);
        const publicPaths = ['/account/login'];
        const path = url.split('?')[0];
        if (!userService.userValue && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push({
                pathname: '/account/login',
                query: { returnUrl: router.asPath }
            });
        } else {
            setAuthorized(true);
        }
    }

    return (
        <>
            <Head>
                <title>Burger Builder App</title>
                <meta name="Burger BUilder App" content="Build and taste your favourite burger!!!" />
            </Head>

            <div>
                {authorized &&
                    <Component {...pageProps} />
                }
            </div>
        </>
    );
}