import { useEffect, useState } from 'react'
import Instructions from './components/instructions'
import Nav from './components/Nav'
import Image from 'next/image';
import orderList from './components/orderList'

// Generates unique keys for each ingredient in the array
import { v4 as uuidv4 } from 'uuid';

import styles from '../styles/Home.module.css'
import MediaQuery from 'react-responsive';
import { onAuthStateChanged, } from 'firebase/auth';
import { auth, database } from '../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export default function Home() {

  const [user, setUser] = useState({});
  const [lettuce, setLettuce] = useState(0);
  const [tomato, setTomato] = useState(0);
  const [meat, setMeat] =useState(0);
  const [cheese, setCheese] = useState(0);
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [viewOrders, setViewOrders] = useState(false)
  const [ordersArray, setOrdersArray]: any = useState([]);

  console.log("Order's page", viewOrders)

  useEffect(() => {
onAuthStateChanged(auth, (currentUser) => {
    if (currentUser !== null){
    setUser(currentUser);}
  })
  }, [])

  const [array, setArray]: any = useState([])

  const items = 0 

  function addLettuce(items: number) {

    if (!items) {
      items = 1
    }
    setArray((arr: any) => [...arr, { id: uuidv4(), key: 'lettuce', element: <div><Image alt='' src={'/lettuce.jpg'} width={400} height={400} /></div> }]);
    console.log(array);
    setLettuce(lettuce + items)
    
  }

  function addTomato(items: number) {

    if (!items) {
      items = 1
    }
    setArray((arr: any) => [...arr, { id: uuidv4(), key: 'tomato', element: <div><Image alt='' src={'/tomato.jpg'} width={400} height={400} /></div> }])
    console.log(array)
    setTomato(tomato + items)
  }

  function addMeat(items: number) {

    if (!items) {
      items = 1
    }
    setArray((arr: any) => [...arr, { id: uuidv4(), key: 'meat', element: <div><Image alt='' src={'/meat.jpg'} width={400} height={400} /></div> }])
    console.log(array)
    setMeat(meat + items)

  }

  function addCheese(items: number) {

    if (!items) {
      items = 1
    }
    setArray((arr: any) => [...arr, { id: uuidv4(), key: 'cheese', element: <div><Image alt='' src={'/cheese.jpg'} width={400} height={400} /></div> }])
    console.log(array)
    setCheese(cheese + items)

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
    setArray([]), (setLettuce(0)), (setTomato(0)), (setMeat(0)), (setCheese(0))
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
const getOrders = () => {
         getDocs(dbInstance)
            .then((data) => {
                setOrdersArray(data.docs.map((item) => {
                    return { ...item.data(), id: item.id }
                }));
            })
      }
  
      const userOrders = ordersArray.filter((order: any) => order.email === displayUser.email)
  
      useEffect(() => {
        getOrders()
      }, [])
  

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    try {
   addDoc(dbInstance, {
    email: displayUser.email,
    lettuce: lettuce,
    tomato: tomato,
    meat: meat,
    cheese: cheese}).then(() => {emptyArray()}).then(() => {setMessage('Your order has been sent')}) 
    } catch {console.log('Error')}
  }

  setTimeout(() => {setMessage('')}, 10000)

  return (
    <div className='bg-stone-200 w-full min-h-screen max-h-max min-w-screen overflow-auto'>
      <div className='pb-2'>{Nav(emptyArray, displayUser, setViewOrders, viewOrders)}</div>
      <MediaQuery maxWidth={640}>
        <main>
          <div className='grid grid-cols-2'>
            <div className='flex justify-end'>
              <div className='w-64'>
                <div><Image alt='' src={'/top.jpg'} width={400} height={400} /></div>
                <div>{array.map((arr: any) => (<div key={arr} id={arr.id} onClick={() => { removeIngredient(arr.id, arr.key) }}>{arr.element}</div>))}</div>
                <div><Image alt='' src={'/bottom.jpg'} width={400} height={400} /></div>
                {message && <div className='bg-green-600 rounder-md p-2 border-2 border-white'>{message}</div>}
              </div>
            </div>
            {isOpen && (Instructions(popUpWindow))}
            {viewOrders && (orderList(setViewOrders, viewOrders, userOrders, addLettuce, addTomato, addMeat, addCheese, emptyArray))}
            <div className='flex justify-center'>
              <div className='grid place-items-center min-h-10 max-h-12'>
                <form onSubmit={handleSubmit}>
                <div className='py-2'><button type='button'onClick={() => { addLettuce(items) }} className="text-2xl font-extrabold text-zinc-400/80 hover:text-3xl">Lettuce</button><span className='pl-2 text-xl text-gray-800'>{lettuce}</span></div>
                <div className='py-2'><button type='button'onClick={() => { addTomato(items) }} className="text-2xl font-extrabold text-zinc-400/80 hover:text-3xl">Tomato</button><span className='pl-2 text-xl text-gray-800'>{tomato}</span></div>
                <div className='py-2'><button type='button'onClick={() => { addMeat(items) }} className="text-2xl font-extrabold text-zinc-400/80 hover:text-3xl">Meat</button><span className='pl-2 text-xl text-gray-800'>{meat}</span></div>
                <div className='py-2'><button type='button'onClick={() => { addCheese(items) }} className="text-2xl font-extrabold text-zinc-400/80 hover:text-3xl">Cheese</button><span className='pl-2 text-xl text-gray-800'>{cheese}</span></div>
                <button className='bg-black p-1 rounded-md border-2 border-gray-500' type='submit'>Submit your Order</button>
                </form>
                <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}><button className={styles.neonText} onClick={popUpWindow}>?</button></div>
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
                {message && <div className='bg-green-600 rounder-md p-2 border-2 border-white'>{message}</div>}
              </div>
            </div>
            {isOpen && (Instructions(popUpWindow))}
            {viewOrders && (orderList(  setViewOrders, viewOrders, userOrders, addLettuce, addTomato, addMeat, addCheese, emptyArray))}
            <div className='flex justify-center'>
              <div className='grid place-items-center min-h-10 max-h-12'>
                <form onSubmit={handleSubmit}>
                <div className='py-2'><button type='button' onClick={() => { addLettuce(items) }} className="text-2xl font-extrabold text-zinc-400/80 hover:text-3xl">Lettuce</button><span className='pl-2 text-xl text-gray-800'>{lettuce}</span></div>
                <div className='py-2'><button type='button' onClick={() => { addTomato(items) }} className="text-2xl font-extrabold text-zinc-400/80 hover:text-3xl">Tomato</button><span className='pl-2 text-xl text-gray-800'>{tomato}</span></div>
                <div className='py-2'><button type='button' onClick={() => { addMeat(items) }} className="text-2xl font-extrabold text-zinc-400/80 hover:text-3xl">Meat</button><span className='pl-2 text-xl text-gray-800'>{meat}</span></div>
                <div className='py-2'><button type='button' onClick={() => { addCheese(items) }} className="text-2xl font-extrabold text-zinc-400/80 hover:text-3xl">Cheese</button><span className='pl-2 text-xl text-gray-800'>{cheese}</span></div>
                <button className='bg-black p-1 rounded-md border-2 border-gray-500' type='submit'>Submit your Order</button>
                </form>
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