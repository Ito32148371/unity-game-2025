# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Unity Mini-Games Gallery project - a collection of small Unity games showcased in a single application. The repository is currently empty and ready for initial Unity project setup.

## Setup Commands

Since this is a fresh Unity project, you'll need to:

1. **Initialize Unity Project**: Create a new Unity project in this directory or import an existing Unity project structure
2. **Unity Version**: Check the project uses a consistent Unity version (typically specified in ProjectVersion.txt)
3. **Package Manager**: Unity packages are managed through Packages/manifest.json

## Expected Project Structure

Once initialized, a typical Unity mini-games gallery project should have:

```
Assets/
├── Scripts/
│   ├── GameManager/          # Core game management systems
│   ├── UI/                   # User interface controllers
│   ├── Games/                # Individual mini-game implementations
│   │   ├── Game1/
│   │   ├── Game2/
│   │   └── ...
│   └── Shared/               # Shared utilities and components
├── Scenes/
│   ├── MainMenu.unity        # Gallery main menu
│   ├── GameSelection.unity   # Game selection interface
│   └── Games/                # Individual game scenes
├── Prefabs/                  # Reusable game objects
├── Materials/                # Visual materials
├── Textures/                 # Image assets
└── Audio/                    # Sound effects and music

Packages/                     # Unity package dependencies
ProjectSettings/              # Unity project configuration
```

## Common Development Commands

**Unity Editor Operations:**
- Open project in Unity Editor: Launch Unity Hub and open this project folder
- Build project: File > Build Settings > Build (or Build and Run)
- Run tests: Window > General > Test Runner

**Version Control:**
- Unity generates .meta files for all assets - these should be committed
- Large binary assets should use Git LFS if the repository grows significantly

## Architecture Guidelines

**Game Manager Pattern:**
- Implement a central GameManager to handle game state transitions
- Use a consistent interface for individual mini-games
- Manage shared resources (scoring, UI, audio) centrally

**Mini-Game Structure:**
- Each mini-game should inherit from a base Game class
- Implement consistent start/pause/end game methods
- Use ScriptableObjects for game configuration and settings

**UI Framework:**
- Implement a consistent UI system for navigation between games
- Use Unity's UI system (Canvas/Panel hierarchy)
- Consider responsive design for different screen sizes

**Asset Organization:**
- Group assets by feature/game rather than by type
- Use addressable assets for dynamic loading if performance requires
- Maintain consistent naming conventions across all assets

## Testing

- Use Unity Test Framework for unit tests (Tests/ directory)
- Test individual game logic separately from Unity-specific components
- Consider automated build testing for multiple platforms if targeting beyond PC

## Build Configuration

- Configure build settings for target platforms in ProjectSettings/
- Manage different build configurations through Build Settings window
- Consider creating custom build scripts for automation if needed