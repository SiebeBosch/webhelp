let currentLanguage = 'EN'; // This can be 'EN' or 'NL'

// Function to handle language toggle
function toggleLanguage(lang) {
  language = lang;
  renderContent();
}

document.getElementById("flagEN").addEventListener("click", () => toggleLanguage("EN"));
document.getElementById("flagNL").addEventListener("click", () => toggleLanguage("NL"));

function renderContent() {
  // Handle rendering content based on the current language
  let contentsDiv = document.getElementById('tableOfContents');
  let mainPanelDiv = document.getElementById('mainPanel');

  contentsDiv.innerHTML = '';
  mainPanelDiv.innerHTML = '';

  // Iterate over the chapters
  for (let i = 0; i < content.chapters.length; i++) {
    // Add title to contentsDiv
    let title = document.createElement('h2');
    title.innerHTML = content.chapters[i].title[currentLanguage];
    contentsDiv.appendChild(title);

    // Add paragraphs to mainPanelDiv
    for (let j = 0; j < content.chapters[i].paragraphs.length; j++) {
      let para = document.createElement('p');
      para.innerHTML = content.chapters[i].paragraphs[j][currentLanguage];
      mainPanelDiv.appendChild(para);
    }
  }
}

function createChapter(chapter) {
    let chapterDiv = document.createElement('div');
    let title = document.createElement('h2');
    title.textContent = chapter.title[currentLanguage];
    chapterDiv.appendChild(title);
    
    chapter.paragraphs.forEach(paragraph => {
      let paragraphDiv = document.createElement('div');
  
      if(paragraph.title) { // Check if title exists
        let paragraphTitle = document.createElement('h3');
        paragraphTitle.textContent = paragraph.title[currentLanguage];
        paragraphDiv.appendChild(paragraphTitle);
      }
  
      let text = document.createElement('p');
      if(paragraph.text) { // If "text" exists
        text.textContent = paragraph.text[currentLanguage];
      } else if(paragraph.EN) { // If it's a paragraph directly
        text.textContent = paragraph[currentLanguage];
      }
  
      paragraphDiv.appendChild(text);
      chapterDiv.appendChild(paragraphDiv);
    });
    
    return chapterDiv;
  }

renderContent(); // Call the function to render the content initially

//document.getElementById('mainPanel').appendChild(createChapter(content.chapters[0])); // For testing