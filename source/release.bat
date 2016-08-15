@echo off
rem fis release -r ./www -f ./build/fis-conf.js -d dev -wpL --domains //注释
choice /C DP /M "请选择部署环境：D：开发环境, P:生产环境"

if errorlevel 2 goto prd 
if errorlevel 1 goto dev

:prd
fis release -r ./www -f ./build/fis-conf.js -d prd -po -D
goto end

:dev
fis release -r ./www -f ./build/fis-conf.js -d dev -wpL -D
goto end
