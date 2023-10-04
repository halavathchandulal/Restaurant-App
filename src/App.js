import React, {useState, useEffect} from 'react'
import './App.css'

const API_URL = 'https://run.mocky.io/v3/a67edc87-49c7-4822-9cb4-e2ef94cb3099'

function App() {
  const [categories, setCategories] = useState([])
  const [dishes, setDishes] = useState([])
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL)
      const data = await response.json()

      setCategories(data.categories)
      setDishes(
        data.dishes.filter(dish => dish.category === data.categories[0]),
      )
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleCategoryChange = category => {
    const filteredDishes = data.dishes.filter(
      dish => dish.category === category,
    )
    setDishes(filteredDishes)
  }

  const handleAddToCart = () => {
    setCartCount(cartCount + 1)
  }

  const handleRemoveFromCart = () => {
    if (cartCount > 0) {
      setCartCount(cartCount - 1)
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Restaurant Menu</h1>
        <div id="cart-icon">
          <span>Cart: {cartCount}</span>
        </div>
      </header>

      <main>
        <div className="dish-categories">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`dish-category ${
                category === currentCategory ? 'active' : ''
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </div>
          ))}
        </div>

        <div className="dishes">
          {dishes.map((dish, index) => (
            <div key={index} className="dish-card">
              <h2>{dish.name}</h2>
              <p>{dish.description}</p>
              {dish.addoncat ? (
                <div className="addon-text">Customizations available</div>
              ) : null}
              <div>
                <button onClick={handleAddToCart}>+</button>
                <span>{/* Display dish count here */}</span>
                <button onClick={handleRemoveFromCart}>-</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default App
