@echo off
chcp 65001 >nul
title AKA DMALL - Installation et Lancement
color 0B

cls
echo.
echo   ______   **    **   ______         _______   **       **   ______   **        **       
echo  /      \  ^|  \  /  \ /      \       ^|       \ ^|  \     /  \ /      \ ^|  \      ^|  \      
echo ^|  $$$$$$\^| $$ /  $$^|  $$$$$$\      ^| $$$$$$$\^| $$\   /  $$^|  $$$$$$\^| $$      ^| $$      
echo ^| $$__^| $$^| $$/  $$ ^| $$__^| $$      ^| $$  ^| $$^| $$$\ /  $$$^| $$__^| $$^| $$      ^| $$      
echo ^| $$    $$^| $$  $$  ^| $$    $$      ^| $$  ^| $$^| $$$$\  $$$$^| $$    $$^| $$      ^| $$      
echo ^| $$$$$$$$^| $$$$$\  ^| $$$$$$$$      ^| $$  ^| $$^| $$\$$ $$ $$^| $$$$$$$$^| $$      ^| $$      
echo ^| $$  ^| $$^| $$ \$$\ ^| $$  ^| $$      ^| $$__/ $$^| $$ \$$$^| $$^| $$  ^| $$^| $$_____ ^| $$_____ 
echo ^| $$  ^| $$^| $$  \$$\^| $$  ^| $$      ^| $$    $$^| $$  \$ ^| $$^| $$  ^| $$^| $$     \^| $$     \
echo  \$$   \$$ \$$   \$$ \$$   \$$       \$$$$$$$  \$$      \$$ \$$   \$$ \$$$$$$$$ \$$$$$$$$
echo.
echo                        Installation et lancement automatique
echo                              Par meuhq (AKA)
echo.
echo ================================================================================
echo.

REM Vérifier si Node.js est installé
echo [*] Verification de Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo [X] Node.js n'est pas installe!
    echo.
    echo [!] Veuillez installer Node.js depuis https://nodejs.org/
    echo [!] Puis relancez ce script.
    echo.
    pause
    exit /b 1
) else (
    echo [✓] Node.js est installe
)

REM Vérifier si npm est installé
echo [*] Verification de npm...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo [X] npm n'est pas installe!
    echo.
    pause
    exit /b 1
) else (
    echo [✓] npm est installe
)

echo.
echo ================================================================================
echo.

REM Créer package.json si nécessaire
if not exist package.json (
    echo [*] Creation du package.json...
    (
        echo {
        echo   "name": "aka-dmall",
        echo   "version": "1.0.0",
        echo   "description": "AKA DM All Script",
        echo   "main": "index.js",
        echo   "scripts": {
        echo     "start": "node index.js"
        echo   },
        echo   "author": "meuhq (AKA)",
        echo   "license": "MIT",
        echo   "dependencies": {}
        echo }
    ) > package.json
    echo [✓] package.json cree
)

REM Installer les modules npm
echo.
echo [*] Installation des modules npm...
echo.

echo [*] Installation de chalk...
call npm install chalk --save
if %errorlevel% neq 0 (
    color 0C
    echo [X] Erreur lors de l'installation de chalk
    pause
    exit /b 1
)
echo [✓] chalk installe

echo [*] Installation de prompt-sync...
call npm install prompt-sync --save
if %errorlevel% neq 0 (
    color 0C
    echo [X] Erreur lors de l'installation de prompt-sync
    pause
    exit /b 1
)
echo [✓] prompt-sync installe

echo [*] Installation de axios...
call npm install axios --save
if %errorlevel% neq 0 (
    color 0C
    echo [X] Erreur lors de l'installation de axios
    pause
    exit /b 1
)
echo [✓] axios installe

echo [*] Installation de discord.js-selfbot-v13...
call npm install discord.js-selfbot-v13 --save
if %errorlevel% neq 0 (
    color 0C
    echo [X] Erreur lors de l'installation de discord.js-selfbot-v13
    pause
    exit /b 1
)
echo [✓] discord.js-selfbot-v13 installe

echo.
echo ================================================================================
echo.
echo [✓] Tous les modules sont installes!
echo.

REM Vérifier si index.js existe
if not exist index.js (
    color 0C
    echo [X] Le fichier index.js n'existe pas!
    echo [!] Creez le fichier index.js avec votre code et relancez ce script.
    echo.
    pause
    exit /b 1
)

echo [*] Lancement du script dans 3 secondes...
timeout /t 3 /nobreak >nul

echo.
echo ================================================================================
echo.

REM Lancer le script
node index.js

echo.
echo ================================================================================
echo.
echo [✓] Script termine!
echo.
pause