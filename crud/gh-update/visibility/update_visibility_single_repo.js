import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: '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'
});

const repoOwner = 'aijuannode';
const repoName = '.jpgreportlife';
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