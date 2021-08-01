import Card from "../components/Card";
function Home({
	cartItems,
	searchValue,
	setSearchValue,
	onChangeSearchInput,
	items,
	onAddToFavorite,
	onAddtoCart,
}) {
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
			<div className="sneakers d-flex flex-wrap">
				{items
					.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
					.map((item, index) => (
						<Card
							key={index}
							onFavorite={(obj) => onAddToFavorite(obj)}
							onPlus={(obj) => onAddtoCart(obj)}
							added={cartItems.some((obj) => Number(obj.id) === Number(item.obj))}
							{...item}
						/>
					))}
			</div>
		</div>
	);
}

export default Home;
