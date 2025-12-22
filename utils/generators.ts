
// Basic random data for generating fake identities

const firstNames = {
  male: ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles', 'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Donald', 'Mark', 'Paul', 'Steven', 'Andrew', 'Kenneth', 'Joshua', 'Kevin', 'Brian', 'George', 'Edward', 'Ronald', 'Timothy', 'Jason', 'Jeffrey', 'Ryan', 'Jacob', 'Gary', 'Nicholas', 'Eric', 'Jonathan', 'Stephen', 'Larry', 'Justin', 'Scott', 'Brandon'],
  female: ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen', 'Nancy', 'Lisa', 'Betty', 'Margaret', 'Sandra', 'Ashley', 'Kimberly', 'Emily', 'Donna', 'Michelle', 'Dorothy', 'Carol', 'Amanda', 'Melissa', 'Deborah', 'Stephanie', 'Rebecca', 'Sharon', 'Laura', 'Cynthia', 'Kathleen', 'Amy', 'Shirley', 'Angela', 'Helen', 'Anna', 'Brenda', 'Pamela', 'Nicole', 'Emma']
};

const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores'];

const streets = ['Main St', 'High St', 'Oak St', 'Pine St', 'Maple St', 'Cedar St', 'Elm St', 'Washington St', 'Lake St', 'Hill St', 'Broadway', 'Park Ave', 'Sunset Blvd', 'Fifth Ave', 'Madison Ave'];
const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'San Francisco', 'Charlotte', 'Indianapolis', 'Seattle', 'Denver', 'Washington'];
const states = ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'TX', 'CA', 'TX', 'CA', 'TX', 'FL', 'TX', 'OH', 'CA', 'NC', 'IN', 'WA', 'CO', 'DC'];
const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'protonmail.com', 'aol.com', 'zoho.com'];

const jobs = ['Software Engineer', 'Data Scientist', 'Product Manager', 'Graphic Designer', 'Nurse', 'Teacher', 'Accountant', 'Marketing Manager', 'Sales Representative', 'Consultant', 'Project Manager', 'Architect', 'Chef', 'Electrician', 'Plumber', 'Writer', 'Editor', 'Photographer', 'Lawyer', 'Physician', 'Pharmacist', 'Police Officer', 'Firefighter', 'Artist', 'Musician', 'Actor', 'Scientist', 'Researcher', 'Professor', 'Student'];
const companies = ['TechCorp', 'GlobalSol', 'InnovateX', 'FutureSystems', 'DataDynamix', 'CloudNine', 'GreenEnergy', 'HealthPlus', 'EduLearn', 'CreativeMinds', 'SecureNet', 'AlphaOmega', 'OmegaTech', 'BlueSky', 'RedRock', 'SilverLake', 'GoldenGate', 'IronWorks', 'SteelCity', 'UrbanLiving', 'EcoWorld', 'BioLife', 'MedCare', 'FinServe', 'BankUnited', 'InsureSafe', 'TravelWise', 'Foodies', 'ShopSmart', 'AutoDrive'];

// Luhn Algorithm for Credit Card Validation/Generation
const generateCreditCard = (prefixList: string[], length: number) => {
    const prefix = prefixList[Math.floor(Math.random() * prefixList.length)];
    let ccNumber = prefix;
    while (ccNumber.length < length - 1) {
        ccNumber += Math.floor(Math.random() * 10).toString();
    }

    // Calculate check digit
    let sum = 0;
    let isSecond = true;
    for (let i = ccNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(ccNumber[i]);
        if (isSecond) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        isSecond = !isSecond;
    }
    const checkDigit = (10 - (sum % 10)) % 10;
    return ccNumber + checkDigit;
};

const generateIBAN = (countryCode: string) => {
    // Simplified IBAN generation (not fully compliant with bank codes, but valid structure)
    const charToNum = (char: string) => char.charCodeAt(0) - 55;
    const country = countryCode.toUpperCase();
    const bankCode = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const branchCode = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const accountNum = Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
    
    // Check digits calculation is complex, here we mock valid LOOKING structure
    // Format: CCKK BBBB SSSS AAAA AAAA AA
    return `${country}${Math.floor(Math.random() * 89 + 10)} ${bankCode} ${branchCode} ${accountNum.substring(0, 4)} ${accountNum.substring(4, 8)} ${accountNum.substring(8)}`;
};

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
  
  const job = jobs[Math.floor(Math.random() * jobs.length)];
  const company = companies[Math.floor(Math.random() * companies.length)];
  
  // Visa (4) or Mastercard (51-55)
  const isVisa = Math.random() > 0.5;
  const ccPrefix = isVisa ? ['4'] : ['51', '52', '53', '54', '55'];
  const creditCard = generateCreditCard(ccPrefix, 16);
  const cvv = Math.floor(Math.random() * 899) + 100;
  const expMonth = Math.floor(Math.random() * 12) + 1;
  const expYear = new Date().getFullYear() + Math.floor(Math.random() * 5) + 1;
  const ccExp = `${expMonth.toString().padStart(2, '0')}/${expYear.toString().slice(-2)}`;

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
    username: `${firstName.substring(0, 1).toLowerCase()}${lastName.toLowerCase()}${birthYear}`,
    job,
    company,
    creditCard: `${creditCard.match(/.{1,4}/g)?.join(' ')}`,
    ccCvv: cvv,
    ccExp,
    iban: generateIBAN(isMale ? 'DE' : 'FR') // Just randomizing country code for variety
  };
};
