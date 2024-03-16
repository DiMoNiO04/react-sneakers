import Card from "../components/Card/";

function Home({ items, searchValue, setSearchValue, onAddToFavorite, onChangeSearchInput, onAddToCart
 }) {
  return (
     <div className="content p-40">

        <div className="d-flex align-center justify-between mb-40">
          <h1>{searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'}</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
           { searchValue && <img onClick={() => setSearchValue('')} className="clear cu-p" src="/img/btn-remove.svg" alt="Close" />}
            <input value={searchValue} onChange={onChangeSearchInput} placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {
            items
              .filter((item) => item.name.toLowerCase().includes(searchValue))
              .map((item, index) => (
                <Card 
                  key={index} 
                  
                  onFavorite={(obj) => onAddToFavorite(obj)}
                  onPlus={(obj) => onAddToCart(obj)}
                  {...item}
                />
            ))
          }
        </div>
      </div>
  )
}

export default Home;