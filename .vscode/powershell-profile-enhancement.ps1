# PowerShell Profile Enhancement for GitHub Repositories
# Add this to your PowerShell profile for automatic repo detection

function Set-GitHubRepoDirectory {
    param(
        [string]$RepoName = (Split-Path -Leaf (Get-Location))
    )
    
    $GitHubPath = "e:\OneDrive\Documents\GitHub"
    $RepoPath = Join-Path $GitHubPath $RepoName
    
    if (Test-Path $RepoPath) {
        Set-Location $RepoPath
        Write-Host "Auto-navigated to GitHub repo: " -NoNewline -ForegroundColor Green
        Write-Host $RepoPath -ForegroundColor Yellow
    } else {
        Write-Host "Repository not found: $RepoPath" -ForegroundColor Red
    }
}

# Alias for quick repo navigation
Set-Alias -Name "cdrepo" -Value Set-GitHubRepoDirectory

# Auto-detect if we're in a GitHub repo and ensure correct directory
if ((Get-Location).Path -like "*GitHub*") {
    $CurrentRepo = Split-Path -Leaf (Get-Location)
    $ExpectedPath = "e:\OneDrive\Documents\GitHub\$CurrentRepo"
    
    if ((Get-Location).Path -ne $ExpectedPath -and (Test-Path $ExpectedPath)) {
        Set-Location $ExpectedPath
        Write-Host "Auto-corrected to repo directory: " -NoNewline -ForegroundColor Cyan
        Write-Host $ExpectedPath -ForegroundColor Yellow
    }
}

Write-Host "GitHub Repo Helper Loaded - Use 'cdrepo <repo-name>' to quickly navigate" -ForegroundColor Magenta
