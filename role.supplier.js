var roleTransit = require('role.transit');
module.exports = {
    run: function(creep){
        
    //Find all structures with energy storage
        var structure = creep.pos.findClosestByPath (FIND_MY_STRUCTURES, 
                                                    {filter: (s) => s.energy < s.energyCapacity && s.structureType == STRUCTURE_TOWER})
                                                    
        var activecontainer = creep.pos.findClosestByPath (FIND_STRUCTURES, 
                                                {filter: (s) => s.structureType == STRUCTURE_CONTAINER && _.sum(s.store) > 0})
    
    //If all storages are full of energy harvesters work as builders
    if (structure == undefined){
    roleTransit.run(creep);    
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
    //Otherwise if the creep has no energy it will attempt to pick some up at a container
     else if (activecontainer != undefined) {
        if(creep.withdraw(activecontainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(activecontainer);
        }
    }
    // Otherwise the creep will attempt to gather resources
    else {
        var source = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
        if(creep.pickup(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    }
    }
};