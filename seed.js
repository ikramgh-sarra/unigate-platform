 import 'dotenv/config';
 import { PrismaClient } from './generated/prisma/index.js';
 import { PrismaPg } from '@prisma/adapter-pg';
 import pg from 'pg';
 
 const { Pool } = pg;
 const connectionString = process.env.DB_URL;
 const pool = new Pool({ connectionString });
 const adapter = new PrismaPg(pool);
 const prisma = new PrismaClient({ adapter });
 
const students = [
 
  {
    email:'yacineaitahmed@gmail.com', password:'Yac#2401',
    firstName:'Yacine',  lastName:'Ait Ahmed',
    nin:'2400012345678901', birthDate:new Date('2004-05-10'), birthPlace:'Saida',
    gender:'M', adress:'Rue Didouche Mourad, Oran', phone:'+213610000000',
    level:'L1', matricule:'2024-INFO-001',
    choiceL1: null, choice:'Informatique',
    bacAverage:15.42, mathGrade:17, scienceGrade:14, stream:'Mathématiques', status:'Validé',
  },
  {
    email:'leilahamroun@gmail.com', password:'Lei#2402',
    firstName:'Leila',   lastName:'Hamroun',
    nin:'2400042345678901', birthDate:new Date('2004-03-15'), birthPlace:'Constantine',
    gender:'F', adress:'Avenue de l Alsace Lorraine, Oran', phone:'+213610000051',
    level:'L1', matricule:'2024-INFO-002',
    choiceL1: null, choice:'Informatique',
    bacAverage:17.30, mathGrade:19, scienceGrade:16, stream:'Mathématiques', status:'Validé',
  },
  {
    email:'imanemokrani@gmail.com', password:'Ima#2403',
    firstName:'Imane',   lastName:'Mokrani',
    nin:'2400082345678901', birthDate:new Date('2004-01-18'), birthPlace:'Oran',
    gender:'F', adress:'Avenue Karguentah, Oran', phone:'+213710000119',
    level:'L1', matricule:'2024-INFO-003',
    choiceL1: null, choice:'Informatique',
    bacAverage:15.90, mathGrade:16, scienceGrade:15, stream:'Mathématiques', status:'Validé',
  },
  {
    email:'yasminbouchama@gmail.com', password:'Yas#2404',
    firstName:'Yasmin',  lastName:'Bouchama',
    nin:'2400102345678901', birthDate:new Date('2004-02-28'), birthPlace:'Oran',
    gender:'F', adress:'Rue du 1er Novembre, Oran', phone:'+213610000153',
    level:'L1', matricule:'2024-INFO-004',
    choiceL1: null, choice:'Informatique',
    bacAverage:18.00, mathGrade:20, scienceGrade:17, stream:'Scientifique', status:'Validé',
  },
  {
    email:'rashidfaroud@gmail.com', password:'Ras#2405',
    firstName:'Rashid',  lastName:'Faroud',
    nin:'2400132345678901', birthDate:new Date('2003-10-25'), birthPlace:'Oran',
    gender:'M', adress:'Boulevard Victor Hugo, Oran', phone:'+213610000204',
    level:'L1', matricule:'2024-INFO-005',
    choiceL1: null, choice:'Informatique',
    bacAverage:11.80, mathGrade:11, scienceGrade:12, stream:'Scientifique', status:'Refusé',
  },
  {
    email:'hassanhamdi@gmail.com', password:'Has#2406',
    firstName:'Hassan',  lastName:'Hamdi',
    nin:'2400152345678901', birthDate:new Date('2003-07-19'), birthPlace:'Oran',
    gender:'M', adress:'Rue Flaubert, Oran', phone:'+213510000238',
    level:'L1', matricule:'2024-INFO-006',
    choiceL1: null, choice:'Informatique',
    bacAverage:14.50, mathGrade:15, scienceGrade:14, stream:'Mathématiques', status:'En attente',
  },
  {
    email:'jalalkhaled@gmail.com', password:'Jal#2407',
    firstName:'Jalal',   lastName:'Khaled',
    nin:'2400172345678901', birthDate:new Date('2003-12-11'), birthPlace:'Oran',
    gender:'M', adress:'Boulevard des Martyrs, Oran', phone:'+213710000272',
    level:'L1', matricule:'2024-INFO-007',
    choiceL1: null, choice:'Informatique',
    bacAverage:13.20, mathGrade:13, scienceGrade:13, stream:'Scientifique', status:'En cours',
  },
  {
    email:'lakhdarmansouri@gmail.com', password:'Lak#2408',
    firstName:'Lakhdar', lastName:'Mansouri',
    nin:'2400192345678901', birthDate:new Date('2003-05-17'), birthPlace:'Oran',
    gender:'M', adress:'Avenue de l Algerie, Oran', phone:'+213610000306',
    level:'L1', matricule:'2024-INFO-008',
    choiceL1: null, choice:'Informatique',
    bacAverage:15.10, mathGrade:15, scienceGrade:15, stream:'Scientifique', status:'En attente',
  },
 
  {
    email:'sofiabensalem@gmail.com', password:'Sof#2409',
    firstName:'Sofia',   lastName:'Bensalem',
    nin:'2400022345678901', birthDate:new Date('2004-07-21'), birthPlace:'Tlemcen',
    gender:'F', adress:'Boulevard de la Corniche, Oran', phone:'+213710000017',
    level:'L1', matricule:'2024-MATH-001',
    choiceL1: null, choice:'Mathématiques',
    bacAverage:16.10, mathGrade:18, scienceGrade:15, stream:'Mathématiques', status:'Validé',
  },
  {
    email:'karimbouzid@gmail.com', password:'Kar#2410',
    firstName:'Karim',   lastName:'Bouzid',
    nin:'2400052345678901', birthDate:new Date('2004-09-27'), birthPlace:'Algiers',
    gender:'M', adress:'Rue de la Republique, Oran', phone:'+213710000068',
    level:'L1', matricule:'2024-MATH-002',
    choiceL1: null, choice:'Mathématiques',
    bacAverage:14.88, mathGrade:15, scienceGrade:14, stream:'Mathématiques', status:'En cours',
  },
  {
    email:'alioudjani@gmail.com', password:'Ali#2411',
    firstName:'Ali',     lastName:'Oudjani',
    nin:'2400092345678901', birthDate:new Date('2003-06-12'), birthPlace:'Oran',
    gender:'M', adress:'Rue Sadi Carnot, Oran', phone:'+213510000136',
    level:'L1', matricule:'2024-MATH-003',
    choiceL1: null, choice:'Mathématiques',
    bacAverage:14.20, mathGrade:14, scienceGrade:14, stream:'Scientifique', status:'En attente',
  },
  {
    email:'nadiadjaafar@gmail.com', password:'Nad#2412',
    firstName:'Nadia',   lastName:'Djaafar',
    nin:'2400122345678901', birthDate:new Date('2004-04-07'), birthPlace:'Oran',
    gender:'F', adress:'Rue Abane Ramdane, Oran', phone:'+213510000187',
    level:'L1', matricule:'2024-MATH-004',
    choiceL1: null, choice:'Mathématiques',
    bacAverage:16.75, mathGrade:18, scienceGrade:16, stream:'Mathématiques', status:'Validé',
  },
  {
    email:'karimalaouari@gmail.com', password:'Kla#2413',
    firstName:'Karima',  lastName:'Laouari',
    nin:'2400182345678901', birthDate:new Date('2004-06-22'), birthPlace:'Oran',
    gender:'F', adress:'Rue Gouraud, Oran', phone:'+213510000289',
    level:'L1', matricule:'2024-MATH-005',
    choiceL1: null, choice:'Mathématiques',
    bacAverage:16.30, mathGrade:17, scienceGrade:16, stream:'Mathématiques', status:'Validé',
  },
  {
    email:'meryemnassim@gmail.com', password:'Mer#2414',
    firstName:'Meryem',  lastName:'Nassim',
    nin:'2400202345678901', birthDate:new Date('2004-09-04'), birthPlace:'Oran',
    gender:'F', adress:'Rue Grand, Oran', phone:'+213710000323',
    level:'L1', matricule:'2024-MATH-006',
    choiceL1: null, choice:'Mathématiques',
    bacAverage:17.80, mathGrade:19, scienceGrade:17, stream:'Mathématiques', status:'Validé',
  },
 
  {
    email:'nassimlekhal@gmail.com', password:'Nas#2415',
    firstName:'Nassim',  lastName:'Lekhal',
    nin:'2400032345678901', birthDate:new Date('2003-11-02'), birthPlace:'Oran',
    gender:'M', adress:'Rue Emir Abdelkader, Oran', phone:'+213510000034',
    level:'L1', matricule:'2024-ST-001',
    choiceL1: null, choice:'Sciences et Technologies (ST)',
    bacAverage:13.75, mathGrade:14, scienceGrade:13, stream:'Technique Math', status:'En attente',
  },
  {
    email:'aminabelkacem@gmail.com', password:'Ami#2416',
    firstName:'Amina',   lastName:'Belkacem',
    nin:'2400062345678901', birthDate:new Date('2004-12-05'), birthPlace:'Setif',
    gender:'F', adress:'Boulevard de l Emir, Oran', phone:'+213510000085',
    level:'L1', matricule:'2024-ST-002',
    choiceL1: null, choice:'Sciences et Technologies (ST)',
    bacAverage:16.60, mathGrade:17, scienceGrade:16, stream:'Technique Math', status:'Validé',
  },
  {
    email:'faridzerrouk@gmail.com', password:'Far#2417',
    firstName:'Farid',   lastName:'Zerrouk',
    nin:'2400072345678901', birthDate:new Date('2003-08-30'), birthPlace:'Oran',
    gender:'M', adress:'Rue Farhat Hached, Oran', phone:'+213610000102',
    level:'L1', matricule:'2024-ST-003',
    choiceL1: null, choice:'Sciences et Technologies (ST)',
    bacAverage:12.50, mathGrade:12, scienceGrade:12, stream:'Technique Math', status:'Refusé',
  },
  {
    email:'mustafachaoui@gmail.com', password:'Mus#2418',
    firstName:'Mustafa', lastName:'Chaoui',
    nin:'2400112345678901', birthDate:new Date('2003-09-14'), birthPlace:'Oran',
    gender:'M', adress:'Avenue de la Gare, Oran', phone:'+213710000170',
    level:'L1', matricule:'2024-ST-004',
    choiceL1: null, choice:'Sciences et Technologies (ST)',
    bacAverage:13.40, mathGrade:13, scienceGrade:13, stream:'Technique Math', status:'En cours',
  },
  {
    email:'hanaghali@gmail.com', password:'Han#2419',
    firstName:'Hana',    lastName:'Ghali',
    nin:'2400142345678901', birthDate:new Date('2004-01-09'), birthPlace:'Tlemcen',
    gender:'F', adress:'Rue de Tlemcen, Tlemcen', phone:'+213710000221',
    level:'L1', matricule:'2024-ST-005',
    choiceL1: null, choice:'Sciences et Technologies (ST)',
    bacAverage:15.60, mathGrade:16, scienceGrade:15, stream:'Scientifique', status:'Validé',
  },
  {
    email:'hadiajalal@gmail.com', password:'Hdi#2420',
    firstName:'Hadia',   lastName:'Jalal',
    nin:'2400162345678901', birthDate:new Date('2004-08-03'), birthPlace:'Oran',
    gender:'F', adress:'Rue Lavigerie, Oran', phone:'+213610000255',
    level:'L1', matricule:'2024-ST-006',
    choiceL1: null, choice:'Sciences et Technologies (ST)',
    bacAverage:17.00, mathGrade:18, scienceGrade:16, stream:'Technique Math', status:'Validé',
  },
 
  {
    email:'mahdiouarbi@gmail.com', password:'Mah#2301',
    firstName:'Mahdi',   lastName:'Ouarbi',
    nin:'2400212345678901', birthDate:new Date('2003-03-26'), birthPlace:'Oran',
    gender:'M', adress:'Rue des Ecoles, Oran', phone:'+213510000340',
    level:'L2', matricule:'2023-INFO-001',
    choiceL1:'Informatique', choice:'Informatique',
    credits: 60, status: 'Admis',
  },
  {
    email:'nabilrafali@gmail.com', password:'Nab#2302',
    firstName:'Nabil',   lastName:'Rafali',
    nin:'2400232345678901', birthDate:new Date('2003-04-08'), birthPlace:'Oran',
    gender:'M', adress:'Rue du Lycee, Oran', phone:'+213710000374',
    level:'L2', matricule:'2023-INFO-002',
    choiceL1:'Informatique', choice:'Informatique',
    credits: 45, status: 'Ajourné',
  },
  {
    email:'othmantahar@gmail.com', password:'Oth#2303',
    firstName:'Othman',  lastName:'Tahar',
    nin:'2400252345678901', birthDate:new Date('2003-08-15'), birthPlace:'Oran',
    gender:'M', adress:'Boulevard du 15 Mai, Oran', phone:'+213610000408',
    level:'L2', matricule:'2023-INFO-003',
    choiceL1:'Informatique', choice:'Informatique',
    credits: 30, status: 'En attente',
  },
  {
    email:'saratoufik@gmail.com', password:'Sar#2304',
    firstName:'Sara',    lastName:'Toufik',
    nin:'2400262345678901', birthDate:new Date('2004-02-05'), birthPlace:'Oran',
    gender:'F', adress:'Rue de la Paix, Oran', phone:'+213710000425',
    level:'L2', matricule:'2023-INFO-004',
    choiceL1:'Informatique', choice:'Informatique',
    credits: 58, status: 'Admis',
  },
  {
    email:'samiayoussef@gmail.com', password:'Smy#2305',
    firstName:'Samia',   lastName:'Youssef',
    nin:'2400282345678901', birthDate:new Date('2004-07-18'), birthPlace:'Oran',
    gender:'F', adress:'Rue Larbi Ben M hidi, Oran', phone:'+213610000459',
    level:'L2', matricule:'2023-INFO-005',
    choiceL1:'Informatique', choice:'Informatique',
    credits: 22, status: 'En attente',
  },
  {
    email:'zahrazemali@gmail.com', password:'Zah#2306',
    firstName:'Zahra',   lastName:'Zemali',
    nin:'2400302345678901', birthDate:new Date('2004-03-29'), birthPlace:'Oran',
    gender:'F', adress:'Rue de la Mer, Oran', phone:'+213510000493',
    level:'L2', matricule:'2023-INFO-006',
    choiceL1:'Informatique', choice:'Informatique',
    credits: 54, status: 'En attente',
  },
  {
    email:'bouchrabenali@gmail.com', password:'Bou#2307',
    firstName:'Bouchra',  lastName:'Benali',
    nin:'2400322345678901', birthDate:new Date('2004-02-01'), birthPlace:'Oran',
    gender:'F', adress:'Boulevard Lacanau, Oran', phone:'+213710000527',
    level:'L2', matricule:'2023-INFO-007',
    choiceL1:'Informatique', choice:'Informatique',
    credits: 15, status: 'Ajourné',
  },
  {
    email:'cherifbensaid@gmail.com', password:'Chr#2308',
    firstName:'Cherif',  lastName:'Bensaid',
    nin:'2400332345678901', birthDate:new Date('2003-08-04'), birthPlace:'Oran',
    gender:'M', adress:'Avenue du General de Gaulle, Oran', phone:'+213510000544',
    level:'L2', matricule:'2023-INFO-008',
    choiceL1:'Informatique', choice:'Informatique',
    credits: 40, status: 'En attente',
  },
 
  {
    email:'nawalsaadi@gmail.com', password:'Naw#2309',
    firstName:'Nawal',   lastName:'Saadi',
    nin:'2400242345678901', birthDate:new Date('2004-10-20'), birthPlace:'Oran',
    gender:'F', adress:'Rue du Port, Oran', phone:'+213510000391',
    level:'L2', matricule:'2023-MATH-001',
    choiceL1:'Mathématiques', choice:'Mathématiques',
    credits: 60, status: 'En attente',
  },
  {
    email:'wassimzali@gmail.com', password:'Was#2310',
    firstName:'Wassim',  lastName:'Zali',
    nin:'2400292345678901', birthDate:new Date('2003-09-11'), birthPlace:'Oran',
    gender:'M', adress:'Rue de Tizi Ouzou, Oran', phone:'+213710000476',
    level:'L2', matricule:'2023-MATH-002',
    choiceL1:'Mathématiques', choice:'Mathématiques',
    credits: 35, status: 'En attente',
  },
  {
    email:'dalilabennani@gmail.com', password:'Dal#2311',
    firstName:'Dalila',  lastName:'Bennani',
    nin:'2400342345678901', birthDate:new Date('2004-10-09'), birthPlace:'Oran',
    gender:'F', adress:'Rue du Stade, Oran', phone:'+213610000561',
    level:'L2', matricule:'2023-MATH-003',
    choiceL1:'Mathématiques', choice:'Mathématiques',
    credits: 18, status: 'En attente',
  },
  {
    email:'hasnabougrine@gmail.com', password:'Hsn#2312',
    firstName:'Hasna',   lastName:'Bougrine',
    nin:'2400382345678901', birthDate:new Date('2004-06-29'), birthPlace:'Oran',
    gender:'F', adress:'Rue Abdelkader Alloula, Oran', phone:'+213710000629',
    level:'L2', matricule:'2023-MATH-004',
    choiceL1:'Mathématiques', choice:'Mathématiques',
    credits: 50, status: 'En attente',
  },
 
  {
    email:'nadirapetite@gmail.com', password:'Ndr#2313',
    firstName:'Nadira',  lastName:'Petite',
    nin:'2400222345678901', birthDate:new Date('2004-11-13'), birthPlace:'Oran',
    gender:'F', adress:'Boulevard Ben Boulaid, Oran', phone:'+213610000357',
    level:'L2', matricule:'2023-ST-001',
    choiceL1:'Sciences et Technologies (ST)', choice:'Chimie',
    credits: 42, status: 'En attente',
  },
  {
    email:'samirwalid@gmail.com', password:'Smw#2314',
    firstName:'Samir',   lastName:'Walid',
    nin:'2400272345678901', birthDate:new Date('2003-11-30'), birthPlace:'Oran',
    gender:'M', adress:'Avenue de la Republique, Oran', phone:'+213510000442',
    level:'L2', matricule:'2023-ST-002',
    choiceL1:'Sciences et Technologies (ST)', choice:'Chimie',
    credits: 27, status: 'En attente',
  },
  {
    email:'abdelkarimbrahimi@gmail.com', password:'Abd#2315',
    firstName:'Abdelkarim', lastName:'Brahimi',
    nin:'2400312345678901', birthDate:new Date('2003-05-14'), birthPlace:'Oran',
    gender:'M', adress:'Rue Henri Martin, Oran', phone:'+213610000510',
    level:'L2', matricule:'2023-ST-003',
    choiceL1:'Sciences et Technologies (ST)', choice:'Chimie',
    credits: 60, status: 'En attente',
  },
  {
    email:'eddinebenali@gmail.com', password:'Edd#2316',
    firstName:'Eddine',  lastName:'Benali',
    nin:'2400352345678901', birthDate:new Date('2003-11-23'), birthPlace:'Oran',
    gender:'M', adress:'Boulevard Terence, Oran', phone:'+213710000578',
    level:'L2', matricule:'2023-ST-004',
    choiceL1:'Sciences et Technologies (ST)', choice:'Chimie',
    credits: 12, status: 'En attente',
  },
  {
    email:'farahbenhadid@gmail.com', password:'Fra#2317',
    firstName:'Farah',   lastName:'Benhadid',
    nin:'2400362345678901', birthDate:new Date('2004-04-15'), birthPlace:'Oran',
    gender:'F', adress:'Rue Oran, Oran', phone:'+213510000595',
    level:'L2', matricule:'2023-ST-005',
    choiceL1:'Sciences et Technologies (ST)', choice:'Chimie',
    credits: 55, status: 'En attente',
  },
  {
    email:'gamalbounoua@gmail.com', password:'Gam#2318',
    firstName:'Gamal',   lastName:'Bounoua',
    nin:'2400372345678901', birthDate:new Date('2003-12-02'), birthPlace:'Oran',
    gender:'M', adress:'Rue du Commerce, Oran', phone:'+213610000612',
    level:'L2', matricule:'2023-ST-006',
    choiceL1:'Sciences et Technologies (ST)', choice:'Chimie',
    credits: 33, status: 'En attente',
  },
  {
    email:'ibrahimbouhachem@gmail.com', password:'Ibr#2319',
    firstName:'Ibrahim', lastName:'Bouhachem',
    nin:'2400392345678901', birthDate:new Date('2003-03-10'), birthPlace:'Oran',
    gender:'M', adress:'Rue Amar Saadani, Oran', phone:'+213510000646',
    level:'L2', matricule:'2023-ST-007',
    choiceL1:'Sciences et Technologies (ST)', choice:'Chimie',
    credits: 8, status: 'En attente',
  },
  {
    email:'jamilaboukrim@gmail.com', password:'Jam#2320',
    firstName:'Jamila',  lastName:'Boukrim',
    nin:'2400402345678901', birthDate:new Date('2004-09-08'), birthPlace:'Oran',
    gender:'F', adress:'Boulevard Zighoud Youcef, Oran', phone:'+213610000663',
    level:'L2', matricule:'2023-ST-008',
    choiceL1:'Sciences et Technologies (ST)', choice:'Chimie',
    credits: 48, status: 'En attente',
  },
 
  {
    email:'kamelboutaleb@gmail.com', password:'Kml#2201',
    firstName:'Kamel',   lastName:'Boutaleb',
    nin:'2400412345678901', birthDate:new Date('2003-05-26'), birthPlace:'Oran',
    gender:'M', adress:'Rue Abdallah Ben Salem, Oran', phone:'+213710000680',
    level:'L3', matricule:'2022-INFO-001',
    choiceL1:'Informatique', choice:'Informatique',
    credits: 60, status: 'Admis',
  },
  {
    email:'mehdidarak@gmail.com', password:'Mhd#2202',
    firstName:'Mehdi',   lastName:'Darak',
    nin:'2400432345678901', birthDate:new Date('2003-10-01'), birthPlace:'Oran',
    gender:'M', adress:'Rue Sadek Hadjeres, Oran', phone:'+213610000714',
    level:'L3', matricule:'2022-INFO-002',
    choiceL1:'Informatique', choice:'Informatique',
    credits: 38, status: 'En cours',
  },
  {
    email:'omargendji@gmail.com', password:'Omr#2203',
    firstName:'Omar',    lastName:'Gendji',
    nin:'2400452345678901', birthDate:new Date('2003-06-04'), birthPlace:'Oran',
    gender:'M', adress:'Boulevard 1er Novembre, Oran', phone:'+213510000748',
    level:'L3', matricule:'2022-INFO-003',
    choiceL1:'Informatique', choice:'Informatique',
    credits: 55, status: 'Admis',
  },
  {
    email:'rabahkechida@gmail.com', password:'Rab#2204',
    firstName:'Rabah',   lastName:'Kechida',
    nin:'2400472345678901', birthDate:new Date('2003-11-05'), birthPlace:'Oran',
    gender:'M', adress:'Rue du 19 Mars 1962, Oran', phone:'+213710000782',
    level:'L3', matricule:'2022-INFO-004',
    choiceL1:'Informatique', choice:'Informatique',
    credits: 20, status: 'Ajourné',
  },
  {
    email:'tarekmansour@gmail.com', password:'Trk#2205',
    firstName:'Tarek',   lastName:'Mansour',
    nin:'2400492345678901', birthDate:new Date('2003-07-22'), birthPlace:'Oran',
    gender:'M', adress:'Rue Didouche Mourad, Oran', phone:'+213610000816',
    level:'L3', matricule:'2022-INFO-005',
    choiceL1:'Informatique', choice:'Informatique',
    credits: 47, status: 'En attente',
  },
  {
    email:'oussamanaciri@gmail.com', password:'Ous#2206',
    firstName:'Oussama', lastName:'Naciri',
    nin:'2400502345678901', birthDate:new Date('2004-03-03'), birthPlace:'Oran',
    gender:'M', adress:'Boulevard de la Corniche, Oran', phone:'+213710000833',
    level:'L3', matricule:'2022-INFO-006',
    choiceL1:'Informatique', choice:'Informatique',
    credits: 3, status: 'En cours',
  },
  {
    email:'zahiroulali@gmail.com', password:'Zhr#2207',
    firstName:'Zahir',   lastName:'Oulali',
    nin:'2400522345678901', birthDate:new Date('2003-12-27'), birthPlace:'Skikda',
    gender:'M', adress:'Rue Colonel Lotfi, Skikda', phone:'+213610000867',
    level:'L3', matricule:'2022-INFO-007',
    choiceL1:'Informatique', choice:'Informatique',
    credits: 60, status: 'En attente',
  },
  {
    email:'djalalziane@gmail.com', password:'Djl#2208',
    firstName:'Djalal',  lastName:'Ziane',
    nin:'2400562345678901', birthDate:new Date('2003-09-07'), birthPlace:'Constantine',
    gender:'M', adress:'Rue Mouloud Feraoun, Constantine', phone:'+213710000935',
    level:'L3', matricule:'2022-INFO-008',
    choiceL1:'Informatique', choice:'Informatique',
    credits: 32, status: 'En attente',
  },
  {
    email:'imenebenhaddad@gmail.com', password:'Imb#2209',
    firstName:'Imene',   lastName:'Benhaddad',
    nin:'2400592345678901', birthDate:new Date('2004-08-14'), birthPlace:'Setif',
    gender:'F', adress:'Rue du Marche, Setif', phone:'+213710000986',
    level:'L3', matricule:'2022-INFO-009',
    choiceL1:'Informatique', choice:'Informatique',
    credits: 57, status: 'En attente',
  },
  {
    email:'kamelzerhari@gmail.com', password:'Kmz#2210',
    firstName:'Kamel',   lastName:'Zerhari',
    nin:'2400602345678901', birthDate:new Date('2003-10-19'), birthPlace:'Tlemcen',
    gender:'M', adress:'Boulevard de la Paix, Tlemcen', phone:'+213510001003',
    level:'L3', matricule:'2022-INFO-010',
    choiceL1:'Informatique', choice:'Informatique',
    credits: 14, status: 'En attente',
  },
 
  {
    email:'nadiafarhat@gmail.com', password:'Ndf#2211',
    firstName:'Nadia',   lastName:'Farhat',
    nin:'2400442345678901', birthDate:new Date('2004-08-24'), birthPlace:'Oran',
    gender:'F', adress:'Rue Mohamed Khadra, Oran', phone:'+213710000731',
    level:'L3', matricule:'2022-MATH-001',
    choiceL1:'Mathématiques', choice:'Mathématiques',
    credits: 60, status: 'En attente',
  },
  {
    email:'selmalarbi@gmail.com', password:'Slm#2212',
    firstName:'Selma',   lastName:'Larbi',
    nin:'2400482345678901', birthDate:new Date('2004-02-12'), birthPlace:'Oran',
    gender:'F', adress:'Avenue de Beni Snous, Oran', phone:'+213510000799',
    level:'L3', matricule:'2022-MATH-002',
    choiceL1:'Mathématiques', choice:'Mathématiques',
    credits: 29, status: 'En attente',
  },
  {
    email:'aminayasmina@gmail.com', password:'Amy#2213',
    firstName:'Amina',   lastName:'Yasmina',
    nin:'2400532345678901', birthDate:new Date('2004-11-04'), birthPlace:'Oran',
    gender:'F', adress:'Rue Mouloud Feraoun, Oran', phone:'+213710000884',
    level:'L3', matricule:'2022-MATH-003',
    choiceL1:'Mathématiques', choice:'Mathématiques',
    credits: 44, status: 'En attente',
  },
  {
    email:'fatihazouaoui@gmail.com', password:'Ftz#2214',
    firstName:'Fatiha',  lastName:'Zouaoui',
    nin:'2400572345678901', birthDate:new Date('2004-06-30'), birthPlace:'Algiers',
    gender:'F', adress:'Boulevard Maamar Youcef, Alger', phone:'+213510000952',
    level:'L3', matricule:'2022-MATH-004',
    choiceL1:'Mathématiques', choice:'Mathématiques',
    credits: 7, status: 'En attente',
  },
 
  {
    email:'lailachekili@gmail.com', password:'Lal#2215',
    firstName:'Laila',   lastName:'Chekili',
    nin:'2400422345678901', birthDate:new Date('2004-01-14'), birthPlace:'Oran',
    gender:'F', adress:'Avenue du 8 Mai 1945, Oran', phone:'+213510000697',
    level:'L3', matricule:'2022-ST-001',
    choiceL1:'Sciences et Technologies (ST)', choice:'Chimie Fondamentale',
    credits: 52, status: 'En attente',
  },
  {
    email:'pacehamim@gmail.com', password:'Pac#2216',
    firstName:'Pace',    lastName:'Hamim',
    nin:'2400462345678901', birthDate:new Date('2004-12-30'), birthPlace:'Oran',
    gender:'F', adress:'Rue Ammar Bouras, Oran', phone:'+213610000765',
    level:'L3', matricule:'2022-ST-002',
    choiceL1:'Sciences et Technologies (ST)', choice:'Chimie Fondamentale',
    credits: 36, status: 'En attente',
  },
  {
    email:'yaelleoclima@gmail.com', password:'Yae#2217',
    firstName:'Yaelle',  lastName:'Oclima',
    nin:'2400512345678901', birthDate:new Date('2004-09-09'), birthPlace:'Algiers',
    gender:'F', adress:'Rue Amirouche, Alger', phone:'+213510000850',
    level:'L3', matricule:'2022-ST-003',
    choiceL1:'Sciences et Technologies (ST)', choice:'Chimie Analytique',
    credits: 60, status: 'En attente',
  },
  {
    email:'brahimzeghdoune@gmail.com', password:'Brh#2218',
    firstName:'Brahim',  lastName:'Zeghdoune',
    nin:'2400542345678901', birthDate:new Date('2003-04-24'), birthPlace:'Tlemcen',
    gender:'M', adress:'Rue Emir Abdelkader, Tlemcen', phone:'+213510000901',
    level:'L3', matricule:'2022-ST-004',
    choiceL1:'Sciences et Technologies (ST)', choice:'Chimie Analytique',
    credits: 11, status: 'En attente',
  },
  {
    email:'cherifazohra@gmail.com', password:'Czh#2219',
    firstName:'Cherifa', lastName:'Zohra',
    nin:'2400552345678901', birthDate:new Date('2004-05-02'), birthPlace:'Setif',
    gender:'F', adress:'Rue du Lycee, Setif', phone:'+213610000918',
    level:'L3', matricule:'2022-ST-005',
    choiceL1:'Sciences et Technologies (ST)', choice:'Chimie des Matériaux (GP)',
    credits: 43, status: 'En attente',
  },
  {
    email:'guyaben@gmail.com', password:'Guy#2220',
    firstName:'Guy',     lastName:'Aben',
    nin:'2400582345678901', birthDate:new Date('2003-03-22'), birthPlace:'Annaba',
    gender:'M', adress:'Avenue de la Republique, Annaba', phone:'+213610000969',
    level:'L3', matricule:'2022-ST-006',
    choiceL1:'Sciences et Technologies (ST)', choice:'Chimie des Matériaux (GP)',
    credits: 25, status: 'En attente',
  },
];
 
async function main() {
  console.log("Nettoyage de la base de données...");
  
  await prisma.user.deleteMany({});
 
  console.log(`Seeding ${students.length} étudiants...`);
 
  for (const s of students) {
    const profileData = {
      matricule:  s.matricule,
      nin:        s.nin,
      firstName:  s.firstName,
      lastName:   s.lastName,
      birthDate:  s.birthDate ? new Date(s.birthDate) : null,
      birthPlace: s.birthPlace,
      gender:     s.gender,
      adress:     s.adress,
      phone:      s.phone,
      level:      s.level,
      credits:    s.credits || 0,
      status:     s.status || 'En cours de traitement',
      choiceL1:   s.choiceL1 ?? s.choice ?? null,
      choiceL3:   s.choiceL3 ?? s.choicel3 ?? null, 
    };
 
    if (s.level === 'L1') {
      profileData.bacAverage   = s.bacAverage;
      profileData.mathGrade    = s.mathGrade;
      profileData.scienceGrade = s.scienceGrade;
      profileData.stream       = s.stream;
    }
 
await prisma.user.upsert({
  where: { email: s.email },
  update: {
    studentProfile: {
      update: profileData // Cela mettra à jour les données existantes
    }
  },
  create: {
    email: s.email,
    passwordHash: s.passwordHash || "UniGate2026#",
    role: "STUDENT",
    studentProfile: {
      create: profileData
    }
  }
});
 
    console.log(`  ${s.matricule} - ${s.firstName} ${s.lastName} [${s.level}]`);
  }
 
  console.log(`\nSeed terminé avec succès : ${students.length} étudiants insérés.`);
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
 
 export { students };

