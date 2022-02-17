const simpleMenu = document.querySelector('.hamburger-menu');
const detailedMenu = document.querySelector('.material-icons.hamburger-menu');
const detailedNav = document.querySelector('.detailed-nav');
const main = document.querySelector('.main');
const videos = document.querySelector('.videos');
const input = document.querySelector('.header__search-input');
const inputBtn = document.querySelector('.header__search-button');
const background = document.querySelector('.background');
let inputValue;

simpleMenu.addEventListener('click', () => {
  detailedNav.classList.add('show');
  background.style.display = 'block';
  document.body.style.overflow = 'hidden';
});

detailedMenu.addEventListener('click', () => {
  detailedNav.classList.remove('show');
  background.style.display = 'none';
  document.body.style.overflow = 'visible';
});

background.addEventListener('click', () => {
  detailedNav.classList.remove('show');
  background.style.display = 'none';
  document.body.style.overflow = 'visible';
});

window.addEventListener('load', () => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  fetch(
    'https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=50&key=AIzaSyCf2Majtq2MQgIx7hgo2229KVtVHU3339w&regionCode=KR',
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      const items = result.items;
      items.forEach((item) => {
        const video = `
        <li class="video">
          <img src="${item.snippet.thumbnails.medium.url}" alt="video thumbnail" class="video__thumbnail">
          <div>
            <p class="video__title">${item.snippet.title}</p>
            <p class="video__channel">${item.snippet.channelTitle}</p>
          </div>
        </li>
      `;
        videos.insertAdjacentHTML('beforeend', video);
      });
    })
    .catch((error) => console.log('error', error));
});

function resetVideos() {
  while (videos.firstChild) {
    videos.removeChild(videos.firstChild);
  }
}

function search() {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${inputValue}&type=video&key=AIzaSyCf2Majtq2MQgIx7hgo2229KVtVHU3339w`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      const items = result.items;
      items.forEach((item) => {
        const video = `
        <li class="video">
          <img src="${item.snippet.thumbnails.medium.url}" alt="video thumbnail" class="thumbnail">
          <div>
            <p class="title">${item.snippet.title}</p>
            <p class="channel">${item.snippet.description}</p>
          </div>
        </li>
      `;
        videos.insertAdjacentHTML('beforeend', video);
      });
    })
    .catch((error) => console.log('error', error));
}

input.addEventListener('keyup', (e) => {
  inputValue = e.target.value;
  if (e.key === 'Enter') {
    if (inputValue) {
      resetVideos();
      search();
    }
  }
});

inputBtn.addEventListener('click', () => {
  resetVideos();
  search();
});
