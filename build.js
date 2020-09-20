const fs = require('fs');
const ncp = require('ncp').ncp;
const minify = require('minify');


/**
 *  @STEP1 
 *  DEFINE ROOT DIR FOR ASSETS
 */
const dist_assets = "./assets";

















/**
 *  @STEP2
 *  DEFINE PATH TARGET FILES TO MINIFY
 *  DEFINE DEST PATH FOR OUTPUT FILE 
 *  !NOTE: take note of the naming pattern
 */


// TARGET DESTINATION
const dist_html = './dist/';
const dist_css = `./dist/assets/css`;
const dist_js = `./dist/assets/js`;

/**
 * !JAVASCRIPT CSS HTML
 * TARGET FILES (RELATIVE PATH) TO MINIFY (ARRAY)
 *  *1st - file to minify (js, html, css)
 *  *2nd - filename of the output file
 *  *3rd - extenstion of the output file
 */
const assets = [
    [`${dist_assets}/css/style.css`, '/style', 'css'],
    [`${dist_assets}/js/howler.js`, '/howler', 'js'],
    [`${dist_assets}/js/paper-full.js`, '/paper-full', 'js'],
    [`./index.html`, 'index', 'html']
]



















/**
 * !JS/CSS MINIFICATION OPTIONS
 */
const options = {
    html: {
        removeAttributeQuotes: false,
        removeComments: true,
        removeCDATASectionsFromCDATA: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeEmptyElements: false,
        removeOptionalTags: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true,
    },
    css: { compatibility: '*' },
    js: { ecma: 5 },
}


/**
 * !JS/CSS MINIFICATION PROCESS
 */
assets.forEach(asset => {

    const [filePath, fileOutputName, extenstion] = asset;

    if (!fs.existsSync(filePath)) {
        return new Error(`[ERROR: File Not Existing]: ${filePath}`)
    }

    minify(filePath, options)

        .then(minifiedBuffer => {
            let destination;

            switch (extenstion) {
                case 'html': destination = dist_html; break;
                case 'css': destination = dist_css; break;
                case 'js': destination = dist_js; break;
                default: destination = false; break;
            }

            if (!destination) {
                console.log(`[ERROR: File Not Supported]: ${filePath}`)
            }

            const outputFile = `${destination}${fileOutputName}.${extenstion}`;

            fs.writeFileSync(outputFile, minifiedBuffer);
        })

        .catch(error => console.log(error));
})







/**
 * !COPY ALL THE SOUNDS
 */

ncp('./assets/sounds', './dist/assets/sounds', function (error) {
    if (error) { console.log(error) }
})