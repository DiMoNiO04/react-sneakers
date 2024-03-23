import Drawer from "./components/Drawer";
import Header from "./components/Header";
import React from "react";
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";


function App() {

  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [favorites, setFavorites] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
          axios.get('http://localhost:3001/cart'),
          axios.get('http://localhost:3001/favorites'),
          axios.get('http://localhost:3001/items')
        ])

        setIsLoading(false);

        setFavorites(favoritesResponse.data);
        setCartItems(cartResponse.data);
        setItems(itemsResponse.data);
      } catch(error) {
        alert('Ошибка при запросе данных :(');
        console.log(error);
      }
    }

    fetchData();
  }, [])

  const onAddToCart = async (obj) => {
    try {
      if(cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
        await axios.delete(`http://localhost:3001/cart/${obj.id}`);
      } else {
        setCartItems(prev => [...prev, obj]);
        await axios.post('http://localhost:3001/cart', obj);
      }
    } catch(error) {
      alert('Ошибка при добавление в корзину :(');
      console.log(error);
    }
  }

  const onRemoveItem = async (id) => {
    try {
      setCartItems((prev) => prev.filter(item => item.id !== id))
      await axios.delete(`http://localhost:3001/cart/${id}`);
    } catch(error) {
      console.log('Ошибка при удалении из корзины');
      console.log(error);
    }
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
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, onAddToFavorite, setCartOpened, setCartItems, onAddToCart }}>
      <div className="wrapper clear">

        <Drawer items={cartItems} onRemove={onRemoveItem} onClose={() => setCartOpened(false)} opened={cartOpened} /> 

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
          <Route path="orders" 
            element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
