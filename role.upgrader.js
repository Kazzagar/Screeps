module.exports = {
      run: function(creep){
     //Check whether the creep has finished working      
    if (creep.memory.working == true && creep.carry.energy == 0) {
        creep.memory.working = false
    }
     //Check whether the creep has finished harvesting
    else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
        creep.memory.working = true
    }
    //If the creep is set to work it will attempt to upgrade, if not in range it will move to the upgrader.
    if (creep.memory.working == true){
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
    }
    // Otherwise the creep will attempt to harvest resources
    else {
        var source = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
        if(creep.pickup(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    }
    }
};