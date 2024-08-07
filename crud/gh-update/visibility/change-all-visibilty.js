import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: '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'
});

const repoOwner = 'aijuannode';
const updatedRepoVisibility = 'public';

// Read the repository names and their current visibility from the output of the previous command
const repos = require('child_process').execSync(`
  gh api graphql --paginate -f query='
    query {
      viewer {
        repositories(first: 100) {
          nodes {
            name
            visibility
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    }
  ' | jq '.data.viewer.repositories.nodes[] | .name + " - " + .visibility'
`).toString().trim().split('\n');

// Update the visibility of each repository
repos.forEach((repo) => {
  const [repoName, currentVisibility] = repo.split(' - ');
  if (currentVisibility !== updatedRepoVisibility) {
    octokit.request(`PATCH /repos/${repoOwner}/${repoName}`, {
      visibility: updatedRepoVisibility
    })
    .then((response) => {
      console.log(`Updated repository ${repoName} visibility to ${updatedRepoVisibility}`);
    })
    .catch((error) => {
      console.error(`Error updating repository visibility: ${error}`);
    });
  }
});