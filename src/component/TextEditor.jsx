import "quill/dist/quill.snow.css";
import Quill from "quill";
import { useEffect, useRef } from "react";
import "../styles.css";

const TextEditor = () => {
  const wrapperRef = useRef();

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
    wrapperRef.innerHTML = "";

    const editor = document.createElement("div");
    wrapperRef.current.append(editor);
    new Quill(editor, { theme: "snow", modules: { toolbar: TOOLBAR_OPTIONS } });

    return () => {
      wrapperRef.innerHTML = "";
    };
  }, []);
  return <div className="container" ref={wrapperRef}></div>;
};

export default TextEditor;
