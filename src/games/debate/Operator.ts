
export default class Operator{
  symbol: any;
  name: any;
  evaluate: any;

  constructor(symbol: any, name: any, evaluate: any){
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
