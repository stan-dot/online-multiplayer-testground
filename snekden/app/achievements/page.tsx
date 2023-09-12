const headerStyles = "bg-green-400 w-1/2 p-2 rounded";
// and also game achievements of the user
export default function Achievements() {
  return (
    <div className="mx-auto">
      <div id="wrapper" className="relative rounded-lg w-4/5 m-4 bg-slate-400 ">
        <section className="max-w-4xl mx-auto p-4 sm:flex-row sm:justify-between ">
          <h2 className={headerStyles}>Pivot into Computer Science</h2>
          <p>
            In high school, 2016 to 2019 I was learning Chemistry, Economics and
            Statistics. I liked it. I took part in national compatitions.
            I&apos;ve been to national finals in the latter. I was proud of my
            achivement. Yet I felt I would rely on banking jobs and big
            organizations, while I craved independence. Only Computer Science
            provided that. I was never the smart-computer-kid, but I wanted to
            learn a bit. I saw the pace of developments in AI and wanted to be
            on the cutting edge, not miss out. There is a certain artisanal
            quality to code that doing spreadsheets does not have.
          </p>
        </section>

        <section className="max-w-4xl mx-auto p-4  sm:flex-row sm:justify-between">
          <h2 className={headerStyles}>Internship</h2>
          <p>
            During my second year of university, I took a long time to apply for
            industrial placement year. My work on applications and interviews
            paid off, as I got a job at STFC. I was proud of this, as the
            interview process was competitive. The year was full of new
            challenges, including hybrid work arrangement, Docker deployment,
            best software engineering practices for safety critical systems.
          </p>
        </section>

        <section className="max-w-4xl mx-auto p-4  sm:flex-row sm:justify-between">
          <h2 className={headerStyles}>Hackathons</h2>
          <p>
            2022 was for me a year of seeing the wider web scene. I&apos;ve been
            to three hackathons, ETH Amsterdam in April, and in Autumn my
            &apos;home hackathon,{" "}
            <a href="https://hs6.devpost.com/" className="link underline">
              hacksheffield
            </a>, and ETH Online. These experiences shown me the &apos;playing
            field&apos;. I gained deeper understanding which skills are needed
            and what to focus on.
          </p>
          <p>This stie is a direct result of these activities.</p>
        </section>

        <section className="max-w-4xl mx-auto p-4 sm:flex-row sm:justify-between">
          <h2 className={headerStyles}>NLP research</h2>
          <p>
            For my BSc in year 2022-2023, I&apos;m doing a data gathering app.
          </p>
          <p>
            Its goal is to crowdsource labeled data for NLP supervised machine
            learning. The paradigm it uses is{" "}
            <a
              href="https://dl.acm.org/doi/10.1145/1378704.1378719"
              className="link underline"
            >
              Games with purpose
            </a>. It is about motivating the users through gamification -
            hacking biological dopamine regulation with completion of milestons
            and feeling of progression, as opposed to monetary incentives. So
            far I find the mobile app development quite challenging, but the
            prospect of doing gamification is exciting.
          </p>
        </section>
        <section className="max-w-4xl mx-auto p-4 sm:flex-row sm:justify-between">
          <h2 className={headerStyles}>NLP research</h2>
          <p>
            For my BSc in year 2022-2023, I&apos;m doing a data gathering app.
          </p>
          <p>
            Its goal is to crowdsource labeled data for NLP supervised machine
            learning. The paradigm it uses is{" "}
            <a
              href="https://dl.acm.org/doi/10.1145/1378704.1378719"
              className="link underline"
            >
              Games with purpose
            </a>. It is about motivating the users through gamification -
            hacking biological dopamine regulation with completion of milestons
            and feeling of progression, as opposed to monetary incentives. So
            far I find the mobile app development quite challenging, but the
            prospect of doing gamification is exciting.
          </p>
        </section>
        <section className="max-w-4xl mx-auto p-4 sm:flex-row sm:justify-between">
          <h2 className={headerStyles}>Near Future</h2>
          <p>
            My goal is to grow both my both technical and soft skills. I
            want to learn how the best in the world ship software. I want to
            ship my side projects and gain a million users.
          </p>
        </section>
      </div>
    </div>
  );
}
