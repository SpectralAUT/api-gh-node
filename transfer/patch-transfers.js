import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: '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'
});

const newOwner = 'aijuannode'; // replace with the new owner's username or organization name

octokit.request('GET /user/repos')
.then(response => {
  const repos = response.data;
  repos.forEach(repo => {
    octokit.request(`PATCH /repos/${repo.owner.login}/${repo.name}`, {
      new_owner: newOwner
    })
    .then(response => {
      console.log(`Transferred repository ${repo.name} to ${newOwner}`);
    })
    .catch(error => {
      console.error(`Error transferring repository ${repo.name}: ${error}`);
    });
  });
})
.catch(error => {
  console.error(`Error getting repositories: ${error}`);
});