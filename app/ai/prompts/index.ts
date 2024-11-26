export const nov24Prompt = `Identify the optimal settings for the Ricoh GR III and Ricoh GR IIIx to precisely replicate the photographic filter and color scheme presented in the submitted photo. Use the provided color palette, color quantization, dominant color(s), edge detection, histogram, image statistics, and texture analysis details to guide your settings.

Provide details regarding additional adjustments that may be needed based on the environment the photos were taken in (e.g. photos were taken during day time, in low-light settings, etc.).

When generating Ricoh recipes for the GR III and GR IIIx, consider the following settings and their effects:

1. Effect: This setting determines the overall tone and style of the image. Options include:

   a) Standard: The default setting, providing a balanced, natural look with normal contrast and saturation.
   
   b) Vivid: Enhances color saturation and contrast for a more vibrant and punchy look.
   
   c) Monotone: Converts the image to black and white, allowing for a classic, timeless appearance.
   
   d) Soft Monotone: Creates a black and white image with reduced contrast and softer tones, ideal for a dreamy or nostalgic feel.
   
   e) Hard Monotone: Produces a high-contrast black and white image with deep blacks and bright whites, suitable for dramatic scenes.
   
   f) Hi-Contrast B&W: Generates an even more extreme high-contrast black and white image, emphasizing the difference between light and dark areas.
   
   g) Positive Film: Simulates the look of color positive film, typically resulting in rich colors and good contrast.
   
   h) Bleach Bypass: Mimics the film development technique of the same name, resulting in low saturation and high contrast for a gritty, metallic look.
   
   i) Retro: Simulates the appearance of aged photographs, typically with muted colors and slightly washed-out highlights.
   
   j) HDR Tone: Compresses the tonal range to simulate an HDR (High Dynamic Range) effect, bringing out details in both highlights and shadows.
   
   k) Cross Processing: Simulates the effect of processing film in chemicals intended for a different type of film, often resulting in unexpected color shifts and high contrast.
   
   When selecting an Effect, consider how it aligns with the mood and style of the image you're trying to emulate. Some effects, like Vivid or Positive Film, may be more suitable for bright, colorful scenes, while others like Monotone or Bleach Bypass might be better for creating a specific artistic look.

2. Saturation: Range: -4 to +4. Negative values decrease color intensity, while positive values increase it. 0 is neutral.

3. Hue: Range: -4 to +4. Negative values shift colors towards cooler tones (more blue/green), while positive values shift towards warmer tones (more red/yellow). 0 is neutral.

4. High/Low Key: Range: -4 to +4. Negative values darken the overall image, positive values brighten it. This affects the entire tonal range while maintaining contrast.

5. Contrast: Range: -4 to +4. Negative values reduce the difference between light and dark areas, positive values increase it. 0 is neutral.

6. Contrast (Highlight): Range: -4 to +4. Affects contrast in bright areas. Negative values reduce contrast in highlights, positive values increase it.

7. Contrast (Shadow): Range: -4 to +4. Affects contrast in dark areas. Negative values reduce contrast in shadows, positive values increase it.

8. Sharpness: Range: -4 to +4. Negative values soften the image, positive values increase edge definition. 0 is neutral.

9. Shading: Range: -4 to +4. Negative values darken image edges, positive values brighten them. 0 is neutral.

10. Clarity: Range: -4 to +4. Negative values soften overall detail, positive values enhance texture and local contrast. 0 is neutral.

11. Highlight Correction: Options: Auto, On, Off. Helps recover detail in bright areas. 'Auto' adjusts based on the scene, 'On' always applies correction, 'Off' disables it.

12. Shadow Correction: Options: Auto, Low, Medium, High, Off. Brightens dark areas. 'Auto' adjusts based on the scene, 'Low/Medium/High' apply increasing levels of correction, 'Off' disables it.

13. Peripheral Illumination Correction: Options: On, Off. 'On' reduces darkening at image corners due to lens properties, 'Off' leaves this uncorrected.

14. High-ISO Noise Reduction: Options: Auto, Low, Medium, High, Custom, Off. Reduces graininess in high ISO images. 'Auto' adjusts based on ISO, 'Low/Medium/High' apply increasing levels of reduction, 'Custom' allows per-ISO setting, 'Off' disables it.

15. White Balance: Options include Auto, Multi Auto, Daylight, Shade, Cloudy, various Fluorescent settings, Tungsten, CTE, Manual, and Color Temperature. Each option adjusts color balance for different lighting conditions.

16. WB Compensation: Two axes: Blue/Amber (B) and Green/Magenta (G). Range: -7 to +7 for each. Negative B values add blue, positive add amber. Negative G values add green, positive add magenta.

17. ISO: Range: 100 to 102400. Higher values increase light sensitivity but may introduce more noise. Suggest values based on lighting conditions.

18. Exposure Compensation: Range: -5 EV to +5 EV in 1/3 EV steps. Negative values darken the overall exposure, positive values brighten it. 0 is neutral.

When creating recipes, consider how these settings interact. For example, increasing contrast might require shadow/highlight corrections to maintain detail. Higher saturation might need hue adjustments for natural colors.
Also, factor in the lighting of the uploaded image. Daytime shots might need different white balance and exposure settings compared to low-light scenes. For low-light, consider recommending higher ISO or specific noise reduction settings.
Provide clear explanations for each setting in your recipe, detailing how it contributes to the overall look and why it was chosen based on the uploaded image.

## Example Recipe

Title: Kodak Slide Recipe
Description: Inspired by Kodak Ektachrome 100SW and Ektachrome 100GX color transparency film

- Effect: Vivid
- Saturation: +4
- Hue: -2
- High/Low Key: +1
- Contrast: +4
- Contrast (Highlight): -4
- Contrast (Shadow): -4
- Sharpness: +1
- Shading: 0
- Clarity: +2
- Highlight Correction: On
- Shadow Correction: Low
- Peripheral Illumination Correction: On
- High-ISO Noise Reduction: Off
- White Balance: Shade
- WB Compensation: B:7 G:2
- ISO: up to ISO 6400
- Exposure Compensation: 0 to +2/3 (typically)

When generating a recipe, provide a similar format with explanations for each setting choice.`

export const legacyPrompt = `Identify the optimal settings for the Ricoh GR III and Ricoh GR IIIx to precisely replicate the photographic filter and color scheme presented in the submitted photo. Specific settings to include are:

- Image Control/Effect (valid options: Standard, Vivid, Monotone, Soft Monotone, Hard Monotone, Hi-Contrast B&W, Positive Film, Bleach Bypass, Retro, HDR Tone, Cross Processing)
- Saturation (valid options: -4 to +4, non-monotone modes only)
- Hue (valid options: -4 to +4, non-monotone modes only)
- High/Low Key (valid options: -4 to +4)
- Contrast (valid options: -4 to +4)
- Contrast - Highlight (valid options: -4 to +4)
- Contrast - Shadow (valid options: -4 to +4)
- Sharpness (valid options: -4 to +4)
- Toning (valid options: -4 to +4)
- Shading (valid options: -4 to +4)
- Clarity (valid options: -4 to +4)
- Highlight Correction (valid options: Auto, On, Off)
- Shadow Correction (valid options: Auto, Low, Medium, High, Off)
- Peripheral Illumination Correction (valid options: On, Off)
- Noise Reduction (valid options: Auto, Low, Medium, High, Custom, Off)
- White Balance: (valid options: Auto White Balance, Multi Auto White Balance, Daylight, Shade, Cloudy, Fl. - Daylight Color, Fl. - Daylight White, Fl. - Cool White, Fl. - Warm White, Tungsten, CTE, Manual White Balance, Color Temperature; for Color Temperature, valid options are 2500K to 10000K in 10K increments)
- White Balance Compensation A/B (valid options: -14 to +14, e.g. A1 or B-2)
- White Balance Compensation G/M (valid options: -14 to +14, e.g. G3 or M-4)`
