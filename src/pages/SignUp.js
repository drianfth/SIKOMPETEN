import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as LinkRouter } from "react-router-dom";
import Logo from "../assets/Image/Logo.png";
import { useFormik } from "formik";
import * as yup from "yup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Alert from "../components/Alert";
import useAuth from "../hooks/useAuth";
import useAuthStore from "../context/userAuthStore";
import { Navigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <LinkRouter to="/">SIKOMPETEN</LinkRouter> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const validationSchema = yup.object({
  email: yup
    .string("Masukkan Email")
    .email("Masukkan Email yang Valid")
    .required("Email tidak boleh kosong"),
  password: yup
    .string("Masukkan Password")
    .min(8, "password minimal 8 karakter")
    .required("Password tidak boleh kosong"),
  name: yup.string("Masukkan Nama").required("Nama Lengkap tidak boleh kosong"),
  jns_kelamin: yup
    .string("Masukkan Jenis Kelamin")
    .required("jenis kelamin tidak boleh kosong"),
  no_telp: yup
    .string("Masukkan No Telepon")
    .required("nomor telepon tidak boleh kosong"),
});

const SignUpPage = () => {
  const { loading, error, registerAccount } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      no_telp: "",
      role: "asesi",
      jns_kelamin: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      registerAccount(values);
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="flex items-center  min-h-screen">
        <Container
          component="main"
          className=" px-6 py-4 bg-white border border-gray-200 rounded-lg shadow-lg  max-w-3xl"
        >
          <CssBaseline />

          <div className="flex flex-col items-center py-5">
            <img src={Logo} className="w-10 h-10" alt="" />

            <Typography className="text-2xl font-semibold mt-4 text-gray-600">
              Daftar SIKOMPETEN
            </Typography>
          </div>
          {error && <Alert message={error.data.message} error={true} />}

          <form onSubmit={formik.handleSubmit}>
            <div className="">
              <TextField
                margin="normal"
                required
                fullWidth
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                label="Nama Lengkap"
                type="text"
                autoFocus
              />
              <div className="flex space-x-2">
                <div className="w-1/2">
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    autoComplete="email"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    autoComplete="current-password"
                  />
                </div>
                <div className=" w-1/2">
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="no_telp"
                    value={formik.values.no_telp}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.no_telp && Boolean(formik.errors.no_telp)
                    }
                    helperText={formik.touched.no_telp && formik.errors.no_telp}
                    label="Nomer Telepon"
                    type="text"
                  />
                  <FormControl fullWidth className="mt-4">
                    <InputLabel id="demo-simple-select-label">
                      Jenis Kelamin
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Jenis Kelamin"
                      name="jns_kelamin"
                      select
                      value={formik.values.jns_kelamin}
                      onChange={formik.handleChange}
                    >
                      <MenuItem value="laki-laki">Laki Laki</MenuItem>
                      <MenuItem value="perempuan">Perempuan</MenuItem>
                      <MenuItem value="lainnya">Lainnya</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
            {loading ? (
              <Button
                // type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                className="bg-sky-700"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 mr-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Loading...
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                className="bg-sky-700"
              >
                Daftar
              </Button>
            )}
          </form>
          <Grid container>
            <Grid item className="w-full text-center">
              <LinkRouter
                to="/login"
                className="underline text-sky-600  decoration-solid"
              >
                {"apakah anda punya akun? Login"}
              </LinkRouter>
            </Grid>
          </Grid>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default function SignUp() {
  const { user } = useAuthStore();

  return user ? <Navigate to={-1} /> : <SignUpPage />;
}
