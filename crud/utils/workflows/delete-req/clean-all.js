import { Octokit } from 'octokit';


// [Prod]
const octokit = new Octokit({
  auth: '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'
});

const repoOwner = 'SpectralAUT';
const repoName = 'api-gh-node';
let workflowRuns = [];

async function getAllWorkflowRuns() {
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    const response = await octokit.request(`GET /repos/${repoOwner}/${repoName}/actions/runs`, {
      params: {
        per_page: 100, // retrieve 100 results per page
        page
      }
    });

    const runs = response.data.workflow_runs;
    workflowRuns.push(...runs);

    hasNextPage = response.data.total_count > (page * 100);
    page++;
  }

  console.log(`Retrieved workflow runs: ${workflowRuns.map(run => run.id).join(', ')}`);

  await deleteAllWorkflowRuns(workflowRuns);
}

async function deleteAllWorkflowRuns(workflowRuns) {
  const deletePromises = workflowRuns.map(run => {
    return octokit.request(`DELETE /repos/${repoOwner}/${repoName}/actions/runs/${run.id}`);
  });

  try {
    await Promise.all(deletePromises);
    console.log(`Deleted all workflow runs for ${repoOwner}/${repoName}`);
  } catch (error) {
    console.error(`Error deleting workflow runs: ${error.message}`);
  }
}

getAllWorkflowRuns();