// check validation of contact form before submit to php
function verify($this) {
    let errorMessage = document.querySelector(".error");
    if($this.name.value.trim() === "" || $this.email.value.trim() === "" || $this.enquiry.value.trim() === ""){
        errorMessage.innerHTML = "Please complete the enquiry form before submitting";
        errorMessage.style.display = "block";
        return false;
    }
    else{
        errorMessage.innerHTML = "";
        errorMessage.style.display = "none";
        let messageBody = {
            "name": $this.name.value,
            "email": $this.email.value,
            "company": $this.company.value,
            "inquiry": $this.enquiry.value,
        }
        
        sendSupportMail(messageBody);
        return false;
    }
}
const domain = "https://us-central1-third-cc-website.cloudfunctions.net/widgets"
function sendSupportMail(messageBody){
    fetch(domain+"/supportEmail",{
        method: "POST", 
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-fcache', // *default, no-cache, reload, force-cache, only-if-cached
        redirect: 'follow', // manual, *follow, error
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS' 
        },
        body: JSON.stringify({
            "name": messageBody.name,
            "mail": messageBody.email,
            "inquiry": messageBody.inquiry,
        })
    })
    .then(res => {
        window.location.reload();
    })
    .catch(err => {
        console.error(err)
    })
}