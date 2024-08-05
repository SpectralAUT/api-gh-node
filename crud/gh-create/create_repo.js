import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: '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'
});

const newRepoName = 'bash-net-automation';
const newRepoDescription = 'This is a new repository';

const response = await octokit.request('POST /user/repos', {
  name: newRepoName,
  description: newRepoDescription,
  private: true,
  has_issues: true,
  has_projects: true,
  has_wiki: true,
  license_template: 'gpl-3.0',
  auto_init: true,
  gitignore_template: 'Node'
});

console.log(response.data);