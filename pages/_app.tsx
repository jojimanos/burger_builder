import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
    
import 'styles/globals.css';
import "styles/instructions.css";

export default function App({ Component, pageProps }: any) {
    const router = useRouter();
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

        const userString = localStorage.getItem('user') as string
        const user = JSON.parse(JSON.stringify(userString))
        // Redirect to public paths if accessing the builder page and not logged in 
        const publicPaths = [`/account/login`, `/account/signup`];
        const path = url.split('?')[0];
        if (!user && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push({
                pathname: `/account/login`,
                query: { returnUrl: router.asPath }
            });
        } else {
            setAuthorized(true);
        }
        console.log(user)
    }

    console.log(authorized)

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