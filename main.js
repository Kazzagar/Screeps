//requests the main logic controller
var funcRoomController= require('func.RoomController');
//Define our rooms
let currentRoom  = _.filter(Game.rooms, (room) => room.controller.my)
//Run logic in all of owned rooms
funcRoomController.run(currentRoom);

