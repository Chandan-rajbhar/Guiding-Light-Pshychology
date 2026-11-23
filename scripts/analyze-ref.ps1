Add-Type -AssemblyName System.Drawing
$imgPath = "C:/Users/UxdLab/.gemini/antigravity/brain/884611aa-038d-402f-8f28-67413f5cbb15/.user_uploaded/media_1795429386963_b96cf306.png"
$img = [System.Drawing.Bitmap]::FromFile($imgPath)

Write-Host "Image dimensions: $($img.Width) x $($img.Height)"

# Sample colors along the bottom and around Profile
Write-Host "--- Sampling pixels around right tab (Profile) ---"
for ($y = 15; $y -lt $img.Height - 5; $y += 6) {
    $line = "Y=$($y): "
    for ($x = [int]($img.Width * 0.78); $x -lt [int]($img.Width * 0.95); $x += 10) {
        $p = $img.GetPixel($x, $y)
        $hex = "#{0:X2}{1:X2}{2:X2}" -f $p.R, $p.G, $p.B
        $line += "$hex "
    }
    Write-Host $line
}

# Check navbar background color (e.g. at x=100, y=30)
$bg = $img.GetPixel(100, 30)
Write-Host "Navbar BG: #$("{0:X2}{1:X2}{2:X2}" -f $bg.R, $bg.G, $bg.B)"

# Check page background color above navbar (e.g. at x=20, y=5)
$pageBg = $img.GetPixel(20, 5)
Write-Host "Page BG: #$("{0:X2}{1:X2}{2:X2}" -f $pageBg.R, $pageBg.G, $pageBg.B)"

$img.Dispose()
