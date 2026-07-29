$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$publicDir = Join-Path $projectRoot "public"
$distDir = Join-Path $projectRoot "dist"
$clientDir = Join-Path $distDir "client"
$serverDir = Join-Path $distDir "server"
$workerSource = Join-Path $PSScriptRoot "sites-worker.js"

if (Test-Path -LiteralPath $distDir) {
    $resolvedProject = [IO.Path]::GetFullPath($projectRoot)
    $resolvedDist = [IO.Path]::GetFullPath($distDir)
    if (-not $resolvedDist.StartsWith("$resolvedProject\", [StringComparison]::OrdinalIgnoreCase)) {
        throw "Refusing to clear a build directory outside the project."
    }
    Remove-Item -LiteralPath $resolvedDist -Recurse -Force
}

& hugo --cleanDestinationDir --environment production
if ($LASTEXITCODE -ne 0) {
    throw "Hugo build failed."
}

New-Item -ItemType Directory -Path $clientDir, $serverDir -Force | Out-Null
Get-ChildItem -LiteralPath $publicDir -Force |
    Copy-Item -Destination $clientDir -Recurse -Force
Copy-Item -LiteralPath $workerSource -Destination (Join-Path $serverDir "index.js")
