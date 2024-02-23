import React, { useState } from "react";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const menu = {
  starters: [
    {
      name: "Chicken Tikka",
      price: 5.99,
      description: "A dish made of Tandoori Tikka and Onions",
    },
    { name: "Paneer Tikka", price: 4.99, description: "A Paneer starter dish" },
  ],
  sides: [
    {
      name: "Saag Aloo",
      price: 3.99,
      description: "Potatoes cooked with spinach",
    },
    {
      name: "Bombay Potatoes",
      price: 3.99,
      description: "Spicy potatoes from Bombay",
    },
  ],
  mainDishes: [
    {
      name: "Butter Masala",
      options: [
        { choice: "Lamb", price: 8.99 },
        { choice: "Chicken", price: 7.99 },
        { choice: "King Prawn", price: 10.99 },
        { choice: "Prawn", price: 9.99 },
        { choice: "Lamb Tikka", price: 9.99 },
        { choice: "King Prawn Tikka", price: 11.99 },
        { choice: "Chicken Tikka", price: 8.99 },
        { choice: "Vegetable", price: 6.99 },
        { choice: "Mixed", price: 12.99 },
      ],
      description: "Creamy and rich masala curry",
    },
    {
      name: "Bhuna",
      options: [
        { choice: "Lamb", price: 8.99 },
        { choice: "Chicken", price: 7.99 },
        { choice: "King Prawn", price: 10.99 },
        { choice: "Prawn", price: 9.99 },
        { choice: "Lamb Tikka", price: 9.99 },
        { choice: "King Prawn Tikka", price: 11.99 },
        { choice: "Chicken Tikka", price: 8.99 },
        { choice: "Vegetable", price: 6.99 },
        { choice: "Mixed", price: 12.99 },
      ],
      description: "Spicy bhuna curry cooked with onions and tomatoes",
    },
  ],
  riceAndNaans: [
    {
      name: "Pilau Rice",
      price: 2.99,
      description: "Fragrant basmati rice cooked with spices",
    },
    {
      name: "Garlic Naan",
      price: 1.99,
      description: "Naan bread flavored with garlic and herbs",
    },
  ],
  accompaniments: [
    {
      name: "Mango Chutney",
      price: 0.99,
      description: "Sweet and tangy mango relish",
    },
    {
      name: "Raita",
      price: 1.49,
      description: "Yogurt mixed with cucumber, tomatoes, and spices",
    },
  ],
  setMeals: [
    {
      name: "Vegetarian Set Meal for 1",
      price: 15.99,
      description: "Assorted vegetarian dishes with rice and naan",
    },
    {
      name: "Non-Vegetarian Set Meal for 1",
      price: 17.99,
      description: "Assorted non-vegetarian dishes with rice and naan",
    },
  ],
  drinks: [
    { name: "Lassi", price: 2.5, description: "Refreshing yogurt-based drink" },
    { name: "Coca Cola", price: 1.5, description: "Classic cola drink" },
  ],
  stillCantDecide: [
    {
      name: "Chef's Surprise",
      price: 10.99,
      description: "Let the chef surprise you with today's special",
    },
  ],
};

function formatCategoryName(name) {
  return name
    .replace(/([A-Z])/g, " $1")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .replace(/\b(and)\b/gi, "&")
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function getPriceRange(options) {
  const prices = options.map((option) => option.price);
  const minPrice = Math.min(...prices).toFixed(2);
  const maxPrice = Math.max(...prices).toFixed(2);
  return `£${minPrice} - £${maxPrice}`;
}

function Menu() {
  const navigate = useNavigate();
  const [openCategory, setOpenCategory] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemQuantities, setItemQuantities] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);

  const proceedToCart = () => {
    navigate('/cart'); // Replace '/cart' with your actual cart page path
  };
  const addToCart = (item, choice = null) => {
    const itemKey = choice ? `${item.name} - ${choice}` : item.name;
    const itemPrice = choice
      ? item.options.find((option) => option.choice === choice).price
      : item.price;
    const newQuantity = (itemQuantities[itemKey] || 0) + 1;
    setItemQuantities({ ...itemQuantities, [itemKey]: newQuantity });
    setTotalPrice((prev) => prev + itemPrice); // Now using setTotalPrice to update total price
  };

  const removeFromCart = (item, choice = null) => {
    const itemKey = choice ? `${item.name} - ${choice}` : item.name;
    if (itemQuantities[itemKey] && itemQuantities[itemKey] > 0) {
      const itemPrice = choice
        ? item.options.find((option) => option.choice === choice).price
        : item.price;
      const newQuantity = itemQuantities[itemKey] - 1;
      setItemQuantities({ ...itemQuantities, [itemKey]: newQuantity });
      setTotalPrice((prev) => prev - itemPrice); // Now using setTotalPrice to update total price
    }
  };
  const handleSelectChange = (item, choice) => {
    setSelectedItem({ item, choice });
  };

  return (
    <div className="menu-container">
    <h1>Restaurant Menu</h1>
    <div className="cart-summary">
      <h2>Cart Total: £{totalPrice.toFixed(2)}</h2>
      {/* Add the Proceed button below the cart total */}
      <button onClick={proceedToCart} style={{ marginTop: '10px' }}>
        Proceed
      </button>
    </div>
      {Object.entries(menu).map(([category, items]) => (
        <div key={category} className="menu-category">
          <h2
            onClick={() =>
              setOpenCategory(openCategory === category ? null : category)
            }
          >
            {formatCategoryName(category)}
          </h2>
          {openCategory === category && (
            <ul>
              {items.map((item) => (
                <li key={item.name}>
                  <div>
                    {item.name} -{" "}
                    {item.options
                      ? `Starting from ${getPriceRange(item.options)}`
                      : `£${item.price}`}
                  </div>
                  <div style={{ fontSize: "12px" }}>{item.description}</div>
                  <div>
                    {item.options ? (
                      <>
                        <select
                          onChange={(e) =>
                            handleSelectChange(item, e.target.value)
                          }
                        >
                          {item.options.map((option) => (
                            <option key={option.choice} value={option.choice}>
                              {option.choice} - £{option.price}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => addToCart(item, selectedItem?.choice)}
                        >
                          <FiPlusCircle /> Add
                        </button>
                        <button
                          onClick={() =>
                            removeFromCart(item, selectedItem?.choice)
                          }
                          disabled={
                            !itemQuantities[
                              `${item.name} - ${selectedItem?.choice}`
                            ]
                          }
                        >
                          <FiMinusCircle /> Remove
                        </button>
                        <span style={{ marginLeft: "10px" }}>
                          {itemQuantities[
                            `${item.name} - ${selectedItem?.choice}`
                          ] || 0}
                        </span>
                      </>
                    ) : (
                      <>
                        <button onClick={() => addToCart(item)}>
                          <FiPlusCircle /> Add
                        </button>
                        <button onClick={() => removeFromCart(item)}>
                          <FiMinusCircle /> Remove
                        </button>
                        {/* Display quantity for items without options */}
                        <span style={{ marginLeft: "10px" }}>
                          {itemQuantities[item.name] || 0}
                        </span>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default Menu;
