//Function to render data of profile in the dashboard
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  }
function render_profile(data){
    const jsonString = data.image.replace(/'/g, '"');
    const imageData = JSON.parse(jsonString);
    console.log(imageData);
    const profile_img = imageData.link;
    const profile = document.getElementsByClassName('profile')[0];
    profile.innerHTML = `
            <div class="usr">
            <img src="${profile_img}" alt="profile" class="profile-img">
                <div class=user-info>
                    <span class="username">${data.login}</span>
                    <span class="rank">Rank</span>
                </div>
            </div>
                    `;
    const user_info = document.getElementsByClassName('user-info')[0];
    const profile_img_style = document.getElementsByClassName('profile-img')[0];
    const username_style = document.getElementsByClassName('username')[0];
    const usr_style = document.getElementsByClassName('usr')[0];
    profile.style.display = 'flex';
    profile.style.alignItems = 'center';
    profile.style.marginBottom = '20px';
    usr_style.style.display = 'flex';
    usr_style.style.alignItems = 'flex-start';
    usr_style.style.flexDirection = 'row';
    profile_img_style.style.borderRadius = '50%';
    profile_img_style.style.width = '100px';
    profile_img_style.style.height = '100px';
    profile_img_style.style.marginRight = '15px';
    user_info.style.display = 'flex';
    user_info.style.flexDirection = 'column';
    user_info.style.marginTop = '20px';
    username_style.style.alignItems = 'flex-start';

    

}
export async function fetching_data(){
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
            const data = await response.json();
            render_profile(data);
            return;
        }
        else{
            console.error('Failed to fetch data');
        }
    }
    catch(error){
        console.error('Error fetching data:', error);
    }
    // return data;
}