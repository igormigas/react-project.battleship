import React from 'react';
import { connect } from 'react-redux';

import database from '../../services/Firebase';
//import classes from './TestComponent.scss'

class TestComponent extends React.Component {

	state = {
		testRedux: false,
		testFirebase: false,
	}

	constructor(props) {
		super(props);

	}

	componentDidMount() {
		// LOG PROPS
		console.log('[TestComponent]', this.props);

		// REDUX TEST
		this.props.dispatch({type:'TEST_SET_PARAM'});

		// FIREBASE SERVICE TEST
		database.test( res => {
			this.setState({
				testFirebase: res
			})
		});
	}

	render() {
		console.log('[TestComponent] RENDER')
		return (
			<div>
				<h4>Redux</h4>
				<p>Status: {this.props.testParam ? 'OK' : 'FALSE'}</p>
				<h4>Firebase</h4>
				<p>Status: {this.state.testFirebase ? 'OK' : 'FALSE'}</p>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		testParam: state.test.testParam,
	}
}

export default connect(mapStateToProps)(TestComponent);
