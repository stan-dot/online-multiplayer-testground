export {};

// //axiomatic definitions

// //D7
// export var inclusion = ((first: any, second: any) => {
//   var members: any[] = [];
//   //members = scroll.searchForRelation(any, first, 'yes');
//   //return (scroll.searchForRelation(first, second) === 'yes')
//   members.forEach((item, i) => {
//     if(scroll.searchForRelation(item, second) !== 'yes'){
//       return false;
//     };
//   });
//   return true;
// });

// //D11
// export var abstraction = ((condition: (arg0: any) => any, array: any[]) => {
//   var result = [];
//   array.forEach((item: any, i: any) => {
//     if(condition(item){
//       result.push(item);
//     })
//   });
//   return result;
// });

// export default class NF extends Logic{
//   constructor(name: any, operators: any){
//     super(name, operators);
//     this.add("∈", "Inclusion", inclusion);
//     //these evaluation stuff must be doable out of other operators
//    };

// //derived

//   expand(){
//     var denial = ((first: any) =>{
//       //just the first matters
//       return altDenial(first, first);
//     });

//     this.add("NOT", "Denial", denial);

//   }

// //   alternative denial and inclusion
