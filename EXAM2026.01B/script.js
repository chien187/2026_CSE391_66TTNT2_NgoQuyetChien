import { nhanVienData } from './data.js';

// 1. Khởi tạo mảng employees: Ưu tiên lấy từ Local Storage. 
// Nếu Local Storage trống (lần đầu vào web), thì mới lấy dữ liệu mẫu từ nhanVienData
let employees = JSON.parse(localStorage.getItem("EMPLOYEES_DATA")) || [...nhanVienData]; 
let editIndex = -1; // -1 là thêm mới, khác -1 là đang sửa

// Hàm hỗ trợ: Cập nhật mảng hiện tại vào Local Storage
function saveToLocalStorage() {
    localStorage.setItem("EMPLOYEES_DATA", JSON.stringify(employees));
}

// 2. Hàm hiển thị dữ liệu ra bảng
function renderTable() {
    const tbody = document.getElementById("employeeData");
    tbody.innerHTML = "";
    
    employees.forEach((emp, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.hoTen}</td>
                <td>${emp.email}</td>
                <td>${emp.soDienThoai}</td>
                <td>${emp.viTri}</td>
                
            </tr>
        `;
    });
}

// 3. Đóng mở Modal
function toggleModal(show) {
    const modal = document.getElementById("modal");
    modal.style.display = show ? "flex" : "none";
}

// 4. Mở modal thêm mới
function openAddModal() {
    editIndex = -1;
    document.getElementById("modalTitle").innerText = "Thêm hội thảo mới";
    
    document.getElementById("inpName").value = "";
    document.getElementById("inpEmail").value = "";
    document.getElementById("inpPhone").value = "";
    document.getElementById("inpPosition").value = ""; 
    toggleModal(true);
}

// 5. Lưu dữ liệu (Thêm hoặc Sửa)
function saveEmployee() {
    const hoTen = document.getElementById("inpName").value;
    const email = document.getElementById("inpEmail").value;
    const soDienThoai = document.getElementById("inpPhone").value;
    const viTri = document.getElementById("inpPosition").value;

    if (!hoTen || !email) {
        alert("Vui lòng điền Name và Email!");
        return;
    }

    if (editIndex === -1) {
        // Thêm mới
        const newId = employees.length > 0 ? employees[employees.length - 1].id + 1 : 1;
        employees.push({ id: newId, hoTen, email, soDienThoai, viTri });
    } else {
        // Sửa
        employees[editIndex] = { ...employees[editIndex], hoTen, email, soDienThoai, viTri };
    }

    // GỌI HÀM LƯU VÀO LOCAL STORAGE SAU KHI THAY ĐỔI
    saveToLocalStorage();

    renderTable();
    toggleModal(false);
}

// 6. Xóa nhân viên
function deleteEmployee(index) {
    if (confirm("Bạn có chắc chắn muốn xóa nhân viên này không?")) {
        employees.splice(index, 1);
        
        // GỌI HÀM LƯU VÀO LOCAL STORAGE SAU KHI XÓA
        saveToLocalStorage();
        
        renderTable();
    }
}

// 7. Sửa nhân viên (Đổ dữ liệu cũ vào modal)
function editEmployee(index) {
    editIndex = index;
    const emp = employees[index];
    
    document.getElementById("modalTitle").innerText = "Edit Employee";
    document.getElementById("inpName").value = emp.hoTen;
    document.getElementById("inpEmail").value = emp.email;
    document.getElementById("inpPhone").value = emp.soDienThoai;
    document.getElementById("inpPosition").value = emp.viTri;
    
    toggleModal(true);
}

// Chạy hàm hiển thị khi load trang
window.onload = renderTable;

// Đưa các hàm ra Global (window) để HTML gọi được
window.editEmployee = editEmployee;
window.deleteEmployee = deleteEmployee;
window.openAddModal = openAddModal; 
window.saveEmployee = saveEmployee; 
window.toggleModal = toggleModal;