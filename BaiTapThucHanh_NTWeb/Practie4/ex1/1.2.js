let students = [];
let sortDirection = 0; 

const nameInput = document.getElementById('name');
const diemInput = document.getElementById('diem');
const addBtn = document.getElementById('addBtn');
const studentBody = document.getElementById('studentBody');
const totalStudentsSpan = document.getElementById('totalStudents');
const avgScoreSpan = document.getElementById('avgScore');

const searchInput = document.getElementById('searchInput');
const filterSelect = document.getElementById('filterSelect');
const sortDiemBtn = document.getElementById('sortDiemBtn');
const sortIcon = document.getElementById('sortIcon');

function getXepLoai(diem) {
    if (diem >= 8.5) return 'Giỏi';
    if (diem >= 7.0) return 'Khá';
    if (diem >= 5.0) return 'Trung bình';
    return 'Yếu';
}

function applyFilters() {
    let filteredStudents = [...students];

    const keyword = searchInput.value.trim().toLowerCase();
    if (keyword !== '') {
        filteredStudents = filteredStudents.filter(student => 
            student.name.toLowerCase().includes(keyword)
        );
    }

    const filterValue = filterSelect.value;
    if (filterValue !== 'All') {
        filteredStudents = filteredStudents.filter(student => 
            getXepLoai(student.diem) === filterValue
        );
    }

    if (sortDirection === 1) {
        filteredStudents.sort((a, b) => a.diem - b.diem); 
        sortIcon.textContent = ' ▲';
    } else if (sortDirection === -1) {
        filteredStudents.sort((a, b) => b.diem - a.diem); 
        sortIcon.textContent = ' ▼';
    } else {
        sortIcon.textContent = ''; 
    }

    renderTable(filteredStudents);
}

function renderTable(dataToRender) {
    studentBody.innerHTML = '';

    if (dataToRender.length === 0) {
        studentBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: red;">Không có kết quả</td></tr>`;
    } else {
        dataToRender.forEach((student, index) => {
            const xepLoai = getXepLoai(student.diem);
            const tr = document.createElement('tr');
            
            if (student.diem < 5.0) {
                tr.style.backgroundColor = '#fff3cd'; 
            }

            tr.innerHTML = `
                <td style="text-align: center;">${index + 1}</td>
                <td>${student.name}</td>
                <td style="text-align: center;">${student.diem.toFixed(1)}</td>
                <td>${xepLoai}</td>
                <td style="text-align: center;">
                    <button class="delete-btn" data-id="${student.id}">Xóa</button>
                </td>
            `;
            studentBody.appendChild(tr);
        });
    }

    let totalDiem = 0;
    students.forEach(s => totalDiem += s.diem);
    
    totalStudentsSpan.textContent = students.length;
    const avg = students.length > 0 ? (totalDiem / students.length) : 0;
    avgScoreSpan.textContent = avg.toFixed(1);
}

function addStudent() {
    const name = nameInput.value.trim();
    const diem = parseFloat(diemInput.value);

    if (name === '') {
        alert('Vui lòng nhập họ tên sinh viên!');
        return;
    }
    if (isNaN(diem) || diem < 0 || diem > 10) {
        alert('Điểm không hợp lệ! Vui lòng nhập số từ 0 đến 10.');
        return;
    }

    students.push({
        id: Date.now(), 
        name: name,
        diem: diem
    });

    nameInput.value = '';
    diemInput.value = '';
    nameInput.focus();

    applyFilters();
}

addBtn.addEventListener('click', addStudent);
diemInput.addEventListener('keypress', e => { if (e.key === 'Enter') addStudent(); });

searchInput.addEventListener('input', applyFilters);

filterSelect.addEventListener('change', applyFilters);

sortDiemBtn.addEventListener('click', () => {
    if (sortDirection === 0) sortDirection = 1;
    else if (sortDirection === 1) sortDirection = -1;
    else sortDirection = 0;
    
    applyFilters();
});

studentBody.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const idToDelete = parseInt(event.target.getAttribute('data-id'));
        
        students = students.filter(student => student.id !== idToDelete);
        
        applyFilters();
    }
});