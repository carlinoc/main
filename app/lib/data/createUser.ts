// External dependencies
import { fetchUserData } from './fetch';
// Constants
import { USER_DATA_URL } from './urls';

/**
 * Creates a new user in the database.
 *
 * @param {Object} params - The parameters object containing the user data.
 * @param {UserDataAPI} params.user - The user data to be created in the database.
 * @returns {Promise} - A Promise that resolves to the data returned from the server.
 */
export const createUserDB = async ({ user }: { user: UserDataAPI }) => {
  const userData = {
    auth_id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    countryCode: user.countryCode,
  };
  
  try {
    const response = await fetch(USER_DATA_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending request:', error);
  }
};
/**
 * Validates a user by checking if the user already exists in the database.
 * If not, creates a new user using the createUserDB function.
 *
 * @param {Object} params - The parameters object containing the user data.
 * @param {UserDataAPI} params.user - The user data to be validated and created if necessary.
 * @returns {Promise} - A Promise that resolves when the validation and user creation process is complete.
 */
export const validateUser = async ({ user, countryId }: { user: UserDataAPI; countryId: string }) => {
  const { id, name, email, image } = user;
  console.log(countryId);
  try {
    const userResponse = await fetchUserData({ email: email as string });
    if (userResponse.data.length === 0) {
      const newUser: UserDataAPI = {
        id: id,
        name: name,
        email: email,
        image: image,
        countryCode: countryId,
      };
      await createUserDB({ user: newUser });
    }
  } catch (error) {
    console.error('Error fetching more data:', error);
  }
};
