import Image from "next/image";
import Link from "next/link";
import BackGroundVideo from "@/components/BackgroundVideo";

import Post1 from "src/public/posts/post-0-1.gif";
import Post2 from "src/public/posts/post-0-8.gif";

export default function HomePage() {
  // console.log(gifbg)
  // console.log('gifbg')
  return (
    <main className="flex flex-1 flex-col items-center pb-10 w-full">
      <BackGroundVideo />

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

      <div className="flex flex-col items-center w-full pb-10">
        <h1 className="mb-4 text-4xl font-bold text-center">
          Update 0.8 - Preparativos para Versão Piloto
        </h1>
        <Image src={Post2} alt="" className=""></Image>
        <div className="w-full px-4 md:px-0 md:max-w-11/20 pt-4 flex flex-col gap-3">
          <p className="w-full">FALA GALERA, quase 3 aninhos sem post né...</p>
          <p className="w-full">
            Apesar da ausência, continuei trabalhando arduamente no sistema,
            muitas coisas mudaram e estamos próximos de lançar uma versão
            piloto.
          </p>
          <p>
            O principal foco que vim trabalhando nesses últimos tempos foi a
            ficha dos personagens e todo o sistema de regras direcionado a eles,
            hoje já temos uma ficha funcional com mecanicas direcionadas ao uso
            pericias utilizando o sistema d100. O sistema conta com 7 tipos de
            cenas diferentes para contar histórias cyberpunk imersivas focadas
            na narração e na criatividade dos jogadores, sem deixar de lado o
            aspecto de combate inclusivo para todos os tipos de personagem e
            jogadores.
          </p>

          <i>"Tá, mas e os robôs gigantes?"</i>

          <p>
            Trabalhei bastante no aspecto criativo das "funções" que os robos
            poderiam executar em combate, então nasceu um sistema de combate
            baseado em talentos dando a liberdade do jogador montar o que ele
            deseja do seu robo, se ele deseja dano, basta pegar um talento de
            aumento de ataque, se ele quer atacar mais de uma vez, basta pegar o
            talento.
          </p>
          <p>
            Hoje o sistema funciona de forma bem simplista e se forçado um pouco
            é facil encontrar combos desbalanceados, então ainda havera um
            rework geral de como quero que o combate funcione em atualizações
            futuras.
          </p>

          <i>"No que está trabalahndo agora?"</i>

          <p>
            Meu objetivo é concluir o sistema de personagens, criar e balancear
            os equipamentos para tornar solida e base do sistema. Depois vou dar
            foco nos robos gigantes novamente e lança-lo como um conteúdo
            adicional, assim, para quem mestrar uma campanha e deseja só usar o
            sistema de personagem, basta não usar o conteúdo adicional dos robos
            gigantes.
          </p>

          <p>
            Esse foi um post mais longo, mas sinto que era importânte deixar
            todos informados sobre o caminho que o sistema está indo, quem tem
            interesse em mais notícias ou tenha ideas pode entrar em contato
            comigo através do nosso discord oficial{" "}
            <a
              className="underline bold text-sky-600"
              href="https://discord.gg/CpSPQNnH5T"
              target="blank_"
            >
              clicando aqui
            </a>
            . Vejo vocês em breve ;)
          </p>

          <p className="w-full text-end">- Thom 29/01/2026</p>
        </div>
      </div>

      <div className="flex flex-col items-center w-full pb-10">
        <h1 className="mb-4 text-4xl font-bold text-center">
          Update 0.1 - Aquecendo os Motores
        </h1>
        <Image src={Post1} alt="" className=""></Image>
        <div className="w-full px-4 md:px-0 md:max-w-11/20 pt-4 flex flex-col gap-3">
          <p className="w-full">
            Eae Galera, como vocês estão? Espero que bem!
          </p>
          <p className="w-full">
            Invés de criar um livro estou montando esse website para manter a
            documentação do nosso RPG cyberpunk acessível a todos nós e tambem
            todos que queiram ver o que estamos construindo juntos!
          </p>
          <p className="w-full">
            Para todos os ansiosos por notícias atualmente estou terminando a
            documentação dos robôs e fazendo designs bem irados para algumas
            paginas para fugirmos daquele padrão de documentação apenas com
            textos. Estarei disponibilizando a documentação de nosso livro-jogo
            o mais cedo que eu conseguir!!!
          </p>
          <p className="w-full">
            Nesse site pretendo mante-los atualizados aqui pela aba de Notícias,
            manter todo o manual e regras do jogo na aba de Documentação e por
            fim ter informações mais específicas da história da nossa mesa (que
            não tem haver com as regras do sistema) na aba de Campanha.
          </p>
          <p className="w-full">
            O site Funciona na versão Mobile e Desktop e pode ser acessado por
            qualquer um com o link, vejo vocês em breve ;)
          </p>
          <p className="w-full text-end">- Thom 01/09/2023</p>
        </div>
      </div>
    </main>
  );
}
