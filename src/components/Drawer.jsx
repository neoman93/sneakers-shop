import React from "react";
import axios from "axios";
import AppContext from "../Context";
import { Info } from "./Info";

function Drawer({ onClose, onRemove, items = [] }) {
	const { cartItems, setCartItems } = React.useContext(AppContext);
	const [isOrderComplete, setOrderIsComplete] = React.useState(false);
	const onClickOrder = () => {
		axios.post("https://60fbf29091156a0017b4c950.mockapi.io/orders/", cartItems);
		setOrderIsComplete(true);
		setCartItems([]);
	};

	return (
		<div className="overlay">
			<div className="drawer">
				<h2 className="mb-30 d-flex justify-between">
					Корзина
					<img
						onClick={onClose}
						className="cart-remove-icon cu-p"
						src="/img/btn-remove.svg"
						alt="Remove"
					/>
				</h2>

				{items.length > 0 ? (
					<div className="d-flex flex-column flex">
						<div className="items">
							{items.map((obj) => {
								return (
									<div key={obj.id} className="cart-item d-flex align-center mb-20">
										<div
											style={{ backgroundImage: `url(${obj.imgUrl})` }}
											className="cart-item-img"
										></div>
										<div className="mr-20 flex">
											<p className="mb-5">{obj.title}</p>
											<b>{obj.price}</b>
										</div>
										<img
											onClick={() => onRemove(obj.id)}
											className="cart-remove-icon"
											src="/img/btn-remove.svg"
											alt="Remove"
										/>
									</div>
								);
							})}
						</div>
						<div className="cart-total-block">
							<ul>
								<li className="d-flex">
									import axios from "axios";
									<span>Итого:</span>
									<div></div>
									<b>21 498 руб.</b>
								</li>
								<li className="d-flex">
									<span>Налог 5%:</span>
									<div></div>
									<b>1074 руб.</b>
								</li>
							</ul>
							<button className="btn-checkout" onClick={onClickOrder}>
								Оформить заказ <img src="/img/arrow-right.svg" alt="arrow" />
							</button>
						</div>
					</div>
				) : (
					<Info
						title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
						description={
							isOrderComplete
								? "Ваш заказ #18 скоро будет передан курьерской доставке"
								: "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
						}
						image={isOrderComplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"}
					/>
				)}
			</div>
		</div>
	);
}

export default Drawer;
