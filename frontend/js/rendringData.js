
import { stats_data, username } from "./main.js";
//Function to render data of profile in the dashboard
export let image_pr="../images/avatar.png";

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
import { matchs_stats } from "./main.js";
function render_profile(data){
    console.log(data);
    // const jsonString = data.image.replace(/'/g, '"');
    // const imageData = JSON.parse(jsonString);
    // console.log(imageData);
    let profile_img;
    // console.log('==>?,',data);
    if(data.image){
        // console.log('image:------>');
        const jsonString = data.image.replace(/'/g, '"');
        const imageData = JSON.parse(jsonString);
        console.log(imageData);
         profile_img = imageData.versions.small;
        //  console.log('profile_img++++++++++++++=:',profile_img);
        //  image_pr = profile_img;
         
        // profile_img = data.image;
    }
    else{
        profile_img = "images/avatar.png";
        data.image = profile_img;
    }
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
    profile_img_style.border = '5px solid rgb(0, 0, 0)';
    user_info.style.display = 'flex';
    user_info.style.flexDirection = 'column';
    user_info.style.marginTop = '20px';
    username_style.style.alignItems = 'flex-start';
    return (profile_img);
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
            console.log('!!!',render_profile(data));
            image_pr = render_profile(data);
            // console.log('image_pr:::::::::::::::::::::::::::::::;;;;',image_pr);
            return(image_pr);
        }
        else{
            console.error('Failed to fetch data');
        }
    }
    catch(error){
        console.error('Error fetching data:', error);
    }
}

export async function friendsRequest() {
    const access_token = getCookie('access_token');
    document.getElementById('request-form').addEventListener('submit', async function (event) {
        // sleep(7000);
        event.preventDefault();
    
        const username = document.getElementById('username').value;
        console.log('------->',username);
        if(!username){
            document.getElementById('request-resp').textContent ='Please enter a username';
            document.getElementById('request-resp').style.color="#f4000c";
            return;
        }    
        try {
            const response = await fetch('http://127.0.0.1:8000/api/', {//kteb url dyal endpoint dyalk
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`,
                },
                body: JSON.stringify({username}),
            });
    
            if (response.ok) {
                const responseData = await response.json();
                document.getElementById('request-resp').textContent ='Request send successfully to '+responseData.username;
            } else {
                const errorData = await response.json();
                document.getElementById('request-resp').textContent = errorData.error;
            }
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('request-resp').textContent = 'Network error. Please try again.';
        }
    });
}
export function displayWindow(window){
    const buttons = document.querySelectorAll('.friends-hover');
    buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        });
    });


    const windows = document.getElementsByClassName('friends-windows');
    if(!window)
    {
        window = 'online-list';
    }
    const my_window = document.getElementById(window);  
    // console.log("---==",z);
    for(let i=0; i<windows.length; i++){
        console.log('d5elt ldisplay--!');
        windows[i].style.display = 'none';
    }
    console.log(window);
    my_window.style.display = 'block';
    if(window ==='add-friends'){
        document.getElementsByClassName('lists')[0].style.backgroundColor = 'transparent';
        document.getElementById('search-frds').style.display = 'none';
    }
    else{
        console.log('here1');
        document.getElementById('search-frds').style.display = 'block';
        document.getElementsByClassName('lists')[0].style.backgroundColor = '#141622';
    }
    // if(window==='add-friends')
    // {
    //     // friendsRequest();
    // }
}
window.displayWindow = displayWindow;

let history_matchs=[
    {
        "id": 1,
        "user": 1,
        "opponent": 2,
        "result": "win",
        "date": "2021-09-19",
        "user_goals": 5,
        "opponent_goals": 9,
    },
    {
        "id": 2,
        "user": 1,
        "opponent": 3,
        "result": "lose",
        "date": "2021-09-19",
        "user_goals": 5,
        "opponent_goals": 9,

    },
    {
        "id": 3,
        "user": 1,
        "opponent": 4,
        "result": "win",
        "date": "2021-09-19",
        "user_goals": 10,
        "opponent_goals": 5,
    },
    {
        "id": 4,
        "user": 1,
        "opponent": 5,
        "result": "win",
        "date": "2021-09-19",
        "user_goals": 10,
        "opponent_goals": 4,
    },
    {
        "id": 5,
        "user": 1,
        "opponent": 6,
        "result": "win",
        "date": "2021-09-19",
        "user_goals": 10,
        "opponent_goals": 3,
    },
    {
        "id": 6,
        "user": 1,
        "opponent": 7,
        "result": "lose",
        "date": "2021-09-19",
        "user_goals": 5,
        "opponent_goals": 9,
    },
    {
        "id": 7,
        "user": 1,
        "opponent": 8,
        "result": "win",
        "date": "2021-09-19",
        "user_goals": 10,
        "opponent_goals": 3,
    },

];


export function display_match_history()
{
    // const stats = matchs_stats();
    console.log('image_pr""""""""""""""""""":',image_pr);

    console.log('stats+++++++++++++++=:',stats_data);
    let result;
    let user = username;
    const history = document.getElementById("history-body"); 
    history.innerHTML = '';
    for(let i=0; i<stats_data.stats.total_games; i++)
    {
        let opponent = stats_data.recent_matches[i].opponent;
        if(stats_data.recent_matches[i].won===true){
            result = 'Win';
        }
        else{
            result = 'Lose';
        }
        // let oponent_result = history_matchs[i].result;
        let oponent_result;
        let date = stats_data.recent_matches[i].date;
        let user_goals = stats_data.recent_matches[i].player_score;
        let opponent_goals = stats_data.recent_matches[i].opponent_score;
        if(stats_data.recent_matches[i].won === true){
            // result = 'Win';
            oponent_result = 'lose';
        }
        else{
            oponent_result = 'win';
        }
        history.innerHTML += `
        <tr class="tr-style">
            <td>${user}</td>
            <td>${result}</td>
            <td>${user_goals}</td>
            <td rowspan="2" class="date-style">${date}</td>
        </tr>
        <tr class="tr-style">
            <td>${opponent}</td>
            <td>${oponent_result}</td>
            <td>${opponent_goals}</td>
        </tr>
        `;
        
    }
        const td = document.getElementsByTagName('td');
        for(let i=0; i<td.length; i++){
            td[i].style.color = '#fff';
            td[i].style.border = 'none';
        }
        const tr = document.getElementsByClassName('tr-style');
        for(let i=0; i<tr.length; i++){
            if(i%2 === 0){
            tr[i].style.border ='none';
            }
            else{
                tr[i].style.borderBottom ='2px solid rgb(218, 215, 215)';
            }
        }
        const date_style = document.getElementsByClassName('date-style');
        for(let i=0; i<date_style.length; i++){
            // date_style[i].style.alignItems = 'center';
            // date_style[i].style.justifyContent = 'center';
           date_style[i].style.alignContent = 'center';
        }
}

function setWinningRate(percentage) {
    const progressArc = document.getElementById('progress-arc');
    const percentageText = document.getElementById('percentage-text');

    // Clamp the percentage between 0 and 100
    const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

    // Calculate the stroke-dashoffset for the arc
    const totalLength = 283; // Circumference of the arc
    const offset = totalLength - (clampedPercentage / 100) * totalLength;

    // Update the progress arc and percentage text
    progressArc.style.strokeDashoffset = offset;
    percentageText.textContent = `${clampedPercentage}%`;
    percentageText.style.color = "rgb(255,255,255)";
    percentageText.style.fontSize="28px";
    percentageText.style.marginTop = "-60px";
    percentageText.style.fontWeight = "bolder";
}

export function display_winning_rate()
{   let result;
    setWinningRate(stats_data.stats.overall_win_rate);
    const rates=stats_data.stats.overall_win_rate;
    console.log('rates:',rates);
    const win_numbers = document.getElementById("win-stats");
    const lose_numbers = document.getElementById("lose-stats");
    let win_n = stats_data.stats.wins;
    console.log('win_n:::::::::::',win_n);
    let lose_n = stats_data.stats.total_games - stats_data.stats.wins;
    console.log('lose_n:::::::::::',lose_n);
    win_numbers.innerHTML =
    `
        <p>${win_n} Wins</p>
    `;
    lose_numbers.innerHTML =
    `
        <p>${lose_n} Loses</p>
    `;
    console.log('ssssssssssssssss!!!!!!!');
    const ii = stats_data.stats.total_games -stats_data.stats.total_games+ 1;
    let opponent = stats_data.recent_matches[0].opponent;
    console.log('rrrrrrrrrrrrrrrrrrr!!!!!!!');
    let user_goals = stats_data.recent_matches[0].player_score;
    let opponent_goals = stats_data.recent_matches[0].opponent_score;
    const usernames = document.getElementsByClassName('usernames');
    const score = document.getElementsByClassName('score');
    const match_container= document.getElementsByClassName('match-container');
    const win_button = document.getElementById('wins-button');
    // console.log('ssssssssssssssss!!!!!!!');
    match_container[0].innerHTML = `
                <div class="player">
                    <img src="../images/avatar.png" alt="Player 1"id="player1">
                    <p class="usernames">USERNAME</p>
                </div>
                <div class="score">XX:XX</div>
                <div class="player">
                    <img src="../images/avatar.png" alt="Player 2" id="player2">
                    <p class="usernames">USERNAME</p>
                </div>
    `
    // const player = document.getElementsByClassName('player');
    const playerImages = document.querySelectorAll('.player img');
    console.log('playerImages:',image_pr);
    playerImages[0].src = image_pr;
    // player[0].image.src =
    usernames[0].innerHTML = username;
    usernames[1].innerHTML = opponent;
    score[0].innerHTML = `
    0${user_goals} : 0${opponent_goals}
    `;
    if(stats_data.recent_matches[0].won===true){
        result = 'Win';
        win_button.style.backgroundColor = 'rgb(40, 152, 109)';
        win_button.innerHTML = 'Win';
    }
    else{
        result = 'Lose';
        win_button.style.backgroundColor = 'rgb(179, 20, 20)';
        win_button.innerHTML = 'Lose';
    }
    
    
}

const friends = [
    {
        "id": 1,
        "username": "user1",
        "fullname": "User One",
        "image": "images/avatar.png",
        "status": "online",
        "request": "pending",
    },
    {
        "id": 2,
        "username": "user2",
        "fullname": "User Two",
        "image": "images/avatar.png",
        "status": "offline",
        "request": "accepted",
    },
    {
        "id": 3,
        "username": "user3",
        "fullname": "User Three",
        "image": "images/avatar.png",
        "status": "online",
        "request": "blocked",
    },
    {
        "id": 4,
        "username": "user4",
        "fullname": "User Four",
        "image": "images/avatar.png",
        "status": "offline",
        "request": "pending",
    },
    {
        "id": 5,
        "username": "user5",
        "fullname": "User Five",
        "image": "images/avatar.png",
        "status": "online",
        "request": "accepted",
    },
    {
        "id": 6,
        "username": "user6",
        "fullname": "User Six",
        "image": "images/avatar.png",
        "status": "offline",
        "request": "blocked",
    },
    {
        "id": 7,
        "username": "user7",
        "fullname": "User Seven",
        "image": "images/avatar.png",
        "status": "online",
        "request": "pending",
    },
    {
        "id": 8,
        "username": "user8",
        "fullname": "User Eight",
        "image": "images/avatar.png",
        "status": "offline",
        "request": "accepted",
    },
    {
        "id": 9,
        "username": "user9",
        "fullname": "User Nine",
        "image": "images/avatar.png",
        "status": "online",
        "request": "blocked",
    },
    {
        "id": 10,
        "username": "user10",
        "fullname": "User Ten",
        "image": "images/avatar.png",
        "status": "offline",
        "request": "pending",
    },
    {
        "id": 11,
        "username": "user11",
        "fullname": "User Eleven",
        "image": "images/avatar.png",
        "status": "online",
        "request": "accepted",
    },
    {
        "id": 12,
        "username": "user12",
        "fullname": "User Twelve",
        "image": "images/avatar.png",
        "status": "offline",
        "request": "blocked",
    },
    {
        "id": 13,
        "username": "user13",
        "fullname": "User Thirteen",
        "image": "images/avatar.png",
        "status": "online",
        "request": "pending",
    },
    {
        "id": 14,
        "username": "user14",
        "fullname": "User Fourteen",
        "image": "images/avatar.png",
        "status": "offline",
        "request": "accepted",
    },
    {
        "id": 15,
        "username": "user15",
        "fullname": "User Fifteen",
        "image": "images/avatar.png",
        "status": "online",
        "request": "blocked",
    },
];


export function display_friends_list()
{
    const friendsList = document.getElementById('all');
    const blockedList = document.getElementById('blocked');
    const pendingList = document.getElementById('pending');
    const onlineList = document.getElementById('online-list');
    console.log('11111##########################');
    friendsList.innerHTML = `
        <h3>All friends <span class="friend-count">7</span></h3>
        `;
    blockedList.innerHTML = `
        <h3>Blocked <span class="friend-count">2</span></h3>
        `;
    pendingList.innerHTML = `
        <h3>Pending <span class="friend-count">3</span></h3>
        `;
    onlineList.innerHTML = `
        <h3>Online <span class="friend-count">4</span></h3>
        `;
    for(let i=0; i<friends.length-1; i++)
    {
        if(friends[i].request=== 'accepted')
        {
            friendsList.innerHTML += `
            <div class="friend" id="full-list">
                <img src="../images/avatar.png" class="avatar">
                <div class="friend-info">
                    <p class="username">${friends[i].username}</p>
                    <p class="fullname">${friends[i].fullname}</p>
                </div>
                <div class="actions">
                    <button class="challenge">⚑</button>
                    <button class="remove">❌</button>
                    <button class="view">➡️</button>
                </div>
            </div>
    `;
        }
        else if(friends[i].request=== 'blocked')
        {
            blockedList.innerHTML += `
            <div class="friend" id="blocked-list">
                <img src="../images/avatar.png" class="avatar">
                <div class="friend-info">
                    <p class="username">${friends[i].username}</p>
                    <p class="fullname">${friends[i].fullname}</p>
                </div>
                <div class="actions">
                    <button class="unblock">🚫</button>
                </div>
            </div>
    `;
        }
        else if(friends[i].request=== 'pending')
        {
            pendingList.innerHTML += `
            <div class="friend" id="pending-list">
                <img src="../images/avatar.png" class="avatar">
                <div class="friend-info">
                    <p class="username">${friends[i].username}</p>
                    <p class="fullname">${friends[i].fullname}</p>
                </div>
                <div class="actions">
                    <button class="accept">✅</button>
                    <button class="reject">❌</button>
                </div>
            </div>
    `;
        }
        if(friends[i].status === 'online' && friends[i].request === 'accepted')
        {
            onlineList.innerHTML += `
            <div class="friend" id="online-list">
                <img src="../images/avatar.png" class="avatar">
                <div class="friend-info">
                    <p class="username">${friends[i].username}</p>
                    <p class="fullname">${friends[i].fullname}</p>
                </div>
                <div class="actions">
                    <button class="challenge">⚑</button>
                    <button class="remove">❌</button>
                    <button class="view">➡️</button>
                </div>
            </div>
    `;
        }
    }

}