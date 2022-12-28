import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import pdfUrl from "../../asstes/456.pdf";

export default function PDF(){
  const [pageTotal, setPageTotal] = useState(1); //pdf总页数
  const onLoadSuccess = (obj) => {
    setPageTotal(obj.numPages);
  };
  return <Document
  renderMode="canvas"
  file={pdfUrl}
  loading={<div>加载中，请等待!</div>}
  onLoadSuccess={onLoadSuccess}
  noData={null}
>
  {new Array(pageTotal + 1).fill("").map((_, index) => {
    return (
      <div key={index}>
        <Page
          noData={null}
          width={document.body.getBoundingClientRect().width}
          key={index}
          pageNumber={index}
          renderAnnotationLayer={false}
          renderTextLayer={false}
        />
        <br />
      </div>
    );
  })}
</Document>
}