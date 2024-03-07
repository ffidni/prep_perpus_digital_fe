import Swal from 'sweetalert2';

export default function swalError(error) {
  Swal.fire({
    titleText: 'Terjadi Kesalahan!',
    text: error,
  });
}
