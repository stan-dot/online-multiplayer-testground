import Constants from './Constants.js';

export const LOCATION_CONST = new Constants();

const Check = {
  allTwoDots: function(array){
    for(var i = 0; i < array.length;i++){
      if(array[i] !==".."){return false;}
    }
    return true;
  },
  noTwoDots: function(array){
    for(var i = 0; i < array.length;i++){
      if(array[i] ===".."){return false;}
    }
    return true;
  }

};

const Pathing = {
  absolute: function(cdLocation, currentScroll, location){
    //return (cdLocation, currentScroll) => {
      var unmatched = [];
      //phase 1 - find if the location exists
      for(var i = 0; i < cdLocation.length; i++){
        if(currentScroll.contains(cdLocation[i]) === -1){
          unmatched.push(cdLocation[i]);
        }
      }
      if(unmatched.length === 0){
        //assign new current location
        location.reset();
        location.addArray(cdLocation);
        return ("Moved successfuly.");
      }
      return ("Elements: " + unmatched.toString() + " do not exist.");
    //}
  },
  relative: function(cdLocation, currentScroll, location){
    //return (cdLocation, currentScroll) => {
      console.log("before the breakdown, position in the scroll is:" + currentScroll.contains(cdLocation[0]));
      //yes, the 'contains' function in scroll is the culprit
      if(currentScroll.contains(cdLocation[0]) !== -1 ){
        console.log("yes, the wanted location exists, changing");
        location.addArray(cdLocation);
      }else{
        console.log("sth failed");
      }
    //}
  },
  up: function(cdLocation,location){
    cdLocation.forEach(() => {
      location.arrayLocation.pop();
    });
  }
};

export default class Location{
  constructor(){
    this.arrayLocation = [
        LOCATION_CONST.ALL
      ]
  }

  changeLocation(command, currentScroll){
    var cdLocation = command[1].split("|");
    if(cdLocation.length === 0){this.log("Enter target location.")};
    //maybe making al these a return functions, and this.log used only in the simple commands?
    if(cdLocation.length === 1 && !Check.allTwoDots(cdLocation)){
      console.log("changing location just by one; here breaks down");
      Pathing.relative(cdLocation, currentScroll, this);
    }else if (Check.noTwoDots(cdLocation)) {
      Pathing.absolute(cdLocation, currentScroll, this);
    }else if (Check.allTwoDots(cdLocation)) {
      Pathing.up(cdLocation, this);
    }
    return this.toString();
  }

  listCommand(direction, truthValue, currentScroll){
    //need to find those that are common to all oics in current location.
    if(truthValue == null){truthValue = Constants.TETRA.YES;}
    if(direction == null){direction = Constants.DIRECTION.DOWN;}
    var results = [];

    //phase 1 - retrieval to array
    for(var i = 0; i < this.arrayLocation[i].length; i++){
      results[i] = currentScroll.searchForRelation(this.arrayLocation[i], Constants.ALL, direction, truthValue);
      // need to remove on an ongoing basis, only checking the last one, loop invariant - last 2 are segregated
      //phase 2 - deleting non-repeating, in the end getting a new array without repeats
      if(i>0){
        for(var j = 0; j < results[i-1].length; j++){
          //checking if all from old ones include stuff from new one
          if( results[i-1][j] != null && !results[i].includes(results[i-1][j]) ){
            results[i-1][j] = null;
          }
        }
        //checking if the new one includes the stuff from all the old ones
        for(var m = 0; m < results[i].length; m++){
          if(!results[i-1].includes(results[i][m])){
            results[i][m] = null;
          }
        }
      }
    }

    //phase 2 = joining from 2d array into 1d
    var finalResults = [];
    for(var k=0; k<results.length; k++){
      finalResults = finalResults.concat(results[k]);
    }
    finalResults = finalResults.filter(n => n != null);
    var beginning = ("These are the contents of '" + this.toString() + "' directory: \n");
    var ending = ("\nEnd of the list of contents of '" + this.toString() + "' directory: ");
    this.log(beginning + finalResults.toString() + ending);
  }


  reset(){
    this.arrayLocation = [
        Constants.ALL
      ];
      console.log("this after reset: " + this.arrayLocation.toString());
      return "Location has been reset";
  }
  deleteItem(item){
    var index = this.arrayLocation.indexOf(item);
    this.arrayLocation[index] = this.arrayLocation[this.arrayLocation.length - 1];
    this.arrayLocation.pop();
  }

  toString(){
    //console.log("all is: " + LOCATION_CONST.ALL)
    //console.log("putting location as a string, array length: " + this.arrayLocation.length + ", contents: " + this.arrayLocation);
    var string = "";
    for(var i = 0; i < this.arrayLocation.length; i++){
      string += "|" + this.arrayLocation[i];
    }
    //console.log("the location string:" + string);
    return string;
  }

  ifExistsHere(name){
    return this.arrayLocation.contains(name);
  }

  addArray(array){
    for(var i = 0; i < array.length; i++){
      this.arrayLocation.push(array[i]);
    }
  }

}
