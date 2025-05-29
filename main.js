// Grap the form and all the inputs
let form = document.querySelector(".contactForm");
let firstNameInput = document.querySelector(".firstName");
let lastNameInput = document.querySelector(".lastName");
let emailInput = document.querySelector(".emailAddress");
let queryInput = document.querySelectorAll(".query");
let messageInput = document.querySelector(".messageContent");
let consentInput = document.querySelector(".consent");
let submitButton = document.querySelector("button");

// Grap all error spans 
let errFirstName = document.querySelector(".error-fn");
let errLastName = document.querySelector(".error-ln");
let errEmail = document.querySelector(".error-em");
let errQueryType = document.querySelector(".error-qt");
let errMessage = document.querySelector(".error-msg");
let err = document.querySelector(".error-checkbox");

// Grap success toaster
 let successToaster = document.querySelector(".success");


//  Show / hide the toaster 
let toggleToast = (show) => {
    if (show) {
        successToaster.classList.remove("hidden");
        setTimeout(() => {
            successToaster.classList.add("hidden");
        }, 3000); // Hide after 3 seconds
    } else {
        successToaster.classList.add("hidden");
    }
};

// Helper to show/hide error span
let showError = (errMsg, see, inputBorder) => {
   if (see) {
    errMsg.classList.remove("hidden");
        // set red border in error state
    inputBorder.style.borderColor =  "var(--Red)"; 
   } else {
    errMsg.classList.add("hidden");

    // RESET TO DEFAULT BORDER WITHOUT ERROR STATE
   inputBorder.style.backgroundColor = "var(--Grey-500-medium)"
   }
};

//  Add change Listener to  radio for background hughlight 
queryInput.forEach((eachRadio) => {
    eachRadio.addEventListener("change", () => {
        // Remove highlight from all radio buttons
        queryInput.forEach((eachDiv) => {
          let wrapper =  eachDiv.parentElement;
          if (eachDiv.checked) {
            wrapper.style.backgroundColor = "var(--Green-200-lighter)"
          } else {
            wrapper.style.backgroundColor = "";
          }
        });
       


        // Show or hide the error when a radio is checked
        errQueryType.classList.add("hidden"); 
    });
});






// Event Listner
form.addEventListener("submit", (event) => {
    event.preventDefault(); // stops the form reloading/refreshing the page after submitting

    let isValid = true;

    //Validating FirstName
   if (firstNameInput.value === "") {
      showError(errFirstName, true, firstNameInput);
      isValid = false;
   } else {
    showError(errFirstName, false, firstNameInput);
   }

   // Validating LastName
   if (lastNameInput.value === "") {
     showError(errLastName, true, lastNameInput);
     isValid = false;
   } else {
    showError(errLastName, false, lastNameInput);
   }

    // Validating Email
   if (emailInput.value === "") {
     showError(errEmail, true, emailInput);
     isValid = false;
   } else {
    showError(errEmail, false, emailInput);
   }
   
   // Grap the radio input that has been checked
//    let checked = document.querySelector("input.query:checked");

// Validate Query type (at least one radio checked before sun=bmission)
// let queryTypeValue = checked ? checked.value : "";

// //  show or hide the error message
// if (!queryTypeValue) {
//     showError(errQueryType, true);
//     isValid = false;
// } else {
//     showError(errQueryType, false);
// } 


let checkedRadio = document.querySelector("input.query:checked");
if (!checkedRadio) {
    errQueryType.classList.remove("hidden");
    isValid = false;
}

// Validate Message
if (messageInput.value === "") {
    showError(errMessage, true, messageInput);
    isValid = false;
}   else {
    showError(errMessage, false, messageInput);
}

// Validate Consent
if (!consentInput.checked) {
    showError(err, true, consentInput );
    isValid = false;
}  else {
    showError(err, false, consentInput);
}

//  If all fields are valid, log the data in an object

if (isValid) {
    let formData = {
        firstName: firstNameInput.value,
        lastName:  lastNameInput.value,
        email: emailInput.value,
        queryType: checkedRadio ? checkedRadio.value : "",
        message: messageInput.value,
        consent: consentInput.checked,
    };

    console.log("Form SUbmission", formData); 
    toggleToast(true);
    form.reset();
    queryInput.forEach((eachDiv) => {
        eachDiv.parentElement.style.backgroundColor = ""; // Reset background color
    });
}
});