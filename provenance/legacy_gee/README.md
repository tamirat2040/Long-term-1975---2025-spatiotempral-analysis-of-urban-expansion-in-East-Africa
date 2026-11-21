# Legacy GEE provenance

`20251222_SMOD_east_africa_legacy.txt` is the pre-Colab Google Earth Engine source supplied for R3.9 provenance. It records the original city centers, buffer radii, GHSL asset references, epochs, and zonal-statistics setup.

The repository interprets `ee.Geometry.Point([longitude, latitude])` using the Google Earth Engine default as WGS 84 geographic coordinates (EPSG:4326). The source file does not explicitly declare a CRS.

The legacy code uses `data.point.buffer(data.radius).bounds()`. Consequently, its displayed ROI is a bounding rectangle around the buffered point; it is not the final exact circular analytical ROI and is not a substitute for the missing final boundary geometry exports.
