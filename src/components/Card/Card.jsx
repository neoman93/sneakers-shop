import React from "react";
import ContentLoader from "react-content-loader";

import AppContext from "../../Context";

import "./Card.css";

function Card({
	id,
	title,
	imgUrl,
	price,
	onFavorite,
	onPlus,
	favorited = false,
	loading = false,
}) {
	const { isItemAdded } = React.useContext(AppContext);
	const [isFavorite, setIsFaforite] = React.useState(favorited);

	const onClickPlus = () => {
		onPlus({ id, title, imgUrl, price });
	};

	const onClickFavorite = () => {
		onFavorite({ id, title, imgUrl, price });
		setIsFaforite(!isFavorite);
	};

	return (
		<div className="card">
			{loading ? (
				<ContentLoader
					speed={2}
					width={155}
					height={255}
					viewBox="0 0 155 255"
					backgroundColor="#f3f3f3"
					foregroundColor="#ecebeb"
				>
					<rect x="0" y="0" rx="10" ry="10" width="155" height="155" />
					<rect x="0" y="164" rx="5" ry="5" width="155" height="15" />
					<rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
					<rect x="0" y="230" rx="5" ry="5" width="80" height="24" />
				</ContentLoader>
			) : (
				<React.Fragment>
					<div className="favorite" onClick={onClickFavorite}>
						<img
							onClick={setIsFaforite}
							className="card-unlike-icon"
							src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"}
							alt="Add to Favotite"
						/>
					</div>
					<img className="card-img" src={imgUrl} alt="Sneakers" />
					<h5 className="mb-40">{title}</h5>
					<div className="d-flex justify-between align-center">
						<div className="d-flex flex-column">
							<span>Цена:</span>
							<b>{price}</b>
						</div>
						<img
							onClick={onClickPlus}
							className="card-plus-icon"
							src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
							alt="plus"
						/>
					</div>
				</React.Fragment>
			)}
		</div>
	);
}

export default Card;
