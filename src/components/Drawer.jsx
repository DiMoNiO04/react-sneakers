function Drawer() {
  return (
    <div className="overlay" style={{display: "none"}}>
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30">
          Корзина
          <img className="removeBtn cu-p" src="/img/btn-remove.svg" alt="Remove" />
        </h2>
        <div className="items">
          <div className="cartItem d-flex align-center mb-20">
            <div style={{ backgroundImage: 'url(/img/sneakers/01.jpg)' }} className="cartItemImg"></div>
            <div className="mr-20">
              <p className="mb-5">Мужские Кроссовки Nike Blazer Mid Suede</p>
              <b>12 999 руб.</b>
            </div>
            <img className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
          </div>
          <div className="cartItem d-flex align-center mb-20">
            <div style={{ backgroundImage: 'url(/img/sneakers/01.jpg)' }} className="cartItemImg"></div>
            <div className="mr-20">
              <p className="mb-5">Мужские Кроссовки Nike Blazer Mid Suede</p>
              <b>12 999 руб.</b>
            </div>
            <img className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
          </div>
        </div>

        <div className="cartTotalBlock">
          <ul>
            <li>
              <span>Итого</span>
              <div></div>
              <b>21 496 руб</b>
            </li>
            <li>
              <span>Налог 5%</span>
              <div></div>
              <b>1074 руб.</b>
            </li>
          </ul>

          <button>Оформить заказ</button>
        </div>
      
      </div>
    </div>
  )
}

export default Drawer;