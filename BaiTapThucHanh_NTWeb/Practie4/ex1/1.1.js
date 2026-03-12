// 1. Khởi tạo mảng lưu danh sách sinh viên
let students = [];

// 2. Lấy các phần tử DOM từ HTML
const nameInput = document.getElementById('name');
const diemInput = document.getElementById('diem'); // Đã đổi thành diem
const addBtn = document.getElementById('addBtn');
const studentBody = document.getElementById('studentBody');
const totalStudentsSpan = document.getElementById('totalStudents');
const avgScoreSpan = document.getElementById('avgScore'); // Giữ nguyên theo HTML cũ

// 3. Hàm hiển thị (render) lại bảng dữ liệu
function renderTable() {
    // Xóa rỗng nội dung bảng cũ trước khi vẽ lại
    studentBody.innerHTML = '';
    let totalDiem = 0;

    // Duyệt qua mảng students để tạo các hàng (tr)
    students.forEach((student, index) => {
        // Tính toán xếp loại
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

        // Tạo thẻ tr
        const tr = document.createElement('tr');
        
        // Tô màu vàng cho hàng có điểm < 5.0
        if (student.diem < 5.0) {
            tr.style.backgroundColor = '#fff3cd'; 
        }

        // Gắn dữ liệu vào hàng, dùng data-index cho nút Xóa
        tr.innerHTML = `
            <td style="text-align: center;">${index + 1}</td>
            <td>${student.name}</td>
            <td style="text-align: center;">${student.diem.toFixed(1)}</td>
            <td>${classification}</td>
            <td style="text-align: center;">
                <button class="delete-btn" data-index="${index}">Xóa</button>
            </td>
        `;

        // Thêm hàng vào tbody
        studentBody.appendChild(tr);
        
        // Cộng dồn điểm để tính trung bình
        totalDiem += student.diem;
    });

    // Cập nhật dòng thống kê
    totalStudentsSpan.textContent = students.length;
    const avg = students.length > 0 ? (totalDiem / students.length) : 0;
    avgScoreSpan.textContent = avg.toFixed(1);
}

// 4. Hàm xử lý khi thêm sinh viên
function addStudent() {
    const name = nameInput.value.trim();
    const diem = parseFloat(diemInput.value);

    // Kiểm tra hợp lệ (Validation)
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

    // Thêm dữ liệu vào mảng
    students.push({
        name: name,
        diem: diem
    });

    // Vẽ lại bảng
    renderTable();

    // Reset form và đưa con trỏ về ô Nhập tên
    nameInput.value = '';
    diemInput.value = '';
    nameInput.focus();
}

// 5. Gắn sự kiện click cho nút "Thêm"
addBtn.addEventListener('click', addStudent);

// 6. Cho phép nhấn Enter ở ô Nhập điểm để thêm luôn
diemInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addStudent();
    }
});

// 7. Xử lý sự kiện Xóa bằng Event Delegation (gắn trên tbody)
studentBody.addEventListener('click', function(event) {
    // Kiểm tra xem nơi người dùng click có phải là nút Xóa không
    if (event.target.classList.contains('delete-btn')) {
        // Lấy vị trí index từ thuộc tính data-index của nút đó
        const index = event.target.getAttribute('data-index');
        
        // Cắt phần tử đó khỏi mảng
        students.splice(index, 1);
        
        // Gọi lại hàm vẽ bảng để cập nhật giao diện
        renderTable();
    }
});