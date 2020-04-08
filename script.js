let data = []
axios.get('http://localhost:3000/contacts')
.then((response)=>{
    console.log(response)
    const listContact = document.getElementById("contacts")
    data = response.data;
    
    // cara 1 menampilkan data biasa.
//     response.data.forEach(item =>{
//         const {id, name, address, email, phone, company} = item;
//         const itemHTML = `
//         Id: ${id}
//         <br>
//         Name: ${name}
//         <br>
//         Address: ${address}
//         <br>
//         Email: ${email}
//         <br>
//         Phone: ${phone}
//         <br>
//         Company: ${company}
//         <br>
//         <button onclick ="ganti(${id})">Change</button>
//         <button onclick ="hapus(${id})">Delete</button>
//         `;
//         listContact.innerHTML +=itemHTML;
// })
// })
// .catch((pesanError) => {
//     console.error(pesanError);
// })

    //cara 2 menampilkan data pakai card.
//     response.data.forEach(item => {
//         const {
//             id,
//             name,
//             address,
//             email,
//             phone,
//             company
//         } = item;
//         //div ini untuk id card
//         const itemHTML = `
//         <div class="col-md-4">
//             <div class="card" style="width: 18rem;">
//                 <div class="card-body">
//                 <img class="circularsquare" src="./4.jpg" alt=""
//                     style="width: 100px; height: 100px;">
//                 <div class="ccenter">
//                 Id: ${id}
//                 <br>
//                 Name: ${name}
//                 <br>
//                 Address: ${address}
//                 <br>
//                 Email: ${email}
//                 <br>
//                 Phone: ${phone}
//                 <br>
//                 Company: ${company}
//                 <br>
//                 <button onclick ="ganti(${id})">Change</button>
//                 <button onclick ="hapus(${id})">Delete</button>
//                 </div>
//             </div>
//    </div>
//    </div>
//     `;
//         listContact.innerHTML += itemHTML;
//     })
// })
//         .catch((pesanError)=>{
//             console.log(pesanError);
// })

//cara 3 card.
response.data.forEach(item => {
    const { id, name, address, email, phone, company } = item;
const itemHTML = `
<div class="card">
        <div class="card-body">
        <h6 class="card-subtitle mb-2 text-muted">${id}</h6>
          <h5 class="card-title">Name : ${name}</h5>
          <p class="card-text">Email : ${email}</p>
          <p class="card-text">Address : ${address}</p>
          <p class="card-text">phone : ${phone}</p>
          <p class="card-text">company : ${company}</p>
          <button onclick="ganti(${id})"class="btn btn-outline-primary"><i class="fa fa-pencil-square">&nbsp;&nbsp;Change</button></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button onclick="hapus(${id})" class="btn btn-outline-danger"><i class="fa fa-ban">&nbsp;&nbsp;Delete</button></i>&nbsp;&nbsp;
        </div>
    </div>
</div>`;
listContact.innerHTML += itemHTML;
})
})
.catch((pesanError) => {
console.log(pesanError);
});

//cara 3 menampilkan data menggunakan table.
axios.get('http://localhost:3000/contacts')
.then((response) => {
    const listContact = document.getElementById("tableData")
    data = response.data;
    console.log(data)
    
    response.data.forEach(item => {
        const { id, name, address, email, phone, company } = item;
        //input ke table
        const itemHTML = `
        <tr>
            <td>${id}</td>
            <td>${name}</td>
            <td>${address}</td>
            <td>${email}</td>
            <td>${phone}</td>
            <td>${company}</td>
            <td>
            <button onclick="ganti(${id})"class="btn btn-outline-primary"><i class="fa fa-pencil-square">&nbsp;&nbsp;Change</button></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp
            <button onclick="hapus(${id})" class="btn btn-outline-danger"><i class="fa fa-ban">&nbsp;&nbsp;Delete</button></i>
        </tr>`;
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