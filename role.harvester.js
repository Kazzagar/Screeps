var roleUpgrader = require('role.upgrader');
module.exports = {
    run: function(creep){
        
    //Find all structures with energy storage
        var structure = creep.pos.findClosestByPath (FIND_MY_STRUCTURES, 
                                                    {filter: (s) => s.energy < s.energyCapacity})
    
    //If all storages are full of energy harvesters work as upgraders
    if (structure == undefined){
    roleUpgrader.run(creep);    
    }
    
    //Check whether the creep has finished working   
    if (creep.memory.working == true && creep.carry.energy == 0) {
        creep.memory.working = false
    }
    //Check whether the creep has finished harvesting 
    else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
        creep.memory.working = true
    }
    //If the creep is set to work it will attempt to transfer energy to the nearest energy store, if not in range it will move to the store.
    if (creep.memory.working == true){
            if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(structure);
        }
    }
    // Otherwise the creep will attempt to harvest resources
    else {
        var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    }
    }
};