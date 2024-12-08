import React, { useState } from "react";

const CounterItem = ({ itemName, listItemValues }) => {
  const [counter, setCounter] = useState(listItemValues.length); // Initial value set to 5
  const [activeIndex, setActiveIndex] = useState(0);
  const incrementCounter = () => {
    setCounter(counter + 1);
    setActiveIndex(-1); // Remove active class by setting activeIndex to -1
  };

  const decrementCounter = () => {
    if (counter > listItemValues.length) {
      setCounter(counter - 1);
    }
  };
  const handleItemClick = (index) => {
    setActiveIndex(index);
  };
  return (
    <div className="number-quantity-area">

      <ul className="number-list">
        {listItemValues.map((item, index) => 
        <li
        key={index}
        className={index === activeIndex ? "selected" : ""}
        onClick={() => handleItemClick(index)}
      >
        {item}
      </li>
        )}
      </ul>
      <div className="quantity">
        <div className="quantity__minus" onClick={decrementCounter}>
          <span>
            <i className="bi bi-caret-down-fill" />
          </span>
        </div>
        <div name="quantity" type="text" className="quantity__input">
          {String(counter + 1).padStart(2, "0")}
        </div>
        <div className="quantity__plus" onClick={incrementCounter}>
          <span>
            <i className="bi bi-caret-up-fill" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default CounterItem;
