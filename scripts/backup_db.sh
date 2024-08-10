#!/bin/bash

set -e

echo "Backing up ensenas-test db..."

pg_dump ensenas-db > back_ensenas_01

echo "Done!"


