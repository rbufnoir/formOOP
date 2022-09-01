import { employeeList  } from "../script.js";

//Display all the employees
export function printEmployees() {
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
    newRow.lastElementChild.children[0].addEventListener('click', () => editEmployee(employee, newRow));
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

function editEmployee(employee, employeeRow) {
    for (let i = 2; i < employeeRow.children.length - 2; i++) {
        employeeRow.children[i].toggleAttribute('contentEditable');
    }
    employeeRow.lastElementChild.children[0].innerText = (employeeRow.lastElementChild.children[0].innerText === "Edit") ? "Save": "Edit";
    employee.fName = employeeRow.children[2].innerText;
    employee.lName = employeeRow.children[3].innerText;
    employee.birthday = new Date(employeeRow.children[4].innerText);
    employee.gender = employeeRow.children[5].innerText;
    employee.email = employeeRow.children[6].innerText;
    employee.adress = employeeRow.children[7].innerText;
    employee.phoneNumber = employeeRow.children[8].innerText;
    employee.avatarAdress = `https://avatars.dicebear.com/api/initials/${employeeRow.children[2].innerText[0]}${employeeRow.children[3].innerText[0]}.svg`;
    window.name = JSON.stringify(employeeList);
}

export function searchDuplicate(s, field) {
    for (let i = 0; i < employeeList.length; i++) {
        if (s === employeeList[i][field])
            return true;
    }
    return false;
}