function toggleMenu() {
    var sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('reviewForm').addEventListener('submit', function(e) {
        e.preventDefault();
        var reviewInput = document.getElementById('reviewInput').value;
        if (reviewInput) {
            var reviewList = document.getElementById('reviewList');
            var newReview = document.createElement('div');
            newReview.className = 'review';
            newReview.innerHTML = `
                <div class="logo-background">
                    <img src="asset/Logo2 1.svg" alt="User Icon" class="user-icon">
                </div>
                <div class="review-content">
                    <div class="review-username">New User</div>
                    <div class="review-text">${reviewInput}</div>
                </div>
                <div class="review-actions">
                    <button class="thumbs-up"><img src="asset/Thumbs Up.svg" alt="Thumbs Up"></button>
                    <button class="thumbs-down"><img src="asset/Thumbs Down.svg" alt="Thumbs Down"></button>
                </div>
            `;
            reviewList.appendChild(newReview);
            document.getElementById('reviewInput').value = '';

            // Add event listeners for the new review buttons
            addReviewButtonListeners(newReview);
        }
    });

    function addReviewButtonListeners(review) {
        review.querySelector('.thumbs-up').addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img.src.includes('asset/Thumbs Up.svg')) {
                img.src = 'asset/Thumbs Up_fill.svg';
            } else {
                img.src = 'asset/Thumbs Up.svg';
            }
        });

        review.querySelector('.thumbs-down').addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img.src.includes('asset/Thumbs Down.svg')) {
                img.src = 'asset/Thumbs Down_fill.svg';
            } else {
                img.src = 'asset/Thumbs Down.svg';
            }
        });
    }

    // Initialize event listeners for existing reviews
    document.querySelectorAll('.review').forEach(addReviewButtonListeners);

    document.querySelector('.review-tab').addEventListener('click', function() {
        window.location.href = 'review.html';
    });

    document.querySelector('.qna-tab').addEventListener('click', function() {
        window.location.href = 'q&a.html';
    });

    // Add event listeners for goal action buttons to maintain hover color
    document.querySelectorAll('.goal-actions button').forEach(button => {
        button.addEventListener('click', function() {
            const goalActions = button.parentElement;
            goalActions.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Set active state for category buttons on page load
    filterCategory('all');
});

function filterCategory(category) {
    var items = document.querySelectorAll('.goal-card');
    var buttons = document.querySelectorAll('.category-buttons button');

    buttons.forEach(function(button) {
        button.classList.remove('active');
        if (button.getAttribute('data-category') === category || (category === 'all' && button.getAttribute('data-category') === 'all')) {
            button.classList.add('active');
        }
    });

    items.forEach(function(item) {
        if (category === 'all' || item.getAttribute('data-category').toLowerCase() === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function submitQuestion() {
    const qaInput = document.getElementById('qa-input');
    const qaContainer = document.getElementById('qa-container');
    const userProfile = {
        username: "말하는 감자",
        email: "user@example.com",
    };

    if (qaInput.value.trim() !== '') {
        const newQuestion = document.createElement('div');
        newQuestion.classList.add('qa-item');
        
        const questionText = document.createElement('div');
        questionText.classList.add('qa-question');
        questionText.innerHTML = `<img src="asset/Reply.svg" alt="Reply Icon"><span>${userProfile.username}</span>${qaInput.value}`;
        
        newQuestion.appendChild(questionText);
        newQuestion.style.borderBottom = '1px solid #e0e0e0';
        qaContainer.appendChild(newQuestion);
        
        qaInput.value = '';
    }
}
