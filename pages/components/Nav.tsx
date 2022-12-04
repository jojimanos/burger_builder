import { useState } from 'react';
import MediaQuery from 'react-responsive'
import Image from 'next/image';

import Link from 'next/link';
import { userService } from '../../services/user-service';

import Button from './button';

import styles from '../../styles/Home.module.css'

export default function Nav(onClick: () => void, handleMouseOver: () => void, handleMouseOut: () => void, isHovering: boolean) {
    
    const [user, setUser] = useState(null);
    const [menuButton, setMenuButton] = useState(false)

    const isActive = () => {
        setMenuButton(!menuButton)
    }

    function logout() {
        userService.logout();
    }

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
                            </div>)}
                </MediaQuery>
                <MediaQuery minWidth={1024}>
                    <Link href="/">{Button("Reset")}</Link>
                    <div></div>
                    <a onClick={logout}>{Button("Logout")}</a>
                </MediaQuery>
            </div>
        </div>
    );
}