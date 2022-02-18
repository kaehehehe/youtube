const simpleMenu = document.querySelector('.hamburger-menu');
const detailedMenu = document.querySelector('.material-icons.hamburger-menu');
const detailedNav = document.querySelector('.detailed-nav');
const main = document.querySelector('.main');
const videos = document.querySelector('.videos');
const input = document.querySelector('.header__search-input');
const inputBtn = document.querySelector('.header__search-button');
const background = document.querySelector('.background');
const API_KEY = 'AIzaSyCf2Majtq2MQgIx7hgo2229KVtVHU3339w';
let inputValue;
let searched = false;

function publishedAt(data) {
  const published = data.split('T')[0].split('-');
  const [publishedYear, publishedMonth, publishedDay] = published;
  const today = new Date();
  if (today.getFullYear() !== Number(publishedYear)) {
    const year = today.getFullYear() - publishedYear;
    return year === 1 ? `${year} year` : `${year} years`;
  }
  if (today.getMonth() + 1 !== Number(publishedMonth)) {
    const month = today.getMonth() + 1 - publishedMonth;
    return month === 1 ? `${month} month` : `${month} months`;
  }
  if (today.getDate() !== Number(publishedDay)) {
    const day = today.getDate() - publishedDay;
    if (day >= 7) {
      const week = Math.floor(day / 7);
      return week === 1 ? `${week} week` : `${week} weeks`;
    } else {
      return day === 1 ? `${day} day` : `${day} days`;
    }
  }
}

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

const getRequestOptions = { method: 'GET', redirect: 'follow' };

function getChannelIcon(videoData) {
  return fetch(
    `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${videoData.snippet.channelId}&key=${API_KEY}`,
    getRequestOptions
  )
    .then((res) => res.json())
    .then((data) => {
      videoData.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
      searched ? setSearchedVideos(videoData) : setVideos(videoData);
    });
}

function setVideos(data) {
  const video = `
  <li class="video">
    <img src="${
      data.snippet.thumbnails.medium.url
    }" alt="video thumbnail" class="video__thumbnail">
      <div class="video__wrapper">
        <img src=${
          data.channelThumbnail
        } alt="channel thumbnail" class="video__channel-thumbnail">
        <div class="video__metadata">
          <p class="video__metadata-title">${data.snippet.title}</p>
          <p class="video__metadata-channel">${data.snippet.channelTitle}</p>
          <p class="video__metadata-published-at">${publishedAt(
            data.snippet.publishedAt
          )} ago</p>
        </div>
      </div>
  </li>
  `;
  videos.insertAdjacentHTML('beforeend', video);
}

window.addEventListener('load', () => {
  fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=50&regionCode=KR&key=${API_KEY}`,
    getRequestOptions
  )
    .then((res) => res.json())
    .then((data) => {
      data.items.forEach((item) => {
        getChannelIcon(item);
      });
    })
    .catch((error) => console.error('error', error));
});

function resetVideos() {
  while (videos.firstChild) {
    videos.removeChild(videos.firstChild);
  }
}

function searchedVideos(inputValue) {
  fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${inputValue}&type=video&key=${API_KEY}`,
    getRequestOptions
  )
    .then((res) => res.json())
    .then((data) => {
      data.items.forEach((item) => {
        getChannelIcon(item);
      });
    })
    .catch((error) => console.error('error', error));
}

function setSearchedVideos(data) {
  videos.classList.add('searched');
  const video = `
  <li class="searched__video">
    <div class="searched__video-thumbnail">
      <img src="${data.snippet.thumbnails.medium.url}" alt="video thumbnail">
    </div>
    <div class="searched__video-metadata">
      <p class="searched__video-title">${data.snippet.title}</p>
      <p class="searched__video-published-at">${publishedAt(
        data.snippet.publishedAt
      )} ago</p>
      <div class="searched__video-wrapper">
        <img src="${
          data.channelThumbnail
        }" alt="channel thumbnail" class="searched__video-channel-img">
        <p class="searched__video-channel">${data.snippet.channelTitle}</p>
      </div>
      <p class="searched__video-description">${data.snippet.description}</p>
    </div>
  </li>
  `;
  videos.insertAdjacentHTML('beforeend', video);
}

input.addEventListener('keyup', (e) => {
  inputValue = e.target.value;
  if (e.key === 'Enter') {
    if (inputValue) {
      resetVideos();
      searched = true;
      searchedVideos(inputValue);
    }
  }
});

inputBtn.addEventListener('click', () => {
  resetVideos();
  searched = true;
  searchedVideos(inputValue);
});
