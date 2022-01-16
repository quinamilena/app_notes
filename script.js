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

function changeStateBtnModal(value) {
  const btnModal = document.getElementById('addNote');
  if (value.length >= 3) {
    btnModal.classList.remove('disabled');
  } else {
    btnModal.classList.add('disabled');
  }
}

function addNote() {
  try {
    const titleNote = document.getElementById('titleNote').value;

    const newNote = {
      title: titleNote,
      body: '',
      status: 1,
      create: new Date(),
      update: new Date(),
    };

    const info = getData('noteMaterialize');

    info.notes.push(newNote);

    setData('noteMaterialize', info);
    getAllNotes();

    Swal.fire({
      title: 'Nota criada!',
      icon: 'success',
      confirmButtonColor: '#26A69A',
      showConfirmButton: false,
    });
  } catch (error) {
    Swal.fire({
      title: 'Erro ao criar nota!',
      icon: 'error',
      confirmButtonColor: '#90A4AE',
      showConfirmButton: false,
    });
  }
}

function getAllNotes() {
  const info = getData('noteMaterialize');
  const allNotes = document.querySelector('#allNotes');

  if (info.notes.length > 0) {
    const notesActives = info.notes.filter((note) => note.status === 1);

    if (notesActives.length > 0) {
      allNotes.innerHTML = '';
      body.remove('bckg_img');
    }

    if (
      notesActives.length === 0 &&
      allNotes.children.length !== 0 &&
      allNotes.children[0].nodeName !== 'H5'
    ) {
      body.add('bckg_img');
      allNotes.innerHTML = '';
      allNotes.insertAdjacentHTML(
        'beforeend',
        '<h5 class="col s6 m3 no_notes">Sem notas...</h5>'
      );
    }

    info.notes.forEach((note, index) => {
      if (note.status === 1) {
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
                <a class="cyan-text" href="/views/editNote.html?#${index}">Visualizar</a>
              </div>
            </div>
          </div>
        `;
        allNotes.insertAdjacentHTML('beforeend', newNotes);
      }
    });
  }
}
