tsc
sass scss/:index/ --no-source-map
tsc --project ./builder/ts/tsconfig.json
node ./build/main.js