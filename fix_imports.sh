#!/bin/bash

# Script to fix absolute imports to relative imports
# This script will find all files under src directory and convert absolute imports to relative imports

# Function to calculate relative path from one directory to another
get_relative_path() {
  local from_dir=$1
  local to_dir=$2

  # Remove common prefix
  local common_prefix=$(echo "$from_dir" | grep -o "^.*/" | grep -o "^.*/" | tail -1)

  if [ -z "$common_prefix" ]; then
    # No common prefix, use absolute path
    echo "$to_dir"
    return
  fi

  # Count number of directories to go up
  local up_count=$(echo "${from_dir#$common_prefix}" | tr -cd '/' | wc -c)

  # Build relative path
  local rel_path=""
  for ((i=0; i<$up_count; i++)); do
    rel_path="../$rel_path"
  done

  # Add path to target
  rel_path="$rel_path${to_dir#$common_prefix}"

  echo "$rel_path"
}

# Function to convert absolute imports to relative imports in a file
fix_imports() {
  local file=$1
  local dir=$(dirname "$file")

  # Calculate relative path from file's directory to src directory
  local src_dir="/Users/alex_quirk/Code/madrid-reds/web-mr/src"

  # If the file is in the src directory, rel_path will be empty
  if [ "$dir" = "$src_dir" ]; then
    rel_path=""
  else
    # Get the path from the file's directory to the src directory
    # by counting the number of directories from src to the file
    # and adding that many "../" to the path
    local rel_path=""
    local temp_dir="$dir"
    while [[ "$temp_dir" != "$src_dir" && "$temp_dir" != "/" ]]; do
      rel_path="../$rel_path"
      temp_dir=$(dirname "$temp_dir")
    done
  fi

  # Fix imports from 'components', 'hooks', 'errors', or 'app'
  # Handle imports with single quotes
  sed -i.bak -E "s|from ['](components/|from '$rel_path"'components/|g' "$file"
  sed -i.bak -E "s|from ['](hooks/|from '$rel_path"'hooks/|g' "$file"
  sed -i.bak -E "s|from ['](errors/|from '$rel_path"'errors/|g' "$file"
  sed -i.bak -E "s|from ['](app/|from '$rel_path"'app/|g' "$file"

  # Handle imports with double quotes
  sed -i.bak -E 's|from ["](components/|from "'"$rel_path"'components/|g' "$file"
  sed -i.bak -E 's|from ["](hooks/|from "'"$rel_path"'hooks/|g' "$file"
  sed -i.bak -E 's|from ["](errors/|from "'"$rel_path"'errors/|g' "$file"
  sed -i.bak -E 's|from ["](app/|from "'"$rel_path"'app/|g' "$file"

  # Fix imports from 'hooks', 'errors', 'app' (without trailing slash)
  # Handle imports with single quotes
  sed -i.bak -E "s|from ['](hooks)['\"]|from '$rel_path"'hooks"|g' "$file"
  sed -i.bak -E "s|from ['](errors)['\"]|from '$rel_path"'errors"|g' "$file"
  sed -i.bak -E "s|from ['](app)['\"]|from '$rel_path"'app"|g' "$file"

  # Handle imports with double quotes
  sed -i.bak -E 's|from ["](hooks)["\"]|from "'"$rel_path"'hooks"|g' "$file"
  sed -i.bak -E 's|from ["](errors)["\"]|from "'"$rel_path"'errors"|g' "$file"
  sed -i.bak -E 's|from ["](app)["\"]|from "'"$rel_path"'app"|g' "$file"

  # Handle imports with leading slash
  sed -i.bak -E "s|from ['\"]/(components/|from '$rel_path"'components/|g' "$file"
  sed -i.bak -E "s|from ['\"]/(hooks/|from '$rel_path"'hooks/|g' "$file"
  sed -i.bak -E "s|from ['\"]/(errors/|from '$rel_path"'errors/|g' "$file"
  sed -i.bak -E "s|from ['\"]/(app/|from '$rel_path"'app/|g' "$file"

  # Handle imports with leading slash (without trailing slash)
  sed -i.bak -E "s|from ['\"]/(hooks)['\"]|from '$rel_path"'hooks"|g' "$file"
  sed -i.bak -E "s|from ['\"]/(errors)['\"]|from '$rel_path"'errors"|g' "$file"
  sed -i.bak -E "s|from ['\"]/(app)['\"]|from '$rel_path"'app"|g' "$file"

  # Remove backup files
  rm -f "$file.bak"
}

# Find all TypeScript and JavaScript files under src directory
find /Users/alex_quirk/Code/madrid-reds/web-mr/src -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | while read file; do
  echo "Fixing imports in $file"
  fix_imports "$file"
done

echo "All imports have been fixed!"
