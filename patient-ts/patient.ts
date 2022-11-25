// Patient App - TypeScript App
interface Patient {
  patientId: number | string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  insurance: string;
  address: string;
  cNumber: number | string;
  kinNext?: string;
}

let ptData: Patient[];
ptData = <[]>[];
let isEdit: boolean = false;
let idxEdit: number = 0;
let editDom: HTMLElement = null;
let messageDom: HTMLElement = document.getElementById("message");
let modelDom: HTMLElement = document.getElementById("modelBox");
// Show Add Function
const showAdd = () => {
  modelDom.style.display = "block";
};
// Add Function
const handleAdd = (): void => {
  messageDom.innerHTML = "";
  let ptItem = {} as Patient;
  let patientIdVal = (<HTMLInputElement>document.getElementById("patientId"))
    .value;
  ptItem.patientId = parseInt(patientIdVal); //convert idString to number
  if (isNaN(ptItem.patientId)) {
    messageDom.innerHTML = "ID must be a number";
    return;
  }
  if (ptData.length > 0 && !isEdit) {
    const ptIds = ptData.map((item) => Number(item.patientId)) as any;
    if (ptIds.includes(ptItem.patientId)) {
      messageDom.innerHTML = "ID must be unique for each patient";
      return;
    }
  }
  ptItem.firstName = (<HTMLInputElement>(
    document.getElementById("firstName")
  )).value;
  if (ptItem.firstName == "") {
    messageDom.innerHTML = "Patient First Name must be entered.";
    return;
  }
  ptItem.lastName = (<HTMLInputElement>(
    document.getElementById("lastName")
  )).value;
  if (ptItem.lastName == "") {
    messageDom.innerHTML = "Patient Last Name must be entered.";
    return;
  }
  ptItem.birthDate = (<HTMLInputElement>(
    document.getElementById("birthDate")
  )).value;
  if (ptItem.birthDate == "") {
    messageDom.innerHTML = "Patient Date Of Birth must be entered.";
    return;
  }
  ptItem.gender = (<HTMLInputElement>document.getElementById("gender")).value;
  ptItem.insurance = (<HTMLInputElement>(
    document.getElementById("insurance")
  )).value;
  ptItem.address = (<HTMLInputElement>document.getElementById("address")).value;
  if (ptItem.address == "") {
    messageDom.innerHTML = "Patient Address must be entered.";
    return;
  }
  let cNumberVal = (<HTMLInputElement>document.getElementById("cNumber")).value;
  ptItem.cNumber = parseInt(cNumberVal); //convert idString to number
  if (isNaN(ptItem.cNumber)) {
    messageDom.innerHTML = "Patient Contact number must be a number";
    return;
  }
  ptItem.kinNext = (<HTMLInputElement>document.getElementById("kinNext")).value;
  if (isEdit) {
    ptData[idxEdit] = ptItem;
  } else {
    ptData.push(ptItem);
  }
  displayList(ptItem);
  isEdit = false;
  initModelData();
  modelDom.style.display = "none";
  console.log(ptData);
};
const cancelAdd = () => {
  initModelData();
  modelDom.style.display = "none";
};

// ul patientList
const patientListDom: any = document.getElementById("patientList");

// Delete Function
const handleDelete = (e: any) => {
  let delId = Number(e.path[1].id);
  for (let i = 0; i < ptData.length; i++) {
    if (ptData[i].patientId === delId) {
      ptData.splice(i, 1);
      break;
    }
  }
  console.log(ptData);
  patientListDom.removeChild(e.path[1]);
};

// Edit Function
const handleEdit = (e: any) => {
  modelDom.style.display = "block";
  isEdit = true;
  let curItem: Patient;
  let editId = Number(e.path[1].id);
  editDom = e.path[1];
  for (let i = 0; i < ptData.length; i++) {
    if (ptData[i].patientId === editId) {
      curItem = ptData[i];
      idxEdit = i;
      break;
    }
  }
  Object.keys(curItem).forEach((key) => {
    (<HTMLInputElement>document.getElementById(key)).value = "" + curItem[key];
  });
};

// Search Function
const onSearch = () => {
  const searchId = (<HTMLInputElement>document.getElementById("searchId"))
    .value;
  const listItemDom = document.getElementsByClassName("list-item");
  if (searchId) {
    for (let i in listItemDom) {
      if (listItemDom[i].id != searchId) {
        patientListDom.removeChild(listItemDom[i]);
      }
    }
  } else {
    for (let i in listItemDom) {
      if (!isNaN(Number(i))) patientListDom.removeChild(listItemDom[i]);
    }
    ptData.forEach((item) => displayList(item));
  }
};

// Display list Function
const displayList = (ptItem: Patient): void => {
  let liDom = document.createElement("li");
  liDom.setAttribute("id", ptItem.patientId.toString());
  liDom.setAttribute("class", "list-item");
  let str = "";
  for (const [key, value] of (<any>Object).entries(ptItem)) {
    str += "<span>" + value + "</span>\n\r";
  }
  str +=
    '<button type="button" onClick="handleDelete(event)">Delete</button>\n\r';
  str += '<button type="button" onClick="handleEdit(event)">Edit</button>';
  liDom.innerHTML = str;
  if (isEdit) {
    patientListDom.replaceChild(liDom, editDom);
  } else {
    patientListDom.appendChild(liDom);
  }
};

// Initial medol Data
const initModelData = () => {
  const initItem: Patient = {
    patientId: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "Female",
    insurance: "Medicare",
    address: "",
    cNumber: "",
    kinNext: "",
  };
  (<any>Object).entries(initItem).forEach(([key, value]) => {
    (<HTMLInputElement>document.getElementById(key)).value = "" + value;
  });
  messageDom.innerHTML = "";
};
