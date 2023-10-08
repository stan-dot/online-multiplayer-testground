
export function Description() {
  return (
    <details id="description">
      <summary className="text-l text-white border-1 border-slate-400 border-solid rounded">Description of this ancient game...</summary>
      <div>
        inspired by this
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/WZskjLq040I?si=56I5zSx0_mq1kBCm"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        >
        </iframe>
      </div>
      <div>
        Find the official rules{" "}
        <a
          className="underline"
          href="https://en.wikipedia.org/wiki/Royal_Game_of_Ur"
        >
          Wikipedia
        </a>{" "}
        page
      </div>
      <div>
        Here a different implementation{" "}
        <a className="underline" href="https://royalur.net/rules/">
          here
        </a>
      </div>
    </details>
  );
}
