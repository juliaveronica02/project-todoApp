let data = []
axios.get('http://localhost:3000/contacts')
.then((response)=>{
    console.log(response)
    const listContact = document.getElementById("contacts")
    data = response.data;
    
    //cara 1.
//     response.data.forEach(item =>{
//         const {id, name, address, email, phone, company} = item;
//         const itemHTML = `
//         <li>
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
//         </li>`;
//         listContact.innerHTML +=itemHTML;
// })

    //cara 2.
    response.data.forEach(item => {
        const {
            id,
            name,
            address,
            email,
            phone,
            company
        } = item;
        //div ini untuk id card
        const itemHTML = `
        <div class="col-md-4">
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                <img class="circularsquare" src="./4.jpg" alt=""
                    style="width: 100px; height: 100px;">
                <div class="ccenter">
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
                </div>
            </div>
   </div>
   </div>
    `;
        listContact.innerHTML += itemHTML;
    })
    .catch((pesanError)=>{
        console.log(pesanError);
    });
})

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