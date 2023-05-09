import fetch from 'node-fetch';
import { getSummary } from './summary';

jest.mock('node-fetch');

describe('getSummary', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return a summary given an article title and body', async () => {
    const articleTitle = 'Example Article Title';
    const articleBody = 'Example Article Body';
    const apiKey = 'fake_api_key';
    const model = 'fake_model';

    const mockApiResponse = {
      choices: [
        {
          message: {
            content: 'Example Summary',
          },
        },
      ],
    };

    fetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      })
    );

    const summary = await getSummary(apiKey, model, articleTitle, articleBody);

    expect(summary).toBe('Example Summary');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

