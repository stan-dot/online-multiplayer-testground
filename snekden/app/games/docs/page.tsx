"use client";
import "quill/dist/quill.snow.css"

import { useEffect, useRef, useState } from "react";
import TextEditor from "./TextEditor";


export default function Docs() {


  return (
    <div>
      <TextEditor />
    </div>
  );
}
