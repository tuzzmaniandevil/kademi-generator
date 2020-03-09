# Create Kademi
Create Kademi is a generator written in NodejS and based on [PLOP](https://plopjs.com/). This was written to speed up app development on the Kademi platform.

## Suported Generators
| Name           | Description                                                                                                             |
|----------------|-------------------------------------------------------------------------------------------------------------------------|
| kademi-app     | Generates a base Kademi app with options to add support for KJsonData, App Settings, XMLHttpRequest, Version File, etc. |
| journey-node   | Can Generate Goals, Actions to be done                                                                                  |
| component      | TODO                                                                                                                    |
| admin-page     | TODO                                                                                                                    |

## Install/Update
To install this generator make sure you are running NodeJS or higher and NPM. Run the following command
```
npm install -g kademi-generator
```

## Usage
After you have installed the generator, You can run `kademi-generator` to see all available generators, Or `kademi-generator <generator name>` to access one directly.

### kademi-app
To generate a base app run `kademi-generator kademi-app` in the directory you want to create the app in. The generator will create a folder using the app name you provide and create the files in that folder.

## Contributing
All contributions are welcome! Fire over a pull request to the dev branch :-)