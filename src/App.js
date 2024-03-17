import Drawer from "./components/Drawer";
import Header from "./components/Header";
import React from "react";
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";


function App() {

  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [favorites, setFavorites] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      const cartResponse = await axios.get('http://localhost:3001/cart');
      const favoritesResponse = await axios.get('http://localhost:3001/favorites');
      const itemsResponse = await axios.get('http://localhost:3001/items')
     
      setIsLoading(false);

      setFavorites(favoritesResponse.data);
      setCartItems(cartResponse.data);
      setItems(itemsResponse.data);
    }

    fetchData();
  }, [])

  const onAddToCart = (obj) => {
    try {
      if(cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(`http://localhost:3001/cart/${obj.id}`);
        setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
      } else {
        axios.post('http://localhost:3001/cart', obj);
        setCartItems(prev => [...prev, obj]);
      }
    } catch(error) {

    }
  }

  const onRemoveItem = (id) => {
    axios.delete(`http://localhost:3001/cart/${id}`);
    setCartItems((prev) => prev.filter(item => item.id !== id))
  }

  const onAddToFavorite = async (obj) => {
    try {
      if(favorites.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(`http://localhost:3001/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post('http://localhost:3001/favorites', obj);
        setFavorites(prev => [...prev, data]);
      }
    } catch(error) {
      alert('Не удалось добавить в избранное');
    }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value.toLowerCase());
  }

  const isItemAdded = (id) => {
    return cartItems.some(obj => obj.id === id)
  }

  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, onAddToFavorite, setCartOpened, setCartItems }}>
      <div className="wrapper clear">

        {cartOpened && <Drawer items={cartItems} onRemove={onRemoveItem} onClose={() => setCartOpened(false)} /> }
        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route path="/" element={<Home 
            items={items} 
            cartItems={cartItems}
            searchValue={searchValue} 
            setSearchValue={setSearchValue}
            onAddToFavorite={onAddToFavorite}
            onChangeSearchInput={onChangeSearchInput}
            onAddToCart={onAddToCart}
            isLoading={isLoading}
            />} 
          />
          <Route path="favorites"
            element={<Favorites />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
