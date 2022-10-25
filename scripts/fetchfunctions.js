//backup code
let loadingSpinner = undefined;

//fetch codes
async function getData(data) {
  fetch(`http://localhost:3000/${data}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      recievedData = data;
      // populateProducts(recievedData);
      console.log(recievedData);
    })
    .catch((err) => {
      throw err;
    });
}

async function insertData(data) {
  fetch(`http://localhost:3000/data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      recievedData = data;
      console.log(recievedData);
    })
    .catch((err) => {
      throw err;
    });
}

async function insertdataSpecDB(data) {
  fetch(`http://localhost:3000/insertdataSpecDB`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      recievedData = data;
      getSpecDBDataFull({
        username: localStorage.getItem("username"),
      });
      // console.log(recievedData);
    })
    .catch((err) => {
      throw err;
    });
}

async function getSpecDBDataFull(data) {
  fetch(`http://localhost:3000/getSpecDBDataFull`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      recievedData = data;
      console.log(recievedData);
      populateTable(recievedData);
      populateUserData(recievedData);

      // userPageElements.currentUserAllowedtables.push(recievedData);
    })
    .catch((err) => {
      throw err;
    });
}

async function createNewUserDB(data) {
  // console.log(data);

  fetch(`http://localhost:3000/createDB`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      recievedData = data;
      // console.log(recievedData);
    })
    .catch((err) => {
      throw err;
    });
}

async function updateSpecDBData(data) {
  // console.log(data);

  fetch(`http://localhost:3000/updateSpecDBData`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      recievedData = data;

      if (!recievedData.sqlState) {
      } else {
      }
    })
    .catch((err) => {
      invokeUserMessage("red", "Update error!");
      throw err;
    });
}

let recievedData;
