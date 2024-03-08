import { CognitoUser } from 'amazon-cognito-identity-js'
import { _getCognitoPool } from './_getCognitoPool'

/**
 * Retrieves a Cognito user object based on the provided username.
 *
 * @param {string} username - The username of the Cognito user.
 * @returns {CognitoUser} - The Cognito user object.
 */
export const _getCognitoUser = (username: string) => {
  const userData = {
    Username: username,
    Pool: _getCognitoPool(),
  }
  const cognitoUser = new CognitoUser(userData)
  return cognitoUser
}