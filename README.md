# postcard-editor


## Development Plan

### Technologies
For the app:
- Webpack
- Typescript
- React
- Redux
- SASS

For code quality:
- Prettier

For testing:
- Jest (unit testing + coverage with Istanbul)
- maybe also adding Puppeteer for integration testing


### tasks for the basic editor
- ~~setup the repo (already done to write this readme): 0~~
- ~~get the empty app running, install NPM modules, setup configs (webpack, typescript, prettier and jest): 30 min~~
- ~~create the main workspace loading few images as a list and displaying the one you click on above: 1h~~
- ~~create the right menu with empty buttons: 5 min~~
- ~~implement rotate functionality: 1h~~
- ~~implement zoom in/out functionality: 1h~~
- implement the new text functionality: 1h

All tasks should include some tests. But i may add additional tests at the end (like integration tests).


### additional tasks
- implement undo/redo with redux: 1h
- save current state to local storage to persist accross reloads: 10 min
- allow changing text position: 30 min
- allow changing text dimensions: 30 min
- allow deleting text blocks: 15 min
- allow rotate/zooming with the mouse: 2h



## Architecture
### Main types
 - **TextBlock**: ```{ text: string, x: number, y: number, with: number, lines: number }```
 - **Postcard**: ```{ imageUrl: string, width: number, height: number, rotation: number, textBlocks: TextBlock[] }```
 - **App State**: ```{ postcards: Postcard[], selectedIndex: number, zoom: number }```

### Main actions
 - `selectPostcard(index: number)`: select a `Postcard`
 - `rotateAndScale(rotation: number, scale: number)`: rotate and scale the current `Postcard`
 - `addTextBlock()`: add a `TextBlock` to the current postcard
 - `updateTextBlockContent(index: number, text: string)`: update a `TextBlock` content
 - `updateTextBlockPosition(index: number, x: number, y: number)`: update a `TextBlock` position
 - `updateTextBlockDimensions(index: number, width: number, lines: number)`: update a `TextBlock` dimensions
 - `deleteTextBlock(index: number)`: delete a `TextBlock` in the current `Postcard`
 - `undo()`: undo last action
 - `redo()`: redo last action

### Main Components

1. **bottom list**: We should have one List component to represent the bottom list. As props, it will take the array of `Postcard[]` and the current selected `Postcard`.
2. **main workspace**: As props, it will take a `Postcard`
3. **Right panel**: won't have any props