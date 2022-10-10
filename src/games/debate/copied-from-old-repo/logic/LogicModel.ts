import Logic from "./Logic.js";
import Statement from "./Statement.js";
import { Model, User } from 'radiks';

//imported logics
import NF from "./newfoundations/NF.js";

//constants and variables
const availableLogics = [NF];

export default class Treatise extends Model{
  static className = "Treatise";
  static schema = {
    title: {
      type: String,
      decrypted: true
    },
    completed: Boolean,
    verisimilitude: {
      type: Number,
      decrypted: true,
    },
    public: Boolean,
    //or maybe separate model for public and private if should switch?
    statements: Array,
    logicType: String,
    baseScroll: String
  };

  static defaults = {
    verisimilitude: 5,
  }

  constructor(title, logicType, baseScroll){
    availableLogics.forEach((logic, i) => {
      if(logic.getName() === logicType){
        this.schema = {logicType: logic};
      }
    });
    //place for baseScroll? interactions with that are tricky from the design PoV
  }


  async save(){
    //after authentication; ahh that's the main method, all my life I was doing it wrong
    await this.save();
    return "Saved successfuly";
  }


  add(operator, first, second){
    //does not look clean
    this.schema.update({statements: this.schema.statements.push(new Statement(operator, first, second))});
  }

  //bridging from scrolls to this is basically getting yes/ no into boolean; maybe just filter and give boolean values?
  //tbh there might be a little prolbem tht lowest fact is not a relation; do we split relaion?
  toString(){
    var result = "Title: " + this.title + " logic: " + this.logicType.getName();
    this.statements.forEach((item, i) => {
      result += item.toString();
    });
    return result;
  }

  //JSON, because hierarchical data, need to store
  toJSON(){

  }

  toGraphML(){
    //in principle it should be visualizable as well
  }

}