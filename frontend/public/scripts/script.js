import { fetchAndDrawTable, drawPlayerRow } from "./table.js";
import { getUserIP , checkID, createItem, update} from "./api.js";

window.changeImage = changeImage; //when system can find function

var img = document.getElementById("selectedImage");
var mainscreen = document.getElementById("container");
var count = document.getElementById("score");
var score = [0,0,0];
var sum_score = 0;
var prev_sum = 0;
var audio = new Audio('../res/pop.mp3');
let userIp;
var username;
var mode = 0;
let touchStarted = false;
let clickStarted = false;
let init = 0;
let pressed = 0;
document.addEventListener("DOMContentLoaded", async () =>{
    await getUserIP().then((data) => {
        fetchAndDrawTable(data.ip);
    });;
    await openPopup();
})

function toggleOptions() {
    var options = document.getElementById('options');
    options.style.display = options.style.display === 'block' ? 'none' : 'block';
}

document.getElementById('select-trigger').addEventListener("click", async function(){ 
    toggleOptions();
});

function changeImage(image,newMode) {
    mode = newMode;
    count.innerHTML = score[mode];
    img.src = image;
    document.getElementById('selectedImage').src = image;
    toggleOptions();
}
async function toggleImage(){
    if (img.src.includes('peaw1.png')) {
        img.src = '../res/peaw2.png';
        audio.currentTime = 0;
    }
    else if(img.src.includes('mes1.png')){
        img.src = '../res/mes2.png';
        audio.currentTime = 0;
    } 
    else if(img.src.includes('nine1.png')){
        img.src = '../res/nine2.png';
        audio.currentTime = 0;
    } 
    console.log(1);
    await new Promise(resolve => setTimeout(resolve, 50));
    console.log(0);
    if (img.src.includes('peaw2.png')) {
        img.src = '../res/peaw1.png';
    }
    else if(img.src.includes('mes2.png')){
        img.src = '../res/mes1.png';
    } 
    else if(img.src.includes('nine2.png')){
        img.src = '../res/nine1.png';
    } 
    else if(img.src.includes('popcat1.png')){
        img.src = 'popcat2.png';
    }  
}

document.addEventListener('keydown', function(event) {
    if(init === 0 || pressed === 1){
        return;
    }
    if (event.code === 'Space') {
        event.preventDefault();
    }
    var options = document.getElementById('options');
    options.style.display = options.style.display === 'block' ? 'none' : 'none';
    increaseScore();
    toggleImage()
    pressed = 1;
});

document.addEventListener('keyup', function(event) {
    if(init === 0){
        return;
    } 
    pressed = 0;
});


mainscreen.addEventListener("mousedown", function(event){
    if(init === 0){
        return;
    }
    var options = document.getElementById('options');
    options.style.display = options.style.display === 'block' ? 'none' : 'none';
    increaseScore();
    toggleImage()
    
});

mainscreen.addEventListener("mouseup", function(event){
    if(init === 0){
        return;
    }    
    
});

// touch event
mainscreen.addEventListener("touchstart", function(event){
    if(init === 0){
        return;
    }
    event.preventDefault();
    var options = document.getElementById('options');
    options.style.display = options.style.display === 'block' ? 'none' : 'none';
    increaseScore();
    toggleImage()
});

mainscreen.addEventListener("touchend", function(event){
    if(init === 0){
        return;
    }
});


function increaseScore(){
    audio.play();
    score[mode]++;
    sum_score++;
    count.innerHTML = score[mode];
    document.getElementById("playerRow").cells[1+mode].innerHTML = score[mode];
    document.getElementById("playerRow").cells[4].innerHTML = sum_score;
}

async function updateDb(){
    if(init === 0){
        return;
    }
    if(sum_score === prev_sum){
        await fetchAndDrawTable(userIp.ip);
        drawPlayerRow(username,score,0);
        return;
    }
    const payload = {
        filterId: userIp.ip,
        value: score,
    };
    update(payload);
    prev_sum = sum_score;
    await fetchAndDrawTable(userIp.ip);
    drawPlayerRow(username,score,0);
}

setInterval(updateDb, 10000);


const popupOverlay = document.getElementById('popupOverlay');

const emailInput = document.getElementById('emailInput');


async function openPopup() {
    userIp = await getUserIP();
    var data =  await checkID(userIp.ip);
    if(data.message){
        username = data.item.name;
        score = data.item.pop;
        sum_score = score[0]+score[1]+score[2];
        prev_sum = sum_score;
        count.innerHTML = score[0];
        drawPlayerRow(username,score,0,0);
        init = 1;
    }
    else{
        popupOverlay.style.display = 'block';
    }
    
}

function closePopupFunc() {

    popupOverlay.style.display = 'none';

}

document.getElementById('signup').addEventListener("click", async function(){ 
    username = emailInput.value;
    closePopupFunc();
    drawPlayerRow(username,score,1);
    userIp = await getUserIP();
    const payload = {
        id: userIp.ip,
        name: username,
        pop: score,
      };
    createItem(payload);
    init = 1;
});





