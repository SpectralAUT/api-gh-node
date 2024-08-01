import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: 'TOKEN'
});

const repoOwner = 'SpectralAUT';
const repoName = 'octokit-node-crud';

octokit.request(`DELETE /repos/${repoOwner}/${repoName}`)
  .then((response) => {
    console.log(`Deleted repository ${repoName}`);
  })
  .catch((error) => {
    console.error(`Error deleting repository: ${error}`);
  });