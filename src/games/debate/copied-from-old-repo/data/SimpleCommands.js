import Mode from './Mode.js';

//current
  //also wokring around 'this', which still refers to the console


//done
  //make it into an instance; choose a way to add to the map
  //wait, that needs to implement, not extend; yes, composition over inheritance

export var simpleCommands = new Mode(
  "simpleCommands", //name
  0, //staring position
  //command mapping
  //will that be really better than this here?; maybe I should not fix what is not broken?
  [
    [  "all": all,]
  ]

  var args={
   "a":all,
    "cls": clear,"clear":clear,
    "ct":err, "cl": err,
    "current":pwd,"pwd":pwd,"location": pwd,
    "h":help,"help":help,
    "home":home,"0":home,
    "ins":upload, "i":upload, "insert":upload, "upload":upload,
    "nl":err,"numberLeft":err,
    "map":err,"m":err, //not needed, deleted the place for it
    "quiz": quiz,
    "stat":stat, "stats": stat, "statistics": stat,
    "settings": err,
    "share": err,
    "t":title,"title":title,
  };
  var all = () => {
    return (myTabs.scrolls[0].displayAllDone());
  };
  var clear = () => {
    this.setState({logs: []})
    return "";
  };
  var err = () => {return errorMessage};
  var home = () => {return myLocation.reset()};
  var help = () => { return (Texts.displayHelp());}
  var logic = () =>{
    console.log("entering logic mode");
    this.setState({mode: MODE.LOGIC});
    return ("you are now in the logic mode");
  }

  var pwd = () => {return (myTabs.scrolls[0].title + ' : ' + myLocation.toString())};
  var quiz = () => {
    //this.log(myTabs.scrolls[0].getCurrentRelation().toQuiz());
    this.setState({mode: MODE.QUIZ});
    return ("you are now in the quiz mode, type 'current' to see where you are, q to exit");
  }
  var stat = () => {return (myTabs.scrolls[0].showStats())};
  var title = () => {return ( "current scroll title:" +  myTabs.scrolls[0].title);};
  var upload = () => {this.upload()};

  }

);
