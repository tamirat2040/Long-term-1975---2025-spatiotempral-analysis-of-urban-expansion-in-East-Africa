# Provenance and scope

This public reproducibility package was assembled from the verified workspace materials below and released as `v1.0.0-r3.9` on 2026-11-18. The source repository is https://github.com/tamirat2040/East_Africa_urban_expansion and the versioned Zenodo archive is https://doi.org/10.5281/zenodo.24333717.

- Principal executed reproducibility source: `/home/sandbox/20261116_urban_expansion_in_4_eastafrican_cites_organized_2.ipynb`.
- Original source notebook retained in the workspace: `/home/sandbox/20261116_urban_expansion_in_4_eastafrican_cites.ipynb`.
- Exact captured R3.5 numerical output: `/home/sandbox/work/notebook_numeric_outputs/cell_73_numeric.txt`.
- Correlation robustness table: `/home/sandbox/work/corr_robust.csv`.
- Manuscript tables and prose used for R3.2 values: `/home/sandbox/work/live_after_caption_ms/doc_content.txt`.
- Response-letter commitments for R3.2, R3.4, and R3.9: `/home/sandbox/work/status_response_latest/doc_content.txt`.
- Supplied R3.4 long-form output: `/home/sandbox/r3_4_smod_class_transition_counts.csv`.
- Supplied R3.4 matrix output: `/home/sandbox/r3_4_smod_class_transition_counts_matrix.csv`.
- R3.4 notebook cell source extracted for audit: `/home/sandbox/work/r34_cell_79_source.py`.
- Six approved 600-dpi figure files: `/home/sandbox/figure_inputs/`.

The R3.2 sensitivity tables and R3.9 epoch/rate tables are derived tabular exports of values already present in the manuscript or captured notebook output. The R3.4 transition tables are direct copies of the supplied executed Colab outputs and were checked against each other: all 971 nonzero pairs agree exactly, with 251 explicit zero rows for focal-class pairs. The package does not bundle GHSL raster products; the processing-parameter file records their Earth Engine asset identifiers.

The notebook includes executable code for the four circular study-region definitions and the four largest 2025 SMOD class-30 patch extractions, and the corresponding ten GeoJSON geometry files are included under `boundaries/` and validated in `validation/r3_9_geometry_validation.json`. The package is publicly deposited in the GitHub repository and archived in Zenodo as version `v1.0.0-r3.9` with DOI https://doi.org/10.5281/zenodo.24333717; the all-versions concept DOI is https://doi.org/10.5281/zenodo.24333716.
