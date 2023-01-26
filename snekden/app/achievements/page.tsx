// todo like About section, this will be separate.
// might include my achievements from there

const headerStyles = "bg-green-400 w-1/2 p-2 rounded";
// and also game achievements of the user
export default function Achievements() {
  return (
    <div className="mx-auto">
      <section className="max-w-4xl mx-auto p-4 sm:flex-row sm:justify-between">
        <h2 className={headerStyles}>Pivot into Computer Science</h2>
        <p>From Economics and Statistics - largely a moral choice.</p>
        <p>Reference the achievements there.</p>
        <p>I&apos;d feel wrong just shuffling numbers around.</p>
      </section>
      <section className="max-w-4xl mx-auto p-4  sm:flex-row sm:justify-between">
        <h2 className={headerStyles}>Internship</h2>
        <p>Worked for STFC, competitive interview process.</p>
        <p>Familiar with hybrid work paradigm.</p>
      </section>
      <section className="max-w-4xl mx-auto p-4  sm:flex-row sm:justify-between">
        <h2 className={headerStyles}>Conferences</h2>
        <p>2022 was for me a year of seeing the wider web scene.</p>
        <p>
          I&apos;ve been to three hackathons, ETH Amsterdam in April, my
          &apos;home hackathon &apos;{" "}
          <a href="https://hs6.devpost.com/" className="link underline">hacksheffield</a>, 
          and in Autumn, ETH Online.
        </p>
        <p>These experiences shown me the &apos; playing field&apos;, I gained deeper understanding which skills are needed and what to focus on.</p>
        <p>This portfolio is a direct result of these activities.</p>
      </section>
      <section className="max-w-4xl mx-auto p-4 sm:flex-row sm:justify-between">
        <h2 className={headerStyles}>NLP research</h2>
        <p>For my BSc this year, I&apos;m doing a data gathering app.</p>
        <p>
          Its broad goal is to crowdsource labeled data for NLP supervised
          machine learning.
        </p>
        <p>
          A bit in the logical positivist tradition, a bit in Leibnizian one.
          More TBA...
        </p>
      </section>
    </div>
  );
}
