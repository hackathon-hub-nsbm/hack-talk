export interface InviteData {
  id: string;
  name: string;
  position: string;
  department: string;
  message?: string;
}

export const invites: InviteData[] = [
  {
    id: "vc",
    name: "Prof. E. A. Weerasinghe",
    position: "Deputy Vice Chancellor",
    department: "",
    message:
      "As our esteemed Deputy Vice Chancellor, your visionary leadership in academic excellence would bring unparalleled prestige to Hack Talk 2026 and inspire our audience to dream bigger.",
  },
  {
    id: "dvc",
    name: "Prof. Chaminda Rathnayake",
    position: "Deputy Vice Chancellor",
    department: "",
    message:
      "Your distinguished leadership and commitment to technological advancement make you the perfect guest for Hack Talk 2026. Your presence would motivate our students immensely.",
  },
  {
    id: "baratha",
    name: "Prof. Baratha Dodankotuwa",
    position: "Head of Academic Development & QA",
    department: "",
    message:
      "As Head of Academic Development, your expertise in quality assurance and academic innovation would provide invaluable perspective to our hackathon storytelling sessions.",
  },
  {
    id: "rasika",
    name: "Dr. Rasika Ranaweera",
    position: "Dean",
    department: "Faculty of Computing",
    message:
      "Dear Dean Ranaweera, your leadership of the Faculty of Computing and your research excellence would bring tremendous prestige and inspiration to Hack Talk 2026.",
  },
  {
    id: "naji",
    name: "Mr. Saravanapavan Nasiketha",
    position: "Lecturer",
    department: "Faculty of Computing",
    message:
      "Your innovative teaching methods and deep understanding of computer science fundamentals would add incredible depth to our hackathon veterans' panel.",
  },
  {
    id: "pavithra",
    name: "Ms. Pavithra Subhashini",
    position: "Lecturer",
    department: "Faculty of Computing",
    message:
      "Your expertise in human-computer interaction and user experience design would offer our audience cutting-edge insights into creating user-centered technological solutions.",
  },
  {
    id: "gayan",
    name: "Mr. Gayan Perera",
    position: "Lecturer",
    department: "Faculty of Computing",
    message:
      "Your passion for teaching and deep knowledge of software development would provide our audience with practical guidance they can immediately apply in their projects.",
  },
  {
    id: "diluka",
    name: "Mr. Diluka Wijesinghe",
    position: "Lecturer",
    department: "Faculty of Computing",
    message:
      "Your expertise in computer science and dedication to student success would make you an outstanding presence, helping our audience navigate complex technical challenges.",
  },
  {
    id: "chamindra",
    name: "Mr. Chamindra Attanayake",
    position: "Lecturer",
    department: "Faculty of Computing",
    message:
      "Your comprehensive understanding of computing systems and algorithms would provide our Hack Talk audience with the theoretical foundation they need to build robust solutions.",
  },
  {
    id: "chamara",
    name: "Mr. Chamara Disanayake",
    position: "Lecturer",
    department: "Faculty of Computing",
    message:
      "Your teaching experience and technical expertise would be invaluable in enriching the discussions on software engineering and system design at Hack Talk 2026.",
  },
  {
    id: "lasitha",
    name: "Mr. Lasitha De Silva",
    position: "Lecturer",
    department: "Faculty of Computing",
    message:
      "Your knowledge of modern computing technologies and your ability to explain complex concepts clearly would greatly enrich our participants' experience at Hack Talk 2026.",
  },
  {
    id: "pabudi",
    name: "Dr. Pabudi T Abeyrathne",
    position: "Lecturer",
    department: "Faculty of Computing",
    message:
      "Your research background and teaching excellence in computing would bring academic rigor and innovative thinking to our hackathon storytelling discussions.",
  },
  {
    id: "isuru",
    name: "Mr. Isuru Sri Bandara",
    position: "Lecturer",
    department: "Faculty of Computing",
    message:
      "Your practical experience and teaching methodology would help our audience bridge the gap between theoretical knowledge and real-world application development.",
  },
  {
    id: "dulanjali",
    name: "Ms. Dulanjali Wijesekara",
    position: "Lecturer",
    department: "Faculty of Computing",
    message:
      "Your dedication to computer science education and your ability to inspire students would create a motivating atmosphere for our Hack Talk audience.",
  },
  {
    id: "isuri-caldera",
    name: "Ms. Isuri Caldera",
    position: "Lecturer",
    department: "",
    message:
      "Your teaching expertise and passion for technology would provide our audience with the guidance and encouragement they need to excel in their innovative projects.",
  },
  {
    id: "ashani",
    name: "Ms. Ashani Jayasundara",
    position: "Lecturer",
    department: "",
    message:
      "Your comprehensive knowledge of computer science and your student-centered teaching approach would make you an ideal guest for our diverse audience of aspiring innovators.",
  },
  {
    id: "natashya",
    name: "Ms. Natashya Chamba",
    position: "Lecturer",
    department: "",
    message:
      "Your technical expertise and ability to explain complex computing concepts would help our audience overcome challenges and achieve their project goals.",
  },
  {
    id: "hirushi",
    name: "Ms. Hirushi Dilpriya",
    position: "Lecturer",
    department: "Faculty of Computing",
    message:
      "Your dedication to computing education and your innovative teaching methods would inspire our audience to think creatively and solve problems effectively.",
  },
  {
    id: "madusanka",
    name: "Mr. Madusanka Mithrananda",
    position: "Lecturer",
    department: "Faculty of Computing",
    message:
      "Your expertise in computer science and your commitment to student development would provide our Hack Talk attendees with the mentorship insights they need to succeed.",
  },
  {
    id: "kavishka",
    name: "Ms. Kavishka Rajapaksha",
    position: "Lecturer",
    department: "Faculty of Computing",
    message:
      "Your teaching experience and technical knowledge would offer our audience valuable insights and guidance throughout the Hack Talk 2026 experience.",
  },
  {
    id: "anton",
    name: "Mr. Anton Jayakody",
    position: "Lecturer",
    department: "Faculty of Computing",
    message:
      "Your passion for computer science education and your ability to motivate students would create an inspiring atmosphere for innovation and learning at Hack Talk 2026.",
  },
];

export const getInviteById = (id: string): InviteData | undefined => {
  return invites.find((invite) => invite.id === id);
};
