export default class AltStatement {
  constructor(mentionCount = 0, emotion = neutral, smoothable = false) {
    //super line
    (this.mentionCount = mentionCount),
      (this.smoothable = smoothable),
      (this.emotion = emotion);
  }

  //material connections are very impoartnt here
  //it is smoothable to exclude stuff like greetings
  //also emotion

  addReason(statement) {}
}
