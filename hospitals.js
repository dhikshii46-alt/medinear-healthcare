export const districts = [
  "Ariyalur",
  "Chengalpattu",
  "Chennai",
  "Coimbatore",
  "Cuddalore",
  "Dharmapuri",
  "Dindigul",
  "Erode",
  "Kallakurichi",
  "Kancheepuram",
  "Kanniyakumari",
  "Karur",
  "Krishnagiri",
  "Madurai",
  "Mayiladuthurai",
  "Nagapattinam",
  "Namakkal",
  "Perambalur",
  "Pudukkottai",
  "Ramanathapuram",
  "Ranipet",
  "Salem",
  "Sivaganga",
  "Tenkasi",
  "Thanjavur",
  "Theni",
  "Thoothukudi",
  "Tiruchirappalli",
  "Tirunelveli",
  "Tirupathur",
  "Tiruppur",
  "Tiruvallur",
  "Tiruvannamalai",
  "Tiruvarur",
  "Vellore",
  "Viluppuram",
  "Virudhunagar"
];

// Verified details should be added here.
// Do not use unverified phone numbers for real patients.
const verifiedHospitals = [
  {
    name: "Government District Headquarters Hospital",
    district: "Nagapattinam",
    type: "Government Hospital",
    specialty: "General Medical Care",
    location: "Elancheran Nagar, Nagapattinam, Tamil Nadu 611001",
    phone: "04365-242459",
    hours: "Contact hospital to confirm",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Government+District+Headquarters+Hospital+Nagapattinam",
    isDemo: false
  },
  {
    name: "Government Medical College Hospital",
    district: "Nagapattinam",
    type: "Government Medical College Hospital",
    specialty: "Multispecialty Care",
    location: "Orathur, Nagapattinam, Tamil Nadu 611108",
    phone: "Contact hospital to confirm",
    hours: "Contact hospital to confirm",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Government+Medical+College+Hospital+Nagapattinam",
    isDemo: false
  },
  {
    name: "Ansari Hospital Nagapattinam",
    district: "Nagapattinam",
    type: "Private Hospital",
    specialty: "General Medical Care",
    location:
      "Naganathar Sannathi, Melakottaivasal, Nagore, Nagapattinam - 611001",
    phone: "04365-224349 / 224527",
    hours: "Contact hospital to confirm",
    mapUrl: "https://maps.app.goo.gl/tqitbZG2QoMFCxyj6",
    isDemo: false
  },
  {
    name: "Dr. Muthukumaran's Diabetes Centre and Speciality Hospital",
    district: "Nagapattinam",
    type: "Private Hospital",
    specialty: "Diabetes and Speciality Care",
    location:
      "Mela Kayaroganasamy Sannathi, Opposite LIC, Kakka Pillaiyar Kovil Street, Nagapattinam - 611001",
    phone: "94433 15311 / 04365-225333",
    hours: "Contact hospital to confirm",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Dr+Muthukumaran+Diabetes+Centre+Nagapattinam",
    isDemo: false
  },
  {
    name: "Dr. M.C. Surgical Clinic",
    district: "Nagapattinam",
    type: "Clinic",
    specialty: "Surgical Consultation",
    location: "VOC Nagar, Nagapattinam - 611001",
    phone: "04369-247990",
    hours: "Contact hospital to confirm",
    mapUrl: "https://maps.app.goo.gl/stbu5BjV3tPbQYof7",
    isDemo: false
  },
  {
    name: "Naagai Hospital Manjakollai",
    district: "Nagapattinam",
    type: "Private Hospital",
    specialty: "General Medical Care",
    location:
      "3/134, Opposite Mangala Mahal, Puthur, Manjakollai, Nagapattinam - 611106",
    phone: "04365-224650 / 224115",
    hours: "Contact hospital to confirm",
    mapUrl: "https://maps.app.goo.gl/EFxMQX1B9zJoDef79",
    isDemo: false
  },
  {
    name: "Pentagon Hospital",
    district: "Nagapattinam",
    type: "Private Hospital",
    specialty: "General Medical Care",
    location:
      "Sattayaper East Street, ASN Colony, Melakottaivasal, Nagapattinam - 611003",
    phone: "04365-224515",
    hours: "Contact hospital to confirm",
    mapUrl: "https://maps.app.goo.gl/KnAgtqcrCTrt9Rjp8",
    isDemo: false
  },
  {
    name: "Sakthi Nursing Home",
    district: "Nagapattinam",
    type: "Nursing Home",
    specialty: "General Medical Care",
    location:
      "18/6, Pidari Koil Street, ASN Colony, Melakottaivasal, Nagapattinam - 611001",
    phone: "90871 01010 / 9840204471 / 04365-242121",
    hours: "Contact hospital to confirm",
    mapUrl: "https://maps.app.goo.gl/izW5euXAnssWtwbd6",
    isDemo: false
  },
  {
    name: "V.P.N Eye Hospital Nagore",
    district: "Nagapattinam",
    type: "Eye Hospital",
    specialty: "Eye Care",
    location:
      "6, Neela W Street, Near Ayyappan Kovil, ASN Colony, Nagore, Nagapattinam - 611001",
    phone: "04365-221144 / 221344",
    hours: "Contact hospital to confirm",
    mapUrl: "https://maps.app.goo.gl/D6fNsH4DT4mMM2Wc6",
    isDemo: false
  },
  {
    name: "Vishnu Multi Speciality Hospital Kollidam",
    district: "Nagapattinam",
    type: "Private Multispeciality Hospital",
    specialty: "Multispecialty Care",
    location: "East Coast Road, Kollidam - 609102",
    phone: "04364-277021",
    hours: "Contact hospital to confirm",
    mapUrl: "https://maps.app.goo.gl/nmhP35sWWQWC8H177",
    isDemo: false
  }
];

// Remaining districts stay visible in the app.
// These are clearly labelled as unverified placeholders,
// not real hospital listings.
const placeholderHospitals = districts
  .filter((district) => district !== "Nagapattinam")
  .flatMap((district) => [
    {
      name: `${district} Government Hospital - Verify Listing`,
      district,
      type: "Government Hospital",
      specialty: "General Medical Care",
      location: `${district}, Tamil Nadu`,
      phone: "Not verified - contact the official hospital directory",
      hours: "Not verified",
      mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `Government hospital, ${district}, Tamil Nadu`
      )}`,
      isDemo: true
    },
    {
      name: `${district} Private Hospital - Verify Listing`,
      district,
      type: "Private Hospital",
      specialty: "General Medical Care",
      location: `${district}, Tamil Nadu`,
      phone: "Not verified - contact the hospital directly",
      hours: "Not verified",
      mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `Private hospital, ${district}, Tamil Nadu`
      )}`,
      isDemo: true
    }
  ]);

export const hospitals = [
  ...verifiedHospitals,
  ...placeholderHospitals
];