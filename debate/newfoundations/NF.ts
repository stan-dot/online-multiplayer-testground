//axiomatic definitions
//alternative denial
export var altDenial = (first: boolean, second: boolean) => {
  if (first === true && second === true) {
    return false;
  }
  return true;
};

//note; memebership is already contained within the OIC relation system
//membership
export var membership = (first: any, second: any) => {
  //again, need to have the relations on hand
  //return (scroll.searchForRelation(first, second) === 'yes')
};

//universal quantification
export var forAll = (array: any[], formula: (arg0: any) => any) => {
  array.forEach((item: any, i: any) => {
    if (!formula(item)) {
      return false;
    }
  });
  return true;
};

//booleanizes truthValues

export default class NF extends Logic {
  static getName() {
    throw new Error('Method not implemented.');
  }
  constructor(name: any, operators: any) {
    super(name, operators);
    this.add('NAND', 'Alternative denial', altDenial);
    //this.add("∈", "Inclusion", inclusion);
    //these evaluation stuff must be doable out of other operators
  }
  add(
    arg0: string,
    arg1: string,
    altDenial: (first: boolean, second: boolean) => boolean,
  ) {
    throw new Error('Method not implemented.');
  }
  //derived

  expand() {
    //D1
    var denial = (first: any) => {
      //just the first matters
      return altDenial(first, first);
    };

    this.add('NOT', 'Denial', denial);

    //D2
    var conjunction = (first: any, second: any) => {
      return denial(altDenial(first, second));
    };
    this.add('AND', 'Conjuncion', conjunction);

    //D3
    var materialConditional = (first: any, second: any) => {
      return altDenial(first, denial(second));
    };
    this.add('IMPLY', 'Material condition', materialConditional);

    //D4
    var alternation = (first: any, second: any) => {
      return materialConditional(denial(first), second);
    };
    this.add('OR', 'Alternation', alternation);

    //D5
    var materialBiconditional = (first: any, second: any) => {
      return altDenial(altDenial(first, second), alternation(first, second));
    };
    this.add('<=>', 'Material biconditional', materialBiconditional);

    //D6
    var existentialQuantification = (predicate: any, array: any) => {
      //return (!forAll(array, predicate)); here quite problematic
      return !forAll(array, !predicate);
    };
    this.add('bigE', 'Existential quantification', existentialQuantification);

    //D7
    var inclusion = (first: any, second: any) => {
      //return forAll(forAll(array, materialConditional(x, first)
      //eeeh, problem
    };
  }
}
