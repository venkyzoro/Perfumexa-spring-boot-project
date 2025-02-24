const content = document.getElementById("container");

// Fetch data from the backend API
fetch('http://localhost:8080/perfume/fetchAll') // Replace with your actual backend URL
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        return response.json();
    })
    .then(data => {
        // Check if the response contains the required object
        if (data && data.object) {
            const perfumes = data.object;

            // Create HTML elements for each perfume item
            perfumes.forEach(perfume => {
                const div = document.createElement('div');
                div.className = 'item';

                const img = document.createElement('img');
                img.src = perfume.image_url;
                img.alt = perfume.name;
                img.style.width = '150px'; // Optional styling

                const h2 = document.createElement('h2');
                h2.textContent = perfume.name;

                const brand = document.createElement('p');
                brand.textContent = `Brand: ${perfume.brand}`;

                const price = document.createElement('p');
                price.textContent = `Price: ${perfume.price} Rs`;

                const review = document.createElement('p');
                review.textContent = `Review: ${perfume.review}`;

                const quantity = document.createElement('p');
                quantity.textContent = `Quantity: ${perfume.quantity}`;

                const button = document.createElement("button")
                button.textContent = "Click"
                button.style.width = '90px';
                button.style.height = '30px'
                button.style.backgroundColor = '#4CAF50';
                button.style.color = 'white';
                button.style.cursor = 'pointer';
                button.style.borderRadius = '5px';
                button.style.marginTop = '10px';

                // Add hover effect to the button
                button.addEventListener("mouseover", () => {
                   button.style.backgroundColor = '#3e8e41';
                })
                button.addEventListener("mouseout", () => {
                   button.style.backgroundColor = '#4CAF50';
                })
                button.style.border = '1px';
                // button.style.
                // Append all elements to the div
                button.addEventListener("click", () => {
                   sessionStorage.setItem("id", `${perfume.id}`);
                   window.location.href = "./onePerfume.html"; // Replace with your actual page URL
                })
                div.appendChild(img);
                div.appendChild(h2);
                div.appendChild(brand);
                div.appendChild(price);
                div.appendChild(review);
                div.appendChild(quantity);
                div.appendChild(button);
                // Append the div to the container
                content.appendChild(div);
            });
        } else {
            console.error("No data found in the response");
        }
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });




    
