

## addressing technical debt
- [ ] main display
  - [x] fix the layers - should not assume there's always at least 1 supporter
  - [ ] explore konva variant on a separate branch, might be much easier https://github.com/konvajs/react-konva
  - [ ] diagnosis: not everything renders. 
    - [ ] need to design the render of the arrows
    - [ ] need to design new types implementing the Intersectionable interface
  - [ ] context on statement click
- [ ] split the argument tree into different wrappers 
  - [ ] data wrapper - data, path, loaded
  - [ ] things visible wrapper
  - [ ] appearance wrapper - dark mode, etc
  - [ ] highlight visual elements that are in the path
- [ ] main page using nextjs, only later redirect to app https://nextjs.org/docs/migrating/incremental-adoption

## appearance
- [ ] choosing color palette http://colormind.io/
- [ ] different styles - darkmode, etc - with tailwind https://tailwindcss.com/docs/reusing-styles
- [ ] prettify the whole thing, make it nice colours and right sizes  
- [ ] add shadows

## extended functionality
- [ ] should save to IPFS image AND json data, mint NFT functionality
- [ ] a connected nextjs site for 
  - [ ] social interactions
  - [ ] topic exploration
  - [ ] the going into the app is a separate experience

## backend
## tasks
- [ ] prepare mongodb cluster
- [ ] adding 3rd party auth https://auth0.com/docs/quickstart/spa/react/interactive
- [ ] add triggers database https://adancewithbooks.wordpress.com/2019/09/22/a-small-list-of-trigger-warnings-you-can-use/
- [ ] user menu - with account - possibly with LENS - keeping data on ipfs, not a database - or anonymous
- [ ] design the api with openapi spec https://oai.github.io/Documentation/specification-parameters.html

### entities
- topics list (with)
- statements list
- users lists ( restricted)


### endpoints
- get topics
- CRUD wrt statements

## with LENS
- [ ] running a LENS publication as objects, or just ipfs tbh is fine. but following mechanics are good. cant do for research though... ig


## Development View
- [ ] cypress tests 
  - [ ] basic test suite to see if works at all
  - [ ] test basic functionality with some mock data

## done
- [x] change the data structure so that every node points to children (supporters / attacks), not the other way around
- [x] make th canvas larger if other elements are hidden
- [x] metadata for the each tree
- [x] topics choosing button - some higher up menu - topic metadata, tags with trigger warnings
- [x] a topic creation tool, behind enough XP 
- [x] use toggle, leave hamburger for menu - profile, see website and go to topics site https://uxwing.com/?s=toggle
- [x] apply onblur consistently

# data change
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
