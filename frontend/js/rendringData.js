//Function to render data of profile in the dashboard
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
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
            // console.log("-----=+>",data1.image);
            console.log(Object.keys(data.image)); 
            // sleep(7000);
            const profile = document.getElementsByClassName('profile')[0];
            profile.innerHTML = `
           
            <div class="usr">
            <img src="${data.image['link']}" alt="profile">
                <span class="username">${data.login}</span>
                <span class="rank">Rank</span>
            </div>
                    `;
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