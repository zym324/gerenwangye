$ErrorActionPreference = 'SilentlyContinue'
Write-Output '=== Vercel auth dir ==='
$v = Join-Path $env:USERPROFILE '.vercel'
if (Test-Path $v) { Get-ChildItem $v -Recurse -Name | Select-Object -First 8 } else { Write-Output 'none' }

Write-Output '=== Cloudflare wrangler dirs ==='
foreach ($p in @((Join-Path $env:USERPROFILE '.wrangler'), (Join-Path $env:USERPROFILE '.cloudflare'))) {
  if (Test-Path $p) { Write-Output ("EXISTS: " + $p); Get-ChildItem $p -Recurse -Name | Select-Object -First 8 }
}

Write-Output '=== npx tool availability ==='
$which = @('npx','npm','node') | ForEach-Object { Get-Command $_ -ErrorAction SilentlyContinue }
foreach ($c in $which) { if ($c) { Write-Output ($c.Name + ' -> ' + $c.Source) } }

Write-Output '=== git remote ==='
Set-Location 'D:\gerenwangye'
git remote -v
