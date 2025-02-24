
    // Retrieve the perfume ID from sessionStorage
    let prodId = sessionStorage.getItem('id');

    // Check if ID exists, then fetch the perfume details
    if (prodId) {
      fetch(`http://localhost:8080/perfume/findById/${prodId}`)
        .then((response) => response.json())
        .then((data) => {
          // Log the fetched data for debugging
          console.log("Fetched Data:", data);

          // Access the data inside 'data.object'
          const perfume = data.object;

          // Inject the fetched data into the page
          const container = document.getElementById('perfume-details');
          container.innerHTML = `
            <div class="card">
              <div class="image-container">
                <img src="${perfume.image_url || 'default-image.jpg'}" alt="${perfume.name || 'No Name'}" />
              </div>
              <div class="details">
                <h1>${perfume.name || "No Name"}</h1>
                <h2>Brand: ${perfume.brand || "Unknown Brand"}</h2>
                <p class="description">
                  <strong>Description:</strong> ${perfume.description || 'No description available'}
                </p>
                <p><strong>Price:</strong> ${perfume.price || "N/A"} Rs</p>
                <p><strong>Rating:</strong> ${perfume.review || "N/A"} ★</p>
                <p><strong>Quantity Available:</strong> ${perfume.quantity || "N/A"}</p>

                <!-- Social Media Share Icons -->
                <div class="social-share">
                  <!-- Facebook -->
                  <a href="https://www.facebook.com/sharer/sharer.php?u=${window.location.href}" target="_blank" class="social-icon">
                    <i class="fab fa-facebook-f"></i> <!-- Facebook Icon -->
                  </a>

                  <!-- WhatsApp -->
                  <a href="https://wa.me/?text=${encodeURIComponent(window.location.href)}" target="_blank" class="social-icon">
                    <i class="fab fa-whatsapp"></i> <!-- WhatsApp Icon -->
                  </a>

                  <!-- LinkedIn -->
                  <a href="https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}" target="_blank" class="social-icon">
                    <i class="fab fa-linkedin-in"></i> <!-- LinkedIn Icon -->
                  </a>

                  <!-- Telegram -->
                  <a href="https://t.me/share/url?url=${encodeURIComponent(window.location.href)}" target="_blank" class="social-icon">
                    <i class="fab fa-telegram-plane"></i> <!-- Telegram Icon -->
                  </a>
                </div>
              </div>
            </div>
            <div class="image-gallery">
          <div class="image-gallery-container">
            <img src="${perfume.img2 || 'default-image.jpg'}" alt="Additional Image 1" />
            <img src="${perfume.img3 || 'default-image.jpg'}" alt="Additional Image 2" />
            <img src="${perfume.img4 || 'default-image.jpg'}" alt="Additional Image 3" />
          </div>
        </div>
          `;
        })
        .catch((error) => {
          console.error("Error fetching perfume data:", error);
          document.getElementById('perfume-details').innerHTML = `
            <p style="color: red; text-align: center;">Failed to fetch perfume details. Please try again later.</p>
          `;
        });
    } else {
      // Handle the case where the ID is missing
      document.getElementById('perfume-details').innerHTML = `
        <p style="color: red; text-align: center;">No perfume selected. Please go back and select a perfume.</p>
      `;
    }

    // Fetch and display reviews
    fetch('http://localhost:8080/perfume/fetchAllReviews')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched Reviews:', data);

        const reviewsContainer = document.getElementById('reviews-container');
        let count = 0;  // Initialize count to 0

        if (data.object && data.object.length > 0) {
          // Loop through the reviews and display each one
          data.object.forEach((review) => {
            if (review.product_id == prodId) {
              count++;  // Correct way to increment count
              const reviewCard = document.createElement('div');
              reviewCard.style.marginBottom = '20px';
              reviewCard.style.padding = '10px';
              reviewCard.style.border = '1px solid #ccc';
              reviewCard.style.borderRadius = '5px';
              reviewCard.style.backgroundColor = '#f9f9f9';
              reviewCard.innerHTML = `
                <p><strong>Review ${count}:</strong> ${review.text}</p>
              `;
              reviewsContainer.appendChild(reviewCard);
            }
          });
        } else {
          reviewsContainer.innerHTML = '<p style="color: gray;">No reviews available yet.</p>';
        }
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
        document.getElementById('reviews-container').innerHTML = '<p style="color: red;">Failed to load reviews. Please try again later.</p>';
      });

    // Post a new review
    document.getElementById('post-review-button').addEventListener('click', () => {
      const reviewInput = document.getElementById('review-input');
      const reviewText = reviewInput.value.trim();
      const prodId = sessionStorage.getItem('id');  // Get the product ID from sessionStorage

      if (reviewText === '') {
        alert('Please write a review before posting.');
        return;
      }

      if (!prodId) {
        alert('No product selected. Please go back and select a product.');
        return;
      }

      // Construct the review object to be sent to the backend
      const newReview = {
        text: reviewText,
        product_id: prodId, // Use the product ID from sessionStorage
      };

      // Send the review to the backend using a POST request
      fetch('http://localhost:8080/perfume/saveReview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Review Posted:', data);

          // Add the new review to the reviews container
          const reviewsContainer = document.getElementById('reviews-container');
          const reviewCard = document.createElement('div');
          reviewCard.style.marginBottom = '20px';
          reviewCard.style.padding = '10px';
          reviewCard.style.border = '1px solid #ccc';
          reviewCard.style.borderRadius = '5px';
          reviewCard.style.backgroundColor = '#f9f9f9';
          reviewCard.innerHTML = `
            <p><strong>Review:</strong> ${reviewText}</p>
          `;
          reviewsContainer.prepend(reviewCard); // Add the new review at the top
          reviewInput.value = ''; // Clear the input field
        })
        .catch((error) => {
          console.error('Error posting review:', error);
          alert('Failed to post review. Please try again.');
        });
    });