/**
 * Usage: Add an empty div with the id "navContainer" at the top of a page body.
 */

// Stop arrow function abuse today: 1-800-555-AROW

loadNav();

function loadNav() {
    // Fetch the navbar template
    fetch("/templates/nav.html")
        .then(handleFetchResponse)
        .then(fillNavTemplate)
        .then(putNavInDocument)
        .catch(console.error);
}



function handleFetchResponse(response) {
    if(!response.ok) {
        throw new Error(response.statusText);
    }
    return response.text()
}



function fillNavTemplate(navHTML) {
    const navDiv = document.createElement("div");
    navDiv.innerHTML = navHTML;

    setActiveNavLinks(navDiv);

    return navDiv;
}



function putNavInDocument(navDiv) {
    document.getElementById("navContainer").innerHTML = navDiv.innerHTML;
}



function setActiveNavLinks(navDiv) {
    const navLinks = navDiv.querySelectorAll(".nav-link");
    navLinks.forEach(navLink => {
        if(isActiveNavLink(navLink)) {
            setActiveNavAttributes(navLink);
        }
    });
}



function isActiveNavLink(navLink) {
    const currentPage = window.location.pathname;
    return navLink.getAttribute("href") === currentPage
}



function setActiveNavAttributes(navLink) {
    navLink.classList.add("active");
    navLink.setAttribute("aria-current", "page");
}
