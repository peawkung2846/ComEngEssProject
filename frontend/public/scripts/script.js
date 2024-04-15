import { fetchAndDrawTable } from "./table.js";
import { updateClickCount ,updateClickTimes} from "./click.js";
import { getUserIP , checkID} from "./api.js";

var img = document.getElementById("selectedImage");
var count = document.getElementById("score");
var malaysiaScore = document.getElementById('my_score');
var score = 0;
var MyScore = 10000;
var audio = new Audio('pop.mp3');
var hk_score = 1000, tw_score = 430, th_score = 200, jp_score = 150, fi_score = 250, se_score = 100, pl_score = 500, dm_score = 280, id_score=590, hu_score=319, sr_score = 300; 
var userIp;
document.addEventListener("DOMContentLoaded", () =>{
    fetchAndDrawTable();
    userIp = getUserIP();
})
// mouseclick event

img.addEventListener("mousedown", function(event){
    increaseScore();
    if (img.src.includes('popcat1.png')) {
        img.src = 'popcat2.png';
        audio.currentTime = 0;
        audio.play();
    }
    else if(img.src.includes('popcat2.png')){
        img.src = 'popcat1.png';
        audio.currentTime = 0;
        audio.play();
    }
});

img.addEventListener("mouseup", function(event){
    if (img.src.includes('popcat2.png')) {
        img.src = 'popcat1.png';
    }
    else if(img.src.includes('popcat1.png')){
        img.src = 'popcat2.png';
    }
});

// touch event
img.addEventListener("touchstart", function(event){
    increaseScore();
    if (img.src.includes('popcat1.png')) {
        img.src = 'popcat2.png';
        audio.play();
    }
    else if(img.src.includes('popcat2.png')){
        img.src = 'popcat1.png';
        audio.play();
    }
});

img.addEventListener("touchmove", function(event){
    if (img.src.includes('popcat2.png')) {
        img.src = 'popcat1.png';
    }
    if (img.src.includes('popcat1.png')) {
        img.src = 'popcat2.png';
    }
});


// Score on leaderboard
//setInterval(startCountHk, 1);
function startCount(){
    score++;
    document.getElementById("table").rows[1].cells.item(3).innerHTML = score;
}

function increaseScore(){
    score++;
    MyScore++;
    count.innerHTML = score;
    // malaysiaScore.innerHTML = MyScore;
    // document.getElementById("table").rows[4].cells.item(3).innerHTML = MyScore;
}

function toggleOptions() {
    var options = document.getElementById('options');
    options.style.display = options.style.display === 'block' ? 'none' : 'block';
}

function changeImage(image) {
    img.src = image;
    document.getElementById('selectedImage').src = image;
    toggleOptions();
}

var username;
const popupOverlay = document.getElementById('popupOverlay');

const popup = document.getElementById('popup');

const closePopup = document.getElementById('closePopup');

const emailInput = document.getElementById('emailInput');

// Function to open the popup

function openPopup() {
    var result =  checkID("69420");
    result.then(data => {
        if(data.message){
            username = data.item.name;
            score = data.item.pop[0];
            count.innerHTML = score;
        }
        else{
            popupOverlay.style.display = 'block';
        }
      }).catch(error => {
        // Handle errors if the promise is rejected
        console.error(error);
      });
    

}

// Function to close the popup

function closePopupFunc() {

    popupOverlay.style.display = 'none';

}

document.getElementById('signup').addEventListener("click", function(){ 
    username = emailInput.value;
    closePopupFunc();
});

// Event listeners

// Trigger the popup to open (you can call this function on a button click or any other event)

openPopup();

// Close the popup when the close button is clicked

closePopup.addEventListener('click', closePopupFunc);

// Close the popup when clicking outside the popup content

popupOverlay.addEventListener('click', function (event) {

    if (event.target === popupOverlay) {

        closePopupFunc();

    }

});



