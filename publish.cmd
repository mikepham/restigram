@ECHO OFF

call npm run build

ECHO "Runnning tests..."
call npm run test

ECHO "Pushing to Git..."
REM call git push

ECHO "Pushing package..."
REM call npm run publish
