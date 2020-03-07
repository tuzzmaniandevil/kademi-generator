const kademiAppGenerator = require('./generators/kademi-app');
const journeyActionGenerator = require('./generators/journey-action');
const journeyGoalGenerator = require('./generators/journey-goal');

module.exports = plop => {
    kademiAppGenerator(plop);
    journeyActionGenerator(plop);
    journeyGoalGenerator(plop);
};