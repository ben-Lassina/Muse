#!/bin/bash

# === PAD NAAR HTML-BESTAND (PAS AAN ALS NODIG) ===
HTML_PATH="C:\Users\SD003\Desktop\Muse\Muse\Index.html"

# === PAD NAAR CHROME.EXE (PAS AAN ALS NODIG) ===
CHROME_PATH="C:\Program Files\Google\Chrome\Application\chrome.exe"

# Openen in een nieuwe **tab** in bestaand Chrome-venster
"$CHROME_PATH" --allow-file-access-from-files "file://$HTML_PATH"
# python klik.py