//Upgrader role is required for later.
var roleBuilder = require('role.builder');

module.exports = {
    run: function(creep){
        
    //Check whether the creep has finished working   
    if (creep.memory.working == true && creep.carry.energy == 0) {
        creep.memory.working = false;
    }
    //Check whether the creep has finished harvesting 
    else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
        creep.memory.working = true
    }
    // if creep is supposed to repair something
        if (creep.memory.working == true) {
            // find all walls in the room
            var walls = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_WALL && s.structureType == STRUCTURE_RAMPART
            });

            var target = undefined;

            // loop with increasing percentages
            for (let percentage = 0.05; percentage <= 1; percentage = percentage + 0.05){
                // find a wall with less than percentage hits

                target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => s.structureType == STRUCTURE_WALL && s.structureType == STRUCTURE_RAMPART &&
                                   s.hits / s.hitsMax < percentage
                });

                // if there is one
                if (target != undefined) {
                    // break the loop
                    break;
                }
            }

            // if we find a wall that has to be repaired
            if (target != undefined) {
                // try to repair it, if not in range
                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(target);
                }
            }
       
       
       
       
   //If cannot repair, act as upgrader (prevents downtime)
        else {
        roleBuilder.run(creep);    
        }
   }    
        // Otherwise go back to gather energy
        else {
        var source = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
        if(creep.pickup(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    }
}
};