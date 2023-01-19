import { useState } from 'react';
import MediaQuery from 'react-responsive'
import Image from 'next/image';

import {signOut} from 'firebase/auth';
import { auth } from '../../firebaseConfig';

import Button from './button';
import { useRouter } from 'next/router';

export default function Nav(emptyArray: any, displayUser: any, setViewOrders: any, viewOrders: boolean) {

    const [user, setUser] = useState(null);
    const [menuButton, setMenuButton] = useState(false)
    const [error, setError] = useState('')

    const isActive = () => {
        setMenuButton(!menuButton)
    }

    const router = useRouter()

    const logout= async () => {
        try {
       await signOut(auth);
    localStorage.removeItem('user');
    router.push('/account/login')
        }
        catch {
            setError("Unable to logout")
        }
    }

    return (
        <div className='bg-amber-700'>
            <MediaQuery maxWidth={640}>
                <div className="px-3 h-auto grid grid-cols-4">
                    <div className='flex justify-start col-span-1'>
                        <button onClick={isActive}><Image alt='' src={'/burgerMenu.png'} height={50} width={50} />
                            <p>Menu</p></button>
                            </div>
                            <div>
                        {menuButton &&
                            (
                                <div className='grid grid-rows-3 col-span-1 px-2'>
                                    <div onClick={() => {setViewOrders(!viewOrders)}}>{Button("Orders")}</div>
                                    <div onClick={() => { emptyArray() }}>{Button("Reset")}</div>
                                    <div onClick={logout}>{Button("Logout")}</div>
                                </div>
                            )}
                            </div>
                    <div className='col-span-2'>Welcome {displayUser.email}. Ready for a superior burger experience?</div>
                </div>
            </MediaQuery>
            <MediaQuery minWidth={641}>
                <div className="px-3 h-auto grid grid-cols-2">
                    <div>Welcome {displayUser.email}. Ready for a superior burger experience?</div>
                    <div className='flex justify-end'>
                        <div onClick={() => {setViewOrders(!viewOrders)}} className='px-2'>{Button("Orders")}</div>
                        <button className='px-2' onClick={() => { emptyArray() }}>{Button("Reset")}</button>
                        <div className='flex justify-start px-2' onClick={logout}>{Button("Logout")}</div>
                    </div>
                </div>
            </MediaQuery>
        </div>
    );
}