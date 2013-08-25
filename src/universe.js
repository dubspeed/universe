
var MAX_PLEVEL = 3;
var MAX_DLEVEL = 3;

function getInitialState() {
    return {
        step: 0,
        players: [],
        planets: [],
        fleets: [],
        addPlayer: function( name ) {
            this.players.push( {
                name: name
            } );
            return this.players.length - 1;
        },
        addPlanet: function( position, owner, units ) {
            this.planets.push( {
                id: 0,
                owner: owner,
                units: units,
                position: position,
                pLevel: 1,
                dLevel: 1,
                links: []
            } );
            return this.planets.length - 1;
        },
        linkPlanets: function( planetId1, planetId2 ) {
            var planet1 = this.planets[ planetId1 ],
                planet2 = this.planets[ planetId2 ];
            planet1.links.push( planetId2 );
            planet2.links.push( planetId1 );
        },
        upgradeProduction: function( planetId ) {
            if ( this.planets[ planetId ].pLevel < MAX_PLEVEL ) {
                this.planets[ planetId ].pLevel += 1;
                return true;
            }
            return false;
        },
        upgradeDefense: function( planetId ) {
            if ( this.planets[ planetId ].dLevel < MAX_DLEVEL ) {
                this.planets[ planetId ].dLevel += 1;
                return true;
            }
            return false;
        }

    };
}

function advanceState( state ) {
    state.step += 1;
    return state;
}

module.exports = {
    getInitialState: getInitialState,
    advanceState: advanceState
};
