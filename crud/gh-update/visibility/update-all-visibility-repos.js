import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: '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'
});

const repoOwner = 'aijuannode';
const updatedRepoVisibility = 'public';

octokit.request(`GET /users/${repoOwner}/repos`, {
  type: 'all',
  state: 'all'
})
.then((response) => {
  const repos = response.data;
  repos.forEach((repo) => {
    if (repo.transfer) {
      console.log(`Repository ${repo.name} has been transferred. Skipping...`);
      return;
    }
    octokit.request(`PATCH /repos/${repoOwner}/${repo.name}`, {
      visibility: updatedRepoVisibility
    })
    .then((response) => {
      console.log(`Updated repository ${repo.name} visibility to ${updatedRepoVisibility}`);
    })
    .catch((error) => {
      if (error.status === 404) {
        console.log(`Repository ${repo.name} not found. Skipping...`);
      } else {
        console.error(`Error updating repository visibility: ${error}`);
      }
    });
  });
})
.catch((error) => {
  console.error(`Error fetching repositories: ${error}`);
});