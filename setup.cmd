@ECHO OFF

REM "Install dependencies using npm."
call npm install

REM "Install typings for Typescript."
call tsd query mocha --save --action install
call tsd query should --save --action install
call tsd query superagent --save --action install
