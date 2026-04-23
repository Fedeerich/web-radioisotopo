/*
================================================================================
PROJECT:       [RADIOISOTOPO]
VERSION:       1.0.0
DESCRIPTION:   [Componente User Profile]
AUTHOR:        [Marcos, Wael]
UPDATED:       [23/04/2026]
================================================================================
*/

// IMPORTS
import React, { useState, useRef } from 'react';

// COMPONENTE USERPROFILE
const UserProfile = ({ userId }) => { 
  const [userAvatar, setUserAvatar] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setUserAvatar(previewUrl);

    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsUploading(true);
      const response = await fetch(`http://localhost:8080/api/users/${userId}/upload-avatar`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Imagen guardada en el servidor:", data.url);
        alert("¡Imagen de perfil actualizada!");
      } else {
        alert("Error al subir la imagen");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="profile-section">
      <div className="avatar-circle" onClick={handleAvatarClick} style={{ cursor: 'pointer', position: 'relative' }}>
        {userAvatar ? (
          <img src={userAvatar} alt="Profile" style={{ width: 50, height: 50, borderRadius: '50%' }} />
        ) : (
          <div className="initials">AD</div>
        )}
        
        {isUploading && <div className="loader">Cargando...</div>}
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        style={{ display: 'none' }} 
        accept="image/*" 
      />
    </div>
  );
};