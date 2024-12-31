import * as THREE from "https://deno.land/x/threejs_4_deno@v121/src/Three.js";
import { OrbitControls } from "https://deno.land/x/threejs_4_deno@v121/examples/jsm/controls/OrbitControls.js";

interface TarotCard {
  name: string;
  meaning: string;
  reversed: boolean;
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
  private cards: THREE.Mesh[] = [];
  private selectedCards: TarotCard[] = [];

  constructor() {
    // Initialize Three.js scene
    this.scene = new THREE.Scene();
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
    this.camera.position.z = 5;
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 2);
    this.scene.add(directionalLight);

    // Handle window resize
    globalThis.addEventListener("resize", () => this.onWindowResize());

    // Setup event listeners
    this.setupEventListeners();

    // Start animation loop
    this.animate();
  }

  private onWindowResize(): void {
    this.camera.aspect = globalThis.innerWidth / globalThis.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(globalThis.innerWidth, globalThis.innerHeight);
  }

  private setupEventListeners(): void {
    document
      .getElementById("singleCard")
      ?.addEventListener("click", () => this.drawCards(1));
    document
      .getElementById("threeCards")
      ?.addEventListener("click", () => this.drawCards(3));
    document
      .getElementById("fiveCards")
      ?.addEventListener("click", () => this.drawCards(5));
    document
      .getElementById("reset")
      ?.addEventListener("click", () => this.resetScene());
  }

  private createCard(): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(1, 1.5, 0.01);
    const frontMaterial = new THREE.MeshPhongMaterial({
      color: 0x9932cc,
      specular: 0x444444,
      shininess: 30,
    });
    const backMaterial = new THREE.MeshPhongMaterial({
      color: 0x4b0082,
      specular: 0x444444,
      shininess: 30,
    });

    const materials = [
      frontMaterial, // right side
      frontMaterial, // left side
      frontMaterial, // top side
      frontMaterial, // bottom side
      backMaterial, // front side
      frontMaterial, // back side
    ];

    return new THREE.Mesh(geometry, materials);
  }

  private drawCards(count: number): void {
    this.resetScene();
    this.selectedCards = [];

    // Select random cards
    const shuffledDeck = [...tarotDeck].sort(() => Math.random() - 0.5);
    this.selectedCards = shuffledDeck.slice(0, count).map((card) => ({
      ...card,
      reversed: Math.random() > 0.5,
    }));

    // Position cards
    const spacing = 1.5;
    const totalWidth = (count - 1) * spacing;
    const startX = -totalWidth / 2;

    for (let i = 0; i < count; i++) {
      const card = this.createCard();
      card.position.x = startX + i * spacing;
      card.rotation.y = Math.PI;
      this.cards.push(card);
      this.scene.add(card);

      // Animate card flip
      this.animateCard(card, i);
    }

    // Display reading
    this.displayReading();
  }

  private animateCard(card: THREE.Mesh, index: number): void {
    const targetRotation = this.selectedCards[index].reversed
      ? Math.PI * 2
      : Math.PI;
    const delay = index * 500;

    setTimeout(() => {
      const animate = () => {
        if (card.rotation.y > targetRotation) {
          card.rotation.y -= 0.1;
          globalThis.requestAnimationFrame(animate);
        }
      };
      animate();
    }, delay);
  }

  private displayReading(): void {
    const readingResult = document.getElementById("readingResult");
    if (readingResult) {
      const reading = this.selectedCards
        .map(
          (card) =>
            `<p><strong>${card.name}</strong> ${
              card.reversed ? "(Reversed)" : ""
            }: ${card.meaning}</p>`,
        )
        .join("");

      readingResult.innerHTML = reading;
      readingResult.style.display = "block";
    }
  }

  private resetScene(): void {
    this.cards.forEach((card) => this.scene.remove(card));
    this.cards = [];
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
