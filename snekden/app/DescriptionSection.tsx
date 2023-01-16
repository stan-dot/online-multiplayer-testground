import Image from 'next/image';

function DescriptionSection() {
  return <section id="hero" className="flex flex-col-reverse justify-center sm:flex-row px-6 items-center gap-8 mb-120 scroll-mt-40 widescreen:section-min-height tallscreen:section-min-height">
    <article className="sm:w-1/2">
      <h2 className="max-2-md text-4xl font-bold text-center sm:text-5sl sm:text-left text-slate-900 dark:text-white">
        We boldy go <span className="text-indigo-700 dark:text-indigo-300">where no rocket </span>  has gone before...
      </h2>
      <p className="max-w-md text-2xl mt-4 text-center sm:text-left text-slate-700 dark:text-slate-400">We&apos;re building rockets for the next century today. From the moon to Mars, Jupiter and beyond..</p>
      <p className="max-w-md text-2xl mt-4 text-center sm:text-left text-slate-700 dark:text-slate-400">Think Acme Rockets</p>
    </article>
    <Image src="/rocket1.jpg" alt="rocket taking off" width={200} height={200} />
  </section>;
}
