import React from 'react';

interface BoardProps {
    squares: string[][];
    onClick: (i: number, j: number) => void;
}

const Board: React.FC<BoardProps> = ({ squares, onClick}) => {
    return (
        <div>
            {[...Array(5)].map((_, i) => {
                return (
                    <div className="board-row" key={i}>
                        {[...Array(11)].map((_, j) => {
                            return (
                                <button
                                    style={{
                                        width: '30px',
                                        height: '30px',
                                        border: '1px solid #000',
                                        borderRadius: '3px',
                                        background: '#f2fcff'
                                    }}
                                    onClick={() => onClick(10 - j, i)}
                                    key={j}
                                >
                                    {squares[10 - j][i]}
                                </button>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}

export default Board;
