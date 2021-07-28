import axios from "axios";
import React from "react";
import Card from "./components/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";

function App() {
	let [items, setItems] = React.useState([]);
	let [searchValue, setSearchValue] = React.useState("");
	let [cartItems, setCartItems] = React.useState([]);
	const [cartOpened, setCardOpened] = React.useState(false);

	React.useEffect(() => {
		axios.get("https://60fbf29091156a0017b4c950.mockapi.io/items").then((res) => {
			setItems(res.data);
		});
		axios.get("https://60fbf29091156a0017b4c950.mockapi.io/cart").then((res) => {
			setCartItems(res.data);
		});
	}, []);

	const onAddtoCart = (obj) => {
		axios.post("https://60fbf29091156a0017b4c950.mockapi.io/cart", obj);
		setCartItems((prev) => [...prev, obj]);
	};

	const onRemoveFromCart = (id) => {
		axios.delete(`https://60fbf29091156a0017b4c950.mockapi.io/cart/${id}`);
		setCartItems((prev) => prev.filter((item) => item.id !== id));
	};

	const onChangeSearchInput = (event) => {
		setSearchValue(event.target.value);
	};

	return (
		<div className="wrapper clear">
			{cartOpened ? (
				<Drawer
					items={cartItems}
					onClose={() => setCardOpened(false)}
					onRemove={onRemoveFromCart}
				/>
			) : null}
			<Header onClickCart={() => setCardOpened(true)} />

			<div className="content p-40">
				<div className="d-flex align-center mb-40 justify-between">
					<h1>
						{searchValue ? `Поиск по запросу: "${searchValue}"  ` : "Все кроссовки"}
					</h1>
					<div className="search-block d-flex">
						<img src="/img/search-icon.svg" alt="Search" />
						{searchValue && (
							<img
								onClick={() => setSearchValue("")}
								className="input-clear"
								src="/img/btn-remove.svg"
								alt="Remove"
							/>
						)}
						<input
							onChange={onChangeSearchInput}
							value={searchValue}
							type="text"
							placeholder="Поиск.."
						/>
					</div>
				</div>
				<div className="sneakers d-flex flex-wrap">
					{items
						.filter((item) =>
							item.title.toLowerCase().includes(searchValue.toLowerCase())
						)
						.map((item, index) => (
							<Card
								key={index}
								title={item.title}
								price={item.price}
								imgUrl={item.imgUrl}
								onFavorite={() => console.log("added to bookmarks")}
								onPlus={(obj) => onAddtoCart(obj)}
							/>
						))}
				</div>
			</div>
		</div>
	);
}

export default App;
