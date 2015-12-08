@ECHO OFF

ECHO "Linting files..."
REM call tslint artifacts

ECHO "Building lib..."
call tsc --project lib
