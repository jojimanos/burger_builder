import { useRouter } from 'next/router';
import { useState } from 'react';
import Image from 'next/image';
import MediaQuery from 'react-responsive';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

// Services
import Link from 'next/link';


export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [user, setUser] = useState({});

  // Show consoles error on top of the screen
  const [error, setError] = useState("")

  // Error disappears after 5 secs  
  setTimeout(() => { setError("") }, 5000)

  const router = useRouter();

  const onSubmit = async (e: any) => {
    e.preventDefault()

try {
  const user = await signInWithEmailAndPassword(auth, email, password);
console.log(user)
const userId = localStorage.setItem("user", JSON.stringify(user))
} catch {
setError('There was an error when signing in.')
} 
     router.push('/')
  };

  return (
    <div>
      <div className='bg-stone-200 min-h-screen max-h-max'>
        <h1 className='text-center p-2 text-3xl bg-amber-700'>Burger Builder App</h1>
        <MediaQuery maxWidth={640}>
          <div className='grid grid-cols-1'>
            <div className="grid place-items-center text-center grid-row-7 py-3 px-8 gap-3">
              <form className='shadow-2xl shadow-black p-3 grid grid-row-3 py-3 gap-3' onSubmit={onSubmit} >
                <label className=' text-black font-bold'>Name</label>
                <input className='focus:shadow-md focus:shadow-teal-500' type="text" onChange={(e) => setEmail(e.target.value)} />
                {emailError && <div className='text-red-500'>Email is invalid</div>}
                <label className='text-black font-bold'>Password</label>
                <input className='focus:shadow-md focus:shadow-teal-500' type="password" onChange={(e) => setPassword(e.target.value)} />
                {passwordError && <div className='text-red-500'>Password is invalid</div>}
                <div className='grid grid-cols-2 place-items-center'>
                  <button className="border-2 border-black p-2 font-bold text-black" >Login</button>
                  <Link href={'/account/signup'}><button className="border-2 border-black p-2 font-bold text-black">Not a member?</button></Link>
                </div>
                <div className='grid place-items-center'>
                  {error && (<div className='bg-red-500 text-center text-xl font-bold w-28 p-2 rounded-lg'>{error}</div>)}
                </div>
              </form>
            </div>
            <div className='flex justify-center'><Image alt='' src={"/cheeseBurger.png"} height={300} width={300} /></div>
          </div>
        </MediaQuery>
        <MediaQuery minWidth={641}>
          <div className='grid grid-cols-3 gap-2'>
            <div className='flex justify-end'><Image alt='' src={"/cheeseBurger.png"} height={300} width={300} /></div>
            <div className="flex justify-center text-center grid-row-7 py-3 px-8 gap-3">
              <form className='shadow-2xl shadow-black p-3 grid grid-row-3 py-3 gap-3' onSubmit={onSubmit}>
                <label className=' text-black font-bold'>Name</label>
                <input className='focus:shadow-md focus:shadow-teal-500' type="email" onChange={(e) => setEmail(e.target.value)} />
                <label className='text-black font-bold'>Password</label>
                <input className='focus:shadow-md focus:shadow-teal-500' type="password" onChange={(e) => setPassword(e.target.value)} />
                <div className='grid grid-cols-2 place-items-center'>
                  <button className="border-2 border-black p-2 font-bold text-black">Login</button>
                  <Link href={'/account/signup'}><button className="border-2 border-black p-2 font-bold text-black">Not a member?</button></Link>
                </div>
                <div className='grid place-items-center'>
                  {error && (<div className='bg-red-500 text-center text-xl font-bold w-28 p-2 rounded-lg'>{error}</div>)}
                </div>
              </form>
            </div>
            <div className='flex justify-start'><Image alt='' src={"/cheeseBurger.png"} height={300} width={300} /></div>
          </div>
        </MediaQuery>
      </div>
    </div>
  )
}