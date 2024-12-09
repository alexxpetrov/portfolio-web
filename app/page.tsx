"use client";

import erdTreeImg from "@public/projects/erdtree-arch.png";
import { CardList } from "components/CardList/CardList";
import { JobCard } from "components/JobCard/JobCard";
import { ProjectCard } from "components/ProjectCard/ProjectCard";
import { useEffect } from "react";

const cards = [
  {
    id: 1,
    dateStart: "2024-08",
    dateFinish: "Present",
    title: "Senior Frontend Engineer",
    company: "· Aiola",
    description: `Created and deployed to production AI Model Publish flow UI and back end using AWS DynamoDB/AppSync for data storage/retrieval and Prefect to track asynchronous job status. 
Applied short-polling strategy to synchronize Front End with AWS DynamoDB using Nest.js Back end as a proxy
Unified three endpoint requests into a single one resulting in improved request latency and a lower amount of unnecessary FE state changes
Integrated and set up ESLint ( tsconfig ) with Husky to improve codebase quality and lower the amount of CI runs.
`,
    techStack: [
      "TypeScript",
      "Nest.js",
      "React",
      "Jest",
      "React Testing Library",
      "AWS",
      "AppSync",
      "DynamoDB",
      "Prefect",
    ],
    link: "https://aiola.com/",
  },
  {
    id: 2,
    dateStart: "2023-02",
    dateFinish: "2024-08",
    title: "Senior Frontend Engineer",
    company: "· Playtika",
    description: `Created a dynamic Redux storage with multiple nested layers. 
Added an FE-based version-controlled migration mechanism
Refactored a large monolithic application into independent modules 
Improved campaign managers’ performance by 50%`,
    techStack: [
      "React",
      "Typescript",
      "Redux",
      "Redux-saga",
      "Recharts",
      "Ag-Grid",
    ],
    link: "https://www.playtika.com/",
  },
  {
    id: 3,
    dateStart: "2022/02",
    dateFinish: "2023/02",
    title: "Senior Frontend Engineer, Accessibility",
    company: "· Nearmap",
    description: `Build and maintain critical components used to construct Klaviyo
              frontend, across the whole product. Work closely with
              cross-functional teams, including developers, designers, and
              product managers, to implement and advocate for best practices in
              web accessibility.`,
    techStack: ["JavaScript", "TypeScript", "Golang", "Backend"],
    link: "https://www.nearmap.com/",
  },
  {
    id: 4,
    dateStart: "2019/06",
    dateFinish: "2022/02",
    title: "Middle Frontend Engineer",
    company: "· Altexsoft",
    description: `Internal Forum: Leading a team of Front End junior developers, creating and assigning tasks, grooming and decomposing stories, setting up front end
Video recording software: Created a custom video player using Canvas, merging two video streams using WebRTC
Set up initial Front End structure for Next.js, React, Redux and Webpack.`,
    techStack: [
      "React",
      "Next.js",
      "WebRTC",
      "Canvas",
      "HTML/SCSS",
      "Typescript",
    ],
    link: "https://www.altexsoft.com/",
  },
  {
    id: 5,
    dateStart: "2018/01",
    dateFinish: "2019/06",
    title: "Junior Frontend Engineer",
    company: "· Plarium",
    description: `Browser App: Building and maintaining online chat, web app and user forum
Desktop App with Electron: Creating and maintaining React modules, setting up Routes and ensuring static typing with Typescript.`,
    techStack: ["React", "Electron", "Typescript"],
    link: "https://plarium.com/",
  },
];
const projectCardList = [
  {
    id: 1,
    title: "Erdtree",
    company: "· Distributed Key-Value Store System",
    description: `Distributed key-value store system implementing a master-slave replication pattern with Write-Ahead Logging (WAL) for durability. 
    The system is built using Go, Connect-RPC, and Protocol Buffers, designed to provide high availability and eventual consistency leveraging sync Map.`,
    techStack: ["Golang", "gRPC/ConnectRPC", "Protocol Buffer"],
    imgSrc: erdTreeImg,
    link: "https://github.com/alexxpetrov/erdtree",
  },
  {
    id: 2,
    title: "Identia",
    company: "· JWT Auth microservice with WebAuthn",
    description: `Identia is a robust JWT authentication microservice built with Go, integrating WebAuthn for secure passwordless authentication.\
    It's a distributed system with multiple shards that reduce Read operation intesity load to the Master node allowing for high-performance, scalable, and modern authentication workflows.`,
    techStack: [
      "Golang",
      "PostgreSQL",
      "gRPC/ConnectRPC",
      "WebAuthn",
      "Fiber",
      "Gorm",
      "JWT",
    ],
    imgSrc: erdTreeImg,
    link: "https://github.com/alexey-petrov/go-webauthn",
  },
  {
    id: 3,
    title: "Pulse",
    company: "· A distributed high-load chat application",
    description: `A chat platform leveraging Identia for seamless authentication and Erdtree for robust, distributed data storage. 
    Designed for scalability and durability, the system ensures real-time messaging with master-slave replication and Write-Ahead Logging (WAL) to guarantee data integrity and fault tolerance. 
    Whether for personal or enterprise use, this chat app delivers a fast, secure, and reliable communication experience.`,
    techStack: [
      "Golang",
      "Redis",
      "Kafka",
      "Identia",
      "Erdtree",
      "Docker/Docker Compose",
      "Websocket",
    ],
    imgSrc: erdTreeImg,
    link: "https://github.com/alexey-petrov/go-webauthn",
  },
];

export default function Home() {
  useEffect(() => {
    const menuItems = document.querySelectorAll("nav a");
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Remove active class from all menu items

            menuItems.forEach((item) => item.classList.remove("active"));
            // Add active class to the menu item linked to the visible section
            const activeMenu = document.querySelector(
              `a[href="#${entry.target.id}"]`
            );

            activeMenu!.classList.add("active");
          }
        });
      },
      {
        root: null, // Viewport
        threshold: 0.7, // Trigger when 50% of the section is visible
      }
    );

    // Observe each section
    sections.forEach((section) => observer.observe(section));

    // Cleanup on unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-16 lg:py-0">
      <div className="lg:flex lg:justify-between lg:gap-4">
        <div className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-24">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
              Alex Petrov
            </h1>
            <p className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
              Software Engineer
            </p>
            <p className="mt-4 max-w-xs leading-normal">
              I’m a skilled engineer with 6 years of professional programming
              experience, dedicated to building intuitive, high-performance web
              applications.
            </p>
            <nav
              className="nav hidden lg:block"
              aria-label="In-page jump links"
            >
              <ul className="mt-16 w-max">
                <li>
                  <a className="group flex items-center py-3" href="#about">
                    <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
                    <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">
                      About
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="group flex items-center py-3"
                    href="#experience"
                  >
                    <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
                    <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">
                      Experience
                    </span>
                  </a>
                </li>
                <li>
                  <a className="group flex items-center py-3" href="#projects">
                    <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
                    <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">
                      Projects
                    </span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <ul className="ml-1 mt-8 flex items-center" aria-label="Social media">
            <li className="mr-5 shrink-0 text-xs">
              <a
                className="block hover:text-slate-200"
                href="https://github.com/alexxpetrov"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub (opens in a new tab)"
                title="GitHub"
              >
                <span className="sr-only">GitHub</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                </svg>
              </a>
            </li>
            <li className="mr-5 shrink-0 text-xs">
              <a
                className="block hover:text-slate-200"
                href="https://www.linkedin.com/in/alexpetrovua/"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn (opens in a new tab)"
                title="LinkedIn"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                </svg>
              </a>
            </li>
            <li className="mr-5 shrink-0 text-xs">
              <a
                className="block hover:text-slate-200"
                href="https://github.com/alexxpetrov"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub (opens in a new tab)"
                title="GitHub"
              >
                <span className="sr-only">GitHub</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path
                    d="M3.06 41.732L32 60.932l28.94-19.2V22.268L32 3.068l-28.94 19.2zm57.878 0L32 22.268 3.06 41.732m0-19.463L32 41.47l28.94-19.2M32 3.068v19.2m0 19.463v19.2"
                    strokeWidth="5"
                  ></path>
                </svg>
              </a>
            </li>
            <li className="mr-5 shrink-0 text-xs">
              <a
                className="block hover:text-slate-200"
                href="https://www.youtube.com/@0xAlexP"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="YouTube (opens in a new tab)"
                title="YouTube"
              >
                <span className="sr-only">YouTube</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1000 1000"
                  fill="currentColor"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path d="M295.42,6c-53.2,2.51-89.53,11-121.29,23.48-32.87,12.81-60.73,30-88.45,57.82S40.89,143,28.17,175.92c-12.31,31.83-20.65,68.19-23,121.42S2.3,367.68,2.56,503.46,3.42,656.26,6,709.6c2.54,53.19,11,89.51,23.48,121.28,12.83,32.87,30,60.72,57.83,88.45S143,964.09,176,976.83c31.8,12.29,68.17,20.67,121.39,23s70.35,2.87,206.09,2.61,152.83-.86,206.16-3.39S799.1,988,830.88,975.58c32.87-12.86,60.74-30,88.45-57.84S964.1,862,976.81,829.06c12.32-31.8,20.69-68.17,23-121.35,2.33-53.37,2.88-70.41,2.62-206.17s-.87-152.78-3.4-206.1-11-89.53-23.47-121.32c-12.85-32.87-30-60.7-57.82-88.45S862,40.87,829.07,28.19c-31.82-12.31-68.17-20.7-121.39-23S637.33,2.3,501.54,2.56,348.75,3.4,295.42,6m5.84,903.88c-48.75-2.12-75.22-10.22-92.86-17-23.36-9-40-19.88-57.58-37.29s-28.38-34.11-37.5-57.42c-6.85-17.64-15.1-44.08-17.38-92.83-2.48-52.69-3-68.51-3.29-202s.22-149.29,2.53-202c2.08-48.71,10.23-75.21,17-92.84,9-23.39,19.84-40,37.29-57.57s34.1-28.39,57.43-37.51c17.62-6.88,44.06-15.06,92.79-17.38,52.73-2.5,68.53-3,202-3.29s149.31.21,202.06,2.53c48.71,2.12,75.22,10.19,92.83,17,23.37,9,40,19.81,57.57,37.29s28.4,34.07,37.52,57.45c6.89,17.57,15.07,44,17.37,92.76,2.51,52.73,3.08,68.54,3.32,202s-.23,149.31-2.54,202c-2.13,48.75-10.21,75.23-17,92.89-9,23.35-19.85,40-37.31,57.56s-34.09,28.38-57.43,37.5c-17.6,6.87-44.07,15.07-92.76,17.39-52.73,2.48-68.53,3-202.05,3.29s-149.27-.25-202-2.53m407.6-674.61a60,60,0,1,0,59.88-60.1,60,60,0,0,0-59.88,60.1M245.77,503c.28,141.8,115.44,256.49,257.21,256.22S759.52,643.8,759.25,502,643.79,245.48,502,245.76,245.5,361.22,245.77,503m90.06-.18a166.67,166.67,0,1,1,167,166.34,166.65,166.65,0,0,1-167-166.34"></path>
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <div className="flex items-center justify-center flex-col gap-8 pt-24 lg:w-[52%] lg:py-24">
          <section
            id="about"
            className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
          >
            <p className="mb-4">
              I’m a developer passionate about building intuitive, scalable web
              applications that solve real-world problems with clean,
              maintainable code. My favorite work revolves around crafting
              seamless user experiences, combining cutting-edge technologies
              with efficient solutions for performance and scalability.
            </p>
            <p className="mb-4">
              Currently, I’m expanding my expertise in backend development,
              specializing in Go (Golang), serverless architectures, and cloud
              technologies like AWS. I’ve contributed to projects that integrate
              frontend systems with robust backend solutions. My experience also
              includes optimizing cloud-based infrastructures and implementing
              scalable, low-latency APIs, ensuring seamless integration between
              systems.
            </p>
            <p className="mb-4">
              In the past, I’ve worked with a diverse range of companies—from
              <a
                className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
                rel="noreferrer noopener"
                href="https://aiola.com/"
                target="_blank"
              >
                {" "}
                startups
              </a>{" "}
              to{" "}
              <a
                className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
                rel="noreferrer noopener"
                href="https://www.nearmap.com/"
                target="_blank"
              >
                large companies{" "}
              </a>
              and{" "}
              <a
                className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
                rel="noreferrer noopener"
                href="https://www.playtika.com/"
                target="_blank"
              >
                {" "}
                digital entertainment corporations
              </a>
              , where I tackled challenges like refactoring monolithic apps,
              introducing Dockerized microservices, and improving performance
              through modern development practices. I also have a
              <a
                className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
                rel="noreferrer noopener"
                href="https://www.youtube.com/@0xAlexP"
                target="_blank"
              >
                {" "}
                YouTube channel
              </a>
              , where I showcase recent pet projects I{"'"}m working on and a
              <a
                className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
                rel="noreferrer noopener"
                href="https://www.youtube.com/@0xAlexP"
                target="_blank"
              >
                {" "}
                GitHub
              </a>{" "}
              with my projects. I’m passionate about bridging the gap between
              frontend and backend development and working toward becoming a
              well-rounded engineer.
            </p>
            <p className="mb-4">
              When I’m not coding, you can find me working out at the gym,
              exploring local hiking trails with my dog, or indulging in great
              food at my favorite restaurants.
            </p>
          </section>
          <CardList id="experience">
            {cards.map((card) => (
              <JobCard {...card} key={card.id} />
            ))}
            <div className="mt-12">
              <a
                className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 font-semibold text-slate-200 group/link text-base"
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="View Full Resume (opens in a new tab)"
              >
                <span>
                  View Full{" "}
                  <span className="inline-block">
                    Resume
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </span>
              </a>
            </div>
          </CardList>

          <CardList id="projects">
            {projectCardList.map((card) => (
              <ProjectCard {...card} key={card.id} />
            ))}
          </CardList>
          <div>
            Stumbled across the portfolio{" "}
            <a
              className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
              href="https://github.com/bchiang7"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="digital product studio (opens in a new tab)"
            >
              Brittany Chiang{" "}
            </a>
            did at{" "}
            <a
              className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
              href="https://brittanychiang.com"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="digital product studio (opens in a new tab)"
            >
              her website{" "}
            </a>
            and couldn{"'"}t resist copying it for mine
          </div>
        </div>
      </div>
    </div>
  );
}
