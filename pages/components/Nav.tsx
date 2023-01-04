import { useState } from 'react';
import MediaQuery from 'react-responsive'
import Image from 'next/image';

import {signOut} from 'firebase/auth';
import { auth } from '../../firebaseConfig';

import Button from './button';
import { useRouter } from 'next/router';

export default function Nav(emptyArray: any, displayUser: any) {

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
                <div className="px-3 h-20 grid grid-cols-3">
                    <div className='flex justify-start col-span-1'>
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
                    <div className='col-span-2'>Welcome {displayUser.email}. Ready for a superior burger experience?</div>
                </div>
            </MediaQuery>
            <MediaQuery minWidth={641}>
                <div className="px-3 h-7 grid grid-cols-2">
                    <div>Welcome {displayUser.email}. Ready for a superior burger experience?</div>
                    <div className='flex justify-end'>
                        <button className='px-2' onClick={() => { emptyArray() }}>{Button("Reset")}</button>
                        <div className='flex justify-start px-2' onClick={logout}>{Button("Logout")}</div>
                    </div>
                </div>
            </MediaQuery>
        </div>
    );
}