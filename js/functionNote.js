function checkLocalStorage() {
  const noteMaterialize = localStorage.getItem('noteMaterialize');

  if (!noteMaterialize) {
    const bodyApp = {
      infoUser: {
        nameUser: 'Olá, bem-vinde!',
        imageBcg: '',
        nameImg: 'img.jpeg',
      },
      notes: [],
    };

    setData('noteMaterialize', bodyApp);
  }
}

function setData(key, data) {
  if (key && data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

function getData(key) {
  if (key) {
    return JSON.parse(localStorage.getItem(key) || '{}');
  }
}

function setInfoUser() {
  const allInfo = getData('noteMaterialize');
  const inforUser = allInfo.infoUser;

  document.querySelector('#user_name').innerHTML = inforUser.nameUser;

  if (inforUser.imageBcg) {
    document.querySelector('#user_img').src = inforUser.imageBcg;
  }
}
