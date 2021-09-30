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

    fetch("http://127.0.0.1:5000/api", request)
        .then(result => result.text())
        .then(data => {
            console.log(data);
            let result = document.getElementById("result");
            result.innerHTML = data;
        });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('submit')
        .addEventListener('click', onSubmit);
});