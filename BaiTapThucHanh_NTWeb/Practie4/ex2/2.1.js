// ================= HÀM TIỆN ÍCH =================
function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    const inputElement = document.getElementById(fieldId);
    
    errorElement.textContent = message;
    
    // Checkbox và Radio không cần bôi đỏ viền, chỉ bôi đỏ input text/password
    if (inputElement && inputElement.type !== 'radio' && inputElement.type !== 'checkbox') {
        inputElement.classList.add('is-invalid');
    }
}

function clearError(fieldId) {
    const errorElement = document.getElementById(fieldId + 'Error');
    const inputElement = document.getElementById(fieldId);
    
    if (errorElement) errorElement.textContent = '';
    
    if (inputElement) {
        inputElement.classList.remove('is-invalid');
    }
}

// ================= CÁC HÀM VALIDATE TỪNG TRƯỜNG =================

function validateFullname() {
    const input = document.getElementById('fullname');
    const value = input.value.trim();
    // Regex hỗ trợ chữ cái tiếng Việt và khoảng trắng
    const nameRegex = /^[\p{L}\s]+$/u;

    if (value === '') {
        showError('fullname', 'Họ và tên không được để trống.');
        return false;
    } else if (value.length < 3) {
        showError('fullname', 'Họ và tên phải có ít nhất 3 ký tự.');
        return false;
    } else if (!nameRegex.test(value)) {
        showError('fullname', 'Họ và tên chỉ được chứa chữ cái và khoảng trắng.');
        return false;
    }
    
    clearError('fullname');
    return true;
}

function validateEmail() {
    const input = document.getElementById('email');
    const value = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value === '') {
        showError('email', 'Email không được để trống.');
        return false;
    } else if (!emailRegex.test(value)) {
        showError('email', 'Email không đúng định dạng (VD: name@domain.com).');
        return false;
    }
    
    clearError('email');
    return true;
}

function validatePhone() {
    const input = document.getElementById('phone');
    const value = input.value.trim();
    const phoneRegex = /^0\d{9}$/;

    if (value === '') {
        showError('phone', 'Số điện thoại không được để trống.');
        return false;
    } else if (!phoneRegex.test(value)) {
        showError('phone', 'Số điện thoại phải gồm 10 chữ số và bắt đầu bằng số 0.');
        return false;
    }
    
    clearError('phone');
    return true;
}

function validatePassword() {
    const input = document.getElementById('password');
    const value = input.value;
    // Regex: Ít nhất 1 chữ thường, 1 chữ HOA, 1 số, độ dài >= 8
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (value === '') {
        showError('password', 'Mật khẩu không được để trống.');
        return false;
    } else if (!passRegex.test(value)) {
        showError('password', 'Mật khẩu phải ≥ 8 ký tự, gồm ít nhất 1 chữ hoa, 1 chữ thường và 1 số.');
        return false;
    }
    
    clearError('password');
    // Nếu password thay đổi mà có confirm password rồi thì nên check lại confirm
    if (document.getElementById('confirmPassword').value !== '') {
        validateConfirmPassword();
    }
    return true;
}

function validateConfirmPassword() {
    const passValue = document.getElementById('password').value;
    const confirmInput = document.getElementById('confirmPassword');
    const confirmValue = confirmInput.value;

    if (confirmValue === '') {
        showError('confirmPassword', 'Vui lòng xác nhận mật khẩu.');
        return false;
    } else if (confirmValue !== passValue) {
        showError('confirmPassword', 'Mật khẩu xác nhận không khớp.');
        return false;
    }
    
    clearError('confirmPassword');
    return true;
}

function validateGender() {
    const isMale = document.getElementById('male').checked;
    const isFemale = document.getElementById('female').checked;

    if (!isMale && !isFemale) {
        // Đối với radio, ta gán chung error vào div có id genderError
        document.getElementById('genderError').textContent = 'Vui lòng chọn giới tính.';
        return false;
    }
    
    document.getElementById('genderError').textContent = '';
    return true;
}

function validateTerms() {
    const termsInput = document.getElementById('terms');
    if (!termsInput.checked) {
        document.getElementById('termsError').textContent = 'Bạn phải đồng ý với điều khoản.';
        return false;
    }
    
    document.getElementById('termsError').textContent = '';
    return true;
}

// ================= GẮN SỰ KIỆN (EVENTS) =================

// 1. Lấy các input text và password để gắn sự kiện blur và input
const textInputs = ['fullname', 'email', 'phone', 'password', 'confirmPassword'];

textInputs.forEach(id => {
    const el = document.getElementById(id);
    
    // Validate Realtime khi Blur (rời khỏi ô)
    el.addEventListener('blur', () => {
        if (id === 'fullname') validateFullname();
        if (id === 'email') validateEmail();
        if (id === 'phone') validatePhone();
        if (id === 'password') validatePassword();
        if (id === 'confirmPassword') validateConfirmPassword();
    });

    // Xóa lỗi ngay khi nhập lại (Input)
    el.addEventListener('input', () => {
        clearError(id);
    });
});

// Giới tính và Điều khoản dùng event 'change' thay vì 'input'
['male', 'female'].forEach(id => {
    document.getElementById(id).addEventListener('change', () => document.getElementById('genderError').textContent = '');
});
document.getElementById('terms').addEventListener('change', () => document.getElementById('termsError').textContent = '');

// 2. Xử lý khi Submit Form
const form = document.getElementById('registerForm');

form.addEventListener('submit', function(event) {
    // Ngăn hành vi tải lại trang mặc định của form
    event.preventDefault();

    // Gọi TẤT CẢ các hàm validate.
    // Dùng toán tử bitwise '&' để ép tất cả các hàm phải chạy (không bị ngắt quãng giữa chừng như '&&')
    // Kết quả trả về sẽ là 1 (nếu tất cả true) hoặc 0 (nếu có bất kỳ cái nào false)
    const isFormValid = validateFullname() 
                      & validateEmail() 
                      & validatePhone() 
                      & validatePassword() 
                      & validateConfirmPassword() 
                      & validateGender() 
                      & validateTerms();

    if (isFormValid) {
        // Lấy tên vừa nhập
        const nameToDisplay = document.getElementById('fullname').value.trim();
        
        // Ẩn form
        form.classList.add('hidden');
        
        // Hiển thị thông báo thành công
        const successDiv = document.getElementById('successMessage');
        const nameSpan = document.getElementById('registeredName');
        
        nameSpan.textContent = nameToDisplay;
        successDiv.classList.remove('hidden');
    }
});