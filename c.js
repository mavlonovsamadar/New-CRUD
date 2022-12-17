// 1- button chaqirish
// 2- inp value qiymatini olish
// 3- buttonga click bolganda value chaqirish

const btn = document.querySelector('.btn');
let Url = 'http://localhost:3000/data'
btn.onclick = (e) => {
    e.preventDefault()
let inp = document.querySelector('input').value
   console.log(inp); 
   postData(inp) 
}

const postData = (value)=>{
if(value !="" && !value.includes(" ")){
    fetch(Url, {
        method: "POST",
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({name: value})
    }).then(res => res.status === 201 ? alert("Added") : null)
    .catch(err => alert(err))
}
else{alert("Please fill")}

}


const getData = () => {
    fetch(Url)
    .then(res => res.json())
    .then(data=>{
        data.forEach(elem => {
            let div = document.querySelector('.table');
            div.innerHTML +=`
            <li> <i class="fa-sharp fa-solid fa-pen-to-square" data-id-edit=${elem.id}></i> 
            <i class="fa-solid fa-trash" data-id=${elem.id}></i> ${elem.name}</li>
           `
           div.onclick = (e) => {
            let id = e.target.getAttribute("data-id-edit")

            if(e.target.classList.contains("fa-trash")){
                fetch(`${Url}/${elem.id}`, {
                method: 'DELETE'
            }).then(res=>res.status === 200 ? alert("Delete done"): null)}
        

        else if(e.target.classList.contains("fa-sharp")){
            fetch(`${Url}/${id}`)
            .then(res=>res.json())
            .then(data=>{
                let inp = document.querySelector('input')
                inp.value=data.name
                let btnsecond = document.querySelector('.btn-secondary');

                btnsecond.onclick = (e) =>{
                    e.preventDefault()
                    fetch(`${Url}/${id}`, {
                        method: "PUT",
                        headers:{'Content-Type': 'application/json'},
                        body: JSON.stringify({name: inp.value})
                    }).then(res => res.status === 200 ? alert("Edit done") : null)
                }   
            })

            document.querySelector('.btn-primary').style.display="none"
            document.querySelector('.btn-secondary').style.display="block"
        
        }}
        
        });
    })
}

getData()
