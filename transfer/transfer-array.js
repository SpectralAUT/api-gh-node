import { Octokit } from 'octokit';

// [PROD]

const octokit = new Octokit({
  auth: 'token'
});

const repoOwner = 'SpectralAUT';
const repoNames = [
  'ptes-db',
  'sdet001',
  'sdet_cert',
  'exercises',
  'container_sdeautm',
  's0s_sdt',
  'demo-fight',
  'ccmbr-selenium-node',
  'Playw_k100_demo',
  'ms_win_demo',
  'kafka_basic',
  'juanchoaut',
  'plw_lnx',
  'ccmbr_sprg_mvn_ra',
  'Api_playW',
  'nasa_demo_test_plan',
  'Proscenium_API',
  'ParallelPursuit',
  'e-commerce',
  'net-bash-setup',
  'bash-net-automation',
  'tech_cv'
];
const newOwner = 'aijuannode'; // Replace with the new owner's username

async function transferRepos() {
  for (const repoName of repoNames) {
    try {
      await octokit.request(`POST /repos/${repoOwner}/${repoName}/transfer`, {
        new_owner: newOwner
      });
      console.log(`Transferred repository ${repoName} to ${newOwner}`);
    } catch (error) {
      console.error(`Error transferring repository ${repoName}: ${error}`);
    }
  }
}

transferRepos();