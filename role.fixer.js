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
    //If the creep is set to work it will attempt to repair, if not in range it will move to the damaged building.
   if (creep.memory.working == true){
       //Creep defines closest damaged building. (Not walls, as walls have millions of hp and will be impossible to fully repair)
       var damaged = creep.pos.findClosestByPath(FIND_STRUCTURES,
                                                    {filter: (s) => s.hits < ((s.hitsMax)*0.75) && s.structureType != STRUCTURE_WALL ||
                                                        s.hits < ((s.hitsMax)*0.90) && s.structureType == STRUCTURE_RAMPART
                                                    });
        
        if (damaged != undefined) {
            if (creep.repair(damaged) == ERR_NOT_IN_RANGE) {
                creep.moveTo(damaged)
            }
        }
       
   //If cannot build, act as upgrader (prevents downtime)
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