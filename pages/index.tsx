import { useEffect, useState } from 'react'
import Instructions from './components/instructions'
import Nav from './components/Nav'

// Generates unique keys for each ingredient in the array
import { v4 as uuidv4 } from 'uuid';

import styles from '../styles/Home.module.css'

export default function Home() {

  const dummy = localStorage.getItem("token")

  const token = dummy?.replace(/"/g, "")

  const [data, setData] = useState([{ name: "", src: "" }, { name: "", src: "" }, { name: "", src: "" }]);

  useEffect(() => {
    fetch('https://xm-crm-react-exercise-server.herokuapp.com/ingredients',
      {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
        }
      }
    )
      .then((response) => response.json())
      .then((data) => { setData(data) });

    console.log(data)
  }, [])

  const [array, setArray]: any = useState([])

  function addBurgerPatty() {

    setArray((arr: any) => [...arr, { id: uuidv4(), element: <img src={`https://xm-crm-react-exercise-server.herokuapp.com/img/${data[0].src}`} /> }])
    console.log(array)
  }

  function addBacon() {

    setArray((arr: any) => [...arr, { id: uuidv4(), element: <img src={`https://xm-crm-react-exercise-server.herokuapp.com/img/${data[1].src}`} /> }])
    console.log(array)
  }

  function addEgg() {

    setArray((arr: any) => [...arr, { id: uuidv4(), element: <img src={`https://xm-crm-react-exercise-server.herokuapp.com/img/${data[2].src}`} /> }])
    console.log(array)

  }

  function removeBacon(id: any) {

    setArray(array.filter((arr: any) => arr.id !== id))
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

  return (
    <div className='bg-stone-200 w-full min-h-screen max-h-max min-w-screen overflow-auto'>
      <div className='pb-2'>{Nav(popUpWindow, handleMouseOver, handleMouseOut, isHovering)}</div>
      <main>
        <div className='grid grid-cols-2'>
          <div className='flex justify-end'>
            <div className='w-48 sm:w-max'>
              <div>{<img src={`https://xm-crm-react-exercise-server.herokuapp.com/img/bun_top.png`} />}</div>
              <div>{array.map((arr: any) => (<div id={arr.id} onClick={() => { removeBacon(arr.id) }}>{arr.element}</div>))}</div>
              <div>{<img src={`https://xm-crm-react-exercise-server.herokuapp.com/img/bun_bottom.png`} />}</div>
            </div>
          </div>
          {isOpen && (Instructions(popUpWindow))}
          <div className='flex justify-center'>
            <div className='grid place-items-center min-h-10 max-h-12'>
              <div className='py-2'><button onClick={() => { addBurgerPatty() }} className="text-2xl font-extrabold text-zinc-400/80 hover:text-3xl">{data[0].name}</button></div>
              <div className='py-2'><button onClick={() => { addBacon() }} className="text-2xl font-extrabold text-zinc-400/80 hover:text-3xl">{data[1].name}</button></div>
              <div className='py-2'><button onClick={() => { addEgg() }} className="text-2xl font-extrabold text-zinc-400/80 hover:text-3xl">{data[2].name}</button></div>
              <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}><button className={styles.neonText} onClick={popUpWindow}>?</button></div>
              <div className='grid place-items-end pr-5'>{isHovering && <h2 className='bg-green-400 shadow-md shadow-green-800 '>Click here for app Information</h2>}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}