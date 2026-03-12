// ================= DATA SẢN PHẨM & TIỆN ÍCH =================
const prices = {
    "ao_thun": 150000,
    "quan_jean": 300000,
    "giay_sneaker": 500000
};

// Hàm định dạng tiền tệ VNĐ
function formatCurrency(amount) {
    return Number(amount).toLocaleString("vi-VN") + " VNĐ";
}

function showError(fieldId, message) {
    const errorEl = document.getElementById(fieldId + 'Error');
    const inputEl = document.getElementById(fieldId);
    errorEl.textContent = message;
    if (inputEl && inputEl.type !== 'radio') {
        inputEl.classList.add('is-invalid');
    }
}

function clearError(fieldId) {
    const errorEl = document.getElementById(fieldId + 'Error');
    const inputEl = document.getElementById(fieldId);
    if (errorEl) errorEl.textContent = '';
    if (inputEl) inputEl.classList.remove('is-invalid');
}

// ================= CÁC HÀM VALIDATE =================
function validateProduct() {
    const val = document.getElementById('product').value;
    if (val === "") {
        showError('product', 'Vui lòng chọn một sản phẩm.');
        return false;
    }
    clearError('product');
    return true;
}

function validateQuantity() {
    const val = document.getElementById('quantity').value;
    const num = parseInt(val, 10);
    if (val === "" || isNaN(num) || num < 1 || num > 99 || !Number.isInteger(Number(val))) {
        showError('quantity', 'Số lượng phải là số nguyên từ 1 đến 99.');
        return false;
    }
    clearError('quantity');
    return true;
}

function validateDate() {
    const dateInput = document.getElementById('deliveryDate').value;
    if (dateInput === "") {
        showError('deliveryDate', 'Vui lòng chọn ngày giao hàng.');
        return false;
    }

    // Xử lý chuẩn hóa thời gian về 00:00:00 để so sánh cho chính xác
    const selectedDate = new Date(dateInput);
    selectedDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 30); // Ngày tối đa là +30 ngày

    if (selectedDate < today) {
        showError('deliveryDate', 'Không được chọn ngày trong quá khứ.');
        return false;
    } else if (selectedDate > maxDate) {
        showError('deliveryDate', 'Ngày giao không được vượt quá 30 ngày từ hôm nay.');
        return false;
    }

    clearError('deliveryDate');
    return true;
}

function validateAddress() {
    const val = document.getElementById('address').value.trim();
    if (val === "") {
        showError('address', 'Địa chỉ giao hàng không được để trống.');
        return false;
    } else if (val.length < 10) {
        showError('address', 'Địa chỉ phải có ít nhất 10 ký tự.');
        return false;
    }
    clearError('address');
    return true;
}

function validateNotes() {
    const val = document.getElementById('notes').value;
    if (val.length > 200) {
        showError('notes', 'Ghi chú không được vượt quá 200 ký tự.');
        return false;
    }
    // Ghi chú không bắt buộc nên bỏ trống vẫn hợp lệ
    clearError('notes');
    return true;
}

function validatePayment() {
    const isCOD = document.getElementById('payCOD').checked;
    const isBank = document.getElementById('payBank').checked;
    const isWallet = document.getElementById('payWallet').checked;

    if (!isCOD && !isBank && !isWallet) {
        document.getElementById('paymentError').textContent = 'Vui lòng chọn phương thức thanh toán.';
        return false;
    }
    document.getElementById('paymentError').textContent = '';
    return true;
}

// ================= TÍNH TOÁN & REALTIME EVENTS =================

// Hàm tự động tính tổng tiền
function calculateTotal() {
    const productKey = document.getElementById('product').value;
    const quantity = parseInt(document.getElementById('quantity').value, 10);
    const totalPriceDisplay = document.getElementById('totalPriceDisplay');

    if (productKey && prices[productKey] && !isNaN(quantity) && quantity > 0 && quantity <= 99) {
        const total = prices[productKey] * quantity;
        totalPriceDisplay.textContent = formatCurrency(total);
    } else {
        totalPriceDisplay.textContent = "0 VNĐ";
    }
}

// Gắn event để tính tiền ngay khi thay đổi Sản phẩm hoặc Số lượng
document.getElementById('product').addEventListener('change', () => {
    validateProduct();
    calculateTotal();
});

document.getElementById('quantity').addEventListener('input', () => {
    clearError('quantity');
    calculateTotal();
});

// Đếm ký tự realtime cho Ghi chú
document.getElementById('notes').addEventListener('input', function() {
    const len = this.value.length;
    const counterSpan = document.getElementById('noteCounter');
    
    counterSpan.textContent = `${len}/200`;
    
    if (len > 200) {
        counterSpan.style.color = 'red';
        validateNotes(); // Hiển thị lỗi ngay lập tức
    } else {
        counterSpan.style.color = '#666';
        clearError('notes'); // Xóa lỗi nếu quay lại mức an toàn
    }
});

// Xóa lỗi và validate khi blur/input cho các trường còn lại
const fieldsToValidate = [
    { id: 'quantity', func: validateQuantity },
    { id: 'deliveryDate', func: validateDate },
    { id: 'address', func: validateAddress }
];

fieldsToValidate.forEach(item => {
    const el = document.getElementById(item.id);
    el.addEventListener('blur', item.func);
    el.addEventListener('input', () => clearError(item.id));
});

// Xóa lỗi radio khi change
const radios = document.querySelectorAll('input[name="payment"]');
radios.forEach(radio => radio.addEventListener('change', () => document.getElementById('paymentError').textContent = ''));

// ================= XỬ LÝ SUBMIT & XÁC NHẬN =================
const form = document.getElementById('orderForm');
const confirmBox = document.getElementById('confirmBox');
const successBox = document.getElementById('successBox');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Dùng Bitwise & để ép tất cả các hàm validate cùng chạy
    const isValid = validateProduct() 
                  & validateQuantity() 
                  & validateDate() 
                  & validateAddress() 
                  & validateNotes() 
                  & validatePayment();

    if (isValid) {
        // Lấy dữ liệu đẩy vào bảng xác nhận
        const productSelect = document.getElementById('product');
        const productName = productSelect.options[productSelect.selectedIndex].text;
        const qty = document.getElementById('quantity').value;
        const totalVal = document.getElementById('totalPriceDisplay').textContent;
        const dDate = document.getElementById('deliveryDate').value;

        // Định dạng lại ngày giao hàng cho đẹp (DD/MM/YYYY)
        const dateObj = new Date(dDate);
        const formattedDate = `${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getFullYear()}`;

        document.getElementById('confProduct').textContent = productName;
        document.getElementById('confQuantity').textContent = qty;
        document.getElementById('confTotal').textContent = totalVal;
        document.getElementById('confDate').textContent = formattedDate;

        // Ẩn nút Submit tạm thời và hiện box xác nhận
        document.getElementById('submitBtn').style.display = 'none';
        confirmBox.classList.remove('hidden');
    }
});

// Xử lý nút Hủy trong box xác nhận
document.getElementById('cancelBtn').addEventListener('click', function() {
    confirmBox.classList.add('hidden');
    document.getElementById('submitBtn').style.display = 'block';
});

// Xử lý nút Xác nhận cuối cùng
document.getElementById('confirmBtn').addEventListener('click', function() {
    form.classList.add('hidden');
    confirmBox.classList.add('hidden');
    successBox.classList.remove('hidden');
});