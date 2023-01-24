import React, { useCallback, useEffect, useRef, useState } from "react";

import Quill from "quill";
import "./docs.css";
import { io } from "socket.io-client";
import { Socket } from "socket.io";

const TOOLBAR_OPTIONS = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ "header": 1 }, { "header": 2 }], // custom button values
  [{ "list": "ordered" }, { "list": "bullet" }],
  [{ "script": "sub" }, { "script": "super" }], // superscript/subscript
  [{ "indent": "-1" }, { "indent": "+1" }], // outdent/indent
  [{ "direction": "rtl" }], // text direction

  [{ "size": ["small", false, "large", "huge"] }], // custom dropdown
  [{ "header": [1, 2, 3, 4, 5, 6, false] }],

  [{ "color": [] }, { "background": [] }], // dropdown with defaults from theme
  [{ "font": [] }],
  [{ "align": [] }],

  ["clean"], // remove formatting button
];

export default function TextEditor() {
  const [socket, setSocket] = useState({} as Socket);
  const [quill, setQuill] = useState({} as Quill);

  useEffect(() => {
    const s = io('http://localhost:3001');
    //@ts-ignore
    setSocket(s);
    return () => {
      s.disconnect();
    }

  }, [])


  const wrapperRef = useCallback(
    (
      wrapper: any,
    ) => {
      if (wrapper == null) return;
      wrapper.innerHtml = "";
      const editor = document.createElement("div");
      wrapper.append(editor);
      const q = new Quill(editor, {
        modules: { toolbar: TOOLBAR_OPTIONS },
        theme: "snow",
      });

      //@ts-ignore
      setQuill(q);
    },
    [],
  );

  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta: any, oldDelta: any, source: string) => {
      if (source !== 'user')
        return;
      socket.emit('send-changes', delta);
    };
    socket.on('text-change', handler)

    return () => {
      socket.off('text-change', handler);
    }
  }, [socket, quill])

  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta: any) => {
      quill.updateContents(delta)
    };
    socket.on('receive-changes', handler)

    return () => {
      socket.off('receive-changes', handler);
    }
  }, [socket, quill])


  //@ts-ignore
  return (
    <div id="container" className="box-border bg-slate-200" ref={wrapperRef}>
      TextEditor
    </div>
  );
}
