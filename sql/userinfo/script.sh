#!/bin/bash

# Input file containing logs
INPUT_FILE="logs.txt"
# Output file for usernames
OUTPUT_FILE="usernames.txt"

# Ensure the input file exists
if [[ ! -f "$INPUT_FILE" ]]; then
    echo "Error: Input file '$INPUT_FILE' not found!"
    exit 1
fi

# Extract usernames and write to the output file
awk -F' ' '{gsub(/^<[^>]+>/, ""); print $4}' "$INPUT_FILE" > "$OUTPUT_FILE"

echo "Usernames extracted to '$OUTPUT_FILE'"
