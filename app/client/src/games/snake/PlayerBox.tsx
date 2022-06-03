import { Player } from "./Player"

export function PlayersBox(props: {players: Player[]}):JSX.Element {
    return <div id="players-box">
      <h3>Players currently online: </h3>
      <br />
      <table id="players-table">{
        props.players.map((player) => {
          return <tr><td>{player.name}</td><td><img src={player.img} height={50} width={40} /></td></tr>
        })
      } </table>
    </div>
  }