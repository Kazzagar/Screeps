var roleColonyHarvester = require('role.colony.harvester');
module.exports = {
run : function() {
    //Searches for creep names and then defines the variable creep as each independent creep
    for (let name in Game.creeps) {
    var creep = Game.creeps[name];
 
    
    if (creep.memory.role == 'colony.harvester') {
    roleColonyHarvester.run(creep);
    } 
}
}
};