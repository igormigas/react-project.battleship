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
  };

  const getClass = () => {
    switch (props.type) {
      case 2:
        return classes.missed;

      case 3:
        return classes.ship;

      case 4:
        return classes.hit;

      default:
        return classes.default;
    }
  };

  const onClickHandler = () => {
    props.clickEvent(props.row, props.col);
  };

  const onMouseEnterHandler = () => {
    props.mouseEnterEvent(props.row, props.col);
  };

  const onMouseLeaveHandler = () => {
    props.mouseLeaveEvent();
  };

  function styles() {
    const array = [
      classes.Square,
      getClass(),
    ];
    props.hovered && array.push(classes.hovered);
    return array.join(' ');
  }

  return (
    <div
      className={styles()}
      onClick={onClickHandler}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      {getValue()}
    </div>
  );
};

square.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  type: PropTypes.number,
  hovered: PropTypes.bool,
  clickEvent: PropTypes.func,
  mouseEnterEvent: PropTypes.func.isRequired,
  mouseLeaveEvent: PropTypes.func.isRequired,
};

export default square;
