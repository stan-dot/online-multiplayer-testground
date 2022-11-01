import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import { StatementModificationCallbacksObject } from '../../types/StatementModificationCallbacksObject';
import { Statement } from '../../types/TopicTypes';
import { swalWithBootstrapButtons } from './swalWithBootstrapButtons';

const getTextInputOptions: (s: Statement) => SweetAlertOptions<any, any> = (
  s: Statement,
) => {
  return {
    title: 'Statement change',
    input: 'text',
    icon: 'warning',
    inputLabel: 'Type new text',
    inputValue: s.title,
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

export function fireEditPopup(
  statement: Statement,
  callbacks: StatementModificationCallbacksObject,
): void {
  const options: SweetAlertOptions = getTextInputOptions(statement);
  swalWithBootstrapButtons
    .fire(options)
    .then((result: SweetAlertResult<string>) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons
          .fire('Changed!', 'Statement has been changed.', 'success')
          .then(() => {
            const newStatement: Statement = {
              title: result.value ?? '',
              id: statement.id,
              supportingChildren: statement.supportingChildren,
              opposingChildren: statement.opposingChildren,
            };
            callbacks.update(newStatement);
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
