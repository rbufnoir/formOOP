let employeeList = [];

//Hash method
String.prototype.hashCode = function() {
    let hash = 0
    let chr;
    if (this.length === 0)
        return hash;
    for (i = 0; i < this.length; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

class Employee {
    constructor(fName, lName, birthday, gender, email, pwd, adress, phoneNumber, contract, contractStart, baseSalary, avatarAdress) {
        this.fName = fName;
        this.lName = lName;
        this.birthday = new Date(birthday);
        this.age = Math.floor((Date.now() - (new Date(birthday))) / (1000 * 60 * 60 * 24 * 365.25));
        this.gender = gender;
        this.email = email;
        this.pwd = (isNaN(pwd)) ? pwd.hashCode() : pwd;
        this.adress = adress;
        this.phoneNumber = phoneNumber;
        this.contract = contract;
        this.contractStart = new Date(contractStart);
        this.baseSalary = baseSalary;
        this.avatarAdress = (avatarAdress === "") ? `https://avatars.dicebear.com/api/initials/${fName[0]}${lName[0]}.svg`: avatarAdress;
    }

    currentSalary() {
        let currentYear = new Date().getFullYear();
        let startYear = this.contractStart.getFullYear();
        let diff = currentYear - startYear;
        return (this.baseSalary.slice(1) * Math.pow(1.10, diff));
    }

    username() {
        return `${this.fName[0].toLowerCase()}${this.lName.toLowerCase()}${this.birthday.getFullYear().toString().slice(2)}`;
    }
}

window.onload = () => {
    document.getElementById('birthday').value = new Date().toISOString().substring(0,10);
    document.getElementById('dContract').value = new Date().toISOString().substring(0,10);
}

//Autorising only number to be print
document.getElementById('phone').addEventListener('keydown', (e) => {
    if (document.getElementById('phone').value.length <= 10) {
            document.getElementById('phone').value = (!isNaN(parseInt(e.key))) ? document.getElementById('phone').value : document.getElementById('phone').value.slice(0, -1);
    }
    else {
        document.getElementById('phone').value = document.getElementById('phone').value.slice(0, -1);
    }
});

//Generate a random string of length l
function randomString(l = 8) {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let str = '';

    for (let i = 0; i < l; i++)
        str += chars.charAt(Math.floor(Math.random() * chars.length));
    return str;
}

function searchDuplicate(s, field) {
    for (let i = 0; i < employeeList.length; i++) {
        if (s === employeeList[i][field])
            return true;
    }
    return false;
}


//Display all the employees
function printEmployees() {
    let newTable = document.createElement('table');
    newTable.setAttribute('id', 'employeesList')
    newTable.setAttribute('class', 'table table-striped table-hover')
    newTable.innerHTML = `
    <thead>
        <tr>
            <th>#</th>
            <th>Avatar</th>
            <th>Username</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Fired?</th>
        </tr>
    </thead>`;
    let newTbody = document.createElement('tbody');
    newTable.appendChild(newTbody);
    for (let i = 0; i < employeeList.length; i++) {
        let newRow = document.createElement('tr');
        newRow.innerHTML = `<th>${i + 1}</th>
                            <td><img src="${employeeList[i].avatarAdress}" width="32" alt="avatar de ${employeeList[i].username()}"></td>
                            <td>${employeeList[i].username()}</td>
                            <td>${employeeList[i].fName}</td>
                            <td>${employeeList[i].lName}</td>
                            <td class="link-danger">Virer!</td>`;
        newTbody.appendChild(newRow);
        //Event listener: alert and remove
        newRow.addEventListener('click', (e) => {
            if (e.target === newRow.lastChild) {
                employeeList.splice((newRow.firstChild.innerText - 1), 1);
                window.name = JSON.stringify(employeeList);
                newRow.remove();
            }
            else if (e.target != newRow.lastChild) {
                printEmployee(employeeList[i]);
            }
        });
    }
    if (document.getElementById('employeesList') != null)
        document.body.replaceChild(newTable, document.getElementById('employeesList'))
    else
        document.body.appendChild(newTable);
}

//Display the informations of a single employee
function printEmployee(employee) {
    document.getElementById('form').style.display = "none";
    document.getElementById('searchBar').style.display = "none";
    document.getElementById('employeesList').remove();

    let newTable = document.createElement('table');
    newTable.setAttribute('id', 'employeesList')
    newTable.setAttribute('class', 'table')
    newTable.innerHTML = `
    <thead>
        <tr>
            <th>Avatar</th>
            <th>Username</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Birthday</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Adress</th>
            <th>Phone</th>
            <th>Contract</th>
            <th>Salary</th>
        </tr>
    </thead>`;
    let newTbody = document.createElement('tbody');
    newTable.appendChild(newTbody);
    let newButton = document.createElement('button');
    newButton.innerText = "Retour";
    newTable.setAttribute('id', 'employee')
    let newRow = document.createElement('tr');
    newRow.innerHTML = `<td><img src="${employee.avatarAdress}" alt="avatar" width="32"></td>
                        <td>${employee.username()}</td><td>${employee.fName}</td>
                        <td>${employee.lName}</td>
                        <td>${employee.birthday.toLocaleDateString()}</td>
                        <td>${employee.gender[0]}</td>
                        <td>${employee.email}</td>
                        <td>${employee.adress}</td>
                        <td>${employee.phoneNumber}</td>
                        <td>${employee.contract} since ${employee.contractStart.toLocaleDateString()}</td>
                        <td>$${employee.currentSalary()}</td>
                        <td><button>Edit</button></td>
                        `;
    newTbody.appendChild(newRow);
    newRow.lastElementChild.children[0].addEventListener('click', () => {
        for (i = 2; i < newRow.children.length - 2; i++) {
            newRow.children[i].toggleAttribute('contentEditable');
        }
        newRow.lastElementChild.children[0].innerText = (newRow.lastElementChild.children[0].innerText === "Edit") ? "Save": "Edit";
        employee.fName = newRow.children[2].innerText;
        employee.lName = newRow.children[3].innerText;
        employee.birthday = new Date(newRow.children[4].innerText);
        employee.gender = newRow.children[5].innerText;
        employee.email = newRow.children[6].innerText;
        employee.adress = newRow.children[7].innerText;
        employee.phoneNumber = newRow.children[8].innerText;
        employee.avatarAdress = `https://avatars.dicebear.com/api/initials/${newRow.children[2].innerText[0]}${newRow.children[3].innerText[0]}.svg`;
        window.name = JSON.stringify(employeeList);
    });
    newButton.addEventListener('click', () => {
        document.getElementById('form').style.display = "";
        document.getElementById('searchBar').style.display = "";
        newTable.remove();
        newButton.remove();
        printEmployees();
    });
    document.body.appendChild(newTable);
    document.body.appendChild(newButton)
}


//Generate fake data on click
document.getElementById('fakeData').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('fName').value = randomString();
    document.getElementById('lName').value = randomString();
    document.getElementById('birthday').value = `${Math.floor(Math.random()*100 + 1930)}-${Math.floor(Math.random() * 3 + 10)}-${Math.floor(Math.random() * 10 + 10)}`;
    document.getElementById('gender').value = document.getElementById('gender')[Math.floor(Math.random() * 4)].value;
    document.getElementById('email').value = `${randomString()}@${randomString(4)}.${randomString(2)}`;
    document.getElementById('pwd').value = randomString();
    document.getElementById('streetNumber').value = Math.floor(Math.random() * 99 + 1);
    document.getElementById('street').value = `rue ${randomString()}`;
    document.getElementById('postal').value = Math.floor(Math.random() * 10000);
    document.getElementById('city').value = randomString();
    document.getElementById('phone').value = "0628820222";
    document.getElementById('contract').value = document.getElementById('contract')[Math.floor(Math.random() * 3)].value;
    document.getElementById('dContract').value = `${Math.floor(Math.random()*100 + 1930)}-${Math.floor(Math.random() * 3 + 10)}-${Math.floor(Math.random() * 10 + 10)}`;
    document.getElementById('baseSalary').value = document.getElementById('baseSalary')[Math.floor(Math.random()* 4)].value;
    document.getElementById('avatarURL').value = "";
});

//Adding an employee to employeeList[]
document.getElementById('submit').addEventListener('click', (e) => {
    // e.preventDefault();
    if (document.getElementById('form').checkValidity()) {
        if (searchDuplicate(document.getElementById('fName').value, "fName") && searchDuplicate(document.getElementById('lName').value, "lName"))
            alert("Erreur: l'utilisateur existe déjà");
        else if (searchDuplicate(document.getElementById('email').value, "email"))
            alert("Erreur: l'adresse mail est déjà utilisée");
        else if (searchDuplicate(document.getElementById('phone').value, "phone"))
            alert("Erreur: le numéro de téléphone est déjà utilisé");
        else {
            let employee = new Employee(document.getElementById('fName').value,
                                        document.getElementById('lName').value,
                                        document.getElementById('birthday').value,
                                        document.getElementById('gender').value,
                                        document.getElementById('email').value,
                                        document.getElementById('pwd').value,
                                        document.getElementById('streetNumber').value + " " + document.getElementById('street').value + " " + document.getElementById('postal').value + " " + document.getElementById('city').value,
                                        document.getElementById('phone').value,
                                        document.getElementById('contract').value,
                                        document.getElementById('dContract').value,
                                        document.getElementById('baseSalary').value,
                                        document.getElementById('avatarURL').value
            );
            document.getElementById('fName').value = "";
            document.getElementById('lName').value = "";
            document.getElementById('birthday').value = "";
            document.getElementById('email').value = "";
            document.getElementById('email').value = "";
            document.getElementById('streetNumber').value = "";
            document.getElementById('street').value = "";
            document.getElementById('postal').value = "";
            document.getElementById('city').value = "";
            document.getElementById('phone').value = "";
            document.getElementById('avatarURL').value = "";
            employeeList.push(employee);
            window.name = JSON.stringify(employeeList);
        }
    }
});

//Displaying employeeList[] in a table
document.getElementById('print').addEventListener('click', (e) => {
    e.preventDefault();
    //Checking if there is some data store in window.name
    if(employeeList.length === 0 && window.name != "") {
        let windowName = JSON.parse(window.name);
        for (i = 0; i < windowName.length; i++)
            employeeList.push(new Employee(windowName[i].fName,
                                            windowName[i].lName,
                                            windowName[i].birthday,
                                            windowName[i].gender,
                                            windowName[i].email,
                                            windowName[i].pwd,
                                            windowName[i].adress,
                                            windowName[i].phoneNumber,
                                            windowName[i].contract,
                                            windowName[i].contractStart,
                                            windowName[i].baseSalary,
                                            windowName[i].avatarAdress
            ));
    }
    printEmployees();
});


//Search bar
document.getElementById('mySearch').addEventListener('keyup', () => {
    let listEmployees = document.getElementById('employeesList').children
    for (i = 0; i < listEmployees.length; i++) {
        if (listEmployees[i].innerText.includes(document.getElementById('mySearch').value))
            listEmployees[i].style.display = "";
        else
            listEmployees[i].style.display = "none";
    }
});


// var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
// var ARGUMENT_NAMES = /([^\s,]+)/g;

// function getParamNames(func) {
//     var fnStr = func.toString().replace(STRIP_COMMENTS, '');
//     var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
//     if(result === null)
//         result = [];
//     return result;
// }

// var variables = ""
// for (var name in this)
//     variables += name + "\n";

// console.log(variables)