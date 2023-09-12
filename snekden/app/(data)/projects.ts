import { ProjectCardData } from "../types/ProjectData";

// const elizaProject: ProjectCardData = {
//   title: "ElizaChatbot",
//   subtitle: "A replica of the 1960s NLP program",
//   technologies: ["NLP"],
//   link: "./games/eliza",
//   status: "WIP",
//   description:
//     "a recreation of the 60s program with a textual interface and limited memory.",
// };

const hibttProject: ProjectCardData = {
  title: "Have-I-Bookmarked-Their-Tweet?",
  subtitle: "Why did I follow them in the first place?",
  technologies: ["ChromeAPI", "react", "atomjs"],
  link:
    "https://chrome.google.com/webstore/detail/have-i-bookmarked-their-t/gipjdioggejlpnifhcgabgkfgjdlgfao",
  status: "MVP",
  description:
    "A mini Chrome extension providing a preview of bookmarked tweets by the twitter account viewed on the current tab.",
};

const bkmrk: ProjectCardData = {
  title: "bkmrk",
  subtitle: "chrome bookmark manager for power users",
  technologies: ["chromeAPI", "tailwindcss", ""],
  link: "https://github.com/stan-dot/bkmrk",
  status: "WIP",
  description:
    "a custom bookmark manager for Chrome browser. The default one annoys me with its limited options ;)",
};

const RonaAlarmHandler: ProjectCardData = {
  title: "RONA Alarm Handler",
  subtitle: "Industry grade alarm display. closed source.",
  technologies: ["react", "node", "docker", "mqtt", "cypress ci/cd"],
  link: "https://www.isis.stfc.ac.uk/Pages/home.aspx",
  status: "handed over",
  description: "an internal company alarms display",
};

const bscResearchProject: ProjectCardData = {
  title: "Lully app",
  subtitle: "Crowdsourcing data for supervised ML",
  technologies: ["React Native", "Supabase"],
  link: "https://lully.vercel.app/",
  status: "delivered",
  description: "Crowdsourcing argument data",
};

const mulitplayerGameArcade: ProjectCardData = {
  title: "Snekden - game arcade",
  subtitle: "Retro gaming in 2020s",
  technologies: [
    "PixiJs",
    "reinforcement learning",
    "rustlang",
  ],
  link: "/",
  status: "WIP",
  description:
    "A place with a couple of games, shared achievements PvE and PvP modes",
};

const p2pProject: ProjectCardData = {
  title: "Some peer to peer project",
  subtitle: "I like the idea",
  technologies: [
    "Fluence",
    "rustlang",
  ],
  link: "/",
  status: "idea",
  description: "I want to dig deeper into this area",
};

export const projects: ProjectCardData[] = [
  hibttProject,
  bkmrk,
  RonaAlarmHandler,
  mulitplayerGameArcade,
  bscResearchProject,
  p2pProject,
];
