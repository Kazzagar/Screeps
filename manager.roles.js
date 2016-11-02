var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleFixer = require('role.fixer');
var roleWallFixer = require('role.wallfixer');
var roleSupplier = require('role.supplier');
var roleGuard = require('role.guard');
var roleHealer = require('role.healer');
var roleTransit = require('role.transit');
var roleMiner = require('role.miner');

module.exports = {
    
     run : function(currentRoom) {
         
    //Searches for creep names and then defines the variable creep as each independent creep
    for (let name in Game.creeps) {
    var creep = Game.creeps[name];
 
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
}

};