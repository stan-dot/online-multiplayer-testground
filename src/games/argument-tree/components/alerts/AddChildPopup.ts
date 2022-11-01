import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import { StatementModificationCallbacksObject } from '../../types/StatementModificationCallbacksObject';
import { Statement } from '../../types/TopicTypes';
import { swalWithBootstrapButtons } from './swalWithBootstrapButtons';

const selectForOrAgainstOptions: SweetAlertOptions<any, any> = {
  title: 'Select which kind of child',
  input: 'select',
  icon: 'warning',
  confirmButtonText: 'This one',
  showCancelButton: true,
  cancelButtonText: 'No, cancel!',
  inputOptions: {
    support: 'Support',
    oppose: 'Oppose',
  },
  inputPlaceholder: 'Choose an option',
  inputValidator: value => {
    if (value === 'Potato') {
      Swal.fire('wrong choice!', 'Try again!', 'error');
    }
    return '';
  },
};

const inputNewTextOptions: SweetAlertOptions = {
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

export function fireAddChildPopup(
  statement: Statement,
  callbacks: StatementModificationCallbacksObject,
): void {
  swalWithBootstrapButtons
    .fire(selectForOrAgainstOptions)
    .then((result: SweetAlertResult<string>) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons
          .fire(inputNewTextOptions)
          .then((text: SweetAlertResult<string>) => {
            const newIsSupportive: boolean = result.value === 'Support';
            // todo error handling
            const borrowsedStatement: Statement = callbacks.add(text.value!);
            const newStatement: Statement = {
              title: result.value ?? '',
              id: statement.id,
              supportingChildren: newIsSupportive
                ? statement.supportingChildren.concat(borrowsedStatement)
                : statement.supportingChildren,
              opposingChildren: newIsSupportive
                ? statement.opposingChildren
                : statement.opposingChildren.concat(borrowsedStatement),
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
