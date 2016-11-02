//requests the main logic controller
var managerspawn = require ('manager.spawn')
var managertowers = require ('manager.towers')
var managerdeath = require ('manager.death')
var managerroles = require ('manager.roles')
//Define our rooms
let currentRoom  = _.filter(Game.rooms, (room) => room.controller.my)
//Run logic in all of owned rooms
managerspawn.run(currentRoom);
managertowers.run(currentRoom);
managerdeath.run(currentRoom);
managerroles.run(currentRoom);