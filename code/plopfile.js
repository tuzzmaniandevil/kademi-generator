const chalk = require('chalk');

// Prompts
const inquirerFileTreeSelection = require('inquirer-file-tree-selection-prompt')
const inquirerRecursive = require('inquirer-recursive');

// Handlebars Helpers
const handlebarsGenerateJBSettingsForm = require('./helpers/generateJBSettingsForm');
const handlebarsGenerateWebsiteSelect = require('./helpers/generateWebsiteSelect');
const handlebarsGenerateAppSettingsForm = require('./helpers/generateAppSettingsForm');
const handlebarsIfEquals = require('./helpers/ifEquals');

// Generators
const kademiAppGenerator = require('./generators/kademi-app');
const journeyNodeGenerator = require('./generators/journey-node');

module.exports = plop => {
    plop.setWelcomeMessage(chalk.blueBright('[Kademi-Generator]') + ' - Please select a task');

    // Inquirer Prompt Types
    plop.setPrompt('file-tree-selection', inquirerFileTreeSelection);
    plop.setPrompt('recursive', inquirerRecursive);

    // Handlebar Helpers
    plop.setHelper('generateJBSettingsForm', handlebarsGenerateJBSettingsForm);
    plop.setHelper('generateWebsiteSelect', handlebarsGenerateWebsiteSelect)
    plop.setHelper('generateAppSettingsForm', handlebarsGenerateAppSettingsForm);
    plop.setHelper('ifEquals', handlebarsIfEquals);

    // Generators
    kademiAppGenerator(plop);
    journeyNodeGenerator(plop);
};