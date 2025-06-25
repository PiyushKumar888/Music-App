


const home = document.querySelector(".house");
const install = document.querySelector(".install");
const bell = document.querySelector(".bell");
const login = document.querySelector(".login");
const install_pop = document.querySelector(".install-pop");
const bell_pop = document.querySelector(".notification-pop");
const play_button = document.querySelector(".play-button");
const play_icon = document.querySelector(".play-button i");
const volume = document.querySelector(".volume");
const vol_img = document.querySelector(".vol-img i");
const vol_value = document.querySelector(".vol-value");
const search_bar_main = document.querySelector(".search-bar input");
const search_bar_main_glass = document.querySelector(".search-bar i");


const URL_AUDIO = `https://itunes.apple.com/search?term=`;
const URL_AUDIO2 = `&media=music&limit=10`;

const music_rec = document.querySelector(".music-rec");
const combine_btn_saves = document.querySelector(".combine-btn-saves");
const rec_container = document.querySelector(".rec-container");
const add_saves = document.querySelector(".add-saves");
const add_saves_img = document.querySelector(".add-saves i");


let songList = [];
let currentIndex = -1;
let isRepeat = false;
let isShuffle = false;



install.addEventListener("click", function () {

    install_pop.classList.add("show");
    setTimeout(() => {
        install_pop.classList.remove("show");
    }, 2000);



});

bell.addEventListener("click", function () {

    bell_pop.classList.add("show1");
    setTimeout(() => {
        bell_pop.classList.remove("show1");
    }, 2000);



});



let vol = () => {
    vol_img.classList.remove("fa-volume-high", "fa-volume-low", "fa-volume-xmark");
    const vol_val = parseInt(vol_value.value);
    audio_tag2.volume = vol_val / 100;
    if (vol_val > 60) {
        vol_img.classList.add("fa-volume-high");
    }

    else if (vol_val === 0) {
        vol_img.classList.add("fa-volume-xmark");
    }
    else {
        vol_img.classList.add("fa-volume-low");
    }
}
vol_value.addEventListener("input", vol);


search_bar_main.addEventListener("keydown", async (e) => {
    const query = search_bar_main.value.trim();
    if (e.key === "Enter" && query !== "") {
        await fetch_song(query);

    };

});


let fetch_song = async function (query) {


    try {
        document.querySelector(".music-rec").innerHTML = "";
        songList = [];
        let response = await fetch(`${URL_AUDIO}${query}${URL_AUDIO2}`);
        let data = await response.json();
        console.log(data);

        data.results.forEach(song => {
            search_result(song);
        });
    } catch (error) {
        console.error("Error fetching songs:", error);
    }


}

const search_result = function (songs) {
    songList.push(songs);
    const audio_tag2 = document.querySelector(".main-audio2");
    const icon2 = playbutton2.querySelector("i");
    let div2 = document.createElement("div");
    div2.className = "combine-btn-saves";
    let div3 = document.createElement("div");
    div3.className = "rec-container";
    let img1 = document.createElement("img");
    img1.className = "music-rec-img";
    img1.src = `${songs.artworkUrl100}`;
    img1.alt = `${songs.trackName}`;
    div3.appendChild(img1);
    let div4 = document.createElement("div");
    div4.className = "add-saves";
    div4.innerHTML = `<i class="fa-solid fa-plus"></i>`;
    let button1 = document.createElement("button");
    button1.className = "play-button-live";
    button1.innerHTML = `<i class="fa-solid fa-play"></i>`;



    div2.appendChild(div3);
    div2.appendChild(div4);
    div2.appendChild(button1);

    const musicRecContainer = document.querySelector(".music-rec");
    musicRecContainer.appendChild(div2);



    const icon = button1.querySelector("i");
    const aboutsongimg = document.querySelector(".img-song img");
    const aboutsongtitle = document.querySelector(".song-title");

    button1.addEventListener("click", () => {
        const isSameSong = audio_tag2.src === songs.previewUrl;
        if (!isSameSong) {
            audio_tag2.src = songs.previewUrl;
            audio_tag2.play();
            icon.classList.remove("fa-play");
            icon.classList.add("fa-pause");

            aboutsongimg.src = songs.artworkUrl100.replace("100x100", "1200x1200");;
            aboutsongimg.alt = songs.trackName;
            aboutsongtitle.textContent = songs.trackName;


            localStorage.setItem("currentSong", JSON.stringify({
                index: songList.length - 1,
                trackName: songs.trackName,
                artworkUrl100: songs.artworkUrl100,
                previewUrl: songs.previewUrl
            }));
            document.querySelectorAll(".play-button-live i").forEach(ic => {
                if (ic !== icon) {
                    ic.classList.remove("fa-pause");
                    ic.classList.add("fa-play");
                }
            });

        }
        else {
            if (audio_tag2.paused) {
                audio_tag2.play();
                icon.classList.remove("fa-play");
                icon.classList.add("fa-pause");
                icon2.classList.remove("fa-play");
                icon2.classList.add("fa-pause");
            } else {
                audio_tag2.pause();
                icon.classList.remove("fa-pause");
                icon.classList.add("fa-play");
                icon2.classList.remove("fa-pause");
                icon2.classList.add("fa-play");
            }
        }








    });
    div4.addEventListener("click", () => {
        let library = JSON.parse(localStorage.getItem("library")) || [];
        const exists = library.some(song => song.previewUrl === songs.previewUrl);
        if (!exists) {
            library.push(songs);
            localStorage.setItem("library", JSON.stringify(library));
            loadlibrary();
            alert("Song added to your library!");
        }
        else {
            alert("Song already in library.");
        }
    })



};
const playbutton2 = document.querySelector(".playbutton2");
const audio_tag2 = document.querySelector(".main-audio2");
window.addEventListener("DOMContentLoaded", () => {
    loadlibrary();
    const saved = JSON.parse(localStorage.getItem("currentSong"));
    if (saved) {
        currentIndex = saved.index;
    }

    const savedSong = JSON.parse(localStorage.getItem("currentSong"));
    if (savedSong) {
        const aboutsongimg = document.querySelector(".img-song img");
        const aboutsongtitle = document.querySelector(".song-title");

        aboutsongimg.src = savedSong.artworkUrl100.replace("100x100", "1200x1200");;
        aboutsongimg.alt = savedSong.trackName;
        aboutsongtitle.textContent = savedSong.trackName;
        audio_tag2.src = savedSong.previewUrl;
        const icon = playbutton2.querySelector("i");
        playbutton2.addEventListener("click", () => {
            if (audio_tag2.paused) {
                audio_tag2.play();

                icon.classList.remove("fa-play");
                icon.classList.add("fa-pause");



            }
            else {
                audio_tag2.pause();
                icon.classList.remove("fa-pause");
                icon.classList.add("fa-play");
            }
        });

    }
});

function getCurrentIndex() {
    const current = JSON.parse(localStorage.getItem("currentSong"));
    return songList.findIndex(song => song.previewUrl === current.previewUrl);
}
function playSongByIndex(index) {
    const song = songList[index];
    if (!song) return;
    const audio_tag2 = document.querySelector(".main-audio2");
    const icon2 = document.querySelector(".playbutton2 i");
    const aboutsongimg = document.querySelector(".img-song img");
    const aboutsongtitle = document.querySelector(".song-title");

    audio_tag2.src = song.previewUrl;
    audio_tag2.play();

    aboutsongimg.src = song.artworkUrl100.replace("100x100", "1200x1200");;
    aboutsongimg.alt = song.trackName;
    aboutsongtitle.textContent = song.trackName;

    icon2.classList.remove("fa-play");
    icon2.classList.add("fa-pause");

    localStorage.setItem("currentSong", JSON.stringify(song));
    currentIndex = index;
    const allButtons = document.querySelectorAll(".play-button-live i");
    allButtons.forEach((icon, i) => {
        if (i === index) {
            icon.classList.remove("fa-play");
            icon.classList.add("fa-pause");
        } else {
            icon.classList.remove("fa-pause");
            icon.classList.add("fa-play");
        }
    });



}
document.querySelector(".forward").addEventListener("click", () => {
    currentIndex = getCurrentIndex();
    if (isShuffle) {
        let next;
        do {
            next = Math.floor(Math.random() * songList.length);
        } while (next === currentIndex);
        playSongByIndex(next);
    }
    else {
        const next = (currentIndex + 1) % songList.length;
        playSongByIndex(next);
    }
});

document.querySelector(".backward").addEventListener("click", () => {
    currentIndex = getCurrentIndex();
    const prev = (currentIndex - 1 + songList.length) % songList.length;
    playSongByIndex(prev);
});

document.querySelector(".repeat").addEventListener("click", function () {
    isRepeat = !isRepeat;
    this.classList.toggle("active");
})

document.querySelector(".shuffle").addEventListener("click", function () {
    isShuffle = !isShuffle;
    this.classList.toggle("active");
});
audio_tag2.addEventListener("ended", () => {
    if (isRepeat) {

        audio_tag2.currentTime = 0;
        audio_tag2.play();
    } else if (isShuffle) {
        let next;
        do {
            next = Math.floor(Math.random() * songList.length);
        } while (next === currentIndex);
        playSongByIndex(next);
    } else {
        const next = (currentIndex + 1) % songList.length;
        playSongByIndex(next);
    }


});

const currenttime = document.querySelector(".current-time");
const totaltime = document.querySelector(".total-time");

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
}

audio_tag2.addEventListener("loadedmetadata", () => {
    const duration = audio_tag2.duration;
    totaltime.textContent = formatTime(duration);
})

audio_tag2.addEventListener("timeupdate", () => {
    const currentTime = audio_tag2.currentTime;
    currenttime.textContent = formatTime(currentTime);
})

function loadlibrary() {
    const librarysong = JSON.parse(localStorage.getItem("library")) || [];
    const librarycontainer = document.querySelector(".library-saves");
    librarycontainer.innerHTML = "";

    librarysong.forEach(song => {
        const div = document.createElement("div");
        div.className = "saves";
        div.innerHTML = `
  <img src="${song.artworkUrl100}" alt="${song.trackName}" class="music-rec-img2">
  <p>${song.trackName}</p>
  <button class="remove-btn"><i class="fa-solid fa-minus"></i></button>
`;

        div.addEventListener("click", (e) => {
            if (!e.target.closest(".remove-btn")) {
                playSongDirectly(song);
            }

        });
        div.querySelector(".remove-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            let updatedLibrary = librarysong.filter(s => s.previewUrl !== song.previewUrl);
            localStorage.setItem("library", JSON.stringify(updatedLibrary));
            div.remove();

        })
        librarycontainer.appendChild(div);

    });
}

function playSongDirectly(song) {
    const audio_tag2 = document.querySelector(".main-audio2");
    const icon2 = document.querySelector(".playbutton2 i");
    const aboutsongimg = document.querySelector(".img-song img");
    const aboutsongtitle = document.querySelector(".song-title");

    audio_tag2.src = song.previewUrl;
    audio_tag2.play();

    aboutsongimg.src = song.artworkUrl100.replace("100x100", "1200x1200");
    aboutsongimg.alt = song.trackName;
    aboutsongtitle.textContent = song.trackName;

    icon2.classList.remove("fa-play");
    icon2.classList.add("fa-pause");

    localStorage.setItem("currentSong", JSON.stringify(song));
}
















