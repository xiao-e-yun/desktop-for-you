tsc
sass scss/:index/ --no-source-map
tsc --project ./builder/ts/tsconfig.json
node ./builder/main.js