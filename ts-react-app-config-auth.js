import path from 'path';
import fs from 'fs-extra';
import replaceInFile from 'replace-in-file';


async function changeAuthExport(authProvider) {

    const filePath = 'test/src/features/authentication/index.tsx';

    try {
      // Read the content of the file
      let fileContent = await fs.readFile(filePath, 'utf-8');
  
      // Modify content by replacing occurrences of 'Firebase' with the authProvider string
      const capitalizedAuthProvider = authProvider.charAt(0).toUpperCase() + authProvider.slice(1).toLowerCase();
      fileContent = fileContent.replace(/Firebase/g, capitalizedAuthProvider);
      fileContent = fileContent.replace(/firebase/g, capitalizedAuthProvider.toLowerCase());
  
      // Remove lines that start with '//--'
      fileContent = fileContent.replace(/\/\/--.*\n/g, '');
  
      // Write the modified content back to the file
      await fs.writeFile(filePath, fileContent, 'utf-8');
  
      console.log(`File '${filePath}' modified successfully.`);
    } catch (error) {
      console.error('Error:', error);
    }
}

async function removeOtherClients(authProvider) {
    const folderPath = 'test/src/features/authentication/clients'; // Replace with the actual folder path
      
    try {

        // Read the content of the folder
        const files = await fs.readdir(folderPath);
    
        // Filter out folders that do not match the provided authentication provider
        const foldersToDelete = files.filter((folder) => !folder.toLowerCase().includes(authProvider.toLowerCase()));
    
        // Delete each non-matching folder
        for (const folder of foldersToDelete) {
          const folderToDelete = path.join(folderPath, folder);
          await fs.rm(folderToDelete, { recursive: true });
        }
      } catch (error) {
        console.error('Error:', error);
      }
}

export const configReactAuth = async function(authProvider) {
    console.log('==========================================')
    console.log(`Configuring authentication for: ${authProvider}`)
    console.log('==========================================')

    
    removeOtherClients(authProvider)
    changeAuthExport(authProvider)

      

    console.log('Done!')
    console.log('---')
}