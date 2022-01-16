document.addEventListener('DOMContentLoaded', function () {
  checkLocalStorage();
  getInfoNote();

  document.querySelector('#btn_save').addEventListener('click', save);
});

function getInfoNote() {
  const infos = getData('noteMaterialize');
  const infoUser = infos.infoUser;

  document.querySelector('#name_user').value = infoUser.nameUser;
  document.querySelector('#name_image').value = infoUser.nameImg;

  if (infoUser.imageBcg) {
    document.querySelector('#img_card').src = infoUser.imageBcg;
  }

  M.updateTextFields();
}

async function save() {
  try {
    const img = document.querySelector('#image_bcg');
    const nameUser = document.querySelector('#name_user').value;
    const nameImg = document.querySelector('#name_image').value;
    let imgBase64 = '';

    if (img.files && img.files[0]) {
      imgBase64 = await getBase64(img.files[0]);
      document.querySelector('#img_card').src = imgBase64;
    }

    const inforUser = {
      nameUser: nameUser ? nameUser : 'Olá, bem-vinde!',
      imageBcg: imgBase64 ? imgBase64 : '',
      nameImg: nameImg ? nameImg : 'Imagem Padrão.jpeg',
    };

    const info = getData('noteMaterialize');
    info.infoUser = inforUser;
    setData('noteMaterialize', info);

    Swal.fire({
      title: 'Alterações salvas!',
      icon: 'success',
      confirmButtonColor: '#90A4AE',
      showConfirmButton: false,
    });
  } catch (error) {
    Swal.fire({
      title: 'Erro ao salvar as alterações!',
      icon: 'error',
      confirmButtonColor: '#90A4AE',
      showConfirmButton: false,
    });
  }
}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
