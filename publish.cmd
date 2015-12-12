@ECHO OFF

ECHO "Bumping version..."
call npm version patch

ECHO "Pushing to Git..."
call git push

ECHO "Pushing package..."
call npm run publish
