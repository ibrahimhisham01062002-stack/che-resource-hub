# Set CLOUDSDK_PYTHON permanently for the current user
$pythonPath = "C:\Users\SURFACE 4\AppData\Local\Programs\Python\Python313\python.exe"
[Environment]::SetEnvironmentVariable("CLOUDSDK_PYTHON", $pythonPath, "User")
Write-Host "Set CLOUDSDK_PYTHON to $pythonPath in User Environment."

# Add google-cloud-sdk\bin to User PATH
$sdkBin = "C:\Users\SURFACE 4\google-cloud-sdk\bin"
$currentPath = [Environment]::GetEnvironmentVariable("Path", "User")

if ($currentPath -split ';' -notcontains $sdkBin) {
    $newPath = "$currentPath;$sdkBin"
    # Clean up double semicolons
    $newPath = $newPath -replace ';;', ';'
    [Environment]::SetEnvironmentVariable("Path", $newPath, "User")
    Write-Host "Added $sdkBin to User PATH."
} else {
    Write-Host "$sdkBin is already in User PATH."
}
