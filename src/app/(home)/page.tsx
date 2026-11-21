import Image from "next/image";
import Link from "next/link";
import BackGroundVideo from "@/components/BackgroundVideo";

import Post1 from "src/public/posts/post-0-1.gif";
import Post2 from "src/public/posts/post-0-8.gif";
import Post3 from "src/public/posts/post-1-0.gif";

export default function HomePage() {
  // console.log(gifbg)
  // console.log('gifbg')
  return (
    <main className="flex flex-1 flex-col items-center pb-10 w-full">
      <BackGroundVideo />

      <div className='flex flex-col items-center w-full pb-10' id='update-0-9'>

        <h1 className="mb-4 text-4xl font-bold text-center">Update 0.9 - Contagem Regressiva...</h1>
        <Image src={Post3} alt='' className=''></Image>
        <div className='w-full px-4 md:px-0 md:max-w-11/20 pt-4 flex flex-col gap-3'>
          <p className='w-full'>Eae Galera, quanto tempo não temos um post novo?</p>
          <p className='w-full'>
            Esse foi um ano cheio de Playtests e mudanças no sistema, e será um prazer compartilha-las com vocês aqui nesse post.
          </p>
          <p className='w-full'>Gostaria de começar anunciando que o livro <b>SERÁ LANÇADO ANO QUE VEM</b>. Sim, é real. Em parceria com a Secretária de Cultura de São Mateus e o Estado do Paraná, fomos selecionados através da lei Aldir Blanc para fazer nosso projeto acontecer e lançarmos uma versão piloto do sistema, tanto DIGITAL quanto FÍSICA</p>
          <p className='w-full'>Essa versão irá conter todos os conteúdos necessários para jogar o RPG contando com bestiário, loja de equipamentos, fichas prontas, guia para o narrador, história do mundo e uma aventura pronta para sentar e jogar com seus amigos</p>
          <p className='w-full'>Por mais completa que seja essa versão ela ainda não irá conter todos os conteúdos que planejo para New Frontiers, além disso a remessa desse primeiro livro será limitada, mas esses são detalhes que irei abordar quando tivermos mais certeza da distribuição das cópias...</p>

          <i>"Vamos ao que interessa, o que mudou nesse último ano?"</i>

          <p className='w-full'>O sistema amadureceu e recebeu cortes de alguns conteúdos, foi removido o atributo de <b>sabedoria</b> por não fazer tanto sentido com a construção de personagem e suas caracteristicas foram atribuidas ao atributo de <b>Persona</b>, o sistema de afiliações foi afastado para receber algumas modificações futuras(sem previsão de retorno) e o sistema de robos gigantes... Bom... Da para se dizer que ficou complexo de mais para caber em um livro! E irá sair como uma expansão no fúturo (assim como planejado e avisado pelo <a className="underline bold text-sky-600" href='#update-0-6'>post 0.5</a>.)</p>

          <p className='w-full'>Além disso foram adicionadas novas mecânicas e jeitos de construir o personagem. A mais importânte é a adição de 2 novas espécieas para o sistema! (Os Replicantes e os Androides) que irão criar mais variedade na construção de personagem e animar a monotonia de sempre jogar como um humano. Tambem foi adicionada uma nova mecânica de pontos de mente explora o foco dos personagens na trama e abre portas para dano psiquico e os mistérios da mente futurista. Alem de tudo isso foram adicionados novos itens, caracteristicas, armas, e muito mais!</p>
          
          <i>"O que falta para lançar?"</i>

          <p className="w-full">Ainda existem alguns conteúdos para serem balanceados, o bestiário e a economia são os pontos principais que precisam ser concluídos. As atualizações e o que falta podem ser acompanhados nas atualizações do Github do projeto e no próprio site.</p>

          <p className="w-full">Se quiser conhecer mais sobre o projeto ou ficar antenado em mais atualizações, considere entrar na nossa comunidade clicando no <a href="https://discord.gg/JDJawBjbfk" target="_blank" className='text-[#5865F2]'>botão do discord</a> no canto direito inferior no site. Vejo vocês em breve com mais novidades ;)</p>

          <p className='w-full text-end'>
            - Thom 20/11/2026
          </p>

        </div>
      </div>

      <div className="flex flex-col items-center w-full pb-10" id='update-0-6'>
        <h1 className="mb-4 text-4xl font-bold text-center">
          Update 0.5 - Preparativos para Versão Piloto
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
