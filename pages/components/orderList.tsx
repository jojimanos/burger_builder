const Instructions = ( setViewOrders: any, viewOrders: boolean, userOrders: any, addLettuce: any, addTomato: any, addMeat: any, addCheese: any) => {

  function buildBurger(userOrder: any, addLettuce: any, addTomato: any, addMeat: any, addCheese: any) {
    if (userOrders.lettuce) {
     addLettuce()
   }
   if (userOrder.tomato) {
     addTomato()
    }
    if (userOrder.meat) {
     addMeat()
    }
    if (userOrder.cheese) {
     addCheese()
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
        <p className="grid grid-cols-2"><div className="w-12">cheese</div><div className="w-12">{JSON.stringify(userOrder.cheese)}</div></p><button className="rounded-md border-2 border-white bg-black p-1" onClick={() => {buildBurger(userOrder, addLettuce, addTomato, addMeat, addCheese), setViewOrders(!viewOrders)}}>Repeat Order</button></div>)})}
      </div>
    </div>
  );
};
 
export default Instructions;