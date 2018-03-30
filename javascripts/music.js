  let musiclist = document.getElementsByClassName("main-ullist")[0];
  let musickeys=[];
  let musiccover=[];
  let musicdesc=[];
  let musicname=[];
  let musicurl=[];
  let musicurl2=[];


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
  let covername = document.getElementsByClassName('main-covername')[0];
  let bNextMusic = document.getElementsByClassName('next-music')[0];
  let bPreMusic = document.getElementsByClassName('pre-music')[0];
  let listofmusic = document.getElementsByClassName("music-li-list");
  let musicindex;
  let pauseMusicElement ;
  let chk;

  let musicbar = document.getElementsByClassName('progressbar')[0]; 
  let musiccurtime;
  let musicduration; 
  let musicbarlength;






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



  db.collection("musics").get().then(function(querySnapshot) {
    let k=0; 
    querySnapshot.forEach(function(doc) {
        getData(k,doc);            
        k++;
    });
    listMusicPlay();


       
    

  });

    bNextMusic.addEventListener('click',function(){
        musicindex = playNextAudio(musicindex,listofmusic);
    });

    bPreMusic.addEventListener('click',function(){   
        musicindex =playPreAudio(musicindex,listofmusic);
    });

    bplaypause.addEventListener("click",function(){
        playAudio(musicindex);
    });


    

    




    

/*
  function musicPlayer(db){
  
    promise.then(function(e){
        printData();
    });

  };

  */

  function printData(){
    console.log(musickeys);
    console.log(musiccover);
    console.log(musicdesc);
    console.log(musiccover);
    console.log(musicname);
    console.log(musicurl);
    }

  

    
    
    function getData(k,doc){
        // doc.data() is never undefined for query doc snapshots      
        musickeys[k] = doc.id; 
        musiccover[k] = doc.data().cover;
        musicdesc[k] = doc.data().desc;
        musicname[k] = doc.data().name;
        musicurl[k] = doc.data().url;
        musicurl2[k] = doc.data().url2;
        //console.log(doc.id, " => ", doc.data());
        createlists(k,musickeys);
        createaudio(k,musickeys,musicurl,musicurl2);  
     }


   

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


   function listMusicPlay(){
    musicindex = document.getElementById(musickeys[0]);

         for(let i = 0 ; i < listofmusic.length ; i++){

             listofmusic[i].addEventListener('click',function(){

                 console.log(this.id);
                 covername.innerHTML = musicname[i];
                 musicindex = document.getElementById(this.id);
                 pauseAllAudio();
                 playAudio(musicindex);
    
            });
        }
        
   }

   // clear any playing music

function pauseAllAudio(){
    for(let j=0;j < listofmusic.length ; j++){
        pauseMusicElement = document.getElementById(listofmusic[j].id);
        
        if (pauseMusicElement.paused){
            pauseMusicElement.currentTime=0;
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

    function musicBarAnimation(musicindex){
        musiccurtime = musicindex.currentTime;
        musicduration = musicindex.duration;
        musicbarlength = musiccurtime*(100/musicduration);
        musicbar.style.width = musicbarlength+'%';
      }





function playAudio(musicindex){

    musicindex.addEventListener('timeupdate',function(){
        musicBarAnimation(musicindex);
    });

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


function playNextAudio(musicindex,listofmusic){

    pauseAllAudio();

    for(chk=0 ; chk < listofmusic.length ; chk++){


        if(chk == listofmusic.length-1){
            chk = 0;
            musicindex = document.getElementById(listofmusic[chk].id);
            playAudio(musicindex);
            return musicindex;
            break;

        }
        else if(musicindex.id == listofmusic[chk].id){
            chk = chk + 1;
            musicindex = document.getElementById(listofmusic[chk].id);
            playAudio(musicindex);
            return musicindex;
            break;
        }
    }
    
}

function playPreAudio(musicindex,listofmusic){

    pauseAllAudio();

    for(chk=listofmusic.length-1 ; chk >= 0 ; chk--){


        if(chk == 0){
            chk = listofmusic.length-1;
            musicindex = document.getElementById(listofmusic[chk].id);
            playAudio(musicindex);
            return musicindex;
            break;

        }
        else if(musicindex.id == listofmusic[chk].id){
            chk = chk - 1;
            musicindex = document.getElementById(listofmusic[chk].id);
            playAudio(musicindex);
            return musicindex;
            break;
        }
    }

}