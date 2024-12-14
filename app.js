import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBKkeRvZwfTSxdipIQ8LB76z9acj5C-t7I",
  authDomain: "my-portfolio-form-submission.firebaseapp.com",
  projectId: "my-portfolio-form-submission",
  storageBucket: "my-portfolio-form-submission.appspot.com",
  messagingSenderId: "432155185320",
  appId: "1:432155185320:web:387b63e8a22c0c5772f29d",
  measurementId: "G-H8LB3Z5H4Q",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

async function addMessage(name, email, message) {
  try {
    const docRef = await addDoc(collection(db, "messages"), {
      name: name,
      email: email,
      message: message,
      timestamp: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

document.querySelector(".contact-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.querySelector("input[placeholder='Full Name']").value;
    const email = document.querySelector(
      "input[placeholder='Email Address']"
    ).value;
    const message = document.querySelector(
      "textarea[placeholder='Write your message']"
    ).value;

    console.log("Form submitted: ", { name, email, message });

    addMessage(name, email, message);

    // Clear form fields
    document.querySelector("input[placeholder='Full Name']").value = "";
    document.querySelector("input[placeholder='Email Address']").value = "";
    document.querySelector("textarea[placeholder='Write your message']").value =
      "";

    // Show success message
    document.querySelector(".message-alert").style.display = "flex";

    setTimeout(() => {
      document.querySelector(".message-alert").style.display = "none";
    }, 3000);
  });

const sidebarBtn = document.querySelector("#sidebar-toggle-btn");
const closeBtn = document.querySelector("#close-btn");
const sidebar = document.querySelector(".sidebar");
const windows = document.querySelector("body");
const sidebarShadow = document.querySelector(".shadow-overlay");
const sidebarLinks = document.querySelectorAll("#sidebar a");

function closeSidebar() {
  sidebar.classList.remove("show-sidebar");
  windows.style.overflowY = "scroll";
  sidebarShadow.classList.remove("show-shadow");
}

sidebarLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeSidebar();
  });
});

function sidebarShadowToggle() {
  if (sidebar.classList.contains("show-sidebar")) {
    sidebarShadow.classList.add("show-shadow");
  } else {
    sidebarShadow.classList.remove("show-shadow");
  }
}

sidebarBtn.addEventListener("click", function (event) {
  event.stopPropagation();
  sidebar.classList.add("show-sidebar");

  windows.style.overflowY = "hidden";
  window.addEventListener("click", closeSidebar);

  sidebarShadow.classList.toggle("show-shadow");
  sidebarShadowToggle();
});

closeBtn.addEventListener("click", function (event) {
  closeSidebar();
});

sidebar.addEventListener("click", function (event) {
  event.stopPropagation();
});

const navbarContainer = document.querySelector(".navbar-container");

window.addEventListener("scroll", function () {
  const scrollHeight = window.pageYOffset;
  const navHeight = navbarContainer.getBoundingClientRect().height;

  if (scrollHeight > navHeight) {
    navbarContainer.classList.add("fixed-navbar");
  } else {
    navbarContainer.classList.remove("fixed-navbar");
  }
});
