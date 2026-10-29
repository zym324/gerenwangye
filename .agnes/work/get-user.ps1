$lines = @('protocol=https', 'host=github.com', '')
$out = $lines | git credential fill 2>&1
$user = ($out -split "`n" | Where-Object { $_ -match '^username=' }) -join ''
Write-Output ("GCM username: " + $user)
