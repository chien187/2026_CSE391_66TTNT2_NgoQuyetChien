function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    const inputElement = document.getElementById(fieldId);
    
    errorElement.textContent = message;
    
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

function validateFullname() {
    const input = document.getElementById('fullname');
    const value = input.value.trim();
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
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (value === '') {
        showError('password', 'Mật khẩu không được để trống.');
        return false;
    } else if (!passRegex.test(value)) {
        showError('password', 'Mật khẩu phải ≥ 8 ký tự, gồm ít nhất 1 chữ hoa, 1 chữ thường và 1 số.');
        return false;
    }
    
    clearError('password');
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

const textInputs = ['fullname', 'email', 'phone', 'password', 'confirmPassword'];

textInputs.forEach(id => {
    const el = document.getElementById(id);
    
    el.addEventListener('blur', () => {
        if (id === 'fullname') validateFullname();
        if (id === 'email') validateEmail();
        if (id === 'phone') validatePhone();
        if (id === 'password') validatePassword();
        if (id === 'confirmPassword') validateConfirmPassword();
    });

    el.addEventListener('input', () => {
        clearError(id);
    });
});

['male', 'female'].forEach(id => {
    document.getElementById(id).addEventListener('change', () => document.getElementById('genderError').textContent = '');
});
document.getElementById('terms').addEventListener('change', () => document.getElementById('termsError').textContent = '');

const form = document.getElementById('registerForm');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const isFormValid = validateFullname() 
                      & validateEmail() 
                      & validatePhone() 
                      & validatePassword() 
                      & validateConfirmPassword() 
                      & validateGender() 
                      & validateTerms();

    if (isFormValid) {
        const nameToDisplay = document.getElementById('fullname').value.trim();
        
        form.classList.add('hidden');
        
        const successDiv = document.getElementById('successMessage');
        const nameSpan = document.getElementById('registeredName');
        
        nameSpan.textContent = nameToDisplay;
        successDiv.classList.remove('hidden');
    }
});

document.getElementById('fullname').addEventListener('input', function() {
    const len = this.value.length;
    document.getElementById('nameCounter').textContent = `${len}/50`;
});

document.getElementById('togglePassword').addEventListener('click', function() {
    const passInput = document.getElementById('password');
    const currentType = passInput.getAttribute('type');
    const newType = currentType === 'password' ? 'text' : 'password';
    
    passInput.setAttribute('type', newType);
    
    this.textContent = newType === 'password' ? '👁️' : '🙈';
});

document.getElementById('password').addEventListener('input', function() {
    const val = this.value;
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');
    
    let strengthScore = 0;
    
    if (val.length >= 8) strengthScore += 1;
    if (val.match(/[a-z]/) && val.match(/[A-Z]/)) strengthScore += 1;
    if (val.match(/\d/)) strengthScore += 1;
    if (val.match(/[^a-zA-Z\d]/)) strengthScore += 1;

    if (val.length === 0) {
        strengthBar.style.width = '0%';
        strengthText.textContent = '';
    } else if (strengthScore <= 1) {
        strengthBar.style.width = '33%';
        strengthBar.style.backgroundColor = '#dc3545';
        strengthText.textContent = 'Mức độ: Yếu';
        strengthText.style.color = '#dc3545';
    } else if (strengthScore === 2) {
        strengthBar.style.width = '66%';
        strengthBar.style.backgroundColor = '#ffc107';
        strengthText.textContent = 'Mức độ: Trung bình';
        strengthText.style.color = '#ffc107';
    } else {
        strengthBar.style.width = '100%';
        strengthBar.style.backgroundColor = '#28a745';
        strengthText.textContent = 'Mức độ: Mạnh';
        strengthText.style.color = '#28a745';
    }
});