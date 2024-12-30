console.log("hi");

export function TarotScene() {
  // To confirm TS is compiled and loaded well in browser,
  // implement some TS specific functionality here
  enum Color {
    Red,
    Green,
    Blue,
  }

  const color: Color = Color.Blue;
  console.log(color);
}

TarotScene();
