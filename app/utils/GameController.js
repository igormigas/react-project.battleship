
import ShipsContainer from './ShipsContainer';
import GridContainer from './GridContainer';

export default class GameController {
  constructor() {
    this.grids = {};
    this.ships = {};
  }

  createNewShip(row, col, length, isHorizontal) {
    console.log(this.ships, this.grid);
    const shipRef = this.ships.user.create(row, col, length, isHorizontal);
    this.mapShipToGrid(this.grids.user, shipRef);
  }

  mapShipToGrid(grid, ship) {
    let range;
    if (ship.isHorizontal) {
      range = this.range(ship.col, ship.col + ship.length - 1);
      for (let col of range) {
        grid.setFieldAsShip(ship.row, col);
      }
    } else {
      range = this.range(ship.row, ship.row + ship.length - 1);
      for (let row of range) {
        grid.setFieldAsShip(row, ship.col);
      }
    }
  }

  isNewShot(row, col) {
    return !this.grids.opponent.isFieldShot(row, col);
  }

  applyDamage(row, col) {
    let damage, effect;

    this.grids.opponent.setFieldAsShot(row, col);
    if (damage = this.ships.opponent.anyShipDamaged(row, col)) {
      effect = this.ships.opponent.damage(damage);
    }
    return {
      damage,
      effect,
    };
  }

  startShipsDeployment() {
    this.createEmptyUserGrid();
    this.createEmptyShipsContainer();
  }

  //************************************
  //
  // COMMON
  //
  //************************************

  createEmptyUserGrid() {
    this.grids.user = new GridContainer();
  }

  createEmptyShipsContainer() {
    this.ships.user = new ShipsContainer();
  }

  storeUserGrid(grid) {
    this.grids.user = new GridContainer(grid);
  }

  storeOpponentGrid(grid) {
    this.grids.opponent = new GridContainer(grid);
  }

  storeGrids(userGrid, opponentGrid) {
    this.storeUserGrid(userGrid);
    this.storeOpponentGrid(opponentGrid);
  }

  storeUserShips(ships) {
    this.ships.user = new ShipsContainer(ships);
  }

  storeOpponentShips(ships) {
    this.ships.opponent = new ShipsContainer(ships);
  }

  storeShips(userShips, opponentShips) {
    this.storeUserShips(userShips);
    this.storeOpponentShips(opponentShips);
  }

  getUserGrid() {
    return this.grids.user;
  }

  getOpponentGrid() {
    return this.grids.opponent;
  }

  getUserShips() {
    return this.ships.user;
  }

  getOpponentShips() {
    return this.ships.opponent;
  }

  exportUserGrid() {
    return this.grids.user.export();
  }

  exportOpponentGrid() {
    return this.grids.opponent.export();
  }

  exportUserShips() {
    return this.ships.user.export();
  }

  exportOpponentShips() {
    return this.ships.opponent.export();
  }

  //************************************
  //
  // UTILS
  //
  //************************************

  range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx);
  }
}
