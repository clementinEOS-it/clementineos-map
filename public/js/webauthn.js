(function () {

    var credInfo;

    console.log('test')

    $("#BtnRegister").click(function() {
        console.log('click')
        username = $("usernamne").val;
        displayname = $("displayname").val;
        password = $("password").val;

        console.log('username: ' + username);

        $.post("http://localhost:3000/users/registration", {
            username: username, 
            displayname: displayname, 
            password: password
        }, function(result) {
            console.log("Result: " + result);
            credInfo = credential(result);
            console.log('Credential: ' + JSON.stringify(credInfo));
        });

        console.log()
    });

    const credential = async (publicKeyCredentialCreationOptions) => {

        return await navigator.credentials.create({
            publicKey: publicKeyCredentialCreationOptions
        });    
    
    }    

});