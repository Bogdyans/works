import { Question, Book } from "./types";

export const QUESTIONS: Question[] = [
    {
        id: 1,
        question: "What genre do you prefer?",
        options: ["Science Fiction", "Mystery", "Romance", "Non-fiction"]
    },
    {
        id: 2,
        question: "How long do you like your books?",
        options: ["Short (under 200 pages)", "Medium (200-400 pages)", "Long (over 400 pages)", "No preference"]
    },
    {
        id: 3,
        question: "Do you prefer classic literature or contemporary works?",
        options: ["Classics", "Contemporary", "Mix of both", "No preference"]
    },
    {
        id: 4,
        question: "What's your preferred reading pace?",
        options: ["Fast-paced", "Moderate", "Slow and detailed", "Varies"]
    },
    {
        id: 5,
        question: "Do you enjoy books with multiple perspectives or a single narrator?",
        options: ["Multiple perspectives", "Single narrator", "Either", "No preference"]
    }
]

export const BOOKS: Book[] = [
    {
        title: "Dune",
        author: "Frank Herbert",
        genre: "Science Fiction",
        length: "Long (over 400 pages)",
        era: "Classics",
        pace: "Moderate",
        narrative: "Multiple perspectives"
    },
    {
        title: "The Da Vinci Code",
        author: "Dan Brown",
        genre: "Mystery",
        length: "Medium (200-400 pages)",
        era: "Contemporary",
        pace: "Fast-paced",
        narrative: "Single narrator"
    },
    {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        genre: "Romance",
        length: "Medium (200-400 pages)",
        era: "Classics",
        pace: "Slow and detailed",
        narrative: "Single narrator"
    },
    {
        title: "A Brief History of Time",
        author: "Stephen Hawking",
        genre: "Non-fiction",
        length: "Short (under 200 pages)",
        era: "Contemporary",
        pace: "Moderate",
        narrative: "Single narrator"
    },
    {
        title: "1984",
        author: "George Orwell",
        genre: "Science Fiction",
        length: "Medium (200-400 pages)",
        era: "Classics",
        pace: "Moderate",
        narrative: "Single narrator"
    },
    {
        title: "The Girl with the Dragon Tattoo",
        author: "Stieg Larsson",
        genre: "Mystery",
        length: "Long (over 400 pages)",
        era: "Contemporary",
        pace: "Fast-paced",
        narrative: "Multiple perspectives"
    },
    {
        title: "Outlander",
        author: "Diana Gabaldon",
        genre: "Romance",
        length: "Long (over 400 pages)",
        era: "Contemporary",
        pace: "Moderate",
        narrative: "Multiple perspectives"
    },
    {
        title: "Sapiens: A Brief History of Humankind",
        author: "Yuval Noah Harari",
        genre: "Non-fiction",
        length: "Medium (200-400 pages)",
        era: "Contemporary",
        pace: "Moderate",
        narrative: "Single narrator"
    },
    {
        title: "The Hitchhiker's Guide to the Galaxy",
        author: "Douglas Adams",
        genre: "Science Fiction",
        length: "Short (under 200 pages)",
        era: "Classics",
        pace: "Fast-paced",
        narrative: "Single narrator"
    },
    {
        title: "The Silent Patient",
        author: "Alex Michaelides",
        genre: "Mystery",
        length: "Medium (200-400 pages)",
        era: "Contemporary",
        pace: "Moderate",
        narrative: "Multiple perspectives"
    },
    {
        title: "The Notebook",
        author: "Nicholas Sparks",
        genre: "Romance",
        length: "Short (under 200 pages)",
        era: "Contemporary",
        pace: "Slow and detailed",
        narrative: "Multiple perspectives"
    },
    {
        title: "The Immortal Life of Henrietta Lacks",
        author: "Rebecca Skloot",
        genre: "Non-fiction",
        length: "Medium (200-400 pages)",
        era: "Contemporary",
        pace: "Moderate",
        narrative: "Single narrator"
    },
    {
        title: "Neuromancer",
        author: "William Gibson",
        genre: "Science Fiction",
        length: "Medium (200-400 pages)",
        era: "Classics",
        pace: "Fast-paced",
        narrative: "Single narrator"
    },
    {
        title: "And Then There Were None",
        author: "Agatha Christie",
        genre: "Mystery",
        length: "Short (under 200 pages)",
        era: "Classics",
        pace: "Fast-paced",
        narrative: "Multiple perspectives"
    },
    {
        title: "Jane Eyre",
        author: "Charlotte Bronte",
        genre: "Romance",
        length: "Long (over 400 pages)",
        era: "Classics",
        pace: "Slow and detailed",
        narrative: "Single narrator"
    },
    {
        title: "The Tipping Point",
        author: "Malcolm Gladwell",
        genre: "Non-fiction",
        length: "Short (under 200 pages)",
        era: "Contemporary",
        pace: "Fast-paced",
        narrative: "Single narrator"
    },
    {
        title: "The Handmaid's Tale",
        author: "Margaret Atwood",
        genre: "Science Fiction",
        length: "Medium (200-400 pages)",
        era: "Classics",
        pace: "Moderate",
        narrative: "Single narrator"
    },
    {
        title: "The Name of the Rose",
        author: "Umberto Eco",
        genre: "Mystery",
        length: "Long (over 400 pages)",
        era: "Contemporary",
        pace: "Slow and detailed",
        narrative: "Single narrator"
    },
    {
        title: "The Time Traveler's Wife",
        author: "Audrey Niffenegger",
        genre: "Romance",
        length: "Long (over 400 pages)",
        era: "Contemporary",
        pace: "Moderate",
        narrative: "Multiple perspectives"
    },
    {
        title: "The Selfish Gene",
        author: "Richard Dawkins",
        genre: "Non-fiction",
        length: "Medium (200-400 pages)",
        era: "Classics",
        pace: "Moderate",
        narrative: "Single narrator"
    },
    {
        title: "Foundation",
        author: "Isaac Asimov",
        genre: "Science Fiction",
        length: "Medium (200-400 pages)",
        era: "Classics",
        pace: "Moderate",
        narrative: "Multiple perspectives"
    },
    {
        title: "The Hound of the Baskervilles",
        author: "Arthur Conan Doyle",
        genre: "Mystery",
        length: "Short (under 200 pages)",
        era: "Classics",
        pace: "Fast-paced",
        narrative: "Single narrator"
    },
    {
        title: "Bridget Jones's Diary",
        author: "Helen Fielding",
        genre: "Romance",
        length: "Medium (200-400 pages)",
        era: "Contemporary",
        pace: "Fast-paced",
        narrative: "Single narrator"
    },
    {
        title: "The Elegant Universe",
        author: "Brian Greene",
        genre: "Non-fiction",
        length: "Long (over 400 pages)",
        era: "Contemporary",
        pace: "Moderate",
        narrative: "Single narrator"
    },
    {
        title: "The Martian",
        author: "Andy Weir",
        genre: "Science Fiction",
        length: "Medium (200-400 pages)",
        era: "Contemporary",
        pace: "Fast-paced",
        narrative: "Single narrator"
    },
    {
        title: "Gone Girl",
        author: "Gillian Flynn",
        genre: "Mystery",
        length: "Long (over 400 pages)",
        era: "Contemporary",
        pace: "Fast-paced",
        narrative: "Multiple perspectives"
    },
    {
        title: "The Fault in Our Stars",
        author: "John Green",
        genre: "Romance",
        length: "Short (under 200 pages)",
        era: "Contemporary",
        pace: "Moderate",
        narrative: "Single narrator"
    },
    {
        title: "Thinking, Fast and Slow",
        author: "Daniel Kahneman",
        genre: "Non-fiction",
        length: "Long (over 400 pages)",
        era: "Contemporary",
        pace: "Slow and detailed",
        narrative: "Single narrator"
    },
    {
        title: "The Hunger Games",
        author: "Suzanne Collins",
        genre: "Science Fiction",
        length: "Medium (200-400 pages)",
        era: "Contemporary",
        pace: "Fast-paced",
        narrative: "Single narrator"
    },
    {
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        genre: "Science Fiction",
        length: "Short (under 200 pages)",
        era: "Classics",
        pace: "Moderate",
        narrative: "Single narrator"
    }
]

