Add-Type -AssemblyName System.Drawing
$imgPath = Resolve-Path "public/assets/images/guidings-1019x1024.png"
$img = [System.Drawing.Bitmap]::FromFile($imgPath)

# Check transparency / non-white pixels across Y axis
$rowNonEmpty = @()
for ($y = 0; $y -lt $img.Height; $y += 5) {
    $count = 0
    for ($x = 0; $x -lt $img.Width; $x += 10) {
        $pixel = $img.GetPixel($x, $y)
        # Check if pixel is not transparent and not pure white
        if ($pixel.A -gt 20 -and -not ($pixel.R -gt 245 -and $pixel.G -gt 245 -and $pixel.B -gt 245)) {
            $count++
        }
    }
    if ($count -gt 0) {
        $rowNonEmpty += $y
    }
}

Write-Host "First non-empty Y: $($rowNonEmpty[0])"
Write-Host "Last non-empty Y: $($rowNonEmpty[-1])"

# Find gap between emblem and text
$gaps = @()
for ($i = 0; $i -lt ($rowNonEmpty.Length - 1); $i++) {
    $diff = $rowNonEmpty[$i+1] - $rowNonEmpty[$i]
    if ($diff -gt 15) {
        Write-Host "Gap found between Y=$($rowNonEmpty[$i]) and Y=$($rowNonEmpty[$i+1]) (size: $diff)"
    }
}

$img.Dispose()
