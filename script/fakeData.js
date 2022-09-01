//Generate a random string of length len
function generatePwd(len = 8) {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!$&?';
    let str = '';
    let regex = new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[&$%!?]).{8,30}$")

    for (let i = 0; i < len; i++)
        str += chars.charAt(Math.floor(Math.random() * chars.length));
    return (regex.test(str)) ? str : generatePwd(len);
}

function generatePhoneNumber() {
    let pwd = "";

    for (let i = 0; i < 5; i++) 
        pwd += `${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}-`
    return pwd.slice(0, -1);
}

export function generateData(e) {
    e.preventDefault();
    fetch('https://randomuser.me/api/?nat=FR') //&password=lower,upper,number,special,8-30
    .then(resp => resp.json())
    .then((data) => {
        document.getElementById('fName').value = data.results[0].name.first;
        document.getElementById('lName').value = data.results[0].name.last;
        document.getElementById('birthday').value = data.results[0].dob.date.substring(0, 10);
        document.getElementById('email').value = data.results[0].email;
        document.getElementById('gender').value = document.getElementById('gender')[Math.floor(Math.random() * 4)].value;
        document.getElementById('streetNumber').value = data.results[0].location.street.number;
        document.getElementById('street').value = data.results[0].location.street.name;
        document.getElementById('postal').value = data.results[0].location.postcode;
        document.getElementById('city').value = data.results[0].location.city;
        document.getElementById('pwd').value = generatePwd();
        document.getElementById('contract').value = document.getElementById('contract')[Math.floor(Math.random() * 3)].value;
        document.getElementById('phone').value = data.results[0].phone;
        document.getElementById('baseSalary').value = document.getElementById('baseSalary')[Math.floor(Math.random()* 4)].value;
        document.getElementById('dContract').value = data.results[0].registered.date.substring(0, 10);
        document.getElementById('avatarURL').value = data.results[0].picture.thumbnail;
    })
    .catch(err => console.log(err));
}