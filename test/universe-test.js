var buster = require( "buster" );
var game = require( "../src/universe" );

buster.testCase( "universe", {
    "advanceState()": function() {
        assert.isFunction( game.advanceState );
    },
    "getInitialState()": function() {
        assert.isFunction( game.getInitialState );
    }
});

buster.testCase( "getInitialState", {
    "returns a valid state": function() {
        var state = game.getInitialState();
        assert.isObject( state );
        assert.defined( state.step );
        assert.equals( state.step, 0 );
    },
    "state has some known properties": function() {
        var state = game.getInitialState();
        assert.isArray( state.planets );
        assert.isArray( state.fleets );
        assert.isArray( state.players );
    }
} );

buster.testCase( "State methods", {
    "setUp": function() {
        this.state = game.getInitialState();
    },
    "addPlayer()": function() {
        var id = this.state.addPlayer( "John Doe");
        assert.isNumber( id );
        assert.equals( this.state.players.length, 1 );
        assert.equals( this.state.players[ 0 ].name, "John Doe");
        this.state.addPlayer( "Computer 1");
        assert.equals( this.state.players.length, 2 );
        assert.equals( this.state.players[ 1 ].name, "Computer 1");
    },
    "addPlanet()": function() {
        var id = this.state.addPlanet( { x: 10, y: 10 }, 1, 10 );
        assert.isNumber( id );
        assert.equals( this.state.planets.length, 1 );
        var p = this.state.planets[0];
        assert.equals( p.owner, 1 );
        assert.equals( p.position, { x: 10, y: 10 } );
        assert.equals( p.units, 10 );
        assert.equals( p.pLevel, 1 );
        assert.equals( p.dLevel, 1 );
        assert.equals( p.links.length, 0 );
    },
    "linkPlanets()": function() {
        this.state.addPlanet( { x: 1, y : 1 }, 1, 10 );
        this.state.addPlanet( { x: 2, y : 2 }, 2, 20 );
        this.state.linkPlanets( 0, 1 );
        assert.equals( this.state.planets[ 0 ].links.length, 1 );
        assert.equals( this.state.planets[ 1 ].links.length, 1 );
        assert.equals( this.state.planets[ 0 ].links[ 0 ], 1 );
        assert.equals( this.state.planets[ 1 ].links[ 0 ], 0 );
    },
    "upgradeProduction()": function() {
        var id = this.state.addPlanet( { x: 1, y: 1 }, 1, 10 ),
            result;
        assert.equals( this.state.planets[ id ].pLevel, 1 );
        result = this.state.upgradeProduction( id );
        assert( result );
        assert.equals( this.state.planets[ id ].pLevel, 2 );
        result = this.state.upgradeProduction( id );
        assert( result );
        assert.equals( this.state.planets[ id ].pLevel, 3 );
        result = this.state.upgradeProduction( id );
        refute( result );
        assert.equals( this.state.planets[ id ].pLevel, 3 );
    },
    "upgradeDefense()": function() {
        var id = this.state.addPlanet( { x: 1, y: 1 }, 1, 10 ),
            result;
        assert.equals( this.state.planets[ id ].dLevel, 1 );
        result = this.state.upgradeDefense( id );
        assert( result );
        assert.equals( this.state.planets[ id ].dLevel, 2 );
        result = this.state.upgradeDefense( id );
        assert( result );
        assert.equals( this.state.planets[ id ].dLevel, 3 );
        result = this.state.upgradeDefense( id );
        refute( result );
        assert.equals( this.state.planets[ id ].dLevel, 3 );

    }
} );

buster.testCase( "advanceState", {
    "setUp": function() {
        this.state = game.getInitialState();
        this.player1= this.state.addPlayer( "John Doe" );
        this.planet1 = this.state.addPlanet( { x: 1, y: 1 }, this.player1, 0 );
    },
    "accepts and returns a state": function() {
        var newState = game.advanceState( this.state );
        assert.isObject( newState );
    },
    "returns an advanced state": function() {
        var newState;
        newState = game.advanceState( this.state );
        assert.equals( newState.step, 1 );
        newState = game.advanceState( this.state );
        assert.equals( newState.step, 2 );
    },
    "advances units of planets": function() {
        var newState = game.advanceState( this.state );
        assert.equals( newState.planets[ this.planet1 ].units, 1 );
    },
    "advances units of planets with different production levels": function() {
        this.state.upgradeProduction( this.planet1 );
        var newState = game.advanceState( this.state );
        assert.equals( newState.planets[ this.planet1 ].units, 1.5 );
        this.state.upgradeProduction( this.planet1 );
        newState = game.advanceState( this.state );
        assert.equals( newState.planets[ this.planet1 ].units, 3.5 );
    }
} );
