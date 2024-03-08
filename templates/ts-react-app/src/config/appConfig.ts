/**
 * Represents the configuration for the application.
 */
type IAppConfig = {
    breakMobileView: 'sm' | 'md' | 'lg'

}
//any miscellaneous config that is used across the whole app
const appConfig: IAppConfig = {
    breakMobileView: 'sm'
};

export default appConfig;