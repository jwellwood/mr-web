#!/bin/bash

# Script to fix imports with leading slashes to relative imports
# This script will find all files under src directory and convert imports with leading slashes to relative imports

# Function to convert imports with leading slashes to relative imports in a file
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

  # Fix imports with leading slashes
  sed -i.bak "s|from '/components/|from '$rel_path"'components/|g' "$file"
  sed -i.bak "s|from '/hooks/|from '$rel_path"'hooks/|g' "$file"
  sed -i.bak "s|from '/errors/|from '$rel_path"'errors/|g' "$file"
  sed -i.bak "s|from '/app/|from '$rel_path"'app/|g' "$file"

  # Fix imports with leading slashes (without trailing slash)
  sed -i.bak "s|from '/hooks'|from '$rel_path"'hooks'|g' "$file"
  sed -i.bak "s|from '/errors'|from '$rel_path"'errors'|g' "$file"
  sed -i.bak "s|from '/app'|from '$rel_path"'app'|g' "$file"

  # Fix imports with double quotes
  sed -i.bak 's|from "/components/|from "'"$rel_path"'components/|g' "$file"
  sed -i.bak 's|from "/hooks/|from "'"$rel_path"'hooks/|g' "$file"
  sed -i.bak 's|from "/errors/|from "'"$rel_path"'errors/|g' "$file"
  sed -i.bak 's|from "/app/|from "'"$rel_path"'app/|g' "$file"

  # Fix imports with double quotes (without trailing slash)
  sed -i.bak 's|from "/hooks"|from "'"$rel_path"'hooks"|g' "$file"
  sed -i.bak 's|from "/errors"|from "'"$rel_path"'errors"|g' "$file"
  sed -i.bak 's|from "/app"|from "'"$rel_path"'app"|g' "$file"

  # Remove backup files
  rm -f "$file.bak"
}

# Find all TypeScript and JavaScript files under src directory
find /Users/alex_quirk/Code/madrid-reds/web-mr/src -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | while read file; do
  # Check if the file contains imports with leading slashes
  if grep -q "from ['\"]/" "$file"; then
    echo "Fixing imports in $file"
    fix_imports "$file"
  fi
done

echo "All imports with leading slashes have been fixed!"
