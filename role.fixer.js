//Upgrader role is required for later.
var roleWallFixer = require('role.wallfixer')

module.exports = {
    run: function(creep){
        
    var activecontainer = creep.pos.findClosestByPath (FIND_STRUCTURES, 
                                                {filter: (s) => s.structureType == STRUCTURE_CONTAINER && _.sum(s.store) > 0})
        
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
                                                    {filter: (s) => s.hits < ((s.hitsMax)*0.75) && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_ROAD ||
                                                        s.hits < ((s.hitsMax)*0.90) && s.structureType == STRUCTURE_RAMPART ||
                                                        s.hits < ((s.hitsMax)*0.60) && s.structureType == STRUCTURE_ROAD
                                                    });
        
        if (damaged != undefined) {
            if (creep.repair(damaged) == ERR_NOT_IN_RANGE) {
                creep.moveTo(damaged)
            }
            }
       
                    //If cannot build, act as upgrader (prevents downtime)
                    else {
                    roleWallFixer.run(creep);    
        }
   }
   //Otherwise if the creep has no energy it will attempt to pick some up at a container
    else if (activecontainer != undefined) {
        if(creep.withdraw(activecontainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(activecontainer);
        }
    }
    //If there are no containers and creep needs energy it will attempt to pick some off the ground
   else {
        var source = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
        if(creep.pickup(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    }

}
};