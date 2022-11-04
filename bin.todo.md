
# done or rejected
- [x] change the data structure so that every node points to children (supporters / attacks), not the other way around
- [x] make th canvas larger if other elements are hidden
- [x] metadata for the each tree
- [x] topics choosing button - some higher up menu - topic metadata, tags with trigger warnings
- [x] a topic creation tool, behind enough XP 
- [x] use toggle, leave hamburger for menu - profile, see website and go to topics site https://uxwing.com/?s=toggle
- [x] apply onblur consistently

## data change
- [x] modify callback, and the currently discussed item, callback to add new opposing or against nodes
- [ ] context menus
  - [x] path display - now there's no buttons, just strings
  - [x] chatbot message - add to display
  - [x] side panel

## window popups with Sval and for full CRUD wrt statements
- [x] edit window
- [x] add window
- [x] delete window (make sure to delete)
- [x] confirm topic change
- [x] print option

## canvas attempt (no library)
  - [x] fix the layers - should not assume there's always at least 1 supporter
  - [x] explore konva variant on a separate branch, might be much easier https://github.com/konvajs/react-konva
- [ ] diagnosis: not everything renders. 
  - [ ] need to design the render of the arrows
  - [ ] need to design new types implementing the Intersectionable interface
- [ ] context on statement click


# done
## Startup
- [x] follow the [tutorial](https://rapidapi.com/blog/create-react-app-express/) to setup cra with proxy of express - axios - 30 minutes
- rejected - [canvas tutorial](https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258)
- [x] [more on cavas](https://stackoverflow.com/questions/65796640/clear-way-to-use-canvas-html5-with-react-without-render-all-canvas-shapes-all-ti)


## rejected
## normalizing the architecture
- [ ] creating a testing package to host each of the games in a simple canvas
- [ ] publish a context package, add API URL as part of the object 
- [ ] create a template for all of the packages for games

### nft
- [ ] create a subproject with nfts - possibly also a global blockchain context
- [ ] create a [smart contract](https://docs.alchemy.com/alchemy/tutorials/how-to-create-an-nft) - represent some type of game achievement
- [ ] setup web3 for [minting](https://docs.alchemy.com/alchemy/tutorials/how-to-create-an-nft/how-to-mint-a-nft)
- [ ] add avatar nft support

## (optional) routing support
- [ ] add routes and nav elements for different pages and games - got delayed for now as unsure how to proceed - it's a design choice. writing the very game of tic tac toe and snake
- [x] need to follow some of the [routing tutorials](https://blog.logrocket.com/react-dynamic-imports-route-centric-code-splitting-guide/#loadable-components)