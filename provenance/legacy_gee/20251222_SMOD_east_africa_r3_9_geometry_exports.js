/*******************************************************************************
 * R3.9 GEOMETRY EXPORT VERSION
 * Purpose:
 *   1. Preserve the original city centers and radii from the legacy GEE script.
 *   2. Export the four analytical circular ROI geometries.
 *   3. Identify and export the largest contiguous 2025 SMOD class-30 geometry
 *      within each analytical circular ROI.
 *
 * Data source:
 *   JRC/GHSL/P2023A/GHS_SMOD_V2-0
 *
 * Coordinate interpretation:
 *   The source defines ee.Geometry.Point([longitude, latitude]) and does not
 *   declare a CRS explicitly. The repository records the Google Earth Engine
 *   default interpretation as WGS 84 geographic coordinates / EPSG:4326.
 *
 * Export format:
 *   GeoJSON tables. Each exported feature includes city, center, radius,
 *   source epoch, SMOD class, asset, and scale metadata.
 *
 * Workflow:
 *   1. Paste this complete script into the Google Earth Engine Code Editor.
 *   2. Click Run once.
 *   3. Open the Tasks tab.
 *   4. Run the ten table-export tasks created by this script.
 *   5. Download the resulting GeoJSON files from Google Drive.
 ******************************************************************************/

var smodAsset = 'JRC/GHSL/P2023A/GHS_SMOD_V2-0';
var smodCol = ee.ImageCollection(smodAsset);
var years = ['1975', '1980', '1985', '1990', '1995', '2000', '2005', '2010', '2015', '2020', '2025'];
var exportFolder = 'R3_9_geometry_exports';
var exportScale = 1000;
var targetEpoch = 2025;
var targetClass = 30;

// These centers and radii are retained exactly from the supplied legacy source.
var cityData = {
  'Addis Ababa':   {point: ee.Geometry.Point([38.7578, 9.0090]), radius: 40000},
  'Nairobi':       {point: ee.Geometry.Point([36.8219, -1.2921]), radius: 60000},
  'Dar es Salaam': {point: ee.Geometry.Point([39.2083, -6.7924]), radius: 50000},
  'Kampala':       {point: ee.Geometry.Point([32.5825, 0.3476]), radius: 80000}
};

var cityNames = Object.keys(cityData);
var citySlugs = {
  'Addis Ababa': 'Addis_Ababa',
  'Dar es Salaam': 'Dar_es_Salaam',
  'Kampala': 'Kampala',
  'Nairobi': 'Nairobi'
};

var crsInterpretation = 'WGS 84 geographic coordinates / EPSG:4326 (GEE default; source has no explicit CRS declaration)';

function roiForCity(cityKey) {
  // IMPORTANT: this is the exact circular analytical ROI.
  // Do not replace it with .bounds(), which produces a bounding rectangle.
  return cityData[cityKey].point.buffer(cityData[cityKey].radius);
}

function roiFeatureForCity(cityKey) {
  var data = cityData[cityKey];
  var roi = roiForCity(cityKey);
  var coords = data.point.coordinates();
  return ee.Feature(roi, {
    city: cityKey,
    geometry_role: 'analytical_circular_roi',
    center_lon: coords.get(0),
    center_lat: coords.get(1),
    radius_m: data.radius,
    crs_interpretation: crsInterpretation,
    source_file: '20251222_SMOD_east_africa_legacy.txt',
    source_asset: smodAsset,
    export_scale_m: exportScale
  });
}

// -----------------------------------------------------------------------------
// 1. Export the four analytical circular ROIs
// -----------------------------------------------------------------------------
var roiFeatures = cityNames.map(function(cityKey) {
  return roiFeatureForCity(cityKey);
});
var allRois = ee.FeatureCollection(roiFeatures);

Export.table.toDrive({
  collection: allRois,
  description: 'R3_9_analytical_circular_ROIs_all_cities',
  folder: exportFolder,
  fileNamePrefix: 'R3_9_analytical_circular_ROIs_all_cities',
  fileFormat: 'GeoJSON'
});

cityNames.forEach(function(cityKey) {
  var slug = citySlugs[cityKey];
  Export.table.toDrive({
    collection: ee.FeatureCollection([roiFeatureForCity(cityKey)]),
    description: 'R3_9_ROI_' + slug,
    folder: exportFolder,
    fileNamePrefix: 'R3_9_ROI_' + slug,
    fileFormat: 'GeoJSON'
  });
});

// -----------------------------------------------------------------------------
// 2. Identify and export the largest contiguous 2025 class-30 geometry
// -----------------------------------------------------------------------------
var smod2025 = smodCol
  .filter(ee.Filter.calendarRange(targetEpoch, targetEpoch, 'year'))
  .first();

print('SMOD 2025 image used for class-30 exports:', smod2025);

function largestClass30FeatureCollection(cityKey) {
  var roi = roiForCity(cityKey);
  var data = cityData[cityKey];
  var coords = data.point.coordinates();

  // Mask to the target SMOD class within the exact circular analytical ROI.
  var class30 = smod2025.eq(targetClass).selfMask().clip(roi).rename('smod_class');

  // Vectorize connected class-30 regions. eightConnected=true treats diagonal
  // pixel contact as connected, matching the contiguous-patch interpretation.
  var patches = class30.reduceToVectors({
    geometry: roi,
    scale: exportScale,
    geometryType: 'polygon',
    eightConnected: true,
    labelProperty: 'smod_class',
    reducer: ee.Reducer.countEvery(),
    maxPixels: 1e13,
    bestEffort: false,
    tileScale: 4
  });

  // Rank candidate polygons by geodesic area and retain only the largest one.
  var ranked = patches.map(function(feature) {
    return feature.set({
      area_m2: feature.geometry().area(1),
      perimeter_m: feature.geometry().perimeter(1)
    });
  }).sort('area_m2', false);

  var largest = ranked.limit(1).map(function(feature) {
    return feature.set({
      city: cityKey,
      geometry_role: 'largest_contiguous_smod_class30_patch',
      source_epoch: targetEpoch,
      smod_class: targetClass,
      center_lon: coords.get(0),
      center_lat: coords.get(1),
      roi_radius_m: data.radius,
      crs_interpretation: crsInterpretation,
      source_file: '20251222_SMOD_east_africa_legacy.txt',
      source_asset: smodAsset,
      export_scale_m: exportScale,
      connectivity: 'eight-connected',
      rank: 1
    });
  });

  print(cityKey + ' class-30 candidate patch count:', patches.size());
  print(cityKey + ' largest class-30 patch:', largest);
  return largest;
}

var patchCollections = cityNames.map(function(cityKey) {
  return largestClass30FeatureCollection(cityKey);
});
var allLargestPatches = ee.FeatureCollection(patchCollections).flatten();

Export.table.toDrive({
  collection: allLargestPatches,
  description: 'R3_9_largest_SMOD_class30_patches_2025_all_cities',
  folder: exportFolder,
  fileNamePrefix: 'R3_9_largest_SMOD_class30_patches_2025_all_cities',
  fileFormat: 'GeoJSON'
});

cityNames.forEach(function(cityKey, index) {
  var slug = citySlugs[cityKey];
  Export.table.toDrive({
    collection: patchCollections[index],
    description: 'R3_9_largest_SMOD_class30_patch_2025_' + slug,
    folder: exportFolder,
    fileNamePrefix: 'R3_9_largest_SMOD_class30_patch_2025_' + slug,
    fileFormat: 'GeoJSON'
  });
});

// -----------------------------------------------------------------------------
// 3. Optional visual quality-control map
// -----------------------------------------------------------------------------
Map.centerObject(ee.FeatureCollection(roiFeatures), 5);
Map.addLayer(allRois.style({color: '00FFFF', fillColor: '00000000', width: 2}), {}, 'Analytical circular ROIs');
Map.addLayer(smod2025.eq(targetClass).selfMask(), {palette: ['FF0000']}, 'SMOD class 30, 2025', false);
Map.addLayer(allLargestPatches.style({color: 'FFFF00', fillColor: '00000000', width: 3}), {}, 'Largest class-30 patches, 2025');

// -----------------------------------------------------------------------------
// 4. Original interactive viewer, retained with the exact circular ROI
// -----------------------------------------------------------------------------
var panel = ui.Panel({style: {width: '350px', position: 'top-left'}});
panel.add(ui.Label('Urban SMOD Analysis (21-30)', {fontWeight: 'bold', fontSize: '18px'}));

var citySelect = ui.Select({items: cityNames, placeholder: 'Select City'});
var yearSelect = ui.Select({items: years, placeholder: 'Select Year'});
panel.add(ui.Label('1. Choose City & Year:')).add(citySelect).add(yearSelect);

var statsContainer = ui.Panel();
panel.add(statsContainer);

var legend = ui.Panel({style: {position: 'bottom-right', padding: '8px'}});
legend.add(ui.Label('Urban Legend', {fontWeight: 'bold'}));
var labels = ['21:Suburban', '22:Semi-Dense', '23:Dense Urban', '30:Urban Centre'];
var cols = ['ffff00', 'a87000', '732600', 'ff0000'];
labels.forEach(function(label, i) {
  var row = ui.Panel({layout: ui.Panel.Layout.Flow('horizontal')});
  row.add(ui.Label('', {backgroundColor: '#' + cols[i], padding: '7px', margin: '0 4px 2px 0'}));
  row.add(ui.Label(label));
  legend.add(row);
});

Map.add(panel);
Map.add(legend);

function updateView() {
  var cityKey = citySelect.getValue();
  var year = yearSelect.getValue();
  if (!cityKey || !year) return;

  var roi = roiForCity(cityKey);
  var img = smodCol
    .filter(ee.Filter.calendarRange(parseInt(year, 10), parseInt(year, 10), 'year'))
    .first();
  var urbanMask = img.gte(21).and(img.lte(30));
  var urbanImg = img.updateMask(urbanMask).clip(roi);

  Map.addLayer(urbanImg, {
    min: 21,
    max: 30,
    palette: ['ffff00', 'a87000', '732600', 'ff0000']
  }, 'Urban SMOD ' + cityKey + ' ' + year, true);
  Map.addLayer(ee.FeatureCollection([ee.Feature(roi)]).style({color: '00FFFF', fillColor: '00000000', width: 3}), {}, 'Selected analytical circle', true);
  Map.centerObject(roi, 9);

  statsContainer.clear();
  statsContainer.add(ui.Label('Calculating urban stats...'));

  var stats = ee.Image.pixelArea().addBands(img).reduceRegion({
    reducer: ee.Reducer.sum().group(1, 'class'),
    geometry: roi,
    scale: exportScale,
    maxPixels: 1e13
  });

  var groups = ee.List(stats.get('groups'));
  groups.evaluate(function(list) {
    statsContainer.clear();
    statsContainer.add(ui.Label(cityKey + ' (' + year + ') Urban Results:', {fontWeight: 'bold'}));
    (list || []).forEach(function(group) {
      if (group.class >= 21 && group.class <= 30) {
        statsContainer.add(ui.Label('Class ' + group.class + ': ' + (group.sum / 1e6).toFixed(2) + ' km²'));
      }
    });
  });
}

citySelect.onChange(updateView);
yearSelect.onChange(updateView);
