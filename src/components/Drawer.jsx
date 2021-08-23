import React from "react";
import axios from "axios";
import { useCart } from "../hooks/useCart";
import Info from "./Info";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [] }) {
	const { cartItems, setCartItems, totalPrice } = useCart();
	const [orderId, setOrderId] = React.useState(null);
	const [isOrderComplete, setOrderIsComplete] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);
	const onClickOrder = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.post(
				"https://60fbf29091156a0017b4c950.mockapi.io/orders/",
				{
					items: cartItems,
				}
			);
			setOrderId(data.id);
			setOrderIsComplete(true);
			setCartItems([]);

			for (let i = 0; i < cartItems.length; i++) {
				const cartItem = cartItems[i];
				await axios.delete(
					"https://60fbf29091156a0017b4c950.mockapi.io/cart/" + cartItem.id
				);
				await delay(1000);
			}
		} catch (error) {
			alert("Не удалось создать ваш заказ");
		}
		setIsLoading(false);
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
									<span>Итого:</span>
									<div></div>
									<b>{totalPrice} руб.</b>
								</li>
								<li className="d-flex">
									<span>Налог 5%:</span>
									<div></div>
									<b>{((totalPrice / 100) * 5).toFixed(2)} руб.</b>
								</li>
							</ul>
							<button
								disabled={isLoading}
								className="btn-checkout"
								onClick={onClickOrder}
							>
								Оформить заказ <img src="/img/arrow-right.svg" alt="arrow" />
							</button>
						</div>
					</div>
				) : (
					<Info
						title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
						description={
							isOrderComplete
								? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
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
