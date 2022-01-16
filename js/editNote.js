const indexNote = Number(window.location.href.split('?#')[1]);
const simplemde = new SimpleMDE({
  element: document.getElementById('body_note'),
});
simplemde.isPreviewActive(); // returns boolean
document.addEventListener('DOMContentLoaded', function () {
  const elemsModals = document.querySelectorAll('.modal');
  const elemsSidenav = document.querySelectorAll('.sidenav');

  M.Modal.init(elemsModals);
  M.Sidenav.init(elemsSidenav);

  document.body.classList.remove('bckg_imgs');

  setInfoUser();
  getInfoNote();

  document.querySelector('#btn_save').addEventListener('click', saveNote);
  document
    .querySelector('#inactive_note')
    .addEventListener('click', inactiveNote);
});

function getInfoNote() {
  const notes = getData('noteMaterialize');
  const note = notes.notes[indexNote];

  document.querySelector('#title_note').value = note.title;
  simplemde.value(note.body);

  M.updateTextFields();
}

function saveNote() {
  try {
    const info = getData('noteMaterialize');
    const noteOld = info.notes[indexNote];

    const noteTitle = document.querySelector('#title_note').value;
    const body_note = simplemde.value();

    const updateNote = {
      title: noteTitle,
      body: body_note,
      status: noteOld.status,
      create: noteOld.create,
      update: new Date(),
    };

    info.notes[indexNote] = updateNote;

    setData('noteMaterialize', info);

    Swal.fire({
      title: 'Nota salva!',
      text: 'Voltar a página inicial ?',
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#26A69A',
      cancelButtonColor: '#90A4AE',
      confirmButtonText: 'Sim!',
      cancelButtonText: 'Não!',
    }).then(function (result) {
      if (result.isConfirmed) {
        goBack();
      }
    });
  } catch (error) {
    Swal.fire({
      title: 'Erro ao salvar nota!',
      icon: 'error',
      confirmButtonColor: '#90A4AE',
      showConfirmButton: false,
    });
  }
}

function inactiveNote() {
  Swal.fire({
    title: 'Arquivar a nota?',
    text: 'A nota não irá aparecer na página inicial!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#26A69A',
    cancelButtonColor: '#90A4AE',
    confirmButtonText: 'Arquivar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      const info = getData('noteMaterialize');
      info.notes[indexNote].status = 0;

      setData('noteMaterialize', info);

      Swal.fire({
        title: 'Nota arquivada',
        icon: 'success',
        confirmButtonColor: '#90A4AE',
        showConfirmButton: false,
      }).then(() => {
        goBack();
      });
    }
  });
}

function goBack() {
  const newUrl = window.location.origin + '/index.html';
  location.replace(newUrl);
}
