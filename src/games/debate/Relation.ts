
const RELATION_CONSTANTS = new Constants();

export default class Relation{
  lower: any;
  higher: any;
  truthValue: any;

  constructor(lower: any, higher: any, truthValue: any){
    this.lower = lower;
    this.higher = higher;
    this.truthValue = truthValue;
  };

  setTruthValue(truthValue: any){
    this.truthValue = truthValue;
  }

  toCSV(){
    var simplicity = 0;
    var positivity = 0;
    if(this.truthValue === RELATION_CONSTANTS.TETRA.YES || this.truthValue === RELATION_CONSTANTS.TETRA.NO){
      simplicity++;
    }
    if(this.truthValue === RELATION_CONSTANTS.TETRA.YES || this.truthValue === RELATION_CONSTANTS.TETRA.BOTH){
      positivity++;
    }
    return (this.lower + "," + this.higher + "," + simplicity + "," + positivity + "\n");
  }

  toXML(){
      //console.log("these are parts of this relaton: "+ this.lower + " " + this.higher);
      return "<relation>\n<object1>" + this.lower + "</object1>\n<object2>" + this.higher + "</object2>\n<truthValue>" + this.truthValue + "</truthValue>\n</relation>";
  };

  toQuiz(){
    return this.lower + ' : ' + this.higher;
  }
  toString(){
    return (this.lower + ' : ' + this.truthValue + ' : ' + this.higher);
  };


};
