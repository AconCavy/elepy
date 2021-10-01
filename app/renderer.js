async function openDirectoryPicker() {
    let result = await window.api.openDirectoryPicker();
    let label = document.getElementById('selectedDirectory');
    label.innerHTML = result.canceled ? 'canceled' : result.filePaths;
}

function postToApi() {
    let directory = document.getElementById("selectedDirectory").innerText;
    let json = JSON.stringify({"name": directory});
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
            let label = document.getElementById("result");
            label.innerHTML = data;
        });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('directoryPicker')
        .addEventListener('click', openDirectoryPicker);
    document.getElementById('submit')
        .addEventListener('click', postToApi);
});