export interface RentalItem {
  id: string
  name: string
  category: string
  pricePerDay: number
  securityDeposit: number
  condition: "New" | "Like New" | "Used"
  availability: "Available" | "Rented" | "Reserved"
  description: string
  images: string[]
  location: string
  seller: {
    name: string
    year: string
    department: string
    verified: boolean
    avatar: string
  }
}

export const categories = [
  "All",
  "Electronics",
  "Books",
  "Sports",
  "Musical Instruments",
  "Lab Equipment",
  "Photography",
  "Furniture",
]

export const rentalItems: RentalItem[] = [
  {
    id: "1",
    name: "MacBook Air M2",
    category: "Electronics",
    pricePerDay: 250,
    securityDeposit: 5000,
    condition: "Like New",
    availability: "Available",
    description:
      "Apple MacBook Air M2 chip, 8GB RAM, 256GB SSD. Perfect for coding, presentations, and project work. Comes with charger and protective sleeve. Battery health at 96%.",
    images: ["/images/macbook-1.jpg", "/images/macbook-2.jpg", "/images/macbook-3.jpg"],
    location: "NIT Trichy - Hostel Block C",
    seller: {
      name: "Arjun Mehta",
      year: "3rd Year",
      department: "Computer Science",
      verified: true,
      avatar: "AM",
    },
  },
  {
    id: "2",
    name: "Canon EOS 200D DSLR",
    category: "Photography",
    pricePerDay: 350,
    securityDeposit: 8000,
    condition: "Like New",
    availability: "Available",
    description:
      "Canon EOS 200D with 18-55mm kit lens. Ideal for college events, photography clubs, and YouTube content. Includes camera bag, extra battery, and 32GB SD card.",
    images: ["/images/camera-1.jpg", "/images/camera-2.jpg", "/images/camera-3.jpg"],
    location: "IIT Bombay - Hostel 10",
    seller: {
      name: "Priya Sharma",
      year: "2nd Year",
      department: "Design",
      verified: true,
      avatar: "PS",
    },
  },
  {
    id: "3",
    name: "Engineering Graphics Kit",
    category: "Lab Equipment",
    pricePerDay: 30,
    securityDeposit: 500,
    condition: "Used",
    availability: "Available",
    description:
      "Complete engineering graphics/drawing kit with drafter, set squares, compass, protractor, and French curves. All instruments in working condition. Great for first-year students.",
    images: ["/images/graphics-1.jpg", "/images/graphics-2.jpg"],
    location: "BITS Pilani - Meera Bhawan",
    seller: {
      name: "Rahul Dev",
      year: "4th Year",
      department: "Mechanical",
      verified: false,
      avatar: "RD",
    },
  },
  {
    id: "4",
    name: "Yamaha F310 Acoustic Guitar",
    category: "Musical Instruments",
    pricePerDay: 100,
    securityDeposit: 2000,
    condition: "Like New",
    availability: "Available",
    description:
      "Yamaha F310 full-size acoustic guitar with a rich, warm tone. Comes with a padded gig bag, capo, picks, and a tuner. Perfect for beginners and intermediate players.",
    images: ["/images/guitar-1.jpg", "/images/guitar-2.jpg"],
    location: "VIT Vellore - Men's Hostel Block D",
    seller: {
      name: "Karthik Rajan",
      year: "2nd Year",
      department: "ECE",
      verified: true,
      avatar: "KR",
    },
  },
  {
    id: "5",
    name: "Organic Chemistry (Morrison & Boyd)",
    category: "Books",
    pricePerDay: 15,
    securityDeposit: 300,
    condition: "Used",
    availability: "Available",
    description:
      "Morrison & Boyd Organic Chemistry textbook, 7th edition. Some highlighting and margin notes from previous use, but all pages intact. Essential for chemistry students.",
    images: ["/images/book-1.jpg", "/images/book-2.jpg"],
    location: "IIT Delhi - Kumaon Hostel",
    seller: {
      name: "Sneha Gupta",
      year: "3rd Year",
      department: "Chemistry",
      verified: true,
      avatar: "SG",
    },
  },
  {
    id: "6",
    name: "Badminton Racket Set (Yonex)",
    category: "Sports",
    pricePerDay: 40,
    securityDeposit: 800,
    condition: "New",
    availability: "Rented",
    description:
      "Yonex Nanoray Light 18i badminton racket set with 2 rackets, 6 shuttlecocks, and a carry case. Brand new, only used twice. Great for recreational or competitive play on campus courts.",
    images: ["/images/badminton-1.jpg", "/images/badminton-2.jpg"],
    location: "NIT Surathkal - Girls Hostel Block A",
    seller: {
      name: "Ananya Iyer",
      year: "1st Year",
      department: "CSE",
      verified: true,
      avatar: "AI",
    },
  },
  {
    id: "7",
    name: "TI-84 Plus Scientific Calculator",
    category: "Electronics",
    pricePerDay: 25,
    securityDeposit: 1000,
    condition: "Like New",
    availability: "Available",
    description:
      "Texas Instruments TI-84 Plus CE graphing calculator. Pre-loaded with math and science apps. Perfect for exams, lab work, and advanced math courses. Includes USB cable.",
    images: ["/images/calculator-1.jpg", "/images/calculator-2.jpg"],
    location: "IIIT Hyderabad - Old Boys Hostel",
    seller: {
      name: "Vikram Rao",
      year: "2nd Year",
      department: "Mathematics",
      verified: true,
      avatar: "VR",
    },
  },
  {
    id: "8",
    name: "Portable Study Table",
    category: "Furniture",
    pricePerDay: 20,
    securityDeposit: 500,
    condition: "Used",
    availability: "Available",
    description:
      "Foldable portable study table/laptop desk. Adjustable height and angle. Lightweight and easy to carry between rooms. Minor scratches on surface but fully functional.",
    images: ["/images/table-1.jpg", "/images/table-2.jpg"],
    location: "DTU Delhi - Boys Hostel 3",
    seller: {
      name: "Manish Kumar",
      year: "4th Year",
      department: "Civil",
      verified: false,
      avatar: "MK",
    },
  },
]
