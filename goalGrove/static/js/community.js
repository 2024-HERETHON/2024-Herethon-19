document.addEventListener('DOMContentLoaded', function() {
    fetchGoals();
  
    const categoryButtons = document.querySelectorAll('.category-buttons button');
    categoryButtons.forEach(button => {
      button.addEventListener('click', function() {
        const category = this.getAttribute('onclick').match(/'([^']+)'/)[1];
        filterCategory(category);
      });
    });
  });
  
  function fetchGoals() {
    fetch('/api/goals/')
      .then(response => response.json())
      .then(data => {
        const goalsContainer = document.getElementById('goals-container');
        goalsContainer.innerHTML = ''; // Clear previous goals
  
        data.forEach(goal => {
          const goalCard = createGoalCard(goal);
          goalsContainer.appendChild(goalCard);
        });
  
        filterCategory('all'); // Show all items initially
      })
      .catch(error => console.error('Error fetching goals:', error));
  }
  
  function createGoalCard(goal) {
    const goalCard = document.createElement('div');
    goalCard.className = 'goal-card';
    goalCard.dataset.username = goal.username;
    goalCard.dataset.title = goal.title;
    goalCard.dataset.type = goal.category;
    goalCard.dataset.image = goal.image;
    goalCard.dataset.frequency = goal.frequency;
    goalCard.dataset.description = goal.description;
    goalCard.dataset.challengecount = goal.challenge_count;
    goalCard.dataset.tupcount = goal.tup_count;
    goalCard.dataset.tdowncount = goal.tdown_count;
  
    goalCard.innerHTML = `
      <div class="goal-header">
        <div class="goal-left">
          <div class="logo-background">
            <img src="{% static 'community/img/asset/Logo2 1.svg' %}" alt="Title Logo" class="title-logo">
          </div>
          <div class="goal-title">
            <div class="goal-nickname">${goal.username}</div>
            <a>${goal.title}</a>
          </div>
        </div>
        <div class="goal-right">
          <a class="goal-type">${goal.category}</a>
          <img src="{% static 'community/img/asset/Basket_alt_3.svg' %}" alt="Cart Icon" class="cart-icon">
        </div>
      </div>
      <hr class="goal-separator">
      <div class="goal-info">
        <div class="goal-details">
          <div class="firstline">
            <div class="challengecount">${goal.challenge_count}회차</div>
            <div class="first-line">
              <span class="highlight">${goal.frequency.split(' ')[0]}</span>
              <span>${goal.frequency.split(' ')[1]}</span>
            </div>
          </div>
          <div class="second-line">
            <p>${goal.description}</p>
          </div>
        </div>
        <div class="right-block">
          <img src="${goal.image}" alt="Goal Image" class="goal-image">
          <div class="like-container">
            <img src="{% static 'community/img/asset/Thumbs Up.svg' %}" alt="Thumbs Up" class="ThumbsUp">
            <a class="TUpcount">${goal.tup_count}</a>
            <img src="{% static 'community/img/asset/Thumbs Down.svg' %}" alt="Thumbs Down" class="ThumbsDown">
            <a class="TDowncount">${goal.tdown_count}</a>
          </div>
        </div>
      </div>
    `;
  
    return goalCard;
  }
  
  function filterCategory(category) {
    var items = document.querySelectorAll('.goal-card');
    var buttons = document.querySelectorAll('.category-buttons button');
  
    buttons.forEach(function(button) {
      button.classList.remove('active');
      if (button.getAttribute('onclick').includes(category)) {
        button.classList.add('active');
      }
    });
  
    items.forEach(function(item) {
      if (category === 'all' || item.getAttribute('data-type').toLowerCase() === category.toLowerCase()) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }
  