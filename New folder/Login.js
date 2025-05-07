const wrapper = document.querySelector(".wrapper");
const registerLink = document.querySelector(".register-link");
const loginLink = document.querySelector(".login-link");

registerLink.onclick = () => {
  wrapper.classList.add("active");
};

loginLink.onclick = () => {
  wrapper.classList.remove("active");
};



// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBHCQGbHCNv3ocXrWzxWRC1MxIcfwcvxCM",
//   authDomain: "certi-gen-ee9c7.firebaseapp.com",
//   projectId: "certi-gen-ee9c7",
//   storageBucket: "certi-gen-ee9c7.firebasestorage.app",
//   messagingSenderId: "143160614807",
//   appId: "1:143160614807:web:5b7a183a18cc83ed06aed2",
//   measurementId: "G-K4CPCK49RK"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
