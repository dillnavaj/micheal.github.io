
function pauseAllAudio(){

    for(let j = 0 ;  j < listofmusic.length ; j++){
            console.log(this.id);
            musicindex = document.getElementById(this.id);

            if (musicindex.paused){
            } 
            else 
            {
                musicindex.pause();
                musicindex.currentTime=0;
                bplaypause.id = "";
                bplaypause.id = "play-music";
            }
        
        }

}
