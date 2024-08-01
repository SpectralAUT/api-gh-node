import { Octokit } from 'octokit';

// not tested

const token = 'token';
const currentUsername = 'your-current-username'; // Replace with your current GitHub username
const newProfileInfo = {
  name: 'Aurora CIjuhan',
  email: 'your-email@example.com',
  bio: 'Your bio here'
};

const octokit = new Octokit({
  baseUrl: 'https://api.github.com',
  auth: token
});

// Note: We cannot update the username using the GitHub REST API
// After reviewing the GitHub REST API documentation, I realized that the endpoint to update a user's profile is actually PATCH /users/{username}. However, this endpoint is not available to update the username.

octokit.request(`PATCH /users/${currentUsername}`, {
 ...newProfileInfo
})
 .then((response) => {
    console.log(`Updated profile information`);
  })
 .catch((error) => {
    console.error(`Error updating profile information: ${error}`);
  });