export class Mock {
  public static morphologies() {
    return [
      {
        id: 1,
        title: "Técnicas de montagem cinematográfica",
        description:
          "A montagem cinematográfica é muito mais do que a simples tarefa de cortar e colar pedaços de filme. É a verdadeira essência da linguagem do cinema, uma arte invisível que dita o ritmo, a emoção e o próprio significado de uma história. Através da organização e justaposição de planos, os cineastas manipulam o tempo e o espaço, guiando o olhar e a percepção do espectador para construir uma experiência coesa e impactante. Historicamente, a importância da montagem foi percebida nos primórdios do cinema, mas foi com os cineastas da Escola Soviética, no início do século XX, que ela foi elevada ao status de teoria e principal ferramenta expressiva. Eles foram os pioneiros em entender que a combinação de dois planos poderia gerar um terceiro significado, ausente nas imagens isoladas.",
        mainImage: "/images/sergeieisenstein.jpg",
        examples: [
          {
            id: 1,
            title: "Montagem de Conflito",
            description:
              "Técnica que cria tensão através do contraste entre planos.",
            details: 'Exemplo: "O Encouraçado Potemkin" (1925)',
            image: "/images/oencouracadopotemkin.jpg",
          },
          {
            id: 2,
            title: "Montagem Rítmica",
            description:
              "O ritmo dos cortes dialoga com o movimento dentro da cena.",
            details: 'Exemplo: "Apocalypse Now" (1979)',
            image: "/images/apocalypsenow.jpg",
          },
          {
            id: 3,
            title: "Montagem Paralela",
            description:
              "Alterna entre duas cenas que acontecem simultaneamente.",
            details: 'Exemplo: "O Silêncio dos Inocentes" (1991)',
            image: "/images/osilenciodosinocentes.jpg",
          },
        ],
        slug: "montagem",
        influence: "Influência: Sergei Eisenstein",
        image: "/images/morfologia_montagem.jpg",
      },
      {
        id: 2,
        title: "Continuidade temporal e espacial",
        description:
          "A continuidade temporal refere-se à coerência da passagem do tempo dentro da narrativa de um filme. Ela garante que a sequência de eventos se desenrole de maneira lógica e compreensível, evitando saltos temporais abruptos e inexplicáveis que poderiam confundir o espectador. Para alcançar essa fluidez, os cineastas empregam diversas técnicas, sendo as mais notáveis o raccord de movimento e a gestão da duração temporal.",
        mainImage: "/images/andre-bazin.jpg",
        examples: [
          {
            id: 1,
            title: "Plano-Sequência Clássico",
            description:
              "Técnica que mantém a continuidade espacial e temporal.",
            details: 'Exemplo: "Cidadão Kane" (1941)',
            image: "/images/cidadaokane.jpeg",
          },
          {
            id: 2,
            title: "Imersão e Tensão",
            description:
              "Cria uma experiência visceral e contínua em cenas de ação.",
            details: 'Exemplo: "Filhos da Esperança" (2006)',
            image: "/images/filhosdaesperanca.jpg",
          },
          {
            id: 3,
            title: "Abertura Virtuosa",
            description:
              "Estabelece o ambiente e os personagens em um único take complexo.",
            details: 'Exemplo: "A Marca da Maldade" (1958)',
            image: "/images/amarcadamaldade.jpg",
          },
        ],
        slug: "plano-sequencia",
        influence: "Influência: André Bazin / Realismo",
        image: "/images/morfologia_planosequencia.jpg",
      },
      {
        id: 3,
        title: "Espetáculo e impacto sensorial",
        description:
          'O cinema de atrações, também conhecido como "cinema dos primórdios", foi a forma predominante de exibição nas suas primeiras décadas. Em vez de contar uma história, o objetivo era fascinar e chocar o público com o espetáculo visual, como a chegada de um trem na estação dos Irmãos Lumière ou os truques de câmera de Georges Méliès. O que importava era a "atração" em si.',
        mainImage: "/images/tomgunning.jpg",
        examples: [
          {
            id: 1,
            title: "Atração Visual",
            description: "Foco no impacto visual direto sobre o espectador.",
            details: "Primeiros filmes dos irmãos Lumière",
            image: "/images/irmaoslumiere.jpg",
          },
          {
            id: 2,
            title: "Cinema de Mágica",
            description:
              "Uso de truques de câmera para criar ilusões e espetáculos.",
            details: 'Exemplo: "Viagem à Lua" (1902) de Georges Méliès',
            image: "/images/viagemalua.jpg",
          },
          {
            id: 3,
            title: "O Espetáculo do Movimento",
            description:
              "Ênfase na exibição do movimento e em gags visuais de impacto.",
            details: "Exemplo: Filmes de perseguição do início do século",
            image: "/images/nosferatu.png",
          },
        ],
        slug: "cinema-de-atracoes",
        influence: "Influência: Tom Gunning / Cinema primitivo",
        image: "/images/morfologia_cinemaatracoes.jpg",
      },
    ];
  }

  public static physiologies() {
    return [
      {
        id: 1,
        title: "FISIOLOGIA DO SUSPENSE",
        influence: "Influência: Alfred Hitchcock / Psicologia do Medo",
        slug: "suspense",
        image: "/images/fisiologia_suspense.png",
        description:
          "Estudo dos mecanismos psicológicos e físicos do suspense cinematográfico.",
      },
      {
        id: 2,
        title: "FISIOLOGIA DO ÊXTASE",
        influence: "Influência: Gaspar Noé / Cinema Sensorial",
        slug: "extase",
        image: "/images/fisiologia_extase.png",
        description:
          "Análise das reações corporais e sensoriais provocadas pelo cinema.",
      },
      {
        id: 3,
        title: "FISIOLOGIA DO TERROR CORPORAL",
        influence: "Influência: David Cronenberg / Body Horror",
        slug: "terror-corporal",
        image: "/images/fisiologia_terror_corporal.png",
        description:
          "Investigação do horror visceral e suas manifestações físicas.",
      },
    ];
  }
}
