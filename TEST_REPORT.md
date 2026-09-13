# Test Report

## Automated validation
`npm test` → expected `GARDEN_TESTS_OK 15`.

`node --check app.js` and `node --check logic.js` must exit 0.

## Manual responsive targets
- 360 px mobile
- 768 px tablet
- 1280 px desktop

## Requirement coverage
- Shape matching: circle / square / triangle
- One-property sorting by shape or colour
- Tap alternative for sorting
- Count 1–3 sequentially + collection match
- Spoken prompts only after user gesture
- Mute + visual equivalents
- Large controls >=64 CSS px
- Gentle wrong cue + unlimited retry
- Visible keyboard focus
- Non-colour-only interaction
- Reduced-motion support
- No accounts / analytics / tracking / chat / uploads / PII / payments
