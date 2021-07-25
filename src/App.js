import React from "react";
import Card from "./components/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";

function App() {
	let [items, setItems] = React.useState([]);
	const [cartOpened, setCardOpened] = React.useState(false);

	fetch("https://60fbf29091156a0017b4c950.mockapi.io/items")
		.then((response) => response.json())
		.then((json) => setItems(json));

	return (
		<div className="wrapper clear">
			{cartOpened ? <Drawer onClose={() => setCardOpened(false)} /> : null}
			<Header onClickCart={() => setCardOpened(true)} />

			<div className="content p-40">
				<div className="d-flex align-center mb-40 justify-between">
					<h1>Все кроссовки</h1>
					<div className="search-block d-flex">
						<img src="/img/search-icon.svg" alt="Search" />
						<input type="text" placeholder="Поиск.." />
					</div>
				</div>
				<div className="sneakers d-flex justify-between flex-wrap">
					{items.map((obj) => (
						<Card
							title={obj.title}
							price={obj.price}
							imgUrl={obj.imgUrl}
							onClick={() => console.log("hello")}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
