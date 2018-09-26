import {createNewGrid} from './initial';

	export function isString(value) {
		return typeof value === 'string' || value instanceof String;
	}

	export function isObject(value) {
		return value === Object(value);
	}

	export function isInteger(value, strict=false) {
		return Number.isInteger(strict ? value : +value);
	}

	export function countFieldsLeft(matrix, position) {
		let col = isObject(position) && position.hasOwnProperty('col') ? position.col : +position;
		return col - 1;
	}

	export function countFieldsRight(matrix, position) {
		let col = isObject(position) && position.hasOwnProperty('col') ? position.col : +position;
		let maxCols = Object.keys(matrix.A).length;
		return maxCols - col;
	}

	export function countFieldsTop(matrix, position) {
		let row = isObject(position) && position.hasOwnProperty('row') ? position.row : position;
		return charToInt(row) - 1;
	}

	export function countFieldsBottom(matrix, position) {
		let row = isObject(position) && position.hasOwnProperty('row') ? position.row : position;
		let maxRows = Object.keys(matrix).length;
		return maxRows - charToInt(row);
	}

	export function charToInt(char) {
		return char.charCodeAt(0) - 64;
	}

	export function intToChar(int) {
		return isInteger(int) && int >= 1 ? String.fromCharCode(+int + 64) : null;
	}
