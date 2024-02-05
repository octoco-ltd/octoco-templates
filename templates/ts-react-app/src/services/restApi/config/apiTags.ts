// This is the endpoints that are used in the application
// It is used in the query/mutation and will be fixed to the base url
// i.e {BASE_URL}/users
export enum ENDPOINT {
    USERS = '/users',
    POSTS = '/posts',
}

export enum TAG_ID {
    PARTIAL_LIST = 'PARTIAL-LIST'
}

// Tags used to validate and invalidate cache objects made by RTK Query
export enum TAG {
    USERS = 'Users',
    USER = 'User',
    POSTS = 'Posts',
    POST = 'Post',
}

export const TAG_TYPES: readonly string[] = Object.values(TAG);