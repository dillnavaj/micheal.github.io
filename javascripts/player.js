// Initialize Firebase
var config = {
    apiKey: "AIzaSyBCbLgFFuy4YYwHUpEfJBupCPZnxMjq_1k",
    authDomain: "micheal-music.firebaseapp.com",
    databaseURL: "https://micheal-music.firebaseio.com",
    projectId: "micheal-music",
    storageBucket: "micheal-music.appspot.com",
    messagingSenderId: "1092961256776"
  };

  firebase.initializeApp(config);

  let db = firebase.firestore();


  let musiclist = document.getElementsByClassName("main-ullist")[0];
  let musickeys=[];
  let musiccover=[];
  let musicdesc=[];
  let musicname=[];
  let musicurl=[];
  let musicurl2=[];
  let k=0; 


  let mlist_li=[];
  let mlistdiv=[];
  let mlist_empty=[];
  let mlist_name=[];
  let mlist_lenght=[];
  let mlist_play=[];


  let audiodiv = document.getElementsByClassName("audiotags")[0];
  let audiotag = [];
  let sourcemp3 = [];
  let sourceogg = [];
  
  const bplaypause = document.getElementsByClassName("play")[0];

  let musicindex;

  let pauseMusicElement ;


/*
  db.collection("musics").add({
    cover : "test1",
    desc :"test desc",
    name :"test",
    url :"urltestmp3",
    url2 :"urltestogg"

}).then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
}).catch(function(error) {
    console.error("Error adding document: ", error);
});


let completelist = document.createDocumentFragment();*/


function createlists(k,musickeys){

    mlist_li[k] = document.createElement("li");
    mlist_li[k].id = musickeys[k]+"";
    mlist_li[k].className = "music-li-list";

    mlistdiv[k] = document.createElement("div");
    mlistdiv[k].className = "musiclist";

    mlist_empty[k] = document.createElement("div");
    mlist_empty[k].className = "list-empty";

    mlist_name[k] = document.createElement("div");
    mlist_name[k].className = "list-musicname";
    mlist_name[k].innerHTML= musicname[k] ;

    mlist_lenght[k] = document.createElement("div");
    mlist_lenght[k].className = "list-musiclength";

    mlist_play[k] = document.createElement("div");
    mlist_play[k].className = "list-play";

    musiclist.appendChild(mlist_li[k]);
    mlist_li[k].appendChild(mlistdiv[k]);
    mlistdiv[k].appendChild(mlist_empty[k]);
    mlistdiv[k].appendChild(mlist_name[k]);
    mlistdiv[k].appendChild(mlist_lenght[k]);
    mlistdiv[k].appendChild(mlist_play[k]);
}



function createaudio(k,musickeys,musicurl,musicurl2){

    audiotag[k] = document.createElement("audio");
    sourcemp3[k] = document.createElement("source");
    sourceogg[k] = document.createElement("source");

    sourcemp3[k].type = "audio/mp3";
    sourceogg[k].type = "audio/ogg";

    audiotag[k].id = musickeys[k];
    sourcemp3[k].src = String(musicurl[k]);
    sourceogg[k].src = String(musicurl2[k]);

    audiodiv.appendChild(audiotag[k]);
    audiotag[k].appendChild(sourcemp3[k]);
    audiotag[k].appendChild(sourceogg[k]);


}




db.collection("musics").get().then(function(querySnapshot) {


    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots      
        musickeys[k] = doc.id; 
        musiccover[k] = doc.data().cover;
        musicdesc[k] = doc.data().desc;
        musicname[k] = doc.data().name;
        musicurl[k] = doc.data().url;
        musicurl2[k] = doc.data().url2;
        console.log(doc.id, " => ", doc.data());
        createlists(k,musickeys);
        createaudio(k,musickeys,musicurl,musicurl2);

        k++;
    });
    musicindex = document.getElementById(musickeys[0]);

    for(let i = 0 ; i < listofmusic.length ; i++){

        listofmusic[i].addEventListener('click',function(){

            console.log(this.id);
            musicindex = document.getElementById(this.id);
            pauseAllAudio();
            playAudio(musicindex);
        
        });

    }

    function pauseAllAudio(){
        for(let j=0;j < listofmusic.length ; j++){
            pauseMusicElement = document.getElementById(listofmusic[j].id);
            
            if (pauseMusicElement.paused){
            } 
            else 
            {
                pauseMusicElement.pause();
                pauseMusicElement.currentTime=0;
                bplaypause.id = "";
                bplaypause.id = "play-music";
            }
        
        }

            
        }
    

});



listofmusic = document.getElementsByClassName("music-li-list");

// clear any playing music

/*
function pauseAllAudio(listofmusic,musicindex){

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
*/
// player 

bplaypause.addEventListener("click",function(){ playAudio(musicindex)});


function playAudio(musicindex){

    console.log(musicindex);
    console.log("play button");
    
	if (musicindex.paused) {
        musicindex.play();
        bplaypause.id = "";
		bplaypause.id = "pause-music";
    } 
    else 
    {
        musicindex.pause();
        bplaypause.id = "";
		bplaypause.id = "play-music";
	}
}
/*
em1.addEventListener("click",fsong1);
em2.addEventListener("click",fsong2);
em3.addEventListener("click",fsong3);
em4.addEventListener("click",fsong4);


function fsong1(){
    //song = music1;
    sindex = 0;
    playAudio(sindex);
    //return song;
}

function fsong2(){
    
   // song = music2;
   sindex = 1;
    playAudio(sindex);
    //return song;
}

function fsong3(){
    
    //song = music3;
    sindex = 2;
    playAudio(sindex);
    //return song;
}

function fsong4(){
   // song = music4;
   sindex = 3;
    playAudio(sindex);
    //return song;
}


function playAudio(sindex) {

	if (song[sindex].paused) {
        song[sindex].play();
        playpause.className = "";
		playpause.className = "pause";
    } 
    else 
    {
        song[sindex].pause();
        playpause.className = "";
		playpause.className = "play";
	}
}

*/