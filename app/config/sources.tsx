import beefImg from '@public/projects/beef-1.webp';
import erdTreeImg from '@public/projects/erdtreee.png';
import identiaImg from '@public/projects/identia.webp';

export const cards = [
  {
    id: 1,
    dateStart: '2024-08',
    dateFinish: 'Present',
    title: 'Senior Frontend Engineer',
    company: '· Aiola',
    description: `Created and deployed to production AI Model Publish flow UI and back end using AWS DynamoDB/AppSync for data storage/retrieval and Prefect to track asynchronous job status. 
  Applied short-polling strategy to synchronize Front End with AWS DynamoDB using Nest.js Back end as a proxy
  Unified three endpoint requests into a single one resulting in improved request latency and a lower amount of unnecessary FE state changes
  Integrated and set up ESLint ( tsconfig ) with Husky to improve codebase quality and lower the amount of CI runs.
  `,
    techStack: [
      'TypeScript',
      'Nest.js',
      'React',
      'Jest',
      'React Testing Library',
      'AWS',
      'AppSync',
      'DynamoDB',
      'Prefect',
    ],
    link: 'https://aiola.com/',
  },
  {
    id: 2,
    dateStart: '2023-02',
    dateFinish: '2024-08',
    title: 'Senior Frontend Engineer',
    company: '· Playtika',
    description: `Created a dynamic Redux storage with multiple nested layers. 
  Added an FE-based version-controlled migration mechanism
  Refactored a large monolithic application into independent modules 
  Improved campaign managers’ performance by 50%`,
    techStack: [
      'React',
      'Typescript',
      'Redux',
      'Redux-saga',
      'Recharts',
      'Ag-Grid',
    ],
    link: 'https://www.playtika.com/',
  },
  {
    id: 3,
    dateStart: '2022/02',
    dateFinish: '2023/02',
    title: 'Senior Frontend Engineer, Accessibility',
    company: '· Nearmap',
    description: `Set up a Dockerized microfrontend service with React/Redux. 
      Introduced the application to the team with and integrated into a large in-production product.
  Improved AVG application rating by 0.2 (4.3 -> 4.5).`,
    techStack: [
      'React',
      'Jest/React Testing Library',
      'Docker',
      'Redux',
      'Redux-saga',
      'HTML/SCSS',
      'Typescript',
    ],
    link: 'https://www.nearmap.com/',
  },
  {
    id: 4,
    dateStart: '2019/06',
    dateFinish: '2022/02',
    title: 'Middle Frontend Engineer',
    company: '· Altexsoft',
    description: `Internal Forum: Leading a team of Front End junior developers, creating and assigning tasks, grooming and decomposing stories, setting up front end
  Video recording software: Created a custom video player using Canvas, merging two video streams using WebRTC
  Set up initial Front End structure for Next.js, React, Redux and Webpack.`,
    techStack: [
      'React',
      'Next.js',
      'WebRTC',
      'Canvas',
      'HTML/SCSS',
      'Typescript',
    ],
    link: 'https://www.altexsoft.com/',
  },
  {
    id: 5,
    dateStart: '2018/01',
    dateFinish: '2019/06',
    title: 'Junior Frontend Engineer',
    company: '· Plarium',
    description: `Browser App: Building and maintaining online chat, web app and user forum
  Desktop App with Electron: Creating and maintaining React modules, setting up Routes and ensuring static typing with Typescript.`,
    techStack: ['React', 'Electron', 'Typescript'],
    link: 'https://plarium.com/',
  },
];

export const projectCardList = [
  {
    id: 1,
    title: 'Erdtree',
    company: '· Distributed Key-Value Store System',
    description: `Distributed key-value store system implementing a master-slave replication pattern with Write-Ahead Logging (WAL) for durability. 
      The system is built using Go, Connect-RPC, and Protocol Buffers, designed to provide high availability and eventual consistency leveraging sync Map.`,
    techStack: ['Golang', 'gRPC/ConnectRPC', 'Protocol Buffer'],
    imgSrc: erdTreeImg,
    link: 'https://github.com/alexxpetrov/erdtree',
  },
  {
    id: 2,
    title: 'Identia',
    company: '· JWT Auth microservice with WebAuthn',
    description: `Identia is a robust JWT authentication microservice built with Go, integrating WebAuthn for secure passwordless authentication.\
      It's a distributed system with multiple shards that reduce Read operation intesity load to the Master node allowing for high-performance, scalable, and modern authentication workflows.`,
    techStack: [
      'Golang',
      'PostgreSQL',
      'gRPC/ConnectRPC',
      'WebAuthn',
      'Fiber',
      'Gorm',
      'JWT',
    ],
    imgSrc: identiaImg,
    link: 'https://github.com/alexxpetrov/identia-be',
  },
  {
    id: 3,
    title: 'Beef',
    company: '· A distributed high-load chat application',
    description: `A chat platform leveraging Identia for seamless authentication and Erdtree for robust, distributed logs storage.
      Designed for scalability and durability by implementing a cache layer with Redis and message queue with Kafka, the system ensures real-time messaging with master-slave replication and Write-Ahead Logging (WAL) to guarantee data integrity and fault tolerance.`,
    techStack: [
      'Golang',
      'Redis',
      'Kafka',
      'Identia',
      'Erdtree',
      'Docker/Docker Compose',
      'Websocket',
    ],
    imgSrc: beefImg,
    link: 'https://github.com/alexxpetrov/beef',
  },
];
