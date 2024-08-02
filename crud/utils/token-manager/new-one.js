import { Octokit } from 'octokit';

const octokit = new Octokit({
  baseUrl: 'https://api.github.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

const username = 'juannodecoorp@gmail.com';
const password = '$$$$#FOV78sbxss6567&&sxns';
const tokenNote = 'your-token-note'; // e.g. "My new token"
const tokenScopes = ['repo', 'read:org', 'write:repo_hook']; // choose your scopes

const response = await octokit.request(`POST /users/${username}/authorizations`, {
  scopes: tokenScopes,
  note: tokenNote,
  client_id: '',
  client_secret: '',
  fingerprint: ''
});

const token = response.data.token;
console.log(`Your new token is: ${token}`);