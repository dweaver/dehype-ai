import fetch from 'cross-fetch';

export async function getSummary(apiKey, model, title, body) {
  //const prompt = `In the following article, extract a quote that most undermines the hype in the title: \`\`\`<${title} and ${body}>\`\`\``;
  const prompt = `In the following article, identify any instances of hype related to AI, such as overstating capabilities, sensationalized language, misleading comparisons, or other issues. Provide specific examples from the article that demonstrate these types of hype. Return only JSON array of "type", "example", "comment" attributes.\n\nArticle title: ${title}\n\nArticle body: ${body}`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: model,
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
