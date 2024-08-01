import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: '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'
});

const repoOwner = 'SpectralAUT';
const repoName = 'api-gh-node';
const updatedRepoVisibility = 'private';

octokit.request(`PATCH /repos/${repoOwner}/${repoName}`, {
  visibility: updatedRepoVisibility
})
.then((response) => {
  console.log(`Updated repository ${repoName} visibility to ${updatedRepoVisibility}`);
})
.catch((error) => {
  console.error(`Error updating repository visibility: ${error}`);
});