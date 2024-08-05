#!/bin/bash

# Define the original file name and the total number of clones you want
original_file="npm-publish.yml"
number_of_clones=100

# Loop through the cloning process
for i in $(seq 1 $number_of_clones); do
  # Define the new file name with the incremented number
  new_file_name="npm-publish_${i}.yml"
  
  # Clone the original file and rename it
  cp $original_file $new_file_name
  
  # Optional: Print a confirmation message for each clone
  echo "Cloned $original_file to $new_file_name"
done

# Optional: Print a completion message
echo "Cloning process completed."
