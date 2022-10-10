import { User } from 'radiks';

// For example I want to add a public name on my user model
class Inquirer extends User {
  static className = 'Project';
  //in the same way as project has tasks, inquirer has scrolls / treatises
  /*
  const project = await Project.findById('some-id-here');
  console.log(project.tasks); // will already have fetched and decrypted all related tasks
  */
  static schema = {
    ...User.schema,
    displayName: {
      type: String,
      decrypted: true,
    },
    //that field will be filled by the user only if they want to
    contactInfo: {
      type: String,
      decrypted: true
    }
  };

  async afterFetch() {
    this.tasks = await Task.fetchList({
      projectId: this.id,
    })
  }

const { name, likesDogs } = person.attrs;
console.log(`Does ${name} like dogs?`, likesDogs);

  //updating
  update(){

    const newAttributes = {
      likesDogs: false,
      age: 30
    }
    person.update(newAttributes);
  }
  //saving
  save(){
    await person.save();
  }
  //destroying
  destroy(){
    await person.destroy();
  }




}
