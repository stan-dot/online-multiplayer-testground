
// todo like About section, this will be separate. 
// might include my achievements from there 
// and also game achievements of the user
export default function Achievements() {
  return <div className="mx-auto">
    <section className="max-w-4xl mx-auto p-4 sm:flex-row sm:justify-between">
      <h2 className="bg-green-400 w-1/2">Pivot into Computer Science</h2>
      <p>From Economics and Statistics - largely a moral choice.</p>
      <p>Reference the achievemnets there.</p>
      <p>I&apos;d feel wrong just shuffling numbers around.</p>
    </section>
    <section className="max-w-4xl mx-auto p-4  sm:flex-row sm:justify-between">
      <h2 className="bg-green-400 w-1/2">Internship</h2>
      <p>Worked for STFC, competitive interview process.</p>
      <p>Familiar with hybrid work paradigm.</p>
    </section>
    <section className="max-w-4xl mx-auto p-4  sm:flex-row sm:justify-between">
      <h2 className="bg-green-400 w-1/2">NLP research</h2>
      <p> For my BSc this year, I&apos;m doing a data gathering app.</p>
      <p> Its broad goal is to crowdsource labeled data for NLP supervised machine learning.</p>
      <p>A bit in the logical positivist tradition, a bit in Leibnizian one. More TBA...</p>
    </section>
  </div>
}
