import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import { StatementModificationCallbacksObject } from '../../types/StatementModificationCallbacksObject';
import { Statement } from '../../types/TopicTypes';
import { swalWithBootstrapButtons } from './swalWithBootstrapButtons';

const getTextInputOptions: (s: Statement) => SweetAlertOptions<any, any> = (
  s: Statement,
) => {
  return {
    title: 'Delete?',
    icon: 'warning',
    inputLabel: 'Are you sure you want to delete this statement?',
    confirmButtonText: 'Yes, delete it!',
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

export function fireDeletePopup(
  statement: Statement,
  callbacks: StatementModificationCallbacksObject,
): void {
  const options: SweetAlertOptions = getTextInputOptions(statement);
  swalWithBootstrapButtons
    .fire(options)
    .then((result: SweetAlertResult<string>) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons
          .fire('Deleted!', 'Statement has been deleted.', 'success')
          .then(() => {
            callbacks.delete(statement);
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'The statement is safe',
          'error',
        );
      }
    });
}
