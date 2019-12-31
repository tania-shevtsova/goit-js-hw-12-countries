export default function fetchCountries(baseUrl, value, onData) {
   fetch(baseUrl + value).then(response =>
    response
      .json()
      .then(data => {
        if(onData !== null)
        {onData(data)};
        return data;
      })
      .catch( e => {
        console.log(e)
      })
   );
}
