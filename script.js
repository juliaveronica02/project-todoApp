let data =[];
axios.get('http://localhost:3000/contacts')
.then((response)=>{
    console.log(response)
    const listContact = document.querySelector("#contacts>ol")
    data = response.data;

    response.data.forEach(item =>{
        const {id, name, address, email, phone, company} = item;
        const itemHTML = `<li>
        <img src=""
        Id: ${id}
        <br>
        Name: ${name}
        <br>
        Address: ${address}
        <br>
        Email: ${email}
        <br>
        Phone: ${phone}
        <br>
        Company: ${company}
        <br>
        <button onclick ="ganti(${id})">Change</button>
        <button onclick ="hapus(${id})">Delete</button>
        </li>
        `;
        listContact.innerHTML +=itemHTML;
    })
})
.catch((pesanError)=>{
    console.log(pesanError);
});

document.getElementById('simpanContact').addEventListener('submit', function(event){
    // event.preventDefault();

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const company = document.getElementById('company').value;
    //untuk post
    const data = {
        name : name,
        address : address,
        email : email, 
        phone : phone,
        company : company
    }
    axios.post('http://localhost:3000/contacts',data).then( res => {
        console.log(res);
        window.alert('data berhasil di tambah');
    }).catch( err => {
        console.log(err);
    });
});

const hapus = id=>{
    axios.delete(`http://localhost:3000/contacts/${id}`)
}
const ganti = id =>{
    const contacts = data.find(item=>{
        return item.id === id
    })
    if (contacts){
        const name = window.prompt('Name',contacts.name);
        const address = window.prompt('Address',contacts.address);
        const email = window.prompt('Email',contacts.email);
        const phone = window.prompt('Phone',contacts.phone);
        const company = window.prompt('Company',contacts.Company);
        axios.put(`http://localhost:3000/contacts/${id}`,{
            name,
            address,
            email,
            phone,
            company
        });
    }
    
}