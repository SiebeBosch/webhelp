let currentLanguage = 'EN'; // This can be 'EN' or 'NL'

document.getElementById("flagEN").addEventListener("click", () => toggleLanguage("EN"));
document.getElementById("flagNL").addEventListener("click", () => toggleLanguage("NL"));

function toggleLanguage(lang) {
  currentLanguage = lang;
  renderContent();
}

function createChapter(chapter) {
  let chapterDiv = document.createElement('div');
  let title = document.createElement('h2');
  title.textContent = chapter.title[currentLanguage];
  chapterDiv.appendChild(title);

  chapter.paragraphs.forEach(paragraph => {
    let paragraphDiv = document.createElement('div');

    if (paragraph.title) { // Check if title exists
      let paragraphTitle = document.createElement('h3');
      paragraphTitle.textContent = paragraph.title[currentLanguage];
      paragraphDiv.appendChild(paragraphTitle);
    }

    let text = document.createElement('p');
    if (paragraph.text) { // If "text" exists
      text.textContent = paragraph.text[currentLanguage];
    } else if (paragraph[currentLanguage]) { // If it's a paragraph directly
      text.textContent = paragraph[currentLanguage];
    }

    paragraphDiv.appendChild(text);
    chapterDiv.appendChild(paragraphDiv);
  });

  return chapterDiv;
}

function renderContent() {
  let contentsDiv = document.getElementById('tableOfContents');
  let mainPanelDiv = document.getElementById('mainPanel');

  contentsDiv.innerHTML = '';
  mainPanelDiv.innerHTML = '';

  // Iterate over the chapters
  for (let i = 0; i < content.chapters.length; i++) {
    // Add title to contentsDiv
    let title = document.createElement('h2');
    title.innerHTML = content.chapters[i].title[currentLanguage];
    title.addEventListener('click', function() {
      mainPanelDiv.innerHTML = '';
      mainPanelDiv.appendChild(createChapter(content.chapters[i]));
    });

    contentsDiv.appendChild(title);
  }
}

renderContent(); // Call the function to render the content initially
