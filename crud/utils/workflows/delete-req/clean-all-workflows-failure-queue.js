import { Octokit } from 'octokit';
import PQueue from 'p-queue';

const octokit = new Octokit({
  auth: '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'
});

const repoOwner = 'SpectralAUT';
const repoName = 'octokit-node-crud';
const batchSize = 50;

async function deleteFailedWorkflowRuns() {
  const queue = new PQueue({ concurrency: 10 }); // adjust the concurrency level as needed

  let page = 1;
  let deletedRuns = 0;

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

    const batch = failedRuns.slice(0, batchSize);
    const deletePromises = batch.map((run) => () => deleteWorkflowRun(run.id));

    await queue.addAll(deletePromises);

    deletedRuns += batchSize;
    console.log(`Deleted ${deletedRuns} workflow runs with failure status`);

    page++;
  }
}

async function deleteWorkflowRun(runId) {
  try {
    await octokit.request(`DELETE /repos/${repoOwner}/${repoName}/actions/runs/${runId}`);
    console.log(`Deleted workflow run ${runId} with failure status`);
  } catch (error) {
    console.error(`Error deleting workflow run ${runId}: ${error.message}`);
  }
}

deleteFailedWorkflowRuns();