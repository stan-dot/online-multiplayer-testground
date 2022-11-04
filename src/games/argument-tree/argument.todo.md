
# Soon frontend
## addressing technical debt
- [ ] main display
  - [ ] move everything to konva, arrows much easier. no intersection on my own. canvas on phone would need to be done from scratch anyway. https://konvajs.org/docs/sandbox/Editable_Text.html
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
- [ ] https://mindlevelup.wordpress.com/2017/08/04/double-crux-web-app/	

## datamodel
- [ ] logic	https://en.wikipedia.org/wiki/Toffoli_gate	
- [ ] data handling	https://www.npmjs.com/package/avro-js	

# backend
## general tasks
- [ ] prepare mongodb cluster / supabase / pocketbase
- [ ] adding 3rd party auth https://auth0.com/docs/quickstart/spa/react/interactive
- [ ] add triggers database https://adancewithbooks.wordpress.com/2019/09/22/a-small-list-of-trigger-warnings-you-can-use/
- [ ] user menu - with account - possibly with LENS - keeping data on ipfs, not a database - or anonymous
- [ ] design the api with openapi spec https://oai.github.io/Documentation/specification-parameters.html
- [ ] https://github.com/carderne/crux	
- [ ] https://www.oauth.com/oauth2-servers/single-page-apps/		
- [ ] https://pocketbase.io/	
- [ ] https://supabase.com/	

## endpoints
- get topics
- CRUD wrt statements

## database entities
- topics list 
- statements list
- users lists 

## migrate to separate repo, new landing page - this app a route inside that
- [ ] use this repo https://github.com/stan-dot/lully/blob/main/README.md
- [ ] use this for themes https://astro.build/themes/	
- [ ] a connected nextjs site for 
  - [ ] social interactions
  - [ ] topic exploration
  - [ ] the going into the app is a separate experience
- [ ] https://kaloraat.com/articles/nextjs-react-context-tutorial-how-to-use-context-api-with-nextjs
- [ ] https://www.netlify.com/blog/2020/12/01/using-react-context-for-state-management-in-next.js/

## Development View
- [ ] cypress tests 
  - [ ] basic test suite to see if works at all
  - [ ] test basic functionality with some mock data

## use remote storage	
- [ ] https://docs.pinata.cloud/	pining content to ipfs - no manual ipfs management
- [ ] https://docs.infura.io/infura/getting-started	online storage	infura for interaction with ipfs, eth etc
- [ ] https://faucet.arweave.net/	a different way of storing data, on permaweb 
- [ ] running a LENS publication as objects, or just ipfs tbh is fine. but following mechanics are good. cant do for research though... ig
