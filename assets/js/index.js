// ^ ### HTML Elements 👇
var bookmarkNameInput = document.getElementById("bookmarkName");
var bookmarkURLInput = document.getElementById("bookmarURL");
var bookmarksContainer = document.querySelector("table");

// & ### App variable
var bookmarkList = JSON.parse(localStorage.getItem("bookmarkList")) || [];
displayAllBookmarks();

// * ### Regex validation
var nameRegex = /^[A-Z][A-Za-z0-9 ]{3,}$/;
var urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})([\/\w .-]*)*\/?$/i;

bookmarkNameInput.addEventListener("input", function () {
  validate(nameRegex, bookmarkNameInput);
});

bookmarkURLInput.addEventListener("input", function () {
  validate(urlRegex, bookmarkURLInput);
});

// * ### Functions
function addBookmark() {
  var isValid =
    validate(nameRegex, bookmarkNameInput) &&
    validate(urlRegex, bookmarkURLInput);

  if (isValid) {
    var bookmark = {
      name: bookmarkNameInput.value,
      url: bookmarkURLInput.value.startsWith("http")
        ? bookmarkURLInput.value
        : "https://" + bookmarkURLInput.value,
    };

    bookmarkList.push(bookmark);
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));

    displayBookmark(bookmarkList.length - 1);
    clearForm();

    console.log("Bookmark added successfully!");
  } else {
    console.log("Invalid input. Please check the site name and URL format.");
  }
}

function displayBookmark(index) {
  var bookmarkMarkup = `
    <tr>
      <td>${index + 1}</td>
      <td>${bookmarkList[index].name}</td>
      <td>
        <a href="${bookmarkList[index].url}" target="_blank" class="btn btn-visit">
          <i class="fa-solid fa-eye"></i> Visit
        </a>
      </td>
      <td>
        <button class="btn btn-delete" onclick="deleteBookmark(${index})">
          <i class="fa-solid fa-trash-can"></i> Delete
        </button>
      </td>
    </tr>
  `;

  bookmarksContainer.innerHTML += bookmarkMarkup;
}

function displayAllBookmarks() {
  bookmarksContainer.innerHTML = `
    <tr>
      <th>Index</th>
      <th>Website Name</th>
      <th>Visit</th>
      <th>Delete</th>
    </tr>
  `;
  for (var i = 0; i < bookmarkList.length; i++) {
    displayBookmark(i);
  }
}

function deleteBookmark(index) {
  bookmarkList.splice(index, 1);
  localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
  displayAllBookmarks();

  console.log("Bookmark deleted successfully!");
}

function validate(regex, input) {
  if (regex.test(input.value)) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    return true;
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    return false;
  }
}

function clearForm() {
  bookmarkNameInput.value = "";
  bookmarkURLInput.value = "";
  bookmarkNameInput.classList.remove("is-valid");
  bookmarkURLInput.classList.remove("is-valid");
}

document.querySelector(".btn-submit").addEventListener("click", addBookmark);
