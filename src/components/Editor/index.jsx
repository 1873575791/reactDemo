import React, { useState, useEffect } from "react";
import BraftEditor from "braft-editor";
import ColorPicker from "braft-extensions/dist/color-picker";
import CodeHighlighter from "braft-extensions/dist/code-highlighter";
import { codeOptions } from "./codeConfig";

import "braft-editor/dist/index.css";
import "braft-extensions/dist/color-picker.css";
import "braft-extensions/dist/code-highlighter.css";

import "./index.scss";

export default function MyEditor(props) {
  const { content, controls, getEditorHtml, readOnly, isPreview } = props;
  const [editorState, setEditorState] = useState(""); // 设置编辑器初始内容

  BraftEditor.use(ColorPicker({ theme: "light" })); // 颜色扩展
  BraftEditor.use(CodeHighlighter(codeOptions)); // code扩展

  useEffect(() => {
    setEditorState(BraftEditor.createEditorState(content));
  }, []);

  // 预览方法
  const preview = () => {
    if (window.previewWindow) {
      window.previewWindow.close()
    }

    window.previewWindow = window.open()
    window.previewWindow.document.write(buildPreviewHtml())
    window.previewWindow.document.close()
  }

  const extendControls = [
    {
      key: 'custom-button',
      type: 'button',
      text: '预览',
      onClick: preview
    }
  ]

  // 内容展示
  const buildPreviewHtml =()=> {

    return `
      <!Doctype html>
      <html>
        <head>
          <title>富文本内容预览</title>
          <style>
            html,body{
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
              background-color: #f1f2f3;
            }
            .container{
              box-sizing: border-box;
              width: 1000px;
              max-width: 100%;
              min-height: 100%;
              margin: 0 auto;
              padding: 30px 20px;
              overflow: hidden;
              background-color: #fff;
              border-right: solid 1px #eee;
              border-left: solid 1px #eee;
            }
            .container img,
            .container audio,
            .container video{
              max-width: 100%;
              height: auto;
            }
            .container p{
              white-space: pre-wrap;
              min-height: 1em;
            }
            .container pre{
              padding: 15px;
              background-color: #f1f1f1;
              border-radius: 5px;
            }
            .container blockquote{
              margin: 0;
              padding: 15px;
              background-color: #f1f1f1;
              border-left: 3px solid #d1d1d1;
            }
          </style>
        </head>
        <body>
          <div class="container">${editorState.toHTML()}</div>
        </body>
      </html>
    `

  }

  const handleChange = (editorState) => {
    setEditorState(editorState);
    getEditorHtml(editorState.toHTML());
  };
  return (
    <div className={readOnly ? "editor disable" : "editor"}>
      <div className="editor-wrapper">
        <BraftEditor
          controls={controls}
          readOnly={readOnly}
          extendControls={isPreview ? extendControls : []}
          placeholder='请输入内容'
          id={`editor-with-color-picker`}
          value={editorState}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
