var ptData;
ptData = [];
var isEdit = false;
var idxEdit = 0;
var editDom = null;
var messageDom = document.getElementById("message");
var modelDom = document.getElementById("modelBox");
// Show Add Function
var showAdd = function () {
    modelDom.style.display = "block";
};
// Add Function
var handleAdd = function () {
    messageDom.innerHTML = "";
    var ptItem = {};
    var patientIdVal = document.getElementById("patientId")
        .value;
    ptItem.patientId = parseInt(patientIdVal); //convert idString to number
    if (isNaN(ptItem.patientId)) {
        messageDom.innerHTML = "ID must be a number";
        return;
    }
    if (ptData.length > 0 && !isEdit) {
        var ptIds = ptData.map(function (item) { return Number(item.patientId); });
        if (ptIds.includes(ptItem.patientId)) {
            messageDom.innerHTML = "ID must be unique for each patient";
            return;
        }
    }
    ptItem.firstName = (document.getElementById("firstName")).value;
    if (ptItem.firstName == "") {
        messageDom.innerHTML = "Patient First Name must be entered.";
        return;
    }
    ptItem.lastName = (document.getElementById("lastName")).value;
    if (ptItem.lastName == "") {
        messageDom.innerHTML = "Patient Last Name must be entered.";
        return;
    }
    ptItem.birthDate = (document.getElementById("birthDate")).value;
    if (ptItem.birthDate == "") {
        messageDom.innerHTML = "Patient Date Of Birth must be entered.";
        return;
    }
    ptItem.gender = document.getElementById("gender").value;
    ptItem.insurance = (document.getElementById("insurance")).value;
    ptItem.address = document.getElementById("address").value;
    if (ptItem.address == "") {
        messageDom.innerHTML = "Patient Address must be entered.";
        return;
    }
    var cNumberVal = document.getElementById("cNumber").value;
    ptItem.cNumber = parseInt(cNumberVal); //convert idString to number
    if (isNaN(ptItem.cNumber)) {
        messageDom.innerHTML = "Patient Contact number must be a number";
        return;
    }
    ptItem.kinNext = document.getElementById("kinNext").value;
    if (isEdit) {
        ptData[idxEdit] = ptItem;
    }
    else {
        ptData.push(ptItem);
    }
    displayList(ptItem);
    isEdit = false;
    initModelData();
    modelDom.style.display = "none";
    console.log(ptData);
};
var cancelAdd = function () {
    initModelData();
    modelDom.style.display = "none";
};
// ul patientList
var patientListDom = document.getElementById("patientList");
// Delete Function
var handleDelete = function (e) {
    var delId = Number(e.path[1].id);
    for (var i = 0; i < ptData.length; i++) {
        if (ptData[i].patientId === delId) {
            ptData.splice(i, 1);
            break;
        }
    }
    console.log(ptData);
    patientListDom.removeChild(e.path[1]);
};
// Edit Function
var handleEdit = function (e) {
    console.log(e);
    console.log(e.path[1].id);
    modelDom.style.display = "block";
    isEdit = true;
    var curItem;
    var editId = Number(e.path[1].id);
    editDom = e.path[1];
    for (var i = 0; i < ptData.length; i++) {
        if (ptData[i].patientId === editId) {
            curItem = ptData[i];
            idxEdit = i;
            break;
        }
    }
    Object.keys(curItem).forEach(function (key) {
        document.getElementById(key).value = "" + curItem[key];
    });
};
// Search Function
var onSearch = function () {
    var searchId = document.getElementById("searchId")
        .value;
    var listItemDom = document.getElementsByClassName("list-item");
    if (searchId) {
        for (var i in listItemDom) {
            if (listItemDom[i].id != searchId) {
                patientListDom.removeChild(listItemDom[i]);
            }
        }
    }
    else {
        for (var i in listItemDom) {
            if (!isNaN(Number(i)))
                patientListDom.removeChild(listItemDom[i]);
        }
        ptData.forEach(function (item) { return displayList(item); });
    }
};
// Display list Function
var displayList = function (ptItem) {
    var liDom = document.createElement("li");
    liDom.setAttribute("id", ptItem.patientId.toString());
    liDom.setAttribute("class", "list-item");
    var str = "";
    for (var _i = 0, _a = Object.entries(ptItem); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        str += "<span>" + value + "</span>\n\r";
    }
    str +=
        '<button type="button" onClick="handleDelete(event)">Delete</button>\n\r';
    str += '<button type="button" onClick="handleEdit(event)">Edit</button>';
    liDom.innerHTML = str;
    if (isEdit) {
        patientListDom.replaceChild(liDom, editDom);
    }
    else {
        patientListDom.appendChild(liDom);
    }
};
// Initial medol Data
var initModelData = function () {
    var initItem = {
        patientId: "",
        firstName: "",
        lastName: "",
        birthDate: "",
        gender: "Female",
        insurance: "Medicare",
        address: "",
        cNumber: "",
        kinNext: ""
    };
    Object.entries(initItem).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        document.getElementById(key).value = "" + value;
    });
    messageDom.innerHTML = "";
};
