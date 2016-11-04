//Function for spawning custom creeps
module.exports = function() {
    StructureSpawn.prototype.createCustomBalancedCreep = 
        function (energy, roleName) {
          var numberOfParts = Math.floor(energy / 200);
          var body = [];
          for (let i = 0; i < numberOfParts; i++) {
              body.push(WORK);
          }
          for (let i = 0; i < numberOfParts; i++) {
              body.push(CARRY);
          }
          for (let i = 0; i < numberOfParts; i++) {
              body.push(MOVE);
          }
          return this.createCreep(body, undefined, {role: roleName, working: false});
        }
        
        StructureSpawn.prototype.createCustomGuardCreep = 
        function (energy, roleName) {
          var numberOfParts = Math.floor(energy / 140);
          var body = [];
          for (let i = 0; i < numberOfParts; i++) {
              body.push(TOUGH);
          }
          for (let i = 0; i < numberOfParts; i++) {
              body.push(MOVE);
          }
          for (let i = 0; i < numberOfParts; i++) {
              body.push(ATTACK);
          }
          return this.createCreep(body, undefined, {role: roleName, working: false});
        }
        
         StructureSpawn.prototype.createCustomHealerCreep = 
        function (energy, roleName) {
          var numberOfParts = Math.floor(energy / 300);
          var body = [];
          for (let i = 0; i < numberOfParts; i++) {
              body.push(MOVE);
          }
          for (let i = 0; i < numberOfParts; i++) {
              body.push(HEAL);
          }
          return this.createCreep(body, undefined, {role: roleName, working: false});
        }
        StructureSpawn.prototype.createCustomMinerCreep = 
        function (energy, roleName) {
          var numberOfParts = Math.floor(((energy-50) / 250));
          var body = [CARRY];
          for (let i = 0; i < numberOfParts; i++) {
              body.push(MOVE);
          }
           for (let i = 0; i < numberOfParts; i++) {
              body.push(WORK);
          }
          for (let i = 0; i < numberOfParts; i++) {
              body.push(WORK);
          }

          return this.createCreep(body, undefined, {role: roleName, working: false});
        }
        
        StructureSpawn.prototype.createCustomTransitCreep = 
        function (energy, roleName) {
          var numberOfParts = Math.floor(((energy) / 100));
          var body = [];
          for (let i = 0; i < numberOfParts; i++) {
              body.push(CARRY);
          }
          for (let i = 0; i < numberOfParts; i++) {
              body.push(MOVE);
          } 
          return this.createCreep(body, undefined, {role: roleName, working: false});
        }
};