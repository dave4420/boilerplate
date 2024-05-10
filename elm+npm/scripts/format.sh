#!/bin/sh
default_base_branch=`
    git symbolic-ref refs/remotes/origin/HEAD |
    sed -nE 's_^([^/]+/){3}__p'
`
merge_base=`git merge-base ${base_commit:-$default_base_branch} HEAD`

git diff --name-only $merge_base |
sed -n 's_^elm+npm/__p' |
grep '\.elm$' |
xargs --no-run-if-empty elm-format --yes

git diff --name-only $merge_base |
sed -n 's_^elm+npm/__p' |
grep '\.(js|ts)$' |
xargs --no-run-if-empty prettier --write
