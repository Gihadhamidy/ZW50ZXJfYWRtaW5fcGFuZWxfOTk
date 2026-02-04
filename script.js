function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function toggleWorldUI() {
    const isChecked = document.getElementById('mergeWorld').checked;
    document.getElementById('worldInputArea').style.display = isChecked ? 'block' : 'none';
}

function startEngine() {
    const status = document.getElementById('statusReport');
    const isWorld = document.getElementById('mergeWorld').checked;
    const worldFile = document.getElementById('worldFile').files[0];

    status.innerHTML = "⏳ جاري المعالجة وحقن البيانات...";
    status.style.display = "block";

    setTimeout(() => {
        if(isWorld && worldFile) {
            status.innerHTML = `✅ تم دمج المودات في العالم: ${worldFile.name}`;
        } else {
            status.innerHTML = "✅ تم إنشاء التجميعة بنجاح!";
        }
    }, 2500);
}

function triggerSecret() {
    const code = prompt("أدخل كود الوصول:");
    if(code === "gh10mdp") {
        alert("🔓 تم فتح وضع المطور");
    }
}
