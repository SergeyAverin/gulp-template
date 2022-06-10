# gulp-template
## Discription
It is my gulp template for projects. In this gulp setup, I added everything that I thought was necessary for work on web site layout. This gulp setup has sass preprocessor and pug preprocessor. This gulp setup have webpack for create bundle js file. Webpack use babel-loader for support old browser. For optimize gulp setup have two mode (production, development). Default mode development. You can change GULP_TEMPLATE_MODE environment variables to change gulp setup mode or use npm scripts. Gulp template convert image to webp format and convert ttf to woff and woff2

*********
# Start work:
1. `git clone https://github.com/PrettyStreett/gulp-template.git`
2. `cd gulp-template`
3. `npm install`
4. `npm run dev`

## Modes
* Production (for final build. Production mode use all plugins)
* Development (for work. Development use some plugins for minimal work site)

### Change mode
GULP_TEMPLATE_MODE environment variables to change mode
* GULP_TEMPLATE_MODE=production - Production mode
* GULP_TEMPLATE_MODE=droduction - Development mode (default)

Npm script have two script to auto change GULP_TEMPLATE_MODE
* `"dev": "cross-env GULP_TEMPLATE_MODE=development gulp"` - Development mode
* `"build": "cross-env GULP_TEMPLATE_MODE=production gulp"` - Production mode

