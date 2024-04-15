import {createItem, deleteItem, getItems} from "./api.js";
function drawTable(items) {
    const table = document.getElementById("table-body");
  
    table.innerHTML = "";
    for (const item of items) {
        const popList = item.pop;
        const row = table.insertRow();
        row.insertCell().innerText = item.id;
        row.insertCell().innerText = item.name;
        row.insertCell().innerText = popList[0];
        row.insertCell().innerText = popList[1];
        row.insertCell().innerText = popList[2];
  
    }
}
export async function fetchAndDrawTable(){
    const items = await getItems();
    drawTable(items);
}

