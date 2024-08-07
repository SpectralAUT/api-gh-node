#!/bin/bash

# Set variables for visibility and repo owner
VISIBILITY="public"
REPO_OWNER="aijuannode"

# Loop through each repo and update visibility
for repo in $(gh repo list --json name | jq -r '.[] | .name'); do
  gh api -X PATCH /repos/$REPO_OWNER/$repo -F "visibility=$VISIBILITY"
done