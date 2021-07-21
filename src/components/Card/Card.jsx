import "./Card.css";
function Card(props) {
	const onClickButton = () => {
		console.log("Clicked!");
	};

	return (
		<div className="card">
			<div className="favorite">
				<img
					className="card-unlike-icon"
					src="/img/heart-unliked.svg"
					alt="Add to Favotite"
				/>
			</div>
			<img className="card-img" src={props.imgUrl} alt="Sneakers" />
			<h5 className="mb-40">{props.title}</h5>
			<div className="d-flex justify-between align-center">
				<div className="d-flex flex-column">
					<span>Цена:</span>
					<b>{props.price}</b>
				</div>
				<button className="button" onClick={onClickButton()}>
					<img className="card-plus-icon" src="/img/plus-icon.svg" alt="plus" />
				</button>
			</div>
		</div>
	);
}

export default Card;
