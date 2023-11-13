#!/usr/bin/env node

// const {spawn} = require('cross-spawn')
// const fs = require('fs')
// const path = require('path')
// const {welcomeFlow} = require("./welcome-flow");
// const {frontendFlow} = require("./frontend-flow");
// const {backendFlow} = require("./backend-flow");
// const {singleRepoFlow} = require("./single-repo-flow");
// const {dirFlow} = require("./dir-flow");

import { welcomeFlow } from "./welcome-flow.js";
import { backendFlow } from "./backend-flow.js";
import { frontendFlow } from "./frontend-flow.js";
import { singleRepoFlow } from "./single-repo-flow.js";
import { monoRepoDirFlow, singleRepoBE, singleRepoFE } from "./dir-flow.js";
import spawn from "cross-spawn";
import { reactFlow } from "./ts-react-app-flow.js";


const server = async function () {
     const isMonorepo = await welcomeFlow();

     let beAppName
     let beAppType
     let feAppName
     let feAppType
     spawn.sync('npx', ['create-turbo@latest'], { stdio: 'inherit' });
     if (isMonorepo) {
          [feAppName, feAppType] = await frontendFlow();
          [beAppName, beAppType] = await backendFlow();
          monoRepoDirFlow(feAppName, feAppType, beAppName, beAppType)
     } else {
          const isFrontendApp = await singleRepoFlow();
          if (isFrontendApp) {
               [feAppName, feAppType] = await frontendFlow();
               singleRepoFE(feAppName, feAppType)
               if(feAppType === 'ts-react-app'){
                    await reactFlow();
               }
          } else {
               [beAppName, beAppType] = await backendFlow();
               singleRepoBE(beAppName, beAppType)
          }
     }




     console.log('Success! Your new project is ready.');

};

server();

// // The first argument will be the project name.
// const projectName = process.argv[2];
//
// // Create a project directory with the project name.
// const currentDir = process.cwd();
// const projectDir = path.resolve(currentDir, projectName);
// fs.mkdirSync(projectDir, { recursive: true });
//
// // A common approach to building a starter template is to
// // create a `template` folder which will house the template
// // and the files we want to create.
// const templateDir = path.resolve(__dirname, 'templates/express-rest-api');
// fs.cpSync(templateDir, projectDir, { recursive: true });
//
// // It is good practice to have dotfiles stored in the
// // template without the dot (so they do not get picked
// // up by the starter template repository). We can rename
// // the dotfiles after we have copied them over to the
// // new project directory.
// fs.renameSync(
//   path.join(projectDir, 'gitignore'),
//   path.join(projectDir, '.gitignore')
// );
//
// const projectPackageJson = require(path.join(projectDir, 'package.json'));
//
// // Update the project's package.json with the new project name
// projectPackageJson.name = projectName;
//
// fs.writeFileSync(
//   path.join(projectDir, 'package.json'),
//   JSON.stringify(projectPackageJson, null, 2)
// );
//
// // Run `npm install` in the project directory to install
// // the dependencies. We are using a third-party library
// // called `cross-spawn` for cross-platform support.
// // (Node has issues spawning child processes in Windows).
// spawn.sync('npm', ['install'], { stdio: 'inherit' });
//
// console.log('Success! Your new project is ready.');
// console.log(`Created ${projectName} at ${projectDir}`);
