import React, { useState, useEffect } from 'react';
import { FaGithub } from 'react-icons/fa';

// Add debugging to see if component loads
console.log("GitHubImporter component loaded");

interface GitHubImporterProps {
  onFileSelect: (fileData: any) => void;
  onClose: () => void;
}

const GitHubImporter: React.FC<GitHubImporterProps> = ({ onFileSelect, onClose }) => {
  const [token, setToken] = useState('');
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [path, setPath] = useState('');
  const [contents, setContents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get token from localStorage or env on component mount
  useEffect(() => {
    const savedToken = localStorage.getItem('github_token') || '';
    setToken(savedToken);
  }, []);

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newToken = e.target.value;
    setToken(newToken);
    localStorage.setItem('github_token', newToken);
  };

  // Try fetching without any token for public repos
  const handleFetchRepo = async () => {
    if (!owner || !repo) {
      setError('Please enter both owner and repository name');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      console.log('Attempting to fetch repository:', owner, repo, path);
      
      // For public repositories - no token needed
      const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
      
      // Use simple fetch without auth headers for public repos
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Fetched data:', data);
      setContents(Array.isArray(data) ? data : [data]);
      setLoading(false);
    } catch (err: any) {
      console.error('Error in handleFetchRepo:', err);
      setError(`Failed to fetch repository data: ${err.message || 'Unknown error'}`);
      setLoading(false);
    }
  };

  const handlePathChange = async (newPath: string, isFile: boolean) => {
    if (isFile) {
      setLoading(true);
      try {
        console.log('Attempting to fetch file:', owner, repo, newPath);
        
        // For file fetching - simple fetch without auth headers
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${newPath}`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const fileData = await response.json();
        
        if (fileData.type !== 'file' || !fileData.content) {
          throw new Error('Not a valid file or file has no content');
        }
        
        // GitHub API returns base64 encoded content
        const content = atob(fileData.content.replace(/\n/g, ''));
        
        const processedFileData = {
          name: fileData.name,
          path: fileData.path,
          content: content,
          language: fileData.name.split('.').pop()
        };
        
        onFileSelect(processedFileData);
        onClose();
      } catch (err: any) {
        console.error('Error fetching file:', err);
        setError(`Failed to fetch file content: ${err.message || 'Unknown error'}`);
        setLoading(false);
      }
    } else {
      // Handle directory navigation
      setPath(newPath);
      setLoading(true);
      try {
        console.log('Navigating to directory:', owner, repo, newPath);
        
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${newPath}`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const data = await response.json();
        setContents(Array.isArray(data) ? data : [data]);
        setLoading(false);
      } catch (err: any) {
        console.error('Error navigating directory:', err);
        setError(`Failed to navigate to directory: ${err.message || 'Unknown error'}`);
        setLoading(false);
      }
    }
  };

  return (
    <div className="github-importer">
      <div className="importer-header">
        <div className="importer-title">
          <FaGithub className="github-icon" />
          <span>Import</span>
        </div>
        <button className="navbar-button" onClick={onClose}>Close</button>
      </div>
      
      <div className="importer-form">
        <div className="form-group">
          <label>Repository Owner:</label>
          <input 
            type="text" 
            value={owner} 
            onChange={(e) => setOwner(e.target.value)}
            placeholder="e.g., facebook" 
          />
        </div>
        
        <div className="form-group">
          <label>Repository Name:</label>
          <input 
            type="text" 
            value={repo} 
            onChange={(e) => setRepo(e.target.value)}
            placeholder="e.g., react" 
          />
        </div>
        
        <button 
          className="navbar-button" 
          onClick={handleFetchRepo} 
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Fetch Repository'}
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="current-path">
        {owner}/{repo}/{path}
      </div>
      
      <div className="repo-contents">
        {loading ? <div>Loading...</div> : (
          <>
            {path && (
              <div 
                className="repo-item" 
                onClick={() => handlePathChange(path.split('/').slice(0, -1).join('/') || '', false)}
              >
                ../ (Go up)
              </div>
            )}
            {contents.map(item => (
              <div 
                key={item.path} 
                className="repo-item"
                onClick={() => handlePathChange(item.path, item.type === 'file')}
              >
                {item.type === 'dir' ? '📁 ' : '📄 '}{item.name}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default GitHubImporter;