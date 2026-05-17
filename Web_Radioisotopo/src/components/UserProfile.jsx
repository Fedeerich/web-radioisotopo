/*
===============================================================================
PROJECT:       [RADIOISOTOPO]
VERSION:       1.0.0
DESCRIPTION:   [Componente User Profile - Avatar en NavBar]
AUTHOR:        [Marcos, Wael]
UPDATED:       [23/04/2026]
===============================================================================
*/

// IMPORTS
import React from 'react';

// COMPONENTE USERPROFILE
const UserProfile = ({ avatarUrl, nombre, onClick, isUploading }) => {
  if (!onClick) return null;

  return (
    <div className="avatar-edit-container" onClick={onClick} role="button" tabIndex={0} aria-label="Cambiar avatar" onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}>
      <div className="avatar-large">
        {avatarUrl ? (
          <img src={avatarUrl} alt="" />
        ) : (
          <span>{nombre ? nombre.substring(0, 2).toUpperCase() : "??"}</span>
        )}
        <div className="avatar-overlay"><i className="fi fi-rs-camera"></i></div>
      </div>
      {isUploading && <span className="uploading-text">Cargando&hellip;</span>}
    </div>
  );
};

export default UserProfile;