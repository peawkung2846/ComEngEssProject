import { fetchAndDrawTable } from "./table.js";
import { updateClickCount ,updateClickTimes} from "./click.js";
import { getUserIP } from "./api.js";

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
    console.log(userIp);
})
var username;

// mouseclick event

img.addEventListener("mousedown", function(event){
    increaseScore();
    updateClickTimes(getUserIP, 1)
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
function startCountHk(){
    hk_score++;
    document.getElementById("table").rows[1].cells.item(3).innerHTML = hk_score;
}

//setInterval(startCountTw, 20);

function startCountTw(){
    tw_score++;
    document.getElementById("table").rows[2].cells.item(3).innerHTML = tw_score;
}

//setInterval(startCountTh, 25);

function startCountTh(){
    th_score++;
    document.getElementById("table").rows[3].cells.item(3).innerHTML = th_score;
}

//setInterval(startCountJp, 40);

function startCountJp(){
    jp_score++;
    document.getElementById("table").rows[4].cells.item(3).innerHTML = jp_score;
}

/*setInterval(startCountFi, 34);

function startCountFi(){
    fi_score++;
    document.getElementById("table").rows[6].cells.item(3).innerHTML = fi_score;
}

setInterval(startCountSe, 20);

function startCountSe(){
    se_score++;
    document.getElementById("table").rows[7].cells.item(3).innerHTML = se_score;
}

setInterval(startCountPl, 15);

function startCountPl(){
    pl_score++;
    document.getElementById("table").rows[8].cells.item(3).innerHTML = pl_score;
}

setInterval(startCountDm, 31);

function startCountDm(){
    dm_score++;
    document.getElementById("table").rows[9].cells.item(3).innerHTML = dm_score;
}

setInterval(startCountId, 29);

function startCountId(){
    id_score++;
    document.getElementById("table").rows[10].cells.item(3).innerHTML = id_score;
}

setInterval(startCountHu, 70);

function startCountHu(){
    hu_score++;
    document.getElementById("table").rows[11].cells.item(3).innerHTML = hu_score;
}

setInterval(startCountSr, 5);

function startCountSr(){
    sr_score++;
    document.getElementById("table").rows[12].cells.item(3).innerHTML = sr_score;
}*/

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


const popupOverlay = document.getElementById('popupOverlay');

const popup = document.getElementById('popup');

const closePopup = document.getElementById('closePopup');

const emailInput = document.getElementById('emailInput');

// Function to open the popup

function openPopup() {

    popupOverlay.style.display = 'block';

}

// Function to close the popup

function closePopupFunc() {

    popupOverlay.style.display = 'none';

}

// Function to submit the signup form

function submitForm() {

    username = emailInput.value;

    // Add your form submission logic here


    closePopupFunc(); // Close the popup after form submission

}

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

