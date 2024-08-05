import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: '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'
});

const repoOwner = 'SpectralAUT';
const repoName = 'api-gh-node';
const workflowRuns = [];

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
}

getAllWorkflowRuns();