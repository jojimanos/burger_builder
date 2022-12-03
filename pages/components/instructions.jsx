const Instructions = (handleClose) => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={handleClose}></span>
        Wellcome to our brand new Burger Builder App! If you are looking for
        the most delicious burgers in the universe, this is the right place to
        get them. Just click on the ingredients bellow in whichever row you wish.
        And if you want to remove an item, no big deal. Just click on the image And
        boom, it's gone!
      </div>
    </div>
  );
};
 
export default Instructions;