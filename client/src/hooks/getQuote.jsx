import { quotes } from '../constants';
function getQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}
export default getQuote;