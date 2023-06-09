import React from "react";

type InstructionsProps = {
  handleClose: () => void;
};

const Instructions: React.FC<InstructionsProps> = ({ handleClose }) => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={handleClose}>
          x
        </span>
        Wellcome to our brand new Burger Builder App! If you are looking for the
        most delicious burgers in the universe, this is the right place to get
        them. Just click on the ingredients bellow in whichever row you wish.
        And if you want to remove an item, no big deal. Just click on the image
        And boom, it is gone!
        <br />
        <br />
        Did I tell you the best part? Click on the orders button to view your
        previous orders and repeat them in just a few seconds!
      </div>
    </div>
  );
};

export default Instructions;
