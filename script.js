const songs = [
  {
    title: "Death Bed",
    artist: "Powfu",
    artwork: "./images/death-bed.jpg",
    url: "https://samplesongs.netlify.app/Death%20Bed.mp3",
    category: "English",
    id: "1",
  },
  {
    title: "Bad Liar",
    artist: "Imagine Dragons",
    artwork: "./images/bad-liar.jpg",
    url: "https://samplesongs.netlify.app/Bad%20Liar.mp3",
    category: "English",
    id: "2",
  },
  {
    title: "Veerapandi-Kottayile",
    artist: "ARRahman",
    artwork: "./images/mustafa-mustafa.jpeg",
    url: "./assets/Veerapandi-Kottayile.mp3",
    category: "Tamil",
    id: "3",
  },
  {
    title: "Hate Me",
    artist: "Ellie Goulding",
    artwork: "./images/hate-me.jpg",
    url: "https://samplesongs.netlify.app/Hate%20Me.mp3",
    category: "English",
    id: "4",
  },
  {
    title: "Urvashi-Urvashi",
    artist: "ARRahman",
    artwork: "./images/urvashi-urvashi.jpeg",
    url: "./assets/Urvashi-Urvashi.mp3",
    category: "Tamil",
    id: "5",
  },
  {
    title: "Mustafa-Mustafa",
    artist: "ARRahman",
    artwork: "./images/mustafa-mustafa.jpeg",
    url: "./assets/Mustafa-Mustafa.mp3",
    category: "Tamil",
    id: "6",
  },
  {
    title: "Solo",
    artist: "Clean Bandit",
    artwork: "./images/solo.jpg",
    url: "https://samplesongs.netlify.app/Solo.mp3",
    category: "English",
    id: "7",
  },
  {
    title: "Uyire-Uyire",
    artist: "ARRahman",
    artwork: "./images/mustafa-mustafa.jpeg",
    url: "./assets/Uyire-Uyire.mp3",
    category: "Tamil",
    id: "8",
  },
  {
    title: "Kadhal-Rojave",
    artist: "ARRahman",
    artwork: "./images/kadhal-rojavae.jpeg",
    url: "./assets/Kadhal-Rojave.mp3",
    category: "Tamil",
    id: "9",
  }

];
let showAllRecMode = false;
let showAllMode = false;
const showAllLink = document.getElementById("showAllLink");
const nowPlayingDiv = document.getElementById("nowPlaying");

//Search Icon
const searchContainer = document.getElementById("searchContainer");
const sidebarSearchIcon = document.getElementById("sidebarSearchIcon");
sidebarSearchIcon.addEventListener("click", toggleSearchBar);
function toggleSearchBar() {
  searchContainer.style.display =
    searchContainer.style.display === "none" ||
    searchContainer.style.display === ""
      ? "block"
      : "none";
}

//Search Bar
const searchInput = document.getElementById("searchInput");
const suggestionsContainer = document.getElementById("suggestionsContainer");
searchInput.addEventListener("input", performSearch);
function performSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredSongs = songs.filter((song) => {
    const titleMatch = song.title.toLowerCase().includes(searchTerm);
    const artistMatch = song.artist.toLowerCase().includes(searchTerm);
    return titleMatch || artistMatch;
  });
  loadSongs("searchResults", filteredSongs);
  showSuggestions(searchTerm);
}

function showSuggestions(searchTerm) {
suggestionsContainer.innerHTML = "";
const suggestedSongs = songs.filter((song) => {
    const titleMatch = song.title.toLowerCase().includes(searchTerm);
    const artistMatch = song.artist.toLowerCase().includes(searchTerm);
    return titleMatch || artistMatch;
  });

 // Display suggestions
    suggestedSongs.forEach((song) => {
    const suggestionItem = document.createElement("div");
    suggestionItem.classList.add("suggestion-item");
    suggestionItem.textContent = `${song.title} - ${song.artist}`;
     
    suggestionItem.addEventListener("click", () => {
      searchInput.value = `${song.title} - ${song.artist}`;
      const selectedSongIndex = songs.findIndex((s) => s.id === song.id);
      loadSong(selectedSongIndex);
      audioPlayer.play();
      playPauseBtn.innerText = "Pause";
      
      suggestionsContainer.style.display = "none";
    });
    suggestionsContainer.appendChild(suggestionItem);
  });
 
  suggestionsContainer.style.display =
    suggestedSongs.length > 0 ? "block" : "none";
}

//Audio Player
const audioPlayer = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");
let currentSongIndex = 0;
playPauseBtn.addEventListener("click", playPause);
nextBtn.addEventListener("click", playNext);
previousBtn.addEventListener("click", playPrevious);
function playPause() {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseBtn.innerText = "Pause";
    console.log("Playing song. Calling updateRecentlyPlayed.");
    updateRecentlyPlayed(currentSongIndex);
    nowPlayingDiv.style.display = "block"; 
  } else {
    audioPlayer.pause();
    playPauseBtn.innerText = "Play";
    nowPlayingDiv.style.display = "none"; 
  }
}

function playNext() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  audioPlayer.play();
  playPauseBtn.innerText = "Pause";
  playPause();
}

function updateNowPlaying(song) {
  const nowPlayingImage = document.getElementById("nowPlayingImage");
  const nowPlayingTitle = document.getElementById("nowPlayingTitle");
  const nowPlayingArtist = document.getElementById("nowPlayingArtist");
  nowPlayingImage.src = song.artwork;
  nowPlayingTitle.textContent = song.title;
  nowPlayingArtist.textContent = song.artist;
}

function playPrevious() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  audioPlayer.play();
  playPauseBtn.innerText = "Pause";
  playPause();
}

 
//Recently Played section
// function updateRecentlyPlayed(index) {
// const currentSong = songs[index];
// const isAlreadyPlayed =
// recentlyPlayed.findIndex((song) => song.id === currentSong.id) !== -1;

//   if (!isAlreadyPlayed) {
//      recentlyPlayed.unshift(currentSong);
   
//     if (recentlyPlayed.length > 4) {
//       recentlyPlayed.pop(); 
//     }
//     console.log("Recently Played:", recentlyPlayed);
//     const recentlyPlayedCardsContainer = document.getElementById(
//       "recentlyPlayedCards"
//     );
  
//     const card = createCard(currentSong);
//     recentlyPlayedCardsContainer.insertBefore(
//       card,
//       recentlyPlayedCardsContainer.firstChild
//     );
//   }
// }
function updateRecentlyPlayed(index) {
  const currentSong = songs[index];
  const isAlreadyPlayed =
    recentlyPlayed.findIndex((song) => song.id === currentSong.id) !== -1;

  if (!isAlreadyPlayed) {
    recentlyPlayed.unshift(currentSong);

    if (recentlyPlayed.length > 4) {
      recentlyPlayed.pop();
    }

    console.log("Recently Played:", recentlyPlayed);
    const recentlyPlayedCardsContainer = document.getElementById(
      "recentlyPlayedCards"
    );
        
    recentlyPlayedCardsContainer.innerHTML = "";
    recentlyPlayed.forEach((song) => {
      const card = createCard(song);
      recentlyPlayedCardsContainer.appendChild(card);
    });

    const titleRow = document.querySelector(".recentlyPlayedTitleRow");
    titleRow.style.display = recentlyPlayed.length > 0 ? "block" : "none";
  }
}


// Initialize recently played list (you may load it from a persistent storage)
let recentlyPlayed = [];

const recentlyPlayedLink = document.getElementById("recentlyPlayedSection");
recentlyPlayedLink.addEventListener("click", showRecentlyPlayed);
function showRecentlyPlayed() {
  console.log("Recently Played Clicked!");
  currentCategory = "Recently Played";
  const recentlyPlayedSongs = getRecentlyPlayedSongs();
  console.log("Recently Played Songs:", recentlyPlayedSongs);

  updateRecentlyPlayed(currentSongIndex);
  loadSongs(currentCategory, recentlyPlayedSongs);

  
  const titleRow = document.querySelector(".recentlyPlayedTitleRow");
  titleRow.style.display = recentlyPlayedSongs.length > 0 ? "block" : "none";
}

function getRecentlyPlayedSongs() {
    return recentlyPlayed.slice(-5).reverse();
}

//Category section
const allButton = document.querySelector(".btn-all");
const tamilButton = document.querySelector(".btn-tamil");
const englishButton = document.querySelector(".btn-english");
let currentCategory = "all";

allButton.addEventListener("click", () => {
  currentCategory = "all";
  loadSongs(currentCategory);
});

tamilButton.addEventListener("click", () => {
  currentCategory = "Tamil";
  loadSongs(currentCategory);
});

englishButton.addEventListener("click", () => {
  currentCategory = "English";
  loadSongs(currentCategory);
});

function loadSongs(category, customSongs = null) {
  console.log("Loading songs for category:", category);
  musicCardsContainer.innerHTML = "";
  const songsToDisplay = customSongs || (category === "all" ? songs : songs.filter((song) => song.category === category).slice(0, 4));
 
  songsToDisplay.forEach((song) => {
    musicCardsContainer.appendChild(createCard(song));
  });
}

showAllLink.addEventListener("click", () => {
  currentCategory = "all";
  loadSongs(currentCategory, songs);
});

function createCard(song) {
  const card = document.createElement("div");
  card.classList.add("col-md-3", "card", "cursor-pointer");

  const playButton = document.createElement("button");
  playButton.classList.add("play-button", "btn", "btn-success");
  playButton.innerHTML = '<i class="fas fa-play"></i>'; // Assuming you have Font Awesome for the play icon
  playButton.style.display = "none"; 
  card.innerHTML = `
    <img src="${song.artwork}" class="card-img-top" alt="${song.title}">
    <div class="card-body">
      <h5 class="card-title">${song.title}</h5>
      <p class="card-text">${song.artist}</p>
      <span class="heart-icon" data-song-id="${song.id}"><i class="far fa-heart"></i></span>

    </div>
  `;

  card.appendChild(playButton);
  card.addEventListener("mouseenter", () => {
    playButton.style.display = "block"; 
  });

  card.addEventListener("mouseleave", () => {
    playButton.style.display = "none"; 
  });
  card.addEventListener("click", () => {
    currentSongIndex = songs.findIndex((s) => s.id === song.id);
    loadSong(currentSongIndex);
    audioPlayer.play();
    playPauseBtn.innerText = "Pause";
  });
  const heartIcon = card.querySelector(".heart-icon");
  heartIcon.addEventListener("click", () => {
    console.log("Heart icon clicked");
    toggleLike(song.id, heartIcon);
  });
  return card;
}


// Liked songs
let likedSongs = [];

function toggleLike(songId, heartIcon) {
  const index = likedSongs.findIndex((id) => id === songId);

  if (index === -1) {
    likedSongs.push(songId);
    heartIcon.innerHTML = '<i class="fas fa-heart"></i>'; // Fill the heart (solid)
  } else {
    likedSongs.splice(index, 1);
    heartIcon.innerHTML = '<i class="far fa-heart"></i>'; // Outline the heart
  }
  console.log("Index:", index);
  console.log("Is Liked:", index === -1);

  const isLiked = index === -1;
  heartIcon.classList.toggle("active", isLiked);
  // Update the liked songs in the sidebar
  updateLikedSongs();
  updateFavSongs();
  const favSongsTitleRow = document.getElementById("favSongsTitleRow");
  favSongsTitleRow.style.display = likedSongs.length > 0 ? "block" : "none";
}

// Function to update the liked songs in the sidebar
function updateLikedSongs() {
  const likedSongsContainer = document.getElementById("likedSongs");
  likedSongsContainer.innerHTML = "";

  likedSongs.forEach((songId) => {
    const likedSong = songs.find((song) => song.id === songId);
    if (likedSong) {
      const likedSongItem = document.createElement("div");
      likedSongItem.classList.add("liked-song-item");
      likedSongItem.innerHTML = `
        <img src="${likedSong.artwork}" class="liked-song-thumbnail"  alt="${likedSong.title}">
        <div class="liked-song-details">
          <p class="liked-song-title">${likedSong.title}</p>
          <p class="liked-song-artist">${likedSong.artist}</p>
        </div>
      `;
      likedSongsContainer.appendChild(likedSongItem);
    }
  });
  const favSongsTitleRow = document.getElementById("favSongsTitleRow");
  favSongsTitleRow.style.display = likedSongs.length > 0 ? "block" : "none";
}

// Initialize liked songs in the sidebar
updateLikedSongs();
function updateFavSongs() {
  const favSongsContainer = document.getElementById("favSongs");
  favSongsContainer.innerHTML = "";

  likedSongs.forEach((songId) => {
    const likedSong = songs.find((song) => song.id === songId);
    if (likedSong) {
      const card = document.createElement("div");
      card.classList.add("col-md-3", "card", "mb-3");

      card.innerHTML = `
                 
            <img src="${likedSong.artwork}" class="img-fluid rounded-start" alt="${likedSong.title}">
            
            <div class="card-body">
              <h5 class="card-title">${likedSong.title}</h5>
              <p class="card-text">${likedSong.artist}</p>
            
        </div>
      `;
// Play button
const playButton = document.createElement("button");
playButton.classList.add("play-button", "btn", "btn-success", "position-absolute", "top-50", "start-50", "translate-middle");
playButton.innerHTML = '<i class="fas fa-play"></i>';
playButton.style.display = "none";

card.addEventListener("mouseenter", () => {
  playButton.style.display = "block";
});

card.addEventListener("mouseleave", () => {
  playButton.style.display = "none";
});

playButton.addEventListener("click", () => {
  // Find the index of the liked song
  const index = songs.findIndex((s) => s.id === likedSong.id);
  if (index !== -1) {
    // Load and play the song
    loadSong(index);
    audioPlayer.play();
    playPauseBtn.innerText = "Pause";
  }
});

card.appendChild(playButton);
favSongsContainer.appendChild(card);
}
});
}
const musicCardsContainer = document.getElementById("musicCards");
songs.forEach((song) => {
  musicCardsContainer.appendChild(createCard(song));
});

function loadSong(index) {
  const currentSong = songs[index];
  audioPlayer.src = currentSong.url;

  updateNowPlaying(currentSong);
}

loadSongs(currentCategory);

nowPlayingDiv.style.display = "none";


// Get the buttons
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

// Add event listeners to the buttons
prevButton.addEventListener("click", showAlert);
nextButton.addEventListener("click", showAlert);

// Event handler function
function showAlert() {
  alert("This is a single page application");
}