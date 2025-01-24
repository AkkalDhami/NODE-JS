//? npm is a popular package manager which comes bundled with Node.js

//?  It is a CLI tool used to install, update, and remove external packages

//?  Do not confuse npm CLI with npmjs.com , as it’s a registry where most of the  packages of Node.js are saved.

//?  node_modules is what stores all the installed packages

//! npm commands:
//* npm install or npm i

//* npm list : to list all the dependencies packages

//* npm list -a: to list all the dependencies packages including dev dependencies

//* npm list -g: to list all the globally installed packages

//* npm view packageName(react, express) : to view the details of a package

//* npm view packageName(chalk) versions: to view the versions of a package

//* npm view packageName@version: to view the details of a specific version of a package

//? npm install express@4.0.0 // ^4.0.0

//?  • npm install express@4.0.0 --save-exact // To install exact version. (^ removed)

//?  • npm install express@~4.0.0

//?  • npm install express@4.2.x

//?  • You can use any symbols while specifying version

//? npm outdated: shows outdated packages in your project.

//? npm remove <package-name>

//? npm update

//? npm update

//? npx npm-check-updates:  upgrade your packages to absolute latest versions

//? npx npm-check-updates -u // To update the packages after reviewing.

//? npm install -g: to install a package globally

//? npm install -g npm-check-updates: to install npm-check-updates globally

//?  npm-check-updates

//?  npm outdated -g: to check outdated packages globally

//? npm install -D eslint: install eslint as a development dependency.