import { Octokit } from 'octokit';

// Ok improve perf
const octokit = new Octokit({
  auth: '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'
});

const repoOwner = 'SpectralAUT';
const repoName = 'octokit-node-crud';

async function deleteFailedWorkflowRuns() {
  let page = 1;

  while (true) {
    const response = await octokit.request(`GET /repos/${repoOwner}/${repoName}/actions/runs`, {
      params: {
        per_page: 100,
        page,
        status: 'failure' // only retrieve workflow runs with failure status
      }
    });

    const failedRuns = response.data.workflow_runs;

    if (failedRuns.length === 0) {
      break; // no more workflow runs, exit the loop
    }

    for (const run of failedRuns) {
      try {
        await octokit.request(`DELETE /repos/${repoOwner}/${repoName}/actions/runs/${run.id}`);
        console.log(`Deleted workflow run ${run.id} with failure status`);
      } catch (error) {
        console.error(`Error deleting workflow run ${run.id}: ${error.message}`);
      }
    }

    page++;
  }
}

deleteFailedWorkflowRuns();