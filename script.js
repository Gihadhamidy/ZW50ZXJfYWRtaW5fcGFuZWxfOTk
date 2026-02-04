// ميزة التنقل بين الأقسام
function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// إظهار/إخفاء مدخل العالم
function toggleWorldInput() {
    const isChecked = document.getElementById('mergeWorld').checked;
    document.getElementById('worldInputArea').style.display = isChecked ? 'block' : 'none';
}

// المحرك الرئيسي للدمج
async function startEngine() {
    const name = document.getElementById('packageName').value;
    const isMerge = document.getElementById('mergeWorld').checked;
    const world = document.getElementById('worldFile').files[0];

    if(!name) return alert("أدخل اسم التجميعة أولاً!");

    const status = document.getElementById('status');
    status.innerHTML = "⏳ جاري الدمج وحقن البيانات...";
    status.className = "status-msg info show";

    // محاكاة عملية الدمج الأسطورية
    setTimeout(() => {
        if(isMerge && world) {
            status.innerHTML = `✅ تم حقن المودات بنجاح داخل العالم: ${world.name}`;
        } else {
            status.innerHTML = `✅ تم إنشاء التجميعة: ${name}.mcaddon`;
        }
        status.className = "status-msg success show";
    }, 3000);
}

// تفعيل الدخول السري gh10mdp
function triggerSecret() {
    const code = prompt("أدخل كود الوصول:");
    if(code === "gh10mdp") {
        alert("🔓 تم فتح الصلاحيات الكاملة");
        showSection('admin');
    }
}
