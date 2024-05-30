#!/usr/bin/env bash

set -o nounset
set -o errexit

# Print a helpful message if a pipeline with non-zero exit code causes the script to exit.
trap 'echo "Aborting due to errexit on line $LINENO. Exit code: $?" >&2' ERR

# Allow the above trap be inherited by all functions in the script.
set -o errtrace

# Return value of a pipeline is the value of the last (rightmost) command to
# exit with a non-zero status, or zero if all commands in the pipeline exit
# successfully.
set -o pipefail

# Set $IFS to only newline and tab.
#
# http://www.dwheeler.com/essays/filenames-in-shell.html
IFS=$'\n\t'

###############################################################################
# Environment
###############################################################################

# $_ME
#
# This program's basename.
_ME="$(basename "${0}")"

###############################################################################
# Help
###############################################################################

_print_help() {
  cat <<HEREDOC

Simple script to set SSH configuration for remote access.

Usage:
  ${_ME} -k | --key <path_to_ssh_key>
  ${_ME} -h | --help

Options:
  -h --help  Show this screen.

HEREDOC
}

###############################################################################
# Program Functions
###############################################################################

_simple() {
  printf "Perform a simple operation.\\n"
}

###############################################################################
# Main
###############################################################################

_main() {
  # Avoid complex option parsing when only one program option is expected.
  if [[ "${1:-}" =~ ^-h|--help$ ]]; then
    _print_help
  else
    for arg in "$@"; do
      echo "$arg"
    done
    _simple "$@"
  fi
}

# Call `_main` after everything has been defined.
_main "$@"
