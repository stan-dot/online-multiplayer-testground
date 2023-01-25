import Swal, { SweetAlertResult } from "sweetalert2";

export function PrintImageButton(props: { canvasId: string; }) {
  return <button onClick={() => {
    Swal.fire('Download?', 'Do you want to download this image?', 'question').then((response: SweetAlertResult<boolean>) => {
      if (response.isConfirmed) {
        const c = document.getElementById(props.canvasId) as HTMLCanvasElement;
        const link = document.createElement('a');
        link.download = 'filename.png';
        link.href = c.toDataURL();
        link.click();
      }
    });
  }}>
    Print image contents
  </button>;
}
