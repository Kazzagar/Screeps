module.exports = {
 run : function(currentRoom) {
      //Import Modules Here

require('prototype.spawn.guard')();
require('prototype.spawn.healer')();
require('prototype.spawn')();



    

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
    
    var numberOfColonyHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'colony.harvester');
    
    //Miners are spawned to fill room source slots. Spawns roles based on current % pop after this
    (numberOfMiners + numberOfColonyHarvesters)
    if (numberOfMiners < 4) {
    var name = Game.spawns.Spawn1.createCustomBalancedCreep (energy,'miner');
    // if spawning failed and we have no harvesters left
        if (name == ERR_NOT_ENOUGH_ENERGY && numberOfMiners == 0) {
            // spawn one with what is available
            var name = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], {role: 'miner', working: false});
        }
    }
    else if (numberOfColonyHarvesters < 4 && Game.flags.Colony != undefined) {
    var name = Game.spawns.Spawn1.createCustomBalancedCreep (energy, 'colony.harvester');
    }
    else if (numberOfTransit < (((population.length)-(numberOfMiners + numberOfColonyHarvesters))*0.2)) {
    var name = Game.spawns.Spawn1.createCustomBalancedCreep (energy, 'transit');
    }
    else if (numberOfUpgraders < (((population.length)-(numberOfMiners + numberOfColonyHarvesters))*0.15)) {
    var name = Game.spawns.Spawn1.createCustomBalancedCreep (energy,'upgrader');
    }
    else if (numberOfGuards < (((population.length)-(numberOfMiners + numberOfColonyHarvesters))*0.15)) {
    var name = Game.spawns.Spawn1.createCustomGuardCreep (energy, 'guard');
    }
    else if (numberOfHealers < (((population.length)-(numberOfMiners + numberOfColonyHarvesters))*0.1)) {
    var name = Game.spawns.Spawn1.createCustomHealerCreep (energy, 'healer');
    }
    else if (numberOfBuilders < (((population.length)-(numberOfMiners + numberOfColonyHarvesters))*0.1)) {
    var name = Game.spawns.Spawn1.createCustomBalancedCreep (energy,'builder');
    }
    else if (numberOfSuppliers < (((population.length)-(numberOfMiners + numberOfColonyHarvesters))*0.1)) {
    var name = Game.spawns.Spawn1.createCustomBalancedCreep (energy,'supplier');
    }
     else if (numberOfFixers < (((population.length)-(numberOfMiners + numberOfColonyHarvesters))*0.15)){
    var name = Game.spawns.Spawn1.createCustomBalancedCreep (energy,'fixer');
    }
    else if (numberOfWallFixers < (((population.length)-(numberOfMiners + numberOfColonyHarvesters))*0.5)) {
    var name = Game.spawns.Spawn1.createCustomBalancedCreep (energy,'wallfixer');
    }
     
    

    }

};