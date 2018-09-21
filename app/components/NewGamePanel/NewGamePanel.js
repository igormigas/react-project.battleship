import React from 'react';

const newGamePanel = (props) => {

	const onClickHandler = () => {
		props.history.push('/game');
	}

	return (
		<div className="NewGamePanel">
			<h4>Start your battleship experience!</h4>
			<button className="newGameButton" onClick={onClickHandler}>New Game</button>
		</div>
	);
};

export default newGamePanel;
