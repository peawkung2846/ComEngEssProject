import {createItem, deleteItem, getItems} from "./api.js";
function drawTable(items) {
    const table = document.getElementById("table-body");
    table.innerHTML = "";
    const firstTenItems = items.slice(0, 10);
    for (const item of firstTenItems) {
        const popList = item.pop;
        const row = table.insertRow();
        row.insertCell().innerText = item.name;
        row.insertCell().innerText = popList[0];
        row.insertCell().innerText = popList[1];
        row.insertCell().innerText = popList[2];
        const popsum = popList[0] + popList[1] + popList[2];
        row.insertCell().innerText = popsum;
    }
}
export async function fetchAndDrawTable(){
    const items = await getItems();
    drawTable(items);
}

export function drawPlayerRow(name,score){
    const table = document.getElementById("table-body");
    const row = table.insertRow();
    row.id = 'playerRow';
    row.insertCell().innerText = name;
    row.insertCell().innerText = score[0];
    row.insertCell().innerText = score[1];
    row.insertCell().innerText = score[2];
    row.insertCell().innerText = score[0]+score[1]+score[2];
}

