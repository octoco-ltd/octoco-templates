import path from 'path';
import fs from 'fs-extra';
import replaceInFile from 'replace-in-file';

export const addReactPage = async function(source, destination, page) {
    console.log('++++++++++++++++++++++')
    console.log('Adding Page: ' + page)
    console.log('++++++++++++++++++++++')
    // Create the destination folder
    await fs.ensureDir(destination);

    // Copy the entire folder from source to destination
    await fs.copy(source, destination);

    // Capitalize the page name
    const capitalizedPage = page.charAt(0).toUpperCase() + page.slice(1).toLowerCase();

    // Rename the files according to the page name
    const filesToRename = ['Home.tsx', 'Home.stories.tsx', 'Home.styles.ts'];

    for (const fileName of filesToRename) {
        const oldFilePath = path.join(destination, fileName);
        const newFilePath = path.join(destination, fileName.replace('Home', capitalizedPage));
        await fs.rename(oldFilePath, newFilePath);
    }

    // Define the replacement options
    const replacementOptions = {
        files: path.join(destination, '**', '*.*'),
        from: /Home/g, // Replace 'Home' with the page name
        to: capitalizedPage,
    };

    // Replace occurrences of 'Home' with the page name in all files
    await replaceInFile(replacementOptions);


}