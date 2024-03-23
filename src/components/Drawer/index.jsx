import React from "react";
import axios from 'axios';

import Info from "../Info";
import { useCart } from "../../hooks/useCart";

import styles from './Drawer.module.scss';


const delay = () => new Promise((res) => setTimeout(res, 1000))

function Drawer({items = [], onClose, onRemove, opened}) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [ orderId, setOrderId ] = React.useState(null);
  const [ isLoading, setIsLoading ] = React.useState(false);

  const onClickOrder = async () => {
   try {
      setIsLoading(true)
      const {data} = await axios.post('http://localhost:3001/orders', {
        items: cartItems
      });
      setOrderId(data.id)
      setIsOrderComplete(true);
      setCartItems([]);

      for(let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('http://localhost:3001/cart/' + item.id);
        await delay();
      }
        
   } catch(error) {
      alert("Не удалось оформить заказ :(")
   }
   setIsLoading(false);
  }

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">
          Корзина
          <img onClick={onClose} className="removeBtn cu-p" src="/img/btn-remove.svg" alt="Remove" />
        </h2>

        {
          items.length > 0 ? 
          <>
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
                  <b>{totalPrice} руб</b>
                </li>
                <li>
                  <span>Налог 5%</span>
                  <div></div>
                  <b>{totalPrice / 100 * 5} руб.</b>
                </li>
              </ul>

              <button className="greenButton" disabled={isLoading} onClick={onClickOrder}>Оформить заказ</button>
            </div>
          </> : <Info 
                title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая" } 
                description={isOrderComplete ? `Ваш заказ №${orderId} скоро будет передан курьерской доставкой` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ." }
                image={isOrderComplete ? "/img/completeOrder.jpg" : "/img/empty-cart.jpg"}
              />
        }
      
      </div>
    </div>
  )
}

export default Drawer;