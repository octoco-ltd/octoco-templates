# Adding a Remote Config in Firebase and Downloading the JSON File

## Step 1: Access Firebase Console

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Select your project from the list of Firebase projects.

## Step 2: Add Remote Config

1. In the Firebase Console, navigate to the `Remote Config` section.
2. Click on `Create Configuration`.
3. Enter a `Parameter key` and its corresponding `Default value`. The key is a unique identifier for the parameter, and the value is what will be used by your application by default or if no other value is set remotely.
4. Optionally, you can add parameter descriptions and conditional values based on user segments, app versions, or other conditions.
5. Click `Publish changes` to make your remote configuration active.

## Step 3: Download the Remote Config as a JSON File

1. Once your parameters are set and published, you can export these configurations.
2. On the Remote Config page, look for an option to `Download default values`. This option might be in a menu or under a settings gear icon.
3. Click `Download default values` and choose the `.json for Web` format for the download.
4. Save the file to your local machine.

## Step 4: Add the JSON File to Your Project

2. Move the downloaded JSON file into the `remoteConfigDefaults` folder. Make sure the file is named as `remote_config_defaults.json`.
3. You can now start using the remote configurations in your application.