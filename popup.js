let apiKey;

fetch(chrome.runtime.getURL('apikey.txt'))
  .then((response) => response.text())
  .then((key) => {
    apiKey = key.trim();
  })
  .catch((error) => {
    console.error('Error loading API key:', error);
  });

async function fetchSummary(title, body) {
  const prompt = `In the following article, extract a quote that most undermines the hype in the title: \`\`\`<${title} and ${body}>\`\`\``;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt }
      ]
    })
  });

  if (!response.ok) {
    console.error('API request failed:', response);
    return 'Error: Could not fetch summary.';
  }
  const data = await response.json();

  if (data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {
    return data.choices[0].message.content.trim();
  } else {
    console.error('Unexpected API response:', data);
    return 'Error: Could not fetch summary.';
  }
}

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
      fetchSummary(article.title, article.body).then(summary => {
        document.getElementById("summary").textContent = summary;
      });
    }
  );
});

