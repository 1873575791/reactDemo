import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
// import "ace-builds/src-noconflict/ext-language_tools";

export default function Code() {
  const onChange = (newValue) => {
    console.log("change", newValue);
  };
  return (
    <div>
      <AceEditor
        mode="json"
        theme="github"
        fontSize={14}
        readOnly={true}
        onChange={onChange}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
      />
    </div>
  );
}
