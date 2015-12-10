@ECHO OFF

ECHO "Cleaning directories..."
call npm run clean

ECHO "Building lib..."
call tsc --project lib
