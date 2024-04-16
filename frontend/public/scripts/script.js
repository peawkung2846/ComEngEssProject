import { fetchAndDrawTable, drawPlayerRow } from "./table.js";
import { updateClickCount ,updateClickTimes} from "./click.js";
import { getUserIP , checkID, createItem, update} from "./api.js";

window.changeImage = changeImage; //when system can find function

var img = document.getElementById("selectedImage");
var count = document.getElementById("score");
var score = [0,0,0];
var sum_score = 0;
var prev_sum = 0;
var audio = new Audio('pop.mp3');
let userIp;
var username;
document.addEventListener("DOMContentLoaded", async () =>{
    getUserIP().then((data) => {
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

function changeImage(image) {
    img.src = image;
    document.getElementById('selectedImage').src = image;
    toggleOptions();
}


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
//setInterval(updateDb, 60000);

function increaseScore(){
    score[0]++;
    sum_score++;
    count.innerHTML = score[0];
    document.getElementById("playerRow").cells[1].innerHTML = score[0];
    document.getElementById("playerRow").cells[4].innerHTML = sum_score;
}

async function updateDb(){
    if(sum_score === prev_sum){
        await fetchAndDrawTable(userIp.ip);
        drawPlayerRow(username,score);
        return;
    }
    const payload = {
        filterName: username,
        value: score,
    };
    update(payload);
    prev_sum = sum_score;
    await fetchAndDrawTable(userIp.ip);
    drawPlayerRow(username,score);
}

setInterval(updateDb, 60000);


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
        drawPlayerRow(username,score);
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
    drawPlayerRow(username,score);
    userIp = await getUserIP();
    const payload = {
        id: userIp.ip,
        name: username,
        pop: score,
      };
    createItem(payload);
});





