import axios from 'axios';

export async function getRandomQuote() {
  try {
    const response = await axios.get('http://api.hamatim.com/quote', {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    return null;
  }
}
