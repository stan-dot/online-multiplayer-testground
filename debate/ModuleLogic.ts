//logic is for treatise to search its operators to match user - inputed string signifying that logical relation

import Operator from "./Operator";

//now it's just an implementation of module
//it all starts with the https://en.wikipedia.org/wiki/Turnstile_(symbol) turnstile
export default class Logic {
  name: any;
  operators: any;
  //let's say for now that the users are not able to modify this part
  constructor(name: any, operators: any) {
    this.name = name;
    this.operators = operators;
  }

  getName() {
    return this.name;
  }

  add(symbol: any, name: any, evaluate: any) {
    this.operators.push(new Operator(symbol, name, evaluate));
  }

  toString() {
    var result = 'Operators used in this logic: \n';
    this.operators.forEach((item: { toString: () => string; }, i: any) => {
      result += item.toString();
    });
    return result;
  }

  listUnboundVariables() {}

  //because it's not hierarchical, can list operators easily
  toCSV() {}

  logicMode(command: (string | number)[]) {
    //here should be logging current logic name; tbh logical document should be as tabs property (logic not, maybe; but that would be another file)

    var construct = () => {};

    var download = () => {
      //that is there, quite ok; would Treatise be a sibling to Scroll in the Tabs group? but it build on it
      //maybe just this.treatises?
      return sessionTabs.scrolls[0].download();
    };
    //show logic
    //add operator
    //open new logical document
    //wait, will need to change the tabs. openNew, becuase now it's unclear what it does open.
    //what is the relation of logical document to scroll? inevitably tied? should be separate
    //but the NF needs a specific array; what if the scroll changes; if just a little
    var err = () => {
      return errorMessage;
    };
    var quit = () => {
      return this.backToStandard();
    };
    var args = {
      construct: construct,
      const: construct,
      download: download,
      exit: quit,
      quit: quit,
      q: quit,
      help: err,
      h: err,
      no: err,
      s: err,
      both: err,
      a: err,
      neither: err,
      d: err,
      r: err,
      relation: err,
      rel: err,
      o: err,
      obj: err,
      object: err,
      t: err,
      thing: err,
    };
    console.log('command[0]:' + command[0] + 'command[1]' + command[1]);
    return this.commandResult(args[command[0]]);
  }
  backToStandard() {
    throw new Error("Method not implemented.");
  }
  commandResult(arg0: any) {
    throw new Error("Method not implemented.");
  }
}
