/**
 * cities.js — Base de données des villes du monde
 * Architecture scalable : ajouter une ville = ajouter un objet dans le bon continent
 *
 * Champs :
 *   id        {string}  identifiant unique kebab-case
 *   name      {string}  nom affiché
 *   country   {string}  pays
 *   capital   {boolean} est-ce une capitale nationale ?
 *   lat       {number}  latitude
 *   lng       {number}  longitude
 *   pop       {number}  population (millions, arrondi)
 *   desc      {string}  description courte
 */

/* ══════════════════════════════════════════
   AFRIQUE  (40 villes)
══════════════════════════════════════════ */
export const africaCities = [
  { id:'lome',           name:'Lomé',           country:'Togo',              capital:true,  lat: 6.13,   lng:  1.22,  pop:0.9,  desc:'Capitale du Togo, seule capitale africaine directement sur l\'océan Atlantique.' },
  { id:'kara',           name:'Kara',            country:'Togo',              capital:false, lat: 9.55,   lng:  1.19,  pop:0.1,  desc:'Deuxième ville du Togo, ville natale du président Eyadéma.' },
  { id:'dakar',          name:'Dakar',           country:'Sénégal',           capital:true,  lat:14.69,   lng:-17.44,  pop:3.7,  desc:'Capitale du Sénégal, ville la plus occidentale du continent africain.' },
  { id:'abidjan',        name:'Abidjan',         country:"Côte d'Ivoire",     capital:false, lat: 5.35,   lng: -4.00,  pop:5.3,  desc:'Capitale économique de la Côte d\'Ivoire et hub financier d\'Afrique de l\'Ouest.' },
  { id:'accra',          name:'Accra',           country:'Ghana',             capital:true,  lat: 5.55,   lng: -0.20,  pop:3.0,  desc:'Capitale du Ghana et premier pays d\'Afrique subsaharienne indépendant.' },
  { id:'cotonou',        name:'Cotonou',         country:'Bénin',             capital:false, lat: 6.37,   lng:  2.42,  pop:0.7,  desc:'Capitale économique du Bénin, berceau des Amazones du Dahomey.' },
  { id:'porto-novo',     name:'Porto-Novo',      country:'Bénin',             capital:true,  lat: 6.50,   lng:  2.61,  pop:0.3,  desc:'Capitale officielle du Bénin, ville historique du royaume du Dahomey.' },
  { id:'lagos',          name:'Lagos',           country:'Nigéria',           capital:false, lat: 6.52,   lng:  3.38,  pop:15.0, desc:'Mégalopole nigériane, ville la plus peuplée d\'Afrique.' },
  { id:'abuja',          name:'Abuja',           country:'Nigéria',           capital:true,  lat: 9.07,   lng:  7.40,  pop:3.5,  desc:'Capitale fédérale du Nigéria construite de toutes pièces dans les années 1980.' },
  { id:'accra-tema',     name:'Tema',            country:'Ghana',             capital:false, lat: 5.67,   lng: -0.01,  pop:0.3,  desc:'Principal port industriel du Ghana, à 25 km d\'Accra.' },
  { id:'bamako',         name:'Bamako',          country:'Mali',              capital:true,  lat:12.65,   lng: -8.00,  pop:2.5,  desc:'Capitale du Mali, l\'une des villes à la croissance la plus rapide d\'Afrique.' },
  { id:'conakry',        name:'Conakry',         country:'Guinée',            capital:true,  lat: 9.55,   lng:-13.68,  pop:1.9,  desc:'Capitale de la Guinée, ville construite sur une presqu\'île atlantique.' },
  { id:'ouagadougou',    name:'Ouagadougou',     country:'Burkina Faso',      capital:true,  lat:12.37,   lng: -1.53,  pop:2.8,  desc:'Capitale du Burkina Faso, surnommée "Ouaga" par ses habitants.' },
  { id:'niamey',         name:'Niamey',          country:'Niger',             capital:true,  lat:13.51,   lng:  2.11,  pop:1.3,  desc:'Capitale du Niger, au bord du fleuve Niger.' },
  { id:'ndjamena',       name:'N\'Djamena',      country:'Tchad',             capital:true,  lat:12.11,   lng: 15.04,  pop:1.4,  desc:'Capitale du Tchad, anciennement Fort-Lamy.' },
  { id:'yaounde',        name:'Yaoundé',         country:'Cameroun',          capital:true,  lat: 3.86,   lng: 11.52,  pop:3.0,  desc:'Capitale politique du Cameroun, ville des collines.' },
  { id:'douala',         name:'Douala',          country:'Cameroun',          capital:false, lat: 4.05,   lng:  9.70,  pop:3.8,  desc:'Capitale économique du Cameroun et principal port d\'Afrique centrale.' },
  { id:'libreville',     name:'Libreville',      country:'Gabon',             capital:true,  lat: 0.39,   lng:  9.45,  pop:0.8,  desc:'Capitale du Gabon, fondée en 1849 comme refuge pour esclaves libérés.' },
  { id:'kinshasa',       name:'Kinshasa',        country:'Congo (RDC)',        capital:true,  lat:-4.32,   lng: 15.32,  pop:15.0, desc:'Capitale de la RDC, troisième ville la plus peuplée d\'Afrique.' },
  { id:'brazzaville',    name:'Brazzaville',     country:'Congo',             capital:true,  lat:-4.27,   lng: 15.28,  pop:2.3,  desc:'Capitale du Congo, face à Kinshasa de l\'autre côté du fleuve Congo.' },
  { id:'luanda',         name:'Luanda',          country:'Angola',            capital:true,  lat:-8.84,   lng: 13.23,  pop:8.8,  desc:'Capitale et plus grande ville d\'Angola, fondée par les Portugais en 1576.' },
  { id:'nairobi',        name:'Nairobi',         country:'Kenya',             capital:true,  lat:-1.29,   lng: 36.82,  pop:4.7,  desc:'Capitale du Kenya, hub technologique d\'Afrique de l\'Est.' },
  { id:'addis-abeba',    name:'Addis-Abeba',     country:'Éthiopie',          capital:true,  lat: 9.03,   lng: 38.74,  pop:4.8,  desc:'Capitale de l\'Éthiopie et siège de l\'Union Africaine.' },
  { id:'kampala',        name:'Kampala',         country:'Ouganda',           capital:true,  lat: 0.32,   lng: 32.58,  pop:3.5,  desc:'Capitale de l\'Ouganda, construite sur sept collines.' },
  { id:'dar-es-salam',   name:'Dar es Salaam',   country:'Tanzanie',          capital:false, lat:-6.79,   lng: 39.21,  pop:6.7,  desc:'Plus grande ville de Tanzanie, ancien siège du gouvernement.' },
  { id:'dodoma',         name:'Dodoma',          country:'Tanzanie',          capital:true,  lat:-6.17,   lng: 35.74,  pop:0.4,  desc:'Capitale officielle de la Tanzanie depuis 1974.' },
  { id:'johannesburg',   name:'Johannesburg',    country:'Afrique du Sud',    capital:false, lat:-26.20,  lng: 28.04,  pop:6.0,  desc:'Plus grande ville d\'Afrique du Sud, capitale économique du continent.' },
  { id:'pretoria',       name:'Pretoria',        country:'Afrique du Sud',    capital:true,  lat:-25.74,  lng: 28.19,  pop:2.9,  desc:'Capitale administrative de l\'Afrique du Sud, siège du gouvernement.' },
  { id:'cape-town',      name:'Le Cap',          country:'Afrique du Sud',    capital:false, lat:-33.93,  lng: 18.42,  pop:4.6,  desc:'Capitale législative d\'Afrique du Sud, la "Mère des Cités".' },
  { id:'cairo',          name:'Le Caire',        country:'Égypte',            capital:true,  lat:30.04,   lng: 31.24,  pop:20.5, desc:'Capitale de l\'Égypte, plus grande ville d\'Afrique.' },
  { id:'alexandria',     name:'Alexandrie',      country:'Égypte',            capital:false, lat:31.20,   lng: 29.92,  pop:5.2,  desc:'Deuxième ville d\'Égypte, fondée par Alexandre le Grand en 331 av. J.-C.' },
  { id:'casablanca',     name:'Casablanca',      country:'Maroc',             capital:false, lat:33.59,   lng: -7.62,  pop:4.3,  desc:'Capitale économique du Maroc et principale métropole maghrébine.' },
  { id:'rabat',          name:'Rabat',           country:'Maroc',             capital:true,  lat:34.02,   lng: -6.83,  pop:0.6,  desc:'Capitale politique du Maroc, classée au patrimoine mondial de l\'UNESCO.' },
  { id:'tunis',          name:'Tunis',           country:'Tunisie',           capital:true,  lat:36.82,   lng: 10.17,  pop:2.6,  desc:'Capitale de la Tunisie, héritière de la cité antique de Carthage.' },
  { id:'alger',          name:'Alger',           country:'Algérie',           capital:true,  lat:36.74,   lng:  3.06,  pop:3.7,  desc:'Capitale de l\'Algérie, surnommée "Alger la Blanche".' },
  { id:'tripoli',        name:'Tripoli',         country:'Libye',             capital:true,  lat:32.90,   lng: 13.18,  pop:1.2,  desc:'Capitale de la Libye, fondée par les Phéniciens il y a 3000 ans.' },
  { id:'khartoum',       name:'Khartoum',        country:'Soudan',            capital:true,  lat:15.55,   lng: 32.53,  pop:6.1,  desc:'Capitale du Soudan, au confluent du Nil Bleu et du Nil Blanc.' },
  { id:'antananarivo',   name:'Antananarivo',    country:'Madagascar',        capital:true,  lat:-18.91,  lng: 47.54,  pop:3.5,  desc:'Capitale de Madagascar, "la Ville aux Mille" en malgache.' },
  { id:'maputo',         name:'Maputo',          country:'Mozambique',        capital:true,  lat:-25.97,  lng: 32.59,  pop:1.8,  desc:'Capitale du Mozambique, ancienne Lourenço Marques.' },
  { id:'harare',         name:'Harare',          country:'Zimbabwe',          capital:true,  lat:-17.83,  lng: 31.05,  pop:1.6,  desc:'Capitale du Zimbabwe, fondée en 1890 par les pionniers britanniques.' },
];

/* ══════════════════════════════════════════
   EUROPE  (35 villes)
══════════════════════════════════════════ */
export const europeCities = [
  { id:'paris',          name:'Paris',           country:'France',            capital:true,  lat:48.85,   lng:  2.35,  pop:11.0, desc:'Capitale de la France, "Ville Lumière", siège de la Tour Eiffel.' },
  { id:'marseille',      name:'Marseille',       country:'France',            capital:false, lat:43.30,   lng:  5.37,  pop:1.8,  desc:'Deuxième ville de France, plus ancien port de Méditerranée.' },
  { id:'lyon',           name:'Lyon',            country:'France',            capital:false, lat:45.75,   lng:  4.85,  pop:1.7,  desc:'Capitale gastronomique de France, confluent du Rhône et de la Saône.' },
  { id:'london',         name:'Londres',         country:'Royaume-Uni',       capital:true,  lat:51.50,   lng: -0.12,  pop:9.5,  desc:'Capitale du Royaume-Uni, siège de Big Ben et de la Couronne britannique.' },
  { id:'berlin',         name:'Berlin',          country:'Allemagne',         capital:true,  lat:52.52,   lng: 13.40,  pop:3.7,  desc:'Capitale de l\'Allemagne, ville symbole de la réunification européenne.' },
  { id:'munich',         name:'Munich',          country:'Allemagne',         capital:false, lat:48.14,   lng: 11.58,  pop:1.5,  desc:'Capitale de Bavière, ville de l\'Oktoberfest et de la BMW.' },
  { id:'hamburg',        name:'Hambourg',        country:'Allemagne',         capital:false, lat:53.57,   lng: 10.00,  pop:1.8,  desc:'Deuxième ville d\'Allemagne, le "Gateway to the World".' },
  { id:'rome',           name:'Rome',            country:'Italie',            capital:true,  lat:41.90,   lng: 12.49,  pop:4.3,  desc:'Capitale de l\'Italie, "Ville Éternelle", héritière de l\'Empire romain.' },
  { id:'milan',          name:'Milan',           country:'Italie',            capital:false, lat:45.47,   lng:  9.19,  pop:3.2,  desc:'Capitale de la mode et de la finance italienne.' },
  { id:'madrid',         name:'Madrid',          country:'Espagne',           capital:true,  lat:40.41,   lng: -3.70,  pop:3.3,  desc:'Capitale de l\'Espagne, ville la plus haute d\'Europe parmi les capitales.' },
  { id:'barcelona',      name:'Barcelone',       country:'Espagne',           capital:false, lat:41.38,   lng:  2.17,  pop:5.6,  desc:'Capitale de Catalogne, ville de Gaudí et du FC Barcelone.' },
  { id:'lisbon',         name:'Lisbonne',        country:'Portugal',          capital:true,  lat:38.71,   lng: -9.14,  pop:2.9,  desc:'Capitale du Portugal, ville des sept collines et du fado.' },
  { id:'amsterdam',      name:'Amsterdam',       country:'Pays-Bas',          capital:true,  lat:52.37,   lng:  4.90,  pop:1.1,  desc:'Capitale des Pays-Bas, ville aux 165 canaux et 1 500 ponts.' },
  { id:'brussels',       name:'Bruxelles',       country:'Belgique',          capital:true,  lat:50.85,   lng:  4.35,  pop:1.2,  desc:'Capitale de la Belgique et siège des institutions de l\'Union Européenne.' },
  { id:'vienna',         name:'Vienne',          country:'Autriche',          capital:true,  lat:48.21,   lng: 16.37,  pop:1.9,  desc:'Capitale de l\'Autriche, ancienne capitale des Habsbourg et de la musique classique.' },
  { id:'zurich',         name:'Zurich',          country:'Suisse',            capital:false, lat:47.38,   lng:  8.54,  pop:0.4,  desc:'Principale ville de Suisse, première place financière européenne.' },
  { id:'stockholm',      name:'Stockholm',       country:'Suède',             capital:true,  lat:59.33,   lng: 18.06,  pop:1.6,  desc:'Capitale de la Suède, construite sur 14 îles à l\'embouchure du lac Mälar.' },
  { id:'oslo',           name:'Oslo',            country:'Norvège',           capital:true,  lat:59.91,   lng: 10.75,  pop:1.0,  desc:'Capitale de la Norvège, ville du fjord d\'Oslo et du prix Nobel de la paix.' },
  { id:'copenhagen',     name:'Copenhague',      country:'Danemark',          capital:true,  lat:55.68,   lng: 12.57,  pop:1.3,  desc:'Capitale du Danemark, ville de la Petite Sirène et du design scandinave.' },
  { id:'helsinki',       name:'Helsinki',        country:'Finlande',          capital:true,  lat:60.17,   lng: 24.94,  pop:0.7,  desc:'Capitale de la Finlande, "Fille de la Baltique".' },
  { id:'warsaw',         name:'Varsovie',        country:'Pologne',           capital:true,  lat:52.22,   lng: 21.01,  pop:1.8,  desc:'Capitale de la Pologne, ville reconstruite après la Seconde Guerre mondiale.' },
  { id:'prague',         name:'Prague',          country:'Tchéquie',          capital:true,  lat:50.08,   lng: 14.44,  pop:1.3,  desc:'Capitale de la Tchéquie, la "Ville aux Cent Clochers".' },
  { id:'budapest',       name:'Budapest',        country:'Hongrie',           capital:true,  lat:47.50,   lng: 19.04,  pop:1.7,  desc:'Capitale de la Hongrie, formée par la fusion de Buda, Óbuda et Pest.' },
  { id:'athens',         name:'Athènes',         country:'Grèce',             capital:true,  lat:37.97,   lng: 23.72,  pop:3.7,  desc:'Capitale de la Grèce, berceau de la démocratie et de la philosophie.' },
  { id:'bucharest',      name:'Bucarest',        country:'Roumanie',          capital:true,  lat:44.43,   lng: 26.10,  pop:2.1,  desc:'Capitale de la Roumanie, le "Paris de l\'Est".' },
  { id:'sofia',          name:'Sofia',           country:'Bulgarie',          capital:true,  lat:42.70,   lng: 23.32,  pop:1.3,  desc:'Capitale de la Bulgarie, une des plus anciennes villes d\'Europe.' },
  { id:'moscow',         name:'Moscou',          country:'Russie',            capital:true,  lat:55.75,   lng: 37.61,  pop:12.5, desc:'Capitale de la Russie, la plus grande ville d\'Europe.' },
  { id:'st-petersburg',  name:'Saint-Pétersbourg',country:'Russie',           capital:false, lat:59.95,   lng: 30.32,  pop:5.4,  desc:'Deuxième ville de Russie, fondée par Pierre le Grand en 1703.' },
  { id:'kyiv',           name:'Kyiv',            country:'Ukraine',           capital:true,  lat:50.45,   lng: 30.52,  pop:2.9,  desc:'Capitale de l\'Ukraine, "Mère des villes russes".' },
  { id:'minsk',          name:'Minsk',           country:'Biélorussie',       capital:true,  lat:53.90,   lng: 27.57,  pop:2.0,  desc:'Capitale de la Biélorussie, entièrement reconstruite après 1945.' },
  { id:'riga',           name:'Riga',            country:'Lettonie',          capital:true,  lat:56.95,   lng: 24.11,  pop:0.6,  desc:'Capitale de la Lettonie, plus grande ville des États baltes.' },
  { id:'tallinn',        name:'Tallinn',         country:'Estonie',           capital:true,  lat:59.44,   lng: 24.75,  pop:0.4,  desc:'Capitale de l\'Estonie, vieille ville médiévale inscrite à l\'UNESCO.' },
  { id:'vilnius',        name:'Vilnius',         country:'Lituanie',          capital:true,  lat:54.69,   lng: 25.28,  pop:0.5,  desc:'Capitale de la Lituanie, ville baroque aux nombreuses églises.' },
  { id:'reykjavik',      name:'Reykjavik',       country:'Islande',           capital:true,  lat:64.14,   lng:-21.94,  pop:0.2,  desc:'Capitale de l\'Islande, capitale la plus septentrionale du monde.' },
  { id:'belgrade',       name:'Belgrade',        country:'Serbie',            capital:true,  lat:44.82,   lng: 20.46,  pop:1.6,  desc:'Capitale de la Serbie, au confluent de la Save et du Danube.' },
];

/* ══════════════════════════════════════════
   AMÉRIQUES  (25 villes)
══════════════════════════════════════════ */
export const americasCities = [
  { id:'washington',     name:'Washington D.C.', country:'États-Unis',        capital:true,  lat:38.89,   lng:-77.03,  pop:0.7,  desc:'Capitale fédérale des États-Unis, siège de la Maison-Blanche.' },
  { id:'new-york',       name:'New York',        country:'États-Unis',        capital:false, lat:40.71,   lng:-74.01,  pop:20.0, desc:'La plus grande ville des États-Unis, capitale mondiale de la finance.' },
  { id:'los-angeles',    name:'Los Angeles',     country:'États-Unis',        capital:false, lat:34.05,   lng:-118.24, pop:13.0, desc:'Capitale mondiale du cinéma, siège d\'Hollywood.' },
  { id:'chicago',        name:'Chicago',         country:'États-Unis',        capital:false, lat:41.85,   lng:-87.65,  pop:9.5,  desc:'Troisième ville des États-Unis, surnommée "The Windy City".' },
  { id:'ottawa',         name:'Ottawa',          country:'Canada',            capital:true,  lat:45.42,   lng:-75.69,  pop:1.4,  desc:'Capitale du Canada, ville bilingue au bord de la rivière Outaouais.' },
  { id:'toronto',        name:'Toronto',         country:'Canada',            capital:false, lat:43.65,   lng:-79.38,  pop:6.4,  desc:'Plus grande ville du Canada, métropole cosmopolite.' },
  { id:'montreal',       name:'Montréal',        country:'Canada',            capital:false, lat:45.50,   lng:-73.57,  pop:4.2,  desc:'Deuxième ville francophone du monde après Paris.' },
  { id:'mexico-city',    name:'Mexico',          country:'Mexique',           capital:true,  lat:19.43,   lng:-99.13,  pop:22.0, desc:'Capitale du Mexique, une des plus grandes métropoles du monde.' },
  { id:'brasilia',       name:'Brasília',        country:'Brésil',            capital:true,  lat:-15.78,  lng:-47.93,  pop:3.1,  desc:'Capitale du Brésil construite de 1956 à 1960, chef-d\'œuvre d\'Oscar Niemeyer.' },
  { id:'sao-paulo',      name:'São Paulo',       country:'Brésil',            capital:false, lat:-23.55,  lng:-46.63,  pop:22.0, desc:'Plus grande ville du Brésil et d\'Amérique du Sud.' },
  { id:'rio',            name:'Rio de Janeiro',  country:'Brésil',            capital:false, lat:-22.91,  lng:-43.17,  pop:13.6, desc:'Ancienne capitale du Brésil, ville du Christ Rédempteur et du carnaval.' },
  { id:'buenos-aires',   name:'Buenos Aires',    country:'Argentine',         capital:true,  lat:-34.61,  lng:-58.38,  pop:15.5, desc:'Capitale de l\'Argentine, "Paris de l\'Amérique du Sud".' },
  { id:'lima',           name:'Lima',            country:'Pérou',             capital:true,  lat:-12.04,  lng:-77.03,  pop:11.0, desc:'Capitale du Pérou, fondée par Francisco Pizarro en 1535.' },
  { id:'bogota',         name:'Bogotá',          country:'Colombie',          capital:true,  lat:  4.71,  lng:-74.07,  pop:11.0, desc:'Capitale de la Colombie, à 2 600 m d\'altitude.' },
  { id:'santiago',       name:'Santiago',        country:'Chili',             capital:true,  lat:-33.46,  lng:-70.65,  pop:7.1,  desc:'Capitale du Chili, au pied des Andes.' },
  { id:'caracas',        name:'Caracas',         country:'Venezuela',         capital:true,  lat:10.48,   lng:-66.87,  pop:2.9,  desc:'Capitale du Venezuela, birthplace de Simón Bolívar.' },
  { id:'havana',         name:'La Havane',       country:'Cuba',              capital:true,  lat:23.13,   lng:-82.38,  pop:2.1,  desc:'Capitale de Cuba, ville aux voitures américaines des années 1950.' },
  { id:'quito',          name:'Quito',           country:'Équateur',          capital:true,  lat:-0.22,   lng:-78.52,  pop:2.0,  desc:'Capitale de l\'Équateur, première ville inscrite au patrimoine UNESCO.' },
  { id:'la-paz',         name:'La Paz',          country:'Bolivie',           capital:false, lat:-16.50,  lng:-68.15,  pop:2.4,  desc:'Siège du gouvernement bolivien, plus haute capitale administrative du monde.' },
  { id:'asuncion',       name:'Asunción',        country:'Paraguay',          capital:true,  lat:-25.28,  lng:-57.64,  pop:0.5,  desc:'Capitale du Paraguay, une des plus anciennes villes d\'Amérique du Sud.' },
  { id:'montevideo',     name:'Montevideo',      country:'Uruguay',           capital:true,  lat:-34.90,  lng:-56.19,  pop:1.8,  desc:'Capitale de l\'Uruguay, ville portuaire sur le Río de la Plata.' },
  { id:'panama-city',    name:'Panama City',     country:'Panama',            capital:true,  lat:  8.99,  lng:-79.52,  pop:1.4,  desc:'Capitale du Panama, porte entre Atlantique et Pacifique.' },
  { id:'san-jose',       name:'San José',        country:'Costa Rica',        capital:true,  lat:  9.93,  lng:-84.08,  pop:1.4,  desc:'Capitale du Costa Rica, pays sans armée depuis 1948.' },
  { id:'port-au-prince', name:'Port-au-Prince',  country:'Haïti',             capital:true,  lat:18.54,   lng:-72.34,  pop:2.7,  desc:'Capitale d\'Haïti, première République noire indépendante du monde.' },
  { id:'kingston',       name:'Kingston',        country:'Jamaïque',          capital:true,  lat:17.99,   lng:-76.79,  pop:0.6,  desc:'Capitale de la Jamaïque, berceau du reggae et de Bob Marley.' },
];

/* ══════════════════════════════════════════
   ASIE  (25 villes)
══════════════════════════════════════════ */
export const asiaCities = [
  { id:'beijing',        name:'Pékin',           country:'Chine',             capital:true,  lat:39.91,   lng:116.38,  pop:21.5, desc:'Capitale de la Chine, siège de la Cité Interdite et de la Grande Muraille.' },
  { id:'shanghai',       name:'Shanghai',        country:'Chine',             capital:false, lat:31.23,   lng:121.47,  pop:28.5, desc:'Plus grande ville de Chine, capitale financière de l\'Asie.' },
  { id:'tokyo',          name:'Tokyo',           country:'Japon',             capital:true,  lat:35.68,   lng:139.69,  pop:37.4, desc:'Capitale du Japon, la plus grande agglomération urbaine du monde.' },
  { id:'osaka',          name:'Osaka',           country:'Japon',             capital:false, lat:34.69,   lng:135.50,  pop:19.3, desc:'Deuxième métropole japonaise, capitale gastronomique du Japon.' },
  { id:'seoul',          name:'Séoul',           country:'Corée du Sud',      capital:true,  lat:37.57,   lng:126.98,  pop:25.5, desc:'Capitale de la Corée du Sud, ville à la pointe de la K-culture.' },
  { id:'new-delhi',      name:'New Delhi',       country:'Inde',              capital:true,  lat:28.61,   lng: 77.20,  pop:32.0, desc:'Capitale de l\'Inde, deuxième agglomération mondiale.' },
  { id:'mumbai',         name:'Mumbai',          country:'Inde',              capital:false, lat:19.08,   lng: 72.88,  pop:21.7, desc:'Capitale économique de l\'Inde, siège de Bollywood.' },
  { id:'jakarta',        name:'Jakarta',         country:'Indonésie',         capital:true,  lat:-6.21,   lng:106.84,  pop:34.5, desc:'Capitale de l\'Indonésie, l\'une des villes les plus peuplées du monde.' },
  { id:'bangkok',        name:'Bangkok',         country:'Thaïlande',         capital:true,  lat:13.75,   lng:100.50,  pop:17.0, desc:'Capitale de la Thaïlande, "Ville des Anges".' },
  { id:'hanoi',          name:'Hanoï',           country:'Vietnam',           capital:true,  lat:21.03,   lng:105.85,  pop:5.0,  desc:'Capitale du Vietnam, l\'une des plus vieilles capitales d\'Asie du Sud-Est.' },
  { id:'manila',         name:'Manille',         country:'Philippines',       capital:true,  lat:14.59,   lng:120.98,  pop:23.5, desc:'Capitale des Philippines, parmi les agglomérations les plus denses du monde.' },
  { id:'singapore',      name:'Singapour',       country:'Singapour',         capital:true,  lat: 1.35,   lng:103.82,  pop:5.9,  desc:'Cité-État insulaire, hub financier et technologique de l\'Asie.' },
  { id:'kuala-lumpur',   name:'Kuala Lumpur',    country:'Malaisie',          capital:true,  lat: 3.14,   lng:101.69,  pop:8.4,  desc:'Capitale de la Malaisie, siège des Tours Petronas.' },
  { id:'riyadh',         name:'Riyad',           country:'Arabie Saoudite',   capital:true,  lat:24.68,   lng: 46.72,  pop:7.5,  desc:'Capitale de l\'Arabie Saoudite, au cœur de la péninsule arabique.' },
  { id:'dubai',          name:'Dubaï',           country:'Émirats arabes',    capital:false, lat:25.20,   lng: 55.27,  pop:3.6,  desc:'Ville des records architecturaux, siège du Burj Khalifa.' },
  { id:'tehran',         name:'Téhéran',         country:'Iran',              capital:true,  lat:35.69,   lng: 51.42,  pop:15.8, desc:'Capitale de l\'Iran, au pied de la chaîne de l\'Alborz.' },
  { id:'istanbul',       name:'Istanbul',        country:'Turquie',           capital:false, lat:41.01,   lng: 28.95,  pop:15.6, desc:'Plus grande ville de Turquie, seule métropole sur deux continents.' },
  { id:'ankara',         name:'Ankara',          country:'Turquie',           capital:true,  lat:39.92,   lng: 32.85,  pop:5.7,  desc:'Capitale de la Turquie depuis 1923, fondée par Atatürk.' },
  { id:'islamabad',      name:'Islamabad',       country:'Pakistan',          capital:true,  lat:33.72,   lng: 73.06,  pop:1.2,  desc:'Capitale du Pakistan, ville planifiée construite dans les années 1960.' },
  { id:'karachi',        name:'Karachi',         country:'Pakistan',          capital:false, lat:24.86,   lng: 67.01,  pop:16.6, desc:'Plus grande ville du Pakistan et mégapole côtière.' },
  { id:'dhaka',          name:'Dacca',           country:'Bangladesh',        capital:true,  lat:23.72,   lng: 90.41,  pop:22.5, desc:'Capitale du Bangladesh, une des villes les plus denses du monde.' },
  { id:'kabul',          name:'Kaboul',          country:'Afghanistan',       capital:true,  lat:34.53,   lng: 69.17,  pop:4.4,  desc:'Capitale de l\'Afghanistan, ville au carrefour des routes de la soie.' },
  { id:'astana',         name:'Astana',          country:'Kazakhstan',        capital:true,  lat:51.18,   lng: 71.45,  pop:1.2,  desc:'Capitale du Kazakhstan, ville futuriste construite en pleine steppe.' },
  { id:'ulaanbaatar',    name:'Oulan-Bator',     country:'Mongolie',          capital:true,  lat:47.91,   lng:106.88,  pop:1.6,  desc:'Capitale de la Mongolie, ville la plus froide du monde parmi les capitales.' },
  { id:'yangon',         name:'Rangoun',         country:'Myanmar',           capital:false, lat:16.87,   lng: 96.19,  pop:7.4,  desc:'Ancienne capitale du Myanmar, plus grande ville du pays.' },
];

/* ══════════════════════════════════════════
   OCÉANIE  (5 villes)
══════════════════════════════════════════ */
export const oceaniaCities = [
  { id:'canberra',       name:'Canberra',        country:'Australie',         capital:true,  lat:-35.28,  lng:149.13,  pop:0.5,  desc:'Capitale de l\'Australie, ville planifiée conçue par Walter Burley Griffin.' },
  { id:'sydney',         name:'Sydney',          country:'Australie',         capital:false, lat:-33.87,  lng:151.21,  pop:5.3,  desc:'Plus grande ville d\'Australie, siège de l\'Opéra de Sydney.' },
  { id:'melbourne',      name:'Melbourne',       country:'Australie',         capital:false, lat:-37.81,  lng:144.96,  pop:5.0,  desc:'Deuxième ville d\'Australie, capitale culturelle et sportive.' },
  { id:'wellington',     name:'Wellington',      country:'Nouvelle-Zélande',  capital:true,  lat:-41.29,  lng:174.78,  pop:0.4,  desc:'Capitale de la Nouvelle-Zélande, ville la plus au sud du monde parmi les capitales.' },
  { id:'suva',           name:'Suva',            country:'Fidji',             capital:true,  lat:-18.14,  lng:178.44,  pop:0.1,  desc:'Capitale des Fidji et plus grande ville du Pacifique insulaire.' },
];

/* ══════════════════════════════════════════
   EXPORT CONSOLIDÉ
══════════════════════════════════════════ */

/** Toutes les villes, tous continents confondus */
export const allCities = [
  ...africaCities,
  ...europeCities,
  ...americasCities,
  ...asiaCities,
  ...oceaniaCities,
];

/** Map id -> city pour accès O(1) */
export const cityById = Object.fromEntries(allCities.map(c => [c.id, c]));

/** Capitales uniquement */
export const capitals = allCities.filter(c => c.capital);

export default allCities;