const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyB1eFoWhG7_fRxHMJ-Avjo_bhkwvb27D4Y",
    authDomain: "smarthome-f802f.firebaseapp.com",
    projectId: "smarthome-f802f",
    storageBucket: "smarthome-f802f.appspot.com",
    messagingSenderId: "290247897607",
    appId: "1:290247897607:web:e1a22bf3765eb825daf0a2",
    measurementId: "G-383MXL4K1R"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("signUp-btn").addEventListener('click', function(e) {
    e.preventDefault();
    const username = document.getElementById("user").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // Lưu tên đăng nhập vào Realtime Database
            const db = getDatabase(app);
            set(ref(db, 'Tài khoản/' + user.uid), {
                username: username,
                email: email
            });
            alert("Đăng ký thành công!");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Đăng ký thất bại!");
        });
});

document.getElementById("signIn-btn").addEventListener('click', function(e) {
    e.preventDefault();
    const email = document.getElementById("tk").value;
    const password = document.getElementById("pass").value;

    if (!email || !password) {
        alert("Bạn chưa nhập email hoặc mật khẩu!");
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            window.location.href = "login.html";
            alert("Đăng nhập thành công!");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ...
            if (errorCode === 'auth/wrong-password') {
                alert("Mật khẩu không đúng!");
            } else if (errorCode === 'auth/invalid-credential') {
                alert("Thông tin đăng nhập không hợp lệ hoặc đã hết hạn!");
            } else if (errorCode === 'auth/invalid-email') {
                alert("Email không hợp lệ!");
            } else {
                alert(errorMessage);
            }
        });
});

document.getElementById("forgot-password").addEventListener('click', function(e) {
    e.preventDefault();
    const email = document.getElementById("tk").value;

    if (!email) {
        alert("Bạn chưa nhập email!");
        return;
    }

    sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            alert("Email đặt lại mật khẩu đã được gửi!");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            if (errorCode === 'auth/invalid-email') {
                alert("Email không hợp lệ!");
            } else if (errorCode === 'auth/user-not-found') {
                alert("Không tìm thấy tài khoản!");
            } else {
                alert(errorMessage);
            }
        });
});