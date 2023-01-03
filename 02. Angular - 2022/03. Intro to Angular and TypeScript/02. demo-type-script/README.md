## Generate index.js
 With this command we generate index.js from index.ts
`./node_modules/.bin/tsc ./src/index.ts`

## Create tsconfig.json
 To create a new tsconfig.json type in terminal: `./node_modules/.bin/tsc --init`. You can learn more at https://aka.ms/tsconfig

## Then we change those options:
` "rootDir": "./src",` 
` "outDir": "./dist",` 

## Generate the directory
 To generate the new directory with the corresponding `JS file` type in terminal:
`./node_modules/.bin/tsc`

## Making a server
Install express:
` npm install express` 

## To connect to DefinitelyTyped
` npm i --save-dev @types/express` 

## Then Go to package.json
Change ` scripts": {"build": "tsc", "start": "nodemon dist/index.js", "bs":"npm run build && npm run start"}, ` 

## To start the server
 Write in terminal: ` npm run bs `

## To restart
After changes in ` index.ts`, open new terminal and write ` ./node_modules/.bin/tsc ` 
