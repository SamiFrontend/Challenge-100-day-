// button control 
const prevButton = document.getElementById('prevButton') ; 
const nextButton = document.getElementById('nextButton') ; 
const playButton = document.getElementById('playButton') ; 

const imageMusic = document.getElementById('currentImage') ; 
const titleMusic = document.getElementById('currentTitle') ; 
const progress = document.getElementById('progress') ; 
const progressDuration = document.getElementById('durationProgress') ; 
const startTime = document.getElementById('startTime') ; 
const lengthMusic = document.getElementById('lengthMusic') ; 
const currentMusic = document.getElementById('controlMusic') ; 
const playlist = document.getElementById('playlist') ; 

// constructor music
function music(title , description , audio , image , time ) {
    return {
        title , description , audio , image , time 
    }
}


const musics = [
    new music("Leave Me Lonley" , "Lorem, ipsum dolor sit amet consectetur adipisicing elit." , "./assets/music/1.mp3" , "./assets/img/1.jpg" , "2:34") , 
    new music("The Pepole All in World" , "Lorem, ipsum dolor sit amet." , "./assets/music/2.mp3" , "./assets/img/2.jpg" , "2:45") , 
    new music("Sly & The Family Stone" , "Released in 1967 on album Dance to the Music Genre – Funk." , "./assets/music/3.mp3" , "./assets/img/3.jpg" , "2:27") , 
]

let current = 1 ; 




function initMusic() {
    loadPlaylist() ;  
    setMusic() ; 
}


initMusic()


function playMusic( index ){
    current = index ; 
    setMusic() ;
}

function loadPlaylist(){

    musics.forEach(( music , index ) => {
        playlist.innerHTML += `
            <li class="music ${ current === index ? "active" : "" }" onclick="setMusicInfo(${index})" >
            <img src="${music.image}" class="music-img" alt="music playlist">

            <div class="music-info">
                <p class="name-music">
                    ${ music.title }
                </p>
                    <p class="desc-music">
                    ${ music.description }
                </p>
            </div>

            <span class="duration-music">${ music.time }</span>
        </li>
        `
    })
}


function setMusic() {
   titleMusic.innerHTML = musics[ current ].title ; 
   startTime.innerHTML = "0:00" ;
   imageMusic.src = musics[current].image ; 
   currentMusic.src = musics[current].audio ; 

    lengthMusic.innerHTML = musics[ current ].time  ;
    progressDuration.style.width = 0 ;  

   // remove class play in button 
   playButton.classList.remove('isPlayed') ; 
   // add class to music seted 
   playlist.children[ current ].classList.add("active") ; 

}


// event listen 
function setMusicInfo( index ) {

    // because performance
    if( index === current ) return ; 

    // remove class active before music
    playlist.children[ current ].classList.remove('active') ; 

    current = index ; 
    setMusic() ; 

    playlist.children[ current ].classList.add('active') ; 

}


function startMusic() {
    const isPlay = this.classList.contains('isPlayed') ; 
    console.log(isPlay)

    if( isPlay ) {
        this.classList.remove('isPlayed') ; 
        currentMusic.pause() ; 
    }else{
        this.classList.add('isPlayed') ; 
        currentMusic.play() ; 
    }
}


playButton.addEventListener('click' , startMusic ) ; 

// next music 

function nextMusic() {
    // remove active for previous music
    playlist.children[ current ].classList.remove('active') ; 

    current++ ; 

    if( current > musics.length - 1 ) {
        current = 0 ; 
    }

    setMusic() ; 
}

nextButton.addEventListener('click' , nextMusic ) ; 


function prevMusic() {
    // remove active for previous music
    playlist.children[ current ].classList.remove('active') ; 

    current-- ; 

    if( current < 0 ) {
        current = musics.length - 1 ; 
    }

    setMusic() ; 
}

prevButton.addEventListener('click' , prevMusic ) ; 



function updateTimer() {
    const { currentTime , duration } = this ; 

    let min = parseInt(( currentTime / 60) % 60) ; 
    let sec = parseInt( currentTime % 60) ;


    let percent = ( currentTime / duration ) * 100  ; 
    // set width progress with time 
    progressDuration.style.width = percent + '%' ; 

    // set timer 
    startTime.innerHTML = ( min < 10 ? `0${min}` : min ) + ':' + ( sec < 10 ? `0${sec}` : sec ) ;


    // set next music if finished 
    if( percent === 100 ) {
        nextMusic() ; 
    }

    
}

currentMusic.addEventListener('timeupdate' , updateTimer ) ; 



// progress clicked 

function setProgress( event ) {

    let widthProgress = this.clientWidth ; 
    let positionX = event.offsetX ; 
    let duration = currentMusic.duration ; 

    currentMusic.currentTime = ( positionX / widthProgress ) * duration ; 
}

progress.addEventListener('click' , setProgress ) ; 