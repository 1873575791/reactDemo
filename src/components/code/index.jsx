import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
import { useState } from "react";
import "ace-builds/src-noconflict/ext-language_tools";
import 'ace-builds/webpack-resolver';

export default function Code() {
  const [value, setValue] = useState();
  const onChange = (newValue) => {
    setValue(newValue);
  };

  const onBlur = async () => {
    try {
      const res = await JSON.parse(value);
      console.log(res);
    }catch(e){
      alert('输入格式不正确');
    }
    
  }
  return (
    <div>
      <AceEditor
        value={value}
        mode="json"
        theme="github"
        enableBasicAutocompletion
        enableLiveAutocompletion
        enableSnippets
        fontSize={14}
        // readOnly={true}
        onChange={onChange}
        onBlur={onBlur}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
      />
    </div>
  );
}
