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

buster.testCase( "addPlanet", {
    "setUp": function() {
        this.state = game.getInitialState();
    },
    "adds a planet object to the state": function() {
        this.state.addPlanet( { x: 10, y: 10 } );
        assert.equals( this.state.planets.length, 1 );
    }
} );
buster.testCase( "advanceState", {
    "setUp": function() {
        this.state = game.getInitialState();
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
    }
} );
