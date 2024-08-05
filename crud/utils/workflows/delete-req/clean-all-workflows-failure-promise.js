import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: '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'
});

const repoOwner = 'SpectralAUT';
const repoName = 'api-gh-node';

async function deleteFailedWorkflowRuns() {
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    const response = await octokit.request(`GET /repos/${repoOwner}/${repoName}/actions/runs`, {
      params: {
        per_page: 50,
        page,
        status: 'failure' // only retrieve workflow runs with failure status
      }
    });

    const failedRuns = response.data.workflow_runs;

    for (const run of failedRuns) {
      try {
        await octokit.request(`DELETE /repos/${repoOwner}/${repoName}/actions/runs/${run.id}`);
        console.log(`Deleted workflow run ${run.id} with failure status`);
      } catch (error) {
        console.error(`Error deleting workflow run ${run.id}: ${error.message}`);
      }
    }

    hasNextPage = response.data.total_count > (page * 100);
    page++;

    // Add a 1-second delay to avoid hitting the rate limit
    await new Promise(resolve => setTimeout(resolve, 10));
  }
}

deleteFailedWorkflowRuns();