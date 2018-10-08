import React from 'react';
import PropTypes from 'prop-types';

import Grid from '../../components/Grid';
import { createNewGrid } from '../../functions/initial';

class GameCreator extends React.Component {

	onClickHandler = () => {

	}

	render() {
		return (
			<div>
				Create your ships
				<Grid
					player={0}
					fields={createNewGrid(9,9)}
					onClickEvent={this.onClickHandler}
				/>
			</div>
		);
	}
}

export default GameCreator;
