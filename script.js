let data = [];
// looping using table 
axios.get('http://localhost:3000/contacts')
    .then((response) => {
        const listContact = document.getElementById("tableData")
        data = response.data;
        console.log(data)
        
        response.data.forEach(item => {
            const { id, name, address, email, phone, company } = item;
            //div ini untuk id card
            const itemHTML = `
            <tr>
                <td>${id}</td>
                <td>${name}</td>
                <td>${address}</td>
                <td>${email}</td>
                <td>${phone}</td>
                <td>${company}</td>
            </tr>`;
            listContact.innerHTML += itemHTML;
        })
    })
    .catch((pesanError) => {
        console.log(pesanError);
    });

// looping using card 
axios.get('http://localhost:3000/contacts')
    .then((response) => {
        const listContact = document.getElementById("cardData")
        data = response.data;
        console.log(data)
        
        response.data.forEach(item => {
            const { id, name, address, email, phone, company } = item;
            //div ini untuk id card
            const itemHTML = `
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Name : ${name}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">${id}</h6>
                      <p class="card-text">Email : ${email}</p>
                      <p class="card-text">Address : ${address}</p>
                      <p class="card-text">phone : ${phone}</p>
                      <p class="card-text">company : ${company}</p>
                    </div>
                </div>
            </div>`;
            listContact.innerHTML += itemHTML;
        })
    })
    .catch((pesanError) => {
        console.log(pesanError);
    });

document.getElementById('simpanContact').addEventListener('submit', function (event) {
    // event.preventDefault();

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const company = document.getElementById('company').value;
    //untuk post
    const data = {
        name: name,
        address: address,
        email: email,
        phone: phone,
        company: company
    }
    axios.post('http://localhost:3000/contacts', data).then(res => {
        console.log(res);
        window.alert('data berhasil di tambah');
    }).catch(err => {
        console.log(err);
    });
});

const hapus = id => {
    axios.delete(`http://localhost:3000/contacts/${id}`)
}
const ganti = id => {
    const contacts = data.find(item => {
        return item.id === id
    })
    if (contacts) {
        const name = window.prompt('Name', contacts.name);
        const address = window.prompt('Address', contacts.address);
        const email = window.prompt('Email', contacts.email);
        const phone = window.prompt('Phone', contacts.phone);
        const company = window.prompt('Company', contacts.Company);
        axios.put(`http://localhost:3000/contacts/${id}`, {
            name,
            address,
            email,
            phone,
            company
        });
    }

}