let themeBtn = document.getElementById("themeToggle");
if (themeBtn) {
    themeBtn.onclick = () => {
        document.body.classList.toggle("dark");
        localStorage.setItem("mc3theme", document.body.classList.contains("dark"));
    };
    if (localStorage.getItem("mc3theme") === "true") {
        document.body.classList.add("dark");
    }
}

async function loadInventory() {
    let res = await fetch("inventory.json");
    let data = await res.json();
    return data;
}

function renderInventory(items) {
    let div = document.getElementById("inventory");
    div.innerHTML = "";

    items.forEach(item => {
        div.innerHTML += `
        <div class="item-card">
            <h3>${item.code} – ${item.brand}</h3>
            <p><b>Type:</b> ${item.type}</p>
            <p><b>Fitment:</b> ${item.fitment}</p>
            <p><b>Stock:</b> ${item.stock} 
                ${item.stock <= 5 ? "<span class='low-stock'>(LOW!)</span>" : ""}
            </p>
            <p><b>Wholesale:</b> ₱${item.wholesale}</p>
            <p><b>Retail:</b> ₱${item.retail}</p>
        </div>`;
    });
}

if (document.getElementById("inventory")) {
    loadInventory().then(data => {
        renderInventory(data);

        document.getElementById("search").onkeyup = (e) => {
            let q = e.target.value.toLowerCase();
            let filtered = data.filter(i =>
                i.code.toLowerCase().includes(q) ||
                i.brand.toLowerCase().includes(q) ||
                i.type.toLowerCase().includes(q) ||
                i.fitment.toLowerCase().includes(q)
            );
            renderInventory(filtered);
        };
    });
}
