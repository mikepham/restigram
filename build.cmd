@ECHO OFF

ECHO "Linting files..."
REM call tslint lib

ECHO "Building lib..."
call tsc --project lib
