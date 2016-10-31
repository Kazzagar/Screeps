module.exports = {
      run: function(creep){
    //define variables      
    var hurt = creep.pos.findClosestByPath(FIND_MY_CREEPS, {filter: (c) => c.hits < c.hitsMax})
    var guard = creep.pos.findClosestByPath(FIND_MY_CREEPS, {filter: (c) => c.memory.role == 'guard'})
    var spawn = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_SPAWN})
    var rampart = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_RAMPART})
   
     //If no creeps are injured stop healing     
    if (creep.memory.working == true && hurt == undefined) {
        creep.memory.working = false
    }
     //If injured creeps exist start healing
    else if (creep.memory.working == false && hurt != undefined) {
        creep.memory.working = true
    }
    //When healing creep will attempt to move to and heal
    if (creep.memory.working == true){
        if (creep.heal(hurt) == ERR_NOT_IN_RANGE) {
            creep.moveTo(hurt);
        }
    }
    //Otherwise move to the nearest guard
    else {
        creep.moveTo(guard)
}
}
};