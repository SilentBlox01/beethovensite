
// Basic random data for generating fake identities

const firstNames = {
  male: ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles', 'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Donald', 'Mark', 'Paul', 'Steven', 'Andrew', 'Kenneth', 'Joshua', 'Kevin', 'Brian', 'George', 'Edward', 'Ronald', 'Timothy', 'Jason', 'Jeffrey', 'Ryan', 'Jacob', 'Gary', 'Nicholas', 'Eric', 'Jonathan', 'Stephen', 'Larry', 'Justin', 'Scott', 'Brandon'],
  female: ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen', 'Nancy', 'Lisa', 'Betty', 'Margaret', 'Sandra', 'Ashley', 'Kimberly', 'Emily', 'Donna', 'Michelle', 'Dorothy', 'Carol', 'Amanda', 'Melissa', 'Deborah', 'Stephanie', 'Rebecca', 'Sharon', 'Laura', 'Cynthia', 'Kathleen', 'Amy', 'Shirley', 'Angela', 'Helen', 'Anna', 'Brenda', 'Pamela', 'Nicole', 'Emma']
};

const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores'];

const streets = ['Main St', 'High St', 'Oak St', 'Pine St', 'Maple St', 'Cedar St', 'Elm St', 'Washington St', 'Lake St', 'Hill St'];
const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
const states = ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'TX', 'CA', 'TX', 'CA'];
const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];

export const generateIdentity = (gender: 'male' | 'female' | 'random' = 'random') => {
  const isMale = gender === 'random' ? Math.random() > 0.5 : gender === 'male';
  const firstNameList = isMale ? firstNames.male : firstNames.female;

  const firstName = firstNameList[Math.floor(Math.random() * firstNameList.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 1000)}@${domains[Math.floor(Math.random() * domains.length)]}`;

  const streetNum = Math.floor(Math.random() * 9999) + 1;
  const street = streets[Math.floor(Math.random() * streets.length)];
  const cityIndex = Math.floor(Math.random() * cities.length);
  const city = cities[cityIndex];
  const state = states[cityIndex];
  const zip = Math.floor(Math.random() * 89999) + 10000;

  // US Phone format
  const areaCode = Math.floor(Math.random() * 800) + 200;
  const prefix = Math.floor(Math.random() * 900) + 100;
  const lineNum = Math.floor(Math.random() * 9000) + 1000;
  const phone = `+1 (${areaCode}) ${prefix}-${lineNum}`;

  const birthYear = new Date().getFullYear() - (Math.floor(Math.random() * 60) + 18);
  const birthMonth = Math.floor(Math.random() * 12) + 1;
  const birthDay = Math.floor(Math.random() * 28) + 1;
  const birthDate = `${birthYear}-${birthMonth.toString().padStart(2, '0')}-${birthDay.toString().padStart(2, '0')}`;

  return {
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    gender: isMale ? 'Male' : 'Female',
    email,
    address: `${streetNum} ${street}, ${city}, ${state} ${zip}`,
    city,
    state,
    zip,
    phone,
    birthDate,
    username: `${firstName.substring(0, 1).toLowerCase()}${lastName.toLowerCase()}${birthYear}`
  };
// Utility for generating fake identity data

const firstNames = [
    "James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth",
    "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen",
    "Christopher", "Nancy", "Daniel", "Lisa", "Matthew", "Betty", "Anthony", "Margaret", "Mark", "Sandra",
    "Donald", "Ashley", "Steven", "Kimberly", "Paul", "Emily", "Andrew", "Donna", "Joshua", "Michelle",
    "Kenneth", "Dorothy", "Kevin", "Carol", "Brian", "Amanda", "George", "Melissa", "Edward", "Deborah"
];

const lastNames = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
    "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
    "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson",
    "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
    "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts"
];

const streets = [
    "Main St", "High St", "Maple Ave", "Park Rd", "Oak Ln", "Cedar Blvd", "Sunset Dr", "Pine St", "Washington Ave", "Lakeview Dr",
    "Broadway", "Market St", "Elm St", "Chestnut St", "Church St", "River Rd", "Hillside Ave", "Forest Dr", "Willow Ln", "Spring St"
];

const cities = [
    { city: "New York", state: "NY", zip: "10001" },
    { city: "Los Angeles", state: "CA", zip: "90001" },
    { city: "Chicago", state: "IL", zip: "60601" },
    { city: "Houston", state: "TX", zip: "77001" },
    { city: "Phoenix", state: "AZ", zip: "85001" },
    { city: "Philadelphia", state: "PA", zip: "19101" },
    { city: "San Antonio", state: "TX", zip: "78201" },
    { city: "San Diego", state: "CA", zip: "92101" },
    { city: "Dallas", state: "TX", zip: "75201" },
    { city: "San Jose", state: "CA", zip: "95101" },
    { city: "Austin", state: "TX", zip: "73301" },
    { city: "Jacksonville", state: "FL", zip: "32099" },
    { city: "Fort Worth", state: "TX", zip: "76101" },
    { city: "Columbus", state: "OH", zip: "43085" },
    { city: "Charlotte", state: "NC", zip: "28201" },
    { city: "San Francisco", state: "CA", zip: "94101" },
    { city: "Indianapolis", state: "IN", zip: "46201" },
    { city: "Seattle", state: "WA", zip: "98101" },
    { city: "Denver", state: "CO", zip: "80201" },
    { city: "Washington", state: "DC", zip: "20001" }
];

const jobs = [
    "Software Engineer", "Teacher", "Nurse", "Accountant", "Sales Manager", "Graphic Designer", "Electrician", "Mechanic", "Chef", "Writer",
    "Data Analyst", "Project Manager", "Consultant", "Marketing Specialist", "HR Manager", "Civil Engineer", "Architect", "Pharmacist", "Dentist", "Plumber"
];

const emailDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "proton.me", "icloud.com"];

const generateLuhn = (length: number) => {
    let result = "4"; // Visa start
    for (let i = 0; i < length - 2; i++) {
        result += Math.floor(Math.random() * 10);
    }

    let sum = 0;
    let shouldDouble = true;
    for (let i = result.length - 1; i >= 0; i--) {
        let digit = parseInt(result.charAt(i));
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }

    const checkDigit = (10 - (sum % 10)) % 10;
    return result + checkDigit;
};

export const generateIdentity = () => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const location = cities[Math.floor(Math.random() * cities.length)];
    const street = streets[Math.floor(Math.random() * streets.length)];
    const streetNum = Math.floor(Math.random() * 999) + 1;

    const birthYear = 1960 + Math.floor(Math.random() * 40);
    const birthMonth = Math.floor(Math.random() * 12) + 1;
    const birthDay = Math.floor(Math.random() * 28) + 1;

    const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${Math.floor(Math.random() * 100)}`;

    return {
        fullName: `${firstName} ${lastName}`,
        address: `${streetNum} ${street}, ${location.city}, ${location.state} ${location.zip}`,
        phone: `(${Math.floor(Math.random() * 800) + 200}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${birthYear % 100}@${emailDomains[Math.floor(Math.random() * emailDomains.length)]}`,
        job: jobs[Math.floor(Math.random() * jobs.length)],
        birthdate: `${birthYear}-${birthMonth.toString().padStart(2, '0')}-${birthDay.toString().padStart(2, '0')}`,
        username: username,
        password: Math.random().toString(36).slice(-10) + "!",
        cc: generateLuhn(16)
    };
};
