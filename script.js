function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function toggleWorldUI() {
    const isChecked = document.getElementById('mergeWorld').checked;
    document.getElementById('worldInputArea').style.display = isChecked ? 'block' : 'none';
}

function startEngine() {
    const status = document.getElementById('statusMsg');
    status.innerHTML = "⏳ جاري المعالجة... انتظر ثواني";
    status.style.display = "block";
    
    setTimeout(() => {
        status.innerHTML = "✅ اكتملت العملية بنجاح!";
    }, 3000);
}

function triggerSecret() {
    const pass = prompt("أدخل الكود السري (gh10mdp):");
    if(pass === "gh10mdp") {
        alert("🔓 تم تفعيل وضع المشرف");
    }
}
