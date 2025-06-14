import React from 'react';
// import TerraBg from '@/public/terra.mp4'; // CSS separado para estilo

const BackgroundVideo = () => {
  return (
    <div className="video-container">
      <video autoPlay loop muted playsInline className="background-video">
        <source src='/terra.mp4' type="video/mp4" />
        Seu navegador não suporta vídeos em HTML5.
      </video>
      <div className="content">
        <h1>Bem-vindo</h1>
        <p>Este é o conteúdo por cima do vídeo</p>
      </div>
    </div>
  );
};

export default BackgroundVideo;