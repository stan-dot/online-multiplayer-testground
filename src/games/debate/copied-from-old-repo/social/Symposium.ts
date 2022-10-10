import Inquirer from './Inquirer.js';

//differences specific


//differences statistical

//contact information? maybe just blockstack id?


//findById
const person = await Person.findById('404eab3a-6ddc-4ba6-afe8-1c3fff464d44');


//filering
const dogHaters = await Person.fetchList({ likesDogs: false });

//counting
const dogHaters = await Person.count({ likesDogs: false });



const tasks = await Task.fetchOwnList({
  completed: false
});
