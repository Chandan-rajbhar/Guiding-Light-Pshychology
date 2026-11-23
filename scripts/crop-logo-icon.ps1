Add-Type -AssemblyName System.Drawing
$imgPath = Resolve-Path "public/assets/images/guidings-1019x1024.png"
$img = [System.Drawing.Bitmap]::FromFile($imgPath)

# Find X min and X max for the emblem (Y from 0 to 710)
$minX = $img.Width
$maxX = 0
$minY = $img.Height
$maxY = 0

for ($y = 0; $y -lt 715; $y++) {
    for ($x = 0; $x -lt $img.Width; $x++) {
        $p = $img.GetPixel($x, $y)
        # Check if pixel has opacity and not white
        if ($p.A -gt 15 -and -not ($p.R -gt 250 -and $p.G -gt 250 -and $p.B -gt 250)) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Host "Emblem bounds: X from $minX to $maxX (width: $($maxX - $minX)), Y from $minY to $maxY (height: $($maxY - $minY))"

# Add small padding (e.g. 15px) so the star and tail glow are completely uncropped
$pad = 16
$cropX = [Math]::Max(0, $minX - $pad)
$cropY = [Math]::Max(0, $minY - $pad)
$cropW = [Math]::Min($img.Width - $cropX, ($maxX - $minX) + ($pad * 2))
$cropH = [Math]::Min($img.Height - $cropY, ($maxY - $minY) + ($pad * 2))

# Make it square if desired or keep natural aspect ratio
$size = [Math]::Max($cropW, $cropH)
$offsetX = [Math]::Floor(($size - $cropW) / 2)
$offsetY = [Math]::Floor(($size - $cropH) / 2)

$cropRect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
$destBmp = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($destBmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.Clear([System.Drawing.Color]::Transparent)

$destRect = New-Object System.Drawing.Rectangle($offsetX, $offsetY, $cropW, $cropH)
$g.DrawImage($img, $destRect, $cropRect, [System.Drawing.GraphicsUnit]::Pixel)

$outPath = Resolve-Path "public/assets/images"
$destBmp.Save("$outPath/logo-icon.png", [System.Drawing.Imaging.ImageFormat]::Png)

Write-Host "Successfully saved uncropped logo-icon.png ($size x $size) to $outPath/logo-icon.png"

$g.Dispose()
$destBmp.Dispose()
$img.Dispose()
