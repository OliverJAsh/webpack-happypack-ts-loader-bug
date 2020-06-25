import * as HappyPack from 'happypack';
import * as pathHelpers from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { Configuration } from 'webpack';

// Expect `__dirname` to be `/config/target/`.
const ROOT_PATH = pathHelpers.resolve(__dirname, '..', '..');
const TARGET_PATH = pathHelpers.join(ROOT_PATH, './target/');
const SRC_PATH = pathHelpers.join(ROOT_PATH, './src/');

const ENTRY_FILENAME = 'index.ts';
const OUTPUT_FILENAME = 'index.js';

const RESOLVED_EXTENSIONS = [
    // start defaults
    '.js',
    '.json',
    // end defaults
    '.ts',
    '.tsx',
];

const config: Configuration = {
    mode: 'development',
    devtool: 'source-map',
    entry: pathHelpers.resolve(SRC_PATH, ENTRY_FILENAME),
    output: {
        path: TARGET_PATH,
        filename: OUTPUT_FILENAME,
    },
    resolve: {
        extensions: RESOLVED_EXTENSIONS,
        plugins: [new TsconfigPathsPlugin({ extensions: RESOLVED_EXTENSIONS })],
    },
    module: {
        rules: [
            {
                test: /\.(tsx?)$/,
                exclude: /node_modules/,
                use: 'happypack/loader?id=ts',
            },
        ],
    },
    plugins: [
        new HappyPack({
            id: 'ts',
            threads: 1,
            loaders: [
                {
                    loader: 'ts-loader',
                    options: {
                        happyPackMode: true,
                        logLevel: 'info',
                    },
                },
            ],
        }),
    ],
};

export default config;
