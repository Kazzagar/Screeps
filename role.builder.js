//Upgrader role is required for later.
var roleUpgrader = require('role.upgrader');

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
        // Otherwise go back to gather energy
        else {
        var source = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
        if(creep.pickup(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    }
}
};