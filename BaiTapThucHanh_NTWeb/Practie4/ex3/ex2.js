let currentStep = 1;
const totalSteps = 3;

function showError(fieldId, message) {
    const errorEl = document.getElementById(fieldId + 'Error');
    const inputEl = document.getElementById(fieldId);
    if(errorEl) errorEl.textContent = message;
    if (inputEl && inputEl.type !== 'radio' && inputEl.type !== 'checkbox') {
        inputEl.classList.add('is-invalid');
    }
}

function clearError(fieldId) {
    const errorEl = document.getElementById(fieldId + 'Error');
    const inputEl = document.getElementById(fieldId);
    if(errorEl) errorEl.textContent = '';
    if(inputEl) inputEl.classList.remove('is-invalid');
}

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => {
        clearError(input.id);
        if(input.name === 'gender') clearError('gender');
    });
});

function validateStep1() {
    let isValid = true;
    
    const name = document.getElementById('fullname').value.trim();
    if (name === '') { showError('fullname', 'Vui lòng nhập họ tên.'); isValid = false; }
    
    const dob = document.getElementById('dob').value;
    if (dob === '') { showError('dob', 'Vui lòng chọn ngày sinh.'); isValid = false; }
    
    const isMale = document.getElementById('male').checked;
    const isFemale = document.getElementById('female').checked;
    if (!isMale && !isFemale) { showError('gender', 'Vui lòng chọn giới tính.'); isValid = false; }
    
    return isValid;
}

function validateStep2() {
    let isValid = true;
    
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') { showError('email', 'Vui lòng nhập email.'); isValid = false; }
    else if (!emailRegex.test(email)) { showError('email', 'Email không hợp lệ.'); isValid = false; }
    
    const pass = document.getElementById('password').value;
    if (pass.length < 8) { showError('password', 'Mật khẩu phải từ 8 ký tự.'); isValid = false; }
    
    const confirmPass = document.getElementById('confirmPassword').value;
    if (confirmPass === '') { showError('confirmPassword', 'Vui lòng xác nhận mật khẩu.'); isValid = false; }
    else if (confirmPass !== pass) { showError('confirmPassword', 'Mật khẩu không khớp.'); isValid = false; }
    
    return isValid;
}

const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const submitBtn = document.getElementById('submitBtn');

function updateUI() {
    document.querySelectorAll('.step').forEach((step, index) => {
        if (index + 1 === currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });

    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = ((currentStep / totalSteps) * 100) + '%';
    document.getElementById('currentStepText').textContent = currentStep;

    prevBtn.style.display = currentStep === 1 ? 'none' : 'block';
    
    if (currentStep === totalSteps) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
        populateSummary();
    } else {
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    }
}

function populateSummary() {
    document.getElementById('sumName').textContent = document.getElementById('fullname').value;
    
    const dobValue = document.getElementById('dob').value;
    const dobObj = new Date(dobValue);
    document.getElementById('sumDob').textContent = `${dobObj.getDate()}/${dobObj.getMonth() + 1}/${dobObj.getFullYear()}`;
    
    document.getElementById('sumGender').textContent = document.getElementById('male').checked ? 'Nam' : 'Nữ';
    document.getElementById('sumEmail').textContent = document.getElementById('email').value;
}

nextBtn.addEventListener('click', () => {
    let isStepValid = false;
    if (currentStep === 1) isStepValid = validateStep1();
    if (currentStep === 2) isStepValid = validateStep2();

    if (isStepValid) {
        currentStep++;
        updateUI();
    }
});

prevBtn.addEventListener('click', () => {
    currentStep--;
    updateUI();
});

document.getElementById('multiStepForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const termsChecked = document.getElementById('terms').checked;
    if (!termsChecked) {
        showError('terms', 'Bạn phải xác nhận thông tin.');
        return;
    }
    
    this.classList.add('hidden');
    document.getElementById('successMessage').classList.remove('hidden');
    document.querySelector('.progress-container').classList.add('hidden');
});

updateUI();