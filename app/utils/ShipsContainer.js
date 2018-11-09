export default class ShipsContainer {
  constructor(ships) {
    this.ships = ships || [];

    this.totalShips = 0;
    this.destroyedShips = 0;
  }

  create(row, col, length, isHorizontal) {
    const ship = {
      row,
      col,
      length,
      isHorizontal,
      parts: Array(length).fill({ shot: false }),
      damagedParts: 0,
      destroyed: false,
    };
    this.ships.push(ship);
    this.totalShips += 1;
    return ship;
  }

  remove(key) {
    this.ships[key] = null;
    this.totalShips -= 1;
  }

  clear() {
    this.ships = [];
    this.totalShips = 0;
  }

  damage(shipKey, shipPart) {
    const effect = {
      destroyed: false,
    };
    const shipRef = this.ships[shipKey];
    if (shipRef) {
      const partRef = shipRef.parts[shipPart];
      if (partRef) {
        partRef.shot = true;
        shipRef.damagedParts += 1;
        if (shipRef.damagedParts == shipRef.length) {
          shipRef.destroyed = true;
          effect.destroyed = true;
          this.totalDestroyed += 1;
        }
      }
    }
    return effect;
  }

  anyShipDamaged(row, col) {
  	const ships = this.ships;
  	console.log(this);
    for (let [i, ship] of ships.entries()) {
      let result = this.isShipDamaged(ship, row, col);
      if (result) {
        result.key = i;
        return result;
      }
    }
    return false;
  }

  isShipDamaged(ship, row, col) {
    if (ship.isHorizontal) {
      if (row == ship.row && col >= ship.col && col < ship.col + ship.length - 1) {
        return {
          part: col - ship.col,
        };
      }
    } else if (col == ship.col && row >= ship.row && row < ship.row + ship.length - 1) {
      return {
        part: row - ship.row,
      };
    }
    return false;
  }

  allDestroyed() {
    return this.destroyedShips === this.totalShips;
  }

  export() {
    return this.ships;
  }
}
