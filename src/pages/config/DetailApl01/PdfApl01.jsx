import React, { useState, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import "../../../custom.css";
import { QRCodeSVG } from "qrcode.react";
import { useLocation } from "react-router-dom";

const Bagian1 = ({ data }) => {
  // console.log(data);
  return (
    <div className="">
      <h2
        style={{
          fontSize: "12px",
          fontWeight: 600,
          marginBottom: "12px",
        }}
      >
        Bagian 1 : Rincian Data Pemohon Sertifikasi
      </h2>
      <p>
        Pada bagian ini, cantumlan data pribadi, data pendidikan formal serta
        data pekerjaan anda pada saat ini.
      </p>
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
                  {data?.name}
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
                  {data?.kk_ktp_paspor}
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
                  {data?.tempat_lhr}
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
                  {data?.jns_kelamin}
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
                  {data?.kebangsaan}
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
                  {data?.alamat}
                </div>
              </div>

              <div style={{ display: "flex", marginTop: "8px" }}>
                <div style={{ width: "25%" }}>Kode pos</div>
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
                  {data?.kode_pos}
                </div>
              </div>

              <div style={{ display: "flex", marginTop: "8px" }}>
                <div style={{ width: "25%" }}>No. Telepon/E-mail</div>
                <div>:</div>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    marginLeft: "10px",
                  }}
                >
                  <div style={{ display: "flex", width: "50%" }}>
                    <div style={{ width: "25%" }}>No. HP</div>
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
                      {data?.no_telp}
                    </div>
                  </div>
                  <div style={{ display: "flex", width: "50%" }}>
                    <div style={{ width: "25%" }}>E-mail</div>
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
                      {data?.email}
                    </div>
                  </div>
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
                  {data?.pendidikan}
                </div>
              </div>
            </div>
          </div>
        </li>
        <li style={{ fontWeight: "bold", marginTop: "12px" }}>
          <span>Data Pekerjaan Sekarang</span>
          <div style={{ fontWeight: "normal", marginTop: "10px" }}>
            <div style={{ display: "flex", marginTop: "8px" }}>
              <div style={{ width: "25%" }}>Nama Institusi / Perusahaan</div>
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
                {data?.perusahaan}
              </div>
            </div>

            <div style={{ display: "flex", marginTop: "8px" }}>
              <div style={{ width: "25%" }}>Jabatan</div>
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
                {data?.jabatan}
              </div>
            </div>

            <div style={{ display: "flex", marginTop: "8px" }}>
              <div style={{ width: "25%" }}>Alamat Kantor</div>
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
                {data?.almt_kantor || "-"}
              </div>
            </div>

            <div style={{ display: "flex", marginTop: "8px" }}>
              <div style={{ width: "25%" }}>Kode Pos</div>
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
                {data?.kode_pos_kantor || "-"}
              </div>
            </div>
            <div style={{ display: "flex", marginTop: "8px" }}>
              <div style={{ width: "25%" }}>E-mail</div>
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
                {data?.email_kantor || "-"}
              </div>
            </div>

            <div style={{ display: "flex", marginTop: "8px" }}>
              <div style={{ width: "25%" }}>No. Telp/Fax</div>
              <div>:</div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  marginLeft: "10px",
                }}
              >
                <div style={{ display: "flex", width: "50%" }}>
                  <div style={{ width: "25%" }}>Telp</div>
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
                    {data?.telp_kantor || "-"}
                  </div>
                </div>
                <div style={{ display: "flex", width: "50%" }}>
                  <div style={{ width: "25%" }}>Fax</div>
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
                    {data?.fax || "-"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ol>
    </div>
  );
};

const Bagian2 = ({ data, unitKompetensi }) => {
  // console.log(data);
  return (
    <div className="" style={{ marginTop: "16px" }}>
      <h2 style={{ fontSize: "12px", fontWeight: 600, marginBottom: "12px" }}>
        Bagian 2 : Data Sertifikasi
      </h2>
      <p style={{ marginBottom: "4px" }}>
        Tuliskan Judul dan Nomor Skema Sertifikasi yang anda ajukan berikut
        Daftar Unit Kompetensi sesuai kemasan pada skema sertifikasi untuk
        mendapatkan pengakuan sesuai dengan latar belakang pendidikan, pelatihan
        serta pengalaman kerja yang anda miliki.
      </p>
      <div
        style={{
          border: "1px solid black",
          width: "60%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {/* atas */}
        <div
          className=""
          style={{
            display: "flex",
            width: "100%",
            borderBottom: "1px solid black",
          }}
        >
          {/* kiri */}
          <div
            className=""
            style={{
              width: "45%",
              display: "flex",
              borderRight: "1px solid black",
            }}
          >
            <div
              className=""
              style={{ width: "60%", borderRight: "1px solid black" }}
            >
              <div className="" style={{ padding: 6 }}>
                Skema Sertifikasi
              </div>
              <div className="" style={{ padding: 6 }}>
                {data?.schema?.schema_sertifikasi}
              </div>
            </div>
            <div
              className=""
              style={{ width: "30%", borderRight: "1px solid black" }}
            >
              <div
                className=""
                style={{ padding: 6, borderBottom: "1px solid black" }}
              >
                Judul
              </div>
              <div className="" style={{ padding: 6 }}>
                Nomor
              </div>
            </div>
            <div className="" style={{ width: "10%" }}>
              <div
                className=""
                style={{
                  padding: 6,
                  borderBottom: "1px solid black",
                  textAlign: "center",
                }}
              >
                :
              </div>
              <div className="" style={{ padding: 6, textAlign: "center" }}>
                :
              </div>
            </div>
          </div>

          {/* Kanan */}
          <div className="" style={{ width: "55%" }}>
            <div
              className=""
              style={{ padding: 6, borderBottom: "1px solid black" }}
            >
              {data?.schema?.name}
            </div>
            <div className="" style={{ padding: 6 }}>
              {data?.schema?.nomor}
            </div>
          </div>
        </div>

        {/* bawah */}
        <div className="" style={{ display: "flex" }}>
          {/* kiri */}
          <div className="" style={{ display: "flex", width: "45%" }}>
            <div
              className=""
              style={{
                padding: 6,
                width: "89.5%",
                borderRight: "1px solid black",
              }}
            >
              Tujuan Asesmen
            </div>
            <div
              className=""
              style={{
                padding: 6,
                width: "10.5%",
                borderRight: "1px solid black",
              }}
            >
              :
            </div>
          </div>
          {/* kanan */}
          <div className="" style={{ padding: 6, width: "55%" }}>
            {data?.tujuan_asesmen}
          </div>
        </div>
      </div>
      <div className="">
        <h1
          style={{ marginTop: "16px", marginBottom: "6px", fontWeight: "bold" }}
        >
          Daftar Unit Kompetensi sesuai kemasan:{" "}
        </h1>
        <table className="pdfTableApl1">
          <thead style={{ backgroundColor: "#D6E3BC" }}>
            <tr>
              <th>No</th>
              <th>Kode Unit</th>
              <th>Judul Unit</th>
              <th style={{ width: "20%" }}>
                Jenis Standar (Standar Khusus/Standar Internasional/SKKNI)
              </th>
            </tr>
          </thead>
          <tbody>
            {unitKompetensi?.map((unit, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{unit?.kode_unit}</td>
                <td style={{ textAlign: "left" }}>
                  {" "}
                  <span style={{ marginLeft: "4px" }}>{unit?.judul_unit}</span>
                </td>
                <td>{unit?.jenis_standar}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Bagian3 = ({ data }) => {
  // console.log(data);
  const [ttdAsesi, setTtdAsesi] = useState(null);
  const [ttdAdmin, setTtdAdmin] = useState(null);

  useEffect(() => {
    const ttdAsesiTempt = `tanggal=${data?.created_at}&namaAsesi=${data?.name}`;
    if (data?.admin_id) {
      const ttdAdminTempt = `tanggal=${data?.updated_at}&namaAsesi=${data?.admin?.name}`;
      setTtdAdmin(ttdAdminTempt);
    }
    setTtdAsesi(ttdAsesiTempt);
  }, [data]);

  return (
    <div className="" style={{ marginTop: "16px" }}>
      <h1 style={{ fontSize: "12px", fontWeight: 600, marginBottom: "12px" }}>
        Bagian 3 : Bukti Kelengkapan Pemohon
      </h1>
      <h2
        style={{ marginTop: "16px", marginBottom: "6px", fontWeight: "bold" }}
      >
        Bukti Persyaratan Dasar Pemohon
      </h2>
      <div className="">
        <table className="tg">
          <thead>
            <tr>
              <th className="tg-c3do" rowSpan="2">
                No.
              </th>
              <th className="tg-c3do" rowSpan="2">
                Bukti Persyaratan Dasar
              </th>
              <th className="tg-c3do" colSpan="2">
                Ada
              </th>
              <th className="tg-c3do" rowSpan="2">
                Tidak Ada
              </th>
            </tr>
            <tr>
              <th className="tg-c3do">Memenuhi Syarat</th>
              <th className="tg-c3do">Tidak Memenuhi Syarat</th>
            </tr>
          </thead>
          <tbody>
            {data?.r_kelengkapans.map((kel, index) => (
              <tr key={index}>
                <td className="tg-0pky">{index + 1}</td>
                <td className="tg-0pky">{kel?.kelengkapan}</td>
                <td className="tg-0pky radio" style={{ textAlign: "center" }}>
                  {" "}
                  <input
                    readOnly
                    type="radio"
                    name={`${kel?.id}`}
                    checked={kel?.jawaban_kelengkapan === "ada memenuhi syarat"}
                  />
                </td>
                <td className="tg-0pky radio" style={{ textAlign: "center" }}>
                  {" "}
                  <input
                    readOnly
                    type="radio"
                    name={`${kel?.id}`}
                    checked={
                      kel?.jawaban_kelengkapan === "ada tidak memenuhi syarat"
                    }
                  />
                </td>
                <td className="tg-0pky radio" style={{ textAlign: "center" }}>
                  <input
                    readOnly
                    type="radio"
                    name={`${kel?.id}`}
                    checked={kel?.jawaban_kelengkapan === "tidak ada"}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        className=""
        style={{
          border: "1px solid black",
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "18px",
        }}
      >
        {/* atas */}
        <div
          className=""
          style={{
            display: "flex",
          }}
        >
          {/* kiri */}
          <div
            className=""
            style={{
              padding: "4px",
              borderRight: "1px solid black",
              borderBottom: "1px solid black",
              width: "50%",
            }}
          >
            <h1 style={{ fontWeight: "bold" }}>
              Rekomendasi (diisi oleh LSP):
            </h1>
            <p>Berdasarkan ketentuan persyaratan dasar, maka pemohon: </p>
            <p>
              <span style={{ fontWeight: "bold" }}>
                {data?.status || "Diterima/ Tidak diterima "}{" "}
              </span>
              sebagai peserta sertifikasi
            </p>
          </div>
          {/* kanan */}
          <div
            className=""
            style={{ borderBottom: "1px solid black", width: "50%" }}
          >
            <div
              className=""
              style={{
                fontWeight: "bold",
                padding: "4px",
                borderBottom: "1px solid black",
              }}
            >
              Pemohon/ Kandidat :
            </div>
            <div className="" style={{ display: "flex" }}>
              <div
                className=""
                style={{
                  width: "40%",
                  borderRight: "1px solid black",
                  borderBottom: "1px solid black",
                  padding: "4px",
                }}
              >
                Nama{" "}
              </div>
              <div
                className=""
                style={{
                  width: "60%",
                  borderBottom: "1px solid black",
                  padding: "4px",
                }}
              >
                {data?.name}
              </div>
            </div>
            <div className="" style={{ display: "flex" }}>
              <div
                className=""
                style={{
                  width: "40%",
                  borderRight: "1px solid black",
                  padding: "4px",
                }}
              >
                Tanda tangan/ Tanggal
              </div>
              <div
                className=""
                style={{
                  width: "60%",
                  height: "100px",
                  padding: "4px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <QRCodeSVG
                  value={ttdAsesi}
                  size={60}
                  bgColor={"#ffffff"}
                  fgColor={"#000000"}
                  level={"L"}
                  includeMargin={false}
                />
              </div>
            </div>
          </div>
        </div>
        {/* bawah */}
        <div
          className=""
          style={{
            display: "flex",
          }}
        >
          {/* kiri */}
          <div
            className=""
            style={{
              padding: "4px",
              borderRight: "1px solid black",
              width: "50%",
            }}
          >
            <p>
              <span style={{ fontWeight: "bold" }}>Catatan :</span> tidak ada
            </p>
          </div>
          {/* kanan */}
          <div className="" style={{ width: "50%" }}>
            <div
              className=""
              style={{
                fontWeight: "bold",
                padding: "4px",
                borderBottom: "1px solid black",
              }}
            >
              Admin LSP :
            </div>
            <div className="" style={{ display: "flex" }}>
              <div
                className=""
                style={{
                  width: "40%",
                  borderRight: "1px solid black",
                  borderBottom: "1px solid black",
                  padding: "4px",
                }}
              >
                Nama{" "}
              </div>
              <div
                className=""
                style={{
                  width: "60%",
                  borderBottom: "1px solid black",
                  padding: "4px",
                }}
              >
                {data?.admin?.name || "-"}
              </div>
            </div>
            <div className="" style={{ display: "flex" }}>
              <div
                className=""
                style={{
                  width: "40%",
                  borderRight: "1px solid black",
                  borderBottom: "1px solid black",
                  padding: "4px",
                }}
              >
                No. Reg
              </div>
              <div
                className=""
                style={{
                  width: "60%",
                  borderBottom: "1px solid black",
                  padding: "4px",
                }}
              >
                {data?.admin?.no_reg || "-"}
              </div>
            </div>
            <div
              className="print:bg-red-700"
              style={{ display: "flex" }}
            >
              <div
                // className="print:bg-red-800"
                style={{
                  width: "40%",
                  borderRight: "1px solid black",
                  padding: "4px",
                }}
              >
                Tanda tangan/ Tanggal
              </div>
              <div
                className=""
                style={{
                  width: "60%",
                  height: "100px",
                  padding: "4px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {ttdAdmin && (
                  <QRCodeSVG
                    value={ttdAdmin}
                    size={60}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"L"}
                    includeMargin={false}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CanvasPdf = ({ componentRef, data, unitKompetensi }) => {
  return (
    <div
      className="hidden"
      // className="overflow-y-auto"
      ref={componentRef}
      style={{
        width: "100%",
        height: window.innerHeight,
        fontSize: "11px",
      }}
    >
      <div>
        <h1
          style={{ fontSize: "12px", fontWeight: "bold", marginBottom: "16px" }}
        >
          FR.APL.01. PERMOHONAN SERTIFIKASI KOMPETENSI
        </h1>
        <Bagian1 data={data} />
        <Bagian2 data={data} unitKompetensi={unitKompetensi} />
        <Bagian3 data={data} />
        {/* <QRCodeSVG
          value="adjflsajfdknvkldsd"
          size={128}
          bgColor={"#ffffff"}
          fgColor={"#000000"}
          level={"L"}
          includeMargin={false}
        /> */}
      </div>
      {/* </Box> */}
    </div>
  );
};

const PdfApl01 = () => {
  const [loading, setLoading] = useState(false);
  const componentRef = React.useRef();
  const location = useLocation();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onBeforeGetContent: () => setLoading(true),
    onBeforePrint: () => setLoading(false),
    pageStyle: `@page {
      margin-top: 2.5cm;
      margin-left: 2.5cm;
      margin-bottom: 2cm;
      margin-right: 2cm;
      size: auto
    }
    @media print { body { -webkit-print-color-adjust: exact; } }"
    `,
  });
  // console.log(location);
  return (
    <div className="actual-receipt">
      <h1>PDF Example</h1>
      <CanvasPdf
        componentRef={componentRef}
        data={location.state.data}
        unitKompetensi={location.state.unitKompetensi}
      />
      <button onClick={handlePrint}>
        {!loading ? "Print" : "Donwloading..."}
      </button>
    </div>
  );
};

export default PdfApl01;
