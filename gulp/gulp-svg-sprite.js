import gulp from 'gulp';
import svgSprite from 'gulp-svg-sprite';
import fs from 'fs';
import es from 'event-stream';
import paths from './gulp-paths';

const getSources = () => {
    const sources = [];

    fs.readdirSync(paths.svg.path).map((folder) => {
        sources.push({
            src: `${paths.svg.path + folder}/**/*.svg`,
            folder
        });
    });

    return sources;
};

const gulpSvgSprite = () => {
    const sources = getSources();

    return es.merge(sources.map(source => {
        const dest   = `${paths.svg.dest + source.folder}/`;
        const config = {
            mode: {
                symbol: {
                    dest: '.',
                    sprite: `${source.folder}.svg`,
                    example: {
                        dest: `../../../src/icons-example/${source.folder}.html`
                    }
                }
            },
            svg: {
                xmlDeclaration: false,
                doctypeDeclaration: false
            }
        };

        return gulp.src(source.src)
                   .pipe(svgSprite(config))
                   .pipe(gulp.dest(dest));
    }));
};

export default gulpSvgSprite;
