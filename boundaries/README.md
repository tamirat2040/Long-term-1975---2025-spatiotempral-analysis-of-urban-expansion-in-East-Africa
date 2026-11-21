# Boundary geometries — R3.9 exports complete

The final R3.9 geometry exports are included in this directory. The organized analysis uses exact circular buffers around the four city centers and radii:

- Addis Ababa: longitude 38.7578, latitude 9.0090; radius 40 km.
- Dar es Salaam: longitude 39.2083, latitude -6.7924; radius 50 km.
- Kampala: longitude 32.5825, latitude 0.3476; radius 80 km.
- Nairobi: longitude 36.8219, latitude -1.2921; radius 60 km.

The repository records the Google Earth Engine default coordinate interpretation as WGS 84 geographic coordinates / EPSG:4326. The legacy source does not itself declare a CRS; this is therefore an explicit repository metadata interpretation.

## Included geometry classes

### Analytical circular ROIs

The four individual city-level files are:

- `R3_9_ROI_Addis_Ababa.geojson`
- `R3_9_ROI_Dar_es_Salaam.geojson`
- `R3_9_ROI_Kampala.geojson`
- `R3_9_ROI_Nairobi.geojson`

The combined backup is `R3_9_analytical_circular_ROIs_all_cities.geojson`.

These geometries represent `data.point.buffer(data.radius)` and are the exact circular analytical regions. They must not be replaced by the legacy display construction `data.point.buffer(data.radius).bounds()`, which produces a bounding rectangle.

### Largest 2025 SMOD class-30 patches

The four individual city-level files are:

- `R3_9_largest_SMOD_class30_patch_2025_Addis_Ababa.geojson`
- `R3_9_largest_SMOD_class30_patch_2025_Dar_es_Salaam.geojson`
- `R3_9_largest_SMOD_class30_patch_2025_Kampala.geojson`
- `R3_9_largest_SMOD_class30_patch_2025_Nairobi.geojson`

The combined backup is `R3_9_largest_SMOD_class30_patches_2025_all_cities.geojson`.

Each city-level patch file contains the largest contiguous SMOD class-30 polygon within the corresponding exact circular ROI, derived from the 2025 image in `JRC/GHSL/P2023A/GHS_SMOD_V2-0`. Connected regions were vectorized at the 1,000 m export scale using eight-connected connectivity and ranked by geometry area.

## Provenance and validation

The source export was the modified legacy GEE script used to generate the R3.9 geometry outputs. Each feature stores city, center, radius, epoch, SMOD class, source asset, scale, connectivity, area, perimeter, and coordinate-system interpretation properties.

The original legacy GEE source remains at `../provenance/legacy_gee/20251222_SMOD_east_africa_legacy.txt` for provenance. It is not used as a substitute for these final geometry exports.

The supplied archive contained ten GeoJSON files. Validation confirmed:

- four individual ROI files, each with one Polygon feature;
- four individual class-30 patch files, each with one positive-area Polygon or MultiPolygon feature;
- one combined ROI file with four features; and
- one combined class-30 patch file with four features.
