function replaceUserData(userData,username){
        
        const photo = userData.avatar_url;
        document.querySelector('#profile_circle').innerHTML=` <img id= "photu" src = "${photo}" alt = ${username} avtar>`;
         
        const name = userData.login;
        document.querySelector('#username_box').innerHTML = `${name}`;

        const bio = userData.bio || 'NO bio available';
        document.querySelector('#bio_box').innerHTML = `${bio}`;

        const followers = userData.followers;
        document.querySelector('#followers_box').innerHTML = `${followers}`;

        const public_repos = userData.public_repos;
        document.querySelector('#repo_count_box').innerHTML = `${public_repos}`;

        const html_url = userData.html_url;
        document.querySelector('#profile_link_box').innerHTML = `<a href = "${html_url}" target="_blank"> Profile Link </a>`;
}

async function getGithub_profile() {
    const search = document.querySelector('#search_wrapper');
    const existing_error = document.querySelector('.error_msg');
    if(existing_error){
        existing_error.remove();
    }


    try{
        const username = document.getElementById('site_search').value; 
        const response = await fetch(`https://api.github.com/users/${username}`);


        if(!response.ok){
            throw new Error(`User not found ${response.status}`) 
        }   

        const userData = await response.json();

        replaceUserData(userData,username);

    }
    catch(error){
        console.error('Error fetching data',error);
        const search = document.querySelector('#search_wrapper');
        const error_msg = document.createElement('div');
        error_msg.className = 'error_msg';
        error_msg.style.color = 'red';
        error_msg.textContent = error.message;

        search.appendChild(error_msg);
    }
}

document.querySelector('#search_button').addEventListener('click', getGithub_profile);
