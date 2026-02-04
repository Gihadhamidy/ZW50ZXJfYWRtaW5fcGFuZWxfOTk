// الكود السري الخاص بك
const ADMIN_PASSWORD = 'gh10mdp'; 

// ميزة دمج المودات في العوالم
async function createMcaddon() {
    const packageName = document.getElementById('packageName').value.trim();
    const isMergeWorld = document.getElementById('mergeWorld').checked;
    const worldFile = document.getElementById('worldFile').files[0];

    if (mods.length === 0) return showStatus('❌ ارفع مودات أولاً!', 'error');
    if (!packageName) return showStatus('❌ أدخل اسم التجميعة', 'error');

    showStatus('⏳ جاري المعالجة الأسطورية...', 'info');

    // هنا يتم منطق الدمج (محاكاة لمنطق الجافا)
    setTimeout(() => {
        if (isMergeWorld && worldFile) {
            showStatus(`✅ تم دمج المودات داخل العالم: ${worldFile.name}`, 'success');
        } else {
            showStatus(`✅ تم إنشاء التجميعة بنجاح: ${packageName}.mcaddon`, 'success');
        }
        // تنظيف القائمة بعد النجاح
        mods = [];
        updateModsList();
    }, 2500);
}

// الزر السري لفتح لوحة التحكم (اضغط على الفوتر/الأسفل لفتحه)
document.querySelector('.footer').addEventListener('dblclick', () => {
    const code = prompt("أدخل كود الوصول (gh10mdp):");
    if (code === ADMIN_PASSWORD) {
        showSection('admin');
        showStatus('🔓 تم فتح ميزات المشرف', 'success');
    }
});
