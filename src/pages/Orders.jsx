import React from "react";
import Card from "../components/Card";

function Orders() {
	return (
		<div className="content p-40">
			<div className="d-flex align-center mb-40 justify-between">
				<h1>Мои заказы</h1>
			</div>
			<div className="sneakers d-flex flex-wrap">
				{[].map((item, index) => (
					<Card />
				))}
			</div>
		</div>
	);
}

export default Orders;
