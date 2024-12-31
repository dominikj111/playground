import * as THREE from "https://deno.land/x/threejs_4_deno@v121/src/Three.js";
import { OrbitControls } from "https://deno.land/x/threejs_4_deno@v121/examples/jsm/controls/OrbitControls.js";

interface TarotCard {
  name: string;
  meaning: string;
  reversed: boolean;
}

interface InteractiveCard {
  mesh: THREE.Mesh;
  card: TarotCard;
  selected: boolean;
  targetPosition: THREE.Vector3;
  targetRotation: THREE.Euler;
  originalPosition: THREE.Vector3;
  originalRotation: THREE.Euler;
}

const tarotDeck: TarotCard[] = [
  {
    name: "The Fool",
    meaning: "New beginnings, innocence, spontaneity",
    reversed: false,
  },
  {
    name: "The Magician",
    meaning: "Manifestation, resourcefulness, power",
    reversed: false,
  },
  {
    name: "The High Priestess",
    meaning: "Intuition, mystery, inner knowledge",
    reversed: false,
  },
  {
    name: "The Empress",
    meaning: "Fertility, nurturing, abundance",
    reversed: false,
  },
  {
    name: "The Emperor",
    meaning: "Authority, structure, control",
    reversed: false,
  },
  {
    name: "The Hierophant",
    meaning: "Tradition, conformity, morality",
    reversed: false,
  },
  {
    name: "The Lovers",
    meaning: "Love, harmony, relationships, choices",
    reversed: false,
  },
  {
    name: "The Chariot",
    meaning: "Control, willpower, determination",
    reversed: false,
  },
  {
    name: "Strength",
    meaning: "Inner strength, courage, patience",
    reversed: false,
  },
  {
    name: "The Hermit",
    meaning: "Introspection, searching for truth",
    reversed: false,
  },
  {
    name: "Wheel of Fortune",
    meaning: "Change, cycles, destiny",
    reversed: false,
  },
  {
    name: "Justice",
    meaning: "Fairness, truth, cause and effect",
    reversed: false,
  },
  {
    name: "The Hanged Man",
    meaning: "Surrender, letting go, new perspective",
    reversed: false,
  },
  {
    name: "Death",
    meaning: "Endings, transformation, transition",
    reversed: false,
  },
  {
    name: "Temperance",
    meaning: "Balance, moderation, patience",
    reversed: false,
  },
  {
    name: "The Devil",
    meaning: "Materialism, bondage, addiction",
    reversed: false,
  },
  {
    name: "The Tower",
    meaning: "Sudden change, upheaval, revelation",
    reversed: false,
  },
  {
    name: "The Star",
    meaning: "Hope, inspiration, generosity",
    reversed: false,
  },
  { name: "The Moon", meaning: "Illusion, fear, anxiety", reversed: false },
  { name: "The Sun", meaning: "Success, joy, celebration", reversed: false },
  {
    name: "Judgement",
    meaning: "Rebirth, inner calling, absolution",
    reversed: false,
  },
  {
    name: "The World",
    meaning: "Completion, integration, accomplishment",
    reversed: false,
  },
];

export class TarotScene {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  private raycaster: THREE.Raycaster;
  private mouse: THREE.Vector2;
  private interactiveCards: InteractiveCard[] = [];
  private selectedCards: InteractiveCard[] = [];
  private maxSelections = 1;
  private isAnimating = false;

  constructor() {
    // Initialize Three.js scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1a1a2e);
    
    this.camera = new THREE.PerspectiveCamera(
      75,
      globalThis.innerWidth / globalThis.innerHeight,
      0.1,
      1000,
    );
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(globalThis.innerWidth, globalThis.innerHeight);
    document.getElementById("app")?.appendChild(this.renderer.domElement);

    // Setup camera and controls
    this.camera.position.set(0, 5, 10);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI / 2;

    // Initialize raycaster for mouse picking
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    this.scene.add(directionalLight);

    // Handle window resize
    globalThis.addEventListener("resize", () => this.onWindowResize());

    // Setup event listeners
    this.setupEventListeners();

    // Create initial card spread
    this.createCardSpread();

    // Start animation loop
    this.animate();
  }

  private onWindowResize(): void {
    this.camera.aspect = globalThis.innerWidth / globalThis.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(globalThis.innerWidth, globalThis.innerHeight);
  }

  private setupEventListeners(): void {
    document.getElementById("singleCard")?.addEventListener(
      "click",
      () => this.setMaxSelections(1),
    );
    document.getElementById("threeCards")?.addEventListener(
      "click",
      () => this.setMaxSelections(3),
    );
    document.getElementById("fiveCards")?.addEventListener(
      "click",
      () => this.setMaxSelections(5),
    );
    document.getElementById("reset")?.addEventListener(
      "click",
      () => this.resetScene(),
    );

    // Add mouse event listeners
    const canvas = this.renderer.domElement;
    canvas.addEventListener("mousemove", (event) => this.onMouseMove(event));
    canvas.addEventListener("click", () => this.onMouseClick());
  }

  private setMaxSelections(count: number): void {
    this.maxSelections = count;
    this.resetScene();
  }

  private createCard(card: TarotCard, position: THREE.Vector3): InteractiveCard {
    const geometry = new THREE.BoxGeometry(1, 1.5, 0.01);
    const frontMaterial = new THREE.MeshPhongMaterial({
      color: 0x9932CC,
      specular: 0x444444,
      shininess: 30,
    });
    const backMaterial = new THREE.MeshPhongMaterial({
      color: 0x4B0082,
      specular: 0x444444,
      shininess: 30,
    });

    const materials = [
      frontMaterial,
      frontMaterial,
      frontMaterial,
      frontMaterial,
      backMaterial,
      frontMaterial,
    ];

    const mesh = new THREE.Mesh(geometry, materials);
    mesh.position.copy(position);
    mesh.rotation.y = Math.PI;

    return {
      mesh,
      card,
      selected: false,
      targetPosition: position.clone(),
      targetRotation: new THREE.Euler(0, Math.PI, 0),
      originalPosition: position.clone(),
      originalRotation: new THREE.Euler(0, Math.PI, 0),
    };
  }

  private createCardSpread(): void {
    const radius = 8;
    const cardCount = tarotDeck.length;
    const angleStep = (2 * Math.PI) / cardCount;

    tarotDeck.forEach((card, index) => {
      const angle = angleStep * index;
      const x = radius * Math.cos(angle);
      const z = radius * Math.sin(angle);
      const position = new THREE.Vector3(x, 0, z);

      const interactiveCard = this.createCard(card, position);
      this.interactiveCards.push(interactiveCard);
      this.scene.add(interactiveCard.mesh);

      // Tilt cards slightly towards center
      interactiveCard.mesh.lookAt(new THREE.Vector3(0, 0, 0));
      interactiveCard.mesh.rotateY(Math.PI);
    });
  }

  private onMouseMove(event: MouseEvent): void {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Highlight card under mouse
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(
      this.interactiveCards.map((ic) => ic.mesh),
    );

    this.interactiveCards.forEach((card) => {
      if (!card.selected) {
        const isHovered = intersects.length > 0 &&
          intersects[0].object === card.mesh;
        
        // Smooth transition for hover effect
        const targetY = isHovered ? 0.5 : card.originalPosition.y;
        card.mesh.position.y += (targetY - card.mesh.position.y) * 0.1;
      }
    });
  }

  private onMouseClick(): void {
    if (this.isAnimating || this.selectedCards.length >= this.maxSelections) {
      return;
    }

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(
      this.interactiveCards.map((ic) => ic.mesh),
    );

    if (intersects.length > 0) {
      const selectedMesh = intersects[0].object as THREE.Mesh;
      const selectedCard = this.interactiveCards.find((ic) =>
        ic.mesh === selectedMesh
      );

      if (selectedCard && !selectedCard.selected) {
        this.selectCard(selectedCard);
      }
    }
  }

  private selectCard(card: InteractiveCard): void {
    card.selected = true;
    this.selectedCards.push(card);

    const spacing = 2.5; // Increased spacing for better visibility
    const totalWidth = (this.maxSelections - 1) * spacing;
    const startX = -totalWidth / 2;
    const index = this.selectedCards.length - 1;

    // Position cards closer and make them larger
    card.targetPosition = new THREE.Vector3(
      startX + (index * spacing),
      2.5, // Higher position
      2   // Closer to camera
    );
    
    // Scale up the selected cards
    card.mesh.scale.set(1.5, 1.5, 1.5);
    
    card.targetRotation = new THREE.Euler(
      -0.2, // Tilt forward for better visibility
      Math.PI + (Math.random() > 0.5 ? Math.PI : 0),
      0
    );

    this.animateCardToPosition(card);

    if (this.selectedCards.length === this.maxSelections) {
      this.displayReading();
    }
  }

  private animateCardToPosition(card: InteractiveCard): void {
    this.isAnimating = true;
    const duration = 1000;
    const startPosition = card.mesh.position.clone();
    const startRotation = card.mesh.rotation.clone();
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Use easing function for smooth animation
      const eased = this.easeOutCubic(progress);

      card.mesh.position.lerpVectors(
        startPosition,
        card.targetPosition,
        eased,
      );
      card.mesh.rotation.x = THREE.MathUtils.lerp(
        startRotation.x,
        card.targetRotation.x,
        eased,
      );
      card.mesh.rotation.y = THREE.MathUtils.lerp(
        startRotation.y,
        card.targetRotation.y,
        eased,
      );
      card.mesh.rotation.z = THREE.MathUtils.lerp(
        startRotation.z,
        card.targetRotation.z,
        eased,
      );

      if (progress < 1) {
        globalThis.requestAnimationFrame(animate);
      } else {
        this.isAnimating = false;
      }
    };

    animate();
  }

  private easeOutCubic(x: number): number {
    return 1 - Math.pow(1 - x, 3);
  }

  private displayReading(): void {
    const readingResult = document.getElementById("readingResult");
    if (readingResult) {
      const reading = this.selectedCards.map((card) =>
        `<p><strong>${card.card.name}</strong> ${
          card.targetRotation.y > Math.PI * 1.5 ? "(Reversed)" : ""
        }: ${card.card.meaning}</p>`,
      ).join("");

      readingResult.innerHTML = reading;
      readingResult.style.display = "block";
    }
  }

  private resetScene(): void {
    // Return cards to original positions
    this.selectedCards.forEach((card) => {
      card.selected = false;
      card.targetPosition.copy(card.originalPosition);
      card.targetRotation.copy(card.originalRotation);
      // Reset scale
      card.mesh.scale.set(1, 1, 1);
      this.animateCardToPosition(card);
    });

    this.selectedCards = [];
    const readingResult = document.getElementById("readingResult");
    if (readingResult) {
      readingResult.style.display = "none";
    }
  }

  private animate(): void {
    globalThis.requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}

// Initialize the scene
new TarotScene();
