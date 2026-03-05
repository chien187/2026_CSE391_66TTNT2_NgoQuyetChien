
## BTTH03: JS nền tảng, DOM & Sự kiện

**Đối tượng:** Sinh viên chưa học lý thuyết JavaScript

---

## 1. MỤC TIÊU HỌC TẬP

Sau buổi lab, sinh viên có thể:

- Mô tả được JavaScript là gì, chạy ở đâu, khác HTML/CSS ở điểm nào.
- Viết được các đoạn JS đơn giản với:
  - Biến, kiểu dữ liệu cơ bản (number, string, boolean),
  - Cú pháp lệnh, toán tử đơn giản,
  - Cấu trúc điều khiển if/else, vòng lặp đơn giản,
  - Hàm (function) có tham số và giá trị trả về.
- Thao tác được với DOM:
  - Lấy phần tử bằng `document.getElementById`,
  - Thay đổi nội dung văn bản, kiểu dáng (style),
  - Lắng nghe và xử lý một số sự kiện cơ bản: `click`, `input`.
- Nhận biết jQuery là một thư viện hỗ trợ thao tác DOM/sự kiện (ở mức nhận diện, chưa cần sử dụng thành thạo).

---

## 2. CẤU TRÚC THỜI GIAN BUỔI LAB
- 03 tiết thực hành.

---

## 3. HOẠT ĐỘNG 1 (45’): GIỚI THIỆU JS & CÚ PHÁP CƠ BẢN

### 3.1. Chuẩn bị file HTML & JS

Tạo file `lab-js-basic.html`:

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Lab JS Cơ bản</title>
</head>
<body>
  <h1>Khám phá JavaScript</h1>
  <p id="welcome">Chưa có JavaScript...</p>
  <button id="runBtn">Nhấn để chạy JS</button>

  <script src="main.js"></script>
</body>
</html>
```

Tạo file `main.js`:

```js
console.log("Hello from JavaScript!");
```


---

### 3.2. Nhiệm vụ cho sinh viên

#### Bước 1: Mở file \& Quan sát bằng Console

1. Mở `lab-js-basic.html` trong trình duyệt (Chrome/Edge/…).
2. Mở DevTools → tab **Console**.
3. Quan sát thông báo xuất hiện.

> Câu hỏi:
> - Em thấy dòng thông báo nào trong console?
    - Em thấy dòng "Hello from JavaScript!
                    Live reload enabled."
> - Điều này cho em biết JavaScript đang làm gì khi trang web được tải?
    - Điều này chứng tỏ ngay khi trình duyệt đọc đến dòng <script src="main.js"></script> trong file HTML, nó đã lập tức tải file main.js về và chạy đoạn mã bên trong. Lệnh console.log() đã yêu cầu trình duyệt in dòng chữ đó ra màn hình console ngay trong quá trình tải trang.

---

#### Bước 2:  “JavaScript là gì?” (Tra cứu nhanh)

Sử dụng 1–2 nguồn tài liệu (vd. W3Schools, freeCodeCamp, …), tóm tắt:

> a) JavaScript chạy ở đâu? (Trình duyệt / Server / Cả hai?)
        - JavaScript có thể chạy ở hai môi trường chính: phía trình duyệt để tạo tương tác web và phía máy chủ (Server) thông qua các môi trường runtime.
> b) HTML, CSS, JavaScript mỗi phần chịu trách nhiệm chính về điều gì?
>
> - HTML: Xây dựng cấu trúc và nội dung của trang web.
> - CSS: Xây dựng cấu trúc và nội dung của trang web.
> - JavaScript: Xử lý logic, tính toán và tạo ra các hành vi, tương tác động cho trang.

---

#### Bước 3: Thử nghiệm biến \& kiểu dữ liệu trong Console

Trong tab Console, gõ từng dòng sau và ghi lại kết quả:

```js
let age = 20;
  const name = "An";
let isStudent = true;

typeof age;
typeof name;
typeof isStudent;

1 + 2 * 3;
"Hello " + "world";
```

> Câu hỏi:
> - Kết quả `typeof age` là gì? 
    - number
> - Kết quả `typeof name` là gì?
    - string
> - Kết quả `typeof isStudent` là gì?
    - boolean
> - Em hãy tự mô tả ngắn gọn:
>   - `number` là: Kiểu dữ liệu số (bao gồm cả số nguyên và số thập phân), dùng để thực hiện các phép toán.
>   - `string` là: Kiểu dữ liệu chuỗi ký tự (văn bản). Mọi thứ nằm trong dấu ngoặc kép " " hoặc nháy đơn ' ' đều là string.
>   - `boolean` là: Kiểu dữ liệu logic, chỉ mang một trong hai trạng thái: true (đúng) hoặc false (sai).

---

#### Bước 4: Viết đoạn script tính tuổi

Mở file `main.js`, viết thêm:

```js
let name = "An";
let yearOfBirth = 2005;
let currentYear = 2026;
let age = currentYear - yearOfBirth;

console.log("Xin chào, mình là " + name + ", năm nay mình " + age + " tuổi.");
```

Sau đó:

1. Đổi giá trị `name`, `yearOfBirth` thành thông tin của chính em.
2. Reload trang \& quan sát console.

> Câu hỏi:
> - Dòng log hiển thị gì sau khi em sửa thông tin?
    - Hiển thị:" Xin chào, mình là Chiến, năm nay mình 20 tuổi."
> - Nếu em quên dấu `;` hoặc quên dấu `+`, điều gì xảy ra? Trình duyệt báo lỗi thế nào?
    - khi quên dấu ';' trình duyệt không báo lỗi gì.
    - Khi quên dấu'+' trình duyệt báo lỗi sau:" Uncaught SyntaxError: missing ) after argument list (at main.js:7:13) ".

---

#### Bước 5: Phản tư nhanh (Reflection)

> - Điều thú vị nhất em vừa khám phá được về console là gì?
    - Console không chỉ là nơi để xem thông báo hay tìm lỗi, mà nó còn là một môi trường tương tác trực tiếp (REPL). Em có thể gõ mã JS, làm toán, hoặc kiểm tra biến ngay tại đó và nhận kết quả tức thì mà không cần phải viết vào file HTML/JS rồi tải lại trang.
> - Em gặp lỗi cú pháp nào? Em đã xử lý bằng cách nào (tự sửa, hỏi bạn, đọc lỗi, tìm Google, …)?
    - Em gõ sai chữ console thành consol, trình duyệt báo lỗi Uncaught ReferenceError: consol is not defined. Sau đó em đã lên Google để hỏi và sửa lại.

---
## 4. HOẠT ĐỘNG 2 (40’): CẤU TRÚC ĐIỀU KHIỂN \& HÀM

### 4.1. Chuẩn bị file logic (hoặc viết tiếp trong main.js)

Ví dụ đoạn mã:

```js
// TODO: Đổi giá trị score và quan sát kết quả
let score = 7.5;

// TODO: Dự đoán điều kiện if/else đang làm gì, rồi chạy thử
if (score >= 8) {
  console.log("Giỏi");
} else if (score >= 6.5) {
  console.log("Khá");
} else if (score >= 5) {
  console.log("Trung bình");
} else {
  console.log("Yếu");
}

// TODO: Viết hàm tính điểm trung bình 3 môn
function tinhDiemTrungBinh(m1, m2, m3) {
  let avg = (m1 + m2 + m3) / 3;
  return avg;
}

// Gợi ý dùng thử hàm trong console:
// tinhDiemTrungBinh(8, 7, 9);
```


---

### 4.2. Nhiệm vụ cho sinh viên

#### Bước 1: Đoán trước – chạy sau

> a) Nếu `score = 9`, em dự đoán console sẽ in: Giỏi
> b) Nếu `score = 6`, em dự đoán console sẽ in: Trung bình

Sau đó:

1. Thay `score = 9`, reload trang hoặc chạy file và kiểm tra console.
2. Thay `score = 6`, kiểm tra lại.

> So sánh dự đoán và kết quả thực tế:
> - Trường hợp `score = 9`: Dự đoán vs Thực tế:Đúng với thực tế
> - Trường hợp `score = 6`: Dự đoán vs Thực tế:Đúng với thực tế

---

#### Bước 2: Mô tả lại if/else bằng lời

> - Khi nào chương trình in `"Giỏi"`?
    - Khi giá trị của biến score lớn hơn hoặc bằng 8.
> - Khi nào chương trình in `"Yếu"`?
    - Khi tất cả các điều kiện bên trên đều sai (tức là score nhỏ hơn 5).
> - Em hãy mô tả cấu trúc `if/else` bằng lời của em (có thể ví von “ngã rẽ” trong đời sống):

    - Cấu trúc if/else là một lệnh rẽ nhánh,Nếu (if) điều kiện đúng thì thực hiện một hành động, ngược lại/nếu sai (else) thì thực hiện hành động khác. Nó quyết định hướng đi của chương trình dựa trên dữ liệu đầu vào. 

#### Bước 3: Làm việc với hàm

1. Mở Console, gọi hàm:
```js
tinhDiemTrungBinh(8, 7, 9);
```

> Em ghi lại giá trị hàm trả về: 8
2. Viết thêm hàm `xepLoai(avg)` trong file JS:
```js
function xepLoai(avg) {
  // TODO: Dùng if/else để:
  // avg >= 8  -> "Giỏi"
  // avg >= 6.5 -> "Khá"
  // avg >= 5  -> "Trung bình"
  // còn lại   -> "Yếu"
}
```

3. Gọi thử trong console:
```js
let avg = tinhDiemTrungBinh(8, 7, 9);
  let loai = xepLoai(avg);
console.log("Điểm TB:", avg, " - Xếp loại:", loai);
```

> Câu hỏi:
> - Một hàm gồm những phần chính nào?
>   - Tên hàm: Là danh từ/động từ đại diện cho chức năng của hàm (ví dụ: tinhDiemTrungBinh, xepLoai).
>   - Tham số (parameters): Là các biến số (như m1, m2, m3 hoặc avg) được truyền vào bên trong dấu ngoặc đơn () để hàm lấy dữ liệu đầu vào tính toán.
>   - Thân hàm (body):Là toàn bộ phần code logic nằm giữa hai dấu ngoặc nhọn { ... }.
>   - Giá trị trả về (return): Là kết quả cuối cùng mà hàm "ném" ra ngoài sau khi tính toán xong, thông qua từ khóa return. Nếu không có return, hàm mặc định trả về undefined.
> - Ưu điểm của việc dùng hàm thay vì lặp lại cùng một đoạn code nhiều lần là gì?
    - Giúp tái sử dụng mã nguồn, làm cho code gọn gàng, dễ đọc và dễ sửa lỗi hơn rất nhiều.
---

#### Bước 4: Mở rộng nhỏ (tuỳ chọn)

Viết hàm `kiemTraTuoi(age)`:

```js
function kiemTraTuoi(age) {
  // TODO:
  // Nếu age >= 18 -> console.log("Đủ 18 tuổi");
  // Ngược lại -> console.log("Chưa đủ 18 tuổi");
}
```

Gọi thử: `kiemTraTuoi(16);`, `kiemTraTuoi(20);`.

---

#### Bước 5: Phản tư

> - Phần nào trong if/else hoặc hàm khiến em khó hiểu nhất?
    - Phần khó hiểu nhất trong if/else theo em là xử lý nhiều điều kiện lồng nhau dẫn đến sai logic, hoặc bỏ sót trường hợp else mặc định. Đối với hàm, khó khăn lớn nhất là nắm vững phạm vi biến (biến cục bộ/toàn cục) và hiểu cách tham số được truyền vào (tham trị so với tham chiếu) để tránh lỗi dữ liệu.

> - Em đã làm gì để vượt qua (thử nhiều lần, hỏi bạn, xem lại ví dụ, tra Google, …)?
    - Em đã hỏi thầy cô giảng viên, bạn của mình và tra Google

---

## 5. HOẠT ĐỘNG 3 (40’): THAO TÁC DOM \& SỰ KIỆN

### 5.1. Chuẩn bị HTML

Thêm vào trang (hoặc tạo file mới):

```html
<section>
  <h2>DOM & Sự kiện</h2>
  <p id="status">Chưa có tương tác...</p>

  <button id="btnHello">Chào</button>
  <button id="btnRed">Đổi màu nền thành đỏ</button>

  <div style="margin-top: 20px;">
    <label>Nhập tên: </label>
    <input id="nameInput" type="text" />
    <p id="greeting"></p>
  </div>
</section>

<script src="dom.js"></script>
```

Tạo file `dom.js`:

```js
const statusEl = document.getElementById("status");
const btnHello = document.getElementById("btnHello");

btnHello.addEventListener("click", function () {
  statusEl.textContent = "Xin chào! Đây là nội dung được thay đổi bằng JavaScript.";
});
```


---

### 5.2. Nhiệm vụ cho sinh viên

#### Bước 1: Đọc \& giải thích

> Câu hỏi:
> - `document.getElementById("status")` đang làm gì?
    - Lệnh này yêu cầu trình duyệt quét toàn bộ tài liệu HTML và lấy phần tử có thuộc tính id chính xác là "status"
> - Sự kiện `"click"` xảy ra khi nào?
    - Xảy ra ngay tại khoảnh khắc người dùng nhấn nút chuột trái hoặc chạm vào màn hình cảm ứng lên phần tử đó.
> - Trong đoạn code trên, khi nhấn nút `btnHello`, điều gì thay đổi trên trang?
    - Nội dung chữ của thẻ <p id="status"> sẽ bị xóa đi và thay thế ngay lập tức bằng dòng chữ: "Xin chào! Đây là nội dung được thay đổi bằng JavaScript."

---

#### Bước 2: Thử nghiệm nút đổi màu nền

Hoàn thiện code:

```js
const btnRed = document.getElementById("btnRed");

btnRed.addEventListener("click", function () {
  // TODO: Đổi màu nền trang thành đỏ
  document.body.style.backgroundColor = "red";
});
```

> Câu hỏi:
> - Em có thể đổi sang màu khác (vd. `lightblue`) không? Hãy thử.
    - Có thể đổi sang màu khác.
> - Em hãy ghi lại 1 ví dụ khác mà JavaScript có thể làm với `document.body.style`.
    - Có thể đổi màu chữ của toàn bộ trang: document.body.style.color = "white"; hoặc đổi font chữ: document.body.style.fontFamily = "Arial";.

---

#### Bước 3: Xử lý sự kiện input – gõ tên, hiện lời chào

Hoàn thiện code:

```js
const nameInput = document.getElementById("nameInput");
const greeting = document.getElementById("greeting");

nameInput.addEventListener("input", function () {
  const value = nameInput.value;
  greeting.textContent = "Xin chào, " + value + "!";
});
```

> Câu hỏi:
> - Sự kiện `"input"` khác gì so với `"click"`?
    - "click" chỉ kích hoạt một lần khi bạn bấm chuột. Trong khi đó, "input" kích hoạt liên tục mỗi khi giá trị trong ô text thay đổi
> - Khi em xoá hết nội dung ô input, dòng `greeting` hiển thị gì?
    - Nó sẽ hiển thị: "Xin chào, !". Vì khi ô input trống, biến value sẽ là một chuỗi rỗng "", ghép với chuỗi có sẵn sẽ tạo ra kết quả đó.

---

#### Bước 4: Liên hệ khái niệm DOM

> DOM (Document Object Model) là mô hình biểu diễn trang HTML dưới dạng một **cây các đối tượng** mà JavaScript có thể truy cập và thay đổi.
>
> Em hãy:
> - Tự mô tả DOM bằng lời của em:
>    - Hãy tưởng tượng mã HTML của bạn giống như một bản thiết kế ngôi nhà. DOM chính là việc trình duyệt xây dựng ngôi nhà đó lên thành hình hài thực tế, tạo thành một "cây gia phả". Trong đó document là toàn bộ mảnh đất, <html> là cái móng, <head> và <body> là các tầng, còn các thẻ <p>, <button> là các đồ vật trong phòng. Nhờ có cấu trúc cây này, JavaScript có thể tìm đến chính xác từng "đồ vật" để di chuyển, đổi màu hoặc thay mới chúng.
> - Nêu 1 ví dụ “thao tác DOM” trong bài (ghi lại 1 dòng lệnh cụ thể).
    - Dòng lệnh: document.body.style.backgroundColor = "red"; hoặc greeting.textContent = "Xin chào, " + value + "!";

---

#### Bước 5: Ảnh kết quả

Hãy chụp các ảnh màn hình:

1. Khi vừa tải trang (chưa tương tác).
    ![alt text](image.png)
2. Sau khi nhấn “Chào”.
    ![alt text](image-1.png)
3. Sau khi đổi nền sang màu đỏ.
    ![alt text](image-2.png)
4. Khi gõ tên và nhìn thấy lời chào xuất hiện.
    ![alt text](image-3.png)

*(Ảnh có thể được yêu cầu nộp cùng bài hoặc dán vào báo cáo)*

---

## 6. KẾT THÚC (15’): GIỚI THIỆU JQUERY \& PHẢN TƯ

### 6.1. Nhìn nhanh jQuery (so sánh với JS thuần)

Ví dụ:

```js
// JS thuần
document.getElementById("btnHello").addEventListener("click", function () {
  alert("Hello from JS!");
});

// jQuery (giả sử đã import jQuery)
$("#btnHello").on("click", function () {
  alert("Hello from jQuery!");
});
```

> Câu hỏi:
> - Điểm giống nhau về chức năng giữa 2 đoạn code trên là gì?
    - Cả hai đoạn code đều làm cùng một nhiệm vụ: Tìm cái nút có id là btnHello, gắn một bộ lắng nghe sự kiện click chuột vào đó, và khi click thì bật lên một hộp thoại    thông báo
> - Điểm khác nhau về cú pháp là gì (`document.getElementById` vs `$("#id")`, `addEventListener` vs `.on`)?
    - Khai báo phần tử: JS thuần dùng lệnh rất dài document.getElementById("btnHello"), trong khi jQuery rút gọn lại chỉ còn $("#btnHello").

     Gắn sự kiện: JS thuần dùng .addEventListener("click", ...), jQuery dùng hàm .on("click", ...). Nhìn chung, jQuery ra đời để giúp viết code ngắn gọn và dễ đọc hơn rất nhiều.
> - Em hãy tra cứu nhanh “What is jQuery used for?” và ghi 2 ý chính:
>   1. Thao tác DOM, xử lý sự kiện và tạo hiệu ứng hoạt hình (animation) một cách dễ dàng, ngắn gọn trên mọi trình duyệt.
>   2. Đơn giản hóa việc gọi API/AJAX (lấy dữ liệu từ máy chủ mà không cần tải lại trang). (Tuy nhiên, hiện nay JS thuần đã phát triển rất mạnh mẽ nên jQuery không còn được sử dụng nhiều trong các dự án mới như trước đây).
---

### 6.2. Tự đánh giá \& định hướng

> 1. Sau buổi lab, em tò mò nhất về phần nào của JavaScript/DOM?
> 2. Em muốn tự làm thêm tính năng gì trên trang web (vd: bộ đếm, đổi theme, pop-up, mini game, …)?
> 3. Em đánh giá mức độ hiểu của mình về:
>    - Biến \& kiểu dữ liệu: [ ] Chưa hiểu  [ x] Tạm ổn  [ ] Khá rõ
>    - If/else \& hàm:       [ ] Chưa hiểu  [x ] Tạm ổn  [ ] Khá rõ
>    - DOM \& sự kiện:       [ x] Chưa hiểu  [ ] Tạm ổn  [ ] Khá rõ

---

## 7. GHI CHÚ CHO GIẢNG VIÊN (NỘI BỘ)

- Có thể cho SV làm theo cặp/nhóm 2–3 để hỗ trợ nhau thử nghiệm, đọc lỗi, tra cứu.
- Tùy thời lượng thực tế, có thể:
    - Giảm bớt phần mở rộng (hàm `kiemTraTuoi`, tuỳ biến thêm hiệu ứng).
    - Hoặc tăng thêm bài tập DOM (ẩn/hiện một khối, đếm số lần click, v.v.).
- Phiếu học tập tiếp theo có thể chi tiết hóa từng hoạt động thành form trả lời, chỗ dán ảnh, và câu hỏi mini test trắc nghiệm.

```

---```

