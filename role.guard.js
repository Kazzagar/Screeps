module.exports = {
      run: function(creep){
    //define enemies, our spawn and our ramparts      
    var danger = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS)
    var spawn = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_SPAWN})
    var rampart = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_RAMPART})
   
     //If danger is not present the creep will stop defending     
    if (creep.memory.working == true && danger == undefined) {
        creep.memory.working = false
    }
     //If there is a danger present the creep will start defending
    else if (creep.memory.working == false && danger != undefined) {
        creep.memory.working = true
    }
    //If the creep is defending it will move towards and attack enemies
    if (creep.memory.working == true){
        if (creep.attack(danger) == ERR_NOT_IN_RANGE) {
            creep.moveTo(danger);
        }
    }
    //Otherwise it will attempt to move to the nearest rampart (this is super lazy but was needed to stop spawn blocking)
    else {
        creep.moveTo(Game.flags.Rally)
    }
}
};
