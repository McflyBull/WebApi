import { Film } from "../../entities/Film";
import { AppDataSource } from "../data-source";

export const seedFilms = async () => {
  const filmRepository = AppDataSource.getRepository(Film);

  // Limpiar usando SQL directo
  await filmRepository.query("SET FOREIGN_KEY_CHECKS = 0");
  await filmRepository.query("TRUNCATE TABLE film");
  await filmRepository.query("SET FOREIGN_KEY_CHECKS = 1");

  const films = [
    {
      title: "Moana 2",
      overview:
        "Tras recibir una inesperada llamada de sus antepasados, Vaiana debe viajar a los lejanos mares de Oceanía y adentrarse en peligrosas aguas perdidas para vivir una aventura sin precedentes.",
      backdrop_path: "https://image.tmdb.org/t/p/w500/tElnmtQ6yz1PjN1kePNl8yMSb59.jpg",
      poster_path: "https://image.tmdb.org/t/p/w500/fY3GzGhhsc6TwopDvNbCYIDNgvs.jpg",
      release_date: "2024-11-27",
      genres: ["Animación", "Aventura", "Familia", "Comedia"],
      runtime: 105,
    },
    {
      title: "Venom: El último baile",
      overview:
        "Eddie y Venom están a la fuga. Perseguidos por sus sendos mundos y cada vez más cercados, el dúo se ve abocado a tomar una decisión devastadora que hará que caiga el telón sobre el último baile de Venom y Eddie.",
      backdrop_path: "https://image.tmdb.org/t/p/w500/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg",
      poster_path: "https://image.tmdb.org/t/p/w500/b0obWWCLRVRqRzlSK1LSGtADkLM.jpg",
      release_date: "2024-10-22",
      genres: ["Ciencia ficción", "Acción", "Aventura"],
      runtime: 115,
    },
    {
      title: "Elevation",
      overview: "",
      backdrop_path: "https://image.tmdb.org/t/p/w500/au3o84ub27qTZiMiEc9UYzN74V3.jpg",
      poster_path: "https://image.tmdb.org/t/p/w500/uQhYBxOVFU6s9agD49FnGHwJqG5.jpg",
      release_date: "2024-11-07",
      genres: ["Acción", "Ciencia ficción", "Suspense"],
      runtime: 98,
    },
    {
      title: "Absolution",
      overview:
        "Un curtido y peligroso gangster (Liam Neeson) descubre que está empezando a perder la memoria. Decidido a enmendar las cosas con su hija y rectificar los errores del pasado, antes de que sea demasiado tarde intentará hacer lo que sea para redimirse. Pero las garras del mundo criminal no lo soltarán tan fácilmente y se verá obligado a enfrentarse a la organización para la que lleva más de 20 años trabajando.",
      backdrop_path: "https://image.tmdb.org/t/p/w500/6lE2e6j8qbtQR8aHxQNJlwxdmKV.jpg",
      poster_path: "https://image.tmdb.org/t/p/w500/cNtAslrDhk1i3IOZ16vF7df6lMy.jpg",
      release_date: "2024-10-31",
      genres: ["Acción", "Crimen", "Suspense"],
      runtime: 112,
    },
    {
      title: "Armor",
      overview: "",
      backdrop_path: "https://image.tmdb.org/t/p/w500/evFChfYeD2LqobEJf8iQsrYcGTw.jpg",
      poster_path: "https://image.tmdb.org/t/p/w500/pnXLFioDeftqjlCVlRmXvIdMsdP.jpg",
      release_date: "2024-10-30",
      genres: ["Acción", "Crimen", "Suspense"],
      runtime: 95,
    },
    {
      title: "Sidelined: The QB and Me",
      overview:
        "Dallas, una bailarina tenaz pero con problemas, está decidida a entrar en la mejor escuela de baile del país, la escuela de su difunta madre. Sin embargo, ese sueño se ve truncado de repente cuando Drayton, la estrella del fútbol americano, irrumpe en su vida con una historia única. ¿Podrán los dos hacer realidad sus sueños juntos o sus sueños quedarán en el olvido?",
      backdrop_path: "https://image.tmdb.org/t/p/w500/h3fwlwHotd3JfV13HdW0mxDcxPD.jpg",
      poster_path: "https://image.tmdb.org/t/p/w500/sIWv5HtDlUFvacsuA1fRNWZ5GFH.jpg",
      release_date: "2024-11-29",
      genres: ["Comedia", "Romance", "Película de TV"],
      runtime: 93,
    },
    {
      title: "Gladiator II",
      overview:
        "Años después de presenciar la muerte del admirado héroe Máximo a manos de su tío, Lucio se ve forzado a entrar en el Coliseo tras ser testigo de la conquista de su hogar por parte de los tiránicos emperadores que dirigen Roma con puño de hierro. Con un corazón desbordante de furia y el futuro del imperio en juego, Lucio debe rememorar su pasado en busca de la fuerza y el honor que devuelvan al pueblo la gloria perdida de Roma.",
      backdrop_path: "https://image.tmdb.org/t/p/w500/euYIwmwkmz95mnXvufEmbL6ovhZ.jpg",
      poster_path: "https://image.tmdb.org/t/p/w500/vK1sK1B3WglfgVWPn6Xj4nNsw1q.jpg",
      release_date: "2024-11-13",
      genres: ["Acción", "Aventura", "Historia"],
      runtime: 120,
    },
    {
      title: "Robot salvaje",
      overview:
        "El épico viaje de un robot -la unidad 7134 de Roz,'Roz' para abreviar- que naufraga en una isla deshabitada y debe aprender a adaptarse al duro entorno, entablando gradualmente relaciones con los animales de la isla y convirtiéndose en padre adoptivo de un pequeño ganso huérfano.",
      backdrop_path: "https://image.tmdb.org/t/p/w500/mQZJoIhTEkNhCYAqcHrQqhENLdu.jpg",
      poster_path: "https://image.tmdb.org/t/p/w500/a0a7RC01aTa7pOnskgJb3mCD2Ba.jpg",
      release_date: "2024-09-12",
      genres: ["Animación", "Ciencia ficción", "Familia"],
      runtime: 102,
    },
    {
      title: "Smile 2",
      overview:
        "La estrella del pop mundial Skye Riley está a punto de embarcarse en una nueva gira mundial cuando empieza a experimentar una serie de sucesos cada vez más aterradores e inexplicables. Angustiada por la espiral de horrores y la abrumadora presión de la fama, Skye tendrá que enfrentarse a su oscuro pasado para recuperar el control de su vida antes de que sea demasiado tarde. Secuela del exitoso film de terror 'Smile' (2022).",
      backdrop_path: "https://image.tmdb.org/t/p/w500/iR79ciqhtaZ9BE7YFA1HpCHQgX4.jpg",
      poster_path: "https://image.tmdb.org/t/p/w500/mvoODLydq9vB4ikflyHaNVsAfKj.jpg",
      release_date: "2024-10-16",
      genres: ["Terror", "Misterio"],
      runtime: 108,
    },
    {
      title: "Wicked",
      overview:
        "Ambientada en la Tierra de Oz, mucho antes de la llegada de Dorothy Gale desde Kansas, la trama abarca los acontecimientos del primer acto del musical de Broadway. Elphaba es una joven incomprendida por su inusual color verde que aún no ha descubierto su verdadero poder. Glinda es una popular joven marcada por sus privilegios y su ambición que aún no ha descubierto su verdadera pasión. Las dos se conocen como estudiantes de la Universidad Shiz, en la fantástica Tierra de Oz, y forjan una insólita pero profunda amistad.",
      backdrop_path: "https://image.tmdb.org/t/p/w500/uKb22E0nlzr914bA9KyA5CVCOlV.jpg",
      poster_path: "https://image.tmdb.org/t/p/w500/q1czoLwMaiUO1bznWuETCP5ueZj.jpg",
      release_date: "2024-11-20",
      genres: ["Drama", "Fantasía", "Romance"],
      runtime: 117,
    },
    {
      title: "Watchmen: Chapter II",
      overview: "",
      backdrop_path: "https://image.tmdb.org/t/p/w500/fSSCsemHjUJzLrr3Trp72Oa5Dj0.jpg",
      poster_path: "https://image.tmdb.org/t/p/w500/4rBObJFpiWJOG7aIlRrOUniAkBs.jpg",
      release_date: "2024-11-25",
      genres: ["Animación", "Misterio", "Ciencia ficción", "Acción"],
      runtime: 110,
    },
    {
      title: "GTMAX",
      overview:
        "Cuando una conocida banda de moteros reclutan a su hermano para un robo, una ex campeona de motocross debe enfrentarse a sus miedos más profundos para mantener a su familia a salvo.",
      backdrop_path: "https://image.tmdb.org/t/p/w500/liuBLPXvisMRo5w2JEKHXceWq5u.jpg",
      poster_path: "https://image.tmdb.org/t/p/w500/bx92hl70NUhojjO3eV6LqKllj4L.jpg",
      release_date: "2024-11-19",
      genres: ["Acción", "Crimen", "Drama"],
      runtime: 96,
    },
    {
      title: "Terrifier 3",
      overview:
        "El payaso Art desata el caos entre los desprevenidos habitantes del condado de Miles mientras duermen plácidamente en Nochebuena. Tras sobrevivir a la masacre de Halloween perpetrada por el peor asesino en serie desde Jack el Destripador, Sienna y su hermano se esfuerzan por reconstruir sus vidas destrozadas. A medida que se acercan las fiestas de Navidad, intentan abrazar el espíritu navideño y dejar atrás los horrores del pasado. Pero justo cuando creen que están a salvo, el payaso Art regresa, decidido a convertir su alegría navideña en una nueva pesadilla. La temporada festiva se desmorona rápidamente mientras el payaso Art desata su retorcido terror marca de la casa, demostrando que ninguna festividad es segura.",
      backdrop_path: "https://image.tmdb.org/t/p/w500/18TSJF1WLA4CkymvVUcKDBwUJ9F.jpg",
      poster_path: "https://image.tmdb.org/t/p/w500/iaGfB2itLC8exBvfLUoadS0Q6tP.jpg",
      release_date: "2024-10-09",
      genres: ["Terror", "Suspense"],
      runtime: 103,
    },
    {
      title: "La sustancia",
      overview:
        '"Tú, pero mejor en todos los sentidos". Esa es la promesa de la sustancia, un producto revolucionario basado en la división celular, que crea un alter ego más joven, más bello, más perfecto.',
      backdrop_path: "https://image.tmdb.org/t/p/w500/7h6TqPB3ESmjuVbxCxAeB1c9OB1.jpg",
      poster_path: "https://image.tmdb.org/t/p/w500/cQD1qEnPOKUPHAui0okOLZSgitu.jpg",
      release_date: "2024-09-07",
      genres: ["Terror", "Ciencia ficción", "Suspense"],
      runtime: 99,
    },
    {
      title: "Red One",
      overview:
        "Tras el secuestro de Papá Noel (nombre en clave: RED ONE), el Jefe de Seguridad del Polo Norte (Dwayne Johnson) debe formar equipo con el cazarrecompensas más infame del mundo (Chris Evans) en una misión trotamundos llena de acción para salvar la Navidad.",
      backdrop_path: "https://image.tmdb.org/t/p/w500/rOmUuQEZfPXglwFs5ELLLUDKodL.jpg",
      poster_path: "https://image.tmdb.org/t/p/w500/dpskAcm71w5v8zQ8RmPmJiP31Om.jpg",
      release_date: "2024-10-31",
      genres: ["Acción", "Comedia", "Fantasía"],
      runtime: 107,
    },
    {
      title: "Levels",
      overview: "",
      backdrop_path: "https://image.tmdb.org/t/p/w500/kwXycPsLA6SV3KUOagn343TtMOf.jpg",
      poster_path: "https://image.tmdb.org/t/p/w500/y1xm0jMIlx9Oo2a3jWNyLGm43sJ.jpg",
      release_date: "2024-11-01",
      genres: ["Acción", "Ciencia ficción", "Suspense"],
      runtime: 94,
    },
    {
      title: "Hechizados",
      overview:
        "Cuando un poderoso hechizo transforma a sus padres en unos monstruos gigantes, una joven princesa debe adentrarse en la naturaleza para romper la maldición antes de que sea tarde.",
      backdrop_path: "https://image.tmdb.org/t/p/w500/n4ycOGj2tRLfINTJQ3wl0vNYqpR.jpg",
      poster_path: "https://image.tmdb.org/t/p/w500/g4oArI4RmOnSDZzQbdbAm3yLNkC.jpg",
      release_date: "2024-11-22",
      genres: ["Animación", "Fantasía", "Familia", "Aventura", "Comedia"],
      runtime: 101,
    },
    {
      title: "Pídeme lo que quieras",
      overview:
        "Judith Flores es una chica normal. Tiene un trabajo que le apasiona, muy buenos amigos y un padre encantador. Pero su vida cambia radicalmente cuando conoce a Eric Zimmerman, dueño de la empresa donde ella trabaja. Su relación con Eric está a punto de dinamitar su vida por completo.",
      backdrop_path: "https://image.tmdb.org/t/p/w500",
      poster_path: "https://image.tmdb.org/t/p/w500/76qnVxU2rPdVvipBN3DPQH6fVYB.jpg",
      release_date: "2024-11-29",
      genres: ["Romance", "Drama"],
      runtime: 113,
    },
    {
      title: "Dear Santa",
      overview:
        "Un niño que, al escribir su nota anual a Papá Noel, mezcla las cartas y, en cambio, se las envía a Satanás.",
      backdrop_path: "https://image.tmdb.org/t/p/w500",
      poster_path: "https://image.tmdb.org/t/p/w500/axxggOMYNyKDsNVMnyMTnvrGByX.jpg",
      release_date: "2024-11-24",
      genres: ["Comedia", "Familia"],
      runtime: 92,
    },
    {
      title: "Nuestro secretito",
      overview:
        "Dos ex resentidos se ven obligados a pasar la Navidad bajo el mismo techo tras descubrir que sus parejas actuales son hermanos.",
      backdrop_path: "https://image.tmdb.org/t/p/w500/a5OqX7uXb8MI0WB3HbCyA0Wn3gI.jpg",
      poster_path: "https://image.tmdb.org/t/p/w500/nhcSZTzQ4euUYvuiFVvyINnhAV4.jpg",
      release_date: "2024-11-27",
      genres: ["Romance", "Comedia"],
      runtime: 90,
    },
    {
      title: "Elevation",
      overview: "",
      backdrop_path: "https://image.tmdb.org/t/p/w500/au3o84ub27qTZiMiEc9UYzN74V3.jpg",
      poster_path: "https://image.tmdb.org/t/p/w500/uQhYBxOVFU6s9agD49FnGHwJqG5.jpg",
      release_date: "2024-11-07",
      is_upcoming: true,
      genres: ["Acción", "Ciencia ficción", "Suspense"],
      runtime: 98,
    },
    {
      title: "Absolution",
      overview:
        "Un curtido y peligroso gangster (Liam Neeson) descubre que está empezando a perder la memoria. Decidido a enmendar las cosas con su hija y rectificar los errores del pasado, antes de que sea demasiado tarde intentará hacer lo que sea para redimirse. Pero las garras del mundo criminal no lo soltarán tan fácilmente y se verá obligado a enfrentarse a la organización para la que lleva más de 20 años trabajando.",
      backdrop_path: "https://image.tmdb.org/t/p/w500/6lE2e6j8qbtQR8aHxQNJlwxdmKV.jpg",
      poster_path: "https://image.tmdb.org/t/p/w500/cNtAslrDhk1i3IOZ16vF7df6lMy.jpg",
      release_date: "2024-10-31",
      is_upcoming: true,
      genres: ["Acción", "Crimen", "Suspense"],
      runtime: 112,
    },
    {
      title: "Wicked",
      overview:
        "Ambientada en la Tierra de Oz, mucho antes de la llegada de Dorothy Gale desde Kansas, la trama abarca los acontecimientos del primer acto del musical de Broadway. Elphaba es una joven incomprendida por su inusual color verde que aún no ha descubierto su verdadero poder. Glinda es una popular joven marcada por sus privilegios y su ambición que aún no ha descubierto su verdadera pasión. Las dos se conocen como estudiantes de la Universidad Shiz, en la fantástica Tierra de Oz, y forjan una insólita pero profunda amistad.",
      backdrop_path: "https://image.tmdb.org/t/p/w500/uKb22E0nlzr914bA9KyA5CVCOlV.jpg",
      poster_path: "https://image.tmdb.org/t/p/w500/q1czoLwMaiUO1bznWuETCP5ueZj.jpg",
      release_date: "2024-11-20",
      is_upcoming: true,
      genres: ["Drama", "Fantasía", "Romance"],
      runtime: 117,
    },
    {
      title: "La sustancia",
      overview:
        '"Tú, pero mejor en todos los sentidos". Esa es la promesa de la sustancia, un producto revolucionario basado en la división celular, que crea un alter ego más joven, más bello, más perfecto.',
      backdrop_path: "https://image.tmdb.org/t/p/w500/7h6TqPB3ESmjuVbxCxAeB1c9OB1.jpg",
      poster_path: "https://image.tmdb.org/t/p/w500/cQD1qEnPOKUPHAui0okOLZSgitu.jpg",
      release_date: "2024-09-07",
      is_upcoming: true,
      genres: ["Terror", "Ciencia ficción", "Suspense"],
      runtime: 99,
    },
    {
      title: "Vivir el momento",
      overview:
        "Almut y Tobias se conocen en un encuentro inesperado que cambia sus vidas. A través de pasajes de su vida en común −se enamoran, construyen un hogar, forman una familia− se nos revela una difícil verdad que amenaza con sacudir sus cimientos. A medida que emprenden un camino que los límites del tiempo desafían, los protagonistas aprenderán a apreciar cada momento del inusual camino que ha tomado su historia de amor, que abarca una década.",
      backdrop_path: "https://image.tmdb.org/t/p/w500/4t8IXJF4umwCfbdpeKLvlN3zkKp.jpg",
      poster_path: "https://image.tmdb.org/t/p/w500/884a989T00m3pWs42D2cdJt0Cnb.jpg",
      release_date: "2024-10-10",
      is_upcoming: true,
      genres: ["Drama"],
      runtime: 95,
    },
    {
      title: "El conde de Montecristo",
      overview:
        "Todos los sueños del joven Edmundo Dantès están a punto de hacerse realidad, y por fin podrá casarse con el amor de su vida, Mercedes. Pero su éxito inspira la envidia desde varios frentes. Traicionado por sus rivales y denunciado como miembro de una conspiración pro-Bonaparte, es encarcelado sin juicio en el Château d'If. Su compañero de prisión, Abbé Faria, le habla del legendario tesoro escondido en la isla de Montecristo, y Dantés sueña con escapar y urdir un plan extraordinario para vengarse de sus poderosos enemigos.",
      backdrop_path: "https://image.tmdb.org/t/p/w500/llIXQAndg5kB6SWlp6ouUdO7Zxd.jpg",
      poster_path: "https://image.tmdb.org/t/p/w500/r2PGzaGA7bgcuy6PX7nx0BfDYsK.jpg",
      release_date: "2024-06-28",
      is_upcoming: true,
      genres: ["Acción", "Aventura", "Drama", "Historia", "Romance", "Suspense"],
      runtime: 118,
    },
    {
      title: "Conclave",
      overview:
        "Tras la inesperada muerte del Sumo Pontífice, el cardenal Lawrence es designado como responsable para liderar uno de los rituales más secretos y antiguos del mundo: la elección de un nuevo Papa. Cuando los líderes más poderosos de la Iglesia Católica se reúnen en los salones del Vaticano, Lawrence se ve atrapado dentro de una compleja conspiración a la vez que descubre un secreto que podría sacudir los cimientos de la Iglesia.",
      backdrop_path: "https://image.tmdb.org/t/p/w500/eZzNdjNDvaSoyywy9ICg2UmFwul.jpg",
      poster_path: "https://image.tmdb.org/t/p/w500/ftIJ42zwuFvUFVEWZQbFq1vcV5U.jpg",
      release_date: "2024-10-25",
      is_upcoming: true,
      genres: ["Suspense", "Drama"],
      runtime: 106,
    },
    {
      title: "Kraven the Hunter",
      overview:
        "El inmigrante ruso Sergei Kravinoff está en una misión para demostrar que es el mejor cazador del mundo.",
      backdrop_path: "https://image.tmdb.org/t/p/w500/v9Du2HC3hlknAvGlWhquRbeifwW.jpg",
      poster_path: "https://image.tmdb.org/t/p/w500/alOroPhrYxhUx7txhlWM8uLuBjv.jpg",
      release_date: "2024-12-11",
      is_upcoming: true,
      genres: ["Acción", "Aventura", "Suspense"],
      runtime: 114,
    },
    {
      title: "Flow, un mundo que salvar",
      overview:
        "El mundo parece estar llegando a su fin, repleto de vestigios de presencia humana. Gato es un animal solitario, pero como su hogar es arrasado por una gran inundación, encuentra refugio en un barco poblado por varias especies, y tendrá que hacer equipo con ellas a pesar de sus diferencias. En el solitario barco que navega por místicos paisajes desbordados, navegan por los desafíos y peligros de adaptarse a este nuevo mundo..",
      backdrop_path: "https://image.tmdb.org/t/p/w500/b3mdmjYTEL70j7nuXATUAD9qgu4.jpg",
      poster_path: "https://image.tmdb.org/t/p/w500/2PPvMc165yk0zafItbitQ2ZqZyo.jpg",
      release_date: "2024-08-29",
      is_upcoming: true,
      genres: ["Animación", "Aventura"],
      runtime: 97,
    },
    {
      title: "Mufasa: El rey león",
      overview:
        "Rafiki debe transmitir la leyenda de Mufasa a la joven cachorro de león Kiara, hija de Simba y Nala, y con Timón y Pumba prestando su estilo característico. Mufasa, un cachorro huérfano, perdido y solo, conoce a un simpático león llamado Taka, heredero de un linaje real. Este encuentro casual pone en marcha un viaje de un extraordinario grupo de inadaptados que buscan su destino.",
      backdrop_path: "https://image.tmdb.org/t/p/w500/c6nouvFYnmNO50WQDLcKMI3p0jA.jpg",
      poster_path: "https://image.tmdb.org/t/p/w500/nt4E7hZqKfIJbf8GOxZKCL1ahvG.jpg",
      release_date: "2024-12-18",
      is_upcoming: true,
      genres: ["Animación", "Aventura", "Familia"],
      runtime: 104,
    },
    {
      title: "Sonic 3: La película",
      overview:
        "Sonic, Knuckles y Tails se reúnen para enfrentarse a un nuevo y poderoso adversario, Shadow, un misterioso villano cuyos poderes no se parecen a nada de lo que nuestros héroes han conocido hasta ahora. Con sus facultades superadas en todos los sentidos, el Equipo Sonic tendrá que establecer una insólita alianza con la esperanza de detener a Shadow y proteger el planeta.",
      backdrop_path: "https://image.tmdb.org/t/p/w500/18iGjkavP8KLfyU3Ifkp9s2bSvD.jpg",
      poster_path: "https://image.tmdb.org/t/p/w500/4Hd5l8sdi2Fhkh34X1B1ziXsQeA.jpg",
      release_date: "2024-12-19",
      is_upcoming: true,
      genres: ["Acción", "Aventura", "Familia", "Comedia"],
      runtime: 109,
    },
    {
      title: "El cuervo",
      overview:
        "Eric Draven y Shelly Webster son brutalmente asesinados cuando los demonios de su oscuro pasado les alcanzan. Ante la oportunidad de sacrificarse para salvar a su verdadero amor, Eric se propone vengarse despiadadamente de sus asesinos, atravesando el mundo de los vivos y los muertos para saldar sus deudas.",
      backdrop_path: "https://image.tmdb.org/t/p/w500/Asg2UUwipAdE87MxtJy7SQo08XI.jpg",
      poster_path: "https://image.tmdb.org/t/p/w500/uUUx4kN6uCvXnjGWOv79gUBxdYE.jpg",
      release_date: "2024-08-21",
      is_upcoming: true,
      genres: ["Acción", "Fantasía", "Terror"],
      runtime: 111,
    },
    {
      title: "Canario Negro",
      overview:
        "Avery Graves, una de las mejores agentes de la CIA, es chantajeada por terroristas para que traicione a su propio país y salve a su marido secuestrado. Separada de su equipo, recurre a sus contactos en los bajos fondos para sobrevivir y ayudar a localizar la codiciada información que quieren los secuestradores. Traicionada a cada paso, debe confiar en su entrenamiento de vanguardia y en sus primitivas habilidades de lucha en una carrera mortal para entregar un rescate que podría desencadenar una crisis mundial.",
      backdrop_path: "https://image.tmdb.org/t/p/w500/5IIFJxwRzmkhczQidIhpoaolpZY.jpg",
      poster_path: "https://image.tmdb.org/t/p/w500/iCNkHfsB3mCOCwDLOmjIZotGPID.jpg",
      release_date: "2024-10-10",
      is_upcoming: true,
      genres: ["Acción", "Suspense", "Crimen"],
      runtime: 100,
    },
    {
      title: "Here (Aquí)",
      overview:
        "Relato centrado en una habitación individual, que sigue a las muchas personas que la habitan durante años y años, desde el pasado hasta el futuro.",
      backdrop_path: "https://image.tmdb.org/t/p/w500/rXYejcyn762o3cjp9OYfyVR3QpY.jpg",
      poster_path: "https://image.tmdb.org/t/p/w500/whTlrFPfRHAc7Vv7KoyIzIpQDBD.jpg",
      release_date: "2024-10-30",
      is_upcoming: true,
      genres: ["Drama"],
      runtime: 92,
    },
    {
      title: "Bagman. El hombre del saco",
      overview:
        "Durante siglos, los padres han advertido a sus hijos sobre el temible Hombre del Saco, un ser maligno que rapta a niños inocentes y los aparta para siempre de sus familias. Patrick (Sam Claflin) escapó de sus garras por los pelos en su infancia, pero el trauma que le generó aquel encuentro le ha perseguido desde entonces. Tras mudarse a su antigua casa familiar con su esposa e hijo, Patrick descubrirá que la tenebrosa criatura continúa allí, acechando sus pesadillas y amenazando con arrebatarle aquello que más quiere en el mundo.",
      backdrop_path: "https://image.tmdb.org/t/p/w500/a3PBAmXUXuazAzr83WNzRaBS33I.jpg",
      poster_path: "https://image.tmdb.org/t/p/w500/1LXFDQNV90eemUDtKJs9u34moAg.jpg",
      release_date: "2024-09-20",
      is_upcoming: true,
      genres: ["Terror", "Suspense"],
      runtime: 91,
    },
    {
      title: "El señor de los anillos: La guerra de los Rohirrim",
      overview:
        'Explora la "historia no contada" del Abismo de Helm, cientos de años antes de la mítica batalla, y de su fundador, Helm Hammerhand, Rey de Rohan.',
      backdrop_path: "https://image.tmdb.org/t/p/w500/4ZXzO32rKk5bSoDZA6KpTzVJA.jpg",
      poster_path: "https://image.tmdb.org/t/p/w500/mD2m6Lr7GtyBv85EP1s0dQHQo1X.jpg",
      release_date: "2024-12-05",
      is_upcoming: true,
      genres: ["Animación", "Fantasía", "Aventura"],
      runtime: 116,
    },
    {
      title: "Culpa tuya",
      overview:
        "El amor entre Noah y Nick parece inquebrantable, a pesar de las maniobras de sus padres por separarles. Pero el trabajo de él y la entrada de ella en la universidad, abre sus vidas a nuevas relaciones. La aparición de una exnovia que busca venganza y de la madre Nick con intenciones poco claras, removerán los cimientos no solo de su relación, sino de la propia familia Leister. Cuando tantas personas están dispuestas a destruir una relación, ¿puede realmente acabar bien?",
      backdrop_path: "https://image.tmdb.org/t/p/w500/pVUwUheFj5tLfzZg6EiFMasnMME.jpg",
      poster_path: "https://image.tmdb.org/t/p/w500/hmIpKf4qRCmHGnRUNXE8E9r7zIz.jpg",
      release_date: "2024-12-26",
      is_upcoming: true,
      genres: ["Romance", "Drama"],
      runtime: 96,
    },
    {
      title: "Civil War",
      overview:
        "En un futuro cercano, donde América está sumida en una cruenta guerra civil, un equipo de periodistas y fotógrafos de guerra emprenderá un viaje por carretera en dirección a Washington DC. Su misión: llegar antes de que las fuerzas rebeldes asalten la Casa Blanca y arrebaten el control al presidente de Estados Unidos.",
      backdrop_path: "https://image.tmdb.org/t/p/w500/en3GU5uGkKaYmSyetHV4csHHiH3.jpg",
      poster_path: "https://image.tmdb.org/t/p/w500/hxzHKNtkRbH5EVIVJmKc50aEfIV.jpg",
      release_date: "2024-04-10",
      is_upcoming: true,
      genres: ["Acción", "Drama"],
      runtime: 119,
    },
    {
      title: "Winnie the Pooh 2: El bosque sangriento",
      overview:
        "En lo más profundo del Bosque de los Cien Acres, crece una furia destructiva cuando Winnie-the-Pooh, Piglet, Owl y Tigger ven peligrar su hogar y sus vidas después de que Christopher Robin revelara su existencia. No queriendo seguir viviendo en la sombra, el grupo decide llevar la lucha al pueblo de Ashdown, hogar de Christopher Robin, dejando un sangriento rastro de muerte y caos a su paso. Winnie y sus salvajes amigos demostrarán a todo el mundo que son más mortíferos, más fuertes y más listos de lo que nadie podría imaginar y conseguirán vengarse de Christopher Robin, de una vez por todas.",
      backdrop_path: "https://image.tmdb.org/t/p/w500/p4INKu77iuTG1o1a5N3Y9vqeEGq.jpg",
      poster_path: "https://image.tmdb.org/t/p/w500/17UmQl8TuDmHWGlcKeFIjnR8bJF.jpg",
      release_date: "2024-03-26",
      is_upcoming: true,
      genres: ["Terror", "Suspense"],
      runtime: 90,
    },
    {
      title: "Megalópolis - Una fábula",
      overview:
        "Una fábula épica romana ambientada en una América moderna imaginada. La ciudad de Nueva Roma debe cambiar, lo que provoca un conflicto entre César Catilina, un genio artista que busca saltar hacia un futuro utópico e idealista, y su opositor, el alcalde Franklyn Cicero, que sigue comprometido con un statu quo regresivo, perpetuando la codicia, los intereses particulares y la guerra partidista. Dividida entre ellos está la socialité Julia Cicero, la hija del alcalde, cuyo amor por César ha dividido su lealtad, obligándola a descubrir lo que realmente cree que la humanidad merece.",
      backdrop_path: "https://image.tmdb.org/t/p/w500/nA0RDmSDqpN5tLun4sCqdPekObD.jpg",
      poster_path: "https://image.tmdb.org/t/p/w500/6jW627n4kOQnAZCa24bbOd1S0CF.jpg",
      release_date: "2024-09-25",
      is_upcoming: true,
      genres: ["Drama", "Ciencia ficción"],
      runtime: 108,
    },
  ];

  for (const filmData of films) {
    const existingFilm = await filmRepository.findOne({
      where: { title: filmData.title },
    });

    if (!existingFilm) {
      await filmRepository.save(filmRepository.create(filmData));
    }
  }
};
