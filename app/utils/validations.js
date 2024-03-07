import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
  nama: Yup.string()
    .min(2, 'Nama minimal 2 huruf')
    .max(100, 'Panjang nama maksimal adalah 100 karakter')
    .required('Nama harus diisi!'),
  email: Yup.string().email('Email tidak valid').required('Email harus diisi'),
  username: Yup.string().required('Username harus diisi'),
  password: Yup.string()
    .required('Password harus diisi')
    .min(6, 'Password minimal 6 karakter'),
  alamat: Yup.string()
    .required('Alamat harus diisi')
    .min(6, 'Alamat terlalu pendek, sertakan alamat yang detail'),
});

export const loginSchema = Yup.object().shape({
  username: Yup.string().required('Username/email harus diisi'),
  password: Yup.string()
    .required('Password harus diisi')
    .min(6, 'Password minimal 6 karakter'),
});
