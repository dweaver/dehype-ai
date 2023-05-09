let apiKey;
let model;

fetch(chrome.runtime.getURL('openai-api-key.json'))
  .then((response) => response.text())
  .then((text) => {
    const config = JSON.parse(text);
    apiKey = config.apiKey.trim();
    model = config.model.trim();
  })
  .catch((error) => {
    console.error('Error loading API key:', error);
  });

function extractArticle() {
  const title = document.title;
  const body = document.body.innerText;
  return { title, body };
}

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.scripting.executeScript(
    {
      target: { tabId: tabs[0].id },
      function: extractArticle
    },
    (results) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        return;
      }

      const article = results[0].result;
      getSummary(apiKey, model, article.title, article.body).then(summary => {
        document.getElementById("summary").textContent = summary;
      });
    }
  );
});
