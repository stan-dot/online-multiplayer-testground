mod random;
mod minesweeper;


use minesweeper::*;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C"{
  fn alert(s:&str);
}

#[wasm_bindgen]
pub fn greet(name:&str){
  alert(&format!("Hello, {}!", name));
}

#[wasm_bindgen(js_name = getState)]
pub fn get_state()->String{
  let ms = Minesweeper::new(10, 10, 5);
  ms.to_string() 
}