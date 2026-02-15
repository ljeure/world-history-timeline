const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const TARGET_DIR = path.join(__dirname, '..', 'historical-basemaps');
const GEOJSON_DIR = path.join(TARGET_DIR, 'geojson');

if (fs.existsSync(GEOJSON_DIR) && fs.readdirSync(GEOJSON_DIR).length > 10) {
    console.log('GeoJSON data already present, skipping download.');
    process.exit(0);
}

console.log('Downloading historical basemap GeoJSON data...');

// Shallow clone only the geojson directory using sparse checkout
const REPO_URL = 'https://github.com/aourednik/historical-basemaps.git';

try {
    // Clean up any partial clone
    if (fs.existsSync(TARGET_DIR)) {
        execSync(`rm -rf "${TARGET_DIR}"`, { stdio: 'inherit' });
    }

    execSync(`git clone --depth 1 --filter=blob:none --sparse "${REPO_URL}" "${TARGET_DIR}"`, {
        stdio: 'inherit'
    });
    execSync('git sparse-checkout set geojson', {
        cwd: TARGET_DIR,
        stdio: 'inherit'
    });

    const files = fs.readdirSync(GEOJSON_DIR).filter(f => f.endsWith('.geojson'));
    console.log(`Downloaded ${files.length} GeoJSON snapshots.`);
} catch (err) {
    console.error('Failed to download GeoJSON data:', err.message);
    process.exit(1);
}
