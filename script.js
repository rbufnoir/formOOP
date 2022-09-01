import { Employee } from './script/employee.js';
import { printEmployees, searchDuplicate } from './script/employeeDisplay.js';
import { generateData } from './script/fakeData.js';

export let employeeList = [];

//Hash method
String.prototype.hashCode = function() {
    let hash = 0
    let chr;
    if (this.length === 0)
        return hash;
    for (let i = 0; i < this.length; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

window.onload = () => {
    document.getElementById('birthday').value = new Date().toISOString().substring(0,10);
    document.getElementById('dContract').value = new Date().toISOString().substring(0,10);
}

//Autorising only number to be print
document.getElementById('phone').addEventListener('keydown', (e) => {
    let phone = document.getElementById('phone');
    let regex = new RegExp("^[a-zA-Z&é()$%!?]$");
    if (regex.test(e.key))
        e.preventDefault();
    if (phone.value.length >= 14 && !isNaN(e.key))
        e.preventDefault(); 
});

document.getElementById('phone').addEventListener('keyup', (e) => {
    let phone = document.getElementById('phone');
    if ((phone.value.length === 2 || phone.value.length === 5 || phone.value.length === 8 || phone.value.length === 11) && e.key != "Backspace")
        phone.value += "-";
});

document.getElementById('fakeData').addEventListener('click', (e) => generateData(e));

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
        for (let i = 0; i < windowName.length; i++)
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