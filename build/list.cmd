@echo off

call :start > list.html

:start
echo ^<ol^>
for %%f in (*.html) do echo ^<li^>^<a href^="%%~nxf"^>%%~nxf^</a^>^</li^>
echo ^</ol^>