let inventory = [];

async function loadInventory() {
    let res = await fetch("inventory.json");
    inventory = await res.json();
    displayInventory();
    displayAdmin();
}

function displayInventory() {
    let body = document.getElementById("inventoryBody");
    if (!body) return;

    body.innerHTML = "";
    inventory.forEach(item => {
        body.innerHTML += `
        <tr>
            <td>${item.code}</td>
            <td>${item.type}</td>
            <td>${item.brand}</td>
            <td>${item.fitment}</td>
            <td>${item.stock}</td>
            <td>₱${item.retail}</td>
            <td>₱${item.wholesale}</td>
        </tr>`;
    });
}

function displayAdmin() {
    let body = document.getElementById("adminBody");
    if (!body) return;

    body.innerHTML = "";
    inventory.forEach((item, i) => {
        body.innerHTML += `
        <tr>
            <td>${item.code}</td>
            <td>${item.type}</td>
            <td>${item.brand}</td>
            <td><textarea onchange="edit(${i}, 'fitment', this.value)">${item.fitment}</textarea></td>
            <td><input type="number" value="${item.stock}" onchange="edit(${i}, 'stock', this.value)"></td>
            <td><input type="number" value="${item.retail}" onchange="edit(${i}, 'retail', this.value)"></td>
            <td><input type="number" value="${item.wholesale}" onchange="edit(${i}, 'wholesale', this.value)"></td>
            <td><button onclick="removeItem(${i})">Delete</button></td>
        </tr>`;
    });
}

function edit(i, field, value) {
    inventory[i][field] = value;
}

function removeItem(i) {
    inventory.splice(i, 1);
    displayAdmin();
}

function downloadJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(inventory, null, 4));
    const link = document.createElement("a");
    link.href = dataStr;
    link.download = "inventory.json";
    link.click();
}

loadInventory();
