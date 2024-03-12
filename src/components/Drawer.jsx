function Drawer({items = [], onClose}) {
  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30">
          Корзина
          <img onClick={onClose} className="removeBtn cu-p" src="/img/btn-remove.svg" alt="Remove" />
        </h2>
        <div className="items">
          {
            items.map((item) => (
              <div className="cartItem d-flex align-center mb-20">
                <div style={{ backgroundImage: `url(${item.imageUrl})` }} className="cartItemImg"></div>
                <div className="mr-20">
                  <p className="mb-5">{item.name}</p>
                  <b>{item.price} руб.</b>
                </div>
                <img className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
              </div>
            ))
          }

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