function renderChain(chain) {
    const container = document.querySelector(".blockchain");
    container.innerHTML = "";

    chain.forEach((block, index) => {
        const blockDiv = document.createElement("div");
        blockDiv.className = "block";

        blockDiv.innerHTML = `
            <h3>Block #${index}</h3>

            <p><strong>Timestamp:</strong> ${new Date(block.timestamp).toLocaleString()}</p>
            <p><strong>Previous Hash:</strong> ${block.previousHash}</p>
            <p><strong>Hash:</strong> ${block.hash}</p>
            <p><strong>Nonce:</strong> ${block.nonce}</p>

            <h4>Transactions</h4>
            ${block.transaction.length === 0
                ? "<p>No transactions</p>"
                : block.transaction.map(tx => `
                    <div class="tx">
                        <p>From: ${tx.fromAddress ?? "SYSTEM"}</p>
                        <p>To: ${tx.toAddress}</p>
                        <p>Amount: ${tx.amount}</p>
                    </div>
                `).join("")
            }
        `;

        container.appendChild(blockDiv);
    });
}


async function getchain(){
    const res = await fetch("http://localhost:3000/chain");
    const chain = await res.json();
    // document.querySelector(".blockchain").innerText = JSON.stringify(chain , null , 4);
    renderChain(chain);
}

let added = document.querySelector(".added")

document.querySelector(".addTx").onclick = async ()=>{

    let from = document.querySelector(".from")
    let to = document.querySelector(".to")
    let amount = document.querySelector(".amount")

    if(!from.value || !to.value){
        alert("from or to address is necessary ")
        return
    }

    await fetch("http://localhost:3000/transaction",{
        method : "POST",
        headers :{"content-type" : "application/json"},
        body: JSON.stringify({
            to : to.value,
            amount: amount.value
        })
    })

    added.style.display = "inline";
    
    setTimeout(() => {
        added.style.display = "none"
    }, 2000);
};

document.querySelector(".mine").onclick = async () => {
    let miner = document.querySelector(".miner")
    if(!miner.value){
        alert("enter the miner address")
        return;
    }
    await fetch("http://localhost:3000/mine",{
        method:"POST",
        headers: {"content-type":"application/json"},
        body:JSON.stringify({
            minerAddress : miner.value
        })
    })

    getchain();
}

document.querySelector(".check").onclick = async () => {
    const res = await fetch("http://localhost:3000/isValid");
    const data = await res.json();
    alert(data.valid ? "Valid chain" : "Invalid chain");
};

getchain();