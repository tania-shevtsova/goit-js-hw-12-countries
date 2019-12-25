function fetchCountries(baseUrl, value, onData) {
  fetch(baseUrl + value)
    .then(response => response.json())
    .then(data => {
      onData(data);
    })
    .catch(e => {
      console.log(e);
    });
}
export default fetchCountries;
