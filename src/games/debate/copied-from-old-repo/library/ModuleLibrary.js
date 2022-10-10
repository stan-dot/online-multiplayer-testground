import Module from "../../Module.js";

export default class Library extends Module {
  libraryList(userSession) {
    var testCounter = 0;
    function resolveAfter2Seconds(x) {
      console.log("resolving the example");
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(x);
        }, 2000);
      });
    }
    function getFiles() {
      console.log("getting the m***** files");
      return new Promise((resolve) => {
        let files = [];
        let fileNames = "";
        userSession.listFiles((file) => {
          testCounter++;
          //files.push(file);
          fileNames += file;
          console.log("file type:" + typeof file);
          //console.log("file name:" + this.getMetadataForFile(file));
        });
        //resolve(files);
        resolve(fileNames);
      });
    }

    async function f1() {
      var x = await resolveAfter2Seconds(10);
      console.log(x); // 10
    }

    async function f2() {
      var x = await getFiles();
      console.log(
        "x type: " +
          typeof x +
          "if array: " +
          Array.isArray(x) +
          "x's length: " +
          x.length +
          " testCounter: " +
          testCounter
      );
      return x;
    }
    f1();

    return f2();

    /*
  async function getFiles(files){
    return await new Promise((resolve, reject) => {
    console.log("getting the files");
    userSession.listFiles((file) => {
         files.push(file);
      });
  });
}

console.log("before calling async function");
  var promise = getFiles(files);
  promise.then(files => {
    console.log("returning files");
    return (files);
  });

  console.log("after calling async function");
  console.log("return type: " + typeof promise);

  return promise;
  */
  }
}
