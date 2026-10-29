$t1 = $env:GITHUB_TOKEN
$t2 = $env:GH_TOKEN
Write-Output ("GITHUB_TOKEN len={0} placeholder={1}" -f $t1.Length, ($t1 -match '^(xxx|token|YOUR|<|changeme|\$)'))
Write-Output ("GH_TOKEN len={0} placeholder={1}" -f $t2.Length, ($t2 -match '^(xxx|token|YOUR|<|changeme|\$)'))
$lines = @("protocol=https", "host=github.com", "")
$cred = $lines | git credential fill 2>$null
Write-Output ("gitcm_has_github_credential={0}" -f ($null -ne $cred -and $cred -match 'username'))
