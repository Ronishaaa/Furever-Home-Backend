import {
  AdoptionStatus,
  EnergyLevel,
  ExperienceLevel,
  Prisma,
  PrismaClient,
  TrainingLevel,
} from "@prisma/client";
import axios from "axios";
import { hashPassword } from "../src/_globals/utils";

const prisma = new PrismaClient();

const data: Prisma.AdminCreateInput = {
  email: "admin@gmail.com",
  password: "admin@1234",
};

const seedAdmin = async () => {
  const passwordHash = await hashPassword(data.password);

  const admin = await prisma.admin.upsert({
    where: { email: data.email },
    update: {},
    create: { ...data, password: passwordHash },
    select: { id: true },
  });

  return admin;
};

const dogBreeds = [
  "Affenpinscher",
  "American Hairless Terrier",
  "American Leopard Hound",
  "American Staffordshire Terrier",
  "American Water Spaniel",
  "Anatolian Shepherd Dog",
  "Appenzeller Sennenhund",
  "Australian Cattle Dog",
  "Australian Kelpie",
  "Australian Shepherd",
  "Australian Stumpy Tail Cattle Dog",
  "Australian Terrier",
  "Azawakh",
  "Barbet",
  "Basenji",
  "Basset Fauve de Bretagne",
  "Basset Hound",
  "Bavarian Mountain Scent Hound",
  "Beagle",
  "Bearded Collie",
  "Beauceron",
  "Bedlington Terrier",
  "Belgian Laekenois",
  "Belgian Malinois",
  "Belgian Sheepdog",
  "Belgian Tervuren",
  "Bergamasco Sheepdog",
  "Berger Picard",
  "Bernese Mountain Dog",
  "Bichon Frise",
  "Biewer Terrier",
  "Black and Tan Coonhound",
  "Black Russian Terrier",
  "Bloodhound",
  "Bluetick Coonhound",
  "Boerboel",
  "Bohemian Shepherd",
  "Bolognese",
  "Border Collie",
  "Border Terrier",
  "Borzoi",
  "Boston Terrier",
  "Bouvier des Flandres",
  "Boxer",
  "Boykin Spaniel",
  "Bracco Italiano",
  "Braque du Bourbonnais",
  "Braque Francais Pyrenean",
  "Briard",
  "Brittany",
  "Broholmer",
  "Brussels Griffon",
  "Bull Terrier",
  "Bulldog",
  "Bullmastiff",
  "Cairn Terrier",
  "Canaan Dog",
  "Cane Corso",
  "Cardigan Welsh Corgi",
  "Carolina Dog",
  "Catahoula Leopard Dog",
  "Caucasian Shepherd Dog",
  "Cavalier King Charles Spaniel",
  "Central Asian Shepherd Dog",
  "Cesky Terrier",
  "Chesapeake Bay Retriever",
  "Chihuahua",
  "Chinese Crested",
  "Chinese Shar-Pei",
  "Chinook",
  "Chow Chow",
  "Cirneco dell'Etna",
  "Clumber Spaniel",
  "Cocker Spaniel",
  "Collie",
  "Coton de Tulear",
  "Croatian Sheepdog",
  "Curly-Coated Retriever",
  "Czechoslovakian Vlcak",
  "Dachshund",
  "Dalmatian",
  "Dandie Dinmont Terrier",
  "Danish-Swedish Farmdog",
  "Deutscher Wachtelhund",
  "Doberman Pinscher",
  "Dogo Argentino",
  "Dogue de Bordeaux",
  "Drentsche Patrijshond",
  "Drever",
  "Dutch Shepherd",
  "English Cocker Spaniel",
  "English Foxhound",
  "English Setter",
  "English Springer Spaniel",
  "English Toy Spaniel",
  "Entlebucher Mountain Dog",
  "Estrela Mountain Dog",
  "Eurasier",
  "Field Spaniel",
  "Finnish Lapphund",
  "Finnish Spitz",
  "Flat-Coated Retriever",
  "French Bulldog",
  "French Spaniel",
  "German Longhaired Pointer",
  "German Pinscher",
  "German Shepherd Dog",
  "German Shorthaired Pointer",
  "German Spitz",
  "German Wirehaired Pointer",
  "Giant Schnauzer",
  "Glen of Imaal Terrier",
  "Golden Retriever",
  "Gordon Setter",
  "Grand Basset Griffon Vendéen",
  "Great Dane",
  "Great Pyrenees",
  "Greater Swiss Mountain Dog",
  "Greyhound",
  "Hamiltonstovare",
  "Hanoverian Scenthound",
  "Harrier",
  "Havanese",
  "Hokkaido",
  "Hovawart",
  "Ibizan Hound",
  "Icelandic Sheepdog",
  "Irish Red and White Setter",
  "Irish Setter",
  "Irish Terrier",
  "Irish Water Spaniel",
  "Irish Wolfhound",
  "Italian Greyhound",
  "Jagdterrier",
  "Japanese Chin",
  "Japanese Spitz",
  "Jindo",
  "Kai Ken",
  "Karelian Bear Dog",
  "Keeshond",
  "Kerry Blue Terrier",
  "Kishu Ken",
  "Komondor",
  "Kromfohrlander",
  "Kuvasz",
  "Labrador Retriever",
  "Lagotto Romagnolo",
  "Lakeland Terrier",
  "Lancashire Heeler",
  "Lapponian Herder",
  "Leonberger",
  "Lhasa Apso",
  "Löwchen",
  "Maltese",
  "Manchester Terrier (Standard)",
  "Manchester Terrier (Toy)",
  "Mastiff",
  "Miniature American Shepherd",
  "Miniature Bull Terrier",
  "Miniature Pinscher",
  "Miniature Schnauzer",
  "Mountain Cur",
  "Mudi",
  "Neapolitan Mastiff",
  "Nederlandse Kooikerhondje",
  "Newfoundland",
  "Norfolk Terrier",
  "Norrbottenspets",
  "Norwegian Buhund",
  "Norwegian Elkhound",
  "Norwegian Lundehund",
  "Norwich Terrier",
  "Nova Scotia Duck Tolling Retriever",
  "Old English Sheepdog",
  "Otterhound",
  "Papillon",
  "Parson Russell Terrier",
  "Pekingese",
  "Pembroke Welsh Corgi",
  "Perro de Presa Canario",
  "Peruvian Inca Orchid",
  "Petit Basset Griffon Vendéen",
  "Pharaoh Hound",
  "Plott Hound",
  "Pointer",
  "Polish Lowland Sheepdog",
  "Pomeranian",
  "Poodle (Miniature)",
  "Poodle (Standard)",
  "Poodle (Toy)",
  "Porcelaine",
  "Portuguese Podengo",
  "Portuguese Podengo Pequeno",
  "Portuguese Pointer",
  "Portuguese Sheepdog",
  "Portuguese Water Dog",
  "Pudelpointer",
  "Pug",
  "Puli",
  "Pumi",
  "Pyrenean Mastiff",
  "Pyrenean Shepherd",
  "Rafeiro do Alentejo",
  "Rat Terrier",
  "Redbone Coonhound",
  "Rhodesian Ridgeback",
  "Romanian Mioritic Shepherd Dog",
  "Rottweiler",
  "Russell Terrier",
  "Russian Toy",
  "Russian Tsvetnaya Bolonka",
  "Saint Bernard",
  "Saluki",
  "Samoyed",
  "Schapendoes",
  "Schipperke",
  "Scottish Deerhound",
  "Scottish Terrier",
  "Sealyham Terrier",
  "Segugio Italiano",
  "Shetland Sheepdog",
  "Shiba Inu",
  "Shih Tzu",
  "Shikoku",
  "Siberian Husky",
  "Silky Terrier",
  "Skye Terrier",
  "Sloughi",
  "Slovakian Wirehaired Pointer",
  "Slovensky Cuvac",
  "Slovensky Kopov",
  "Small Munsterlander Pointer",
  "Smooth Fox Terrier",
  "Soft Coated Wheaten Terrier",
  "Spanish Mastiff",
  "Spanish Water Dog",
  "Spinone Italiano",
  "Stabyhoun",
  "Staffordshire Bull Terrier",
  "Standard Schnauzer",
  "Sussex Spaniel",
  "Swedish Lapphund",
  "Swedish Vallhund",
  "Taiwan Dog",
  "Teddy Roosevelt Terrier",
  "Thai Ridgeback",
  "Tibetan Mastiff",
  "Tibetan Spaniel",
  "Tibetan Terrier",
  "Tornjak",
  "Tosa",
  "Toy Fox Terrier",
  "Transylvanian Hound",
  "Treeing Tennessee Brindle",
  "Treeing Walker Coonhound",
  "Vizsla",
  "Weimaraner",
  "Welsh Springer Spaniel",
  "Welsh Terrier",
  "West Highland White Terrier",
  "Wetterhoun",
  "Whippet",
  "Wire Fox Terrier",
  "Wirehaired Pointing Griffon",
  "Wirehaired Vizsla",
  "Working Kelpie",
  "Xoloitzcuintli",
  "Yakutian Laika",
  "Yorkshire Terrier",
];

// Helper function to get random item from array
const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Helper function to get random integer between min and max (inclusive)
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Sample pet names
const petNames = [
  "Bella",
  "Max",
  "Luna",
  "Charlie",
  "Lucy",
  "Cooper",
  "Daisy",
  "Rocky",
  "Molly",
  "Buddy",
  "Sadie",
  "Jack",
  "Lola",
  "Duke",
  "Zoe",
  "Teddy",
  "Ruby",
  "Oliver",
  "Rosie",
  "Leo",
  "Lily",
  "Milo",
  "Chloe",
  "Toby",
  "Sophie",
  "Bear",
  "Stella",
  "Tucker",
  "Roxy",
  "Oscar",
  "Gracie",
  "Winston",
  "Penny",
  "Sam",
  "Maggie",
  "Zeus",
  "Bailey",
  "Gus",
  "Nala",
  "Murphy",
  "Coco",
  "Riley",
  "Poppy",
  "Buster",
  "Willow",
  "Bruno",
  "Phoebe",
  "Archie",
  "Millie",
  "Shadow",
];

// Sample colors
const petColors = [
  "Black",
  "White",
  "Brown",
  "Tan",
  "Golden",
  "Gray",
  "Cream",
  "Red",
  "Blue",
  "Silver",
  "Brindle",
  "Spotted",
  "Merle",
  "Fawn",
  "Sable",
  "Black and Tan",
  "Black and White",
  "Tricolor",
  "White and Brown",
  "Yellow",
];

// Sample personality traits
const personalityTraits = [
  "Loyal",
  "Playful",
  "Smart",
  "Affectionate",
  "Curious",
  "Gentle",
  "Alert",
  "Independent",
  "Confident",
  "Outgoing",
  "Protective",
  "Energetic",
  "Calm",
  "Sociable",
  "Eager-to-please",
  "Courageous",
  "Stubborn",
  "Adaptable",
  "Patient",
  "Dominant",
];

// Sample health conditions
const healthConditions = [
  "Healthy",
  "Allergies",
  "Arthritis",
  "Dental issues",
  "Vision impaired",
  "Hearing impaired",
  "Skin condition",
  "Heart murmur",
  "Recovering from surgery",
  "Epilepsy",
  "Diabetes",
  "Hip dysplasia",
  "Anxiety",
  "Digestive issues",
  null,
];

// Sample stranger behaviors
const strangerBehaviors = [
  "Friendly with everyone",
  "Initially cautious but warms up quickly",
  "Shy around strangers",
  "Aloof but not aggressive",
  "Protective but controllable",
  "Excited to meet new people",
  "Reserved with strangers",
  "Wary but non-aggressive",
  "Vocal but friendly",
  null,
];

// Sample special traits
const specialTraits = [
  "Loves water",
  "Great with kids",
  "Therapy dog potential",
  "Advanced training",
  "Excellent nose work",
  "Very quiet",
  "Extremely intelligent",
  "Hypoallergenic coat",
  "Rescue background",
  "Former service dog",
  "Show quality",
  "Unusual marking pattern",
  null,
];

// Sample ideal homes
const idealHomes = [
  "Active family",
  "Quiet household",
  "Home with yard",
  "Experienced dog owner",
  "Senior-friendly home",
  "Home with other pets",
  "Family with older children",
  "Single-pet household",
  "Apartment living",
  "Rural setting",
  "Suburban home",
  null,
];

// Sample special needs
const specialNeeds = [
  "Regular grooming",
  "Special diet",
  "Daily medication",
  "Limited stairs",
  "Specific exercise routine",
  "Anxiety management",
  "Noise sensitivity accommodation",
  "Regular vet check-ups",
  "Physical therapy",
  null,
];

// Function to get real dog images
const getDogImages = async (
  breed: string,
  count: number
): Promise<string[]> => {
  try {
    // Convert breed name to format used by the Dog CEO API
    const formattedBreed = breed
      .toLowerCase()
      .replace(/\s+/g, "/")
      .replace(/\([^)]*\)/g, "")
      .trim();

    // Try to get breed-specific images first
    try {
      const response = await axios.get(
        `https://dog.ceo/api/breed/${formattedBreed}/images/random/${count}`
      );

      if (response.data.status === "success") {
        return response.data.message;
      }
    } catch (error) {
      // If breed-specific request fails, fall back to random dogs
      console.log(`No specific images for ${breed}, using random dogs instead`);
    }

    // Fallback to random dog images
    const response = await axios.get(
      `https://dog.ceo/api/breeds/image/random/${count}`
    );

    if (response.data.status === "success") {
      return response.data.message;
    }

    // If all API calls fail, return placeholder images
    return Array(count)
      .fill(0)
      .map(
        (_, index) =>
          `https://placedog.net/500/300?id=${Math.floor(Math.random() * 100)}`
      );
  } catch (error) {
    console.error("Error fetching dog images:", error);

    // Return placeholder images if API calls fail
    return Array(count)
      .fill(0)
      .map(
        (_, index) =>
          `https://placedog.net/500/300?id=${Math.floor(Math.random() * 100)}`
      );
  }
};

// Create pet seed data
const seedPets = async () => {
  // Define the pets array with the correct type
  const pets: Array<Prisma.PetGetPayload<{ include: { adoptionInfo: true } }>> =
    [];

  // Generate 50 pets with random attributes
  for (let i = 0; i < 50; i++) {
    // Generate 1-4 random personality traits without duplicates
    const numTraits = getRandomInt(1, 4);
    const personalitySet = new Set<string>();
    while (personalitySet.size < numTraits) {
      personalitySet.add(getRandomItem(personalityTraits));
    }
    const personality = Array.from(personalitySet);

    // Select a random breed for this pet
    const breed = getRandomItem(dogBreeds);

    // Generate 1-3 random real dog images
    const numImages = getRandomInt(1, 3);
    const images = await getDogImages(breed, numImages);

    // Create pet data
    const pet: Prisma.PetCreateInput = {
      name: getRandomItem(petNames),
      breed: breed,
      age: getRandomInt(1, 15),
      gender: getRandomItem(["Male", "Female"]),
      color: getRandomItem(petColors),
      healthCondition: getRandomItem(healthConditions),
      vaccination: Math.random() > 0.15, // 85% are vaccinated
      adoptionStatus: AdoptionStatus.Available,
      images,
      personality,
      energyLevel: getRandomItem([
        EnergyLevel.High,
        EnergyLevel.Medium,
        EnergyLevel.Low,
      ]),
      trainingLevel: getRandomItem([
        TrainingLevel.None,
        TrainingLevel.Basic,
        TrainingLevel.Advanced,
      ]),
      strangerBehavior: getRandomItem(strangerBehaviors),
      specialTraits: getRandomItem(specialTraits),
      adoptionInfo: {
        create: {
          idealHome: getRandomItem(idealHomes),
          childrenFriendly: Math.random() > 0.3, // 70% are children friendly
          otherPetsFriendly: Math.random() > 0.25, // 75% are other pets friendly
          experienceLevel: getRandomItem([
            ExperienceLevel.FirstTimeOwner,
            ExperienceLevel.ExperiencedOwner,
          ]),
          specialNeeds: getRandomItem(specialNeeds),
        },
      },
    };

    // Create the pet in the database
    const createdPet = await prisma.pet.create({
      data: pet,
      include: {
        adoptionInfo: true,
      },
    });

    pets.push(createdPet);
    console.log(
      `Created pet: ${createdPet.name} (${createdPet.breed}), ID: ${createdPet.id}`
    );
  }

  return pets;
};

async function main() {
  console.log("Start seeding ...");

  const admin = await seedAdmin();
  console.log(`Created dashboard admin with id: ${admin.id}`);

  // Seed pets
  console.log("Starting pet seeding...");
  const pets = await seedPets();
  console.log(`Created ${pets.length} pets successfully!`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
