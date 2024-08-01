import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: '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'
});

const repoOwner = 'SpectralAUT';
const repoName = 'octokit-node-crud';

// Fetch all workflow runs
octokit.request(`GET /repos/${repoOwner}/${repoName}/actions/runs`, {
  per_page: 100, // fetch 100 runs per page
  page: 1
})
.then((response) => {
  const workflowRuns = response.data;

  // Delete each workflow run
  workflowRuns.forEach((run) => {
    octokit.request(`DELETE /repos/${repoOwner}/${repoName}/actions/runs/${run.id}`)
      .then((response) => {
        console.log(`Deleted workflow run ${run.id}`);
      })
      .catch((error) => {
        console.error(`Error deleting workflow run ${run.id}: ${error}`);
      });
  });

  // Check if there are more pages of workflow runs
  if (response.headers.link && response.headers.link.includes('rel="next"')) {
    const nextPageUrl = response.headers.link.match(/<([^>]+)>; rel="next"/)[1];
    const nextPageNumber = nextPageUrl.match(/page=(\d+)/)[1];

    // Fetch the next page of workflow runs
    octokit.request(`GET /repos/${repoOwner}/${repoName}/actions/runs`, {
      per_page: 100,
      page: nextPageNumber
    })
    .then((response) => {
      // Repeat the deletion process for the next page of workflow runs
      const workflowRuns = response.data;
      workflowRuns.forEach((run) => {
        octokit.request(`DELETE /repos/${repoOwner}/${repoName}/actions/runs/${run.id}`)
          .then((response) => {
            console.log(`Deleted workflow run ${run.id}`);
          })
          .catch((error) => {
            console.error(`Error deleting workflow run ${run.id}: ${error}`);
          });
      });
    })
    .catch((error) => {
      console.error(`Error fetching next page of workflow runs: ${error}`);
    });
  }
})
.catch((error) => {
  console.error(`Error fetching workflow runs: ${error}`);
});