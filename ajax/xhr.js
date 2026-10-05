function CreateRequest() {
    let httpRequest = false;
    if (window.XMLHttpRequest) { // Gecko-copability, Safari, Konqueror
        httpRequest = new XMLHttpRequest();
        httpRequest.overrideMimeType("text/plain; charset=x-user-defined");
    } else if (window.ActiveXObject) {
        try {
            httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (CatchException) {
            httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
        }
    }
    if (!httpRequest) { console.log("Don`t create XMLHttpRequest"); }
    return httpRequest;
}

function el(selector) { 
    return document.querySelector(selector); 
}

function myConsole(c, status = '') {
    let message, alertClass, text;
    switch (c) {
        case
            1:
            message = '1: Preparation for sending...';
            alertClass = 'alert-primary';
            break;
        case
            2:
            message = '2: Sent...';
            alertClass = 'alert-primary';
            break;
        case
            3:
            message = '3: Processing exchange...';
            alertClass = 'alert-warning';
            break;
        case 4:
            message = '4: Exchange completed!';
            alertClass = 'alert-success';
            break;
        case 5:
            message = 'Error: requested script not found!';
            alertClass = 'alert-danger';
            break;
        case 6:
            message = 'Error: server returned status: ' + status;
            alertClass = 'alert-danger';
            break;
            Default: break;
    }
    text = `<div class="alert ${alertClass}" role="alert">${message}</div>`;
    el("#console").innerHTML += text;
}
    function sendRequest() {
        // Create request: calling the CreateRequest function;
        const request = CreateRequest();
        const url = 'https://jsonplaceholder.typicode.com/posts/4';
        if (!request) { // Check for request existence
            console.log("Don`t create XMLHttpRequest");
        } else {
            console.log("Ye! We created XMLHttpRequest. What to do with it?");
            request.onreadystatechange = function () {
                switch (request.readyState) {
                    case 1:
                        myConsole(1); break;
                    case 2:
                        myConsole(2); break;
                    case 3:
                        myConsole(3); break;
                    case 4:
                        {
                            if (request.status == 200) {
                                myConsole(4);
                                el("#printResult").innerHTML = "<strong>" + request.responseText + "</strong>";
                            } else if (request.status == 404) {
                                myConsole(5);
                            } else {
                                myConsole(6, request.status);
                            }
                            break;
                        }
                }
            };
            request.open('GET', url, true);
            request.send('');
        }
    }
    el('.getBtn').addEventListener('click', sendRequest);