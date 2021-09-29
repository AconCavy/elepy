function onSubmit() {
    let name = document.getElementById("name").value;
    let json = JSON.stringify({"name": name});
    let request = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: json
    }

    fetch("http://localhost:5000/api", request)
        .then(result => result.text())
        .then(data => {
            console.log(data);
            let result = document.getElementById("result");
            result.innerHTML = data;
        });
}