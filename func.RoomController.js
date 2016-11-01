module.exports = {
 run : function(currentRoom) {
      //Import Modules Here

require('prototype.spawn.guard')();
require('prototype.spawn.healer')();
require('prototype.spawn')();

var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleFixer = require('role.fixer');
var roleWallFixer = require('role.wallfixer');
var roleSupplier = require('role.supplier');
var roleGuard = require('role.guard');
var roleHealer = require('role.healer');
var roleTransit = require('role.transit');
var roleMiner = require('role.miner');


    
     //Clears the memory of old dead creeps
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name]
        }
    }

    //Searches for creep names and then defines the variable creep as each independent creep
    for (let name in Game.creeps) {
    var creep = Game.creeps[name];
    //HANDY TOOL TO FIND SPECIFIC CREEP JUST UN-COMMENT NEXT LINE
   // creep.say(creep) 
 
    //Creeps check their role and then run the respective role function

    if (creep.memory.role == 'upgrader') {
    roleUpgrader.run(creep);
    }
    else if (creep.memory.role == 'builder') {
    roleBuilder.run(creep);
    }
    else if (creep.memory.role == 'fixer') {
    roleFixer.run(creep);
    }
    else if (creep.memory.role == 'wallfixer') {
    roleWallFixer.run(creep);
    }
    else if (creep.memory.role == 'supplier') {
    roleSupplier.run(creep);
    }
    else if (creep.memory.role == 'guard') {
    roleGuard.run(creep);
    }
    else if (creep.memory.role == 'healer') {
    roleHealer.run(creep);
    }
    else if (creep.memory.role == 'transit') {
    roleTransit.run(creep);
    }
    else if (creep.memory.role == 'miner') {
    roleMiner.run(creep);
    }
    }

     //Define energy avaible for spawning
    var energy = Game.spawns.Spawn1.room.energyCapacityAvailable
    /*Define the creep population as an array, TO USE THE POPULATION AS A VALUE USE population.length 
    (P.S. I don't know why my array returns creeps as objects but it works for what we needed)*/
    var population = [];
       for (let name in Memory.creeps) {
        if (Game.creeps[name] != undefined) {
            population.push(Memory.creeps[name])
        }
    }

    //Checks for the number of each creeps of each role.

    
    var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');

    var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');

    var numberOfFixers = _.sum(Game.creeps, (c) => c.memory.role == 'fixer');

    var numberOfWallFixers = _.sum(Game.creeps, (c) => c.memory.role == 'wallfixer');
    
    var numberOfSuppliers = _.sum(Game.creeps, (c) => c.memory.role == 'supplier');
    
    var numberOfGuards = _.sum(Game.creeps, (c) => c.memory.role == 'guard');
    
    var numberOfHealers = _.sum(Game.creeps, (c) => c.memory.role == 'healer');
    
    var numberOfTransit = _.sum(Game.creeps, (c) => c.memory.role == 'transit');
    
    var numberOfMiners = _.sum(Game.creeps, (c) => c.memory.role == 'miner');
    
    //Miners are spawned to fill room source slots. Spawns roles based on current % pop after this
    
    if (numberOfMiners < 6) {
    var name = Game.spawns.Spawn1.createCustomBalancedCreep (energy,'miner');
    // if spawning failed and we have no harvesters left
        if (name == ERR_NOT_ENOUGH_ENERGY && numberOfMiners == 0) {
            // spawn one with what is available
            var name = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], {role: 'miner', working: false});
        }
    }
    else if (numberOfTransit <= (((population.length)-6)*0.2)) {
    var name = Game.spawns.Spawn1.createCustomBalancedCreep (energy, 'transit');
    }
    else if (numberOfUpgraders < (((population.length)-6)*0.15)) {
    var name = Game.spawns.Spawn1.createCustomBalancedCreep (energy,'upgrader');
    }
    else if (numberOfGuards < (((population.length)-6)*0.15)) {
    var name = Game.spawns.Spawn1.createCustomGuardCreep (energy, 'guard');
    }
    else if (numberOfHealers < (((population.length)-6)*0.1)) {
    var name = Game.spawns.Spawn1.createCustomHealerCreep (energy, 'healer');
    }
    else if (numberOfBuilders < (((population.length)-6)*0.1)) {
    var name = Game.spawns.Spawn1.createCustomBalancedCreep (energy,'builder');
    }
    else if (numberOfSuppliers < (((population.length)-6)*0.1)) {
    var name = Game.spawns.Spawn1.createCustomBalancedCreep (energy,'supplier');
    }
     else if (numberOfFixers < (((population.length)-6)*0.15)){
    var name = Game.spawns.Spawn1.createCustomBalancedCreep (energy,'fixer');
    }
    else if (numberOfWallFixers < (((population.length)-6)*0.5)) {
    var name = Game.spawns.Spawn1.createCustomBalancedCreep (energy,'wallfixer');
    }
     
    
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
    }

}


 };