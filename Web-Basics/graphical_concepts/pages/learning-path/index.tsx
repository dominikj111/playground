/** @jsx h */
import { Fragment, h, render } from "https://esm.sh/preact@10.25.4";
import { useState } from "https://esm.sh/preact@10.25.4/hooks";
import type { GameState, ModalProps, Module, ModuleProps } from "./types.ts";

// Path coordinates for tiles (x, y positions for each step of the path)
const PATH_TILES = [
  { x: 0, y: 1 }, // Start
  { x: 1, y: 1 },
  { x: 2, y: 1 },
  { x: 3, y: 1 },
  { x: 4, y: 1 },
  { x: 4, y: 2 },
  { x: 3, y: 2 },
  { x: 2, y: 2 },
  { x: 2, y: 3 },
  { x: 3, y: 3 },
  { x: 4, y: 3 },
  { x: 5, y: 3 }, // End
];

const INITIAL_MODULES: Module[] = [
  {
    id: "module1",
    title: "Getting Started",
    description: "Introduction to the learning path",
    contentUrl: "https://example.com/module1",
    position: PATH_TILES[0],
    dependencies: [],
    completed: false,
  },
  {
    id: "module2",
    title: "Basic Concepts",
    description: "Learn the fundamental concepts",
    contentUrl: "https://example.com/module2",
    position: PATH_TILES[2],
    dependencies: ["module1"],
    completed: false,
  },
  {
    id: "module3",
    title: "Advanced Topics",
    description: "Explore advanced concepts",
    contentUrl: "https://example.com/module3",
    position: PATH_TILES[5],
    dependencies: ["module2"],
    completed: false,
  },
  {
    id: "module4",
    title: "Practice Project",
    description: "Apply your knowledge",
    contentUrl: "https://example.com/module4",
    position: PATH_TILES[7],
    dependencies: ["module3"],
    completed: false,
  },
  {
    id: "module5",
    title: "Advanced Techniques",
    description: "Master advanced concepts",
    contentUrl: "https://example.com/module5",
    position: PATH_TILES[9],
    dependencies: ["module4"],
    completed: false,
  },
  {
    id: "module6",
    title: "Final Project",
    description: "Complete the certification project",
    contentUrl: "https://example.com/module6",
    position: PATH_TILES[11],
    dependencies: ["module5"],
    completed: false,
  },
];

const ModuleModal = ({ module, onClose, onComplete }: ModalProps) => {
  return (
    <Fragment>
      <div class="modal-backdrop" onClick={onClose} />
      <div class="modal">
        <h2>{module.title}</h2>
        <p>{module.description}</p>
        <div style={{ marginTop: "20px", textAlign: "right" }}>
          <button
            onClick={() => {
              onComplete(module.id);
              onClose();
            }}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Complete Module
          </button>
          <button
            onClick={onClose}
            style={{
              padding: "10px 20px",
              backgroundColor: "#ddd",
              color: "#333",
              border: "none",
              borderRadius: "5px",
              marginLeft: "10px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </Fragment>
  );
};

const ModuleComponent = ({
  module,
  isLocked,
  isCurrent,
  onClick,
}: ModuleProps) => {
  const className = `module ${module.completed ? "completed" : ""} ${
    isLocked ? "locked" : ""
  } ${isCurrent ? "current" : ""}`;

  return (
    <div
      class={className}
      onClick={() => !isLocked && onClick(module)}
      style={{
        position: "absolute",
        left: `${module.position.x * 200}px`,
        top: `${module.position.y * 150}px`,
      }}
    >
      <div class="module-status">
        {isLocked ? "🔒" : module.completed ? "✅" : ""}
      </div>
      <h3>{module.title}</h3>
      <div class="description">
        <p>{module.description}</p>
        {!isLocked && !module.completed && (
          <p style={{ color: "#666" }}>Click to start this module</p>
        )}
      </div>
    </div>
  );
};

const PathTiles = () => (
  <Fragment>
    {PATH_TILES.map((tile, index) => (
      <div
        key={index}
        class="path-tile empty"
        style={{
          left: `${tile.x * 200}px`,
          top: `${tile.y * 150}px`,
        }}
      />
    ))}
  </Fragment>
);

const LearningPath = () => {
  const [gameState, setGameState] = useState<GameState>({
    modules: INITIAL_MODULES,
    currentModule: null,
    completedModules: [],
    certificateUnlocked: false,
  });
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  const isModuleLocked = (module: Module): boolean => {
    if (module.dependencies.length === 0) return false;
    return !module.dependencies.every((depId) =>
      gameState.completedModules.includes(depId)
    );
  };

  const handleModuleClick = (module: Module) => {
    if (!isModuleLocked(module) && !module.completed) {
      setSelectedModule(module);
    }
  };

  const handleModuleComplete = (moduleId: string) => {
    setGameState((prev) => {
      const newModules = prev.modules.map((m) =>
        m.id === moduleId ? { ...m, completed: true } : m
      );
      const newCompletedModules = [...prev.completedModules, moduleId];
      const allModulesCompleted = newModules.every((m) => m.completed);

      return {
        ...prev,
        modules: newModules,
        completedModules: newCompletedModules,
        certificateUnlocked: allModulesCompleted,
      };
    });
  };

  const progress =
    (gameState.completedModules.length / gameState.modules.length) * 100;

  return (
    <div class="game-container">
      <h1>Learning Path Game</h1>

      <div class="progress-bar">
        <div class="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div
        class="path-container"
        style={{ position: "relative", height: "800px" }}
      >
        <PathTiles />
        {gameState.modules.map((module) => (
          <ModuleComponent
            key={module.id}
            module={module}
            isLocked={isModuleLocked(module)}
            isCurrent={gameState.currentModule === module.id}
            onClick={handleModuleClick}
          />
        ))}
      </div>

      {gameState.certificateUnlocked && (
        <div class="certificate">
          <h2>🎉 Congratulations! 🎉</h2>
          <p>You've completed all modules and earned your certificate!</p>
        </div>
      )}

      {selectedModule && (
        <ModuleModal
          module={selectedModule}
          onClose={() => setSelectedModule(null)}
          onComplete={handleModuleComplete}
        />
      )}
    </div>
  );
};

// Render the app
const appElement = document.getElementById("app");
if (!appElement) {
  throw new Error("Could not find app element");
}
render(<LearningPath />, appElement);

export { LearningPath };
