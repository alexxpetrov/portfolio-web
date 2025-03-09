'use client';

import { CardList } from 'components/CardList/CardList';
import { JobCard } from 'components/JobCard/JobCard';
import { ProjectCard } from 'components/ProjectCard/ProjectCard';
import { cards, projectCardList } from 'config/sources';
import { useSectionTracking } from 'hooks/useSectionTracking';

export default function Home() {
  useSectionTracking();

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
              {/* <ul className="mt-16 w-max">
                <li>
                  <a
                    className="group flex items-center py-3"
                    href="/chat"
                    target="_blank"
                  >
                    <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">
                      Chat Demo
                    </span>
                  </a>
                </li>
              </ul> */}
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
                  className="size-6"
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
                  className="size-6"
                  aria-hidden="true"
                >
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-center justify-center gap-8 pt-24 lg:w-[52%] lg:py-24">
          <section
            id="about"
            className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
          >
            <p className="mb-4">
              I'm afull‑stack developer with 6+ years of commercial experience, working in teams ranging from 2 to 40 members, both remotely and on‑site.
              I have 2 years of team leadership experience managing the entire development cycle—from gathering product owner requirements to releasing a
              fully optimized web application with high test coverage, detailed analytics, and continuous integration/continuous deployment (CI/CD).
              I am an expert in building responsive, high‑performance web solutions.
            </p>
            <p className="mb-4">
              In the past, I’ve worked with a diverse range of companies—from
              <a
                className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
                rel="noreferrer noopener"
                href="https://www.netflix.com"
                target="_blank"
              >
                {' '}
                successful streaming services
              </a>
              {' '}
              to
              {' '}
              <a
                className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
                rel="noreferrer noopener"
                href="https://www.nearmap.com/"
                target="_blank"
              >
                geospatial solutions
                {' '}
              </a>
              {' '}
              and
              {' '}
              <a
                className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
                rel="noreferrer noopener"
                href="https://www.playtika.com/"
                target="_blank"
              >
                {' '}
                digital entertainment corporations
              </a>
              {' '}
              as well as
              {' '}
              <a
                className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
                rel="noreferrer noopener"
                href="https://plarium.com/"
                target="_blank"
              >
                {' '}
                successful mobile game studios
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
                {' '}
                YouTube channel
              </a>
              , where I showcase recent pet projects I
              {'\''}
              m working on and a
              <a
                className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
                rel="noreferrer noopener"
                href="https://github.com/alexxpetrov"
                target="_blank"
              >
                {' '}
                GitHub
              </a>
              {' '}
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
            {cards.map(card => (
              <JobCard {...card} key={card.id} />
            ))}
            <div className="mt-12">
              <a
                className="group/link inline-flex items-baseline text-base font-semibold leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="View Full Resume (opens in a new tab)"
              >
                <span>
                  View Full
                  {' '}
                  <span className="inline-block">
                    Resume
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="ml-1 inline-block size-4 shrink-0 translate-y-px transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                        clipRule="evenodd"
                      >
                      </path>
                    </svg>
                  </span>
                </span>
              </a>
            </div>
          </CardList>

          <CardList id="projects">
            {projectCardList.map(card => (
              <ProjectCard {...card} key={card.id} />
            ))}
          </CardList>
          <div>
            Stumbled across the portfolio
            {' '}
            <a
              className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
              href="https://github.com/bchiang7"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="digital product studio (opens in a new tab)"
            >
              Brittany Chiang
              {' '}
            </a>
            did at
            {' '}
            <a
              className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
              href="https://brittanychiang.com"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="digital product studio (opens in a new tab)"
            >
              her website
              {' '}
            </a>
            and couldn
            {'\''}
            t resist copying it for mine
          </div>
        </div>
      </div>
    </div>
  );
}
