import axios from 'axios';

// Helper function to prepare token for API use
const prepareToken = (token) => {
  // Remove any whitespace that might be in the token
  let cleanToken = token.trim();
  
  // If token has the github_pat_ prefix, use only the necessary part
  if (cleanToken.startsWith('github_pat_')) {
    // Extract just the token value without the prefix
    console.log('Cleaning GitHub PAT format');
    return cleanToken;
  }
  
  return cleanToken;
};

// Function to fetch file content from GitHub
export const fetchGitHubFile = async (owner, repo, path, token = '') => {
  try {
    // Try to use the token from .env if available
    const envToken = import.meta.env.VITE_GITHUB_TOKEN || '';
    let useToken = token || envToken;
    
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json'
    };
    
    if (useToken) {
      // Use Basic Auth with personal access token
      // This is more reliable than using the token in the Authorization header
      const basicAuth = btoa(`${owner}:${prepareToken(useToken)}`);
      headers.Authorization = `Basic ${basicAuth}`;
    }

    console.log('Fetching file:', owner, repo, path);
    
    // Fetch file content from GitHub API
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      { headers }
    );

    if (response.data.type !== 'file') {
      throw new Error('The path does not point to a file');
    }

    // GitHub API returns content as base64
    const content = atob(response.data.content.replace(/\n/g, ''));
    return {
      name: response.data.name,
      path: response.data.path,
      content: content,
      language: response.data.name.split('.').pop() // Get file extension as language
    };
  } catch (error) {
    console.error('Error fetching GitHub file:', error);
    throw error;
  }
};

// Function to fetch repository contents
export const fetchGitHubRepo = async (owner, repo, path = '', token = '') => {
  try {
    // Try to use the token from .env if available
    const envToken = import.meta.env.VITE_GITHUB_TOKEN || '';
    let useToken = token || envToken;
    
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json'
    };
    
    if (useToken) {
      // Use Basic Auth with personal access token
      // This is more reliable than using the token in the Authorization header
      const basicAuth = btoa(`${owner}:${prepareToken(useToken)}`);
      headers.Authorization = `Basic ${basicAuth}`;
    }

    console.log('Fetching repo:', owner, repo, path);
    
    // Fetch repository contents
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      { headers }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching GitHub repository:', error);
    throw error;
  }
};