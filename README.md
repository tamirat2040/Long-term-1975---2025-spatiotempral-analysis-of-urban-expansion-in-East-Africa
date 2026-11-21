# East Africa urban expansion reproducibility package — v1.0.0-r3.9

**Prepared and published:** 2026-11-18  
**Public repository:** https://github.com/tamirat2040/East_Africa_urban_expansion  
**GitHub release:** https://github.com/tamirat2040/East_Africa_urban_expansion/releases/tag/v1.0.0-r3.9  
**Zenodo version DOI:** https://doi.org/10.5281/zenodo.24333717  
**Zenodo concept DOI:** https://doi.org/10.5281/zenodo.24333716  
**Deposit status:** publicly deposited and DOI archived

## What is covered

### R3.2 — boundaries and robustness

Included in the public tagged release:

- alternative spatial-extent sensitivity table;
- settlement-mask sensitivity table;
- indicator-definition sensitivity table;
- Monte Carlo input-noise summary table; and
- full correlation-robustness CSV, including bootstrap intervals, Spearman coefficients, first-difference results, common-extent results, fixed-2020-mask results, and level-correlation diagnostics.

### R3.4 — SMOD resolution and class handling

Included and validated locally:

- executed organized Colab notebook with the raw class-to-class transition export cell;
- long-form `r3_4_smod_class_transition_counts.csv`;
- wide `r3_4_smod_class_transition_counts_matrix.csv`; and
- validated generation specification documenting the 1-km scale, eight retained GHS-SMOD classes, focal 4×4 zero-row completion, and exact long/matrix reconciliation.

The supplied execution contains 4 cities and 10 consecutive intervals. The long table has 1,222 rows, the matrix has 318 source-class rows, and all 971 nonzero transition pairs agree exactly between both exports. The raw export retains classes 10, 11, 12, 13, 21, 22, 23, and 30; explicit zero rows are added for absent focal pairs among classes 21, 22, 23, and 30.

### R3.9 — reproducibility

Included in the public tagged release:

- the executed organized analytical notebook;
- processing parameters and Earth Engine asset identifiers;
- epoch-level built-up area, population, and density table;
- interval-level LCR, PGR, LCRPGR, and PGR-minus-LCR table;
- observed-only and observed-plus-projected Table 4 exports;
- largest-built-up-city-by-epoch output;
- six approved 600-dpi figure files;
- the four exact analytical circular ROI GeoJSON files;
- the four largest contiguous 2025 SMOD class-30 patch GeoJSON files;
- combined four-city GeoJSON backups for both geometry classes;
- the modified GEE geometry-export script;
- the original GEE source retained for provenance; and
- machine-readable geometry and package validation files.

The final geometry set is complete. The individual exports cover all four cities, while the combined files provide convenient cross-city backups:

- four exact circular analytical ROIs created with `data.point.buffer(data.radius)`;
- four largest contiguous 2025 SMOD class-30 geometries within those ROIs;
- one combined ROI GeoJSON; and
- one combined class-30 patch GeoJSON.

The modified GEE script is retained at `provenance/legacy_gee/20251222_SMOD_east_africa_r3_9_geometry_exports.js`. It preserves the legacy city centers and radii, exports the exact circular ROIs, vectorizes class-30 regions at 1,000 m using eight-connected connectivity, and exports the largest patch for each city. The original legacy file remains at `provenance/legacy_gee/20251222_SMOD_east_africa_legacy.txt` for provenance only.

## Licensing and citation metadata

Code and scripts are released under the MIT License in `LICENSE-CODE`. Derived tables, figures, GeoJSON exports, notebook narrative text, and documentation are released under CC BY 4.0 as described in `LICENSE-DATA.md`. Upstream GHSL and GHS-SMOD assets retain their own terms.

`CITATION.cff` provides the author list and versioned citation metadata. Cite the versioned release with DOI [10.5281/zenodo.24333717](https://doi.org/10.5281/zenodo.24333717); the concept DOI for all versions is [10.5281/zenodo.24333716](https://doi.org/10.5281/zenodo.24333716). The public source repository and tagged release are available at [GitHub](https://github.com/tamirat2040/East_Africa_urban_expansion).

## Important interpretation rule

The 1975–2020 series contains nine observed intervals. The 2020–2025 interval is projected and is kept explicitly separate in the supplied tables. The full 1975–2025 series contains ten intervals.

## Local validation status

The repository package was validated after geometry integration and before public release. Validation includes manifest-path checks, geometry-validation status, SHA-256 checksums, ZIP integrity, and exact archive-member comparison. The public GitHub repository is archived through Zenodo at version DOI [10.5281/zenodo.24333717](https://doi.org/10.5281/zenodo.24333717), and the released archive SHA-256 is `f695799b62582ac478ce123cf5905c953db6992bc8b945d011e8d71e39a48e09`.

## Public deposit record

1. Public GitHub repository: https://github.com/tamirat2040/East_Africa_urban_expansion
2. Tagged release: `v1.0.0-r3.9`
3. GitHub release archive: https://github.com/tamirat2040/East_Africa_urban_expansion/releases/tag/v1.0.0-r3.9
4. Zenodo version DOI: https://doi.org/10.5281/zenodo.24333717
5. Zenodo concept DOI: https://doi.org/10.5281/zenodo.24333716
6. Archive SHA-256: `f695799b62582ac478ce123cf5905c953db6992bc8b945d011e8d71e39a48e09`

The manuscript and response letter should cite the version DOI and the public GitHub repository after their tracked public-deposit updates are completed.
