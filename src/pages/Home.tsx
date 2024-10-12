import wolfram from "../images/Wolfram.png";
import gameoflife from "../images/GameOfLife.png";
import mazectric from "../images/Mazectric.png";
import threedgameoflife from "../images/3DGameOfLife.png"
import { CaptionedImage } from "../ui/CaptionedImage";

export default function Home() {
    return (
        <>
            <h1 className="text-center text-2xl m-5">Cellular Automaton Collection.</h1>
            <div className="grid grid-cols-2 gap-4 auto-cols-min w-[50%] m-auto p-4">
                <CaptionedImage imageSrc={wolfram} title="Wolfram Code" link="https://en.wikipedia.org/wiki/Wolfram_code">
                    The Wolfram Code is a numbering system for 1D Celluar Automata created by Stephen Wolfram in 1983.
                </CaptionedImage>
                <CaptionedImage imageSrc={gameoflife} title="Game Of Life" link="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">
                    The Game of Life, or Conway's Game of Life, is a 2D cellular automata created by John Horton Conway in 1970. It is arguably the best-known cellular automata.
                    <br />
                    The rules are:
                    <ul className="list-disc list-inside">
                        <li>A cell is either alive or dead.</li>
                        <li>A dead cell becomes alive if it has exactly 3 neighbours.</li>
                        <li>An alive cell stays alive if it has 2 or 3 neighbours.</li>
                        <li>Otherwise, the cell dies/remains dead.</li>
                    </ul>
                    These simple rules give rise to complex behaviour such as turning completeness.
                </CaptionedImage>
                <CaptionedImage imageSrc={mazectric} title="Maze and Mazectric" link="https://conwaylife.com/wiki/OCA:Maze">
                    Maze and Mazectric are 2D Celluar Automata similar to the Game Of Life with slight changes to the rules:
                    <ul className="list-disc list-inside">
                        <li>In Maze a cell can survive if they have at least 1 and at most 5 neighbours.</li>
                        <li>In Mazectric a cell can survive if they have at least 1 and at most 4 neighbours.</li>
                    </ul>
                </CaptionedImage>
                <CaptionedImage imageSrc={threedgameoflife} title="3D Game Of Life" link="https://conwaylife.com/wiki/Three-dimensional_cellular_automaton">
                    The 3D Game of Life is a 3D Celluar Automata 3D Game Of Life by Carter Bays in 1987 that attempts to project the rules of The Game of Life to 3 Dimensions.
                    <br />
                    The Celluar Automata has the following rules.
                    <ul className="list-disc list-inside">
                        <li>A cell is either alive or dead.</li>
                        <li>A dead cell becomes alive if it has exactly 6 neighbours.</li>
                        <li>An alive cell stays alive with 5, 6 or 7 neighbours.</li>
                        <li>Otherwise, the cell dies/remains dead.</li>
                    </ul>
                    He found that these rules must closely recreate the behaviour of Life.
                </CaptionedImage>
            </div>
        </>
    );
}


