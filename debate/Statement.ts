import Operator from './Operator.js';
import Relation from './Relation.js';

///also has optional tags
export default class Statement {
  operator: any;
  first: any;
  second: any;
  tags: any;
  constructor(operator: any, first: any, second: any, tags: any) {
    (this.operator = operator),
      (this.first = first),
      (this.second = second),
      (this.tags = tags);
  }
  //wait, first and second are not strings, but relations

  getLevel() {
    // if (Object.isString(this.first) || Object.isString(this.second)) {
    //   return 0;
    // }
    var first = this.first.getLevel();
    var second = this.second.getLevel();
    if (first > second) {
      return first + 1;
    }
    return second + 1;
  }

  checkHalfBoolean(half: { truthValue: string; resolve: () => any }): any {
    if (half instanceof Relation) {
      if (half.truthValue === 'yes') {
        return true;
      } else {
        return false;
      }
    } else if (half instanceof Statement) {
      return half.resolve();
    } else {
      console.log('fact resolution error');
      return false;
    }
  }

  resolve() {
    //when displaying, it should go recursively if nested logical operators
    return this.operator.evaluate(
      this.checkHalfBoolean(this.first),
      this.checkHalfBoolean(this.second),
    );
  }

  //any text will also be recurisve
  toJSON() {
    return JSON.stringify(this);
  }

  checkHalfString(half: { toString: () => string }): string {
    if (half instanceof Relation) {
      return '(' + half.toString() + ')';
    } else if (half instanceof Statement) {
      return half.toString();
    } else {
      console.log('fact resolution error');
      return 'Error here!';
    }
  }

  toString(): string {
    //but wait, that should be recurisve as well

    return (
      '(' +
      this.checkHalfString(this.first) +
      ' ' +
      this.operator.symbol +
      ' ' +
      this.checkHalfString(this.second) +
      ')'
    );
  }
}
