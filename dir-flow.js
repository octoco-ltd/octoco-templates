import * as fs from "fs";
import {frontends} from "./frontend-flow.js";
import * as path from "path";
import {backends} from "./backend-flow.js";

export const feDirFlow = function (feDir, feAppType, feAppName) {
    fs.mkdirSync(feDir, {recursive: true});

    const feAppDir = path.resolve(feDir, feAppName);
    fs.mkdirSync(feAppDir, {recursive: true});

    // A common approach to building a starter template is to
    // create a `template` folder which will house the template
    // and the files we want to create.
    const __dirname = path.resolve(path.dirname(''));
    console.log(feAppType)
    const feTemplateDir = path.resolve(__dirname, 'templates/' + feAppType);
    fs.cpSync(feTemplateDir, feAppDir, {recursive: true});


    const feProjectPackageJson = JSON.parse(fs.readFileSync(path.join(feAppDir, 'package.json'), 'utf8'))

    // Update the project's package.json with the new project name
    feProjectPackageJson.name = feAppName;

    fs.writeFileSync(
        path.join(feAppDir, 'package.json'),
        JSON.stringify(feProjectPackageJson, null, 2)
    );
}

export const beDirFlow = function (beDir, beAppType, beAppName) {
    fs.mkdirSync(beDir, {recursive: true});

    const beAppDir = path.resolve(beDir, beAppName);
    fs.mkdirSync(beAppDir, {recursive: true});

    // A common approach to building a starter template is to
    // create a `template` folder which will house the template
    // and the files we want to create.
    const __dirname = path.resolve(path.dirname(''));
    const feTemplateDir = path.resolve(__dirname, 'templates/' + beAppType);
    fs.cpSync(feTemplateDir, beAppDir, {recursive: true});

    // It is good practice to have dotfiles stored in the
    // template without the dot (so they do not get picked
    // up by the starter template repository). We can rename
    // the dotfiles after we have copied them over to the
    // new project directory.
    fs.renameSync(
        path.join(beAppDir, 'gitignore'),
        path.join(beAppDir, '.gitignore')
    );

    const beProjectPackageJson = JSON.parse(fs.readFileSync(path.join(beAppDir, 'package.json'), 'utf8'))

    // Update the project's package.json with the new project name
    beProjectPackageJson.name = beAppName;

    fs.writeFileSync(
        path.join(beAppDir, 'package.json'),
        JSON.stringify(beProjectPackageJson, null, 2)
    );
}

export const monoRepoDirFlow = function(feAppName, feAppType, beAppName, beAppType) {
    // Create a project directory with the project name.
    const currentDir = process.cwd();

    // make dir for frontend apps
    const feDir = path.resolve(currentDir, 'apps')
    feDirFlow(feDir, feAppType, feAppName)

    // make dir for backend apps
    const beDir = path.resolve(currentDir, 'packages')
    beDirFlow(beDir, beAppType, beAppName)
}

export const singleRepoFE = function(feAppName, feAppType) {
    // Create a project directory with the project name.
    const currentDir = process.cwd();

    feDirFlow(currentDir, feAppType, feAppName)
}


export const singleRepoBE = function(beAppName, beAppType) {
    // Create a project directory with the project name.
    const currentDir = process.cwd();

    beDirFlow(currentDir, beAppType, beAppName)
}



