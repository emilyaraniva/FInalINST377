const form = document.getElementById('linkForm');
const resultContainer = document.getElementById('resultContainer');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  resultContainer.innerHTML = '';  

  const musicUrl = document.getElementById('musicUrl').value.trim();

  if (!musicUrl) {
    Swal.fire({
      icon: 'warning',
      title: 'Invalid URL',
      text: 'Please enter a valid music link.'
    });
    return;
  }

  resultContainer.innerHTML = '<p class="loading">Loading...</p>';

  try {
    const encodedUrl = encodeURIComponent(musicUrl);
    const userCountry = 'US';
    const songIfSingle = true;
    //updated fetching the api because it wasn't giving me the data
    const response = await fetch(`https://api.song.link/v1-alpha.1/links?url=${encodedUrl}&userCountry=${userCountry}&songIfSingle=${songIfSingle}`);
    
    if (!response.ok) throw new Error('Failed to fetch song data');

    const data = await response.json();
    console.log('API Response:', data);

    if (data.error) {
      resultContainer.innerHTML = `<p>Error: ${data.error}</p>`;
      return;
    }

    const songInfo = data.entitiesByUniqueId[data.entityUniqueId];
    const links = data.linksByPlatform;

    if (!songInfo || !links) {
      throw new Error('Missing song data or links.');
    }

    resultContainer.innerHTML = `
      <h2>${songInfo.title} – ${songInfo.artistName}</h2>
      <img src="${songInfo.thumbnailUrl}" alt="Album Art" width="200" />
      <h3>Listen on:</h3>
      <div class="swiper mySwiper">
        <div class="swiper-wrapper">
          ${Object.entries(links).map(([platform, { url }]) => `
            <div class="swiper-slide">
              <a href="${url}" target="_blank" class="platform-link">${platform}</a>
            </div>
          `).join('')}
        </div>
        <div class="swiper-pagination"></div>
      </div>
    `;


    new Swiper('.mySwiper', {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });

  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: 'error',
      title: 'Oops!',
      text: 'Something went wrong. Please try again later.'
    });
  }
});
