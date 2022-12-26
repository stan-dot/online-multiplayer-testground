import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import { Topic } from '../../types/TopicTypes';
import { swalWithBootstrapButtons } from './swalWithBootstrapButtons';

const getTextInputOptions: () => SweetAlertOptions<any, any> = () => {
  return {
    title: 'Define new topic',
    input: 'text',
    icon: 'warning',
    inputLabel: 'Type the question for the topic',
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

// todo add tags addition fire window. the object should be passed along the pipeline, along with the callback.
// make all of that here, then only refactor
export function fireNewTopicPopup(
  getTopicCallback: (question: string) => Topic,
  addFunction: (t: Topic) => void,
): void {
  swalWithBootstrapButtons
    .fire(getTextInputOptions())
    .then((result: SweetAlertResult<string>) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons
          .fire('Changed!', 'Statement has been changed.', 'success')
          .then(() => {
            const t = getTopicCallback(result.value!);
            addFunction(t);
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
