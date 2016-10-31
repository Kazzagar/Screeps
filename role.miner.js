module.exports = {
    run: function(creep){
    
    var transit = _.sum(Game.creeps, (c) => c.memory.role == 'transit');
     var structure = creep.pos.findClosestByPath (FIND_MY_STRUCTURES, 
                                                    {filter: (s) => s.energy < s.energyCapacity})
    //Check whether the creep has dropped energy  
    if (creep.memory.working == true && creep.carry.energy == 0) {
        creep.memory.working = false
    }
    //Check whether the creep has finished harvesting 
    else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
        creep.memory.working = true
    }
    //If the creep is set to work it will attempt to drop energy. (If no transit creeps exist it will transfer itself)
    if (creep.memory.working == true && transit > 0){
            creep.drop(RESOURCE_ENERGY)
        }
    //If creep needs to transit itself it will find nearest energy source and drop off
    else if (creep.memory.working == true){
            if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(structure);
        }
    }
    //Creep will return to source / continue harvesting
    else {
        var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    }

}
};