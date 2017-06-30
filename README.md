REACT STARTER PACK
-------------------

A simple starter pack for React Redux with chunking and versioning in Webpack 2 to optimize speed.
There's also an express server for the same. It serves both production and development builds.

## Dependencies
node v6.9.5

## To Run
do git clone of the repository
`https://github.com/tanaypratap/react-webpack2-starter.git`

run
`npm install`

### Development
now open two terminals
in one terminal type below command to start the webpack dev server
`npm run start`

second terminal, start the dev backend server.
`npm run start-server-dev`

### Production
run `npm run prouduction`
this will create the build files which needs to be deployed.

serve the files using express server run server.js in production mode with something like `pm2` to manage process
`NODE_ENV=production node server.js`
if pm2 then
`NODE_ENV=production pm2 start server.js --name yourappname.com`

#### Note
#### Babel
Babel presets for stage-0 are installed and configured. You might want to disable it if you're not sure about using the features which aren't final yet.

#### ESlint
ESlint is also configured with some of my personal rules and airbnb rules as the base. Edit it as per your need.
To run linting `npm run lint`

#### TODO
1. Add some CSS preprocessor. Since, I haven't used one I have to explore this field. Suggestions are welcome.
2. Add testing in the build process. This would be an exciting thing. Currently, we are doing manual QA, I am looking at Jest to do some testing of React Components but not sure about it. Suggestions are welcome on this front as well.
