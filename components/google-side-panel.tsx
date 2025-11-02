"use client";

import React, { useState } from "react";
import { X, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock app data
const sideApps = [
  {
    id: "keep",
    name: "Keep",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path fill="#FDD663" d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z"/>
      </svg>
    ),
    color: "bg-[#FDD663]",
  },
  {
    id: "tasks",
    name: "Tasks",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path fill="#4285F4" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        <circle cx="12" cy="12" r="10" fill="none" stroke="#4285F4" strokeWidth="1.5"/>
      </svg>
    ),
    color: "bg-[#4285F4]",
  },
  {
    id: "contacts",
    name: "Contacts",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path fill="#4285F4" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
      </svg>
    ),
    color: "bg-[#4285F4]",
  },
  {
    id: "maps",
    name: "Maps",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path fill="#34A853" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
        <circle cx="12" cy="9" r="2.5" fill="#FBBC04"/>
      </svg>
    ),
    color: "bg-white",
  },
];

const marketplaceApps = [
  {
    name: "Lucidchart",
    developer: "Lucid Software",
    description: "Collaborate on diagrams, such as flowcharts, wireframes, ERDs, and more.",
    rating: 4.1,
    installs: "47M+",
    icon: "https://placehold.co/80x80/ff6b35/white?text=L",
  },
  {
    name: "Canva",
    developer: "Canva",
    description: "Enable seamless design by integrating to Gmail, Drive, and Calendar with...",
    rating: 4.5,
    installs: "20M+",
    icon: "https://placehold.co/80x80/00c4cc/white?text=C",
  },
  {
    name: "RingCentral for Google",
    developer: "RingCentral",
    description: "The RingCentral Addon makes communicating with email and calendar easier.",
    rating: 3.7,
    installs: "538K+",
    icon: "https://placehold.co/80x80/0073e6/white?text=R",
  },
  {
    name: "Comeen Workplace",
    developer: "Comeen",
    description: "Comeen Workplace is the platform for today's modern workplace environment. Make...",
    rating: 4.5,
    installs: "216K+",
    icon: "https://placehold.co/80x80/000000/white?text=CW",
  },
];

export default function GoogleSidePanel() {
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [isMarketplaceOpen, setIsMarketplaceOpen] = useState(false);

  const handleAppClick = (appId: string) => {
    if (selectedApp === appId && isExpanded) {
      setIsExpanded(false);
      setSelectedApp(null);
    } else {
      setSelectedApp(appId);
      setIsExpanded(true);
    }
  };

  const handleToggle = () => {
    if (isPanelVisible) {
      // Hide everything
      setIsExpanded(false);
      setSelectedApp(null);
      setIsPanelVisible(false);
    } else {
      // Show panel
      setIsPanelVisible(true);
    }
  };

  return (
    <>
      {/* Toggle Button (Always Visible) */}
      <button
        onClick={handleToggle}
        className="google-side-panel-toggle-button-fixed"
        aria-label={isPanelVisible ? "Hide panel" : "Show panel"}
        title={isPanelVisible ? "Hide side panel" : "Show side panel"}
      >
        {isPanelVisible ? (
          <ChevronRight className="w-5 h-5" />
        ) : (
          <ChevronLeft className="w-5 h-5" />
        )}
      </button>

      {/* Side Panel */}
      {isPanelVisible && (
        <div className="google-side-panel-container">
          {/* Icon Bar */}
          <div className="google-side-panel-bar">
            {/* App Icons */}
            {sideApps.map((app) => (
              <button
                key={app.id}
                onClick={() => handleAppClick(app.id)}
                className={cn(
                  "google-side-panel-icon-button",
                  selectedApp === app.id && "google-side-panel-icon-active"
                )}
                aria-label={app.name}
                title={app.name}
              >
                {app.icon}
              </button>
            ))}

            {/* Divider */}
            <div className="google-side-panel-divider" />

            {/* Add Button */}
            <button
              onClick={() => setIsMarketplaceOpen(true)}
              className="google-side-panel-icon-button"
              aria-label="Add apps"
              title="Get add-ons"
            >
              <Plus className="w-5 h-5" strokeWidth={2.5} />
            </button>

            {/* Spacer */}
            <div className="flex-1" />
          </div>

        {/* Expanded Panel */}
        <div
          className={cn(
            "google-side-panel-content",
            isExpanded && "google-side-panel-content-expanded"
          )}
        >
          {selectedApp === "tasks" && (
            <div className="google-side-panel-app-content">
              {/* Header */}
              <div className="google-side-panel-header">
                <h2 className="google-side-panel-title">My Tasks</h2>
                <button
                  onClick={() => {
                    setIsExpanded(false);
                    setSelectedApp(null);
                  }}
                  className="google-side-panel-close-button"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="google-side-panel-body">
                <p className="text-sm text-gray-600 text-center py-8">
                  No tasks yet. Add a task to get started.
                </p>
              </div>
            </div>
          )}

          {selectedApp === "keep" && (
            <div className="google-side-panel-app-content">
              <div className="google-side-panel-header">
                <h2 className="google-side-panel-title">Keep</h2>
                <button
                  onClick={() => {
                    setIsExpanded(false);
                    setSelectedApp(null);
                  }}
                  className="google-side-panel-close-button"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="google-side-panel-body">
                <p className="text-sm text-gray-600 text-center py-8">
                  Your notes will appear here.
                </p>
              </div>
            </div>
          )}

          {selectedApp === "contacts" && (
            <div className="google-side-panel-app-content">
              <div className="google-side-panel-header">
                <h2 className="google-side-panel-title">Contacts</h2>
                <button
                  onClick={() => {
                    setIsExpanded(false);
                    setSelectedApp(null);
                  }}
                  className="google-side-panel-close-button"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="google-side-panel-body">
                <p className="text-sm text-gray-600 text-center py-8">
                  No contacts available.
                </p>
              </div>
            </div>
          )}

          {selectedApp === "maps" && (
            <div className="google-side-panel-app-content">
              <div className="google-side-panel-header">
                <h2 className="google-side-panel-title">Maps</h2>
                <button
                  onClick={() => {
                    setIsExpanded(false);
                    setSelectedApp(null);
                  }}
                  className="google-side-panel-close-button"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="google-side-panel-body">
                <p className="text-sm text-gray-600 text-center py-8">
                  Search for places and locations.
                </p>
              </div>
            </div>
          )}
        </div>
        </div>
      )}

      {/* Marketplace Modal */}
      {isMarketplaceOpen && (
        <div className="google-marketplace-overlay" onClick={() => setIsMarketplaceOpen(false)}>
          <div
            className="google-marketplace-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="google-marketplace-header">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                    <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z"/>
                  </svg>
                </div>
                <h2 className="text-xl font-normal text-gray-800">Google Workspace Marketplace</h2>
              </div>
              <button
                onClick={() => setIsMarketplaceOpen(false)}
                className="google-marketplace-close"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="google-marketplace-search">
              <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
              <input
                type="text"
                placeholder="Search apps"
                className="google-marketplace-search-input"
              />
            </div>

            {/* Featured Section */}
            <div className="google-marketplace-featured">
              <div className="google-marketplace-featured-content">
                <h3 className="text-2xl font-normal text-gray-900 mb-2">Featured partner apps</h3>
                <p className="text-sm text-gray-600 mb-6">Connect your business apps with<br />Google Workspace.</p>
                <button className="google-marketplace-see-all">See all</button>
              </div>
              <div className="google-marketplace-featured-apps">
                <div className="google-marketplace-featured-app">
                  <div className="w-10 h-10 bg-orange-500 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">L</span>
                  </div>
                  <span className="text-sm text-gray-900">Lucidchart</span>
                </div>
                <div className="google-marketplace-featured-app">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">CW</span>
                  </div>
                  <span className="text-sm text-gray-900">Comeen Workplace</span>
                </div>
                <div className="google-marketplace-featured-app">
                  <div className="w-10 h-10 bg-yellow-400 rounded flex items-center justify-center">
                    <span className="text-blue-900 font-bold text-xs">M</span>
                  </div>
                  <span className="text-sm text-gray-900">Miro</span>
                </div>
                <div className="google-marketplace-featured-app">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">*</span>
                  </div>
                  <span className="text-sm text-gray-900">Lucidspark</span>
                </div>
              </div>
            </div>

            {/* Recommended Section */}
            <div className="google-marketplace-recommended">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-normal text-gray-900">Recommended for Google Workspace</h3>
                <button className="text-sm text-blue-600 hover:underline">View more</button>
              </div>

              <div className="google-marketplace-apps-grid">
                {marketplaceApps.map((app) => (
                  <div key={app.name} className="google-marketplace-app-card">
                    <div className="p-6">
                      <h4 className="text-base font-normal text-gray-900 mb-1">{app.name}</h4>
                      <p className="text-sm text-blue-600 mb-2">{app.developer}</p>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{app.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                            </svg>
                            {app.rating}
                          </span>
                          <span>•</span>
                          <span>{app.installs}</span>
                        </div>
                        <button className="google-marketplace-install-button">Install</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
