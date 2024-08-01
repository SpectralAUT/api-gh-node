import { Octokit } from 'octokit';

const token = 'token';
const newUsername = 'AuroraCIjuhan';

const octokit = new Octokit({
  baseUrl: 'https://api.github.com',
  auth: token
});

// Update the username
octokit.request('PATCH /user', {
  name: newUsername
})
  .then((response) => {
    console.log(`Updated username to ${newUsername}`);
  })
  .catch((error) => {
    console.error(`Error updating username: ${error}`);
  });