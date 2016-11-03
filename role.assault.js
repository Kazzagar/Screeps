module.exports = {
     run: function(creep){
    var enemyspawn = creep.pos.findClosestByRange(FIND_HOSTILE_SPAWNS)
    var enemyconstruct = creep.pos.findClosestByRange(FIND_HOSTILE_CONSTRUCTION_SITES)
    var enemystruct = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES)
    var enemytower = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_TOWER})
    var danger = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {filter: (c) => c.getActiveBodyparts['attack'] > 0 })
    var enemycreep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
    var conquestflag = Game.flags.Assault
    var rally = Game.flags.Rally
    
    
    
}
};