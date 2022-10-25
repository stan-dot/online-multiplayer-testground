
- [x] change the data structure so that every node points to children (supporters / attacks), not the other way around
- [x] make th canvas larger if other elements are hidden
- [x] metadata for the each tree
- [ ] add a context menu click handler to the chatbox with the option to add statements to the display
- [ ] user menu - with account - possibly with LENS - keeping data on ipfs, not a database - or anonymous
- [x] topics choosing button - some higher up menu - topic metadata, tags with trigger warnings
- [ ] a topic creation tool, behind enough XP https://adancewithbooks.wordpress.com/2019/09/22/a-small-list-of-trigger-warnings-you-can-use/
- [ ] in support of functionality - need to add modigy callback, and the currently discussed item, callback to add new opposing or against nodes


 ## notes
 - application before Christmas - https://ethics.ris.shef.ac.uk/ethics_applications/new

## appearance
- [ ] different styles - darkmode, etc - with tailwind possibly
- [ ] prettify the whole thing, make it nice colours and right sizes  
- [ ] add shadow

## navigation and interactvity
- [ ] context menus for
  - [ ] side panel
  - [ ] path display
    - [ ] highlight the argument up to that point
    - [ ] copy the path
    - [ ] print option
  - [ ] main display
  - [ ] chatbot message
- [ ] keyboard usage and selection
  - [ ] multiple selection with `ctrl` clicked and/or shift
  - [ ] react to `ctrl`+a clicks

## Development View
- [ ] cypress tests 
  - [ ] basic test suite to see if works at all
  - [ ] test basic functionality with some mock data
- [ ] split the argument tree into different wrappers 
  - [ ] data wrapper - data, path, loaded
  - [ ] things visible wrapper
  - [ ] appearance wrapper - dark mode, etc
