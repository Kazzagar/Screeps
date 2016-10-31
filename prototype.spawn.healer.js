//Function for spawning custom creeps
module.exports = function() {
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
};