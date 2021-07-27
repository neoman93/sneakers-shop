function Drawer({ onClose, onRemove, items = [] }) {
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
					<div>
						<div className="items">
							{items.map((obj) => {
								return (
									<div className="cart-item d-flex align-center mb-20">
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
				) : (
					<div class="cartEmpty d-flex align-center justify-center flex-column flex">
						<img
							class="mb-20"
							width="120px"
							height="120px"
							src="/img/empty-cart.jpg"
							alt="Empty"
						/>
						<h2>Корзина пустая</h2>
						<p class="opacity-6">
							Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.
						</p>
						<button onClick={onClose} class="greenButton">
							<img src="/img/arrow.svg" alt="Arrow" />
							Вернуться назад
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default Drawer;
