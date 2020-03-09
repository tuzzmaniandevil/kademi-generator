const CURR_DIR = process.cwd();

module.exports = plop => {
    plop.setGenerator('journey-node', {
        description: 'Create a Journey Goal/Action',
        prompts: [
            {
                name: 'dir',
                type: 'file-tree-selection',
                root: CURR_DIR,
                onlyShowDir: true,
                message: 'Where you like to put this journey?'
            },
            {
                name: 'journeyName',
                type: 'input',
                message: 'Journey name:',
                validate: function (input) {
                    if (/^([A-Za-z\-\_\d])+$/.test(input)) {
                        return true;
                    } else {
                        return 'Journey name may only include letters, numbers and underscores.';
                    }
                }
            },
            {
                name: 'journeyTitle',
                type: 'input',
                message: 'Journey Title:'
            },
            {
                name: 'journeyType',
                type: 'list',
                message: 'Type:',
                default: 'goal',
                choices: [
                    {
                        name: 'Goal',
                        value: 'goal'
                    },
                    {
                        name: 'Action',
                        value: 'action'
                    }
                ]
            },
            {
                name: 'useSettings',
                type: 'confirm',
                message: 'Enable settings:'
            },
            {
                type: 'recursive',
                name: 'settings',
                message: 'Add a setting?',
                when: answers => answers.useSettings,
                prompts: [
                    {
                        type: 'input',
                        name: 'name',
                        message: 'Setting name:',
                        validate: function (input) {
                            if (/^([A-Za-z\-\_\d])+$/.test(input)) {
                                return true;
                            } else {
                                return 'Setting name may only include letters, numbers and underscores.';
                            }
                        }
                    },
                    {
                        type: 'input',
                        name: 'title',
                        message: 'Setting Title:'
                    },
                    {
                        type: 'list',
                        name: 'inputType',
                        message: 'Input Type',
                        choices: [
                            {
                                name: 'Text',
                                value: 'text'
                            },
                            {
                                name: 'Text Area',
                                value: 'textarea'
                            },
                            {
                                name: 'Checkbox',
                                value: 'checkbox'
                            },
                            {
                                name: 'Select',
                                value: 'select'
                            },
                            {
                                name: 'Website',
                                value: 'website'
                            }
                        ]
                    },
                    {
                        type: 'confirm',
                        name: 'required',
                        message: 'Required:',
                        default: false
                    }
                ]
            }
        ],
        actions: [
            {
                type: 'add',
                path: `${CURR_DIR}/{{dir}}/{{journeyName}}.js`,
                templateFile: 'templates/journey/{{journeyType}}.hbs'
            }
        ]
    });
};