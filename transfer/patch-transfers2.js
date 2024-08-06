import { Octokit } from 'octokit';

// NOT PROD ERROR

const octokit = new Octokit({
  auth: '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'
});

const currentOwner = 'SpectralAUT';
const newOwner = 'aijuannode'; // Replace with the new owner's username

async function transferAllRepos() {
  try {
    const response = await octokit.request(`GET /users/${currentOwner}/repos`, {
      per_page: 100, // fetch 100 repos at a time
    });

    const repos = response.data;

    console.log(`Found ${repos.length} repositories:`);
    for (const repo of repos) {
      console.log(`  - ${repo.name}`);
    }

    for (const repo of repos) {
      const repoName = repo.name;
      console.log(`Transferring repository ${repoName} to ${newOwner}...`);

      await octokit.request(`POST /repos/${currentOwner}/${repoName}/transfer`, {
        new_owner: newOwner,
      });

      console.log(`Transferred repository ${repoName} to ${newOwner}`);
    }
  } catch (error) {
    console.error(`Error transferring repositories: ${error}`);
  }
}

transferAllRepos();