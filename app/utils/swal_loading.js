import Swal from 'sweetalert2';

export default function showSwalLoading({
  titleText,
  text,
  timer,
  allowOutsideClick,
  showConfirmButton,
} = {}) {
  Swal.fire({
    titleText: titleText ?? 'Mohon Ditunggu',
    text: text,
    timer: timer ?? 30000,
    allowOutsideClick: allowOutsideClick ?? false,
    showConfirmButton: showConfirmButton ?? false,
    willOpen: () => {
      Swal.showLoading();
    },
  });
}
