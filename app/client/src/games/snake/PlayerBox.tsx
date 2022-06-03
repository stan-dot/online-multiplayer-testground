import { Player } from "./Player"

export function PlayersBox(props: { players: Player[] }): JSX.Element {
  const ps: Player[] = props.players;
  const fullTable = <table id="players-table">
    {ps.map(p => <tr>
      <td>{p.name}</td>
      <td>
        <img src={p.img} height={50} width={40} />
      </td>
    </tr>
    )}
  </table>
  return <div id="players-box">
    <h3>Players currently online: </h3>
    <br />
    {ps.length > 0 ? fullTable : <p>0</p>}
  </div>
}