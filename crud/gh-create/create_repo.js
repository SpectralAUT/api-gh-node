import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: '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'
});

const newRepoName = 'tech_cv';
const newRepoDescription = 'Centralized repository for my latest CV updates, documentation, and career milestones. 📝💼';

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