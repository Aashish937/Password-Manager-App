const hidepassword = (password) => {
    let pass ="";
    for(let i=0; i<password.length; i++){
        pass += "*";
    }
    return pass;
}

const copyContent = (content) => {
    navigator.clipboard.writeText(content).then( () =>{
       alert("Copied!!!"); 
    }).catch( err => {
        alert("Coping failed!!!");
    })
}

const  deletePasswordData = (index) =>{
    let passwordDetails = localStorage.getItem("passwordDetails");
    let passwordData = JSON.parse(passwordDetails);
    passwordData.splice(index,1);
    localStorage.setItem("passwordDetails", JSON.stringify(passwordData));
    alert("Password details are Deleted.");
    SavedPasswordDetails();
}

const SavedPasswordDetails = () =>{
    let table = document.querySelector("table");
    let passwordDetails = localStorage.getItem("passwordDetails");
    if(passwordDetails == null){
        table.innerHTML = "No Details Available";
    }else{

        table.innerHTML = `<tr>
        <th style="background-color:lightgray">Website</th>
        <th style="background-color:lightgray">User Name</th>
        <th style="background-color:lightgray">Password</th>
        <th style="background-color:lightgray">Action</th>
    </tr>`;

        let passwordData = JSON.parse(passwordDetails);
        let html = "";
        let color = "gray";
        for(let i=0; i<passwordData.length; i++){
            row=passwordData[i];
            if(i % 2 == 0){
                color = "white";
            }
            else{
                color = "whitesmoke";
            }
            html += 
                `<tr>
                    <td style = "background-color: ${color};">${row.website}<i onClick ="copyContent('${row.website}')" class="fa-regular fa-clipboard copy"></i></td>
                    <td style = "background-color: ${color};">${row.username}<i onClick ="copyContent('${row.username}')" class="fa-regular fa-clipboard copy"></i></td>
                    <td style = "background-color: ${color};">${hidepassword(row.password)}<i onClick ="copyContent('${row.password}')" class="fa-regular fa-clipboard copy"></i></td>
                    <td style = "background-color: ${color};"><button class="delbtn" onClick="deletePasswordData('${i}')">Delete</button></td>
                </tr>`;
        }
        table.innerHTML += html;
    }
}

SavedPasswordDetails();

document.querySelector(".btn").addEventListener("click", (event) => {
    event.preventDefault();

    let passwordDetails = localStorage.getItem("passwordDetails");
    if(passwordDetails == null){
        let passwordJSON = [];
        passwordJSON.push({
            website: website.value,
            username: username.value,
            password: password.value
        });
        localStorage.setItem("passwordDetails", JSON.stringify(passwordJSON));
        alert("Password details are Saved.");
    }
    else{
        let passwordJSON = JSON.parse(passwordDetails);
        passwordJSON.push({
            website: website.value,
            username: username.value,
            password: password.value
        });
        localStorage.setItem("passwordDetails", JSON.stringify(passwordJSON));
        alert("Password details are Saved.");

    }

    website.value = "";
    username.value = "";
    password.value = "";

    SavedPasswordDetails();
});