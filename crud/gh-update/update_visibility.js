import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: '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'
});

const repoOwner = 'SpectralAUT';
const repoName = 'api-gh-node';
const updatedRepoVisibility = 'public';

octokit.request(`PATCH /repos/${repoOwner}/${repoName}`, {
  visibility: updatedRepoVisibility
})
.then((response) => {
  console.log(`Updated repository ${repoName} visibility to ${updatedRepoVisibility}`);
})
.catch((error) => {
  console.error(`Error updating repository visibility: ${error}`);
});