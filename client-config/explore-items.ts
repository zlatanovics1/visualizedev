// id,
// title,
// text:long,
// url,
// image,
// publish date,
// author,
// language
// source country,

const exploreProgramming = [
  {
    id: 1,
    title: "Introduction to Programming",
    text: "Programming is the process of creating a set of instructions that tell a computer how to perform a task.",
    url: "https://en.wikipedia.org/wiki/Computer_programming",
    image:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Object-Oriented Programming",
    text: "Object-oriented programming (OOP) is a programming paradigm based on the concept of 'objects', which can contain data, in the form of fields, and code, in the form of procedures.",
    url: "https://en.wikipedia.org/wiki/Object-oriented_programming",
    image:
      "https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8amF2YXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 3,
    title: "Functional Programming",
    text: "Functional programming is a programming paradigm that treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data.",
    url: "https://en.wikipedia.org/wiki/Functional_programming",
    image:
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGphdmF8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 4,
    title: "Algorithms and Data Structures",
    text: "Algorithms and data structures are the building blocks of computer programs. They are essential for solving complex problems efficiently.",
    url: "https://en.wikipedia.org/wiki/Algorithm",
    image:
      "https://images.unsplash.com/photo-1532619187608-e5375cab36aa?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdyYXBoJTIwZGF0YSUyMHN0cnVjdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 5,
    title: "Version Control with Git",
    text: "Git is a distributed version control system designed to handle everything from small to very large projects with speed and efficiency.",
    url: "https://git-scm.com/",
    image:
      "https://images.unsplash.com/photo-1630514969818-94aefc42ec47?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2l0aHVifGVufDB8fDB8fHww",
  },
  {
    id: 6,
    title: "Web Development Basics",
    text: "Web development refers to building, creating, and maintaining websites. It includes aspects such as web design, web publishing, web programming, and database management.",
    url: "https://en.wikipedia.org/wiki/Web_development",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2ViJTIwZGV2fGVufDB8fDB8fHww",
  },
  {
    id: 7,
    title: "Software Testing Fundamentals",
    text: "Software testing is an investigation conducted to provide stakeholders with information about the quality of the software product or service under test.",
    url: "https://en.wikipedia.org/wiki/Software_testing",
    image:
      "https://images.unsplash.com/photo-1624996752380-8ec242e0f85d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHdlYiUyMGRldnxlbnwwfHwwfHx8MA%3D%3D",
  },
];

const exploreAi = [
  {
    id: 7,
    title: "Introduction to Artificial Intelligence",
    text: "Artificial intelligence (AI) is the simulation of human intelligence processes by machines, especially computer systems.",
    url: "https://en.wikipedia.org/wiki/Artificial_intelligence",
    image:
      "https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWl8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 8,
    title: "Machine Learning Basics",
    text: "Machine learning is a subset of AI that provides systems the ability to automatically learn and improve from experience without being explicitly programmed.",
    url: "https://en.wikipedia.org/wiki/Machine_learning",
    image:
      "https://images.unsplash.com/photo-1511376777868-611b54f68947?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1hY2hpbmUlMjBsZWFybmluZ3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 9,
    title: "Neural Networks",
    text: "Neural networks are a set of algorithms, modeled loosely after the human brain, that are designed to recognize patterns.",
    url: "https://en.wikipedia.org/wiki/Artificial_neural_network",
    image:
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG5ldXJhbCUyMG5ldHdvcmtzfGVufDB8fDB8fHww",
  },
  {
    id: 10,
    title: "Natural Language Processing (NLP)",
    text: "Natural Language Processing (NLP) is a subfield of AI that focuses on the interaction between computers and humans through natural language.",
    url: "https://en.wikipedia.org/wiki/Natural_language_processing",
    image:
      "https://images.unsplash.com/photo-1679403766665-67ed6cd2df30?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNoYXQlMjBncHR8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 11,
    title: "Computer Vision",
    text: "Computer vision is a field of artificial intelligence that enables computers to interpret and understand the visual world.",
    url: "https://en.wikipedia.org/wiki/Computer_vision",
    image:
      "https://images.unsplash.com/photo-1501621667575-af81f1f0bacc?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29tcHV0ZXIlMjB2aXNpb258ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 12,
    title: "Reinforcement Learning",
    text: "Reinforcement learning is an area of machine learning concerned with how software agents ought to take actions in an environment in order to maximize the notion of cumulative reward.",
    url: "https://en.wikipedia.org/wiki/Reinforcement_learning",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWklMjBsZWFybnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 13,
    title: "AI Ethics and Bias",
    text: "AI ethics is a branch of ethics that examines the moral implications of artificial intelligence systems.",
    url: "https://en.wikipedia.org/wiki/Ethics_of_artificial_intelligence",
    image:
      "https://images.unsplash.com/photo-1625314887424-9f190599bd56?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YWklMjBtb3JhbHN8ZW58MHx8MHx8fDA%3D",
  },
];

export type exploreObject = (typeof exploreAi)[0];

export const exploreData = {
  programming: exploreProgramming,
  ai: exploreAi,
};
