var myData = [
    {"dealId" : 0, "client_name" : "Microsoft", "project_name" : "Apollo Project", "project_manager" : "Mary", "vendor" : "abc", "project_cost" : 1000},
    {"dealId" : 1, "client_name" : "Intel", "project_name" : "Hermes Project", "project_manager" : "Bob", "vendor" : "abc", "project_cost" : 10000},
    {"dealId" : 2, "client_name" : "Amazon", "project_name" : "Zeus Project", "project_manager" : "Jane", "vendor" : "abc","project_cost" : 100000},
    {"dealId" : 3, "client_name" : "Nvidia", "project_name" : "GTX 4080 Project", "project_manager" : "Mike", "vendor" : "abc","project_cost" : 900000},
    {"dealId" : 4, "client_name" : "Facebook", "project_name" : "Oculus Project", "project_manager" : "Tom", "vendor" : "abc","project_cost" : 5000000},
    {"dealId" : 5, "client_name" : "Twitter", "project_name" : "Clubhouse Project", "project_manager" : "Gowt", "vendor" : "abc","project_cost" : 51000},
    {"dealId" : 6, "client_name" : "Apple", "project_name" : "Prometheus Project", "project_manager" : "Jane", "vendor" : "abc", "project_cost" : 55000}
]

//var currentDealId = myData.length;

// localstorage allows us to persist key value pairs in a way that would survive page refreshes, navigation, and user closing/reopening browser.
// localstorage has limits to the size of each object stored.   



function CreateTableFromJSON() {    
    // EXTRACT VALUE FOR HTML HEADER. 
    // ('Deal ID', 'Deal Name', 'Category' and 'Price')
    if (localStorage.getItem("myData") == null){
        var myData1 = myData;
        localStorage.setItem("myData", JSON.stringify(myData1));
        var len  = myData1.length
        localStorage.setItem("len", len)

    }
    else
        var myData1 =  JSON.parse(localStorage.getItem("myData"));
    var col = [];
    for (var i = 0; i < myData1.length; i++) {
        for (var key in myData1[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
    col.push('Action')
    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
    var tr = table.insertRow(-1);                   // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < myData1.length; i++) {
        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            if (j == col.length-1)
                tabCell.innerHTML = '<button onclick="UpdateRow(' + myData1[i].dealId + ')"> <img src="images/update.png" style="width:15px;height:15px;"> </button>  <button onclick="DeleteRow(' + myData1[i].dealId + ')"> <img src="images/trash_can.png" style="width:15px;height:15px;"> </button>'
            else
                tabCell.innerHTML = myData1[i][col[j]];
        }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

function UpdateRow(dealId){
    var myData1 =  JSON.parse(localStorage.getItem("myData"));
    for(var i = 0; i < myData1.length; i++){ 
        if (myData1[i].dealId === dealId) { 
            //location.href="form.html"
            document.getElementById("id").value = myData1[i].dealId;
            document.getElementById("clientNameInput").value = myData1[i].client_name;
            document.getElementById("projectNameInput").value = myData1[i].project_name;
            document.getElementById("projectManagerInput").value = myData[i].project_manager;
            document.getElementById("vendor").value=  myData1[i].vendor;
            document.getElementById("projectCostInput").value =  myData1[i].project_cost;
           
            break;
        }
    }
}


function UpdateDeal(id, clientName, projectName, projectManager, vendor, projectCost){
    console.log('Here in Update Deal!' + id)
   
    var myData1 = JSON.parse(localStorage.getItem("myData"));
    console.log(myData1)
    for(var i = 0; i < myData1.length; i++){ 
        if (myData1[i].dealId === id) { 
            myData1[i].client_name = clientName;
            myData1[i].project_name = projectName;
            myData1[i].project_manager = projectManager;
            myData1[i].vendor = vendor;
            myData1[i].project_cost = projectCost;
            console.log(myData1[i])
            localStorage.setItem("myData", JSON.stringify(myData1));
            break;
        }
    }
    CreateTableFromJSON();
}

function AddNewDeal() {
    var id = document.getElementById("id").value
    id=parseInt(id)
    var clientName = document.getElementById("clientNameInput").value;
    var projectName = document.getElementById("projectNameInput").value;
    var projectManager = document.getElementById("projectManagerInput").value;
    var vendor = document.getElementById("vendor").value;
    var projectCost = document.getElementById("projectCostInput").value;

    //console.log(id, clientName, projectName, projectManager, vendor, projectCost)

    if (clientName == "" || projectName == "" || projectManagerInput == "" || projectCostInput == "" || vendor=="")
        return;

    document.getElementById("id").value = "";
    document.getElementById("clientNameInput").value = "";
    document.getElementById("projectNameInput").value = "";
    document.getElementById("projectManagerInput").value = "";
    document.getElementById("vendor").value= "";
    document.getElementById("projectCostInput").value = "";

    var len = parseInt(localStorage.getItem("len"))
    if (id < len){    //update
        UpdateDeal(id, clientName, projectName, projectManager, vendor, projectCost)
        return;
    }
    
    InsertRow(len, clientName, projectName, projectManager, vendor, projectCost);
}

function InsertRow(dealId, clientName, projectName, projectManager, vendor, projectCost) {
    var myData1 =  JSON.parse(localStorage.getItem("myData"));
    myData1.push({"dealId": dealId, "client_name" : clientName, "project_name" : projectName, "project_manager" : projectManager, "vendor" : vendor, 
    "project_cost" : projectCost})
    dealId++;
    localStorage.setItem("len", dealId);
    localStorage.setItem("myData", JSON.stringify(myData1));
    CreateTableFromJSON();
}

function DeleteRow(dealId) {
    var myData1 =  JSON.parse(localStorage.getItem("myData"));
    for(var i = 0; i < myData1.length; i++){ 
        if (myData1[i].dealId === dealId) { 
            myData1.splice(i, 1); 
            localStorage.setItem("myData", JSON.stringify(myData1));
        }
    }
    CreateTableFromJSON();
}


function DeleteRow1(dealId) {
    var myData1 =  JSON.parse(localStorage.getItem("myData"));
    for(var i = 0; i < myData1.length; i++){ 
        if (myData1[i].dealId === dealId) { 
            myData1.splice(i, 1); 
            localStorage.setItem("myData", JSON.stringify(myData1));
        }
    }
    updateExpenses();
    calcExpenses();
}


function updateExpenses(){
    if (localStorage.getItem("myData") == null){
        var myData1 = [];
        var len = 0
    }
    else
        var myData1 =  JSON.parse(localStorage.getItem("myData"));
    var col = ['project_name', 'project_cost', 'delete_project'];
    var table = document.createElement("table");
    var tr = table.insertRow(-1);                   // TABLE ROW.
    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }
    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < myData1.length; i++) {
        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            if (j == col.length-1)
                tabCell.innerHTML = '<button onclick="DeleteRow1(' + myData1[i].dealId + ')"> <img src="images/trash_can.png" style="width:15px;height:15px;"> </button>'
            else if (j == 0)
                tabCell.innerHTML = myData1[i].project_name;
            else 
                tabCell.innerHTML = myData1[i].project_cost;
        }
    }

    var divContainer1 = document.getElementById("showData2");
    divContainer1.innerHTML = "";
    divContainer1.appendChild(table);
    
    document.getElementById("budget").value = 1000000000;
    calcExpenses();
}

function calcExpenses() {
    var totalExp = 0;
    if (localStorage.getItem("myData") == null){
        var myData1 = [];
        var len = 0
    }
    else
        var myData1 =  JSON.parse(localStorage.getItem("myData"));
    
    for (i = 0; i < myData1.length; i++) {
      totalExp = parseInt(myData1[i].project_cost) + totalExp;
    }
    console.log(totalExp)
    document.getElementById("expenses").value = totalExp;
    document.getElementById("balance").value = document.getElementById("budget").value - document.getElementById("expenses").value;
}
