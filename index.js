/**
 * login page - in charge of the login form functionality
 */

const signInForm = document.getElementById("sign-in");
const statusDiv = document.getElementById("status");

function setStatus(message, className = "") {
    statusDiv.textContent = message;
    statusDiv.className = className;
}

signInForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const password = document.getElementById("password").value.trim();
    const username = document.getElementById("username").value.trim();

    try {
        const res = await fetch("/sign-in", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await res.text();

        if (res.ok) {
            localStorage.setItem("username", username);
            setStatus(data, "status-success");
            window.location.href = "/mypage.html";
            return;
        }

        setStatus(data, "status-error");
    } catch (err) {
        setStatus("Error connecting to server", "status-error");
    }
});
