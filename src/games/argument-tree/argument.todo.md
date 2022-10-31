
## navigation and interactvity
- [ ] use toggle, leave hamburger for menu - profile, see website and go to topics site https://uxwing.com/?s=toggle

- [ ] full CRUD wrt statements
- [ ] context menus for
  - [ ] side panel
  - [ ] path display - now there's no buttons, just strings
    - [ ] highlight visual elements that are in the path
  - [x] chatbot message - add to display
  - [ ] main display - context on statement click

# data change
- [ ] modify callback, and the currently discussed item, callback to add new opposing or against nodes

## appearance
- [ ] different styles - darkmode, etc - with tailwind possibly
- [ ] prettify the whole thing, make it nice colours and right sizes  
- [ ] add shadow
- [ ] apply onblur consistently

## extended functionality
- [ ] keyboard usage and selection
  - [ ] multiple selection with `ctrl` clicked and/or shift
  - [ ] react to `ctrl`+a clicks
- [ ] print option
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
- [ ] split the argument tree into different wrappers 
  - [ ] data wrapper - data, path, loaded
  - [ ] things visible wrapper
  - [ ] appearance wrapper - dark mode, etc

## done
- [x] change the data structure so that every node points to children (supporters / attacks), not the other way around
- [x] make th canvas larger if other elements are hidden
- [x] metadata for the each tree
- [x] topics choosing button - some higher up menu - topic metadata, tags with trigger warnings
- [x] a topic creation tool, behind enough XP 
