import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: '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'
});

const repoOwner = 'SpectralAUT';
const repoName = '.jpgreportlife';
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