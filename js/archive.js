const body = document.body.classList;
document.addEventListener('DOMContentLoaded', function () {
  const elemsModals = document.querySelectorAll('.modal');
  const elemsSidenav = document.querySelectorAll('.sidenav');

  M.Modal.init(elemsModals);
  M.Sidenav.init(elemsSidenav);

  checkLocalStorage();
  setInfoUser();
  getAllNotes();
});

function getAllNotes() {
  const info = getData('noteMaterialize');
  const allNotes = document.querySelector('#allNotes');

  if (info.notes.length > 0) {
    const notesArchive = info.notes.filter((note) => note.status === 0);

    if (notesArchive.length > 0) {
      allNotes.innerHTML = '';
      body.remove('bckg_img');
    }

    if (
      notesArchive.length === 0 &&
      allNotes.children.length !== 0 &&
      allNotes.children[0].nodeName !== 'H5'
    ) {
      resetHtml(allNotes);
    }

    info.notes.forEach((note, index) => {
      if (note.status === 0) {
        const newNotes = `
            <div class="col s6 m3">
              <div class="card lime lighten-5">
                <div class="card-content black-text">
                  <span class="card-title">${note.title}</span>
                  <p>${
                    note.body.length > 0
                      ? `<span class="no_notes left-align create_note_text">Última atualização ${new Date(
                          note.update
                        ).toLocaleString()}</span>`
                      : '<span class="no_notes left-align">Nota vazia</span>'
                  }
                  </p>
                </div>
                <div class="card-action">
                  <a class="red-text btn_cursor" onclick="deleteNote(${index})">Excluir</a>
                  <a class="cyan-text btn_cursor" onclick="activeNote(${index})">Ativar</a>
                </div>
              </div>
            </div>
          `;
        allNotes.insertAdjacentHTML('beforeend', newNotes);
      }
    });
  } else {
    resetHtml(allNotes);
  }
}

function deleteNote(index) {
  Swal.fire({
    title: 'Excluir a nota?',
    text: 'Esta ação não poderá ser desfeita!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#26A69A',
    cancelButtonColor: '#90A4AE',
    confirmButtonText: 'Excluir',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      const info = getData('noteMaterialize');
      info.notes.splice(index, 1);

      setData('noteMaterialize', info);

      getAllNotes();

      Swal.fire({
        title: 'Nota excluída!',
        icon: 'success',
        confirmButtonColor: '#90A4AE',
        showConfirmButton: false,
      });
    }
  });
}

function resetHtml(doc) {
  doc.innerHTML = '';
  body.add('bckg_img');
  doc.insertAdjacentHTML(
    'beforeend',
    '<h5 class="col s6 m3 no_notes">Sem notas...</h5>'
  );
}

function activeNote(index) {
  Swal.fire({
    title: 'Ativar a nota?',
    text: 'A nota irá aparecer na página inicial!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#26A69A',
    cancelButtonColor: '#90A4AE',
    confirmButtonText: 'Ativar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      const info = getData('noteMaterialize');
      info.notes[index].status = 1;

      setData('noteMaterialize', info);

      Swal.fire({
        title: 'Nota ativada',
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
