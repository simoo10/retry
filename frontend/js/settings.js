
import { image_pr } from  "./rendringData.js";
let data_user ;

export function getCookie(name) {
    // console.log("Trying to get cookie:", name);  // Log the cookie name you're looking for
    const value = `; ${document.cookie}`;
    // console.log("document.cookie:", document.cookie);  // Log the entire cookies string to check its contents
    const parts = value.split(`; ${name}=`);
    // console.log("split result:", parts);  // Log the result of splitting by the cookie name
    if (parts.length === 2) {
        const cookieValue = parts.pop().split(";").shift();
        // console.log("Found cookie:", cookieValue);  // Log the value of the cookie if found
        return cookieValue;
    }
    // console.log("Cookie not found");
    return null;
}
export async function get_data(){
    const access_token = getCookie('access_token');
    try{
        const response = await fetch('http://localhost:8000/api/user_data/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json',
            },
        });
        if(response.ok){
            data_user = await response.json();
            // console.log("data_user|||||||||||||||||||||||||::::::::::::::",data_user);
            return data_user;
        }
        else{
            console.error('Failed to fetch data');
        }
    }
    catch(error){
        console.error('Error fetching data:', error);
    }
}
export async function render_img_update(){
    const data_us = await get_data();
    let img_pic;
    if(data_us.image){
        const jsonString = data_us.image.replace(/'/g, '"');
        const imageData = JSON.parse(jsonString);
        console.log(imageData);
         img_pic = imageData.versions.small;
    }
    document.getElementById('avatar').src = img_pic;
}
export async function uploadAvatar()
{
    
    // console.log("data_pr::::::::::::::",data_pr);
    document.getElementById("avatarUpload").click();
}
document.getElementById('avatarUpload').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('avatar').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

window.uploadAvatar = uploadAvatar;

// function render_data()
// {
//     if(data_user.image){
//     document.getElementById('avatar').src = data_user.image;
//     }
//     else{
//         document.getElementById('avatar').src = "images/avatar.png";
//     }
// }
// render_data();


window.uploadAvatar = uploadAvatar;

export async function send_editing_data()
{
    const access_token = getCookie('access_token');
    console.log("ghayhrblya2!!!");
    document.getElementById("profile-form").addEventListener('submit', async function (event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const fullname = document.getElementById('fullname').value;
        const avatar = document.getElementById('avatar').src;
        const password = document.getElementById('password').value;
        const data={};
        if(username){
            data.username = username;
        }
        if(email){
            data.email = email;
        }
        if(fullname){
            data.fullname = fullname;
        }
        if(avatar){
            data.avatar = avatar;
        }
        if(password){
            data.password = password
        }
        console.log(data);
        try{
            const response = await fetch('http://127.0.0.1:8000/api/',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify(data),
            });
            if(response.ok){
                const responseData = await response.json();
                document.getElementById('update-resp').textContent ='Request send successfully to '+responseData.username;
            }
            else{
                const errorData = await response.json();
                document.getElementById('update-resp').textContent = errorData.error;
            }
        }
        catch(error){
            console.error('Error:', error);
            document.getElementById('update-resp').textContent = 'Network error. Please try again.';
        }
    });
}

