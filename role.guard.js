module.exports = {
      run: function(creep){
    //define enemies, our spawn and our ramparts      
    var enemycreep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
    var enemydefender = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {filter: (c) => c.getActiveBodyparts(ATTACK) > 0 || c.getActiveBodyparts(RANGED_ATTACK) > 0})
    var enemystructure = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES != STRUCTURE_CONTROLLER)
    var enemytower = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_TOWER})
    var enemyspawn = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_SPAWN})
    var enemyhealer = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {filter: (c) => c.getActiveBodyparts(HEAL) > 0})

     //If danger is not present the creep will stop defending     
    if (creep.memory.working == true && (enemycreep == undefined || enemystructure == undefined)) {
        creep.memory.working = false
    }
     //If there is a danger present the creep will start defending
    else if (creep.memory.working == false && (enemycreep != undefined || enemystructure != undefined)) {
        creep.memory.working = true
    }
    //If the creep is defending it will move towards and attack enemies
    if (creep.memory.working == true && enemydefender != undefined){
        if (creep.attack(enemydefender) == ERR_NOT_IN_RANGE) {
            creep.moveTo(enemydefender);
        }
    }
    else if (creep.memory.working == true && enemyhealer != undefined){
        if (creep.attack(enemyhealer) == ERR_NOT_IN_RANGE) {
            creep.moveTo(enemyhealer);
        }
    }
    else if (creep.memory.working == true && enemytower != undefined){
        if (creep.attack(enemytower) == ERR_NOT_IN_RANGE) {
            creep.moveTo(enemytower);
        }
    }
    else if (creep.memory.working == true && enemyspawn != undefined){
        if (creep.attack(enemyspawn) == ERR_NOT_IN_RANGE) {
            creep.moveTo(enemyspawn);
        }
    }
    else if (creep.memory.working == true && enemycreep != undefined){
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
