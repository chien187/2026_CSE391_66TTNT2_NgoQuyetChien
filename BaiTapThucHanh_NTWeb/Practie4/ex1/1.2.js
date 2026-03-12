// 1. Mảng gốc lưu toàn bộ sinh viên
let students = [];
// Biến lưu trạng thái sắp xếp: 0 (không sắp xếp), 1 (tăng dần), -1 (giảm dần)
let sortDirection = 0; 

// Lấy các DOM Elements
const nameInput = document.getElementById('name');
const diemInput = document.getElementById('diem');
const addBtn = document.getElementById('addBtn');
const studentBody = document.getElementById('studentBody');
const totalStudentsSpan = document.getElementById('totalStudents');
const avgScoreSpan = document.getElementById('avgScore');

// DOM Elements cho Filter & Search
const searchInput = document.getElementById('searchInput');
const filterSelect = document.getElementById('filterSelect');
const sortDiemBtn = document.getElementById('sortDiemBtn');
const sortIcon = document.getElementById('sortIcon');

// Hàm phụ trợ: Xác định xếp loại
function getXepLoai(diem) {
    if (diem >= 8.5) return 'Giỏi';
    if (diem >= 7.0) return 'Khá';
    if (diem >= 5.0) return 'Trung bình';
    return 'Yếu';
}

// 2. Hàm TỔNG HỢP: Xử lý Lọc, Tìm kiếm, Sắp xếp
function applyFilters() {
    // Tạo một bản sao của mảng gốc để thao tác
    let filteredStudents = [...students];

    // a. Tìm kiếm theo tên (Realtime)
    const keyword = searchInput.value.trim().toLowerCase();
    if (keyword !== '') {
        filteredStudents = filteredStudents.filter(student => 
            student.name.toLowerCase().includes(keyword)
        );
    }

    // b. Lọc theo xếp loại
    const filterValue = filterSelect.value;
    if (filterValue !== 'All') {
        filteredStudents = filteredStudents.filter(student => 
            getXepLoai(student.diem) === filterValue
        );
    }

    // c. Sắp xếp theo điểm
    if (sortDirection === 1) {
        filteredStudents.sort((a, b) => a.diem - b.diem); // Tăng dần
        sortIcon.textContent = ' ▲';
    } else if (sortDirection === -1) {
        filteredStudents.sort((a, b) => b.diem - a.diem); // Giảm dần
        sortIcon.textContent = ' ▼';
    } else {
        sortIcon.textContent = ''; // Không sắp xếp
    }

    // Gọi hàm render truyền vào mảng đã lọc
    renderTable(filteredStudents);
}

// 3. Hàm hiển thị dữ liệu ra bảng
function renderTable(dataToRender) {
    studentBody.innerHTML = '';

    // Xử lý trường hợp không có kết quả
    if (dataToRender.length === 0) {
        studentBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: red;">Không có kết quả</td></tr>`;
    } else {
        dataToRender.forEach((student, index) => {
            const xepLoai = getXepLoai(student.diem);
            const tr = document.createElement('tr');
            
            if (student.diem < 5.0) {
                tr.style.backgroundColor = '#fff3cd'; 
            }

            // CHÚ Ý: Dùng data-id="${student.id}" thay vì index
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

    // Cập nhật thống kê (Dựa trên mảng GỐC của cả lớp)
    let totalDiem = 0;
    students.forEach(s => totalDiem += s.diem);
    
    totalStudentsSpan.textContent = students.length;
    const avg = students.length > 0 ? (totalDiem / students.length) : 0;
    avgScoreSpan.textContent = avg.toFixed(1);
}

// 4. Hàm thêm sinh viên
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

    // Thêm id duy nhất (Date.now) cho mỗi sinh viên để xóa cho chuẩn
    students.push({
        id: Date.now(), 
        name: name,
        diem: diem
    });

    nameInput.value = '';
    diemInput.value = '';
    nameInput.focus();

    // Mỗi lần thêm, chạy lại bộ lọc hiện tại để cập nhật bảng
    applyFilters();
}

// 5. Các Event Listeners
addBtn.addEventListener('click', addStudent);
diemInput.addEventListener('keypress', e => { if (e.key === 'Enter') addStudent(); });

// Event: Tìm kiếm (Realtime)
searchInput.addEventListener('input', applyFilters);

// Event: Lọc theo xếp loại
filterSelect.addEventListener('change', applyFilters);

// Event: Sắp xếp theo điểm
sortDiemBtn.addEventListener('click', () => {
    // Đảo chu kỳ: 0 -> 1 -> -1 -> 0
    if (sortDirection === 0) sortDirection = 1;
    else if (sortDirection === 1) sortDirection = -1;
    else sortDirection = 0;
    
    applyFilters();
});

// Event: Xóa sinh viên
studentBody.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        // Lấy ID duy nhất của sinh viên cần xóa
        const idToDelete = parseInt(event.target.getAttribute('data-id'));
        
        // Lọc lại mảng gốc, bỏ đi sinh viên có ID trùng khớp
        students = students.filter(student => student.id !== idToDelete);
        
        // Cập nhật lại giao diện (giữ nguyên các bộ lọc đang có)
        applyFilters();
    }
});