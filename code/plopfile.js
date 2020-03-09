const chalk = require('chalk');

// Prompts
const inquirerDirectory = require('inquirer-directory')
const inquirerRecursive = require('inquirer-recursive');

// Handlebars Helpers
const handlebarsGenerateJBSettingsForm = require('./helpers/generateJBSettingsForm');
const handlebarsGenerateWebsiteSelect = require('./helpers/generateWebsiteSelect');
const handlebarsIfEquals = require('./helpers/ifEquals');

// Generators
const kademiAppGenerator = require('./generators/kademi-app');
const journeyGenerator = require('./generators/journey');

module.exports = plop => {
    plop.setWelcomeMessage(chalk.blueBright('[Kademi-Generator]') + ' - Please select a task');

    // Inquirer Prompt Types
    plop.setPrompt('directory', inquirerDirectory);
    plop.setPrompt('recursive', inquirerRecursive);

    // Handlebar Helpers
    plop.setHelper('generateJBSettingsForm', handlebarsGenerateJBSettingsForm);
    plop.setHelper('generateWebsiteSelect', handlebarsGenerateWebsiteSelect)
    plop.setHelper('ifEquals', handlebarsIfEquals);

    // Generators
    kademiAppGenerator(plop);
    journeyGenerator(plop);
};