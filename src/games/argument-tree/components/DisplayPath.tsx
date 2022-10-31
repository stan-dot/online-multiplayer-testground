import { Statement } from "../types/TopicTypes";

function formatPath(nodes: Statement[]): string {
  return nodes.map((v) => v.title).reduce(
    (previous: string, current: string) => {
      return previous + "-" + current;
    },
    "",
  );
}

export function DisplayPath(props: { path: Statement[]; }) {
  return <p>
    current path:<span>{formatPath(props.path)}</span>
  </p>;
}
