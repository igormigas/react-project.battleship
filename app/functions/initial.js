
export function getInitialGameConfig() {
	return {
		id: null,
		time: {
			created: null,
			modified: null
		},
		turn: 0,
		player: {
			0: {
				id: null,
				details: {
					firstName: null,
					lastName: null,
					pictureUrl: null
				},
				grid: createNewGrid(9,9)
			},
			1: {
				id: null,
				details: {
					firstName: null,
					lastName: null,
					pictureUrl: null
				},
				grid: createNewGrid(9,9)
			}
		}
	}
}

export function createNewGrid(x=3, y=3) {
	return Array(x).fill(Array(y).fill(0));
}

function getInitialGrid() {
	return {
		A: {
			1: fieldState(),
			2: fieldState(false, true),
			3: fieldState(false, true),
			4: fieldState(false, true),
			5: fieldState(false, true),
			6: fieldState(),
			7: fieldState(),
			8: fieldState(),
			9: fieldState(),
		},
		B: {
			1: fieldState(false, true),
			2: fieldState(true),
			3: fieldState(true),
			4: fieldState(true),
			5: fieldState(true),
			6: fieldState(false, true),
			7: fieldState(),
			8: fieldState(),
			9: fieldState(),
		},
		C: {
			1: fieldState(),
			2: fieldState(false, true),
			3: fieldState(false, true),
			4: fieldState(false, true),
			5: fieldState(false, true),
			6: fieldState(),
			7: fieldState(),
			8: fieldState(),
			9: fieldState(),
		},
		D: {
			1: fieldState(),
			2: fieldState(),
			3: fieldState(),
			4: fieldState(),
			5: fieldState(),
			6: fieldState(),
			7: fieldState(),
			8: fieldState(),
			9: fieldState(),
		},
		E: {
			1: fieldState(),
			2: fieldState(),
			3: fieldState(),
			4: fieldState(),
			5: fieldState(),
			6: fieldState(),
			7: fieldState(),
			8: fieldState(),
			9: fieldState(),
		},
		F: {
			1: fieldState(),
			2: fieldState(),
			3: fieldState(),
			4: fieldState(),
			5: fieldState(),
			6: fieldState(),
			7: fieldState(),
			8: fieldState(),
			9: fieldState(),
		},
		G: {
			1: fieldState(),
			2: fieldState(),
			3: fieldState(),
			4: fieldState(),
			5: fieldState(),
			6: fieldState(),
			7: fieldState(),
			8: fieldState(),
			9: fieldState(),
		},
		H: {
			1: fieldState(),
			2: fieldState(),
			3: fieldState(),
			4: fieldState(),
			5: fieldState(),
			6: fieldState(),
			7: fieldState(),
			8: fieldState(),
			9: fieldState(),
		},
		I : {
			1: fieldState(),
			2: fieldState(),
			3: fieldState(),
			4: fieldState(),
			5: fieldState(),
			6: fieldState(),
			7: fieldState(),
			8: fieldState(),
			9: fieldState(),
		}
	}
}
