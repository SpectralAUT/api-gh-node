import { Octokit } from 'octokit';


const octokit = new Octokit({
  auth: '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'
});

const repoOwner = 'SpectralAUT';
const repoName = '.jpgreportlife';
const newOwner = 'aijuannode'; // Replace with the new owner's username

octokit.request(`POST /repos/${repoOwner}/${repoName}/transfer`, {
  new_owner: newOwner
})
.then((response) => {
  console.log(`Transferred repository ${repoName} to ${newOwner}`);
})
.catch((error) => {
  console.error(`Error transferring repository: ${error}`);
});