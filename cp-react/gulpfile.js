const gulp = require('gulp');
const webpack = require('webpack-stream');

const buildPath = '../shop_back/app/public/cp/cp-react/js';

gulp.task('build-dev', () => gulp
    .src('./src/index.js')
    .pipe(webpack({
        mode: 'development',
        output: {
            filename: 'script.js'
        },
        watch: false,
        devtool: "source-map",
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [['@babel/preset-env', {
                                debug: true,
                                corejs: 3,
                                useBuiltIns: "usage"
                            }],
                                "@babel/react"]
                        }
                    }
                }
            ]
        }
    }))
    .pipe(gulp.dest(buildPath))
);

gulp.task('dev', () => {
    gulp.watch('./src/**/*.js', gulp.parallel('build-dev'))
});

gulp.task('build', () => gulp
    .src('./src/index.js')
    .pipe(webpack({
        mode: 'production',
        output: {
            filename: 'script.js'
        },
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [['@babel/preset-env', {
                                debug: false,
                                corejs: 3,
                                useBuiltIns: "usage"
                            }],
                                "@babel/react"]
                        }
                    }
                }
            ]
        }
    }))
    .pipe(gulp.dest(buildPath))
);
