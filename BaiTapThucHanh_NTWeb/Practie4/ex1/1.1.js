let students = [];

const nameInput = document.getElementById('name');
const diemInput = document.getElementById('diem'); 
const addBtn = document.getElementById('addBtn');
const studentBody = document.getElementById('studentBody');
const totalStudentsSpan = document.getElementById('totalStudents');
const avgScoreSpan = document.getElementById('avgScore');

function renderTable() {
    studentBody.innerHTML = '';
    let totalDiem = 0;

    students.forEach((student, index) => {
        let classification = '';
        if (student.diem >= 8.5) {
            classification = 'Giỏi';
        } else if (student.diem >= 7.0) {
            classification = 'Khá';
        } else if (student.diem >= 5.0) {
            classification = 'Trung bình';
        } else {
            classification = 'Yếu';
        }

        const tr = document.createElement('tr');
        
        if (student.diem < 5.0) {
            tr.style.backgroundColor = '#fff3cd'; 
        }

        tr.innerHTML = `
            <td style="text-align: center;">${index + 1}</td>
            <td>${student.name}</td>
            <td style="text-align: center;">${student.diem.toFixed(1)}</td>
            <td>${classification}</td>
            <td style="text-align: center;">
                <button class="delete-btn" data-index="${index}">Xóa</button>
            </td>
        `;

        studentBody.appendChild(tr);
        
        totalDiem += student.diem;
    });

    totalStudentsSpan.textContent = students.length;
    const avg = students.length > 0 ? (totalDiem / students.length) : 0;
    avgScoreSpan.textContent = avg.toFixed(1);
}

function addStudent() {
    const name = nameInput.value.trim();
    const diem = parseFloat(diemInput.value);

    if (name === '') {
        alert('Vui lòng nhập họ tên sinh viên!');
        nameInput.focus();
        return;
    }
    
    if (isNaN(diem) || diem < 0 || diem > 10) {
        alert('Điểm không hợp lệ! Vui lòng nhập số từ 0 đến 10.');
        diemInput.focus();
        return;
    }

    students.push({
        name: name,
        diem: diem
    });

    renderTable();

    nameInput.value = '';
    diemInput.value = '';
    nameInput.focus();
}

addBtn.addEventListener('click', addStudent);

diemInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addStudent();
    }
});

studentBody.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const index = event.target.getAttribute('data-index');
        
        students.splice(index, 1);
        
        renderTable();
    }
});