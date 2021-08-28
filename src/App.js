import React from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer/Drawer";
import AppContext from "./Context";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";

function App() {
	const [items, setItems] = React.useState([]);
	const [cartItems, setCartItems] = React.useState([]);
	const [favorites, setFavorites] = React.useState([]);
	const [searchValue, setSearchValue] = React.useState("");
	const [cartOpened, setCartOpened] = React.useState(false);
	const [isLoading, setIsloading] = React.useState(true);

	React.useEffect(() => {
		async function fetchData() {
			try {
				const cartResponse = await axios.get(
					"https://60fbf29091156a0017b4c950.mockapi.io/cart"
				);
				const favoritesResponse = await axios.get(
					"https://60fbf29091156a0017b4c950.mockapi.io/favorites"
				);
				const itemsResponse = await axios.get(
					"https://60fbf29091156a0017b4c950.mockapi.io/items"
				);

				setIsloading(false);

				setCartItems(cartResponse.data);
				setFavorites(favoritesResponse.data);
				setItems(itemsResponse.data);
			} catch (error) {
				alert("Error on fetch data", error);
			}
		}

		fetchData();
	}, []);

	const onAddtoCart = async (obj) => {
		try {
			if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
				axios.delete(`https://60fbf29091156a0017b4c950.mockapi.io/cart/${obj.id}`);
				setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
			} else {
				axios.post("https://60fbf29091156a0017b4c950.mockapi.io/cart/", obj);
				setCartItems((prev) => [...prev, obj]);
			}
		} catch (error) {
			alert("Error on add to cart", error);
		}
	};

	const onRemoveFromCart = async (id) => {
		try {
			axios.delete(`https://60fbf29091156a0017b4c950.mockapi.io/cart/${id}`);
			setCartItems((prev) => prev.filter((item) => item.id !== id));
		} catch (error) {
			alert("Error on remove from cart", error);
		}
	};

	const onAddToFavorite = async (obj) => {
		try {
			if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
				axios.delete(`https://60fbf29091156a0017b4c950.mockapi.io/favorites/${obj.id}`);
				setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
			} else {
				const { data } = await axios.post(
					"https://60fbf29091156a0017b4c950.mockapi.io/favorites/",
					obj
				);
				setFavorites((prev) => [...prev, data]);
			}
		} catch (error) {}
	};

	const onChangeSearchInput = (event) => {
		setSearchValue(event.target.value);
	};

	const isItemAdded = (id) => {
		return cartItems.some((obj) => Number(obj.parentId) === Number(id));
	};

	return (
		<AppContext.Provider
			value={{
				items,
				cartItems,
				favorites,
				isItemAdded,
				onAddToFavorite,
				onAddtoCart,
				setCartOpened,
				setCartItems,
			}}
		>
			<div className="wrapper clear">
				<Drawer
					items={cartItems}
					onClose={() => setCartOpened(false)}
					onRemove={onRemoveFromCart}
					opened={cartOpened}
				/>

				<Header onClickCart={() => setCartOpened(true)} />

				<Route path="/" exact>
					<Home
						cartItems={cartItems}
						searchValue={searchValue}
						setSearchValue={setSearchValue}
						onChangeSearchInput={onChangeSearchInput}
						items={items}
						onAddToFavorite={onAddToFavorite}
						onAddtoCart={onAddtoCart}
						isLoading={isLoading}
					/>
				</Route>
				<Route path="/favorites" exact>
					<Favorites />
				</Route>

				<Route path="/orders" exact>
					<Orders />
				</Route>
			</div>
		</AppContext.Provider>
	);
}

export default App;
