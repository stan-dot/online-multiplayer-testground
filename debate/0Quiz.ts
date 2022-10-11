//quiz show progress
//here displaying and deciding tetra value, can add explanations; target to only have yes and no; like explaining to others
//or to a particularily annoying journalist
export function quizMode(command) {
  var currentRelation = sessionTabs.scrolls[0].getCurrentRelation();
  var err = () => {
    return errorMessage;
  };
  var quit = () => {
    return this.backToStandard();
  };

  var getCurrent = () => {
    return sessionTabs.scrolls[0].counterToString();
  };

  var helperTetra = truthValue => {
    currentRelation.setTruthValue(truthValue);
    sessionTabs.scrolls[0].incrementCounter();
    console.log('current counter:' + sessionTabs.scrolls[0].getCounter());
    return sessionTabs.scrolls[0].counterToString();
  };

  //like in swiping, need to go back?
  var yes = () => {
    return helperTetra(CONSTANTS.TETRA.YES);
  };
  var no = () => {
    return helperTetra(CONSTANTS.TETRA.NO);
  };
  var both = () => {
    return helperTetra(CONSTANTS.TETRA.BOTH);
  };
  var neither = () => {
    return helperTetra(CONSTANTS.TETRA.NEITHER);
  };

  //copied from complexCommands
  var object = () => {
    return sessionTabs.scrolls[0].createNewOic(
      command[1],
      myLocation.arrayLocation,
    );
  };

  var relation = () => {
    //console.log("inside making relation command");
    sessionTabs.scrolls[0].createNewOic(command[1], myLocation.arrayLocation);
    sessionTabs.scrolls[0].createNewOic(command[2], myLocation.arrayLocation);
    return sessionTabs.scrolls[0].createNewRelation(
      command[1],
      command[2],
      command[3],
    );
  };

  var args = {
    current: getCurrent,
    pwd: getCurrent,
    location: getCurrent,
    cu: getCurrent,
    exit: quit,
    quit: quit,
    q: quit,
    help: err,
    h: err,
    yes: yes,
    w: yes,
    y: yes,
    no: no,
    s: no,
    n: no,
    both: both,
    a: both,
    b: both,
    neither: neither,
    d: neither,
    u: neither,
    o: object,
    object: object,
    obj: object,
    r: relation,
    relation: relation,
    rel: relation,
  };
  return this.commandResult(args[command[0]]);
}
