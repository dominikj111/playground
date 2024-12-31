/** @jsx h */
import { h } from "https://esm.sh/preact@10.25.4";
import { useEffect, useRef, useState } from "https://esm.sh/preact@10.25.4/hooks";

interface Tile {
  id: string;
  x: number;
  y: number;
  type: "start" | "end" | "regular" | "special" | "checkpoint" | "warning" | "corner";
  rotation?: number; // for corner pieces, in degrees
  connections: string[];
}

const TILE_SIZE = 80;
const SPACING = TILE_SIZE; // Make tiles adjacent

// Initial board layout matching the mock design more closely
const INITIAL_TILES: Tile[] = [
  { id: "start", x: 0, y: 0, type: "start", connections: ["1"] },
  { id: "1", x: 1, y: 0, type: "regular", connections: ["2"] },
  { id: "2", x: 2, y: 0, type: "special", connections: ["3"] },
  { id: "3", x: 3, y: 0, type: "corner", rotation: 90, connections: ["4"] },
  { id: "4", x: 3, y: 1, type: "regular", connections: ["5"] },
  { id: "5", x: 3, y: 2, type: "warning", connections: ["6"] },
  { id: "6", x: 3, y: 3, type: "corner", rotation: 180, connections: ["7"] },
  { id: "7", x: 2, y: 3, type: "checkpoint", connections: ["8"] },
  { id: "8", x: 1, y: 3, type: "regular", connections: ["9"] },
  { id: "9", x: 0, y: 3, type: "corner", rotation: 270, connections: ["10"] },
  { id: "10", x: 0, y: 4, type: "special", connections: ["11"] },
  { id: "11", x: 0, y: 5, type: "warning", connections: ["12"] },
  { id: "12", x: 0, y: 6, type: "corner", rotation: 0, connections: ["13"] },
  { id: "13", x: 1, y: 6, type: "regular", connections: ["14"] },
  { id: "14", x: 2, y: 6, type: "special", connections: ["15"] },
  { id: "15", x: 3, y: 6, type: "corner", rotation: 90, connections: ["16"] },
  { id: "16", x: 3, y: 7, type: "regular", connections: ["17"] },
  { id: "17", x: 3, y: 8, type: "warning", connections: ["18"] },
  { id: "18", x: 3, y: 9, type: "corner", rotation: 180, connections: ["19"] },
  { id: "19", x: 2, y: 9, type: "checkpoint", connections: ["20"] },
  { id: "20", x: 1, y: 9, type: "regular", connections: ["21"] },
  { id: "21", x: 0, y: 9, type: "corner", rotation: 270, connections: ["22"] },
  { id: "22", x: 0, y: 10, type: "special", connections: ["23"] },
  { id: "23", x: 0, y: 11, type: "warning", connections: ["24"] },
  { id: "24", x: 0, y: 12, type: "corner", rotation: 0, connections: ["25"] },
  { id: "25", x: 1, y: 12, type: "regular", connections: ["26"] },
  { id: "26", x: 2, y: 12, type: "special", connections: ["27"] },
  { id: "27", x: 3, y: 12, type: "checkpoint", connections: ["28"] },
  { id: "28", x: 4, y: 12, type: "regular", connections: ["29"] },
  { id: "29", x: 5, y: 12, type: "warning", connections: ["30"] },
  { id: "30", x: 6, y: 12, type: "regular", connections: ["31"] },
  { id: "31", x: 7, y: 12, type: "special", connections: ["32"] },
  { id: "32", x: 8, y: 12, type: "regular", connections: ["33"] },
  { id: "33", x: 9, y: 12, type: "warning", connections: ["34"] },
  { id: "34", x: 10, y: 12, type: "checkpoint", connections: ["end"] },
  { id: "end", x: 11, y: 12, type: "end", connections: [] },
];

// Tree positions for decoration
const TREES = [
  { x: 0, y: 2, type: "pine", color: "yellow" },
  { x: 1, y: 2, type: "pine", color: "lightgreen" },
  { x: 0.5, y: 2.5, type: "pine", color: "mediumseagreen" },
  { x: 7, y: 4, type: "round", color: "yellow" },
  { x: 6.5, y: 3.5, type: "round", color: "lightgreen" },
  { x: 7.5, y: 3.5, type: "round", color: "mediumseagreen" },
  // Add more trees as needed
];

const Tree = ({ x, y, type, color }: { x: number; y: number; type: string; color: string }) => {
  const scale = 0.6; // Increased from 0.4
  if (type === "pine") {
    return (
      <path
        d={`M ${x * SPACING},${y * SPACING + TILE_SIZE * scale} 
            L ${x * SPACING + TILE_SIZE * scale},${y * SPACING - TILE_SIZE * scale} 
            L ${x * SPACING - TILE_SIZE * scale},${y * SPACING - TILE_SIZE * scale} Z`}
        fill={color}
      />
    );
  }
  return (
    <circle
      cx={x * SPACING}
      cy={y * SPACING}
      r={TILE_SIZE * scale}
      fill={color}
    />
  );
};

const WarningSymbol = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x * SPACING - TILE_SIZE * 0.4} ${y * SPACING - TILE_SIZE * 0.4})`}>
    <path
      d="M25 0 L50 50 L0 50 Z"
      fill="#FFD700"
      stroke="black"
      strokeWidth="3"
      transform="scale(1.5)"
    />
    <text
      x="25"
      y="35"
      textAnchor="middle"
      fill="black"
      fontSize="35"
      fontWeight="bold"
      transform="scale(1.5)"
    >
      !
    </text>
  </g>
);

export default function Board() {
  const [hoveredTile, setHoveredTile] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [viewBox, setViewBox] = useState("0 0 600 400");

  useEffect(() => {
    if (!svgRef.current) return;

    const positions = INITIAL_TILES.map(tile => ({
      x: tile.x * SPACING,
      y: tile.y * SPACING
    }));

    const minX = Math.min(...positions.map(p => p.x)) - TILE_SIZE;
    const maxX = Math.max(...positions.map(p => p.x)) + TILE_SIZE;
    const minY = Math.min(...positions.map(p => p.y)) - TILE_SIZE;
    const maxY = Math.max(...positions.map(p => p.y)) + TILE_SIZE;

    setViewBox(`${minX} ${minY} ${maxX - minX + TILE_SIZE} ${maxY - minY + TILE_SIZE}`);
  }, []);

  const renderTile = (tile: Tile) => {
    const x = tile.x * SPACING;
    const y = tile.y * SPACING;

    if (tile.type === "corner") {
      return (
        <path
          d={`M ${x - TILE_SIZE/2},${y + TILE_SIZE/2} 
              Q ${x - TILE_SIZE/2},${y - TILE_SIZE/2} ${x + TILE_SIZE/2},${y - TILE_SIZE/2}`}
          fill={hoveredTile === tile.id ? "#a8e6cf" : "#98FB98"}
          transform={`rotate(${tile.rotation}, ${x}, ${y})`}
          style={{ transition: "fill 0.3s" }}
        />
      );
    }

    if (tile.type === "start" || tile.type === "end") {
      const isStart = tile.type === "start";
      return (
        <g>
          <rect
            x={x - TILE_SIZE/2}
            y={y - TILE_SIZE/2}
            width={TILE_SIZE}
            height={TILE_SIZE}
            fill="white"
            stroke="black"
            strokeWidth="2"
          />
          {/* Arrow */}
          <path
            d={isStart 
              ? `M ${x},${y - TILE_SIZE/4} l ${TILE_SIZE/4},${TILE_SIZE/4} l -${TILE_SIZE/4},${TILE_SIZE/4}`  // right arrow
              : `M ${x},${y - TILE_SIZE/4} l -${TILE_SIZE/4},${TILE_SIZE/4} l ${TILE_SIZE/4},${TILE_SIZE/4}`  // left arrow
            }
            fill="none"
            stroke="black"
            strokeWidth="3"
          />
          <text
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={TILE_SIZE * 0.3}
            fontWeight="bold"
            fill="black"
          >
            {tile.type.toUpperCase()}
          </text>
        </g>
      );
    }

    return (
      <g>
        <rect
          x={x - TILE_SIZE / 2}
          y={y - TILE_SIZE / 2}
          width={TILE_SIZE}
          height={TILE_SIZE}
          fill={
            tile.type === "special" ? "#FFD700" :
            tile.type === "checkpoint" ? "white" :
            tile.type === "warning" ? "#98FB98" :
            hoveredTile === tile.id ? "#a8e6cf" : "#90EE90"
          }
          style={{ transition: "fill 0.3s" }}
        />
        {tile.type === "warning" && <WarningSymbol x={tile.x} y={tile.y} />}
      </g>
    );
  };

  return (
    <div className="board-container" style={{ padding: "20px" }}>
      <svg
        ref={svgRef}
        viewBox={viewBox}
        style={{
          width: "90vw",
          height: "90vh",
          maxHeight: "90vh",
          background: "#008080",
          margin: "auto"
        }}
      >
        {/* Draw trees first as background */}
        {TREES.map((tree, i) => (
          <Tree key={i} {...tree} />
        ))}
        
        {/* Draw connections */}
        {INITIAL_TILES.map(tile => 
          tile.connections.map(targetId => {
            const target = INITIAL_TILES.find(t => t.id === targetId);
            if (!target) return null;
            
            return (
              <line
                key={`${tile.id}-${targetId}`}
                x1={tile.x * SPACING}
                y1={tile.y * SPACING}
                x2={target.x * SPACING}
                y2={target.y * SPACING}
                stroke="#666"
                strokeWidth="4"
              />
            );
          })
        )}
        
        {/* Draw non-hovered tiles first */}
        {INITIAL_TILES.filter(tile => tile.id !== hoveredTile).map(tile => {
          const x = tile.x * SPACING;
          const y = tile.y * SPACING;
          return (
            <g
              key={tile.id}
              onMouseEnter={() => setHoveredTile(tile.id)}
              onMouseLeave={() => setHoveredTile(null)}
              style={{ 
                transformOrigin: `${x}px ${y}px`,
                transform: 'scale(1)',
                transition: 'transform 0.2s ease-out',
                cursor: 'pointer'
              }}
            >
              {renderTile(tile)}
            </g>
          );
        })}

        {/* Draw hovered tile last */}
        {hoveredTile && INITIAL_TILES.filter(tile => tile.id === hoveredTile).map(tile => {
          const x = tile.x * SPACING;
          const y = tile.y * SPACING;
          return (
            <g
              key={tile.id}
              onMouseEnter={() => setHoveredTile(tile.id)}
              onMouseLeave={() => setHoveredTile(null)}
              style={{ 
                transformOrigin: `${x}px ${y}px`,
                transform: 'scale(1.2)',
                transition: 'transform 0.2s ease-out',
                cursor: 'pointer'
              }}
            >
              {renderTile(tile)}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
