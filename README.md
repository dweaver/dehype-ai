# Dehype AI Chrome Extension

Dehype AI is a Chrome extension that identifies hype in articles about AI. It uses OpenAI's ChatGPT API to analyze the current page for overhyped AI claims.

![Dehype AI Example](example.png)


## Setup

1. Clone the repository:

```
git clone git@github.com:dweaver/dehype-ai.git

```

2. Create a `openai-api-key.json` file in the root directory of the project and add your OpenAI API key and model you'd like to use, e.g. `gpt-4` or `gpt-3.5-turbo`.

```
{
  "apiKey": "<key>",
  "model": "gpt-4"
}
```

3. Install the extension in Chrome:

- Open Chrome and navigate to `chrome://extensions/`.
- Enable "Developer mode" by toggling the switch in the top-right corner.
- Click "Load unpacked" and select the `dehype-ai` folder.

## Usage

1. Open a website containing an article related to AI.
2. Click on the Dehype AI extension icon in the Chrome toolbar.
3. A popup will appear with a "Loading summary..." message.
4. After a few seconds, the summary will be displayed in the popup with the hype removed.

## Example Results

1. "AI trained to read minds and translate private thought..." (https://boingboing.net/2023/05/01/a-i-trained-to-read-minds-and-translate-private-thought-to-text-via-brain-scans.html)
TODO


## Contributing

Feel free to open issues or submit pull requests to contribute to this project. We appreciate your help in making this extension better!

## License

This project is released under the [MIT License](LICENSE).

## Thank you!
