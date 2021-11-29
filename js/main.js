/* variaveis */
let play = false;
const typeNone = "none";
const typeFlex = "flex";
let vol = 1;
let variationVol = 0.1;
let fileMusics = [];
let music = undefined;
let musicNum = 0;

/* funções */
const getElementId = (id) => document.getElementById(id);

const setNameMusic = () => {
  elementNameMusic.innerHTML = fileMusics[musicNum].name;
};

const setVolumeMusic = () => {
  elementValueVolume.innerHTML = `${vol * 100}%`;
};

const message = () => {
  alert("Lista de musicas vazia!");
};

const changeDisplay = (element, display) => {
  element.style.display = display;
};

const changeMusic = () => music != undefined;

const selectMusicList = () => {
  for (const item of elementListMusic.childNodes) {
    item.id == musicNum
      ? item.classList.add("list-li-selected")
      : item.classList.remove("list-li-selected");
  }
};

const showPlay = () => {
  changeDisplay(elementPlay, typeFlex);
  changeDisplay(elementPause, typeNone);
  music.play();
  play = true;
  setNameMusic();
  selectMusicList();
};

const showPause = () => {
  changeDisplay(elementPlay, typeNone);
  changeDisplay(elementPause, typeFlex);
  music.pause();
  play = false;
};

const changePlaying = () => {
  if (changeMusic()) {
    play ? showPause() : showPlay();
  } else {
    message();
  }
};

const volume = (variation) => {
  if (changeMusic()) {
    vol = parseInt((vol + variation + 0.05) * 10) / 10;
    if (vol >= 1) vol = 1;
    if (vol <= 0) vol = 0;
    music.volume = vol;
  }
  setVolumeMusic();
};

const volumeMore = () => {
  volume(variationVol);
};

const volumeLess = () => {
  volume(-variationVol);
};

const alterMusic = (value) => {
  if (changeMusic()) {
    if (musicNum + value < 0 || musicNum + value >= fileMusics.length) return;

    musicNum += value;

    music.pause();
    play = false;

    music = new Audio(URL.createObjectURL(fileMusics[musicNum]));
    music.load();
    music.play();

    setNameMusic();
    selectMusicList();
  } else {
    message();
  }
};

const previous = () => {
  alterMusic(-1);
};

const next = () => {
  alterMusic(1);
};

const selectMusic = (i) => {
  showPause();
  musicNum = i;
  music = new Audio(URL.createObjectURL(fileMusics[musicNum]));
  music.load();
  music.play();

  showPlay();
  setNameMusic();
};

const createItemList = (i) => {
  const itemHTML = document.createElement("li");
  itemHTML.id = i;
  itemHTML.classList.add("list-li");
  itemHTML.innerHTML = fileMusics[i].name;
  itemHTML.addEventListener("click", () => {
    selectMusic(i);
  });
  return itemHTML;
};

const createListMusic = () => {
  elementListMusic.innerHTML = "";
  for (const item in fileMusics)
    elementListMusic.appendChild(createItemList(item));
};

const uptadeFile = (event) => {
  /* reset variavel fileMusics */
  fileMusics = [];

  if (changeMusic()) showPause();

  for (const file of event.target.files) fileMusics.push(file);

  music = new Audio(URL.createObjectURL(fileMusics[0]));
  music.load();
  play = false;
  musicNum = 0;

  createListMusic();

  console.table(fileMusics);
};

/* pegar os ementos HTML (Tags) */
const [
  elementPlay,
  elementPause,
  elementBackwardPrevious,
  elementBackwardNext,
  elementVolMore,
  elementVolLess,
  elementInputFile,
  elementValueVolume,
  elementNameMusic,
  elementListMusic,
] = [
  getElementId("play"),
  getElementId("pause"),
  getElementId("backward_previous"),
  getElementId("forward_next"),
  getElementId("volMore"),
  getElementId("volLess"),
  getElementId("real-input"),
  getElementId("value-volume"),
  getElementId("name-music"),
  getElementId("list-ul"),
];

/* adiciona evento de onclick nos icones */
elementPlay.onclick = changePlaying;
elementPause.onclick = changePlaying;
elementBackwardPrevious.onclick = previous;
elementBackwardNext.onclick = next;
elementVolMore.onclick = volumeMore;
elementVolLess.onclick = volumeLess;
elementInputFile.onchange = uptadeFile;

/* Oculta botao de pause */
changeDisplay(elementPlay, typeNone);
