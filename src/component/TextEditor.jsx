import "quill/dist/quill.snow.css";
import Quill from "quill";
import { useEffect } from "react";

const TextEditor = () => {
  useEffect(() => {
    new Quill("#container", { theme: "snow" });
  }, []);
  return <div id="container"></div>;
};

export default TextEditor;
