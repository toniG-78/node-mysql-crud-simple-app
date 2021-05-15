document.addEventListener("DOMContentLoaded", (e) => {
  //console.log("Doc load ok");

  const main_div = document.querySelector("main");
  const tableBody = document.querySelector("table tbody");
  const progressBar = document.querySelector("#progressBar");
  const addName_input = document.getElementById("addName");
  const nameBtn = document.getElementById("nameBtn");

  setTimeout(() => {
    //Animation
    progressBar.style.display = "none";
    main_div.style.visibility = "visible";
    main_div.style.opacity = 1;

    //Get data from server **************
    function fetchData() {
      fetch("http://localhost:5000/names/all")
        .then((response) => response.json())
        .then((data) => loadData(data));
    }

    function loadData(data) {
      //If no data
      if (data.length === 0) {
        tableBody.innerHTML =
          "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
      } else {
        //console.log(data.names);
        const names = data.names; //It's an array of objets
        createTable(names);
      }
    }

    //Populate table ***********************
    function createTable(names) {
      names.forEach((obj) => {
        const celdaId = document.createElement("td");
        celdaId.textContent = obj.id;
        const celdaName = document.createElement("td");
        celdaName.textContent = obj.name;
        const celdaDate = document.createElement("td");
        celdaDate.textContent = new Date(obj.date_added).toLocaleString();

        const tableRow = document.createElement("tr");
        tableRow.appendChild(celdaId);
        tableRow.appendChild(celdaName);
        tableRow.appendChild(celdaDate);

        //BUTTON EDIT
        const celdaBtn = document.createElement("td");
        const btn = document.createElement("button");
        btn.textContent = "Edit";
        celdaBtn.appendChild(btn);
        tableRow.appendChild(celdaBtn);

        //BUTTON DELETE
        const celdaBtn2 = document.createElement("td");
        const btn2 = document.createElement("button");
        btn2.textContent = "Delete";
        celdaBtn2.appendChild(btn2);
        tableRow.appendChild(celdaBtn2);

        tableBody.append(tableRow);
      });
    }

    fetchData();

    //Post a new name ****************
    nameBtn.addEventListener("click", (e) => {
      const name = addName_input.value;
      addName_input.value = "";

      fetch("http://localhost:5000/names/add", {
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ name: name }),
      })
        .then((response) => response.json())
        .then((data) => {
          const name = data.name;
          console.log(data);
          console.log(name);
          alert(
            `Name: ${name["name"]} / Id: ${name["id"]} / Date: ${new Date(
              name["date_added"]
            ).toLocaleString()}`
          );
        });
    });
  }, 1500);
});
