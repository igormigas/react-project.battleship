import React from 'react';
import PropTypes from 'prop-types';

import imgDot from '../../images/svg/icon-dot.svg';
import imgCross from '../../images/svg/icon-cross.svg';

import classes from './Grid.scss';

const square = (props) => {

	const getValue = () => {
		switch (props.type) {
			case 2:
			return <img src={imgDot} />;

			case 3:
			return null;

			case 4:
			return <img src={imgCross} />;

			default:
			return null;
		}
	}

	const getClass = () => {
		switch (props.type) {
			case 2:
			return 'missed';

			case 3:
			return 'ship';

			case 4:
			return 'hit';

			default:
			return 'default';
		}
	}

	const onClickHandler = () => {
		props.fireEvent(props.row, props.col)
	}

	return (
		<div
			className={classes.Square + ' ' + getClass()}
			onClick={onClickHandler}>
			{getValue()}
		</div>
	);
};

export default square;
