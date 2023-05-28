import React, { useState } from "react";
// import { PDFViewer } from "react-pdf";
import { PDFViewer } from "@react-pdf/renderer";
import { Page, Document } from "react-pdf/dist/esm/entry.webpack";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { Card, CardContent } from "@mui/material";

const FrIa02 = () => {
  const fileUrl = `http://127.0.0.1:8000/api/ia02/Ars0xqquJFNsW29TOznPsGWQonLwVnVTtdmtdNtG.pdf`;

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  return (
    <div>
      <Card className="shadow-lg h-full">
        <CardContent>
          <div className="text-center font-bold pb-6 text-xl text-gray-800">
            FR.IA.02. TUGAS PRAKTIK DEMONSTRASI
            <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
          </div>
          {/* <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
            <Page
              pageNumber={pageNumber}
              renderAnnotationLayer={false}
              className="border border-gray-300 bg-gray-400  flex justify-center"
              width={800}
            />
          </Document> */}
          <div className="flex justify-center">
            <embed
              src={fileUrl}
              type="application/pdf"
              width="1000"
              height="800"
            />
          </div>
        </CardContent>
      </Card>

      {/* <div>
          
        </div> */}
      {/* <PDFViewer className="border border-gray-300" width="1000" height="800"> */}
      {/* </PDFViewer> */}
      {/* <p>
          Page {pageNumber} of {numPages}
        </p> */}

      {/* <div className="flex justify-between">
          <button onClick={() => setPageNumber(pageNumber - 1)}>back</button>
          <button onClick={() => setPageNumber(pageNumber + 1)}>next</button>
        </div> */}
    </div>
  );
};

export default FrIa02;
