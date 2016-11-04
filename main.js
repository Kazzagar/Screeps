//requests the main logic controller
var managerspawn = require ('manager.spawn')
var managertowers = require ('manager.towers')
var managerdeath = require ('manager.death')
var managerroles = require ('manager.roles')
var managercolony = require ('manager.colony')
//Define our rooms
let homeRooms  = _.filter(Game.rooms, (room) => room.controller.my)

//Run logic in all of owned rooms
managerspawn.run(homeRooms);
managertowers.run(homeRooms);
managerdeath.run(Game.rooms);
managerroles.run(Game.rooms);
managercolony.run(Game.rooms);