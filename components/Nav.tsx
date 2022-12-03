import { useState, useEffect } from 'react';
import MediaQuery from 'react-responsive'
import Image from 'next/image';

import Link from 'next/link';
import { userService } from '../services/user-service';

import Button from './button';

import styles from '../styles/Home.module.css'

export default function Nav(onClick: () => void, handleMouseOver: () => void, handleMouseOut: () => void, isHovering: boolean) {
    const [user, setUser] = useState(null);
    const [menuButton, setMenuButton] = useState(false)

    const isActive = () => {
        setMenuButton(!menuButton)
    }

    useEffect(() => {
        const subscription = userService.user.subscribe(x => setUser(x));
        return () => subscription.unsubscribe();
    }, []);

    function logout() {
        userService.logout();
    }

    // only show nav when logged in
    if (!user) return null;

    return (
        <div className='bg-amber-700'>
            <div className="grid grid-cols-4 gap-2 px-3 h-16 sm:h-7 place-items-center">
                <MediaQuery maxWidth={428}>
                    <button onClick={isActive}><Image alt='' src={'/burgerMenu.png'} height={50} width={50} /></button>
                    {menuButton &&
                        (
                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <Link href="/">{Button("Reset")}</Link>
                                    <a onClick={logout}>{Button("Logout")}</a>
                                </div>
                                <div className='grid place-items-end'><button className={styles.neonText} onClick={onClick}>?</button></div>
                            </div>)}
                </MediaQuery>
                <MediaQuery minWidth={1024}>
                    <Link href="/">{Button("Reset")}</Link>
                    <div></div>
                    <a onClick={logout}>{Button("Logout")}</a>
                    <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}><button className={styles.neonText} onClick={onClick}>?</button></div>
                </MediaQuery>
            </div>
        </div>
    );
}