@echo off
title Lancement du script - Dmall Friends

:: Vérification de Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js n'est pas installé. Va le télécharger ici : https://nodejs.org/
    pause
    exit /b
)

:: Installation des modules nécessaires
echo Installation des modules requis...
npm install chalk prompt-sync axios discord.js-selfbot-v13 >nul 2>&1

if %errorlevel% neq 0 (
    echo Une erreur est survenue pendant l'installation des modules.
    pause
    exit /b
)

:: Lancer le script Node.js
echo.
echo Lancement de index.js...
node index.js

:: Garder la fenêtre ouverte à la fin
echo.
echo Script terminé. Appuie sur une touche pour fermer.
pause >nul
exit /b
