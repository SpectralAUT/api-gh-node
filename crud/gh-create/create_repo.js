import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: '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'
});

const newRepoName = 'api-gh-node';
const newRepoDescription = 'This is a new repository';

const response = await octokit.request('POST /user/repos', {
  name: newRepoName,
  description: newRepoDescription,
  private: false,
  has_issues: true,
  has_projects: true,
  has_wiki: true,
  license_template: 'gpl-3.0',
  auto_init: true,
  gitignore_template: 'Node'
});

console.log(response.data);