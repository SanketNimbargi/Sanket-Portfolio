async function fetchGitHubRepos() {
    try {
      const response = await fetch(`https://api.github.com/users/SanketNimbargi/repos`);
      if (!response.ok) {
        throw new Error(`GitHub API request failed: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching GitHub repositories:", error);
      return [];
    }
  }
  
  async function displayRepos() {
    const projects = document.getElementById('projects');
    const data = await fetchGitHubRepos();
  
    // Check if the data is empty.
    if (data.length === 0) {
      // Display an error message if the data is empty.
      const error = document.createElement("div");
      error.className = "alert alert-danger";
      error.innerHTML = "Error: Could not fetch GitHub repositories.";
      projects.appendChild(error);
      return;
    }
  
    // Iterate over the data and display each repository.
    data.forEach((repo) => {
      const card = document.createElement("div");
      card.className = "project-card";
      card.innerHTML = `
        <h2>${repo.name}</h2>
        <p>${repo.description || 'No description available'}</p>
      `;
      projects.appendChild(card);
    });
  }
  
  // Call the displayRepos() function.
  displayRepos();
  