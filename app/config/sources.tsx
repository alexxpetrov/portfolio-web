import beefImg from '@public/projects/beef-1.webp';
import erdTreeImg from '@public/projects/erdtreee.png';
import identiaImg from '@public/projects/identia.webp';

export const cards = [
  {
    id: 1,
    dateStart: '2023-02',
    dateFinish: '2025-02',
    title: 'Senior Frontend Engineer',
    company: '· Playtika',
    description: `Improved budget managers’ performance by 64.8% after a major refactoring of a monolithic application.
Integrated Websocket into review tool cutting budget planning costs by 24.2%.
Added offline mode to the budget planning app reducing overall time spent while planning by 38.7%.
Deployed Next.js budget planning app cutting costs by 26.4%.`,
    techStack: [
      'React',
      'Typescript',
      'Next.js',
      'Redux',
      'Redux-saga',
      'Recharts',
      'Ag-Grid',
      'Zustand',
      'Jest/React Testing Library',
      'Playwright',
      'Go',
      'Websockets',
      'Redis',
      'Kafka',
      'PosgreSQL',
    ],
    link: 'https://www.playtika.com/',
  },
  {
    id: 2,
    dateStart: '2021/02',
    dateFinish: '2023/02',
    title: 'Senior Frontend Engineer, Accessibility',
    company: '· Nearmap',
    description: `Developer a service with AI features, improving application average rating to 4.74 (4.28 -> 4.74).
Increased the amount of test coverage to 95.4% (84.3% -> 95.4%).
Integrated Playwright E2E reducing error rate by 38.4%.
Optimised assets and application reducing initial load by 1.24s.
Team lead of 4 developers in a Scrum team.
Improved UX with service graceful degradation`,
    techStack: [
      'React',
      'Docker',
      'Redux',
      'Redux-saga',
      'HTML/SCSS',
      'Typescript',
      'Vite',
      'Vitest',
      'Nest.js',
      'AWS/AppSync',
      'DynamoDB',
      'Prefect',
    ],
    link: 'https://www.nearmap.com/',
  },
  {
    id: 3,
    dateStart: '2019/06',
    dateFinish: '2021/02',
    title: 'Middle Frontend Engineer',
    company: '· Netflix',
    description: `Developer WebRTC recording application improving in-house agents performance by 48.2%.
Integrated UI tests and Typescript reducing the error rate by 27.8%.
Optimised React modules and improved performance of agents by 17.2%. `,
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
    id: 4,
    dateStart: '2018/01',
    dateFinish: '2019/06',
    title: 'Junior Frontend Engineer',
    company: '· Plarium',
    description: `Created online chat with Websockets.
Delivered a redesigned forum improving players’ reviews.
Desktop App with Electron: Creating and maintaining React modules, setting up Routes.`,
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
