module.exports = {
      run: function(creep){
    //define enemies, our spawn and our ramparts      
    var enemycreep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
     var enemystructure = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES)
    

     //If danger is not present the creep will stop defending     
    if (creep.memory.working == true && enemycreep == undefined) {
        creep.memory.working = false
    }
     //If there is a danger present the creep will start defending
    else if (creep.memory.working == false && (enemycreep != undefined || enemystructure != undefined)) {
        creep.memory.working = true
    }
    //If the creep is defending it will move towards and attack enemies
    if (creep.memory.working == true && enemycreep != undefined){
        if (creep.attack(enemycreep) == ERR_NOT_IN_RANGE) {
            creep.moveTo(enemycreep);
        }
    }
    else if (creep.memory.working == true && enemycreep == undefined) {
        if (creep.attack(enemystructure) == ERR_NOT_IN_RANGE) {
            creep.moveTo(enemystructure);
        }
    }
    //Otherwise it will attempt to move to the nearest rally (this is super lazy but was needed to stop spawn blocking)
    else if (enemycreep == undefined && enemystructure == undefined) {
        creep.moveTo(Game.flags.Rally)
    }
}
};
