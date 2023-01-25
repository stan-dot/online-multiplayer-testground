import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import { StatementModificationCallbacksObject } from '../../types/StatementModificationCallbacksObject';
import { Statement } from '../../types/TopicTypes';
import { swalWithBootstrapButtons } from './swalWithBootstrapButtons';
const getTextInputOptions: () => SweetAlertOptions<any, any> = () => {
  return {
    title: 'Statement contents',
    input: 'text',
    icon: 'warning',
    inputLabel: 'Type new text',
    inputValue: '',
    confirmButtonText: 'Yes, change it!',
    showCancelButton: true,
    cancelButtonText: 'No, cancel!',
    inputValidator: value => {
      if (!value) {
        return 'You need to write something!';
      }
      return null;
    },
  };
};

export function fireAddPopup(
  callbacks: StatementModificationCallbacksObject,
): void {
  swalWithBootstrapButtons
    .fire(getTextInputOptions())
    .then((result: SweetAlertResult<string>) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons
          .fire('Changed!', 'Statement has been changed.', 'success')
          .then(() => {
            callbacks.add(result.value!);
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'The statement is unchanged',
          'error',
        );
      }
    });
}
