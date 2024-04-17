import {createItem, deleteItem, getItems} from "./api.js";

var userRank;

function sumA(inp){
    return inp.reduce((sum, current) => sum + current, 0);
}

function drawTable(items,userip) {
    var index = 1;
    const table = document.getElementById("table-body");
    table.innerHTML = "";
    const sorted = items.sort((a, b) => sumA(b.pop) - sumA(a.pop));
    userRank = 1+items.length - (items.length-sorted.findIndex(item => item.id === userip));
    const firstTenItems = sorted.slice(0, 10);
    for (const item of firstTenItems) {
        if(item.id === userip){
            index++;
            continue;
        }
        const popList = item.pop;
        const row = table.insertRow();
        row.insertCell().innerText = item.name+" #"+index.toString();
        row.insertCell().innerText = popList[0];
        row.insertCell().innerText = popList[1];
        row.insertCell().innerText = popList[2];
        const popsum = popList[0] + popList[1] + popList[2];
        row.insertCell().innerText = popsum;
        index++;
    }
}
export async function fetchAndDrawTable(userip){
    const items = await getItems();
    drawTable(items,userip);
}

export function drawPlayerRow(name,score,mode){
    const table = document.getElementById("table-body");
    const row = table.insertRow();
    row.id = 'playerRow';
    if(mode == 1){
        row.insertCell().innerText = name+" #new player";
    }
    else{
        row.insertCell().innerText = name+" #"+userRank.toString();
    }
    row.insertCell().innerText = score[0];
    row.insertCell().innerText = score[1];
    row.insertCell().innerText = score[2];
    row.insertCell().innerText = score[0]+score[1]+score[2];
}

