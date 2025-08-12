/*Sound Effect*/
function buttonSoundEffect() {
    const soundEffect = document.getElementById("soundEffect");
     
    soundEffect.play();
}
/*Review*/
// const stars = document.querySelectorAll(".star");
// const rating = document.getElementById("rating");
// const reviewText = document.getElementById("review");
// const submitBtn = document.getElementById("submit");
// const reviewsContainer = document.getElementById("reviews");
// const username = document.getElementById("username");

// window.addEventListener("DOMContentLoaded", function () {
// 	const savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
// 	savedReviews.forEach(displayReview);
// });

// stars.forEach((star) => {
// 	star.addEventListener("click", () => {
// 		const value = parseInt(star.getAttribute("data-value"));
// 		rating.innerText = value;

// 		stars.forEach((s) => s.classList.remove("one", "two", "three", "four", "five"));
// 		stars.forEach((s, index) => {
// 			if (index < value) {
// 				s.classList.add(getStarColorClass(value));
// 			}
// 		});

// 		stars.forEach((s) => s.classList.remove("selected"));
// 		star.classList.add("selected");
// 	});
// });

// document.getElementById("submit").addEventListener("click", function () {
// 	const username = document.getElementById("username").value.trim();
// 	const review = document.getElementById("review").value.trim();
// 	const rating = document.getElementById("rating").textContent;
// 	const reviewObj = { username, review, rating };
// 	const savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    
// 	savedReviews.push(reviewObj);
// 	localStorage.setItem("reviews", JSON.stringify(savedReviews));
// 	displayReview(reviewObj); 
// 	document.getElementById("username").value = "";
// 	document.getElementById("review").value = "";
// 	stars.forEach((s) => s.classList.remove("one", "two", "three", "four", "five", "selected"));
	
// });
// function displayReview({ username, review, rating }) {
// 	const reviewContainer = document.getElementById("reviews");
// 	const newReview = document.createElement("div");

// 	newReview.className = "review";
// 	newReview.innerHTML = `<strong>${username}</strong> rated it <strong>${rating}/5</strong><br><p>${review}</p>`;
// 	reviewContainer.appendChild(newReview);
// }
// function getStarColorClass(value) {
// 	switch (value) {
// 		case 1:
// 			return "one";
// 		case 2:
// 			return "two";
// 		case 3:
// 			return "three";
// 		case 4:
// 			return "four";
// 		case 5:
// 			return "five";
// 		default:
// 			return "";
// 	}
// }

// localStorage.removeItem("reviews"); //DELETES ALL COMMENTS