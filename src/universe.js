
function getInitialState() {
    return {
        step: 0,
        planets: [],
        fleets: [],
        players: []
    };
}

function addPlanet( state, position ) {
    state.planets.push( {
        id: 0,
        position: position
    } );
    return state;
}

function advanceState( state ) {
    state.step += 1;
    return state;
}

module.exports = {
    getInitialState: getInitialState,
    advanceState: advanceState,
    addPlanet: addPlanet
};
