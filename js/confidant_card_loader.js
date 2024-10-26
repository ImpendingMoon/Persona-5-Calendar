/**
 * Usage: Add an empty div with the id "navContainer" with the class "container"
 * inside a page body.
 */



loadConfidantCards();

async function loadConfidantCards() {
	let response = await fetch("/templates/confidant_card.html");
	const templateHTML = await response.text();
	response = await fetch("/json/confidant_info.json");
	const confidantInfo = await response.json();

	// TODO: Make loop for all confidants
	const allCardDivs = [];

	confidantInfo.forEach(confidant => {
		let cardDiv = createConfidantCard(
			templateHTML,
			confidant.name,
			confidant.arcana,
			confidant.arcanaNumeral,
			confidant.profileImagePath,
			confidant.cardImagePath
		);
		allCardDivs.push(cardDiv);
	});

	putCardsInDocument(allCardDivs);
}



function createConfidantCard(
	templateHTML,
	name,
	arcana,
	arcanaNumeral,
	profileImagePath,
	cardImagePath
) {
	const cardDiv = document.createElement("div");
	cardDiv.innerHTML = templateHTML;

	setCardName(cardDiv, name);
	setCardArcana(cardDiv, arcana, arcanaNumeral);
	setCardAnchorHref(cardDiv, arcana);
	setCardProfileImage(cardDiv, profileImagePath);
	setCardTarotImage(cardDiv, cardImagePath);
	addColumnClasses(cardDiv);

	return cardDiv;
}



function setCardName(cardDiv, name) {
	const nameHeader = cardDiv.querySelector("#confidantNameHeader");
	nameHeader.innerHTML = name;
	nameHeader.removeAttribute("id"); // Prevent future ID conflicts
}



function setCardArcana(cardDiv, arcana, arcanaNumeral) {
	const arcanaText = cardDiv.querySelector("#confidantArcanaText");
	arcanaText.innerHTML = arcanaNumeral + ": " + arcana;
	arcanaText.removeAttribute("id"); // Prevent future ID conflicts
}



function setCardAnchorHref(cardDiv, arcana) {
	const pageAnchor = cardDiv.querySelector("#confidantPageAnchor");
	pageAnchor.setAttribute("href", "/confidants/confidant.html?arcana=" + arcana.toLowerCase());
	pageAnchor.removeAttribute("id"); // Prevent future ID conflicts
}



function setCardProfileImage(cardDiv, imagePath) {
	const profileImage = cardDiv.querySelector("#confidantProfileImage");
	profileImage.setAttribute("src", imagePath);
	profileImage.removeAttribute("id"); // Prevent future ID conflicts
}



function setCardTarotImage(cardDiv, imagePath) {
	const cardImage = cardDiv.querySelector("#confidantCardImage");
	cardImage.setAttribute("src", imagePath);
	cardImage.removeAttribute("id"); // Prevent future ID conflicts
}



function addColumnClasses(cardDiv) {
	cardDiv.classList.add("col-12");
	cardDiv.classList.add("col-lg-6")
}



function putCardsInDocument(cardDivArray) {
	const cardsDiv = document.createElement("div");
	let currentRowDiv;

	for(i = 0; i < cardDivArray.length; i++) {
		// Cards go two per row
		if(i % 2 === 0) {
			currentRowDiv = document.createElement("div");
			currentRowDiv.classList.add("row")
			cardsDiv.appendChild(currentRowDiv);
		}

		currentRowDiv.appendChild(cardDivArray[i]);
	}

	document.getElementById("confidantCardContainer").innerHTML = cardsDiv.innerHTML;
}
