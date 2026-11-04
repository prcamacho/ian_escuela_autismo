// Cada cuento conserva su propio contenido; los controles son comunes.
const STORY_BOOKS = [{
  id: "el-ultimo-entrenador",
  title: "El último entrenador",
  author: "Juan Sasturain",
  illustrator: "Cucho Cuño",
  source: "Historias x leer · Ministerio de Educación · 2022",
  scenes: [
    { title: "Un cumpleaños", text: "Un hombre va al cumpleaños de una nena. Allí conoce al abuelo de la nena.", alt: "El abuelo junto a una mesa de cumpleaños con una torta y varios niños." },
    { title: "El abuelo fue entrenador", text: "El abuelo fue entrenador de fútbol. Preparaba a un equipo para jugar.", alt: "El entrenador joven, con una E en el pecho y una pelota bajo el pie.", clip: "entrenador-5s.mp4" },
    { title: "Fotos de hace muchos años", text: "El abuelo muestra fotos antiguas al visitante. En las fotos, el abuelo aparece cuando era joven.", alt: "El abuelo señala una fotografía de su antiguo equipo." },
    { title: "Falta su nombre", text: "El entrenador aparece en las fotos del equipo. Su nombre no está escrito junto a los nombres de los jugadores.", alt: "El abuelo señala los nombres debajo de una fotografía." },
    { title: "Su trabajo cambió", text: "El abuelo cuenta que su trabajo cambió con los años. Él prefiere cómo trabajaba antes.", alt: "El entrenador joven con su equipo y el dibujo de una cancha." },
    { title: "La hija lo llama", text: "La hija del abuelo entra al cuarto e interrumpe la charla.", alt: "La hija entra al cuarto mientras el abuelo la mira." },
    { title: "La charla termina", text: "El abuelo se despide del visitante. Su hija lo acompaña fuera del cuarto.", alt: "La hija toma de la mano al abuelo y lo acompaña hacia la puerta." },
    { title: "Un recuerdo del entrenador", text: "El visitante guarda las revistas y se va. Se queda pensando en la historia del entrenador.", alt: "Fotos antiguas junto a la ventana; al fondo se ve al abuelo en el patio." }
  ],
  helps: {
    ages: { title: "Antes y ahora", text: "Es el mismo hombre en dos momentos de su vida. Antes era un entrenador joven. Ahora es el abuelo de la nena." },
    photo: { title: "La foto", text: "El entrenador aparece en la foto del equipo. Su nombre falta en la lista de nombres. Cuando dice que no está, habla de su nombre." }
  }
}, {
  id: "carnaval-en-el-zoo",
  title: "Carnaval en el zoo",
  author: "Fabián Sevilla",
  illustrator: "Mariano Epelbaum",
  source: "Historias x leer · Ministerio de Educación · 2022",
  scenes: [
    { title: "Un zoo aburrido", text: "Los animales del zoo están aburridos. Muchos pasan el día bostezando.", alt: "Una familia mira a los animales del zoo: un mono descansa y otros animales están quietos." },
    { title: "El león propone una fiesta", text: "El león propone una fiesta de disfraces. Los monos invitan a los demás animales.", alt: "El león habla con los monos para organizar una fiesta." },
    { title: "Los disfraces", text: "Los animales se disfrazan de otros animales. El león usa un disfraz de búho.", alt: "El león lleva plumas de búho sobre su cuerpo de león." },
    { title: "Todos bailan", text: "El papagayo pone música. Los animales bailan con sus disfraces.", alt: "El papagayo disfrazado de puma pone música junto a un parlante." },
    { title: "Hay premios", text: "El león entrega premios. El hipopótamo gana con su disfraz de colibrí.", alt: "En esta historia de fantasía, el hipopótamo vuela con un disfraz de colibrí." },
    { title: "Siguen disfrazados", text: "Después de la fiesta, los animales siguen usando sus disfraces. Vuelven así a sus lugares del zoo.", alt: "Los animales regresan por los caminos del zoo con sus disfraces puestos." },
    { title: "Los visitantes dejan de ir", text: "A los visitantes no les gusta ver a los animales disfrazados. Dejan de ir al zoo.", alt: "Dos visitantes miran a los animales disfrazados; uno tiene un gesto de desagrado." },
    { title: "La fiesta termina", text: "Los animales se quitan los disfraces. Piensan qué disfraz usarán en el próximo Carnaval.", alt: "El león y otros animales vuelven a verse sin disfraces." }
  ],
  helps: {
    costume: {
      title: "El mismo león",
      tab: "El disfraz",
      kicker: "EL DISFRAZ ES ROPA",
      text: "El león usa un disfraz de búho. Debajo del disfraz sigue siendo el mismo león.",
      images: [
        { file:"leon.jpg", alt:"El león sin disfraz", label:"SIN DISFRAZ", caption:"Es un león" },
        { file:"leon-disfrazado.jpg", alt:"El mismo león con un disfraz de búho", label:"CON DISFRAZ", caption:"Sigue siendo un león" }
      ]
    },
    fantasy: {
      title: "Solo en el cuento",
      tab: "En el cuento",
      kicker: "ES UNA HISTORIA DE FANTASÍA",
      text: "En el cuento, el hipopótamo vuela con su disfraz de colibrí. Los hipopótamos reales no vuelan.",
      images: [{ file:"scene-05.jpg", alt:"El hipopótamo volador de esta historia de fantasía" }]
    }
  }
}, {
  id: "ratita-gris-y-ratita-azul",
  title: "Ratita Gris y Ratita Azul",
  author: "Edith Vera",
  illustrator: "Eleonora Arroyo",
  source: "Historias x leer · Secretaría de Educación · 2024",
  scenes: [
    { title: "Un regalo para su amiga", text: "Ratita Gris lleva un huevo para regalar a Ratita Azul. Lo tomó de una gorriona.", alt: "Ratita Gris toma un huevo junto al nido; la gorriona está en otra rama." },
    { title: "La visita", text: "Las amigas charlan y se ríen. Ratita Azul comparte queso y agua.", alt: "Ratita Gris y Ratita Azul conversan entre las plantas." },
    { title: "La canasta", text: "Ratita Gris le entrega la canasta a Ratita Azul. Una servilleta tapa el regalo.", alt: "Ratita Gris ofrece una canasta cubierta con una servilleta a cuadros; Ratita Azul extiende las manos." },
    { title: "Ven cosas distintas", text: "Ratita Gris cree que hay un huevo. Ratita Azul ve un pichón.", alt: "Ratita Gris habla mientras Ratita Azul mira dentro de la canasta." },
    { title: "Ratita Gris se va", text: "Ratita Gris se despide y se va por el maizal. Ratita Azul se queda con la canasta.", alt: "Ratita Gris se aleja entre las plantas de maíz." },
    { title: "Nació un pichón", text: "El pichón salió del huevo mientras las amigas charlaban. Ratita Azul lo sostiene con cuidado.", alt: "Ratita Azul sostiene al pichón recién nacido en sus manos." },
    { title: "Con su mamá", text: "Ratita Azul lleva al pichón con su mamá. Su mamá es la gorriona.", alt: "Ratita Azul recorre el maizal para llevar al pichón con la gorriona." },
    { title: "Ratita Azul vuelve contenta", text: "Ratita Azul vuelve contenta a su casa. Se pone una flor detrás de la oreja.", alt: "Ratita Azul camina con una flor amarilla detrás de la oreja." }
  ],
  helps: {
    friends: {
      title: "Las dos ratitas",
      tab: "Las ratitas",
      kicker: "SON DOS AMIGAS",
      text: "Ratita Gris lleva el regalo. Ratita Azul recibe la canasta y ayuda al pichón.",
      images: [
        { file:"ratita-gris.jpg", alt:"Ratita Gris", label:"GRIS", caption:"Lleva el regalo" },
        { file:"ratita-azul.jpg", alt:"Ratita Azul", label:"AZUL", caption:"Ayuda al pichón" }
      ]
    },
    egg: {
      title: "Del huevo al pichón",
      tab: "El huevo",
      kicker: "EL PICHÓN SALE DEL HUEVO",
      text: "El pichón estaba dentro del huevo. Rompió la cáscara y salió. Un pichón es un pájaro recién nacido.",
      images: [
        { file:"huevo.jpg", alt:"El huevo con pintitas que tomó Ratita Gris", label:"ANTES", caption:"Un huevo" },
        { file:"pichon.jpg", alt:"El pichón recién nacido", label:"DESPUÉS", caption:"Sale el pichón" }
      ]
    }
  }
}, {
  id: "mocho-y-el-espantapajaros",
  title: "Mocho y el espantapájaros",
  author: "Álvaro Yunque",
  illustrator: "María Jesús Álvarez",
  source: "Historias x leer · Secretaría de Educación · 2024",
  scenes: [
    { title: "Una torta para la tía", text: "Tula lleva una torta a su tía. Le pide a Mocho que la acompañe porque tiene miedo al espantapájaros.", alt: "Tula sostiene una torta y le habla a Mocho." },
    { title: "Caminan juntos", text: "Tula y Mocho caminan juntos. Mocho dice que el espantapájaros es un muñeco que no camina.", alt: "Tula y Mocho caminan por un sendero del campo." },
    { title: "El sombrero", text: "Mocho molesta al espantapájaros. Le tira piedras y le quita el sombrero.", alt: "Mocho está junto al espantapájaros." },
    { title: "Devuelve el sombrero", text: "Los amigos entregan la torta a la tía. Al volver, Mocho pone el sombrero en el espantapájaros.", alt: "El espantapájaros tiene otra vez su sombrero puesto." },
    { title: "En el sueño de Mocho", text: "Mocho está dormido y tiene una pesadilla. Sueña que el espantapájaros lo persigue.", alt: "En la pesadilla de Mocho, el espantapájaros parece caminar hacia él." },
    { title: "Mocho se despierta", text: "Mocho llama a su mamá y se despierta. El espantapájaros que caminaba era parte del sueño.", alt: "Mocho está junto a su cama; su mamá se acerca para acompañarlo." },
    { title: "Su mamá lo acompaña", text: "Su mamá lo abraza y lo acompaña. Mocho se siente seguro y vuelve a dormir.", alt: "La mamá abraza a Mocho junto a su cama." },
    { title: "Al día siguiente", text: "Al día siguiente, el espantapájaros sigue quieto. Mocho pasa sin burlarse ni tirarle piedras.", alt: "Mocho pasa por el camino de día y el espantapájaros está quieto en el campo." }
  ],
  helps: {
    figure: {
      title: "¿Qué es un espantapájaros?",
      tab: "El muñeco",
      kicker: "UN MUÑECO DEL CAMPO",
      text: "Un espantapájaros es un muñeco hecho con palos y ropa. Se coloca en el campo para espantar a los pájaros. No camina solo.",
      images: [{ file:"espantapajaros.jpg", alt:"El espantapájaros quieto, con sombrero y ropa de colores" }]
    },
    dream: {
      title: "Fue una pesadilla",
      tab: "El sueño",
      kicker: "MOCHO ESTABA DORMIDO",
      text: "Una pesadilla es un sueño que da miedo. El espantapájaros caminaba en el sueño de Mocho. Al despertar, Mocho estaba en su casa.",
      images: [{ file:"mama.jpg", alt:"Mocho está despierto en su casa, acompañado por su mamá" }]
    }
  }
}, {
  id: "la-vuelta-al-mundo",
  title: "La vuelta al mundo",
  author: "Javier Villafañe",
  illustrator: "Estrellita Caracol",
  source: "Historias x leer · Ministerio de Educación · 2022",
  scenes: [
    { title: "Santiago sale de casa", text: "Santiago sale de casa en su triciclo. Juega a dar la vuelta al mundo.", alt: "Santiago sale en triciclo por la vereda de su barrio." },
    { title: "El perro y el gato", text: "Un perro y un gato quieren acompañarlo. Santiago los invita a ir con él.", alt: "El perro y el gato van detrás de Santiago y su triciclo." },
    { title: "Se suman más animales", text: "Se suman más animales al paseo. Todos van detrás del triciclo.", alt: "Muchos animales siguen a Santiago formando una fila." },
    { title: "El charco", text: "Santiago frena junto a un charco. Imagina que el charco es un río.", alt: "La ilustración muestra el río y el barco que Santiago imagina al mirar un charco." },
    { title: "Miran un molino", text: "Todos se detienen a mirar un molino. Las aspas están quietas porque no hay viento.", alt: "Un molino con las aspas quietas; a su lado se ve la jirafa." },
    { title: "La jirafa ayuda", text: "La hormiga no alcanza a ver el molino. La jirafa la ayuda a subir hasta su cabeza.", alt: "La hormiga está sobre la cabeza de la jirafa, junto al molino." },
    { title: "La hormiga puede ver", text: "La hormiga mira el molino desde lo alto. Después la jirafa la baja al suelo.", alt: "La hormiga mira desde la cabeza de la jirafa." },
    { title: "De vuelta en casa", text: "Santiago vuelve a su casa y se despide de los animales. Dio la vuelta a la manzana.", alt: "La casa de Santiago y su habitación detrás de la ventana." }
  ],
  helps: {
    block: {
      title: "La vuelta a la manzana",
      tab: "El recorrido",
      kicker: "SALE Y VUELVE AL MISMO LUGAR",
      text: "Santiago da la vuelta a la manzana. Recorre las calles alrededor de un grupo de casas y vuelve a su casa.",
      images: [{ file:"manzana.svg", alt:"Un dibujo del recorrido que rodea un grupo de casas y vuelve al punto de partida" }]
    },
    giraffe: {
      title: "La jirafa ayuda a la hormiga",
      tab: "La ayuda",
      kicker: "AHORA PUEDE VER EL MOLINO",
      text: "La hormiga es pequeña y no alcanza a ver el molino. La jirafa la sube a su cabeza para que pueda verlo.",
      images: [{ file:"jirafa-hormiga.jpg", alt:"La hormiga sobre la cabeza de la jirafa" }]
    }
  }
}, {
  id: "la-casa-del-arbol",
  title: "La casa del árbol",
  author: "Iris Rivera",
  illustrator: "Mónica Weiss",
  source: "Historias x leer · Ministerio de Educación · 2022",
  scenes: [
    { title: "Fernando cuenta su historia", text: "Fernando tiene que quedarse en un rincón. Ese día no puede ver dibujos animados.", alt: "Fernando está en un rincón, junto a una pared." },
    { title: "Un pino pequeño", text: "Su papá plantó un pino pequeño. Fernando y sus tres amigos quieren una casa cuando el árbol sea grande.", alt: "El pino es pequeño y llega a la altura de las rodillas." },
    { title: "Preparan los materiales", text: "Los amigos juntan maderas y guardan clavos. Fernando dibuja un plano para la casa.", alt: "Los cuatro amigos reúnen y acomodan materiales en el terreno." },
    { title: "El dibujo y el enojo", text: "Su hermana raya los planos. Fernando se enoja y le esconde una muñeca.", alt: "La hermana pequeña dibuja sobre los papeles de Fernando." },
    { title: "La casa que imaginan", text: "Imaginan una casa con escalera, techo y puerta. Quieren jugar y descansar adentro.", alt: "Así imaginan los chicos el interior de su futura casa; todavía no está construida." },
    { title: "Muchos baldes de agua", text: "Le echan muchos baldes de agua al pino. Quieren verlo crecer para construir la casa.", alt: "Los chicos se pasan baldes de agua desde el tanque de la casa." },
    { title: "El tanque queda vacío", text: "Los chicos vacían el tanque de agua de la casa. Por eso también castigaron a Fernando.", alt: "El tanque de agua y los baldes que usan los chicos." },
    { title: "La casa sigue siendo un plan", text: "El pino todavía es pequeño. La casa del árbol todavía no está construida.", alt: "El pino pequeño que todavía no puede sostener la casa que imaginan." }
  ],
  helps: {
    pine: {
      title: "El pino y el plan",
      tab: "Hoy y en el plan",
      kicker: "LA CASA TODAVÍA NO ESTÁ HECHA",
      text: "En el cuento, el pino sigue pequeño. La casa grande aparece en los planes de los chicos.",
      images: [
        { file:"pino.jpg", alt:"El pino pequeño del terreno", label:"HOY", caption:"Un pino pequeño" },
        { file:"casa-imaginada.jpg", alt:"La casa en el árbol que imaginan los chicos", label:"EN EL PLAN", caption:"Una casa en el árbol" }
      ]
    },
    tank: {
      title: "El tanque de agua",
      tab: "El agua",
      kicker: "GUARDA EL AGUA DE LA CASA",
      text: "El tanque guarda el agua de la casa. Los chicos sacaron esa agua en baldes para regar el pino.",
      images: [{ file:"tanque.jpg", alt:"El tanque del que los chicos sacan agua en baldes" }]
    }
  }
}, {
  id: "una-noche-de-muchos-dias",
  title: "Una noche de muchos días",
  author: "Pilar Muñoz Lascano",
  illustrator: "Sol Cófreces",
  source: "Historias x leer · Ministerio de Educación · 2023",
  scenes: [
    { title: "Una aldea feliz", text: "Esta es una historia de fantasía. En una aldea, las personas trabajan y los niños juegan.", alt: "Las casas de la aldea entre los árboles y el campo verde." },
    { title: "Llega un dragón", text: "Un dragón tapa el sol y quema las plantas con su fuego. Las personas tienen miedo y huyen.", alt: "El dragón vuela y oscurece el cielo del cuento." },
    { title: "Se refugian en una cueva", text: "Se esconden en una cueva de la montaña. Pasan varios días con poca comida y agua.", alt: "Las personas están juntas dentro de una cueva en la montaña." },
    { title: "Empiezan a contar historias", text: "Un niño cuenta lo que le pasó. Después, otras personas cuentan historias mientras esperan en la cueva.", alt: "Un niño cuenta una historia; las cintas azules representan su voz." },
    { title: "El dragón llega a la cueva", text: "El dragón se queda en la entrada de la cueva. Las personas ya no pueden salir a buscar agua.", alt: "El dragón está acostado cerca de la entrada de la cueva." },
    { title: "Un ruido fuerte", text: "Oyen un ruido fuerte y la cueva tiembla. Salen, mientras una mujer sigue contando una historia.", alt: "La mujer continúa contando una historia al salir de la cueva." },
    { title: "El dragón está dormido", text: "Descubren que el dragón está dormido y ronca. En este cuento, las historias lo hacen dormir.", alt: "El dragón duerme; las letras dibujadas representan sus ronquidos." },
    { title: "Vuelven a la aldea", text: "Las personas vuelven a su aldea. Se turnan para contar historias junto al dragón y mantenerlo dormido.", alt: "Un niño cuenta una historia; las cintas azules dibujadas representan su voz." }
  ],
  helps: {
    dragon: {
      title: "Un personaje de fantasía",
      tab: "El dragón",
      kicker: "ES PARTE DEL CUENTO",
      text: "El dragón es un personaje de fantasía. En esta historia, se duerme al escuchar cuentos. Los dragones no son animales reales.",
      images: [{ file:"dragon.jpg", alt:"El dragón de esta historia de fantasía, con alas y una cola larga" }]
    },
    noise: {
      title: "El ruido eran sus ronquidos",
      tab: "El ruido",
      kicker: "EL DRAGÓN ESTÁ DORMIDO",
      text: "El ruido fuerte venía del dragón dormido. Eran sus ronquidos. Las cintas azules del dibujo representan la voz que cuenta una historia.",
      images: [{ file:"dragon-dormido.jpg", alt:"El dragón duerme, con letras que muestran sus ronquidos y cintas azules que representan la voz" }]
    }
  }
}];
