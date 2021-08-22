import React from "react";
import Card from "../components/Card";
function Home({
	items,
	searchValue,
	setSearchValue,
	onChangeSearchInput,
	onAddToFavorite,
	onAddtoCart,
	isLoading,
}) {
	const renderItems = () => {
		const filteredItems = items.filter((item) =>
			item.title.toLowerCase().includes(searchValue.toLowerCase())
		);
		return (isLoading ? [...Array(12)] : filteredItems).map((item, index) => (
			<Card
				key={index}
				onFavorite={(obj) => onAddToFavorite(obj)}
				onPlus={(obj) => onAddtoCart(obj)}
				loading={isLoading}
				{...item}
			/>
		));
	};
	return (
		<div className="content p-40">
			<div className="d-flex align-center mb-40 justify-between">
				<h1>{searchValue ? `Поиск по запросу: "${searchValue}"  ` : "Все кроссовки"}</h1>
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
			<div className="sneakers d-flex flex-wrap">{renderItems()}</div>
		</div>
	);
}

export default Home;
