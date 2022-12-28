import create from "zustand";

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
  },
}));

export default useApl01Store;
