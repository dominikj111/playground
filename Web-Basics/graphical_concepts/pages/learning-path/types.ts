export interface Module {
  id: string;
  title: string;
  description: string;
  contentUrl: string;
  position: {
    x: number;
    y: number;
  };
  dependencies: string[];
  completed: boolean;
}

export interface GameState {
  modules: Module[];
  currentModule: string | null;
  completedModules: string[];
  certificateUnlocked: boolean;
}

export interface ModuleProps {
  module: Module;
  isLocked: boolean;
  isCurrent: boolean;
  onClick: (module: Module) => void;
}

export interface ModalProps {
  module: Module;
  onClose: () => void;
  onComplete: (moduleId: string) => void;
}
