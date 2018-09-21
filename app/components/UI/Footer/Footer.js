import React from 'react';
import { Link } from 'react-router-dom';

const footer = (props) => {
	return (
		<footer className="Footer">
			<Link to="/"><i className="footer__logo" /></Link>
		</footer>
	);
};

export default footer;
