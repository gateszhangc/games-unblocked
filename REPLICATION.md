# FreezeNova Games Site Clone Workflow

This document explains how the project replicates the FreezeNova unblocked games site from `https://unblocked-games.s3.amazonaws.com/` and maintains game functionality. Follow these steps whenever you need to resync the clone or add new games.

## 1. Environment Setup
- Install dependencies:
  ```bash
  npm install
  ```
- The project uses Next.js with TypeScript and Tailwind CSS

## 2. Project Structure
```
├── public/                    # Static assets directory
│   ├── games/                # Game files directory
│   │   └── 2025/             # Year-based game organization
│   │       └── unity4/       # Unity WebGL games
│   │           └── dublix/   # Individual game folders
│   ├── media/                # Media assets (images, etc.)
│   └── assets/               # CSS, JS, and other static files
├── pages/                    # Next.js pages directory
├── scripts/                  # Utility scripts
└── dublix.html              # Individual game HTML files
```

## 3. Adding New Games

### Method A: Single Game HTML Files
1. Download the game HTML file to the project root:
   ```bash
   # Example: Download a game HTML file
   curl -o game-name.html https://unblocked-games.s3.amazonaws.com/game-name.html
   ```

2. Create the game directory structure:
   ```bash
   mkdir -p public/games/YEAR/ENGINE/game-name
   # Example: mkdir -p public/games/2025/unity4/newgame
   ```

3. Copy and rename the HTML file:
   ```bash
   cp game-name.html public/games/YEAR/ENGINE/game-name/index.html
   ```

4. Fix relative paths in the HTML file:
   ```powershell
   # Replace all relative paths with absolute paths
   (Get-Content public/games/YEAR/ENGINE/game-name/index.html) -replace 'href="\./', 'href="/' | Set-Content public/games/YEAR/ENGINE/game-name/index.html
   (Get-Content public/games/YEAR/ENGINE/game-name/index.html) -replace 'src="\./', 'src="/' | Set-Content public/games/YEAR/ENGINE/game-name/index.html
   (Get-Content public/games/YEAR/ENGINE/game-name/index.html) -replace 'url\(\"\.\/', 'url(\"/' | Set-Content public/games/YEAR/ENGINE/game-name/index.html
   (Get-Content public/games/YEAR/ENGINE/game-name/index.html) -replace "\"\.\/", "\"/" | Set-Content public/games/YEAR/ENGINE/game-name/index.html
   ```

### Method B: Full Site Sync
1. Fetch the main site HTML:
   ```powershell
   (Invoke-WebRequest -Uri https://unblocked-games.s3.amazonaws.com/ -UseBasicParsing).Content | Out-File index.html -Encoding utf8
   ```

2. Download static assets:
   ```bash
   node scripts/downloadAssets.js
   ```
   This downloads all referenced assets to the appropriate `public/` directories.

3. Check resource integrity:
   ```bash
   node scripts/checkResources.js
   ```

## 4. Game File Management

### Unity WebGL Games
Unity games typically follow this structure:
- `index.html` - Main game loader
- `Build/` directory - Game build files
- `TemplateData/` directory - Unity template files

### HTML5 Games
HTML5 games are usually self-contained in a single HTML file with embedded resources.

## 5. Path Resolution Rules

### Critical Path Updates
When moving HTML files to subdirectories, update these path patterns:

1. **CSS/JS Resources**: `./assets/` → `/assets/`
2. **Media Files**: `./media/` → `/media/`
3. **Game Assets**: `./Build/` → `/games/YEAR/ENGINE/game-name/Build/`
4. **CSS url()**: `url("./...")` → `url("/...")`
5. **JSON paths**: `"./..."` → `"/..."`

### Example Fix
```html
<!-- Before (relative paths) -->
<link href="./assets/css/style.css" rel="stylesheet">
<script src="./assets/js/scripts.min.js"></script>
<img src="./media/posts/727/game-image.webp">

<!-- After (absolute paths) -->
<link href="/assets/css/style.css" rel="stylesheet">
<script src="/assets/js/scripts.min.js"></script>
<img src="/media/posts/727/game-image.webp">
```

## 6. Development and Testing

### Development Server
```bash
npm run dev
```
The server runs on `http://localhost:3000`

### Game Access URLs
Games are accessible at:
```
http://localhost:3000/games/YEAR/ENGINE/game-name/index.html
```

Example:
```
http://localhost:3000/games/2025/unity4/dublix/index.html
```

### Build Verification
```bash
npm run build
npm run start
```

## 7. Troubleshooting

### Common Issues
1. **404 Errors for Resources**: Check if all relative paths have been converted to absolute paths
2. **Game Won't Load**: Verify game file structure is intact
3. **Missing Assets**: Run `node scripts/downloadAssets.js` to fetch missing resources
4. **Path Issues**: Use browser developer tools to check for failed resource requests

### Verification Steps
1. Open the game URL in browser
2. Check browser console for 404 errors
3. Verify all CSS and JS files load correctly
4. Test game functionality

## 8. Production Deployment

### Static Export (Optional)
For static hosting, you can generate a static build:
```bash
npm run build
```

### Environment Variables
Set these for production:
- `NODE_ENV=production`

## 9. Maintenance

### Regular Updates
- Periodically sync with the source site for new games and updates
- Check for broken links and missing resources
- Update game metadata and descriptions

### Backup Important Files
- Game HTML files
- Custom scripts and configurations
- Asset downloads

Repeat these steps whenever adding new games or updating existing ones. The key is ensuring all resource paths are correctly resolved when moving games to subdirectories.
