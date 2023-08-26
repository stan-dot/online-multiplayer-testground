"use client";

export function Description() {
  return (
    <div id="description">
      <p>
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
      </p>
      <p>
        Find the official rules{" "}
        <a
          className="underline"
          href="https://en.wikipedia.org/wiki/Royal_Game_of_Ur"
        >
          Wikipedia
        </a>{" "}
        page
      </p>
      <p>
        Here a different implementation{" "}
        <a className="underline" href="https://royalur.net/rules/">
          here
        </a>
      </p>
    </div>
  );
}
