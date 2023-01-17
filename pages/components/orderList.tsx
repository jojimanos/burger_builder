const Instructions = ( setViewOrders: any, viewOrders: boolean, userOrders: any, addLettuce: any, addTomato: any, addMeat: any, addCheese: any, resetArray: any) => {

  function buildBurger( userOrder: any, addLettuce: any, addTomato: any, addMeat: any, addCheese: any) {
    if (userOrder.lettuce) {
      for(let i=1; i<=userOrder.lettuce; i++){
        let items = userOrder.lettuce
        addLettuce(items)
      }
   }
   if (userOrder.tomato) {
      for(let i=1; i<=userOrder.tomato; i++){
        let items = userOrder.tomato
     addTomato(items)
      }
    }
   if (userOrder.meat) {
      for(let i=1; i<=userOrder.meat; i++){
        let items = userOrder.meat
     addMeat(items)
    }
  }
  if (userOrder.cheese) {
      for(let i=1; i<=userOrder.cheese; i++){
        let items = userOrder.cheese
     addCheese(items)
    }
  }
  }

return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={() => {setViewOrders(!viewOrders)}}>x</span>
        {userOrders.map((userOrder: any, key: any) => {return (
        <div className="box bg-slate-400 " key={userOrder.id}>
        <p className="grid grid-cols-2"><div className="w-12">Order no</div><div className="w-24">{JSON.stringify(userOrder.id).slice(1,-2)}</div></p>
        <p className="grid grid-cols-2"><div className="w-12">lettuce</div><div className="w-12">{JSON.stringify(userOrder.lettuce)}</div></p>
        <p className="grid grid-cols-2"><div className="w-12">tomato</div><div className="w-12">{JSON.stringify(userOrder.tomato)}</div></p>
        <p className="grid grid-cols-2"><div className="w-12">meat</div><div className="w-12">{JSON.stringify(userOrder.meat)}</div></p>
        <p className="grid grid-cols-2"><div className="w-12">cheese</div><div className="w-12">{JSON.stringify(userOrder.cheese)}</div>
        </p><button className="rounded-md border-2 border-white bg-black p-1" onClick={() => {resetArray(), buildBurger(userOrder, addLettuce, addTomato, addMeat, addCheese), setViewOrders(!viewOrders)}}>Repeat Order</button></div>)})}
      </div>
    </div>
  );
};
 
export default Instructions;