function extractAndReturnValues(inputs) {
  let inputArray = {};
  let contextData;

  for (let i = 0; i < inputs.length; i++) {
    let fieldName = "";

    if (inputs[i].getAttribute("type") !== "radio") {
      fieldName = inputs[i].name;
      // console.log(fieldName);

      contextData = inputs[i].value;
      inputArray[`${fieldName}`] = contextData;
      continue;
    }

    if (inputs[i].checked) {
      fieldName = inputs[i].getAttribute("name");
      contextData = inputs[i].value;
      inputArray[`${fieldName}`] = contextData;
    }
  }

  return inputArray;
}

function validateInputs(inputs, case_0, case_1, case_2, case_3) {
  if (inputs.mobile_no) {
    if (!inputs.mobile_no.match(/^\d{11}$/)) {
      return "Mobile nunmber not correct!";
    }
  }

  if (case_0) {
    if (!case_0[0]()) {
      return case_0[1];
    }
  }

  if (case_1) {
    if (!case_1[0]()) {
      return case_1[1];
    }
  }

  if (case_2) {
    if (!case_2[0]()) {
      return case_2[1];
    }
  }

  if (case_3) {
    if (!case_3[0]()) {
      return case_3[1];
    }
  }

  if (inputs.reenter_password)
    if (inputs.password !== inputs.reenter_password) {
      return "Password doesn't match!";
    }

  return "valid";
}

function passwordCheck(data) {
  if (data.password.length >= 8) {
    for (let i = 0; i < data.password.length; i++) {
      let element = data.password[i];
      if (
        !(element >= "A" && element <= "Z") &&
        !(element >= "a" && element <= "z") &&
        !isNaN(+element) &&
        checkSpecial(element)
      )
        return true;
    }

    return false;
  }
  return true;
}

function checkSpecial(data) {
  var specialFormat = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (specialFormat.test(data.username)) {
    return false;
  }
  return true;
}

function checkIfFullNumber(data) {
  if (!isNaN(data.username)) {
    return false;
  }
  return true;
}
