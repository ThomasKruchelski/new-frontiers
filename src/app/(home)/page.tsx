import Image from 'next/image';
import Link from 'next/link';
import BackGroundVideo from '@/components/BackgroundVideo'

import Post1 from 'src/public/posts/post-0-1.gif'
import Post2 from 'src/public/posts/post-0-5.gif'

export default function HomePage() {
  // console.log(gifbg)
  // console.log('gifbg')
  return (
    <main className="flex flex-1 flex-col items-center py-10 w-full" >

      {/* <BackGroundVideo/> */}

      {/* <div className='flex flex-col items-center w-full pb-10'>

        <h1 className="mb-4 text-4xl font-bold text-center">Update 0.5 - Derrubando Robôs Gigantes</h1>
        <Image src={Post2} alt='' className=''></Image>
        <div className='w-full px-4 md:px-0 md:max-w-11/20 pt-4 flex flex-col gap-3'>
          <p className='w-full'>Eae Galera, quanto tempo não temos um post novo?</p>
          <p className='w-full'>
            Apesar da ausência continuei trabalhando arduamente no sistema, e com muita alegria venho informar que versão 1.0 do combate de robôs está oficialmente lançada.
          </p>
          
          <p className='w-full text-end'>
            - Thom  18/02/2025
          </p>

        </div>
      </div> */}

      <div className='flex flex-col items-center w-full pb-10'>

        <h1 className="mb-4 text-4xl font-bold text-center">Update 0.1 - Aquecendo os Motores</h1>
        <Image src={Post1} alt='' className=''></Image>
        <div className='w-full px-4 md:px-0 md:max-w-11/20 pt-4 flex flex-col gap-3'>
          <p className='w-full'>Eae Galera, como vocês estão? Espero que bem!</p>
          <p className='w-full'>
            Invés de criar um livro estou montando esse website para manter a documentação do nosso RPG cyberpunk acessível a todos nós e tambem todos que queiram ver o que estamos construindo juntos!
          </p>
          <p className='w-full'>
            Para todos os ansiosos por notícias atualmente estou terminando a documentação dos robôs e fazendo designs bem irados para algumas paginas para fugirmos daquele padrão de documentação apenas com textos.
            Estarei disponibilizando a documentação de nosso livro-jogo o mais cedo que eu conseguir!!!
          </p>
          <p className='w-full'>
            Nesse site pretendo mante-los atualizados aqui pela aba de Notícias, manter todo o manual e regras do jogo na aba de Documentação e por fim ter informações mais específicas da história da nossa mesa (que não tem haver com as regras do sistema) na aba de Campanha.
          </p>
          <p className='w-full'>
            O site Funciona na versão Mobile e Desktop e pode ser acessado por qualquer um com o link, vejo vocês em breve ;)
          </p>
          <p className='w-full text-end'>
            - Thom  01/09/2023
          </p>

        </div>
      </div>
    </main>
  );
}
