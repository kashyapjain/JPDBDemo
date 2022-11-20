function validateAndGetFormData() {
    var nameInput = document.getElementById("inputName");
    var nameValue = nameInput.value;

    if (nameValue == "") {
        alert("Name Requiered");
        nameInput.focus();
        return "";
    }

    var emailInput = document.getElementById("inputEmail");
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

function saveUser() {
    var jsonStr = validateAndGetFormData();

    if (jsonStr == "") {
        return;
    }

    var reqStr = createPUTRequest(TOKEN, jsonStr, DB, REL);

    var endPoint = "/api/iml";

    jQuery.ajaxSetup({ async: false });
    var res = executeCommand(reqStr, endPoint);
    jQuery.ajaxSetup({ async: true });

    alert(JSON.stringify(res));
}