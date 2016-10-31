//Function for spawning custom creeps
module.exports = function() {
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
};