
export default class Operator{

  constructor(symbol, name, evaluate){
    this.symbol = symbol;
    this.name = name;
    this.evaluate = evaluate;
  };

  toCSV(){
    return (this.symbol + "," + this.name + "\n");

  }

  toJSON(){
      //console.log("these are parts of this relaton: "+ this.lower + " " + this.higher);
  };

  toString(){

  };

};
