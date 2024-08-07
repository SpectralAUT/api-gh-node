import { Octokit } from 'octokit';

console.log('Script started');

const octokit = new Octokit({
  auth: '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'
});

const repoOwner = 'aijuannode';
console.log('repoOwner:', repoOwner);

const updatedRepoVisibility = 'private';

octokit.request('GET /users/{username}/repos', {
  username: repoOwner,
  type: 'all',
  state: 'all'
})
.then(response => {
  console.log('Repositories fetched:', response.data);

  const repos = response.data;

  if (repos.length === 0) {
    console.log(`No repositories found for user ${repoOwner}`);
  } else {
    repos.forEach(repo => {
      octokit.request(`PATCH /repos/${repoOwner}/${repo.name}`, {
        visibility: updatedRepoVisibility
      })
      .then((response) => {
        console.log(`Updated repository ${repo.name} visibility to ${updatedRepoVisibility}`);
      })
      .catch((error) => {
        console.error(`Error updating repository visibility: ${error}`);
      });
    });
  }
})
.catch(error => {
  console.error('Error occurred:', error);
});