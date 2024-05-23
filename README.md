# Boilerplate

A collection of boilerplate.

Each directory (except for `.github`) contains boilerplate for a
different project (different language / build tool / type of component).

To use:

- copy the directory of interest to the root of a new repo
- (if hosting on GitHub) copy the relevant CI workflow to the new repo
- edit files so that they expect to be in the repo root instead of a
  subdirectory (`grep -F` for the directory name)

To explore and run what’s present in each directory, just change to that
directory and build/run/read the code according to the instructions.

## CI

- CI is not run if the only changes were to documentation
- CI split into separate CI workflows for each subdirectory, and for the repo as a whole
- CI is only run for subdirectories that have changes
- the central CI workflow lints yaml files
- CI will not fix formatting or simple linting errors;
  it doesn’t feel like that will play well with this separate sub-CI architecture

## CD

There is no deployment set up, although some subdirectories may have
prod build scripts.
