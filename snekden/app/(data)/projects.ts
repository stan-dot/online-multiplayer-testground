import { ProjectCardData } from "../types/ProjectData";

const elizaProject: ProjectCardData = {
  title: "ElizaChatbot",
  subtitle: "A replica of the 1960s NLP program",
  technologies: ["NLP"],
  link: "./games/eliza",
  status: "WIP",
  description: "a recreation of the 60s program with a textual interface and limited memory."
};

const hibttProject: ProjectCardData = {
  title: "Have-I-Bookmarked-Their-Tweet?",
  subtitle: "Why did I follow them in the first place?",
  technologies: ["ChromeAPI, react", "atomjs"],
  link: "https://chrome.google.com/webstore/detail/have-i-bookmarked-their-t/gipjdioggejlpnifhcgabgkfgjdlgfao",
  status: "MVP",
  description: "A mini Chrome extension providing a preview of bookmarked tweets by the twitter account viewed on the current tab."
};

const bkmrk: ProjectCardData = {
  title: "bkmrk",
  subtitle: "chrome bookmark manager for power users",
  technologies: ["chromeAPI, tailwindcss","" ],
  link: "https://github.com/stan-dot/bkmrk",
  status: "WIP",
  description: "a custom bookmark manager for Chrome browser. The default one annoys me with its limited options ;)"
};


const RonaAlarmHandler: ProjectCardData = {
  title: "RONA Alarm Handler",
  subtitle: "Industry grade alarm display. closed source.",
  technologies: ['react', "node", 'docker', 'mqtt', 'cypress ci/cd'],
  link: "https://www.isis.stfc.ac.uk/Pages/home.aspx",
  status: "handed over",
  description: "an internal company alarms display"
};

const bscResearchProject: ProjectCardData = {
  title: "[appname TBA]",
  subtitle: "Crowdsourcing data for supervised ML",
  technologies: ["React Native", "Supabase"],
  link: "/",
  status: "WIP",
  description: "Will get its own website shortly..."
};

const mulitplayerGameArcade: ProjectCardData = {
  title: "Snekden - game arcade",
  subtitle: "Retro gaming in 2020s",
  technologies: ["phaserjs", "konvajs", "webgl", "reinforcement learning", "rust"],
  link: "/",
  status: "sketch",
  description: "A place with a couple of games, shared achievements PvE and PvP modes"
};

export const projects: ProjectCardData[] = [elizaProject, hibttProject, bkmrk, RonaAlarmHandler, mulitplayerGameArcade, bscResearchProject];