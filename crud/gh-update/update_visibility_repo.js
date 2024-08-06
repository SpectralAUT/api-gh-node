import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: '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'
});

const repoOwner = 'SpectralAUT';
const repoName = 'tech_cv';
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