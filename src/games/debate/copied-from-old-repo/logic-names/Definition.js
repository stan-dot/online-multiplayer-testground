/*
it can't be

why are defintions like mental objects?
what are physical objects?
what are their properties?
- persistent in time
- can be accessed by different people

so that if talking about chairs is in some sense valid, same appplies to out mental representations, so to speak



but here we just talk about defintions when there is some problem with
the default, implicit ones

*/

export default class Definition {
  constructor(name) {
    (this.name = name), (this.origin = []);
    //it needs to be exhaustive set of places that it belongs;
    //so we have the primary definition and exhaustive Definition
    //but the unique identifiers = by author and timstamp = context sensitive
  }
}
