function Drawer({items = [], onClose, onRemove}) {
  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30">
          Корзина
          <img onClick={onClose} className="removeBtn cu-p" src="/img/btn-remove.svg" alt="Remove" />
        </h2>

        {
          items.length > 0 ? 
          <div>
            <div className="items">
              {
                items.map((item) => (
                  <div className="cartItem d-flex align-center mb-20">
                    <div style={{ backgroundImage: `url(${item.imageUrl})` }} className="cartItemImg"></div>
                    <div className="mr-20">
                      <p className="mb-5">{item.name}</p>
                      <b>{item.price} руб.</b>
                    </div>
                    <img onClick={() => onRemove(item.id)} className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
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
          </div> :
           <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img className="mb-20" src="/img/empty-cart.jpg" width="120px" height="120px" alt="empty-cart" />
            <h2>Корзина пустая</h2>
            <p className="opacity-6">
              Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ
            </p>
            <button onClick={onClose} className="greenButton">
              Вернуться назад
            </button>
          </div>
        }
      
      </div>
    </div>
  )
}

export default Drawer;