import { spawn } from 'child_process';

const githubUsername = 'juannodecoorp@gmail.com';
const githubPassword = '$$$$#FOV78sbxss6567&&sxns';

const scopes = [
  'repo',
  'repo:status',
  'repo_deployment',
  'public_repo',
  'repo:invite',
  'security_events',
  'workflow',
  'write:packages',
  'read:packages',
  'delete:packages',
  'admin:org',
  'write:org',
  'read:org',
  'manage_runners:org',
  'admin:public_key',
  'write:public_key',
  'read:public_key',
  'admin:repo_hook',
  'write:repo_hook',
  'read:repo_hook',
  'admin:org_hook',
  'gist',
  'notifications',
  'user',
  'read:user',
  'user:email',
  'user:follow',
  'delete_repo',
  'write:discussion',
  'read:discussion',
  'admin:enterprise',
  'manage_runners:enterprise',
  'manage_billing:enterprise',
  'read:enterprise',
  'audit_log',
  'read:audit_log',
  'codespace',
  'codespace:secrets',
  'copilot',
  'manage_billing:copilot',
  'project',
  'read:project',
  'admin:gpg_key',
  'write:gpg_key',
  'read:gpg_key',
  'admin:ssh_signing_key',
  'write:ssh_signing_key',
  'read:ssh_signing_key',
];

async function main() {
  try {
    // Login to GitHub using gh auth login
    const loginCmd = spawn('gh', ['auth', 'login', '-h', 'github.com', '-p', 'https', '--web'], {
      stdio: 'inherit',
    });

    await new Promise((resolve, reject) => {
      loginCmd.on('close', resolve);
    });

    // Generate a new personal access token with all scopes selected using gh auth token
    const tokenCmd = spawn('gh', ['auth', 'token', '--scopes', scopes.join(',')] );
    let tokenOutput = '';

    tokenCmd.stdout.on('data', (data) => {
      tokenOutput += data.toString();
    });

    await new Promise((resolve, reject) => {
      tokenCmd.on('close', resolve);
    });

    const newToken = tokenOutput.trim();
    console.log(`New personal access token: ${newToken}`);
  } catch (error) {
    console.error(error);
  }
}

main();