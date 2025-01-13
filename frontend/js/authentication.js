//42 authentication function for login with export statement for calling it in main.js

export function log42(){
    document.getElementById('log-42').addEventListener('click', async () => {
        console.log('Login with 42 button clicked');
        const urlParams = new URLSearchParams(window.location.search);
        const login = urlParams.get('login');
        const email = urlParams.get('email');
    console.log(`Logged in user: ${login}, Email: ${email}`);

        try {
            // Fetch the Intra42 authentication URL from the backend
            const response = await fetch('http://localhost:8000/api/login_with_42/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                // Extract the URL and redirect the user
                const data = await response.json();
                if (data.url) {
                    window.location.href = data.url; // Redirect to Intra42 authentication page
                } else {
                    console.error('URL not found in response');
                }
                return('ok');
            } else {
                console.error('Failed to fetch authentication URL');
            }
        } catch (error) {
            console.error('Error during login:', error);
            return('ko');
        }
    });
}