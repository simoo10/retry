//all the routes are defined here
const routes = [
    {link:'/',template:'landing.html'},
    {link:'/landing',template:'landing.html'},
    {link:'/login',template:'login.html'},
    {link:'/signup',template:'signup.html'},
];

const content = document.getElementById('page-content');
let css_link = null;
const navbar = document.getElementById('landing-navbar');
//function to handle navigation

function handling_navigation(route){
    console.log("Route: ",route);
    const exact_route = routes.find(r => r.link === route);
    if(exact_route)
    {
        get_content(exact_route.template);
        history.pushState({route},"",route);
    }
    else{
        get_content('404.html');
        history.pushState({route},"",route);
    }
}

//function to get the content of the template

async function get_content(template){
    try{
        console.log("--->",template);
        const response = await fetch(`views/${template}`);
        if(response.ok){
            const data = await response.text();
            const css_file = template.split('.')[0];
            change_css(`css/${css_file}.css`);
            if(css_link){
               document.head.removeChild(css_link); 
            }
            css_link = `css/${css_file}.css`;
            if(template==="login.html" || template==="signup.html"){
                navbar.style.display = "none";
            }
            content.innerHTML = data;
        }
        else{
            throw new Error('Error in fetching the content');
        }
    }
    catch(error){
        content.innerHTML = `<h1>${error.message}</h1>`;
    }
}

//function to change the css file

function change_css(path) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = path;
    document.head.appendChild(link);
}

document.getElementById("home-link").addEventListener("click", (event) => {
    event.preventDefault();
    handling_navigation("/landing");
});
document.getElementById("butt-style").addEventListener("click", () => handling_navigation("/login"));
document.getElementById("butt-style2").addEventListener("click", () => handling_navigation("/signup"));

window.addEventListener("popstate", (event) => {
    const route = event.state?.route || "/landing";
    handling_navigation(route);
});

document.addEventListener("DOMContentLoaded", () => {
    const initialRoute = window.location.pathname || "/landing";
    handling_navigation(initialRoute);
});