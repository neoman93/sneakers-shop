function Drawer(props) {
	return (
		<div className="overlay">
			<div className="drawer">
				<h2 className="mb-30 d-flex justify-between">
					Корзина
					<img
						onClick={props.onClose}
						className="cart-remove-icon cu-p"
						src="/img/btn-remove.svg"
						alt="Remove"
					/>
				</h2>
				<div className="items">
					<div className="cart-item d-flex align-center mb-20">
						<div
							style={{ backgroundImage: "url(/img/sneakers/4.jpg)" }}
							className="cart-item-img"
						></div>
						<div className="mr-20 flex">
							<p className="mb-5">Мужские Кроссовки Nike Air Max 270</p>
							<b>12 999 руб.</b>
						</div>
						<img className="cart-remove-icon" src="/img/btn-remove.svg" alt="Remove" />
					</div>

					<div className="cart-item d-flex align-center mb-20">
						<div
							style={{ backgroundImage: "url(/img/sneakers/4.jpg)" }}
							className="cart-item-img"
						></div>
						<div className="mr-20 flex">
							<p className="mb-5">Мужские Кроссовки Nike Air Max 270</p>
							<b>12 999 руб.</b>
						</div>
						<img className="cart-remove-icon" src="/img/btn-remove.svg" alt="Remove" />
					</div>
				</div>
				<div className="cart-total-block">
					<ul>
						<li className="d-flex">
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
					<button className="btn-checkout">
						Оформить заказ <img src="/img/arrow-right.svg" alt="arrow" />{" "}
					</button>
				</div>
			</div>
		</div>
	);
}

export default Drawer;
