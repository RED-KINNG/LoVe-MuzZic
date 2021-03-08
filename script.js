const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl =document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
    {
        name:'jethro-1',
        displayName: 'As Tears Go By',
        artist: 'RED-KINNG',

    },
    {
        name:'jethro-2',
        displayName: 'Hail To The Kinng',
        artist: 'RED-KINNG',

    },
    {
        name:'jethro-3',
        displayName: 'You Could Be Mine',
        artist: 'RED-KINNG',

    },
    {
        name:'jethro-4',
        displayName: 'King Nothing',
        artist: 'RED-KINNG',

    },
    {
        name:'jethro-6',
        displayName: 'Maybe Its Time',
        artist: 'RED-KINNG',

    },
    {
        name:'jethro-7',
        displayName: 'Life Is Beautiful',
        artist: 'RED-KINNG',

    },
    {
        name:'jethro-8',
        displayName: 'El Farsante',
        artist: 'RED-KINNG',

    },
    
]

// check if playing
let isPlaying = false;


// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play-circle', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Play
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play-circle');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// play or pause event listener

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()) );

// UPDATE THE DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}
// Current song
let songIndex = 0;
// Previous Song Function
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
}


// Next song function
function nextSong() {
    songIndex++;
    if (songIndex >  songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}
// on load Select First Song
loadSong(songs[songIndex]);

// update progress bar and time
function updateProgressBar(e) {
    if (isPlaying) {
        const {duration, currentTime}= e.srcElement;
        // update progressBar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // calculate display for the duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }

        // delay switching duration element to avoid NAN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes} : ${durationSeconds}`;
        }
        
          // calculate display for the current
          const currentMinutes = Math.floor(currentTime / 60);
          let currentSeconds = Math.floor(currentTime % 60);
          if (currentSeconds < 10) {
              currentSeconds = `0${currentSeconds}`;
            }
        currentTimeEl.textContent = `${currentMinutes} : ${currentSeconds}`;
    }     

}

// setProgressBar{
function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX / width) * duration;
}

// PREV and NEXT event listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);