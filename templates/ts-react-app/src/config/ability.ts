import { defineAbility } from '@casl/ability';

/**
 * Define user abilities based on their user type.
 * @param userType - The type of the user, e.g., 'admin' or 'user'.
 * @returns {Ability} - An instance of the defined abilities for the user.
 */
export default function defineAbilityFor(userType: string) {
    return defineAbility((can, cannot) => {
        if (userType === 'admin') {
            //###### pages ######
            //The below defines top level pages the user has access to
            can('visit', ABILITY_PAGES.HOME);

            //###### features ######
            //This will be sub-features that exist (it can be nested)

        } else if (userType === 'viewOnly') {
            //###### pages ######
            //The below defines top level pages the user has access to
            can('visit', ABILITY_PAGES.HOME);

            //###### features ######

        } else {
            //###### pages ######
            //The below defines top level pages the user has access to
            cannot('visit', ABILITY_PAGES.HOME);

            //###### features ######
            //This will be sub-features that exist (it can be nested)

        }
        //Add other roles here
    });
}

export const enum ABILITY_PAGES {
    HOME = 'home',
}

export const enum ABILITY_TYPES {
    VISIT = 'visit',
}
