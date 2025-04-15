#!/bin/bash
# scripts/update-git-logs.sh
# Prepends the latest commit log (formatted) to git_commit_logs.txt

set -e

# Get the latest commit log in the desired format
git log -1 --stat --date=iso | \
awk '
NR==1 {
  printf "* %s  ", $2;
  for (i=3; i<=NF; i++) printf "%s ", $i;
  print "|"
  next
}
NR>1 && $0 !~ /^$/ { print "|  "$0 }
' > .git_commit_entry.tmp

# Prepend to git_commit_logs.txt
if [ -f git_commit_logs.txt ]; then
  cat .git_commit_entry.tmp git_commit_logs.txt > .git_commit_logs.new
  mv .git_commit_logs.new git_commit_logs.txt
else
  mv .git_commit_entry.tmp git_commit_logs.txt
fi

rm -f .git_commit_entry.tmp
