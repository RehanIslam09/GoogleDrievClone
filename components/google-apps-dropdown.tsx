import React from "react";

export default function GoogleAppsDropdown() {
  return (
    <div className="navbar-apps-dropdown">
      <div className="navbar-apps-header">
        <span>Main Google Workspace Apps</span>
      </div>

      <div className="navbar-apps-grid">
        {/* Gmail */}
        <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer" className="navbar-app-item">
          <div className="navbar-app-icon" style={{ backgroundColor: '#ea4335' }}>
            <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </div>
          <span className="navbar-app-label">Gmail</span>
        </a>

        {/* Drive */}
        <a href="https://drive.google.com" target="_blank" rel="noopener noreferrer" className="navbar-app-item">
          <div className="navbar-app-icon" style={{ backgroundColor: '#fbbc04' }}>
            <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
              <path d="M7.71 3.5L1.15 15l3.85 6.5L12 9.5 7.71 3.5zM2.43 15.5L8.9 4l3.85 6.5-6.47 11-3.85-6.5zm13.42 0l-3.85 6.5H22l-6.46-11-3.85 6.5h3.85l1.93 3.25 1.92-3.25h-3.84z"/>
            </svg>
          </div>
          <span className="navbar-app-label">Drive</span>
        </a>

        {/* Classroom */}
        <a href="https://classroom.google.com" target="_blank" rel="noopener noreferrer" className="navbar-app-item">
          <div className="navbar-app-icon" style={{ backgroundColor: '#0f9d58' }}>
            <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
              <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
            </svg>
          </div>
          <span className="navbar-app-label">Classroom</span>
        </a>

        {/* Docs */}
        <a href="https://docs.google.com" target="_blank" rel="noopener noreferrer" className="navbar-app-item">
          <div className="navbar-app-icon" style={{ backgroundColor: '#4285f4' }}>
            <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
            </svg>
          </div>
          <span className="navbar-app-label">Docs</span>
        </a>

        {/* Gemini */}
        <a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer" className="navbar-app-item">
          <div className="navbar-app-icon" style={{ backgroundColor: '#8E75F2' }}>
            <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
              <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l7.43 3.72L12 11.63 4.57 7.9 12 4.18z"/>
            </svg>
          </div>
          <span className="navbar-app-label">Gemini</span>
        </a>

        {/* Sheets */}
        <a href="https://sheets.google.com" target="_blank" rel="noopener noreferrer" className="navbar-app-item">
          <div className="navbar-app-icon" style={{ backgroundColor: '#0f9d58' }}>
            <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
              <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 14H9v-2h4v2zm0-4H9v-2h4v2zm2 4h-1v-2h1v2zm0-4h-1v-2h1v2zm1-5h-5V3.5L17.5 9H16z"/>
            </svg>
          </div>
          <span className="navbar-app-label">Sheets</span>
        </a>

        {/* Slides */}
        <a href="https://slides.google.com" target="_blank" rel="noopener noreferrer" className="navbar-app-item">
          <div className="navbar-app-icon" style={{ backgroundColor: '#fbbc04' }}>
            <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
              <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 16H7v-2h6v2zm2-4H7v-2h8v2zm2-6h-5V3.5L17.5 8H17z"/>
            </svg>
          </div>
          <span className="navbar-app-label">Slides</span>
        </a>

        {/* Calendar */}
        <a href="https://calendar.google.com" target="_blank" rel="noopener noreferrer" className="navbar-app-item navbar-app-item-active">
          <div className="navbar-app-icon" style={{ backgroundColor: '#4285f4' }}>
            <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
            </svg>
          </div>
          <span className="navbar-app-label">Calendar</span>
        </a>

        {/* Chat */}
        <a href="https://chat.google.com" target="_blank" rel="noopener noreferrer" className="navbar-app-item">
          <div className="navbar-app-icon" style={{ backgroundColor: '#0f9d58' }}>
            <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
            </svg>
          </div>
          <span className="navbar-app-label">Chat</span>
        </a>

        {/* Meet */}
        <a href="https://meet.google.com" target="_blank" rel="noopener noreferrer" className="navbar-app-item">
          <div className="navbar-app-icon" style={{ backgroundColor: '#00832d' }}>
            <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
              <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
            </svg>
          </div>
          <span className="navbar-app-label">Meet</span>
        </a>

        {/* Vids */}
        <a href="https://vids.google.com" target="_blank" rel="noopener noreferrer" className="navbar-app-item">
          <div className="navbar-app-icon" style={{ backgroundColor: '#ea4335' }}>
            <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
          <span className="navbar-app-label">Vids</span>
        </a>

        {/* Forms */}
        <a href="https://forms.google.com" target="_blank" rel="noopener noreferrer" className="navbar-app-item">
          <div className="navbar-app-icon" style={{ backgroundColor: '#673ab7' }}>
            <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
              <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 15H7v-2h6v2zm2-4H7v-2h8v2zm0-4H7V7h8v2z"/>
            </svg>
          </div>
          <span className="navbar-app-label">Forms</span>
        </a>

        {/* Sites */}
        <a href="https://sites.google.com" target="_blank" rel="noopener noreferrer" className="navbar-app-item">
          <div className="navbar-app-icon" style={{ backgroundColor: '#4285f4' }}>
            <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
              <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/>
            </svg>
          </div>
          <span className="navbar-app-label">Sites</span>
        </a>
      </div>

      <div className="navbar-apps-divider"></div>

      <div className="navbar-apps-header">
        <span>Other Google Apps</span>
      </div>

      <div className="navbar-apps-grid">
        {/* Groups */}
        <a href="https://groups.google.com" target="_blank" rel="noopener noreferrer" className="navbar-app-item">
          <div className="navbar-app-icon" style={{ backgroundColor: '#4285f4' }}>
            <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </svg>
          </div>
          <span className="navbar-app-label">Groups</span>
        </a>

        {/* YouTube */}
        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="navbar-app-item">
          <div className="navbar-app-icon" style={{ backgroundColor: '#ff0000' }}>
            <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
              <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
            </svg>
          </div>
          <span className="navbar-app-label">YouTube</span>
        </a>

        {/* Maps */}
        <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="navbar-app-item">
          <div className="navbar-app-icon" style={{ backgroundColor: '#34a853' }}>
            <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          <span className="navbar-app-label">Maps</span>
        </a>

        {/* News */}
        <a href="https://news.google.com" target="_blank" rel="noopener noreferrer" className="navbar-app-item">
          <div className="navbar-app-icon" style={{ backgroundColor: '#4285f4' }}>
            <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
              <path d="M20 3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h8v2zm3-4H7v-2h11v2zm0-4H7V7h11v2z"/>
            </svg>
          </div>
          <span className="navbar-app-label">News</span>
        </a>

        {/* Photos */}
        <a href="https://photos.google.com" target="_blank" rel="noopener noreferrer" className="navbar-app-item">
          <div className="navbar-app-icon" style={{ backgroundColor: '#fbbc04' }}>
            <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
          </div>
          <span className="navbar-app-label">Photos</span>
        </a>

        {/* Translate */}
        <a href="https://translate.google.com" target="_blank" rel="noopener noreferrer" className="navbar-app-item">
          <div className="navbar-app-icon" style={{ backgroundColor: '#4285f4' }}>
            <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
              <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
            </svg>
          </div>
          <span className="navbar-app-label">Translate</span>
        </a>

        {/* Contacts */}
        <a href="https://contacts.google.com" target="_blank" rel="noopener noreferrer" className="navbar-app-item">
          <div className="navbar-app-icon" style={{ backgroundColor: '#34a853' }}>
            <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <span className="navbar-app-label">Contacts</span>
        </a>

        {/* Keep */}
        <a href="https://keep.google.com" target="_blank" rel="noopener noreferrer" className="navbar-app-item">
          <div className="navbar-app-icon" style={{ backgroundColor: '#fbbc04' }}>
            <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
              <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
            </svg>
          </div>
          <span className="navbar-app-label">Keep</span>
        </a>

        {/* Cloud Search */}
        <a href="https://cloudsearch.google.com" target="_blank" rel="noopener noreferrer" className="navbar-app-item">
          <div className="navbar-app-icon" style={{ backgroundColor: '#4285f4' }}>
            <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </div>
          <span className="navbar-app-label">Cloud Search</span>
        </a>

        {/* Earth */}
        <a href="https://earth.google.com" target="_blank" rel="noopener noreferrer" className="navbar-app-item">
          <div className="navbar-app-icon" style={{ backgroundColor: '#4285f4' }}>
            <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </div>
          <span className="navbar-app-label">Earth</span>
        </a>

        {/* Saved */}
        <a href="https://www.google.com/save" target="_blank" rel="noopener noreferrer" className="navbar-app-item">
          <div className="navbar-app-icon" style={{ backgroundColor: '#fbbc04' }}>
            <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
              <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
            </svg>
          </div>
          <span className="navbar-app-label">Saved</span>
        </a>

        {/* Travel */}
        <a href="https://www.google.com/travel" target="_blank" rel="noopener noreferrer" className="navbar-app-item">
          <div className="navbar-app-icon" style={{ backgroundColor: '#4285f4' }}>
            <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
              <path d="M2.5 19h19v2h-19v-2zm19.57-9.36c-.21-.8-1.04-1.28-1.84-1.06L14.92 10l-6.9-6.43-1.93.51 4.14 7.17-4.97 1.33-1.97-1.54-1.45.39 2.59 4.49s7.12-1.9 16.57-4.43c.81-.23 1.28-1.05 1.07-1.85z"/>
            </svg>
          </div>
          <span className="navbar-app-label">Travel</span>
        </a>

        {/* Password Manager */}
        <a href="https://passwords.google.com" target="_blank" rel="noopener noreferrer" className="navbar-app-item">
          <div className="navbar-app-icon" style={{ backgroundColor: '#4285f4' }}>
            <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
            </svg>
          </div>
          <span className="navbar-app-label">Password...</span>
        </a>

        {/* Vault */}
        <a href="https://vault.google.com" target="_blank" rel="noopener noreferrer" className="navbar-app-item">
          <div className="navbar-app-icon" style={{ backgroundColor: '#4285f4' }}>
            <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
            </svg>
          </div>
          <span className="navbar-app-label">Vault</span>
        </a>

        {/* NotebookLM */}
        <a href="https://notebooklm.google.com" target="_blank" rel="noopener noreferrer" className="navbar-app-item">
          <div className="navbar-app-icon" style={{ backgroundColor: '#4285f4' }}>
            <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
              <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
            </svg>
          </div>
          <span className="navbar-app-label">Notebook...</span>
        </a>

        {/* Tasks */}
        <a href="https://tasks.google.com" target="_blank" rel="noopener noreferrer" className="navbar-app-item">
          <div className="navbar-app-icon" style={{ backgroundColor: '#4285f4' }}>
            <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </div>
          <span className="navbar-app-label">Tasks</span>
        </a>
      </div>

      {/* More from Google Workspace Marketplace */}
      <div className="navbar-apps-marketplace">
        <a
          href="https://workspace.google.com/marketplace"
          target="_blank"
          rel="noopener noreferrer"
          className="navbar-apps-marketplace-button"
        >
          More from Google Workspace Marketplace
        </a>
      </div>
    </div>
  );
}
