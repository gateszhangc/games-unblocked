$baseUrl = "https://unblocked-games.s3.amazonaws.com/games/2025/unity4/dublix"
$destPath = "E:\code\games-unblocked\test3\public\games\2025\unity4\dublix"

# Create destination directory
New-Item -Path $destPath -ItemType Directory -Force | Out-Null

Write-Host "Downloading Dublix game index.html..." -ForegroundColor Cyan
try {
    Invoke-WebRequest -Uri "$baseUrl/index.html" -OutFile "$destPath\index.html"
    Write-Host "[OK] Downloaded index.html" -ForegroundColor Green
} catch {
    Write-Host "[FAIL] Failed to download index.html: $_" -ForegroundColor Red
    exit 1
}

# Read index.html to find all referenced files
$indexContent = Get-Content "$destPath\index.html" -Raw

# Extract all file references (js, wasm, data, json, etc.)
$filePatterns = @(
    'src="([^"]+)"',
    'href="([^"]+)"',
    'url\(([^\)]+)\)',
    '"([^"]+\.(?:js|wasm|data|json|png|jpg|jpeg|gif|webp|svg|css|unityweb|framework\.js\.gz|data\.gz|wasm\.gz|loader\.js))"'
)

$filesToDownload = @()
foreach ($pattern in $filePatterns) {
    $matches = [regex]::Matches($indexContent, $pattern)
    foreach ($match in $matches) {
        $file = $match.Groups[1].Value
        # Skip external URLs and data URIs
        if ($file -notmatch '^(http|data:|//)' -and $file -notmatch '^\s*$') {
            # Clean up the path
            $file = $file -replace '^\./', '' -replace '^/', ''
            if ($file -and $filesToDownload -notcontains $file) {
                $filesToDownload += $file
            }
        }
    }
}

# Common Unity WebGL files
$unityFiles = @(
    "Build/dublix.loader.js",
    "Build/dublix.framework.js.gz",
    "Build/dublix.framework.js",
    "Build/dublix.data.gz",
    "Build/dublix.data",
    "Build/dublix.wasm.gz",
    "Build/dublix.wasm",
    "Build/dublix.json",
    "TemplateData/style.css",
    "TemplateData/UnityProgress.js",
    "TemplateData/favicon.ico",
    "TemplateData/fullscreen-button.png",
    "TemplateData/progress-bar-empty-dark.png",
    "TemplateData/progress-bar-empty-light.png",
    "TemplateData/progress-bar-full-dark.png",
    "TemplateData/progress-bar-full-light.png",
    "TemplateData/unity-logo-dark.png",
    "TemplateData/unity-logo-light.png",
    "TemplateData/webgl-logo.png"
)

$filesToDownload += $unityFiles

# Remove duplicates
$filesToDownload = $filesToDownload | Select-Object -Unique

Write-Host "`nFound $($filesToDownload.Count) files to download" -ForegroundColor Cyan

$downloaded = 0
$failed = 0

foreach ($file in $filesToDownload) {
    $fileUrl = "$baseUrl/$file"
    $fileDest = Join-Path $destPath $file
    
    # Create directory if needed
    $fileDir = Split-Path $fileDest -Parent
    if (!(Test-Path $fileDir)) {
        New-Item -Path $fileDir -ItemType Directory -Force | Out-Null
    }
    
    Write-Host "Downloading: $file" -NoNewline
    try {
        Invoke-WebRequest -Uri $fileUrl -OutFile $fileDest -ErrorAction Stop
        Write-Host " [OK]" -ForegroundColor Green
        $downloaded++
    } catch {
        Write-Host " [FAIL]" -ForegroundColor Yellow
        $failed++
    }
}

Write-Host "`n=== Summary ===" -ForegroundColor Magenta
Write-Host "Successfully downloaded: $downloaded files" -ForegroundColor Green
Write-Host "Failed/Not found: $failed files" -ForegroundColor Yellow
Write-Host "`nGame files saved to: $destPath" -ForegroundColor Cyan
