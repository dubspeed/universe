
function getInitialState() {
    return {
        step: 0,
        planets: [],
        fleets: [],
        players: [],
        addPlanet: function( position ) {
            this.planets.push( {
                id: 0,
                position: position
            } );
        }
    };
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
