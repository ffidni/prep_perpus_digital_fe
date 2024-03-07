'use client';

import { Controls, DotLottiePlayer } from '@dotlottie/react-player';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ErrorMessage, Formik } from 'formik';
import { GoogleField } from '@/app/components/google-input';
import { renderError } from '@/app/utils/error_text';
import { loginSchema } from '@/app/utils/validations';
import swalError from '@/app/utils/swal_error';
import showSwalLoading from '@/app/utils/swal_loading';
import { ApiService } from '@/app/network/services';
import Swal from 'sweetalert2';

function Login() {
  const [loginStep, setLoginStep] = useState(1);
  const [isGoogle, setIsGoogle] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center h-screen px-10">
      {loginStep == 1 ? (
        <LoginChoice setLoginStep={setLoginStep} />
      ) : (
        <LoginWithMaca setLoginStep={setLoginStep} />
      )}
    </div>
  );
}

function LoginChoice({ setLoginStep }) {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center items-center  rounded-md border-4 w-auto h-auto px-14 py-14 hover:box-shadow transition-all bg-white">
      <p className="text-gray-500 font-bold text-xl mb-5">e-Maca</p>

      <DotLottiePlayer
        src="/animations/book-flying.lottie"
        autoplay
        speed={1.5}
        loop
        className=" w-48"
      ></DotLottiePlayer>
      <p className="text-lg mb-1 font-semibold">
        Membaca lebih <span className="text-blue-600">menyenangkan&nbsp;</span>
        dan
        <span className="text-green-600">&nbsp;dimana saja</span>
      </p>
      <p className="text-sm font-lg">
        Ayo login dan akses semua fitur dari e-Maca!
      </p>

      <div className="flex-col justify-start">
        <a className="btn-primary bg-white flex items-center border-2 border-gray-300 mt-8 btn">
          <Image
            src="/icons/google.png"
            alt="404"
            width={24}
            height={24}
            className="mr-5"
          />
          <p className="text-black">Login dengan Google</p>
        </a>

        <a
          className="btn-primary bg-white flex items-center border-2 border-gray-300 mt-3"
          onClick={() => setLoginStep((old) => (old += 1))}
        >
          <FontAwesomeIcon icon={faUser} className="text-black ml-1 mr-6" />

          <p className="text-black">Login dengan Akun e-Maca</p>
        </a>

        <p className="font-semibold text-sm text-center mt-5">
          Belum punya akun?{' '}
          <span
            className="text-red-600 btn"
            onClick={() => router.replace('/auth//register')}
          >
            Daftar
          </span>
        </p>
      </div>
    </div>
  );
}

function LoginWithMaca({ setLoginStep }) {
  const router = useRouter();
  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  async function submitLogin(request) {
    showSwalLoading({
      text: 'Sistem sedang memproses formulir anda',
    });
    try {
      await ApiService.login({ ...request, email: request.username });
      Swal.fire({
        titleText: 'Login Berhasil!',
        text: 'Anda akan dialihkan ke halaman utama...',
        timer: 1000,
        willClose: () => {
          router.push('/explore');
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
    <div className="flex flex-col gap-10 justify-center items-center rounded-md border-4 w-auto h-auto px-10 py-5   hover:box-shadow transition-all bg-white">
      <div>
        <DotLottiePlayer
          src="/animations/book-flying.lottie"
          autoplay
          speed={1.5}
          loop
          className=" w-48"
        ></DotLottiePlayer>
        <p className="font-semibold">Login dengan akun e-Maca</p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={submitLogin}
      >
        {(formik) => {
          const { values, handleChange, handleSubmit } = formik;
          return (
            <div className="flex flex-col gap-5">
              <div>
                <GoogleField
                  placeholder="Username/email"
                  bg={'bg-gray-50'}
                  width={'sm:w-80'}
                  onChanged={handleChange('username')}
                  values={values.username}
                />
                <ErrorMessage name="username" render={renderError} />
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

              <div className="flex items-center justify-center gap-2 pt-4">
                <a
                  className=" btn text-center flex-1 btn-primary bg-red-400 hover:bg-gray-50 hover:text-red-500 text-white"
                  onClick={() => setLoginStep((old) => (old -= 1))}
                >
                  Back
                </a>
                <a
                  onClick={handleSubmit}
                  className="btn btn-primary text-white hover:text-blue-500 bg-blue-500 hover:bg-white flex-1 "
                >
                  Login
                </a>
              </div>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export default Login;
