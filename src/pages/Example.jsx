import React, { useState } from "react";
import ReactQuill from "react-quill";

const Example = () => {
  const [value, setValue] = useState("");

  var toolbarOptions = [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: ["", "center", "justify"] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["link", "image"],
    ["clean"],
  ];
  return (
    <div>
      <ReactQuill
        theme="snow"
        // modules={{ toolbar: { container: toolbarOptions } }}
        modules={{
          toolbar: {
            container: toolbarOptions,
          },
        }}
        value={value}
        onChange={setValue}
        placeholder="Content..."
      />
    </div>
  );
};

export default Example;
