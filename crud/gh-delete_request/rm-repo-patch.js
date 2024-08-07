import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: 'TOKEN'
});

const repoOwner = 'SpectralAUT';
const reposToDelete = ['octokit-js-crud', 'ci_bash_lnx','gh_api_manage_sec'];

reposToDelete.forEach((repoName) => {
  octokit.request(`DELETE /repos/${repoOwner}/${repoName}`)
    .then((response) => {
      console.log(`Deleted repository ${repoName}`);
    })
    .catch((error) => {
      console.error(`Error deleting repository ${repoName}: ${error}`);
    });
});