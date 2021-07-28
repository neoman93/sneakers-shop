import React from "react";
import "./Card.css";
function Card({ title, price, imgUrl, onFavorite, onPlus }) {
	const [isAdded, setIsAdded] = React.useState(false);
	const [isFavorite, setisFaforite] = React.useState(false);

	const onClickPlus = () => {
		onPlus({ title, price, imgUrl });
		setIsAdded(true);
	};

	const onClickFavorite = () => {
		setisFaforite(!isFavorite);
	};

	return (
		<div className="card">
			<div className="favorite" onClick={onClickFavorite}>
				<img
					onClick={setisFaforite}
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
					src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
					alt="plus"
				/>
			</div>
		</div>
	);
}

export default Card;
