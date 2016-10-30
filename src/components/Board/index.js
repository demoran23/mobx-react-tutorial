import React from 'react';
import Square from '../Square'

export default class Board extends React.Component {
    renderSquare(i) {
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />
    }
    renderRow(i){
        let squareBaseline = i * 3; // 3 squares per row, starting with a zero index
        let squares = [0, 1, 2].map(i => {
           return this.renderSquare(squareBaseline + i);
        });
        return (
            <div className="board-row" key={i}>
                {squares}
            </div>
        )
    }
    render() {
        let status;

        if (this.props.winner != null) {
            status = `Winner: ${this.props.winner}`;
        } else {
            status = `Next player: ${this.props.playerToken}`;
        }

        let rows = [0, 1, 2].map(i => {
           return this.renderRow(i);
        });

        return (
            <div>
                <div className="status">{status}</div>
                {rows}
            </div>
        );
    }

}
