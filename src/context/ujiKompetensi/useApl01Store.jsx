import create from "zustand";
import kelengkapanApi from "../../api/kelengkapan";

import InitialKelengkapan from "../../data/kelengkapan.json";
import useFetchAuth from "../../hooks/useFetchAuth";

// const kelengkapan = () => {
//   let obj = {};
//   for (let index = 0; index < InitialKelengkapan.length; index++) {
//     obj["kelengkapan" + InitialKelengkapan[index].id] = "";
//   }
//   return obj;
// };

// const field = kelengkapan();

const useApl01Store = create((set, get) => ({
  dataApl01: {
    schema_id: "",
    user_id: "",
    name: "",
    kk_ktp_paspor: "",
    tempat_lhr: "",
    tgl_lahir: new Date(),
    jns_kelamin: "",
    kebangsaan: "",
    alamat: "",
    no_telp: "",
    email: "",
    pendidikan: "",
    kode_pos: "",
    perusahaan: "",
    jabatan: "",
    almt_kantor: "",
    telp_kantor: "",
    email_kantor: "",
    kode_pos_kantor: "",
    fax: "",
    tujuan_asesmen: "",
    // ...field,
  },
  getKelengkapan: async (id) => {
    try {
      const res = await kelengkapanApi({
        url: `http://127.0.0.1:8000/api/kelengkapan/${id}`,
      });
      get().setKelengkapan(res.data);
      console.log("data", res.data);
      console.log("data2", get().dataApl01);
    } catch (error) {
      console.log(error.response);
    }
  },
  setKelengkapan: (kel) => {
    let obj = {};
    for (let index = 0; index < kel.length; index++) {
      obj["kelengkapan" + kel[index].id] = "";
    }
    set(() => ({
      dataApl01: { ...get().dataApl01, ...obj },
    }));
  },
}));

export default useApl01Store;
