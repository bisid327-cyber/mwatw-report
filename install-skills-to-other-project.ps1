<#
.SYNOPSIS
    Installs and syncs the Antigravity Master Skills Suite (UI/UX + Coding) to any target project.

.DESCRIPTION
    Copies or links all 9 installed skills and modern design rules into any project's .agents directory.

.PARAMETER TargetPath
    The absolute or relative path to the destination project folder.

.PARAMETER Mode
    'Copy' (default) copies all skills and rules.
    'Link' creates Windows Directory Junctions (zero-copy, auto-updating).

.EXAMPLE
    .\install-skills-to-other-project.ps1 -TargetPath "C:\Projects\my-new-app"
    .\install-skills-to-other-project.ps1 -TargetPath "C:\Projects\my-new-app" -Mode Link
#>

param(
    [Parameter(Mandatory=$true, Position=0)]
    [string]$TargetPath,

    [Parameter(Mandatory=$false)]
    [ValidateSet('Copy', 'Link')]
    [string]$Mode = 'Copy'
)

$sourceAgentsDir = Join-Path $PSScriptRoot ".agents"
if (-not (Test-Path $sourceAgentsDir)) {
    Write-Error "Source .agents directory not found at $sourceAgentsDir"
    exit 1
}

# Resolve target path
if (-not [System.IO.Path]::IsPathRooted($TargetPath)) {
    $resolvedTarget = [System.IO.Path]::GetFullPath((Join-Path (Get-Location) $TargetPath))
} else {
    $resolvedTarget = [System.IO.Path]::GetFullPath($TargetPath)
}

if (-not (Test-Path $resolvedTarget)) {
    New-Item -ItemType Directory -Path $resolvedTarget -Force | Out-Null
}

$targetAgents = Join-Path $resolvedTarget ".agents"
$targetSkills = Join-Path $targetAgents "skills"
$targetRules  = Join-Path $targetAgents "rules"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " Installing Antigravity Master Skills Suite" -ForegroundColor Cyan
Write-Host " Source: $sourceAgentsDir" -ForegroundColor Gray
Write-Host " Target: $resolvedTarget" -ForegroundColor Gray
Write-Host " Mode:   $Mode" -ForegroundColor Gray
Write-Host "==========================================================" -ForegroundColor Cyan

if ($Mode -eq 'Copy') {
    # Ensure destination directories exist
    New-Item -ItemType Directory -Path $targetSkills -Force | Out-Null
    New-Item -ItemType Directory -Path $targetRules -Force | Out-Null

    # Copy all skills
    $sourceSkills = Join-Path $sourceAgentsDir "skills"
    Copy-Item -Path "$sourceSkills\*" -Destination $targetSkills -Recurse -Force
    Write-Host "✓ Installed 9 skills to $targetSkills" -ForegroundColor Green

    # Copy rules
    $sourceRules = Join-Path $sourceAgentsDir "rules"
    if (Test-Path $sourceRules) {
        Copy-Item -Path "$sourceRules\*" -Destination $targetRules -Recurse -Force
        Write-Host "✓ Installed design & engineering rules to $targetRules" -ForegroundColor Green
    }

    # Optionally copy or update GEMINI.md in the target project if not present
    $targetGemini = Join-Path $resolvedTarget "GEMINI.md"
    if (-not (Test-Path $targetGemini)) {
        Copy-Item -Path (Join-Path $PSScriptRoot "GEMINI.md") -Destination $targetGemini -Force
        Write-Host "✓ Created GEMINI.md index in target project" -ForegroundColor Green
    }
}
elseif ($Mode -eq 'Link') {
    # Directory Junction
    New-Item -ItemType Directory -Path $targetAgents -Force | Out-Null
    
    if (Test-Path $targetSkills) {
        Remove-Item -Path $targetSkills -Recurse -Force
    }
    
    $sourceSkills = Join-Path $sourceAgentsDir "skills"
    cmd /c "mklink /J `"$targetSkills`" `"$sourceSkills`"" | Out-Null
    Write-Host "✓ Created live Junction link for skills: $targetSkills -> $sourceSkills" -ForegroundColor Green

    # Copy rules & index
    $sourceRules = Join-Path $sourceAgentsDir "rules"
    if (Test-Path $sourceRules) {
        New-Item -ItemType Directory -Path $targetRules -Force | Out-Null
        Copy-Item -Path "$sourceRules\*" -Destination $targetRules -Recurse -Force
    }
    $targetGemini = Join-Path $resolvedTarget "GEMINI.md"
    if (-not (Test-Path $targetGemini)) {
        Copy-Item -Path (Join-Path $PSScriptRoot "GEMINI.md") -Destination $targetGemini -Force
    }
}

Write-Host "`nAll 9 Design and Coding Skills successfully activated in target project!" -ForegroundColor Green
