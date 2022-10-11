import Relation from './Relation.js';

// const SCROLL_CONSTANTS = new Constants();

// const Conditions = {
//   equals: (
//     object: { lower: any; higher: any; truthValue: any },
//     lower: any,
//     higher: any,
//     truthValue: any,
//   ) => {
//     return (
//       object.lower === lower &&
//       object.higher === higher &&
//       object.truthValue === truthValue
//     );
//   },
// };

// export default class DataModel extends Model {
//   static className = 'Treatise';
//   static schema = {
//     title: {
//       type: String,
//       decrypted: true,
//     },
//     completed: Boolean,
//     verisimilitude: {
//       type: Number,
//       decrypted: true,
//     },
//     public: Boolean,
//     //or maybe separate model for public and private if should switch?
//     statements: Array,
//     logicType: String,
//     baseScroll: String,
//   };

//   static defaults = {
//     verisimilitude: 5,
//   };
//   arrayRelations: never[];
//   title: any;
//   quizCounter: number;

//   constructor(title: any) {
//     this.arrayRelations = [];
//     this.title = title;
//     this.quizCounter = 0;
//   }

//   incrementCounter() {
//     console.log('counter before increament: ' + this.getCounter());
//     this.quizCounter++;
//     console.log('counter after increment: ' + this.getCounter());
//   }

//   getCounter() {
//     return this.quizCounter;
//   }

//   counterToString() {
//     return (
//       this.getCurrentRelation().toQuiz() +
//       ' @ ' +
//       (this.getCounter() + 1) +
//       '/' +
//       this.arrayRelations.length
//     );
//   }

//   getCurrentRelation() {
//     console.log('current counter in get: ' + this.getCounter());
//     if (this.quizCounter === this.arrayRelations.length) {
//       console.log('reseting the counter: ' + this.getCounter());
//       this.quizCounter = 0;
//     }
//     return this.arrayRelations[this.getCounter()];
//   }

//   findCounter() {
//     var place = 0;
//     var margin = 3;
//     this.arrayRelations.forEach((relation, i) => {
//       if (
//         this.resolveTruthValue(relation.truthValue) ===
//         SCROLL_CONSTANTS.TETRA.NEITHER
//       ) {
//         margin = margin - 1;
//       } else {
//         margin = 3;
//       }
//       if (margin === 0) {
//         return i - 3;
//       }
//     });
//   }

//   setTitle(string: any) {
//     this.title = string;
//   }

//   getTitle() {
//     return this.title;
//   }

//   static unRoll(simplicity: string, positivity: string) {
//     if (simplicity === '1') {
//       if (positivity === '1') {
//         return SCROLL_CONSTANTS.TETRA.YES;
//       }
//       return SCROLL_CONSTANTS.TETRA.NO;
//     } else if (positivity === '1') {
//       return SCROLL_CONSTANTS.TETRA.BOTH;
//     }
//     return SCROLL_CONSTANTS.TETRA.NEITHER;
//   }

//   copy() {
//     var copy = new Scroll(this.getTitle);
//     this.arrayRelations.forEach(relation => {
//       copy.createSingleRelation(
//         relation.lower,
//         relation.higher,
//         relation.truthValue,
//       );
//     });
//     return copy;
//   }
//   deleteOic(object: string) {
//     for (var i = 0; i < this.arrayRelations.length; i++) {
//       for (var property in this.arrayRelations[i]) {
//         if (property === object) {
//           this.arrayRelations[i] = null;
//         }
//       }
//     }
//     this.arrayRelations = this.arrayRelations.filter(
//       relation => relation != null,
//     );
//     return (
//       'Object ' + object + ' successfuly deleted, along with all its relations.'
//     );
//   }

//   displayAllDone() {
//     console.log('relations array length: ' + this.arrayRelations.length);
//     var stringAnswer = 'All relations here:';
//     for (var i = 0; i < this.arrayRelations.length; i++) {
//       stringAnswer += '\n\t' + this.arrayRelations[i].toString();
//       console.log('displaying relation number ' + i);
//     }
//     stringAnswer += '\nEnd of relations here.';
//     return stringAnswer;
//   }

//   displayObject(command: any, location) {
//     //all up and down parts of the object; wait still looks like wrong place; wait it should return; no, it must be
//     //a part that gets all above and below of a given object should be cool
//     //how about list?
//     var tmpLocation;
//     // need to dissect command to get truthValue and element name; what about matchname?
//     Object.assign(tmpLocation, location);
//     location.listCommand(Constants.DIRECTION.DOWN, null, this);
//     location.listCommand(Constants.DIRECTION.UP, null, this);
//     Object.assign(location, tmpLocation);
//   }

//   colorify(truthValue: any) {
//     //red,(no) black(neither), blue(both), green(yes)?
//     switch (this.resolveTruthValue(truthValue)) {
//       case SCROLL_CONSTANTS.TETRA.BOTH:
//         return '#0000ff';
//       case SCROLL_CONSTANTS.TETRA.YES:
//         return '#00ff1e'; //green lime
//       case SCROLL_CONSTANTS.TETRA.NO:
//         return '#ff0000';
//       default:
//         return '#000000';
//     }
//   }

//   contains(name: any) {
//     var positionInScroll = -1;
//     //checking if name exists in any object
//     for (var j = 0; j < this.arrayRelations.length; j++) {
//       if (
//         this.arrayRelations[j].lower === name ||
//         this.arrayRelations[j].higher === name
//       ) {
//         console.log(
//           'object exists in array of length: ' +
//             this.arrayRelations.length +
//             ' and at j =' +
//             j,
//         );
//         positionInScroll = j;
//         break;
//       }
//     }
//     return positionInScroll;
//   }

//   createNewOic(name: string, locationArray: string | any[]) {
//     if (
//       this.contains(name) === -1 &&
//       this.contains(name.toUpperCase()) === -1
//     ) {
//       for (var i = 0; i < locationArray.length; i++) {
//         this.createSingleRelation(name, locationArray[i], 'yes');
//       }
//       return 'successfuly created an OIC: ' + name;
//     }
//     return 'OIC ' + name + ' already exists';
//   }

//   createNewRelation(
//     object1: string | any[],
//     object2: string | any[],
//     truthValue: any,
//   ) {
//     var isString = (object: any) => typeof object == 'string';
//     var result = '';
//     if (isString(object1) && isString(object2)) {
//       return this.createSingleRelation(object1, object2, truthValue);
//       //for serial relation creation
//     } else if (Array.isArray(object1) && Array.isArray(object2)) {
//       return 'Serial relation creation is allowed with multiple arugments only on one side';
//     } else if (Array.isArray(object1) && isString(object2)) {
//       for (var i = 0; i < object1.length; i++) {
//         result += this.createSingleRelation(object1[i], object2, truthValue);
//       }
//     } else if (isString(object1) && Array.isArray(object2)) {
//       for (var j = 0; j < object2.length; j++) {
//         result += this.createSingleRelation(object1, object2[j], truthValue);
//       }
//     }
//     return 'creating new relation:' + result;
//   }

//   createSingleRelation(object1: any, object2: any, truthValue: string) {
//     if (object1 === object2) {
//       return 'names must be different';
//     }
//     //console.log("all the arguments after resolving " + object1 + object2 + truthValue);
//     var results = this.searchForRelation(
//       object1,
//       object2,
//       SCROLL_CONSTANTS.DIRECTION.ANY,
//       null,
//     );
//     if (results.length === 0) {
//       this.arrayRelations.push(
//         new Relation(object1, object2, this.resolveTruthValue(truthValue)),
//       );
//       return 'Relation created.';
//     } else {
//       return 'Relation already exists: ' + results.toString();
//     }
//   }

//   deleteRelation(lower: any, higher: any, truthValue: any) {
//     for (var i = 0; i < this.arrayRelations.length; i++) {
//       if (
//         Conditions.equals(this.arrayRelations[i], lower, higher, truthValue)
//       ) {
//         this.arrayRelations[i] =
//           this.arrayRelations[this.arrayRelations.length - 1];
//         this.arrayRelations.pop();
//       }
//     }
//   }

//   download() {
//     var element = document.createElement('a');
//     //GML variant
//     //element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.toGML()));
//     //element.setAttribute('download', this.title+".graphml");
//     //csv variant
//     element.setAttribute(
//       'href',
//       'data:text/plain;charset=utf-8,' + encodeURIComponent(this.toCSV()),
//     );
//     element.setAttribute('download', this.title + '.csv');
//     element.style.display = 'none';
//     document.body.appendChild(element);
//     element.click();
//     document.body.removeChild(element);
//     return 'Download should start';
//   }

//   fillFromSet(set: any[]) {
//     set.forEach(
//       (relation: { lower: any; higher: any; truthValue: any }, i: any) => {
//         this.createSingleRelation(
//           relation.lower,
//           relation.higher,
//           relation.truthValue,
//         );
//       },
//     );
//     return 'Scrolls merged, the result in the main tab';
//   }
//   getStatsByTruth(truthValue: any) {
//     return this.arrayRelations.filter(
//       relation => relation.truthValue === truthValue,
//     );
//   }

//   matchName(oic: string) {
//     //search if one letter different
//     var variations = [
//       oic.toLowerCase(),
//       oic.toUpperCase(),
//       oic.substring(0, 1),
//       oic.substring(0, 3),
//     ];
//     console.log('matching oic name');
//     //maybe return an array and make it string elsewhere? parsing array easier
//     var list = '';
//     for (var i = 0; i < this.arrayRelations.length; i++) {
//       //only suffices to search for lower stuff, that is internal nodes and leaves; root is only one
//       for (var j = 0; j < variations.length; j++) {
//         if (this.arrayRelations[i].lower.includes() === variations[j]) {
//           list += this.arrayRelations[i].lower + '|';
//         }
//       }
//     }
//     console.log('list in the end: ' + list);
//     //returns a list of matching terms
//     return 'Similar OICs: ' + list;
//   }

//   nodify(string: string, objectCounter: string | number) {
//     return (
//       '\n<node id="n' +
//       objectCounter +
//       '"/>\n\t<data key="d0">' +
//       string +
//       '</data>'
//     );
//   }

//   resolveTruthValue(truthValue: string | undefined) {
//     if (truthValue !== undefined) {
//       switch (truthValue.toLowerCase()) {
//         case 'both':
//         case 'paradox':
//         case 'b':
//           return SCROLL_CONSTANTS.TETRA.BOTH;
//         case 'yes':
//         case 'true':
//         case 'y':
//           return SCROLL_CONSTANTS.TETRA.YES;
//         case 'no':
//         case 'false':
//         case 'n':
//           return SCROLL_CONSTANTS.TETRA.NO;
//         case 'neither':
//         case 'unknown':
//         case 'u':
//           return SCROLL_CONSTANTS.TETRA.NEITHER;
//         default:
//           return SCROLL_CONSTANTS.TETRA.NEITHER;
//       }
//     } else {
//       return SCROLL_CONSTANTS.TETRA.NEITHER;
//     }
//   }

//   saveOic(oldName: string, newName: string) {
//     for (var i = 0; i < this.arrayRelations.length; i++) {
//       for (var relation in this.arrayRelations[i]) {
//         if (relation.lower === oldName) {
//           relation.lower = newName;
//         } else if (relation.higher === oldName) {
//           relation.higher = newName;
//         }
//       }
//     }
//     return (
//       'Object ' + oldName + ' successfuly successfuly replaced with ' + newName
//     );
//   }

//   searchForRelation(
//     object1: any,
//     object2: any,
//     direction: any,
//     truthValue: null,
//   ) {
//     //but meaybe easier just creating temporary relation, just one parameter would be passed; but wait also reverse relations; so maybe 2?
//     //should it end if found one? if(found){push, break}
//     var results: never[] = [];
//     var lowerIsOne = () => this.arrayRelations[i].lower === object1;
//     var higherIsTwo = () => this.arrayRelations[i].higher === object2;
//     var desiredVeritate = () => {
//       if (truthValue != null) {
//         return this.arrayRelations[i].truthValue === truthValue;
//       }
//       return true;
//     };
//     var found = false;
//     for (var i = 0; i < this.arrayRelations.length; i++) {
//       switch (direction) {
//         case SCROLL_CONSTANTS.DIRECTION.ANY:
//           if (
//             ((lowerIsOne() && higherIsTwo) || !(lowerIsOne || higherIsTwo)) &&
//             desiredVeritate()
//           ) {
//             found = false;
//           }
//           break;
//         case SCROLL_CONSTANTS.DIRECTION.UP:
//           if (lowerIsOne() && higherIsTwo() && desiredVeritate()) {
//             found = true;
//           }
//           break;
//         case SCROLL_CONSTANTS.DIRECTION.DOWN:
//           if (!lowerIsOne && !higherIsTwo && desiredVeritate()) {
//             found = true;
//           }
//           break;
//         default:
//           console.log('unknown direction');
//       }
//       if (found) {
//         results.push(this.arrayRelations[i]);
//         break;
//       }
//     }
//     //returns a list of relations fitting these cryteria
//     //console.log('these are results: ' + results.length);
//     return results;
//   }

//   showStats() {
//     var objectSet = new Set();
//     this.arrayRelations.forEach(relation => {
//       objectSet.add(relation.lower);
//       objectSet.add(relation.higher);
//     });

//     var filteredTrue = {
//       yes: this.getStatsByTruth(SCROLL_CONSTANTS.TETRA.YES),
//       no: this.getStatsByTruth(SCROLL_CONSTANTS.TETRA.NO),
//       both: this.getStatsByTruth(SCROLL_CONSTANTS.TETRA.BOTH),
//       neith: this.getStatsByTruth(SCROLL_CONSTANTS.TETRA.NEITHER),
//     };
//     //here must add more stuff, so that it displays
//     return (
//       'Number of distinct OICs: ' +
//       objectSet.size +
//       ' \n Number of relations: ' +
//       this.arrayRelations.length
//     );
//   }

//   saveToGaia(userSession: {
//     putFile: (arg0: string, arg1: string, arg2: { encrypt: boolean }) => void;
//   }) {
//     //console.log(this.title + " is the file saved");
//     const options = { encrypt: true };
//     userSession.putFile(this.title + '.csv', this.toCSV(), options);
//   }

//   setify() {
//     var result = new Set();
//     this.arrayRelations.forEach(relation => {
//       result.add(relation);
//     });
//     return result;
//   }

//   toCSV() {
//     var csvString = 'oic1,oic2,truthValue(simplicity),truthValue(positivity)\n';
//     this.arrayRelations.forEach(relation => {
//       csvString += relation.toCSV();
//     });
//     return csvString;
//   }

//   toGMLSample() {
//     var contents =
//       '<?xml version="1.0" encoding="UTF-8"?>\n <graphml xmlns="http://graphml.graphdrawing.org/xmlns"\n xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" \n xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">';
//     contents += '<graph id="G" edgedefault="undirected">';
//     contents +=
//       '<node id="n0"/>\n<node id="n1"/>\n<edge id="e1" source="n0" target="n1"/>\n';
//     contents += '</graph>\n</graphml>';
//     return contents;
//   }

//   toGMLRelations() {
//     var contents = '';
//     var objectMap = new Map();
//     var objectCounter = 0;
//     var edgeCounter = 0;
//     this.arrayRelations.forEach((relation: Relation) => {
//       if (!objectMap.has(relation.lower)) {
//         objectMap.set(relation.lower, objectCounter);
//         contents += this.nodify(relation.lower, objectCounter);
//         objectCounter++;
//       }
//       if (!objectMap.has(relation.higher)) {
//         objectMap.set(relation.higher, objectCounter);
//         contents += this.nodify(relation.higher, objectCounter);
//         objectCounter++;
//       }
//       //namespace prefixes problematic
//       contents +=
//         '\n<edge id="e' +
//         edgeCounter +
//         '" source="n' +
//         objectMap.get(relation.lower) +
//         '" target="n' +
//         objectMap.get(relation.higher) +
//         '"><data key="d1">\n';
//       //contents += '\t<y:PolyLineEdge>\n \t\t<y:LineStyle type="line" width="1.0" color="'+this.colorify(relation.truthValue) + '"/>\n\t\t\<y:Arrows source="none" target="standard"/>\n\t</y:PolyLineEdge>';
//       contents +=
//         '\t<PolyLineEdge>\n \t\t<LineStyle type="line" width="1.0" color="' +
//         this.colorify(relation.truthValue) +
//         '"/>\n\t\t<Arrows source="none" target="standard"/>\n\t</PolyLineEdge>';
//       contents += '</data>\n</edge>';
//       edgeCounter++;
//     });
//     return contents;
//   }

//   toGML() {
//     var contents =
//       '<?xml version="1.0" encoding="UTF-8"?>\n <graphml xmlns="http://graphml.graphdrawing.org/xmlns"\n xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" \n xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">';
//     contents += '\n<graph id="G" edgedefault="directed">';
//     contents += this.toGMLRelations();
//     contents += '\n</graph></graphml>';
//     return contents;
//   }

//   toXML() {
//     var contents =
//       "<?xml version='1.0' encoding='UTF-8'?><relationslist><title>" +
//       this.title +
//       '</title>\n<length></length><topic></topic><about></about>\n<contents>';
//     for (var i = 0; i < this.arrayRelations.length; i++) {
//       contents += this.arrayRelations[i].toXML();
//     }
//     contents += '</contents></relationslist>';
//     return contents;
//   }
// }
