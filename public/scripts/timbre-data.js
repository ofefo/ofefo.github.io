const FAMILIES = [
  {
    family: "Idiofones",
    instruments: [
      { name: "Vibrafone", inst: "vibraphone" },
      { name: "Marimba", inst: "marimba" },
      { name: "Xilofone", inst: "xylophone" },
      { name: "Sino", inst: "tinkleBell" }
    ]
  },
  {
    family: "Cordofones",
    instruments: [
      { name: "Piano", inst: "piano" },
      { name: "Teclado", inst: "electricPiano2" },
      { name: "Violão", inst: "guitar" },
      { name: "Guitarra", inst: "clearElectricGuitar" },
      { name: "Violino", inst: "violin" },
      { name: "Banjo", inst: "banjo" }
    ]
  },
  {
    family: "Aerofones",
    instruments: [
      { name: "Acordeão", inst: "accordion" },
      { name: "Órgão", inst: "organ" },
      { name: "Trompete", inst: "trumpet" },
      { name: "Saxofone", inst: "altoSax" },
      { name: "Clarineta", inst: "clarinet" },
      { name: "Flauta", inst: "flute" },
    ]
  }
];

const MELODIES = [
  {
    name: "Brilha, brilha estrelinha",
    sequence: [
      [C4, .5], [C4, .5], [G4, .5], [G4, .5], [A4, .5], [A4, .5], [G4, .5], [G4, .5],
      [F4, .5], [F4, .5], [E4, .5], [E4, .5], [D4, .5], [D4, .5], [C4, 2]
    ]
  },
  {
    name: "A barata",
    sequence: [
      [G4, 1.5], [F4, 0.5], [E4, 0.5], [D4, 0.5], [E4, 0.5], [F4, 0.5], [G4, 1], 
      [G4, 0.5], [A4, 0.5], [F4, 0.5], [E4, 0.5], [F4, 0.5], [G4, 0.5],
      [E4, 1], [C4, 0.5], [C4, 0.5], [A4, 0.5], [A4, 0.5], [A4, 0.5], [A4, 0.5], [A4, 0.5], [A4, 0.5],
      [A4, 0.5], [B4, 0.5], [C5, 0.5], [C5, 0.5], [B4, 0.5], [A4, 0.5], [G4, 1]
    ]
  },
  {
    name: "Atirei o pau no gato",
    sequence: [
      [G4, 1.5], [F4, 0.5], [E4, 0.5], [D4, 0.5], [E4, 0.5], [F4, 0.5], [G4, 1], [G4, 1], [G4, 1],
      [A4, 0.5], [G4, 0.5], [F4, 1], [F4, 1], [F4, 1],
      [G4, 0.5], [F4, 0.5], [E4, 1], [E4, 1], [E4, 1],
      [C4, 0.5], [C4, 0.5], [A4, 1], [A4, 1], [A4, 1],
      [B4, 0.5], [A4, 0.5], [G4, 1], [G4, 1], [G4, 1],
      [E4, 0.5], [F4, 0.5], [G4, 1], [E4, 0.5], [F4, 0.5], [G4, .5], [F4, 0.5], [E4, 0.5], [D4, 0.5], [C4, 2]
    ]
  },
  {
    name: "Cai, cai balão",
    sequence: [
      [G4, 1], [G4, 1.5], [F4, 0.5], [E4, 1], [G4, 1], [G4, 1.5], [F4, 0.5], [E4, 1],
      [G4, 1], [A4, 1], [G4, 1], [F4, 1], [E4, 1], [D4, 3],
      [D4, 0.5], [E4, 0.5], [F4, 1], [D4, 0.5], [E4, 0.5], [F4, 1], [D4, 0.5], [E4, 0.5], [F4, 2],
      [G4, 1], [A4, 1], [G4, 1], [F4, 1], [E4, 1], [D4, 1], [C4, 4]
    ]
  },
  {
    name: "Ode à Alegria",
    sequence: [
      [E4, 1], [E4, 1], [F4, 1], [G4, 1], [G4, 1], [F4, 1], [E4, 1], [D4, 1],
      [C4, 1], [C4, 1], [D4, 1], [E4, 1], [E4, 1.5], [D4, 0.5], [D4, 2]
    ]
  },
  {
    name: "Frei Martinho",
    sequence: [
      [C4, 1], [D4, 1], [E4, 1], [C4, 1], [C4, 1], [D4, 1], [E4, 1], [C4, 1],
      [E4, 1], [F4, 1], [G4, 2], [E4, 1], [F4, 1], [G4, 2],
      [G4, 0.5], [A4, 0.5], [G4, 0.5], [F4, 0.5], [E4, 1], [C4, 1],
      [G4, 0.5], [A4, 0.5], [G4, 0.5], [F4, 0.5], [E4, 1], [C4, 1],
      [D4, 1], [G3, 1], [C4, 2], [D4, 1], [G3, 1], [C4, 2]
    ]
  },
  {
    name: "O sapo não lava o pé",
    sequence: [
      [F4, 1], [Bb4, 0.5], [Bb4, 1], [F4, 0.5], [G4, 1], [F4, 1], [D4, 3],
      [F4, 1], [Bb4, 0.5], [Bb4, 1], [F4, 0.5], [G4, 1], [F4, 1], [Eb4, 3],
      [F4, 0.5], [F4, 0.5], [A4, 0.5], [A4, 1], [F4, 0.5], [G4, 1], [F4, 1], [A4, 0.5], [A4, 1],
      [F4, 0.5], [G4, 1], [F4, 1], [A4, 1], [F4, 1], [G4, 1], [A4, 1], [Bb4, 2]
    ]
  },
  {
    name: "Marcha soldado",
    sequence: [
      [C4, 1], [C4, 0.5], [A3, 0.5], [F3, 1], 
      [F3, 0.5], [A3, 0.5], [C4, 0.5], [C4, 0.5], [C4, 0.5], [A3, 0.5], [G3, 1.5],
      [G3, 0.25], [A3, 0.25], [Bb3, 0.5], 
      [G3, 0.25], [A3, 0.25], [Bb3, 0.5], 
      [G3, 0.25], [A3, 0.25], [Bb3, 1],
      [C4, 0.5], [D4, 0.5], [C4, 0.5], [Bb3, 0.5], [A3, 0.5], [G3, 0.5], [F3, 2]
    ]
  }
];
