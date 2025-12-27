import "quill/dist/quill.snow.css";
import Quill from "quill";
import { useEffect, useRef, useState } from "react";
import "../styles.css";
import { io } from "socket.io-client";

const TextEditor = () => {
  const wrapperRef = useRef();
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();

  const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
  ];

  useEffect(() => {
    const s = io("http://localhost:3000");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    wrapperRef.current.innerHTML = "";

    const editor = document.createElement("div");
    wrapperRef.current.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });

    setQuill(q);

    return () => {
      if (wrapperRef.current) {
        wrapperRef.current.innerHTML = "";
      }
    };
  }, []);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta, oldDelt, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta) => {
      quill.updateContents(delta);
    };

    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  console.log(quill);
  return <div className="container" ref={wrapperRef}></div>;
};

export default TextEditor;
