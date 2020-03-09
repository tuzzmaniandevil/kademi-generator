const fs = require('fs');
const CURR_DIR = process.cwd();

const BASE_DIRS = [
    'APP-INF/common',
    'common/theme/apps',
    'admin/theme/apps'
];

module.exports = plop => {
    plop.setGenerator('kademi-app', {
        description: 'Create a kademi app',
        prompts: [
            {
                name: 'appName',
                type: 'input',
                message: 'App name:',
                validate: function (input) {
                    return new Promise((resolve, reject) => {
                        if (/^([A-Za-z\-\_\d])+$/.test(input)) {
                            fs.stat(`${CURR_DIR}/${input}`, (err, stats) => {
                                if (err) {
                                    return resolve(true);
                                }
                                if (!stats.isDirectory()) {
                                    return reject(`a file with the name "${input}" already exists.`);
                                } else {
                                    return reject(`a directory with the name "${input}" already exists.`);
                                }
                            });
                        } else {
                            return reject('App name may only include letters, numbers and underscores.');
                        }
                    });
                }
            },
            {
                name: 'jsondb',
                type: 'confirm',
                message: 'Will you need KJsonData:',
                default: true
            },
            {
                name: 'website',
                type: 'confirm',
                message: 'Can the app be installed in a website:',
                default: true
            },
            {
                name: 'useComponents',
                type: 'confirm',
                message: 'Will you be creating components:',
                default: true,
                when: answers => answers.website
            },
            {
                name: 'useJourneys',
                type: 'confirm',
                message: 'Will you be creating journeys:',
                default: true
            },
            {
                name: 'xhrPolyfill',
                type: 'confirm',
                message: 'Do you need to send web requests:',
                default: false
            },
            {
                name: 'versionFile',
                type: 'confirm',
                message: 'Do you want a version.txt file:',
                default: true
            },
            {
                name: 'versionNum',
                type: 'input',
                message: 'App Version:',
                default: '1.0.0',
                when: answers => answers.versionFile
            },
            {
                name: 'appSettings',
                type: 'confirm',
                message: 'Add App Settings:',
                default: false
            },
            {
                type: 'recursive',
                name: 'settings',
                message: 'Add a setting?',
                when: answers => answers.appSettings,
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
                        message: 'Input Type:',
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
        actions: function (data) {
            var basePath = `${CURR_DIR}/${data.appName}`;

            // Create base directory
            BASE_DIRS.forEach(el => {
                fs.mkdirSync(`${basePath}/${el}`, { recursive: true });
            });
            fs.mkdirSync(`${basePath}/admin/theme/apps/${data.appName}`, { recursive: true });
            fs.mkdirSync(`${basePath}/common/theme/apps/${data.appName}`, { recursive: true });

            var actions = [
                // Add common
                {
                    type: 'add',
                    path: `${basePath}/.gitignore`,
                    templateFile: 'templates/app/gitignore.hbs'
                },
                {
                    type: 'add',
                    path: `${basePath}/admin/theme/apps/${data.appName}/dependencies.json`,
                    templateFile: 'templates/app/dependencies.hbs'
                },
                {
                    type: 'add',
                    path: `${basePath}/APP-INF/controllers.xml`,
                    templateFile: 'templates/app/app-inf/controller.hbs'
                },
                {
                    type: 'add',
                    path: `${basePath}/APP-INF/common/config.js`,
                    templateFile: 'templates/app/app-inf/config.hbs'
                },
                {
                    type: 'add',
                    path: `${basePath}/APP-INF/common/common.js`,
                    templateFile: 'templates/app/app-inf/common.hbs'
                },
                // Example Admin Template
                {
                    type: 'add',
                    path: `${basePath}/APP-INF/admin/mappings.js`,
                    templateFile: 'templates/app/app-inf/adminMapping.hbs'
                },
                {
                    type: 'add',
                    path: `${basePath}/admin/theme/apps/${data.appName}/${data.appName}Example.html`,
                    templateFile: 'templates/app/admin/adminExamplePage.hbs'
                }
            ];


            if (data.jsondb) {
                actions.push({
                    type: 'add',
                    path: `${basePath}/APP-INF/common/esMappings.js`,
                    templateFile: 'templates/app/app-inf/esMappings.js'
                });
            }

            if (data.website) {
                fs.mkdirSync(`${basePath}/website/theme/apps/${data.appName}`, { recursive: true });

                actions.push({
                    type: 'add',
                    path: `${basePath}/website/theme/apps/${data.appName}/dependencies.json`,
                    templateFile: 'templates/app/dependencies.hbs'
                });
                // actions.push({
                //     type: 'add',
                //     path: `${basePath}/APP-INF/website/mappings.js`,
                //     templateFile: 'templates/app/websiteMapping.hbs'
                // });
            }

            if (data.website && data.useComponents) {
                fs.mkdirSync(`${basePath}/common/theme/apps/${data.appName}/components`, { recursive: true });

                actions.push({
                    type: 'add',
                    path: `${basePath}/APP-INF/website/components.js`,
                    templateFile: `templates/app/app-inf/componentDef.hbs`
                });
            }

            if (data.useJourneys) {
                fs.mkdirSync(`${basePath}/APP-INF/jb`, { recursive: true });
                fs.mkdirSync(`${basePath}/common/theme/apps/${data.appName}/jb`, { recursive: true });
            }

            if (data.xhrPolyfill) {
                actions.push({
                    type: 'add',
                    path: `${basePath}/APP-INF/common/xmlHttpRequest.js`,
                    templateFile: 'templates/app/app-inf/xmlHttpRequest.js'
                });
            }

            if (data.versionFile) {
                actions.push({
                    type: 'add',
                    path: `${basePath}/version.txt`,
                    template: '{{versionNum}}'
                });
            }

            if (data.appSettings) {
                actions.push({
                    type: 'add',
                    path: `${basePath}/admin/theme/apps/${data.appName}/settings.html`,
                    templateFile: 'templates/app/admin/settings.hbs'
                });
                actions.push({
                    type: 'add',
                    path: `${basePath}/APP-INF/common/settings.js`,
                    templateFile: 'templates/app/app-inf/settings.hbs'
                });
            }

            return actions;
        }
    });
}