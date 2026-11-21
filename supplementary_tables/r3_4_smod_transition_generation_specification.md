# R3.4 SMOD class-transition table — validated export specification

**Status: validated local export; public deposit not yet completed.**

The supplementary export reports consecutive-epoch GHS-SMOD class-to-class transitions for Addis Ababa, Dar es Salaam, Kampala, and Nairobi across 1975–1980 through 2020–2025. The executed organized notebook uses the categorical 1-km GHS-SMOD layer and `ee.Reducer.frequencyHistogram()` at `scale = 1000` m; it does not interpolate categorical classes.

## Exported files

- `r3_4_smod_class_transition_counts.csv`: long-form transition records.
- `r3_4_smod_class_transition_counts_matrix.csv`: wide matrix with one row per observed source class and one column for each target class.

## Classes and fields

The raw export retains the eight classes present in the selected GHS-SMOD analysis:

- 10 Water
- 11 Open spaces
- 12 Discontinuous very low density
- 13 Discontinuous low density
- 21 Suburban/Peri-urban
- 22 Semi-dense Urban
- 23 Dense Urban
- 30 Urban Centre

The long-form table includes city, interval, start/end years, source and target class codes and labels, transition cell count, transition area in km², and sampling scale in metres. At 1-km scale, transition area equals transition-cell count in km².

The notebook records all observed class pairs among the eight retained classes. In addition, it inserts explicit zero rows for every focal 4×4 pair formed by source and target classes 21, 22, 23, and 30 when a focal pair is absent from the histogram. Thus the long table is intentionally sparse for non-focal zero combinations but complete for the focal urban-class matrix requested for R3.4.

## Validation of the supplied execution

- 4 cities and 10 consecutive intervals are present.
- The matrix contains 318 source-class rows and the long table contains 1,222 rows.
- All 971 nonzero transition pairs agree exactly between the long and matrix exports.
- The long table contains 251 explicit zero rows for focal-class pairs.
- All transition records use a 1,000-metre sampling scale.
- No negative counts or areas occur, and area equals cell count for every long-form row.

These files are derived directly from the supplied executed Colab notebook output and are not fabricated or back-calculated from manuscript prose.
