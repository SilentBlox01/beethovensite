
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
};
