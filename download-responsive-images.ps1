$baseUrl = "https://unblocked-games.s3.amazonaws.com/media/posts"
$publicPath = "E:\code\games-unblocked\test3\public\media\posts"

# Get all post directories
$posts = Get-ChildItem -Path $publicPath -Directory

$totalMissing = 0
$totalDownloaded = 0
$totalFailed = 0

foreach ($post in $posts) {
    $postNum = $post.Name
    $responsivePath = Join-Path $post.FullName "responsive"
    
    # Check if responsive folder exists
    if (!(Test-Path $responsivePath)) {
        # Get the main image file
        $mainImages = Get-ChildItem -Path $post.FullName -Filter "*.webp" -ErrorAction SilentlyContinue
        if ($mainImages.Count -eq 0) {
            $mainImages = Get-ChildItem -Path $post.FullName -Filter "*.jpg" -ErrorAction SilentlyContinue
        }
        
        if ($mainImages.Count -gt 0) {
            $mainImage = $mainImages[0]
            $baseName = [System.IO.Path]::GetFileNameWithoutExtension($mainImage.Name)
            $extension = $mainImage.Extension
            
            Write-Host "Processing post $postNum - $baseName$extension" -ForegroundColor Cyan
            
            # Create responsive folder
            New-Item -Path $responsivePath -ItemType Directory -Force | Out-Null
            
            # Try to download xs and sm versions
            $xsFile = "$baseName-xs$extension"
            $smFile = "$baseName-sm$extension"
            
            $xsUrl = "$baseUrl/$postNum/responsive/$xsFile"
            $smUrl = "$baseUrl/$postNum/responsive/$smFile"
            
            $xsPath = Join-Path $responsivePath $xsFile
            $smPath = Join-Path $responsivePath $smFile
            
            try {
                Invoke-WebRequest -Uri $xsUrl -OutFile $xsPath -ErrorAction Stop
                Write-Host "  ✓ Downloaded $xsFile" -ForegroundColor Green
                $totalDownloaded++
            } catch {
                Write-Host "  ✗ Failed to download $xsFile" -ForegroundColor Yellow
                $totalFailed++
            }
            
            try {
                Invoke-WebRequest -Uri $smUrl -OutFile $smPath -ErrorAction Stop
                Write-Host "  ✓ Downloaded $smFile" -ForegroundColor Green
                $totalDownloaded++
            } catch {
                Write-Host "  ✗ Failed to download $smFile" -ForegroundColor Yellow
                $totalFailed++
            }
            
            $totalMissing++
        }
    }
}

Write-Host "`n=== Summary ===" -ForegroundColor Magenta
Write-Host "Posts with missing responsive folders: $totalMissing" -ForegroundColor Cyan
Write-Host "Images successfully downloaded: $totalDownloaded" -ForegroundColor Green
Write-Host "Images failed to download: $totalFailed" -ForegroundColor Yellow
