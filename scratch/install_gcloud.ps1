$zipPath = "$HOME\google-cloud-cli.zip"
$extractPath = "$HOME"
$sdkPath = "$HOME\google-cloud-sdk"

if (Test-Path $sdkPath) {
    Write-Host "Removing incomplete SDK folder..."
    Remove-Item $sdkPath -Recurse -Force -ErrorAction SilentlyContinue
}

Write-Host "Extracting ZIP archive using native tar.exe (to bypass Windows MAX_PATH limits)..."
tar -xf $zipPath -C $extractPath

Write-Host "Running install.bat script..."
& "$sdkPath\install.bat" --usage-reporting=false --path-update=true --command-completion=true --quiet

Write-Host "Cleaning up ZIP file..."
Remove-Item $zipPath -Force

Write-Host "Google Cloud SDK Installation Complete!"
