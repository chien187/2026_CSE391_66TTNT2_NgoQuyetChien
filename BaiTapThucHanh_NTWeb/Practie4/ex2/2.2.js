
const prices = {
    "ao_thun": 150000,
    "quan_jean": 300000,
    "giay_sneaker": 500000
};


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

    const selectedDate = new Date(dateInput);
    selectedDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 30); 

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

document.getElementById('product').addEventListener('change', () => {
    validateProduct();
    calculateTotal();
});

document.getElementById('quantity').addEventListener('input', () => {
    clearError('quantity');
    calculateTotal();
});

document.getElementById('notes').addEventListener('input', function() {
    const len = this.value.length;
    const counterSpan = document.getElementById('noteCounter');
    
    counterSpan.textContent = `${len}/200`;
    
    if (len > 200) {
        counterSpan.style.color = 'red';
        validateNotes(); 
    } else {
        counterSpan.style.color = '#666';
        clearError('notes'); 
    }
});

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

const radios = document.querySelectorAll('input[name="payment"]');
radios.forEach(radio => radio.addEventListener('change', () => document.getElementById('paymentError').textContent = ''));

const form = document.getElementById('orderForm');
const confirmBox = document.getElementById('confirmBox');
const successBox = document.getElementById('successBox');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const isValid = validateProduct() 
                  & validateQuantity() 
                  & validateDate() 
                  & validateAddress() 
                  & validateNotes() 
                  & validatePayment();

    if (isValid) {
        const productSelect = document.getElementById('product');
        const productName = productSelect.options[productSelect.selectedIndex].text;
        const qty = document.getElementById('quantity').value;
        const totalVal = document.getElementById('totalPriceDisplay').textContent;
        const dDate = document.getElementById('deliveryDate').value;

        const dateObj = new Date(dDate);
        const formattedDate = `${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getFullYear()}`;

        document.getElementById('confProduct').textContent = productName;
        document.getElementById('confQuantity').textContent = qty;
        document.getElementById('confTotal').textContent = totalVal;
        document.getElementById('confDate').textContent = formattedDate;

        document.getElementById('submitBtn').style.display = 'none';
        confirmBox.classList.remove('hidden');
    }
});

document.getElementById('cancelBtn').addEventListener('click', function() {
    confirmBox.classList.add('hidden');
    document.getElementById('submitBtn').style.display = 'block';
});

document.getElementById('confirmBtn').addEventListener('click', function() {
    form.classList.add('hidden');
    confirmBox.classList.add('hidden');
    successBox.classList.remove('hidden');
});