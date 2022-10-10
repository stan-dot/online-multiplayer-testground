
import Logic from "../Logic.js";

//axiomatic definitions
//alternative denial
export var altDenial = ((first, second) =>{
  if(first === true && second === true){
    return false;
  }
  return true;
});

//note; memebership is already contained within the OIC relation system
//membership
export var membership = ((first, second) => {
  //again, need to have the relations on hand
  //return (scroll.searchForRelation(first, second) === 'yes')
});

//universal quantification
export var forAll = ((array, formula) =>{
  array.forEach((item, i) => {
    if(!formula(item)){
      return false;
    }
  });
  return true;
});

//booleanizes truthValues

export default class NF extends Logic{
  constructor(name, operators){
    super(name, operators);
    this.add("NAND", "Alternative denial", altDenial);
    //this.add("∈", "Inclusion", inclusion);
    //these evaluation stuff must be doable out of other operators
   };

//derived

  expand(){

    //D1
    var denial = ((first) =>{
      //just the first matters
      return altDenial(first, first);
    });

    this.add("NOT", "Denial", denial);

    //D2
    var conjunction = ((first, second) =>{
      return denial(altDenial(first, second));
    });
    this.add("AND", "Conjuncion", conjunction);

    //D3
    var materialConditional = ((first, second)=>{
      return altDenial(first, denial(second));
    })
    this.add("IMPLY", "Material condition", materialConditional);

    //D4
    var alternation = ((first, second) =>{
      return materialConditional(denial(first), second);
    })
    this.add("OR", "Alternation", alternation);

    //D5
    var materialBiconditional = ((first, second) =>{
      return altDenial(altDenial(first, second), alternation(first, second));
    });
    this.add("<=>", "Material biconditional", materialBiconditional);

    //D6
    var existentialQuantification = ((predicate, array) =>{
      //return (!forAll(array, predicate)); here quite problematic
      return (!forAll(array, !predicate));
    });
    this.add("bigE", "Existential quantification", existentialQuantification);

    //D7
    var inclusion = ((first, second) =>{
      //return forAll(forAll(array, materialConditional(x, first)
      //eeeh, problem
    });

  }
}
