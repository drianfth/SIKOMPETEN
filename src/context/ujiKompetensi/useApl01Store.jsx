import create from "zustand";

import InitialKelengkapan from "../../data/kelengkapan.json";

const kelengkapan = () => {
  let obj = {};
  for (let index = 0; index < InitialKelengkapan.length; index++) {
    obj["kelengkapan" + InitialKelengkapan[index].id] = "";
  }
  return obj;
};

const field = kelengkapan();

const useApl01Store = create((set, get) => ({
  dataApl01: {
    schema: "",
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
    ...field,
  },
}));

export default useApl01Store;
