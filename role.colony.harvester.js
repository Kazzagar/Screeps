module.exports = {
    run: function(creep){
    
    var container = creep.pos.findClosestByPath (FIND_STRUCTURES, 
                                                {filter: (s) => _.sum(s.store) < s.storeCapacity && s.structureType == STRUCTURE_CONTAINER})
    
    if (Game.flags.Colony == undefined){
        creep.suicide
    }
    //Check whether the creep has dropped energy off. 
    if (creep.memory.working == true && creep.carry.energy == 0) {
        creep.memory.working = false
    }
    //Check whether the creep has finished harvesting 
    else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
        creep.memory.working = true
    }
    //If the creep is set to work it will attempt to drop energy to a container.
    if (creep.memory.working == true && container != undefined){
            if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
            }
        }
    //If no container exists it will attempt to go home
    else if (creep.memory.working == true) {
            creep.moveTo(Game.flags.Home)
    }
    //Creep will return to source / continue harvesting
    else if (creep.memory.working == false &&  Game.flags.Colony.pos.roomName == creep.pos.roomName){
        var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
        
    }
    else {
        creep.moveTo(Game.flags.Colony)
    }

}
};