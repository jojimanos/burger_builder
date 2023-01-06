import { useEffect, useState } from 'react'
import Instructions from './components/instructions'
import Nav from './components/Nav'
import Image from 'next/image';

// Generates unique keys for each ingredient in the array
import { v4 as uuidv4 } from 'uuid';

import styles from '../styles/Home.module.css'
import MediaQuery from 'react-responsive';
import { onAuthStateChanged, } from 'firebase/auth';
import { auth, database } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default function Home() {

  const [user, setUser] = useState({});
  const [lettuce, setLettuce] = useState(0);
  const [tomato, setTomato] = useState(0);
  const [meat, setMeat] =useState(0);
  const [cheese, setCheese] = useState(0);

  useEffect(() => {
onAuthStateChanged(auth, (currentUser) => {
    if (currentUser !== null){
    setUser(currentUser);}
  })
  }, [])

  const [array, setArray]: any = useState([])

  function addLettuce() {

    setArray((arr: any) => [...arr, { id: uuidv4(), key: 'lettuce', element: <div><Image alt='' src={'/lettuce.jpg'} width={400} height={400} /></div> }])
    console.log(array)
    setLettuce(lettuce + 1)
  }

  function addTomato() {

    setArray((arr: any) => [...arr, { id: uuidv4(), element: <div><Image alt='' src={'/tomato.jpg'} width={400} height={400} /></div> }])
    console.log(array)
  }

  function addMeat() {

    setArray((arr: any) => [...arr, { id: uuidv4(), element: <div><Image alt='' src={'/meat.jpg'} width={400} height={400} /></div> }])
    console.log(array)

  }

  function addCheese() {

    setArray((arr: any) => [...arr, { id: uuidv4(), element: <div><Image alt='' src={'/cheese.jpg'} width={400} height={400} /></div> }])
    console.log(array)

  }

  function removeIngredient(id: any, key: any) {

    setArray(array.filter((arr: any) => arr.id !== id))
    if (key === 'lettuce'){
      setLettuce(lettuce-1)
    } else if (key === 'tomato') {
      setTomato(tomato-1)
    } else if (key === 'meat') {
      setMeat(meat-1)
    } else if (key === 'cheese') {
      setCheese(cheese-1)
    }
  }

  function emptyArray() {
    setArray([])
  }

  const [isOpen, setIsOpen] = useState(false);

  const popUpWindow = () => {
    setIsOpen(!isOpen);
  };

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const displayUser = JSON.parse(JSON.stringify(user))

  const dbInstance = collection(database, 'orders')

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    try {
   addDoc(dbInstance, {
    email: displayUser.email,
    lettuce: lettuce,
    tomato: tomato,
    meat: meat,
    cheese: cheese}) 
    } catch {console.log('Error')}
  }

  return (
    <div className='bg-stone-200 w-full min-h-screen max-h-max min-w-screen overflow-auto'>
      <div className='pb-2'>{Nav(emptyArray, displayUser)}</div>
      <MediaQuery maxWidth={640}>
        <main>
          <div className='grid grid-cols-2'>
            <div className='flex justify-end'>
              <div className='w-64'>
                <div><Image alt='' src={'/top.jpg'} width={400} height={400} /></div>
                <div>{array.map((arr: any) => (<div key={arr} id={arr.id} onClick={() => { removeIngredient(arr.id, arr.key) }}>{arr.element}</div>))}</div>
                <div><Image alt='' src={'/bottom.jpg'} width={400} height={400} /></div>
              </div>
            </div>
            {isOpen && (Instructions(popUpWindow))}
            <div className='flex justify-center'>
              <div className='grid place-items-center min-h-10 max-h-12'>
                <form onSubmit={handleSubmit}>
                <div className='py-2'><button type='button'onClick={() => { addLettuce() }} className="text-2xl font-extrabold text-zinc-400/80 hover:text-3xl">Lettuce</button>{lettuce}</div>
                <div className='py-2'><button type='button'onClick={() => { addTomato() }} className="text-2xl font-extrabold text-zinc-400/80 hover:text-3xl">Tomato</button>{tomato}</div>
                <div className='py-2'><button type='button'onClick={() => { addMeat() }} className="text-2xl font-extrabold text-zinc-400/80 hover:text-3xl">Meat</button>{meat}</div>
                <div className='py-2'><button type='button'onClick={() => { addCheese() }} className="text-2xl font-extrabold text-zinc-400/80 hover:text-3xl">Cheese</button>{cheese}</div>
                <button type='submit'>Submit your Order</button>
                </form>
                <div className='grid place-items-end pr-5'>{isHovering && <h2 className='bg-green-400 shadow-md shadow-green-800 '>Click here for app Information</h2>}</div>
              </div>
            </div>
          </div>
        </main>
      </MediaQuery>
      <MediaQuery minWidth={641}>
        <main>
          <div className='grid grid-cols-2'>
            <div className='flex justify-end'>
              <div className='w-max'>
                <div><Image alt='' src={'/top.jpg'} width={400} height={400} /></div>
                <div>{array.map((arr: any) => (<div key={arr} id={arr.id} onClick={() => { removeIngredient(arr.id, arr.key) }}>{arr.element}</div>))}</div>
                <div><Image alt='' src={'/bottom.jpg'} width={400} height={400} /></div>
              </div>
            </div>
            {isOpen && (Instructions(popUpWindow))}
            <div className='flex justify-center'>
              <div className='grid place-items-center min-h-10 max-h-12'>
                <div className='py-2'><button onClick={() => { addLettuce() }} className="text-2xl font-extrabold text-zinc-400/80 hover:text-3xl">Lettuce</button></div>
                <div className='py-2'><button onClick={() => { addTomato() }} className="text-2xl font-extrabold text-zinc-400/80 hover:text-3xl">Tomato</button></div>
                <div className='py-2'><button onClick={() => { addMeat() }} className="text-2xl font-extrabold text-zinc-400/80 hover:text-3xl">Meat</button></div>
                <div className='py-2'><button onClick={() => { addCheese() }} className="text-2xl font-extrabold text-zinc-400/80 hover:text-3xl">Cheese</button></div>
                <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}><button className={styles.neonText} onClick={popUpWindow}>?</button></div>
                <div className='grid place-items-end pr-5'>{isHovering && <h2 className='bg-green-400 shadow-md shadow-green-800 '>Click here for app Information</h2>}</div>
              </div>
            </div>
          </div>
        </main>
      </MediaQuery>
    </div>
  )
}