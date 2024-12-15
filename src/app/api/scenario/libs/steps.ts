export const steps = [
    {
        name: "start",
        content:  () => "Hello! How can I help you?\n(Greeting) I'll give you an example of greeting\n (Weather) I'll tell you a weather in the chosen city \n(Facts) I'll tell you an interesting fact",
        next: ["greeting", "weather", "facts"]
    },
    {
        name: "start_over",
        content:  () => "Can I help you somehow else?\n(Greeting) I'll give you an example of greeting\n (Weather) I'll tell you a weather in the chosen city \n(Facts) I'll tell you an interesting fact",
        next: ["greeting", "weather", "facts"]
    },
    {
        name: "greeting",
        content:  () => "What kind of greeting do you want?\n(New Year) On a New Year\(Birthday) On a Birthday",
        next: ["new year", "birthday"]
    },
    {
        name: "new year",
        content:  () => randomFromArray(newYearGreetings),
        next: []
    },
    {
        name: "birthday",
        content:  () => randomFromArray(birthdayGreetings),
        next: []
    },
    {
        name: "weather",
        content:  () => "Tell me your city, so i could tell you the weather there:",
        next: ["show_weather"]
    },
    {
        name: "show_weather",
        content:  (context) => getWeather(context)+"Can I help you somehow else?\n(Greeting) I'll give you an example of greeting\n (Weather) I'll tell you a weather in the chosen city \n(Facts) I'll tell you an interesting fact",
        next: []
    },
    {
        name: "facts",
        content:  () => "Choose a category of interesting facts:\n(Science) About science\n(Art) About Art\n(History) Historical",
        next: ["science", "art", "history"]
    },
    {
        name: "science",
        content:  () => "Choose a theme:\n(Animals). About animals\n(Space) About Space\n(Humans) About Humans",
        next: ["animal", "space", "human"]
    },
    {
        name: "animals",
        content:  () => randomFromArray(animalFacts),
        next: []
    },
    {
        name: "space",
        content:  () => randomFromArray(spaceFacts),
        next: []
    },
    {
        name: "humans",
        content:  () => randomFromArray(humanFacts),
        next: []
    },
    {
        name: "art",
        content:  () => randomFromArray(artFacts),
        next: []
    },
    {
        name: "history",
        content:  () => "Choose a period:\n(WW2). About 2nd World War \n(Medieval) About medieval\n(Antiquity) About antiquity\n(Modern) About modern days",
        next: ["ww2", "medieval", "antiquity", "modern"]
    },
    {
        name: "ww2",
        content:  () => randomFromArray(ww2Facts),
        next: []
    },
    {
        name: "medieval",
        content:  () => randomFromArray(medievalFacts),
        next: []
    },
    {
        name: "antiquity",
        content:  () => randomFromArray(ancientFacts),
        next: []
    },
    {
        name: "modern",
        content:  () => randomFromArray(modernFacts),
        next: []
    }
]

export const CANCEL = "start";

const birthdayGreetings = [
    "Happy Birthday! May your day be filled with laughter, joy, and unforgettable moments!",
    "Wishing you a fantastic birthday and a year filled with adventure and happiness!",
    "Happy Birthday! May all your dreams come true and your heart be filled with love and joy!",
    "Have a wonderful birthday! Here's to another year of amazing experiences and cherished memories.",
    "Happy Birthday! May your day be as wonderful and unique as you are!",
    "Wishing you endless joy, love, and success on your special day. Happy Birthday!",
    "Happy Birthday! May this year bring you closer to achieving all your dreams!",
    "Celebrate big today! You deserve all the happiness in the world. Happy Birthday!",
    "Wishing you a birthday full of laughter, love, and all the things you enjoy most.",
    "Happy Birthday! May your life be as bright and beautiful as your smile!"
];

const newYearGreetings = [
    "Happy New Year! May this year bring you health, happiness, and success!",
    "Wishing you a year full of new opportunities and endless possibilities. Happy New Year!",
    "Happy New Year! May your days be bright and your heart be light throughout the year ahead!",
    "Cheers to a new year of growth, prosperity, and joy! Happy New Year!",
    "Happy New Year! May the coming year be full of dreams fulfilled and memories cherished.",
    "Wishing you a New Year filled with love, laughter, and all your heart desires.",
    "Happy New Year! May every day of the year be filled with happiness and peace.",
    "Here's to a fresh start and a year of amazing achievements. Happy New Year!",
    "May this year be your best one yet! Wishing you a Happy New Year full of success and happiness.",
    "Happy New Year! May your journey be filled with joy, love, and endless adventures."
];

const humanFacts = [
    "The average human body contains enough carbon to fill about 9,000 pencils.",
    "Your heart beats around 100,000 times a day, pumping about 2,000 gallons of blood.",
    "The human brain contains approximately 86 billion neurons.",
    "Your nose can remember 50,000 different scents.",
    "Humans are the only species known to blush, a response unique to our emotions.",
    "The strongest muscle in the human body, relative to its size, is the masseter (jaw muscle).",
    "Your body has more bacteria than human cells, making you a walking ecosystem!",
    "The human skeleton renews itself completely every 10 years.",
    "Humans share about 60% of their DNA with bananas.",
    "Your fingernails grow faster on your dominant hand."
];

const animalFacts = [
    "Octopuses have three hearts, and two of them stop beating when they swim.",
    "A group of flamingos is called a 'flamboyance.'",
    "Elephants are the only mammals that can't jump.",
    "Cows have best friends and can become stressed when separated from them.",
    "Honeybees can recognize human faces.",
    "Sea otters hold hands while sleeping to keep from drifting apart.",
    "A cheetah can accelerate from 0 to 60 mph in just 3 seconds.",
    "Dolphins have names for each other and communicate using unique whistles.",
    "The fingerprints of a koala are so indistinguishable from humans that they can confuse crime scene investigations.",
    "An albatross can fly thousands of miles without landing."
];

const spaceFacts = [
    "A day on Venus is longer than a year on Venus.",
    "The Milky Way galaxy is on a collision course with the Andromeda galaxy.",
    "There are more stars in the universe than grains of sand on all Earth's beaches.",
    "A neutron star can spin 600 times per second.",
    "Saturn’s rings are made of billions of particles of ice and rock.",
    "One spoonful of a neutron star would weigh about a billion tons.",
    "The Great Red Spot on Jupiter is a storm that has lasted over 350 years.",
    "The footprints left by astronauts on the Moon will remain for millions of years.",
    "A year on Mercury lasts just 88 Earth days.",
    "The Sun accounts for 99.86% of the mass in our solar system."
];

const artFacts = [
    "Leonardo da Vinci spent about 12 years painting the Mona Lisa's lips.",
    "The world's oldest known cave paintings are over 40,000 years old.",
    "Vincent van Gogh only sold one painting during his lifetime.",
    "The Eiffel Tower was originally intended to be a temporary structure for the 1889 World Fair.",
    "Pablo Picasso could draw before he could walk and his first word was 'pencil.'",
    "Michelangelo's David was carved from a single block of marble that had been abandoned by other sculptors.",
    "The famous 'Starry Night' by Van Gogh was painted while he was in a mental asylum.",
    "The color 'blue' was one of the most expensive pigments to produce in ancient art.",
    "Andy Warhol's studio was famously called 'The Factory.'",
    "The Sphinx in Egypt is believed to have originally been painted in bright colors."
];

const ww2Facts = [
    "The Battle of Stalingrad was one of the deadliest battles in human history.",
    "During World War II, the Allies dropped over 2.7 million tons of bombs.",
    "The Siege of Leningrad lasted for 872 days, making it one of the longest sieges in history.",
    "More than 70 million people were killed during World War II.",
    "The D-Day invasion involved over 156,000 Allied troops landing on Normandy beaches.",
    "The Enigma machine was used by Germany to encrypt secret messages during the war.",
    "Hiroshima and Nagasaki remain the only cities targeted by nuclear weapons in war.",
    "The United Nations was founded in 1945 to prevent future world conflicts.",
    "Women in the US and UK entered the workforce in record numbers during the war.",
    "Anne Frank's diary is one of the most famous accounts of life during the Holocaust."
];

const medievalFacts = [
    "Knights used to fight with blunted swords in tournaments to avoid fatalities.",
    "The Black Death killed approximately one-third of Europe’s population.",
    "Castles often had secret passages and escape routes built into their design.",
    "Chivalry, the code of conduct for knights, included rules for love and courtship.",
    "Medieval peasants had more holidays than modern workers.",
    "Stained glass windows in cathedrals were used to teach Bible stories to the illiterate.",
    "Medieval universities were often dominated by theology studies.",
    "The trebuchet was a powerful siege weapon capable of hurling large stones over long distances.",
    "Alchemy, the precursor to modern chemistry, was a popular pursuit during the Middle Ages.",
    "The Magna Carta of 1215 is considered a cornerstone of modern democracy."
];

const ancientFacts = [
    "The Great Pyramid of Giza was the tallest man-made structure for over 3,800 years.",
    "The Colosseum in Rome could hold up to 50,000 spectators.",
    "The first Olympic Games were held in 776 BC in Olympia, Greece.",
    "Cleopatra was born closer in time to the Moon landing than to the construction of the Great Pyramid.",
    "The Hanging Gardens of Babylon are considered one of the Seven Wonders of the Ancient World, but their existence is debated.",
    "The Library of Alexandria was one of the largest libraries in the ancient world.",
    "Romans used concrete in their construction, some of which is still standing today.",
    "The Code of Hammurabi is one of the earliest examples of written laws.",
    "Ancient Egyptians worshipped over 2,000 gods and goddesses.",
    "Spartans were known for their military prowess and discipline, starting training at age 7."
];

const modernFacts = [
    "The internet was invented in 1983 and now connects over 5 billion people worldwide.",
    "Electric cars are becoming more popular, with over 20 million sold globally by 2023.",
    "The COVID-19 pandemic is one of the most significant global events of the 21st century.",
    "Space tourism is now a reality, with companies like SpaceX and Blue Origin leading the way.",
    "Artificial intelligence is revolutionizing industries from healthcare to entertainment.",
    "Renewable energy sources like wind and solar power are growing faster than ever.",
    "Cryptocurrencies like Bitcoin have created a new era of digital finance.",
    "The James Webb Space Telescope has captured the most detailed images of the universe to date.",
    "Global temperatures have risen by 1.2°C since the pre-industrial era.",
    "Social media platforms connect billions of people but also pose challenges for mental health."
];



function randomFromArray(arr: string[]) {
    return arr[Math.floor(Math.random() * arr.length)];
}

 function getWeather(context: string){
    return "lol";
}