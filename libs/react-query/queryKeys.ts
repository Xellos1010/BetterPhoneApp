// File: /Users/evanmccall/React-Projects/BetterPhone-App/libs/react-query/queryKeys.ts

export enum QUERY_KEYS {
    // AUTH KEYS
    CREATE_USER_ACCOUNT = "createUserAccount",
  
    // USER KEYS
    GET_CURRENT_USER = "getCurrentUser",
    GET_USERS = "getUsers",
    GET_USER_BY_ID = "getUserById",
  
    // POST KEYS
    GET_POSTS = "getPosts",
    GET_INFINITE_POSTS = "getInfinitePosts",
    GET_RECENT_POSTS = "getRecentPosts",
    GET_POST_BY_ID = "getPostById",
    GET_USER_POSTS = "getUserPosts",
    GET_FILE_PREVIEW = "getFilePreview",

    // CONTACT KEYS
    ADD_CONTACT = "addContact",
    GET_CONTACTS = "getContacts",
    SYNC_CONTACTS = "syncContact",
  
    // SEARCH KEYS
    SEARCH_POSTS = "getSearchPosts",
}

// Modify these keys to be arrays
export const QUERY_KEYS_ARRAY = {
    ADD_CONTACT: [QUERY_KEYS.ADD_CONTACT],
    GET_CONTACTS: [QUERY_KEYS.GET_CONTACTS],
    SYNC_CONTACTS: [QUERY_KEYS.SYNC_CONTACTS],
    SEARCH_POSTS: [QUERY_KEYS.SEARCH_POSTS],
};