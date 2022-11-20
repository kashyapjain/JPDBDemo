var userCount = 0;
var fieldsHtml;

window.onload = function() {
    var form = document.getElementById("putAllUsersForm");

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'Fields.html', true);
    xhr.onreadystatechange = function() {
        if (this.readyState !== 4) return;
        if (this.status !== 200) return; // or whatever error handling you want
        fieldsHtml = this.responseText;
        form.innerHTML = fieldsHtml;
    };
    xhr.send();
};

function addUser() {
    userCount++;

    var form = document.getElementById("putAllUsersForm");

    var div = document.createElement('div');
    div.innerHTML = fieldsHtml.trim();

    form.append(div);
}

function validateAndGetFormData(i) {
    var nameInput = document.getElementsByName("inputName")[i];
    var nameValue = nameInput.value;

    console.log(document.getElementsByName("inputName"))

    if (nameValue == "") {
        alert("Name Requiered");
        nameInput.focus();
        return "";
    }

    var emailInput = document.getElementsByName("inputEmail")[i];
    var emailValue = emailInput.value;

    if (emailValue == "") {
        alert("Email Requiered");
        emailInput.focus();
        return "";
    }

    var jsonObj = {
        name: nameValue,
        email: emailValue
    };

    return JSON.stringify(jsonObj);
}

function saveUsers() {
    var jsonStr = "["
    var len = document.getElementsByName("inputName").length;

    for (var i = 0; i < len; i++) {
        var formJsonStr = validateAndGetFormData(i);

        if (formJsonStr == "") {
            return;
        }

        jsonStr += formJsonStr + ",";
    }

    jsonStr += "]";

    var reqStr = createPUT_ALLRequest(TOKEN, jsonStr, DB, REL);

    var endPoint = "/api/iml";

    jQuery.ajaxSetup({ async: false });
    var res = executeCommand(reqStr, endPoint);
    jQuery.ajaxSetup({ async: true });

    alert(JSON.stringify(res));
}