module.exports = {
   run : function(currentRoom) { 
      //Clears the memory of old dead creeps
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name]
            console.log(name + ' has died :(')
        }
    }
}
};