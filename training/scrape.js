const puppeteer = require("puppeteer");
const fs = require("fs");

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const ritchiesRecipes = 'https://ricohrecipes.com/ricoh-gr-iii-recipes/';
const lukeTaylorRecipes = 'https://www.lukeptaylor.com/ricoh-film-recipes';

async function scrapeRitchiesRecipes(url = ritchiesRecipes) {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.goto(url, {
        waitUntil: "domcontentloaded",
    }); 

    const trainingObjects = [];

    const collectionLinks = await page.evaluate(() => {
        const anchors = Array.from(document.querySelectorAll('.has-normal-font-size a'), a => a.href);
        return anchors.slice(1);
    });

    for (const link of collectionLinks) {
        await page.goto(link, {
            waitUntil: "domcontentloaded",
        });

        const collectionData = await page.$eval('.entry-content', (collectionContentContainer) => {
            const data = [];
            const photoGridDivs = Array.from(collectionContentContainer.querySelectorAll(".wp-block-jetpack-layout-grid.alignfull"));
            if (!photoGridDivs) {
                throw new Error(`No photo grid divs for collection at ${link}`);
            }

            for (let i = 0; i < photoGridDivs.length; i += 2) {
                const firstGalleryDiv = photoGridDivs[i];
                const title = firstGalleryDiv.querySelector("h5.wp-block-heading");
                if (!title) {
                    throw new Error(`No title for gallery at ${collectionHref}`);
                }

                const folderName = title.innerText;
                const folderPath = `images/${folderName}`;
                
                const secondGalleryDiv = photoGridDivs[i + 1];
    
                const pElements = [];
                let elem = firstGalleryDiv.nextElementSibling;
                while (elem !== secondGalleryDiv) {
                    if (elem.tagName === 'P') {
                        pElements.push(elem);
                    }
                    elem = elem.nextElementSibling;
                }
    
                const recipe = pElements[1].innerText;
                const additionalDetails = pElements[2].innerText;
    
                const firstSetOfPhotos = Array.from(firstGalleryDiv.querySelectorAll("img"));
                const secondSetOfPhotos = Array.from(secondGalleryDiv.querySelectorAll("img"));
                const allPhotos = firstSetOfPhotos.concat(secondSetOfPhotos);
    
                const imageLinks = allPhotos.map((photo) => photo.src);

                data.push({
                    folderPath,
                    recipe,
                    additionalDetails,
                    imageLinks,
                });
            }

            return data;
        });

        for (const recipeData of collectionData) {
            const { folderPath, recipe, additionalDetails, imageLinks } = recipeData;
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath, { recursive: true });
            }

            imageLinks.forEach(async (imgSrc, index) => {
                const response = await fetch(imgSrc);
                const arrayBuffer = await response.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                const imgPath = `${folderPath}/${index}.jpg`;
                fs.writeFile(imgPath, buffer, () => {
                    console.log(`Saved ${imgPath}`);
                });
                const trainingObject = {
                    id: imgPath,
                    image: imgPath,
                    conversations: [
                        {
                            from: "human",
                            value: "<image>\nIdentify the optimal settings for the Ricoh GR III and Ricoh GR IIIx to precisely replicate the photographic filter and color scheme presented in the submitted photo. Specific settings to include are:\n- Image Control/Effect (valid options: Standard, Vivid, Monotone, Soft Monotone, Hard Monotone, Hi-Contrast B&W, Positive Film, Bleach Bypass, Retro, HDR Tone, Cross Processing)\n- Saturation (valid options: -4 to +4, non-monotone modes only)\n- Hue (valid options: -4 to +4, non-monotone modes only)\n- High/Low Key (valid options: -4 to +4)\n- Contrast (valid options: -4 to +4)\n- Contrast - Highlight (valid options: -4 to +4)\n- Contrast - Shadow (valid options: -4 to +4)\n- Sharpness (valid options: -4 to +4)\n- Toning (valid options: -4 to +4)\n- Shading (valid options: -4 to +4)\n- Clarity (valid options: -4 to +4)\n- Highlight Correction (valid options: Auto, On, Off)\n- Shadow Correction (valid options: Auto, Low, Medium, High, Off)\n- Peripheral Illumination Correction (valid options: On, Off)\n- Noise Reduction (valid options: Auto, Low, Medium, High, Custom, Off)\n- White Balance: (valid options: Auto White Balance, Multi Auto White Balance, Daylight, Shade, Cloudy, Fl. - Daylight Color, Fl. - Daylight White, Fl. - Cool White, Fl. - Warm White, Tungsten, CTE, Manual White Balance, Color Temperature; for Color Temperature, valid options are 2500K to 10000K in 10K increments)\n- White Balance Compensation A/B (valid options: -14 to +14, e.g. A1 or B-2)\n- White Balance Compensation G/M (valid options: -14 to +14, e.g. G3 or M-4)\n- ISO (valid options: Auto, 100, 200, 400, 800, 1600, 3200, 6400, 12800, 25600, 51200, 102400)\n- Exposure Compensation (valid options: -5.0 to +5.0)\n- ND Filter (valid options: Auto, On, Off)\nAdditionally, recommend any adjustments to these settings based on variables like lighting conditions, location, subject matter, etc., that could affect the photo's final look. Limit prose.`"
                        },
                        {
                            from: 'gpt',
                            value: `${recipe}\nAdditional details: ${additionalDetails}`
                        }
                    ]
                };
                trainingObjects.push(trainingObject);
            });
        }
        
        await page.goBack();
    }

    fs.writeFileSync('training/ritchie-recipes-data.js', `const data = ${JSON.stringify(trainingObjects)}`);

    await browser.close();
}

// scrapeRitchiesRecipes().catch(console.error);

async function scrapeLukeTaylorRecipes(url = lukeTaylorRecipes) {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.goto(url, {
        waitUntil: "domcontentloaded",
    }); 

    const trainingObjects = [];

    const recipePages = await page.evaluate(() => {
        const exclude = ['negative-film-picture-profile-ricoh-griii-griiix'];
        const allRecipeLinks = Array.from(document.querySelectorAll('a'), a => a.href).filter((href) => {
            return href.includes('blog') && href.includes('recipe') && exclude.every((excluded) => !href.includes(excluded));
        });
        return Array.from(new Set(allRecipeLinks));
    });

    for (const link of recipePages) {
        await page.goto(link, {
            waitUntil: "domcontentloaded",
        });

        const pageTitle = await page.title();
        const recipeTitle = pageTitle.split(' - ')[0];

        const allImages = await page.evaluate(() => {
            const images = Array.from(document.querySelectorAll('img'), img => img.src);
            return images;
        });
        const imageLinks = allImages.slice(1);

        const rawRecipeText = await page.$$eval('.sqs-html-content', (textContainers) => {
            return textContainers.find((container) => container.innerText.includes('EFFECT: ')).innerText;
        });

        const recipe = rawRecipeText.split('\n- ')[0].replace('\n', '');

        const folderPath = `images/${recipeTitle}`;

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        };

        console.log(imageLinks);

        imageLinks.forEach(async (imgSrc, index) => {
            if (imgSrc.length > 0) {
                const response = await fetch(imgSrc);
                const arrayBuffer = await response.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                const imgPath = `${folderPath}/${index}.jpg`;
                fs.writeFile(imgPath, buffer, () => {
                    console.log(`Saved ${imgPath}`);
                });
                const id = imgPath.split('images/')[1];
                const trainingObject = {
                    id,
                    image: id,
                    conversations: [
                        {
                            from: "human",
                            value: "<image>\nIdentify the optimal settings for the Ricoh GR III and Ricoh GR IIIx to precisely replicate the photographic filter and color scheme presented in the submitted photo. Specific settings to include are:\n- Image Control/Effect (valid options: Standard, Vivid, Monotone, Soft Monotone, Hard Monotone, Hi-Contrast B&W, Positive Film, Bleach Bypass, Retro, HDR Tone, Cross Processing)\n- Saturation (valid options: -4 to +4, non-monotone modes only)\n- Hue (valid options: -4 to +4, non-monotone modes only)\n- High/Low Key (valid options: -4 to +4)\n- Contrast (valid options: -4 to +4)\n- Contrast - Highlight (valid options: -4 to +4)\n- Contrast - Shadow (valid options: -4 to +4)\n- Sharpness (valid options: -4 to +4)\n- Toning (valid options: -4 to +4)\n- Shading (valid options: -4 to +4)\n- Clarity (valid options: -4 to +4)\n- Highlight Correction (valid options: Auto, On, Off)\n- Shadow Correction (valid options: Auto, Low, Medium, High, Off)\n- Peripheral Illumination Correction (valid options: On, Off)\n- Noise Reduction (valid options: Auto, Low, Medium, High, Custom, Off)\n- White Balance: (valid options: Auto White Balance, Multi Auto White Balance, Daylight, Shade, Cloudy, Fl. - Daylight Color, Fl. - Daylight White, Fl. - Cool White, Fl. - Warm White, Tungsten, CTE, Manual White Balance, Color Temperature; for Color Temperature, valid options are 2500K to 10000K in 10K increments)\n- White Balance Compensation A/B (valid options: -14 to +14, e.g. A1 or B-2)\n- White Balance Compensation G/M (valid options: -14 to +14, e.g. G3 or M-4)\n- ISO (valid options: Auto, 100, 200, 400, 800, 1600, 3200, 6400, 12800, 25600, 51200, 102400)\n- Exposure Compensation (valid options: -5.0 to +5.0)\n- ND Filter (valid options: Auto, On, Off)\nAdditionally, recommend any adjustments to these settings based on variables like lighting conditions, location, subject matter, etc., that could affect the photo's final look. Limit prose.`"
                        },
                        {
                            from: 'gpt',
                            value: `${recipe}`
                        }
                    ]
                };
                trainingObjects.push(trainingObject);
            }
        });
    }

    // fs.writeFileSync('training/luke-taylor-recipes-data.js', `const data = ${JSON.stringify(trainingObjects)}`);

    await browser.close();
}

scrapeLukeTaylorRecipes().catch(console.error);