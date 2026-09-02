function validationTest(usrn, name, pass) { // defining the validation test finction
    let message; // making mssage 
    let ok; // making status

    if (usrn == null || typeof usrn !== "string" || usrn.trim() === "") { // validation for Username
        message = "User name is not valid";
        ok = false;

    } else if (name == null || typeof name !== "string" || name.trim() === "") { // validation for Name
        message = "Name is not valid";
        ok = false;

    } else if (pass == null || typeof pass !== "string" || pass.trim() === "") {  // validation for Password
        message = "Password is invalid";
        ok = false;

    } else {  // everythings ok
        message = "Everything is ok";
        ok = true;
    }

    const finalMessage = { // crating the final message
        message: message,
        ok: ok
    };

    return finalMessage; // Returning the final message
}

module.exports = { validationTest }; // export the function to use