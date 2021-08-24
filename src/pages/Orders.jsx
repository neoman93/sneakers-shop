import React from "react";
import axios from "axios";
import Card from "../components/Card";
import AppContext from "../Context";

function Orders() {
	const { onAddToFavorite, onAddtoCart } = React.useContext(AppContext);
	const [orders, setOrders] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get(
					"https://60fbf29091156a0017b4c950.mockapi.io/items"
				);
				setOrders(data.reduce((prev, obj) => [...prev, obj.items], []));
				setIsLoading(false);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);
	return (
		<div className="content p-40">
			<div className="d-flex align-center mb-40 justify-between">
				<h1>Мои заказы</h1>
			</div>
			<div className="sneakers d-flex flex-wrap">
				{orders.map((item, index) => (
					<Card
						key={index}
						onFavorite={(obj) => onAddToFavorite(obj)}
						onPlus={(obj) => onAddtoCart(obj)}
						loading={isLoading}
						{...item}
					/>
				))}
			</div>
		</div>
	);
}

export default Orders;
