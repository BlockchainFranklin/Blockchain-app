
export function mapResultFromInt(result) {
    if (result == 0) {
        return('Visit accepted');
      } else if (result == 1) {
        return('Visit in progress');
      } else if (result == 2) {
        return('Insufficient rates');
      } else if (result == 3) {
        return('Rates were negative');
      } else if (result == 4) {
        return('Insufficient user rates');
      } else if (result == 5) {
        return('Pick timeout');
      } else if (result == 6) {
        return('Verification contested');
      } else if (result == 7) {
        return('Negative reclamation verification');
      } else {
        return(`Unknown result: ${result}`);
      }
}