module.exports = {
run : function(currentRoom) {
  //Find all towers in the room
    var towers = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_TOWER
    })
    //Array of all individual towers
    for(let tower of towers) {
        //define potential tower targets, enemies, damaged allies (for healing) and damaged structures        
        var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
        var hurt = tower.pos.findClosestByRange(FIND_MY_CREEPS,
                                                {filter: (c) => c.hits < c.hitsMax})
        var damaged = tower.pos.findClosestByPath(FIND_STRUCTURES,
                                                    {filter: (s) => s.hits < ((s.hitsMax)*0.05) && s.structureType != STRUCTURE_WALL });
        var damagedwall = tower.pos.findClosestByPath(FIND_STRUCTURES,
                                                    {filter: (s) => s.hits < ((s.hitsMax)*0.0001) && s.structureType == STRUCTURE_WALL });
        //Tower will prioritise attacking, then healing, and then repairing
        if (target != undefined) {
            tower.attack(target)
        }
        else if (hurt != undefined) {
            tower.heal(hurt)
        }
        else if (damaged != undefined) {
            tower.repair(damaged)
        } 
        else if (damagedwall != undefined) {
            tower.repair(damagedwall)
        }    
}
}
};