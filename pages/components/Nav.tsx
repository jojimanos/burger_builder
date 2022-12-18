import { useState } from 'react';
import MediaQuery from 'react-responsive'
import Image from 'next/image';

import Link from 'next/link';
import { userService } from '../../services/user-service';

import Button from './button';

export default function Nav(emptyArray: any) {

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
            <MediaQuery maxWidth={640}>
                <div className="px-3 h-20">
                    <div className='flex justify-start'>
                        <button onClick={isActive}><Image alt='' src={'/burgerMenu.png'} height={50} width={50} />
                            <p>Menu</p></button>
                        {menuButton &&
                            (
                                <div className='grid grid-rows-2 px-2'>
                                    <button onClick={() => { emptyArray() }}>{Button("Reset")}</button>
                                    <a onClick={logout}>{Button("Logout")}</a>
                                </div>
                            )}
                    </div>
                </div>
            </MediaQuery>
            <MediaQuery minWidth={641}>
                <div className="px-3 h-7">
                    <div className='flex justify-end'>
                        <button className='px-2' onClick={() => { emptyArray() }}>{Button("Reset")}</button>
                        <div className='flex justify-start px-2' onClick={logout}>{Button("Logout")}</div>
                    </div>
                </div>
            </MediaQuery>
        </div>
    );
}