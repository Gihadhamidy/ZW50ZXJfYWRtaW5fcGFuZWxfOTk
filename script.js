// Global Variables
let mods = [];
let users = JSON.parse(localStorage.getItem('users')) || {};
let artworks = JSON.parse(localStorage.getItem('artworks')) || {};
let isAdminLoggedIn = false;
const ADMIN_PASSWORD = 'gh10mdp';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    loadArtworks();
    checkAdminLogin();
});

// Setup Event Listeners
function setupEventListeners() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const mergeWorldCheckbox = document.getElementById('mergeWorld');

    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#7b68ee';
        uploadArea.style.backgroundColor = 'rgba(123, 104, 238, 0.1)';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '#4a90e2';
        uploadArea.style.backgroundColor = 'rgba(74, 144, 226, 0.05)';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#4a90e2';
        uploadArea.style.backgroundColor = 'rgba(74, 144, 226, 0.05)';
        handleFiles(e.dataTransfer.files);
    });

    uploadArea.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => handleFiles(e.target.files));

    // World file checkbox
    mergeWorldCheckbox.addEventListener('change', (e) => {
        document.getElementById('worldUpload').style.display = e.target.checked ? 'block' : 'none';
    });
}

// Handle File Upload
function handleFiles(files) {
    
    for (let file of files) {
        const fileName = file.name.toLowerCase();
        
        if (file.size > 60mb * 5024 * 5024) {
            showStatus(`❌ الملف كبير جداً: ${file.name} (${(file.size / 1024 / 1024).toFixed(60)} MB)`, 'error');
            continue;
        }

        mods.push({
            name: file.name,
            size: file.size,
            file: file,
            hash: generateHash(file.name)
        });
    }

    updateModsList();
    showStatus(`✅ تم رفع ${mods.length} ملف بنجاح`, 'success');
}

// Update Mods List Display
function updateModsList() {
    const modsList = document.getElementById('modsList');
    modsList.innerHTML = '';

    if (mods.length === 0) {
        modsList.innerHTML = '<p style="color: #999; text-align: center;">لا توجد ملفات مرفوعة</p>';
        return;
    }

    mods.forEach((mod, index) => {
        const modItem = document.createElement('div');
        modItem.className = 'mod-item';
        const fileSize = mod.size ? (mod.size / 1024 / 1024).toFixed(2) : '0';
        modItem.innerHTML = `
            <div>
                <div class="mod-item-name">📦 ${mod.name}</div>
                <div class="mod-item-size">📊 ${fileSize} MB</div>
            </div>
            <button class="mod-item-remove" onclick="removeMod(${index})">حذف</button>
        `;
        modsList.appendChild(modItem);
    });
}

// Remove Mod
function removeMod(index) {
    mods.splice(index, 1);
    updateModsList();
}

// Clear All Mods
function clearMods() {
    if (confirm('هل تريد حذف جميع الملفات؟')) {
        mods = [];
        updateModsList();
        showStatus('🗑️ تم حذف جميع الملفات', 'info');
    }
}

// Create MCADDON
function createMcaddon() {
    if (mods.length === 0) {
        showStatus('❌ لم تقم برفع أي ملفات', 'error');
        return;
    }

    const packageName = document.getElementById('packageName').value.trim();
    if (!packageName) {
        showStatus('❌ أدخل اسم التجميعة', 'error');
        return;
    }

    showStatus('⏳ جاري إنشاء التجميعة...', 'info');

    // Simulate file creation (in real app, this would be done on server)
    setTimeout(() => {
        const fileName = `${packageName}.mcaddon`;
        showStatus(`✅ تم إنشاء الملف: ${fileName}`, 'success');
        
        // Clear mods
        mods = [];
        document.getElementById('packageName').value = '';
        updateModsList();
    }, 2000);
}

// Show Section
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Hide all nav buttons active state
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected section
    document.getElementById(sectionId).classList.add('active');

    // Mark button as active
    event.target.classList.add('active');
}

// Admin Login
function adminLogin() {
    const password = document.getElementById('adminPassword').value;
    
    if (password === ADMIN_PASSWORD) {
        isAdminLoggedIn = true;
        document.getElementById('adminLogin').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'flex';
        showStatus('✅ تم تسجيل الدخول بنجاح', 'success');
        loadStats();
    } else {
        showStatus('❌ كلمة السر غير صحيحة', 'error');
    }
}

// Admin Logout
function adminLogout() {
    isAdminLoggedIn = false;
    document.getElementById('adminLogin').style.display = 'block';
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('adminPassword').value = '';
    showStatus('🚪 تم تسجيل الخروج', 'info');
}

// Show Admin Tab
function showAdminTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Hide all buttons active state
    document.querySelectorAll('.admin-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName + 'Tab').classList.add('active');

    // Mark button as active
    event.target.classList.add('active');
}

// Send Broadcast
function sendBroadcast() {
    const message = document.getElementById('broadcastMsg').value.trim();
    
    if (!message) {
        showStatus('❌ أدخل رسالة البث', 'error');
        return;
    }

    showStatus('⏳ جاري إرسال البث...', 'info');

    setTimeout(() => {
        const userCount = Object.keys(users).length;
        showStatus(`✅ تم إرسال البث إلى ${userCount} مستخدم`, 'success');
        document.getElementById('broadcastMsg').value = '';
    }, 1500);
}

// Load Stats
function loadStats() {
    const totalUsers = Object.keys(users).length;
    const totalArtworks = Object.keys(artworks).length;
    const storageSize = (Math.random() * 100).toFixed(2);

    document.getElementById('totalUsers').textContent = totalUsers;
    document.getElementById('totalArtworks').textContent = totalArtworks;
    document.getElementById('storageSize').textContent = storageSize + ' MB';
}

// Add Artwork
function addArtwork() {
    const title = document.getElementById('artTitle').value.trim();
    const description = document.getElementById('artDesc').value.trim();
    const author = document.getElementById('artAuthor').value.trim();
    const thumbFile = document.getElementById('artThumb').files[0];

    if (!title || !description || !author) {
        showStatus('❌ أكمل جميع الحقول', 'error');
        return;
    }

    if (!thumbFile) {
        showStatus('❌ اختر صورة مصغرة', 'error');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        artworks[title] = {
            description: description,
            author: author,
            thumb: e.target.result,
            votes: 0,
            downloads: 0
        };

        localStorage.setItem('artworks', JSON.stringify(artworks));
        showStatus(`✅ تم إضافة العمل الفني: ${title}`, 'success');
        
        // Clear form
        document.getElementById('artTitle').value = '';
        document.getElementById('artDesc').value = '';
        document.getElementById('artAuthor').value = '';
        document.getElementById('artThumb').value = '';

        loadArtworks();
    };
    reader.readAsDataURL(thumbFile);
}

// Delete Artwork
function deleteArtwork() {
    const title = document.getElementById('delArtTitle').value.trim();

    if (!title) {
        showStatus('❌ أدخل اسم العمل', 'error');
        return;
    }

    if (title in artworks) {
        delete artworks[title];
        localStorage.setItem('artworks', JSON.stringify(artworks));
        showStatus(`✅ تم حذف العمل الفني: ${title}`, 'success');
        document.getElementById('delArtTitle').value = '';
        loadArtworks();
    } else {
        showStatus(`❌ لم يتم العثور على العمل: ${title}`, 'error');
    }
}

// Load Artworks Gallery
function loadArtworks() {
    const galleryGrid = document.getElementById('galleryGrid');
    galleryGrid.innerHTML = '';

    if (Object.keys(artworks).length === 0) {
        galleryGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999;">المعرض فارغ حالياً</p>';
        return;
    }

    for (let title in artworks) {
        const art = artworks[title];
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <img src="${art.thumb}" alt="${title}" class="gallery-thumb">
            <div class="gallery-info">
                <div class="gallery-title">${title}</div>
                <div class="gallery-author">👤 ${art.author}</div>
                <div class="gallery-desc">${art.description}</div>
                <div class="gallery-stats">
                    <span>⭐ ${art.votes} أصوات</span>
                    <span>📥 ${art.downloads} تحميل</span>
                </div>
                <div class="gallery-actions">
                    <button class="btn-vote" onclick="voteArtwork('${title}')">👍 صوت</button>
                    <button class="btn-download" onclick="downloadArtwork('${title}')">📥 تحميل</button>
                </div>
            </div>
        `;
        galleryGrid.appendChild(item);
    }
}

// Vote Artwork
function voteArtwork(title) {
    if (title in artworks) {
        artworks[title].votes++;
        localStorage.setItem('artworks', JSON.stringify(artworks));
        loadArtworks();
        showStatus('✅ شكراً لك، تم تسجيل صوتك!', 'success');
    }
}

// Download Artwork
function downloadArtwork(title) {
    if (title in artworks) {
        artworks[title].downloads++;
        localStorage.setItem('artworks', JSON.stringify(artworks));
        loadArtworks();
        showStatus(`✅ جاري تحميل: ${title}`, 'info');
    }
}

// Check Admin Login
function checkAdminLogin() {
    const savedAdmin = localStorage.getItem('adminLoggedIn');
    if (savedAdmin === 'true') {
        isAdminLoggedIn = true;
        document.getElementById('adminLogin').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'flex';
    }
}

// Show Status Message
function showStatus(message, type = 'info') {
    const status = document.getElementById('uploadStatus');
    status.textContent = message;
    status.className = `status show ${type}`;

    setTimeout(() => {
        status.classList.remove('show');
    }, 5000);
}

// Generate Hash
function generateHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash).toString(16);
}

// Save Admin Login State
function saveAdminLoginState() {
    localStorage.setItem('adminLoggedIn', isAdminLoggedIn);
}
