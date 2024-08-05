import { Octokit } from 'octokit';
import PQueue from 'p-queue';

const octokit = new Octokit({
  auth: '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'
});

const repoOwner = 'SpectralAUT';
const repoName = 'api-gh-node';

async function deleteFailedWorkflowRuns() {
  const queue = new PQueue({ concurrency: 10 }); // adjust the concurrency level as needed

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
      queue.add(async () => {
        try {
          await octokit.request(`DELETE /repos/${repoOwner}/${repoName}/actions/runs/${run.id}`);
          console.log(`Deleted workflow run ${run.id} with failure status`);
        } catch (error) {
          console.error(`Error deleting workflow run ${run.id}: ${error.message}`);
        }
      });
    }

    page++;
  }

  await queue.onIdle(); // wait for all queue tasks to complete
}

deleteFailedWorkflowRuns();