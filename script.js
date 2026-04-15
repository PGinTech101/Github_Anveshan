function replaceUserData(userData, username) {
    const photo = userData.avatar_url;
    document.querySelector('#profile_circle').innerHTML = `<img id="photu" src="${photo}" alt="${username} avatar">`;
     
    const name = userData.login;
    document.querySelector('#username_box').innerHTML = `${name}`;

    const bio = userData.bio || 'No bio available';
    document.querySelector('#bio_box').innerHTML = `${bio}`;

    // Updated IDs below to match your new HTML!
    const followers = userData.followers;
    document.querySelector('#followers_val').innerHTML = `${followers}`;

    const following = userData.following;
    document.querySelector('#following_val').innerHTML = `${following}`;

    const location = userData.location || 'Location not available';
    document.querySelector('#location_val').innerHTML = `${location}`;

    const company = userData.company || 'Company not available';
    document.querySelector('#company_val').innerHTML = `${company}`;

    const public_repos = userData.public_repos;
    document.querySelector('#repo_val').innerHTML = `${public_repos}`;

    const html_url = userData.html_url;
    document.querySelector('#link_container').innerHTML = `<a href="${html_url}" target="_blank">View on GitHub</a>`;

    const btn = document.getElementById('copyBtn');
    const copyTextSpan = document.getElementById('copyText');   
    
    btn.onclick = async function () {
        try {
            await navigator.clipboard.writeText(html_url);
            const originalText = copyTextSpan.innerText;
            copyTextSpan.innerText = 'Copied!';

            setTimeout(() => {
                copyTextSpan.innerText = originalText;
            }, 2000);
        } catch (error) {
            console.error('Failed to copy', error);
            copyTextSpan.innerText = 'Failed';
            setTimeout(() => {
                copyTextSpan.innerText = 'Copy Link';
            }, 2000);
        }
    };
}

function delays(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function getGithub_profile() {
    const existing_error = document.querySelector('.error_msg');
    if(existing_error){
        existing_error.remove();
    }

    const loader = document.getElementById('loader');
    loader.style.display = 'block';
    
    try{
        const username = document.getElementById('site_search').value.trim(); 

        if(!username){
            throw new Error(`Input cannot be empty`);
        }

        const response = await fetch(`https://api.github.com/users/${username}`);
        await delays(1000);

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
    finally {
    loader.style.display = 'none';
  }
}

document.querySelector('#search_button').addEventListener('click', getGithub_profile);
document.querySelector('#site_search').addEventListener('keydown', function(eve){
    if(eve.key== "Enter"){
        eve.preventDefault();
        getGithub_profile();
    }
});



