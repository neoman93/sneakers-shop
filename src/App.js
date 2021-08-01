import axios from "axios";
import { Route } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Favorites from "./pages/Favorites";

function App() {
	const [items, setItems] = React.useState([]);
	const [searchValue, setSearchValue] = React.useState("");
	const [cartItems, setCartItems] = React.useState([]);
	const [favorites, setFavorites] = React.useState([]);
	const [cartOpened, setCardOpened] = React.useState(false);

	React.useEffect(() => {
		async function fetchData() {
			const cartResponse = await axios.get(
				"https://60fbf29091156a0017b4c950.mockapi.io/cart"
			);
			const favoritesResponse = await axios.get(
				"https://60fbf29091156a0017b4c950.mockapi.io/favorites"
			);
			const itemsResponse = await axios.get(
				"https://60fbf29091156a0017b4c950.mockapi.io/items"
			);
			setCartItems(cartResponse.data);
			setFavorites(favoritesResponse.data);
			setItems(itemsResponse.data);
		}

		fetchData();
	}, []);

	const onAddtoCart = (obj) => {
		if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
			axios.delete(`https://60fbf29091156a0017b4c950.mockapi.io/cart/${obj.id}`);
			setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
		}

		axios.post("https://60fbf29091156a0017b4c950.mockapi.io/cart", obj);
		setCartItems((prev) => [...prev, obj]);
	};

	const onRemoveFromCart = (id) => {
		axios.delete(`https://60fbf29091156a0017b4c950.mockapi.io/cart/${id}`);
		setCartItems((prev) => prev.filter((item) => item.id !== id));
	};

	const onAddToFavorite = async (obj) => {
		try {
			if (favorites.find((favObj) => favObj.id === obj.id)) {
				axios.delete(`https://60fbf29091156a0017b4c950.mockapi.io/favorites/${obj.id}`);
			} else {
				const { date } = await axios.post(
					"https://60fbf29091156a0017b4c950.mockapi.io/favorites",
					obj
				);
				setFavorites((prev) => [...prev, obj]);
			}
		} catch (error) {}
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

			<Route path="/" exact>
				<Home
					cartItems={cartItems}
					searchValue={searchValue}
					setSearchValue={setSearchValue}
					onChangeSearchInput={onChangeSearchInput}
					items={items}
					onAddToFavorite={onAddToFavorite}
					onAddtoCart={onAddtoCart}
				/>
			</Route>
			<Route path="/favorites" exact>
				<Favorites items={favorites} onAddToFavorite={onAddToFavorite} />
			</Route>
		</div>
	);
}

export default App;
