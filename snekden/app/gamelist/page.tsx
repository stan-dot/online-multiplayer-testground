import PocketBase from "pocketbase";

export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 10,
  fetchCache = "auto",
  runtime = "nodejs",
  preferredRegion = "auto";

async function getGames() {
  const res = await fetch("http://127.0.0.1:8090/api/collections/games", {
    cache: "no-store",
  });
  // using pocketbase
  const db: PocketBase = new PocketBase("http");
  // const data = await db

  const data = await res.json();
  return data?.items as any[];
}

export default async function GamePage() {
  const items = await getGames();
  return (
    <div>
      <h1>Home Page</h1>
      <div>
        {items?.map((game, i) => <p key={i}>game</p>)}
      </div>
    </div>
  );
}
