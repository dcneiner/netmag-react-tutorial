# Winner Selection Engine
## Example React.js Project

The purpose of this project is to show some basics of using React.js. It is by no means exhaustive. This shows a simple implementation of a base ControllerView component and a few child components.

_This project does not use a [Flux](https://facebook.github.io/flux/) dispatcher, actions or stores, it is strictly written with React. Comments in the ControllerView.jsx file explain where some of the pieces would live in a Flux based app. For full-scale React usage, I'd encourage you to read about [Flux](https://facebook.github.io/flux/) and checkout [lux.js](https://github.com/LeanKit-Labs/lux.js), an implementation of the Flux architecture I both use and help maintain at [LeanKit](http://leankit.com)._

## Usage

To follow along with the article, clone this repository (see below for running) and work from the `master` branch.

If you want to see the finished version, checkout the `finished` branch:

```bash
git checkout finished
```

## Running

The only prerequisite is that [node.js](http://nodejs.org/) is installed. 

Clone this repository to a folder on your computer, then within the new folder, run the following:

```bash
npm install
npm start
```

This will install the dependencies, compile the built JavaScript, and then start a server for you to view the running example at <http://localhost:8080>. Any changes you make to the existing `jsx` files will trigger `webpack` to automatically rebuild. Refresh your browser to see your changes, no need to restart `npm start`.

## License

MIT <http://dougneiner.mit-license.org/>