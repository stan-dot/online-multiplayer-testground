/*that is the place for the 'commands' that are avialable in the text editor
need to check out some github text editors, as need to respond adequately
but tbh, like with LATEX, only on rendering
so on one half of the screen there is the writing place,
on the other there's the compiled vision
so can implement separately


expression is the thing that you write
there must be autocompletion
or maybe like scratch blocks

*/

export default class Expression {
  constructor(callingName, arguments) {
    (this.name = callingName), (this.action = []); //some function
  }
}
