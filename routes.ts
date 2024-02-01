/**
 * Array of routes that allow a user
 * who IS NOT authenticated to access
 * @type {string[]}
 */

export const publicRoutes = [
    "/",
    "/auth/new-verification"
]

/**
 * Array of routes that allow a user
 * who IS authenticated to access.
 * It will route logged in users
 * to /settings
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password"
]

/**
 * This route will always be available so users can login
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings"