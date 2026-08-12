import React from "react";
import Link from "next/link";
// import TerraBg from '@/public/terra.mp4'; // CSS separado para estilo

const BackgroundVideo = () => {
  return (
    <div className="video-container mb-10">
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/terra.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos em HTML5.
      </video>
      <div className="content">
        <h1>Sua aventura Cyberpunk mais imersiva</h1>
        <p>New Frontiers é um sistema de RPG focado na narrativa e na construção de histórias de Ficção Cientifica até mesmo para quem nunca jogou RPG.</p>
      </div>
      <div className="flex w-full flex justify-center pt-20">
        <Link href="/docs" className="livro">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Acesse o Livro
        </Link>
      </div>
    </div>
  );
};

export default BackgroundVideo;
