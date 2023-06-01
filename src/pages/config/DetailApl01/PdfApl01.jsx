import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Box } from "@mui/material";

const CanvasPdf = ({ componentRef }) => {
  return (
    <div
      className=""
      ref={componentRef}
      style={{
        width: "100%",
        height: window.innerHeight,
        paddingTop: "94px",
        paddingLeft: "94px",
        paddingBottom: "75px",
        paddingRight: "75px",
        fontSize: "11px",
      }}
    >
      <div>
        <h1
          style={{ fontSize: "12px", fontWeight: "bold", marginBottom: "16px" }}
        >
          FR.APL.01. PERMOHONAN SERTIFIKASI KOMPETENSI
        </h1>
        <div className="">
          <h2
            style={{ fontSize: "12px", fontWeight: 600, marginBottom: "12px" }}
          >
            Bagian 1 : Rincian Data Pemohon Sertifikasi
          </h2>
          <p>
            Pada bagian ini, cantumlan data pribadi, data pendidikan formal
            serta data pekerjaan anda pada saat ini.
          </p>
          nnfmdf
          <ol
            style={{
              listStyleType: "lower-alpha",
              marginLeft: "12px",
              marginTop: "12px",
            }}
          >
            <li style={{ fontWeight: "bold" }}>
              <span>Data Pribadi</span>
              <div style={{ fontWeight: "normal", marginTop: "10px" }}>
                <div>
                  <div style={{ display: "flex" }}>
                    <div style={{ width: "25%" }}>Nama Lengkap</div>
                    <div>:</div>
                    <div
                      style={{
                        width: "100%",
                        borderBottomWidth: "1px",
                        paddingBottom: "2px",
                        borderColor: "rgb(0 0 0)",
                        marginLeft: "10px",
                      }}
                    >
                      andrian
                    </div>
                  </div>
                  <div style={{ display: "flex", marginTop: "8px" }}>
                    <div style={{ width: "25%" }}>No. KTP/NIK/Paspor</div>
                    <div>:</div>
                    <div
                      style={{
                        width: "100%",
                        borderBottomWidth: "1px",
                        paddingBottom: "2px",
                        borderColor: "rgb(0 0 0)",
                        marginLeft: "10px",
                      }}
                    >
                      2328739237940
                    </div>
                  </div>

                  <div style={{ display: "flex", marginTop: "8px" }}>
                    <div style={{ width: "25%" }}>Tempat / tgl. Lahir</div>
                    <div>:</div>
                    <div
                      style={{
                        width: "100%",
                        borderBottomWidth: "1px",
                        paddingBottom: "2px",
                        borderColor: "rgb(0 0 0)",
                        marginLeft: "10px",
                      }}
                    >
                      Tulungagung
                    </div>
                  </div>

                  <div style={{ display: "flex", marginTop: "8px" }}>
                    <div style={{ width: "25%" }}>Jenis kelamin</div>
                    <div>:</div>
                    <div
                      style={{
                        width: "100%",
                        borderBottomWidth: "1px",
                        paddingBottom: "2px",
                        borderColor: "rgb(0 0 0)",
                        marginLeft: "10px",
                      }}
                    >
                      Laki Laki
                    </div>
                  </div>

                  <div style={{ display: "flex", marginTop: "8px" }}>
                    <div style={{ width: "25%" }}>Kebangsaan</div>
                    <div>:</div>
                    <div
                      style={{
                        width: "100%",
                        borderBottomWidth: "1px",
                        paddingBottom: "2px",
                        borderColor: "rgb(0 0 0)",
                        marginLeft: "10px",
                      }}
                    >
                      Indonesia
                    </div>
                  </div>

                  <div style={{ display: "flex", marginTop: "8px" }}>
                    <div style={{ width: "25%" }}>Alamat rumah</div>
                    <div>:</div>
                    <div
                      style={{
                        width: "100%",
                        borderBottomWidth: "1px",
                        paddingBottom: "2px",
                        borderColor: "rgb(0 0 0)",
                        marginLeft: "10px",
                      }}
                    >
                      Kedungwaru, Tulungagung
                    </div>
                  </div>

                  <div style={{ display: "flex", marginTop: "8px" }}>
                    <div style={{ width: "25%" }}>No. Telepon/E-mail</div>
                    <div>:</div>
                    <div
                      style={{
                        width: "100%",
                        borderBottomWidth: "1px",
                        paddingBottom: "2px",
                        borderColor: "rgb(0 0 0)",
                        marginLeft: "10px",
                      }}
                    >
                      Kedungwaru, Tulungagung
                    </div>
                  </div>

                  <div style={{ display: "flex", marginTop: "8px" }}>
                    <div style={{ width: "25%" }}>Kualifikasi Pendidikan</div>
                    <div>:</div>
                    <div
                      style={{
                        width: "100%",
                        borderBottomWidth: "1px",
                        paddingBottom: "2px",
                        borderColor: "rgb(0 0 0)",
                        marginLeft: "10px",
                      }}
                    >
                      SMA
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li style={{ fontWeight: "bold", marginTop: "12px" }}>
              <span>Data Pekerjaan Sekarang</span>
              <div style={{ fontWeight: "normal", marginTop: "10px" }}>
                <p>halo</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
      {/* </Box> */}
    </div>
  );
};

const PdfApl01 = () => {
  //   const [loader, setLoader] = useState(false);
  const pageStyle = `
  @page {
    size: A4;
    margin: 0;
  }
    `;
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "emp-data",
    onAfterPrint: () => alert("Print Success"),
    pageStyle: pageStyle,
  });

  return (
    <div>
      <h1>PDF Example</h1>
      <CanvasPdf componentRef={componentRef} />
      <button onClick={handlePrint}>Print This out</button>
    </div>
  );
};

export default PdfApl01;
