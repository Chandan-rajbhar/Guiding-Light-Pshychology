Add-Type -AssemblyName System.Drawing
$imgPath = Resolve-Path "public/assets/images/guidings-1019x1024.png"
$img = [System.Drawing.Bitmap]::FromFile($imgPath)
Write-Host "Width: $($img.Width), Height: $($img.Height)"
$img.Dispose()
