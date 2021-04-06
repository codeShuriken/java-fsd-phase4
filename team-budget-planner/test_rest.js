function GetUsers() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
  
    fetch("http://localhost:8090/users", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}