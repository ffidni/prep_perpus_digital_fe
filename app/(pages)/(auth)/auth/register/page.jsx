'use client';

import { Controls, DotLottiePlayer } from '@dotlottie/react-player';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleField } from '@/app/components/google-input';
import { Formik, ErrorMessage } from 'formik';
import { registerSchema } from '@/app/utils/validations';
import { renderError } from '@/app/utils/error_text';
import { ApiService } from '@/app/network/services';
import Swal from 'sweetalert2';
import LoadingSpinner from '@/app/components/loading-spinner';
import showSwalLoading from '@/app/utils/swal_loading';

function Register() {
  const [registerStep, setRegisterStep] = useState(1);
  const [isGoogle, setIsGoogle] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center h-screen px-1">
      {registerStep == 1 ? (
        <RegisterChoice setRegisterStep={setRegisterStep} />
      ) : registerStep == 2 ? (
        <RegisterWithMaca setRegisterStep={setRegisterStep} />
      ) : null}
    </div>
  );
}

function RegisterChoice({ setRegisterStep }) {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center  rounded-md border-4 w-auto h-auto px-14 py-14 hover:box-shadow transition-all bg-white">
      <p className="text-gray-500 font-bold text-4xl mb-5">e-Maca</p>
      <DotLottiePlayer
        src="/animations/reading-book.lottie"
        autoplay
        speed={1.5}
        loop
        className=" w-48 items-start justify-start justify-self-start"
      ></DotLottiePlayer>
      <p className="text-lg mb-1 font-semibold">
        Membaca lebih <span className="text-blue-600">menyenangkan&nbsp;</span>
        dan
        <span className="text-green-600">&nbsp;dimana saja</span>
      </p>
      <p className="text-sm font-medium">
        Daftar untuk mendapatkan akun dari layanan penuh di e-Maca
      </p>

      <div className="flex-col items-center justify-center sm:mt-3">
        <a
          href="#"
          className="btn-primary bg-white flex items-center border-2 border-gray-300 mt-8 sm:mt-2 "
        >
          <Image
            src="/icons/google.png"
            alt="404"
            width={24}
            height={24}
            className="mr-5"
          />
          <p className="text-black">Daftar dengan Google</p>
        </a>
        <a
          href="#"
          className="btn-primary bg-white flex items-center border-2 border-gray-300 mt-4 sm:mt-2"
          onClick={() => setRegisterStep((old) => (old += 1))}
        >
          <FontAwesomeIcon icon={faUser} className="text-black ml-1 mr-6" />

          <p className="text-black">Daftar dengan Akun e-Maca</p>
        </a>
      </div>

      <p className="font-semibold text-sm text-center mt-5">
        Sudah punya akun?{' '}
        <span
          className="text-red-600 btn"
          onClick={() => router.replace('/auth//login')}
        >
          Login
        </span>
      </p>
    </div>
  );
}

function RegisterWithMaca({ setRegisterStep }) {
  const router = useRouter();
  const initialValues = {
    nama: '',
    username: '',
    email: '',
    password: '',
    alamat: '',
  };

  async function submitRegister(request) {
    showSwalLoading({
      text: 'Sistem sedang memproses formulir anda',
    });
    try {
      await ApiService.register(request);
      Swal.fire({
        titleText: 'Register Berhasil!',
        text: 'Anda akan dialihkan ke halaman login...',
        timer: 1000,
        willClose: () => {
          router.push('/auth/login');
        },
        showConfirmButton: false,
        allowOutsideClick: false,
      });
    } catch (error) {
      console.log('error: ', error);
      swalError(error);
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-10 justify-center items-center  rounded-md border-4 w-auto h-auto px-10 py-5   hover:box-shadow transition-all bg-white">
      <div className="flex flex-col">
        <DotLottiePlayer
          src="/animations/reading-book.lottie"
          autoplay
          speed={1.5}
          loop
          className=" w-48 items-start justify-start justify-self-start"
        ></DotLottiePlayer>
        <p className="font-semibold">Register dengan e-Maca</p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={submitRegister}
      >
        {(formik) => {
          const { values, handleChange, handleSubmit } = formik;
          return (
            <div className="flex flex-col gap-5 mt-5">
              <div>
                <GoogleField
                  placeholder="Nama"
                  width={'sm:w-80'}
                  bg={'bg-gray-50'}
                  onChanged={handleChange('nama')}
                  values={values.nama}
                />
                <ErrorMessage name="nama" render={renderError} />
              </div>

              <div>
                <GoogleField
                  placeholder="Username"
                  bg={'bg-gray-50'}
                  onChanged={handleChange('username')}
                  values={values.username}
                />
                <ErrorMessage name="username" render={renderError} />
              </div>

              <div>
                <GoogleField
                  placeholder="Email"
                  type="email"
                  bg={'bg-gray-50'}
                  onChanged={handleChange('email')}
                  values={values.email}
                />
                <ErrorMessage name="email" render={renderError} />
              </div>

              <div>
                <GoogleField
                  placeholder="Password"
                  type="password"
                  bg={'bg-gray-50'}
                  onChanged={handleChange('password')}
                  values={values.password}
                />
                <ErrorMessage name="password" render={renderError} />
              </div>

              <div>
                <GoogleField
                  placeholder="Alamat"
                  isTextArea={true}
                  bg={'bg-gray-50'}
                  onChanged={handleChange('alamat')}
                  values={values.alamat}
                />

                <ErrorMessage name="alamat" render={renderError} />
              </div>

              <div className="flex items-center justify-center gap-2">
                <a
                  className=" btn text-center flex-1 btn-primary bg-red-400 hover:bg-gray-50 hover:text-red-500 text-white"
                  onClick={() => setRegisterStep((old) => (old -= 1))}
                >
                  Back
                </a>
                <a
                  onClick={handleSubmit}
                  className="btn btn-primary text-white hover:text-blue-500 bg-blue-500 hover:bg-white flex-1 "
                >
                  Daftar
                </a>
              </div>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export default Register;
