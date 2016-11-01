//Upgrader role is required for later.
var roleUpgrader = require('role.upgrader');

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
    //If the creep is set to work it will attempt to build, if not in range it will move to the construction site.
   if (creep.memory.working == true){
       //Creep defines closest construction site.
       var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES)
       //Check that there are actual construction sites (as not to error) then builds.
       if (constructionSite != undefined) {
       if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
           creep.moveTo(constructionSite);
       }
        }
                //If cannot build, act as upgrader (prevents downtime)
                     else {
                    roleUpgrader.run(creep);    
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