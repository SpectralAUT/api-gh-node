import { Octokit } from 'octokit';
import fs from 'fs';
import path from 'path';

const token = 'token';
const imagePath = './manual_report/ai-businessman.jpg'; // Update with your local image path

const octokit = new Octokit({
  baseUrl: 'https://api.github.com',
  auth: token
});

// Read the image file
fs.readFile(path.resolve(imagePath), (err, data) => {
  if (err) {
    console.error(`Error reading image file: ${err}`);
    return;
  }

  // Convert the image data to a base64-encoded string
  const base64Image = data.toString('base64');

  // Update the profile picture
  octokit.request('PATCH /user', {
    avatar: base64Image
  })
    .then((response) => {
      console.log('Updated profile picture');
    })
    .catch((error) => {
      console.error(`Error updating profile picture: ${error}`);
    });
});