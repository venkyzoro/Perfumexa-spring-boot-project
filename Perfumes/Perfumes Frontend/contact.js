document.getElementById("sentMail").addEventListener("submit", async function (event) {
    event.preventDefault();
    const submitButton = event.target.querySelector("button"); // Get the submit button
    const originalButtonText = submitButton.textContent; // Save the original button text
    submitButton.disabled = true; // Disable the button to prevent multiple clicks
    submitButton.textContent = "Sending..."; // Change the button text to indicate loading

    // Show the loading overlay
    const loadingOverlay = document.getElementById("loading-overlay");
    loadingOverlay.style.display = "flex";

    try {
        // Get form values
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const text = document.getElementById("message").value;

        // Construct the URL with Path Variables
        const url = `http://localhost:8080/perfume/sentMail/${encodeURIComponent(email)}/${encodeURIComponent(text)}/${encodeURIComponent(subject)}`;

        // Send a POST request
        const response = await fetch(url, {
            method: "POST",
        });

        if (!response.ok) {
            throw new Error("Failed to send email");
        }

        alert("Email sent successfully!");
        document.getElementById("sentMail").reset();
    } catch (error) {
        console.error("Error sending email:", error);
        alert("Failed to send email. Please try again later.");
    } finally {
        // Restore button state
        submitButton.disabled = false; // Enable the button
        submitButton.textContent = originalButtonText; // Restore original text

        // Hide the loading overlay
        loadingOverlay.style.display = "none";
    }
});
