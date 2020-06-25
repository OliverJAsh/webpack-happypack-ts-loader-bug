# webpack-happypack-ts-loader-bug

## Development

```bash
yarn
npm run compile:watch
# after initial build
cp ./target/index.js ./a.js
touch shared/functions.ts
# after second build
cp ./target/index.js ./b.js
git diff --no-index ./a.js ./b.js
```
