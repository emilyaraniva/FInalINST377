const form = document.getElementById('linkForm');
const resultContainer = document.getElementById('resultContainer');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  resultContainer.innerHTML = '';

  const musicUrl = document.getElementById('musicUrl').value.trim();

  if (!musicUrl) {
    resultContainer.innerHTML = '<p>Please enter a valid URL.</p>';
    return;
  }

  resultContainer.innerHTML = '<p class="loading">Loading...</p>';

  try {
    const encodedUrl = encodeURIComponent(musicUrl);
    const userCountry = 'US';
    const songIfSingle = true;

    const response = await fetch(`https://api.song.link/v1-alpha.1/links?url=${encodedUrl}&userCountry=${userCountry}&songIfSingle=${songIfSingle}`);

    if (!response.ok) {
      throw new Error('Failed to fetch song data');
    }

    const data = await response.json();

    if (data.error) {
      resultContainer.innerHTML = `<p>Error: ${data.error}</p>`;
      return;
    }

    const songInfo = data.entitiesByUniqueId[data.entityUniqueId];
    const links = data.linksByPlatform;

    resultContainer.innerHTML = `
      <h2>${songInfo.title} – ${songInfo.artistName}</h2>
      <img src="${songInfo.thumbnailUrl}" alt="Album Art" width="200" />
      <h3>Listen on:</h3>
      <ul>
        ${Object.entries(links).map(([platform, { url }]) => 
          `<li class="result-item"><a href="${url}" target="_blank">${platform}</a></li>`
        ).join('')}
      </ul>
    `;
    
  } catch (err) {
    console.error(err);
    resultContainer.innerHTML = '<p>Something went wrong. Please try again later.</p>';
  }
});

const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});
