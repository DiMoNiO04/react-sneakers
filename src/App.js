import Drawer from "./components/Drawer";
import Header from "./components/Header";
import React from "react";
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";


function App() {

  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [favorites, setFavorites] = React.useState([]);

  React.useEffect(() => {
    axios.get('http://localhost:3001/items')
      .then(res => setItems(res.data))

    axios.get('http://localhost:3001/cart')
      .then(res => setCartItems(res.data))

    axios.get('http://localhost:3001/favorites')
      .then(res => setFavorites(res.data))
  }, [])

  const onAddToCart = (obj) => {
    axios.post('http://localhost:3001/cart', obj);
    setCartItems(prev => [...prev, obj]);
  }

  const onRemoveItem = (id) => {
    axios.delete(`http://localhost:3001/cart/${id}`);
    setCartItems((prev) => prev.filter(item => item.id !== id))
  }

  const onAddToFavorite = (obj) => {
    if(favorites.find((favObj) => favObj.id === obj.id)) {
      axios.delete(`http://localhost:3001/favorites/${obj.id}`);
      setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
    } else {
      axios.post('http://localhost:3001/favorites', obj);
      setFavorites(prev => [...prev, obj]);
    }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value.toLowerCase());
  }

  return (
    <div className="wrapper clear">

      {cartOpened && <Drawer items={cartItems} onRemove={onRemoveItem} onClose={() => setCartOpened(false)} /> }
      <Header onClickCart={() => setCartOpened(true)} />

      <Routes>
	      <Route path="/" element={<Home 
          items={items} 
          searchValue={searchValue} 
          setSearchValue={setSearchValue}
          onAddToFavorite={onAddToFavorite}
          onChangeSearchInput={onChangeSearchInput}
          onAddToCart={onAddToCart}
          />} 
        />
        <Route path="favorites"
          element={<Favorites items={favorites} onAddToFavorite={onAddToFavorite} />} />
      </Routes>
      

    </div>
  );
}

export default App;
