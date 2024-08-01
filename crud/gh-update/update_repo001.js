import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: 'token'
});

const repoOwner = 'SpectralAUT';
const repoName = 'node-repo-parameters';

const updatedRepoDescription = 'This is an updated repository description';
const updatedRepoName = 'node-repo-parameters-updated';

octokit.request(`PATCH /repos/${repoOwner}/${repoName}`, {
  name: updatedRepoName,
  description: updatedRepoDescription
})
.then((response) => {
  console.log(`Updated repository ${repoName} to ${updatedRepoName} with description: ${updatedRepoDescription}`);
})
.catch((error) => {
  console.error(`Error updating repository: ${error}`);
});