
const titleClass: string = "";
const paragraphClass = "";

// NOTE this is kind of redundant rn. Now there are not many games on the landing page. When that happens, I'll move that to here
export default function About() {

  return <div className="align-center flex-col m-10 justify-center w-full">
    <h2>Full stack developer</h2>
    <div>
      <a className="underline-offset-4 italic" href="https://linktr.ee/standot3">My linktree profile</a>
    </div>
    <div>
      <h3 className={titleClass}>
        Achievements
      </h3>
      <p className={paragraphClass}>attended events</p>
    </div>
    <div>
      <h3 className={titleClass}>
        Career plans
      </h3>
      <p className={paragraphClass}>technologies</p>
      <p className={paragraphClass}>projects</p>
    </div>
    <div>
      <h3 className={titleClass}>
        Work towards my goals
      </h3>
      <p>This page is my Building In Public (BIP).</p>
    </div>
  </div>
}
