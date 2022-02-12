const defaultHumbergerMenu = document.querySelector('.humberger-menu');
const detailedHumbergerMenu = document.querySelector(
  '.material-icons.humberger-menu'
);
const detailedNav = document.querySelector('.detailed-nav');
const main = document.querySelector('.main');
const videos = document.querySelector('.videos');

defaultHumbergerMenu.addEventListener('click', () => {
  detailedNav.classList.add('show');
});

detailedHumbergerMenu.addEventListener('click', () => {
  detailedNav.classList.remove('show');
});

window.addEventListener('load', () => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  fetch(
    'https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=50&key=AIzaSyCf2Majtq2MQgIx7hgo2229KVtVHU3339w',
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
            <p class="channel">${item.snippet.channelTitle}</p>
          </div>
        </li>
      `;
        main.insertAdjacentHTML('beforeend', video);
      });
    })
    .catch((error) => console.log('error', error));
});
