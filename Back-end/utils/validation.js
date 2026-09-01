function validationTest(usrn, name, pass) {
    let message;
    let ok;

    if (usrn == null || typeof usrn !== "string" || usrn.trim() === "") {
        message = "User name is not valid";
        ok = false;

    } else if (name == null || typeof name !== "string" || name.trim() === "") {
        message = "Name is not valid";
        ok = false;

    } else if (pass == null || typeof pass !== "string" || pass.trim() === "") {
        message = "Password is invalid";
        ok = false;

    } else {
        message = "Everything is ok";
        ok = true;
    }

    const finalMessage = {
        message: message,
        ok: ok
    };

    return finalMessage;
}

module.exports = { validationTest };