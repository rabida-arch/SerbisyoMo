// Demonstration data only. Names, contact details, rates, ratings, and availability are fictional.
// Sample set covers 18 local service categories for Boac, Marinduque.
const providers = [
  {
    "id": 1,
    "name": "Ramon's Plumbing Services",
    "category": "Plumbing",
    "description": "Leak repair, faucet installation, and drain unclogging for homes.",
    "barangaysCovered": [
      "Tanza",
      "Caganhao",
      "Mercado"
    ],
    "yearsExperience": 8,
    "rate": 450,
    "rateType": "per hour",
    "contactNumber": "09XX-XXX-1001",
    "email": "ramon.plumbing@example.com",
    "availability": "Mon to Sat, 8AM to 5PM",
    "rating": 4.1,
    "reviewCount": 72,
    "specialties": [
      "Pipe replacement",
      "Leak repair",
      "Faucet installation"
    ],
    "languages": [
      "Tagalog",
      "English",
      "Marinduque\u00f1o"
    ],
    "responseTime": "Usually responds within a day",
    "reviews": [
      {
        "name": "Jose",
        "rating": 4,
        "comment": "Fair price and clear communication throughout the job.",
        "date": "2026-10-27"
      },
      {
        "name": "Cecilia",
        "rating": 4,
        "comment": "Good quality work for the rate. Will book again next time.",
        "date": "2026-09-17"
      },
      {
        "name": "Carlos",
        "rating": 4,
        "comment": "Honest assessment of what was needed\u2014no unnecessary extras.",
        "date": "2026-08-08"
      }
    ]
  },
  {
    "id": 2,
    "name": "Lito Dela Cruz Home Plumbing",
    "category": "Plumbing",
    "description": "Water line repairs, toilet fixes, and basic pipe replacement.",
    "barangaysCovered": [
      "Murallon",
      "Isok I",
      "Malusak"
    ],
    "yearsExperience": 5,
    "rate": 1200,
    "rateType": "per job",
    "contactNumber": "09XX-XXX-1002",
    "email": "lito.plumbing@example.com",
    "availability": "Tue to Sun, 9AM to 6PM",
    "rating": 5,
    "reviewCount": 90,
    "specialties": [
      "Pipe replacement",
      "Leak repair",
      "Faucet installation"
    ],
    "languages": [
      "Tagalog",
      "English",
      "Marinduque\u00f1o"
    ],
    "responseTime": "Often available same-day for urgent jobs",
    "reviews": [
      {
        "name": "Ana",
        "rating": 5,
        "comment": "Did a careful job and cleaned up after. Recommended.",
        "date": "2026-10-26"
      },
      {
        "name": "Mario",
        "rating": 5,
        "comment": "Professional and respectful. The result looked neat.",
        "date": "2026-09-16"
      }
    ]
  },
  {
    "id": 3,
    "name": "BrightSide Electrical Repair",
    "category": "Electrical",
    "description": "Troubleshooting, light fixture installation, and outlet repairs.",
    "barangaysCovered": [
      "Cawit",
      "Tabi",
      "Duyay"
    ],
    "yearsExperience": 10,
    "rate": 500,
    "rateType": "per hour",
    "contactNumber": "09XX-XXX-1003",
    "email": "brightside.electrical@example.com",
    "availability": "Mon to Sat, 8AM to 4PM",
    "rating": 4.9,
    "reviewCount": 21,
    "specialties": [
      "Wiring checks",
      "Outlet repair",
      "Breaker issues"
    ],
    "languages": [
      "Tagalog",
      "English"
    ],
    "responseTime": "Replies within 24 hours on weekdays",
    "reviews": [
      {
        "name": "Pedro",
        "rating": 5,
        "comment": "Arrived as scheduled and explained the work clearly.",
        "date": "2026-10-25"
      },
      {
        "name": "Rosalie",
        "rating": 5,
        "comment": "Responded quickly and fixed the issue the same day.",
        "date": "2026-09-15"
      },
      {
        "name": "Antonio",
        "rating": 5,
        "comment": "Fair price and clear communication throughout the job.",
        "date": "2026-08-06"
      }
    ]
  },
  {
    "id": 4,
    "name": "Noel's Home Electrical Services",
    "category": "Electrical",
    "description": "Safe home wiring checks, breaker replacement, and small electrical jobs.",
    "barangaysCovered": [
      "Balaring",
      "Tanza",
      "Murallon"
    ],
    "yearsExperience": 6,
    "rate": 1500,
    "rateType": "per job",
    "contactNumber": "09XX-XXX-1004",
    "email": "noel.electrical@example.com",
    "availability": "Mon to Fri, 9AM to 5PM",
    "rating": 4.9,
    "reviewCount": 84,
    "specialties": [
      "Wiring checks",
      "Outlet repair",
      "Breaker issues"
    ],
    "languages": [
      "Tagalog",
      "English",
      "Marinduque\u00f1o"
    ],
    "responseTime": "Usually responds within a few hours",
    "reviews": [
      {
        "name": "Luz",
        "rating": 5,
        "comment": "Good quality work for the rate. Will book again next time.",
        "date": "2026-10-24"
      },
      {
        "name": "Dante",
        "rating": 5,
        "comment": "Honest assessment of what was needed\u2014no unnecessary extras.",
        "date": "2026-09-14"
      }
    ]
  },
  {
    "id": 5,
    "name": "Mila's Home Cleaning",
    "category": "Cleaning",
    "description": "Regular home cleaning, kitchen cleanup, and move-in cleaning.",
    "barangaysCovered": [
      "Mercado",
      "Isok I",
      "Cawit"
    ],
    "yearsExperience": 4,
    "rate": 350,
    "rateType": "per hour",
    "contactNumber": "09XX-XXX-1005",
    "email": "mila.cleaning@example.com",
    "availability": "Mon to Sat, 7AM to 3PM",
    "rating": 4.6,
    "reviewCount": 61,
    "specialties": [
      "Regular upkeep",
      "Deep cleaning",
      "Kitchen focus"
    ],
    "languages": [
      "Tagalog",
      "English",
      "Marinduque\u00f1o"
    ],
    "responseTime": "Usually responds within a day",
    "reviews": [
      {
        "name": "Ramon",
        "rating": 5,
        "comment": "Professional and respectful. The result looked neat.",
        "date": "2026-10-23"
      },
      {
        "name": "Nora",
        "rating": 4,
        "comment": "Reliable and finished on time. Would hire again.",
        "date": "2026-09-13"
      },
      {
        "name": "Miguel",
        "rating": 5,
        "comment": "Arrived as scheduled and explained the work clearly.",
        "date": "2026-08-04"
      }
    ]
  },
  {
    "id": 6,
    "name": "Fresh Nest Cleaning Services",
    "category": "Cleaning",
    "description": "Detailed room cleaning, dusting, floor care, and household tidying.",
    "barangaysCovered": [
      "Caganhao",
      "Malusak",
      "Tabi"
    ],
    "yearsExperience": 7,
    "rate": 1800,
    "rateType": "per job",
    "contactNumber": "09XX-XXX-1006",
    "email": "freshnest.cleaning@example.com",
    "availability": "Mon to Sat, 8AM to 5PM",
    "rating": 4.8,
    "reviewCount": 78,
    "specialties": [
      "Regular upkeep",
      "Deep cleaning",
      "Kitchen focus"
    ],
    "languages": [
      "Tagalog",
      "English"
    ],
    "responseTime": "Often available same-day for urgent jobs",
    "reviews": [
      {
        "name": "Teresa",
        "rating": 5,
        "comment": "Responded quickly and fixed the issue the same day.",
        "date": "2026-10-22"
      },
      {
        "name": "Ben",
        "rating": 5,
        "comment": "Fair price and clear communication throughout the job.",
        "date": "2026-09-12"
      }
    ]
  },
  {
    "id": 7,
    "name": "Jun's Carpentry and Woodworks",
    "category": "Carpentry",
    "description": "Door and cabinet repairs, shelves, and made-to-order woodwork.",
    "barangaysCovered": [
      "Duyay",
      "Balaring",
      "Mercado"
    ],
    "yearsExperience": 12,
    "rate": 600,
    "rateType": "per hour",
    "contactNumber": "09XX-XXX-1007",
    "email": "jun.woodworks@example.com",
    "availability": "Mon to Sat, 8AM to 5PM",
    "rating": 4.8,
    "reviewCount": 70,
    "specialties": [
      "Furniture repair",
      "Cabinets",
      "Shelving"
    ],
    "languages": [
      "Tagalog",
      "English",
      "Marinduque\u00f1o"
    ],
    "responseTime": "Replies within 24 hours on weekdays",
    "reviews": [
      {
        "name": "Gil",
        "rating": 5,
        "comment": "Honest assessment of what was needed\u2014no unnecessary extras.",
        "date": "2026-10-21"
      },
      {
        "name": "Elena",
        "rating": 5,
        "comment": "Did a careful job and cleaned up after. Recommended.",
        "date": "2026-09-11"
      },
      {
        "name": "Jose",
        "rating": 5,
        "comment": "Professional and respectful. The result looked neat.",
        "date": "2026-08-02"
      }
    ]
  },
  {
    "id": 8,
    "name": "Kiko Home Carpentry",
    "category": "Carpentry",
    "description": "Minor roof and window repairs, furniture assembly, and wood repairs.",
    "barangaysCovered": [
      "Tanza",
      "Cawit",
      "Isok I"
    ],
    "yearsExperience": 5,
    "rate": 2000,
    "rateType": "per job",
    "contactNumber": "09XX-XXX-1008",
    "email": "kiko.carpentry@example.com",
    "availability": "Tue to Sun, 8AM to 4PM",
    "rating": 4.8,
    "reviewCount": 83,
    "specialties": [
      "Furniture repair",
      "Cabinets",
      "Shelving"
    ],
    "languages": [
      "Tagalog",
      "English",
      "Marinduque\u00f1o"
    ],
    "responseTime": "Usually responds within a few hours",
    "reviews": [
      {
        "name": "Cecilia",
        "rating": 5,
        "comment": "Reliable and finished on time. Would hire again.",
        "date": "2026-10-20"
      },
      {
        "name": "Carlos",
        "rating": 5,
        "comment": "Arrived as scheduled and explained the work clearly.",
        "date": "2026-09-10"
      }
    ]
  },
  {
    "id": 9,
    "name": "CoolFix Appliance Repair",
    "category": "Appliance Repair",
    "description": "Basic diagnosis and repair for refrigerators, fans, and washing machines.",
    "barangaysCovered": [
      "Murallon",
      "Duyay",
      "Caganhao"
    ],
    "yearsExperience": 9,
    "rate": 550,
    "rateType": "per hour",
    "contactNumber": "09XX-XXX-1009",
    "email": "coolfix.appliances@example.com",
    "availability": "Mon to Sat, 9AM to 5PM",
    "rating": 4.4,
    "reviewCount": 8,
    "specialties": [
      "Small appliances",
      "Washer/dryer",
      "Aircon related"
    ],
    "languages": [
      "Tagalog",
      "English"
    ],
    "responseTime": "Usually responds within a day",
    "reviews": [
      {
        "name": "Mario",
        "rating": 5,
        "comment": "Fair price and clear communication throughout the job.",
        "date": "2026-10-19"
      },
      {
        "name": "Grace",
        "rating": 4,
        "comment": "Good quality work for the rate. Will book again next time.",
        "date": "2026-09-09"
      },
      {
        "name": "Pedro",
        "rating": 5,
        "comment": "Honest assessment of what was needed\u2014no unnecessary extras.",
        "date": "2026-07-31"
      }
    ]
  },
  {
    "id": 10,
    "name": "Tomas Appliance Care",
    "category": "Appliance Repair",
    "description": "Small appliance troubleshooting and home visits for common repairs.",
    "barangaysCovered": [
      "Malusak",
      "Tabi",
      "Balaring"
    ],
    "yearsExperience": 6,
    "rate": 1300,
    "rateType": "per job",
    "contactNumber": "09XX-XXX-1010",
    "email": "tomas.appliancecare@example.com",
    "availability": "Mon to Fri, 8AM to 5PM",
    "rating": 4.6,
    "reviewCount": 22,
    "specialties": [
      "Small appliances",
      "Washer/dryer",
      "Aircon related"
    ],
    "languages": [
      "Tagalog",
      "English",
      "Marinduque\u00f1o"
    ],
    "responseTime": "Often available same-day for urgent jobs",
    "reviews": [
      {
        "name": "Rosalie",
        "rating": 5,
        "comment": "Did a careful job and cleaned up after. Recommended.",
        "date": "2026-10-18"
      },
      {
        "name": "Antonio",
        "rating": 4,
        "comment": "Professional and respectful. The result looked neat.",
        "date": "2026-09-08"
      }
    ]
  },
  {
    "id": 11,
    "name": "Jessa Reyes Leak Repair",
    "category": "Plumbing",
    "description": "Kitchen sink, faucet, and shower repairs with quick home visits.",
    "barangaysCovered": [
      "Bantad",
      "Caganhao",
      "Duyay",
      "Isok I",
      "Isok II"
    ],
    "yearsExperience": 13,
    "rate": 2300,
    "rateType": "per job",
    "contactNumber": "09XX-XXX-1011",
    "email": "jessareyesleakrepair@example.com",
    "availability": "Weekdays, 1PM to 7PM",
    "rating": 4.3,
    "reviewCount": 98,
    "specialties": [
      "Pipe replacement",
      "Leak repair",
      "Faucet installation"
    ],
    "languages": [
      "Tagalog",
      "English",
      "Marinduque\u00f1o"
    ],
    "responseTime": "Replies within 24 hours on weekdays",
    "reviews": [
      {
        "name": "Dante",
        "rating": 5,
        "comment": "Arrived as scheduled and explained the work clearly.",
        "date": "2026-10-17"
      },
      {
        "name": "Sofia",
        "rating": 4,
        "comment": "Responded quickly and fixed the issue the same day.",
        "date": "2026-09-07"
      },
      {
        "name": "Ramon",
        "rating": 5,
        "comment": "Fair price and clear communication throughout the job.",
        "date": "2026-07-29"
      }
    ]
  },
  {
    "id": 12,
    "name": "Boac Drain Doctors",
    "category": "Plumbing",
    "description": "Septic line checks and general household plumbing.",
    "barangaysCovered": [
      "Balaring",
      "Cawit",
      "Lupac",
      "Tanza"
    ],
    "yearsExperience": 22,
    "rate": 2050,
    "rateType": "per job",
    "contactNumber": "09XX-XXX-1012",
    "email": "boacdraindoctors@example.com",
    "availability": "Mon to Sat, 8AM to 4PM",
    "rating": 4.7,
    "reviewCount": 42,
    "specialties": [
      "Pipe replacement",
      "Leak repair",
      "Faucet installation"
    ],
    "languages": [
      "Tagalog",
      "English"
    ],
    "responseTime": "Usually responds within a few hours",
    "reviews": [
      {
        "name": "Nora",
        "rating": 5,
        "comment": "Good quality work for the rate. Will book again next time.",
        "date": "2026-10-16"
      },
      {
        "name": "Miguel",
        "rating": 4,
        "comment": "Honest assessment of what was needed\u2014no unnecessary extras.",
        "date": "2026-09-06"
      }
    ]
  },
  {
    "id": 13,
    "name": "AquaFix Boac",
    "category": "Plumbing",
    "description": "Kitchen sink, faucet, and shower repairs with quick home visits.",
    "barangaysCovered": [
      "Balagasan",
      "Laylay",
      "Mahinhin",
      "Malusak",
      "Tampus"
    ],
    "yearsExperience": 18,
    "rate": 400,
    "rateType": "per hour",
    "contactNumber": "09XX-XXX-1013",
    "email": "aquafixboac@example.com",
    "availability": "Weekdays, 1PM to 7PM",
    "rating": 4.7,
    "reviewCount": 79,
    "specialties": [
      "Pipe replacement",
      "Leak repair",
      "Faucet installation"
    ],
    "languages": [
      "Tagalog",
      "English",
      "Marinduque\u00f1o"
    ],
    "responseTime": "Usually responds within a day",
    "reviews": [
      {
        "name": "Ben",
        "rating": 5,
        "comment": "Professional and respectful. The result looked neat.",
        "date": "2026-10-15"
      },
      {
        "name": "Maria",
        "rating": 4,
        "comment": "Reliable and finished on time. Would hire again.",
        "date": "2026-09-05"
      },
      {
        "name": "Gil",
        "rating": 5,
        "comment": "Arrived as scheduled and explained the work clearly.",
        "date": "2026-07-27"
      }
    ]
  },
  {
    "id": 14,
    "name": "Felix Bautista Leak Repair",
    "category": "Plumbing",
    "description": "Kitchen sink, faucet, and shower repairs with quick home visits.",
    "barangaysCovered": [
      "Agot",
      "Mahinhin",
      "Mainit",
      "Tabi",
      "Tumagabok"
    ],
    "yearsExperience": 20,
    "rate": 500,
    "rateType": "per hour",
    "contactNumber": "09XX-XXX-1014",
    "email": "felixbautistaleakrepai@example.com",
    "availability": "Mon to Fri, 9AM to 5PM",
    "rating": 4.7,
    "reviewCount": 107,
    "specialties": [
      "Pipe replacement",
      "Leak repair",
      "Faucet installation"
    ],
    "languages": [
      "Tagalog",
      "English",
      "Marinduque\u00f1o"
    ],
    "responseTime": "Often available same-day for urgent jobs",
    "reviews": [
      {
        "name": "Elena",
        "rating": 5,
        "comment": "Responded quickly and fixed the issue the same day.",
        "date": "2026-10-14"
      },
      {
        "name": "Jose",
        "rating": 4,
        "comment": "Fair price and clear communication throughout the job.",
        "date": "2026-09-04"
      }
    ]
  },
  {
    "id": 15,
    "name": "Dodong Tolentino Leak Repair",
    "category": "Plumbing",
    "description": "Clogged drains, toilet repairs, and bathroom fixture installation.",
    "barangaysCovered": [
      "Lupac",
      "Mercado",
      "Pili"
    ],
    "yearsExperience": 17,
    "rate": 600,
    "rateType": "per hour",
    "contactNumber": "09XX-XXX-1015",
    "email": "dodongtolentinoleakrep@example.com",
    "availability": "Mon to Sat, 8AM to 4PM",
    "rating": 4.9,
    "reviewCount": 72,
    "specialties": [
      "Pipe replacement",
      "Leak repair",
      "Faucet installation"
    ],
    "languages": [
      "Tagalog",
      "English"
    ],
    "responseTime": "Replies within 24 hours on weekdays",
    "reviews": [
      {
        "name": "Carlos",
        "rating": 5,
        "comment": "Honest assessment of what was needed\u2014no unnecessary extras.",
        "date": "2026-10-13"
      },
      {
        "name": "Ana",
        "rating": 5,
        "comment": "Did a careful job and cleaned up after. Recommended.",
        "date": "2026-09-03"
      },
      {
        "name": "Mario",
        "rating": 5,
        "comment": "Professional and respectful. The result looked neat.",
        "date": "2026-07-25"
      }
    ]
  },
  {
    "id": 16,
    "name": "Imelda Morales Leak Repair",
    "category": "Plumbing",
    "description": "Septic line checks and general household plumbing.",
    "barangaysCovered": [
      "Mahinhin",
      "Mainit",
      "Pili",
      "Tabi",
      "Tanza"
    ],
    "yearsExperience": 14,
    "rate": 500,
    "rateType": "per hour",
    "contactNumber": "09XX-XXX-1016",
    "email": "imeldamoralesleakrepai@example.com",
    "availability": "Mon to Sat, 7AM to 3PM",
    "rating": 4,
    "reviewCount": 109,
    "specialties": [
      "Pipe replacement",
      "Leak repair",
      "Faucet installation"
    ],
    "languages": [
      "Tagalog",
      "English",
      "Marinduque\u00f1o"
    ],
    "responseTime": "Usually responds within a few hours",
    "reviews": [
      {
        "name": "Grace",
        "rating": 4,
        "comment": "Reliable and finished on time. Would hire again.",
        "date": "2026-10-12"
      },
      {
        "name": "Pedro",
        "rating": 4,
        "comment": "Arrived as scheduled and explained the work clearly.",
        "date": "2026-09-02"
      }
    ]
  },
  {
    "id": 17,
    "name": "Imelda's Electrical Works",
    "category": "Electrical",
    "description": "Solar light and inverter basic installation.",
    "barangaysCovered": [
      "Mahinhin",
      "Mainit",
      "Tabi",
      "Tumagabok"
    ],
    "yearsExperience": 13,
    "rate": 2800,
    "rateType": "per job",
    "contactNumber": "09XX-XXX-1017",
    "email": "imeldaselectricalworks@example.com",
    "availability": "Mon to Fri, 9AM to 5PM",
    "rating": 4.1,
    "reviewCount": 65,
    "specialties": [
      "Wiring checks",
      "Outlet repair",
      "Breaker issues"
    ],
    "languages": [
      "Tagalog",
      "English",
      "Marinduque\u00f1o"
    ],
    "responseTime": "Usually responds within a day",
    "reviews": [
      {
        "name": "Antonio",
        "rating": 4,
        "comment": "Fair price and clear communication throughout the job.",
        "date": "2026-10-11"
      },
      {
        "name": "Luz",
        "rating": 4,
        "comment": "Good quality work for the rate. Will book again next time.",
        "date": "2026-09-01"
      },
      {
        "name": "Dante",
        "rating": 4,
        "comment": "Honest assessment of what was needed\u2014no unnecessary extras.",
        "date": "2026-07-23"
      }
    ]
  },
  {
    "id": 18,
    "name": "Salazar Electrical Solutions",
    "category": "Electrical",
    "description": "Solar light and inverter basic installation.",
    "barangaysCovered": [
      "Amoingon",
      "Cawit",
      "Duyay",
      "Tabigue",
      "Tumagabok"
    ],
    "yearsExperience": 16,
    "rate": 600,
    "rateType": "per hour",
    "contactNumber": "09XX-XXX-1018",
    "email": "salazarelectricalsolut@example.com",
    "availability": "Weekdays, 1PM to 7PM",
    "rating": 3.9,
    "reviewCount": 91,
    "specialties": [
      "Wiring checks",
      "Outlet repair",
      "Breaker issues"
    ],
    "languages": [
      "Tagalog",
      "English"
    ],
    "responseTime": "Often available same-day for urgent jobs",
    "reviews": [
      {
        "name": "Sofia",
        "rating": 4,
        "comment": "Did a careful job and cleaned up after. Recommended.",
        "date": "2026-10-10"
      },
      {
        "name": "Ramon",
        "rating": 4,
        "comment": "Professional and respectful. The result looked neat.",
        "date": "2026-08-31"
      }
    ]
  },
  {
    "id": 19,
    "name": "Liwanag Electrical Services",
    "category": "Electrical",
    "description": "Meter base and panel board repair for homes and small shops.",
    "barangaysCovered": [
      "Apitong",
      "Caganhao",
      "Mahinhin",
      "Mercado",
      "Tanza"
    ],
    "yearsExperience": 17,
    "rate": 500,
    "rateType": "per hour",
    "contactNumber": "09XX-XXX-1019",
    "email": "liwanagelectricalservi@example.com",
    "availability": "Tue to Sun, 9AM to 6PM",
    "rating": 3.9,
    "reviewCount": 98,
    "specialties": [
      "Wiring checks",
      "Outlet repair",
      "Breaker issues"
    ],
    "languages": [
      "Tagalog",
      "English",
      "Marinduque\u00f1o"
    ],
    "responseTime": "Replies within 24 hours on weekdays",
    "reviews": [
      {
        "name": "Miguel",
        "rating": 4,
        "comment": "Arrived as scheduled and explained the work clearly.",
        "date": "2026-10-09"
      },
      {
        "name": "Teresa",
        "rating": 4,
        "comment": "Responded quickly and fixed the issue the same day.",
        "date": "2026-08-30"
      },
      {
        "name": "Ben",
        "rating": 4,
        "comment": "Fair price and clear communication throughout the job.",
        "date": "2026-07-21"
      }
    ]
  },
  {
    "id": 20,
    "name": "Garcia Wiring and Repair",
    "category": "Electrical",
    "description": "House rewiring, circuit breaker upgrades, and outlet installation.",
    "barangaysCovered": [
      "Lupac",
      "Malusak",
      "Mansiwat"
    ],
    "yearsExperience": 4,
    "rate": 1050,
    "rateType": "per job",
    "contactNumber": "09XX-XXX-1020",
    "email": "garciawiringandrepair@example.com",
    "availability": "Mon to Sun, 8AM to 6PM",
    "rating": 4.8,
    "reviewCount": 34,
    "specialties": [
      "Wiring checks",
      "Outlet repair",
      "Breaker issues"
    ],
    "languages": [
      "Tagalog",
      "English",
      "Marinduque\u00f1o"
    ],
    "responseTime": "Usually responds within a few hours",
    "reviews": [
      {
        "name": "Maria",
        "rating": 5,
        "comment": "Good quality work for the rate. Will book again next time.",
        "date": "2026-10-28"
      },
      {
        "name": "Gil",
        "rating": 5,
        "comment": "Honest assessment of what was needed\u2014no unnecessary extras.",
        "date": "2026-09-18"
      }
    ]
  },
  {
    "id": 21,
    "name": "Dodong's Electrical Works",
    "category": "Electrical",
    "description": "Safe electrical inspections and short-circuit troubleshooting.",
    "barangaysCovered": [
      "Agot",
      "Duyay",
      "Murallon"
    ],
    "yearsExperience": 20,
    "rate": 550,
    "rateType": "per hour",
    "contactNumber": "09XX-XXX-1021",
    "email": "dodongselectricalworks@example.com",
    "availability": "Mon to Sun, 8AM to 6PM",
    "rating": 4.7,
    "reviewCount": 113,
    "specialties": [
      "Wiring checks",
      "Outlet repair",
      "Breaker issues"
    ],
    "languages": [
      "Tagalog",
      "English"
    ],
    "responseTime": "Usually responds within a day",
    "reviews": [
      {
        "name": "Jose",
        "rating": 5,
        "comment": "Professional and respectful. The result looked neat.",
        "date": "2026-10-27"
      },
      {
        "name": "Cecilia",
        "rating": 4,
        "comment": "Reliable and finished on time. Would hire again.",
        "date": "2026-09-17"
      },
      {
        "name": "Carlos",
        "rating": 5,
        "comment": "Arrived as scheduled and explained the work clearly.",
        "date": "2026-08-08"
      }
    ]
  },
  {
    "id": 22,
    "name": "Perla Sanchez Electrician",
    "category": "Electrical",
    "description": "Lighting installation, ceiling fan hookups, and fault tracing.",
    "barangaysCovered": [
      "Apitong",
      "Cawit",
      "Mainit",
      "Pili",
      "Tanza"
    ],
    "yearsExperience": 15,
    "rate": 2200,
    "rateType": "per job",
    "contactNumber": "09XX-XXX-1022",
    "email": "perlasanchezelectricia@example.com",
    "availability": "Mon to Sat, 8AM to 4PM",
    "rating": 4,
    "reviewCount": 20,
    "specialties": [
      "Wiring checks",
      "Outlet repair",
      "Breaker issues"
    ],
    "languages": [
      "Tagalog",
      "English",
      "Marinduque\u00f1o"
    ],
    "responseTime": "Often available same-day for urgent jobs",
    "reviews": [
      {
        "name": "Ana",
        "rating": 4,
        "comment": "Responded quickly and fixed the issue the same day.",
        "date": "2026-10-26"
      },
      {
        "name": "Mario",
        "rating": 4,
        "comment": "Fair price and clear communication throughout the job.",
        "date": "2026-09-16"
      }
    ]
  },
  {
    "id": 23,
    "name": "Linis Bahay Boac",
    "category": "Cleaning",
    "description": "Post-renovation cleanup and window washing.",
    "barangaysCovered": [
      "Agot",
      "Balagasan",
      "Bantad",
      "Isok II",
      "Tabi"
    ],
    "yearsExperience": 14,
    "rate": 350,
    "rateType": "per hour",
    "contactNumber": "09XX-XXX-1023",
    "email": "linisbahayboac@example.com",
    "availability": "Mon to Sat, 8AM to 5PM",
    "rating": 3.9,
    "reviewCount": 47,
    "specialties": [
      "Regular upkeep",
      "Deep cleaning",
      "Kitchen focus"
    ],
    "languages": [
      "Tagalog",
      "English",
      "Marinduque\u00f1o"
    ],
    "responseTime": "Replies within 24 hours on weekdays",
    "reviews": [
      {
        "name": "Pedro",
        "rating": 4,
        "comment": "Honest assessment of what was needed\u2014no unnecessary extras.",
        "date": "2026-10-25"
      },
      {
        "name": "Rosalie",
        "rating": 4,
        "comment": "Did a careful job and cleaned up after. Recommended.",
        "date": "2026-09-15"
      },
      {
        "name": "Antonio",
        "rating": 4,
        "comment": "Professional and respectful. The result looked neat.",
        "date": "2026-08-06"
      }
    ]
  },
  {
    "id": 24,
    "name": "Soriano Housekeeping",
    "category": "Cleaning",
    "description": "Sofa, mattress, and carpet cleaning.",
    "barangaysCovered": [
      "Cawit",
      "Duyay",
      "Lupac",
      "Murallon"
    ],
    "yearsExperience": 12,
    "rate": 250,
    "rateType": "per hour",
    "contactNumber": "09XX-XXX-1024",
    "email": "sorianohousekeeping@example.com",
    "availability": "Mon to Sat, 8AM to 5PM",
    "rating": 4.4,
    "reviewCount": 62,
    "specialties": [
      "Regular upkeep",
      "Deep cleaning",
      "Kitchen focus"
    ],
    "languages": [
      "Tagalog",
      "English"
    ],
    "responseTime": "Usually responds within a few hours",
    "reviews": [
      {
        "name": "Luz",
        "rating": 5,
        "comment": "Reliable and finished on time. Would hire again.",
        "date": "2026-10-24"
      },
      {
        "name": "Dante",
        "rating": 4,
        "comment": "Arrived as scheduled and explained the work clearly.",
        "date": "2026-09-14"
      }
    ]
  },
  {
    "id": 25,
    "name": "Tolentino Housekeeping",
    "category": "Cleaning",
    "description": "Post-renovation cleanup and window washing.",
    "barangaysCovered": [
      "Bayuti",
      "Duyay",
      "Lupac",
      "Maybo"
    ],
    "yearsExperience": 4,
    "rate": 3350,
    "rateType": "per job",
    "contactNumber": "09XX-XXX-1025",
    "email": "tolentinohousekeeping@example.com",
    "availability": "Mon to Sun, 8AM to 6PM",
    "rating": 4.3,
    "reviewCount": 28,
    "specialties": [
      "Regular upkeep",
      "Deep cleaning",
      "Kitchen focus"
    ],
    "languages": [
      "Tagalog",
      "English",
      "Marinduque\u00f1o"
    ],
    "responseTime": "Usually responds within a day",
    "reviews": [
      {
        "name": "Ramon",
        "rating": 5,
        "comment": "Fair price and clear communication throughout the job.",
        "date": "2026-10-23"
      },
      {
        "name": "Nora",
        "rating": 4,
        "comment": "Good quality work for the rate. Will book again next time.",
        "date": "2026-09-13"
      },
      {
        "name": "Miguel",
        "rating": 5,
        "comment": "Honest assessment of what was needed\u2014no unnecessary extras.",
        "date": "2026-08-04"
      }
    ]
  },
  {
    "id": 26,
    "name": "Vilma's Cleaning Crew",
    "category": "Cleaning",
    "description": "Move-in and move-out cleaning with eco-friendly products.",
    "barangaysCovered": [
      "Bantad",
      "Mahinhin",
      "Murallon",
      "Pili",
      "Tanza"
    ],
    "yearsExperience": 2,
    "rate": 250,
    "rateType": "per hour",
    "contactNumber": "09XX-XXX-1026",
    "email": "vilmascleaningcrew@example.com",
    "availability": "Mon to Fri, 9AM to 5PM",
    "rating": 4.6,
    "reviewCount": 30,
    "specialties": [
      "Regular upkeep",
      "Deep cleaning",
      "Kitchen focus"
    ],
    "languages": [
      "Tagalog",
      "English",
      "Marinduque\u00f1o"
    ],
    "responseTime": "Often available same-day for urgent jobs",
    "reviews": [
      {
        "name": "Teresa",
        "rating": 5,
        "comment": "Did a careful job and cleaned up after. Recommended.",
        "date": "2026-10-22"
      },
      {
        "name": "Ben",
        "rating": 4,
        "comment": "Professional and respectful. The result looked neat.",
        "date": "2026-09-12"
      }
    ]
  },
  {
    "id": 27,
    "name": "Salazar Home Care",
    "category": "Cleaning",
    "description": "Move-in and move-out cleaning with eco-friendly products.",
    "barangaysCovered": [
      "Apitong",
      "Laylay",
      "Malusak",
      "Tampus"
    ],
    "yearsExperience": 14,
    "rate": 1950,
    "rateType": "per job",
    "contactNumber": "09XX-XXX-1027",
    "email": "salazarhomecare@example.com",
    "availability": "Tue to Sun, 9AM to 6PM",
    "rating": 4,
    "reviewCount": 25,
    "specialties": [
      "Regular upkeep",
      "Deep cleaning",
      "Kitchen focus"
    ],
    "languages": [
      "Tagalog",
      "English"
    ],
    "responseTime": "Replies within 24 hours on weekdays",
    "reviews": [
      {
        "name": "Gil",
        "rating": 4,
        "comment": "Arrived as scheduled and explained the work clearly.",
        "date": "2026-10-21"
      },
      {
        "name": "Elena",
        "rating": 4,
        "comment": "Responded quickly and fixed the issue the same day.",
        "date": "2026-09-11"
      },
      {
        "name": "Jose",
        "rating": 4,
        "comment": "Fair price and clear communication throughout the job.",
        "date": "2026-08-02"
      }
    ]
  },
  {
    "id": 28,
    "name": "Sparkle Nest Services",
    "category": "Cleaning",
    "description": "Weekly home tidying and laundry folding service.",
    "barangaysCovered": [
      "Balimbing",
      "Duyay",
      "Mahinhin",
      "Mainit"
    ],
    "yearsExperience": 16,
    "rate": 350,
    "rateType": "per hour",
    "contactNumber": "09XX-XXX-1028",
    "email": "sparklenestservices@example.com",
    "availability": "Mon to Sat, 8AM to 5PM",
    "rating": 4.4,
    "reviewCount": 70,
    "specialties": [
      "Regular upkeep",
      "Deep cleaning",
      "Kitchen focus"
    ],
    "languages": [
      "Tagalog",
      "English",
      "Marinduque\u00f1o"
    ],
    "responseTime": "Usually responds within a few hours",
    "reviews": [
      {
        "name": "Cecilia",
        "rating": 5,
        "comment": "Good quality work for the rate. Will book again next time.",
        "date": "2026-10-20"
      },
      {
        "name": "Carlos",
        "rating": 4,
        "comment": "Honest assessment of what was needed\u2014no unnecessary extras.",
        "date": "2026-09-10"
      }
    ]
  },
  {
    "id": 29,
    "name": "Madrigal Roofing and Wood",
    "category": "Carpentry",
    "description": "Roof frame repair, window trim, and wooden floor fixes.",
    "barangaysCovered": [
      "Apitong",
      "Lupac",
      "Tanza"
    ],
    "yearsExperience": 22,
    "rate": 2400,
    "rateType": "per job",
    "contactNumber": "09XX-XXX-1029",
    "email": "madrigalroofingandwood@example.com",
    "availability": "Tue to Sun, 9AM to 6PM",
    "rating": 4.3,
    "reviewCount": 103,
    "specialties": [
      "Furniture repair",
      "Cabinets",
      "Shelving"
    ],
    "languages": [
      "Tagalog",
      "English",
      "Marinduque\u00f1o"
    ],
    "responseTime": "Usually responds within a day",
    "reviews": [
      {
        "name": "Mario",
        "rating": 5,
        "comment": "Professional and respectful. The result looked neat.",
        "date": "2026-10-19"
      },
      {
        "name": "Grace",
        "rating": 4,
        "comment": "Reliable and finished on time. Would hire again.",
        "date": "2026-09-09"
      },
      {
        "name": "Pedro",
        "rating": 5,
        "comment": "Arrived as scheduled and explained the work clearly.",
        "date": "2026-07-31"
      }
    ]
  },
  {
    "id": 30,
    "name": "Danilo's Carpentry",
    "category": "Carpentry",
    "description": "Furniture repair, refinishing, and assembly.",
    "barangaysCovered": [
      "Bantad",
      "Malusak",
      "Mansiwat",
      "Murallon",
      "Tabi"
    ],
    "yearsExperience": 5,
    "rate": 2150,
    "rateType": "per job",
    "contactNumber": "09XX-XXX-1030",
    "email": "daniloscarpentry@example.com",
    "availability": "Mon to Sun, 8AM to 6PM",
    "rating": 4.7,
    "reviewCount": 74,
    "specialties": [
      "Furniture repair",
      "Cabinets",
      "Shelving"
    ],
    "languages": [
      "Tagalog",
      "English"
    ],
    "responseTime": "Often available same-day for urgent jobs",
    "reviews": [
      {
        "name": "Rosalie",
        "rating": 5,
        "comment": "Responded quickly and fixed the issue the same day.",
        "date": "2026-10-18"
      },
      {
        "name": "Antonio",
        "rating": 4,
        "comment": "Fair price and clear communication throughout the job.",
        "date": "2026-09-08"
      }
    ]
  },
  {
    "id": 31,
    "name": "Boac Cabinet Makers",
    "category": "Carpentry",
    "description": "Door and window installation with clean finishing.",
    "barangaysCovered": [
      "Balagasan",
      "Balaring",
      "Malusak",
      "Murallon"
    ],
    "yearsExperience": 10,
    "rate": 2700,
    "rateType": "per job",
    "contactNumber": "09XX-XXX-1031",
    "email": "boaccabinetmakers@example.com",
    "availability": "Mon to Sat, 8AM to 5PM",
    "rating": 4.9,
    "reviewCount": 24,
    "specialties": [
      "Furniture repair",
      "Cabinets",
      "Shelving"
    ],
    "languages": [
      "Tagalog",
      "English",
      "Marinduque\u00f1o"
    ],
    "responseTime": "Replies within 24 hours on weekdays",
    "reviews": [
      {
        "name": "Dante",
        "rating": 5,
        "comment": "Honest assessment of what was needed\u2014no unnecessary extras.",
        "date": "2026-10-17"
      },
      {
        "name": "Sofia",
        "rating": 5,
        "comment": "Did a careful job and cleaned up after. Recommended.",
        "date": "2026-09-07"
      },
      {
        "name": "Ramon",
        "rating": 5,
        "comment": "Professional and respectful. The result looked neat.",
        "date": "2026-07-29"
      }
    ]
  },
  {
    "id": 32,
    "name": "Lim Roofing and Wood",
    "category": "Carpentry",
    "description": "Custom cabinets, shelves, and wooden doors made to order.",
    "barangaysCovered": [
      "Apitong",
      "Caganhao",
      "Duyay",
      "Mansiwat",
      "Tabigue"
    ],
    "yearsExperience": 11,
    "rate": 2250,
    "rateType": "per job",
    "contactNumber": "09XX-XXX-1032",
    "email": "limroofingandwood@example.com",
    "availability": "Tue to Sun, 9AM to 6PM",
    "rating": 4,
    "reviewCount": 35,
    "specialties": [
      "Furniture repair",
      "Cabinets",
      "Shelving"
    ],
    "languages": [
      "Tagalog",
      "English",
      "Marinduque\u00f1o"
    ],
    "responseTime": "Usually responds within a few hours",
    "reviews": [
      {
        "name": "Nora",
        "rating": 4,
        "comment": "Reliable and finished on time. Would hire again.",
        "date": "2026-10-16"
      },
      {
        "name": "Miguel",
        "rating": 4,
        "comment": "Arrived as scheduled and explained the work clearly.",
        "date": "2026-09-06"
      }
    ]
  },
  {
    "id": 33,
    "name": "Sturdy Frame Carpentry",
    "category": "Carpentry",
    "description": "Fence building, small sheds, and outdoor wood structures.",
    "barangaysCovered": [
      "Amoingon",
      "Balagasan",
      "Bayuti"
    ],
    "yearsExperience": 2,
    "rate": 600,
    "rateType": "per hour",
    "contactNumber": "09XX-XXX-1033",
    "email": "sturdyframecarpentry@example.com",
    "availability": "Tue to Sun, 9AM to 6PM",
    "rating": 3.9,
    "reviewCount": 90,
    "specialties": [
      "Furniture repair",
      "Cabinets",
      "Shelving"
    ],
    "languages": [
      "Tagalog",
      "English"
    ],
    "responseTime": "Usually responds within a day",
    "reviews": [
      {
        "name": "Ben",
        "rating": 4,
        "comment": "Fair price and clear communication throughout the job.",
        "date": "2026-10-15"
      },
      {
        "name": "Maria",
        "rating": 4,
        "comment": "Good quality work for the rate. Will book again next time.",
        "date": "2026-09-05"
      },
      {
        "name": "Gil",
        "rating": 4,
        "comment": "Honest assessment of what was needed\u2014no unnecessary extras.",
        "date": "2026-07-27"
      }
    ]
  },
  {
    "id": 34,
    "name": "Cruz Roofing and Wood",
    "category": "Carpentry",
    "description": "Door and window installation with clean finishing.",
    "barangaysCovered": [
      "Amoingon",
      "Maybo",
      "Mercado",
      "Pili",
      "Tumagabok"
    ],
    "yearsExperience": 14,
    "rate": 3350,
    "rateType": "per job",
    "contactNumber": "09XX-XXX-1034",
    "email": "cruzroofingandwood@example.com",
    "availability": "Tue to Sun, 9AM to 6PM",
    "rating": 4.5,
    "reviewCount": 79,
    "specialties": [
      "Furniture repair",
      "Cabinets",
      "Shelving"
    ],
    "languages": [
      "Tagalog",
      "English",
      "Marinduque\u00f1o"
    ],
    "responseTime": "Often available same-day for urgent jobs",
    "reviews": [
      {
        "name": "Elena",
        "rating": 5,
        "comment": "Did a careful job and cleaned up after. Recommended.",
        "date": "2026-10-14"
      },
      {
        "name": "Jose",
        "rating": 4,
        "comment": "Professional and respectful. The result looked neat.",
        "date": "2026-09-04"
      }
    ]
  },
  {
    "id": 35,
    "name": "Boac Fix-It Appliances",
    "category": "Appliance Repair",
    "description": "Water dispenser and small kitchen appliance repair.",
    "barangaysCovered": [
      "Caganhao",
      "Cawit",
      "Isok II",
      "Tabigue",
      "Tumagabok"
    ],
    "yearsExperience": 13,
    "rate": 600,
    "rateType": "per hour",
    "contactNumber": "09XX-XXX-1035",
    "email": "boacfixitappliances@example.com",
    "availability": "Mon to Sat, 8AM to 5PM",
    "rating": 4.7,
    "reviewCount": 58,
    "specialties": [
      "Small appliances",
      "Washer/dryer",
      "Aircon related"
    ],
    "languages": [
      "Tagalog",
      "English",
      "Marinduque\u00f1o"
    ],
    "responseTime": "Replies within 24 hours on weekdays",
    "reviews": [
      {
        "name": "Carlos",
        "rating": 5,
        "comment": "Arrived as scheduled and explained the work clearly.",
        "date": "2026-10-13"
      },
      {
        "name": "Ana",
        "rating": 4,
        "comment": "Responded quickly and fixed the issue the same day.",
        "date": "2026-09-03"
      },
      {
        "name": "Mario",
        "rating": 5,
        "comment": "Fair price and clear communication throughout the job.",
        "date": "2026-07-25"
      }
    ]
  },
  {
    "id": 36,
    "name": "Ayos Gamit Appliance",
    "category": "Appliance Repair",
    "description": "Refrigerator cooling issues, washing machine drain and spin faults.",
    "barangaysCovered": [
      "Duyay",
      "Laylay",
      "Mansiwat",
      "San Miguel"
    ],
    "yearsExperience": 2,
    "rate": 550,
    "rateType": "per hour",
    "contactNumber": "09XX-XXX-1036",
    "email": "ayosgamitappliance@example.com",
    "availability": "Mon to Sun, 8AM to 6PM",
    "rating": 4.9,
    "reviewCount": 28,
    "specialties": [
      "Small appliances",
      "Washer/dryer",
      "Aircon related"
    ],
    "languages": [
      "Tagalog",
      "English"
    ],
    "responseTime": "Usually responds within a few hours",
    "reviews": [
      {
        "name": "Grace",
        "rating": 5,
        "comment": "Good quality work for the rate. Will book again next time.",
        "date": "2026-10-12"
      },
      {
        "name": "Pedro",
        "rating": 5,
        "comment": "Honest assessment of what was needed\u2014no unnecessary extras.",
        "date": "2026-09-02"
      }
    ]
  },
  {
    "id": 37,
    "name": "Dodong Mendoza Repair Shop",
    "category": "Appliance Repair",
    "description": "Electric fan, rice cooker, and microwave repairs.",
    "barangaysCovered": [
      "Agot",
      "Cawit",
      "Isok I",
      "Maybo",
      "Mercado"
    ],
    "yearsExperience": 15,
    "rate": 1000,
    "rateType": "per job",
    "contactNumber": "09XX-XXX-1037",
    "email": "dodongmendozarepairsho@example.com",
    "availability": "Mon to Sun, 8AM to 6PM",
    "rating": 4,
    "reviewCount": 56,
    "specialties": [
      "Small appliances",
      "Washer/dryer",
      "Aircon related"
    ],
    "languages": [
      "Tagalog",
      "English",
      "Marinduque\u00f1o"
    ],
    "responseTime": "Usually responds within a day",
    "reviews": [
      {
        "name": "Antonio",
        "rating": 4,
        "comment": "Professional and respectful. The result looked neat.",
        "date": "2026-10-11"
      },
      {
        "name": "Luz",
        "rating": 4,
        "comment": "Reliable and finished on time. Would hire again.",
        "date": "2026-09-01"
      },
      {
        "name": "Dante",
        "rating": 4,
        "comment": "Arrived as scheduled and explained the work clearly.",
        "date": "2026-07-23"
      }
    ]
  },
  {
    "id": 38,
    "name": "Ramos Electronics and Repair",
    "category": "Appliance Repair",
    "description": "Electric fan, rice cooker, and microwave repairs.",
    "barangaysCovered": [
      "Agot",
      "Malusak",
      "Murallon"
    ],
    "yearsExperience": 19,
    "rate": 500,
    "rateType": "per hour",
    "contactNumber": "09XX-XXX-1038",
    "email": "ramoselectronicsandrep@example.com",
    "availability": "Mon to Sat, 8AM to 4PM",
    "rating": 4.5,
    "reviewCount": 116,
    "specialties": [
      "Small appliances",
      "Washer/dryer",
      "Aircon related"
    ],
    "languages": [
      "Tagalog",
      "English",
      "Marinduque\u00f1o"
    ],
    "responseTime": "Often available same-day for urgent jobs",
    "reviews": [
      {
        "name": "Sofia",
        "rating": 5,
        "comment": "Responded quickly and fixed the issue the same day.",
        "date": "2026-10-10"
      },
      {
        "name": "Ramon",
        "rating": 4,
        "comment": "Fair price and clear communication throughout the job.",
        "date": "2026-08-31"
      }
    ]
  },
  {
    "id": 39,
    "name": "Sanchez Electronics and Repair",
    "category": "Appliance Repair",
    "description": "Water dispenser and small kitchen appliance repair.",
    "barangaysCovered": [
      "Balaring",
      "Caganhao",
      "Duyay",
      "Laylay"
    ],
    "yearsExperience": 22,
    "rate": 1450,
    "rateType": "per job",
    "contactNumber": "09XX-XXX-1039",
    "email": "sanchezelectronicsandr@example.com",
    "availability": "Mon to Sun, 8AM to 6PM",
    "rating": 3.9,
    "reviewCount": 25,
    "specialties": [
      "Small appliances",
      "Washer/dryer",
      "Aircon related"
    ],
    "languages": [
      "Tagalog",
      "English"
    ],
    "responseTime": "Replies within 24 hours on weekdays",
    "reviews": [
      {
        "name": "Miguel",
        "rating": 4,
        "comment": "Honest assessment of what was needed\u2014no unnecessary extras.",
        "date": "2026-10-09"
      },
      {
        "name": "Teresa",
        "rating": 4,
        "comment": "Did a careful job and cleaned up after. Recommended.",
        "date": "2026-08-30"
      },
      {
        "name": "Ben",
        "rating": 4,
        "comment": "Professional and respectful. The result looked neat.",
        "date": "2026-07-21"
      }
    ]
  },
  {
    "id": 40,
    "name": "Salazar Home Appliance Doctor",
    "category": "Appliance Repair",
    "description": "Water dispenser and small kitchen appliance repair.",
    "barangaysCovered": [
      "Agot",
      "Amoingon",
      "Duyay",
      "Murallon",
      "Tabigue"
    ],
    "yearsExperience": 22,
    "rate": 2200,
    "rateType": "per job",
    "contactNumber": "09XX-XXX-1040",
    "email": "salazarhomeappliancedo@example.com",
    "availability": "Mon to Fri, 9AM to 5PM",
    "rating": 4.4,
    "reviewCount": 31,
    "specialties": [
      "Small appliances",
      "Washer/dryer",
      "Aircon related"
    ],
    "languages": [
      "Tagalog",
      "English",
      "Marinduque\u00f1o"
    ],
    "responseTime": "Usually responds within a few hours",
    "reviews": [
      {
        "name": "Maria",
        "rating": 5,
        "comment": "Reliable and finished on time. Would hire again.",
        "date": "2026-10-28"
      },
      {
        "name": "Gil",
        "rating": 4,
        "comment": "Arrived as scheduled and explained the work clearly.",
        "date": "2026-09-18"
      }
    ]
  },
  {
    "id": 41,
    "name": "Boac Color Works",
    "category": "Painting",
    "description": "Interior and exterior house painting, touch-ups, and wall preparation.",
    "barangaysCovered": [
      "Tanza",
      "Mercado",
      "Isok I",
      "Malusak"
    ],
    "yearsExperience": 9,
    "rate": 350,
    "rateType": "per hour",
    "contactNumber": "09XX-XXX-1041",
    "email": "boaccolorworks@example.com",
    "availability": "Mon to Sat, 7AM to 4PM",
    "rating": 4.6,
    "reviewCount": 48,
    "specialties": [
      "Waterproof coating",
      "Interior walls",
      "Touch-ups"
    ],
    "languages": [
      "Tagalog",
      "English",
      "Marinduque\u00f1o"
    ],
    "responseTime": "Usually responds within a day",
    "reviews": [
      {
        "name": "Jose",
        "rating": 5,
        "comment": "Fair price and clear communication throughout the job.",
        "date": "2026-10-27"
      },
      {
        "name": "Cecilia",
        "rating": 4,
        "comment": "Good quality work for the rate. Will book again next time.",
        "date": "2026-09-17"
      },
      {
        "name": "Carlos",
        "rating": 5,
        "comment": "Honest assessment of what was needed\u2014no unnecessary extras.",
        "date": "2026-08-08"
      }
    ]
  },
  {
    "id": 42,
    "name": "Marinduque Paint Pros",
    "category": "Painting",
    "description": "Room painting, fence refinishing, and waterproof coatings for homes.",
    "barangaysCovered": [
      "Cawit",
      "Tabi",
      "Duyay",
      "Balaring"
    ],
    "yearsExperience": 6,
    "rate": 1800,
    "rateType": "per job",
    "contactNumber": "09XX-XXX-1042",
    "email": "marinduquepaintpros@example.com",
    "availability": "Tue to Sun, 8AM to 5PM",
    "rating": 4.3,
    "reviewCount": 29,
    "specialties": [
      "Waterproof coating",
      "Interior walls",
      "Touch-ups"
    ],
    "languages": [
      "Tagalog",
      "English"
    ],
    "responseTime": "Often available same-day for urgent jobs",
    "reviews": [
      {
        "name": "Ana",
        "rating": 5,
        "comment": "Did a careful job and cleaned up after. Recommended.",
        "date": "2026-10-26"
      },
      {
        "name": "Mario",
        "rating": 4,
        "comment": "Professional and respectful. The result looked neat.",
        "date": "2026-09-16"
      }
    ]
  },
  {
    "id": 43,
    "name": "Fresh Coat Boac",
    "category": "Painting",
    "description": "Ceiling and wall painting, staining, and minor surface repairs.",
    "barangaysCovered": [
      "Murallon",
      "Isok I",
      "Caganhao",
      "Tanza"
    ],
    "yearsExperience": 11,
    "rate": 400,
    "rateType": "per hour",
    "contactNumber": "09XX-XXX-1043",
    "email": "freshcoatboac@example.com",
    "availability": "Mon to Fri, 8AM to 5PM",
    "rating": 4.8,
    "reviewCount": 61,
    "specialties": [
      "Waterproof coating",
      "Interior walls",
      "Touch-ups"
    ],
    "languages": [
      "Tagalog",
      "English",
      "Marinduque\u00f1o"
    ],
    "responseTime": "Replies within 24 hours on weekdays",
    "reviews": [
      {
        "name": "Pedro",
        "rating": 5,
        "comment": "Arrived as scheduled and explained the work clearly.",
        "date": "2026-10-25"
      },
      {
        "name": "Rosalie",
        "rating": 5,
        "comment": "Responded quickly and fixed the issue the same day.",
        "date": "2026-09-15"
      },
      {
        "name": "Antonio",
        "rating": 5,
        "comment": "Fair price and clear communication throughout the job.",
        "date": "2026-08-06"
      }
    ]
  },
  {
    "id": 44,
    "name": "Island Brush Services",
    "category": "Painting",
    "description": "Whole-house paint jobs and exterior weatherproofing for coastal homes.",
    "barangaysCovered": [
      "Malusak",
      "Amoingon",
      "Agot",
      "Tabigue"
    ],
    "yearsExperience": 7,
    "rate": 2500,
    "rateType": "per job",
    "contactNumber": "09XX-XXX-1044",
    "email": "islandbrushservices@example.com",
    "availability": "Mon to Sat, 7AM to 3PM",
    "rating": 4.2,
    "reviewCount": 37,
    "specialties": [
      "Waterproof coating",
      "Interior walls",
      "Touch-ups"
    ],
    "languages": [
      "Tagalog",
      "English",
      "Marinduque\u00f1o"
    ],
    "responseTime": "Usually responds within a few hours",
    "reviews": [
      {
        "name": "Luz",
        "rating": 4,
        "comment": "Good quality work for the rate. Will book again next time.",
        "date": "2026-10-24"
      },
      {
        "name": "Dante",
        "rating": 4,
        "comment": "Honest assessment of what was needed\u2014no unnecessary extras.",
        "date": "2026-09-14"
      }
    ]
  },
  {
    "id": 45,
    "name": "Cool Breeze AC Services",
    "category": "Air Conditioning",
    "description": "Window and split-type AC cleaning, gas refill, and basic repairs.",
    "barangaysCovered": [
      "Tanza",
      "Mercado",
      "Isok I",
      "Cawit"
    ],
    "yearsExperience": 10,
    "rate": 800,
    "rateType": "per job",
    "contactNumber": "09XX-XXX-1045",
    "email": "coolbreezeac@example.com",
    "availability": "Mon to Sat, 8AM to 6PM",
    "rating": 4.7,
    "reviewCount": 88,
    "specialties": [
      "Preventive maintenance",
      "Cleaning",
      "Installation"
    ],
    "languages": [
      "Tagalog",
      "English"
    ],
    "responseTime": "Usually responds within a day",
    "reviews": [
      {
        "name": "Ramon",
        "rating": 5,
        "comment": "Professional and respectful. The result looked neat.",
        "date": "2026-10-23"
      },
      {
        "name": "Nora",
        "rating": 4,
        "comment": "Reliable and finished on time. Would hire again.",
        "date": "2026-09-13"
      },
      {
        "name": "Miguel",
        "rating": 5,
        "comment": "Arrived as scheduled and explained the work clearly.",
        "date": "2026-08-04"
      }
    ]
  },
  {
    "id": 46,
    "name": "Marinduque Climate Care",
    "category": "Air Conditioning",
    "description": "AC installation, general cleaning, and thermostat troubleshooting.",
    "barangaysCovered": [
      "Tabi",
      "Duyay",
      "Balaring",
      "Murallon"
    ],
    "yearsExperience": 8,
    "rate": 500,
    "rateType": "per hour",
    "contactNumber": "09XX-XXX-1046",
    "email": "marinduqueclimate@example.com",
    "availability": "Mon to Fri, 9AM to 5PM",
    "rating": 4.5,
    "reviewCount": 54,
    "specialties": [
      "Preventive maintenance",
      "Cleaning",
      "Installation"
    ],
    "languages": [
      "Tagalog",
      "English",
      "Marinduque\u00f1o"
    ],
    "responseTime": "Often available same-day for urgent jobs",
    "reviews": [
      {
        "name": "Teresa",
        "rating": 5,
        "comment": "Responded quickly and fixed the issue the same day.",
        "date": "2026-10-22"
      },
      {
        "name": "Ben",
        "rating": 4,
        "comment": "Fair price and clear communication throughout the job.",
        "date": "2026-09-12"
      }
    ]
  },
  {
    "id": 47,
    "name": "Boac Aircon Experts",
    "category": "Air Conditioning",
    "description": "Preventive maintenance, filter replacement, and cooling efficiency checks.",
    "barangaysCovered": [
      "Malusak",
      "Caganhao",
      "Tanza",
      "Isok I"
    ],
    "yearsExperience": 12,
    "rate": 1200,
    "rateType": "per job",
    "contactNumber": "09XX-XXX-1047",
    "email": "boacairconexperts@example.com",
    "availability": "Mon to Sun, 8AM to 5PM",
    "rating": 4.9,
    "reviewCount": 76,
    "specialties": [
      "Preventive maintenance",
      "Cleaning",
      "Installation"
    ],
    "languages": [
      "Tagalog",
      "English",
      "Marinduque\u00f1o"
    ],
    "responseTime": "Replies within 24 hours on weekdays",
    "reviews": [
      {
        "name": "Gil",
        "rating": 5,
        "comment": "Honest assessment of what was needed\u2014no unnecessary extras.",
        "date": "2026-10-21"
      },
      {
        "name": "Elena",
        "rating": 5,
        "comment": "Did a careful job and cleaned up after. Recommended.",
        "date": "2026-09-11"
      },
      {
        "name": "Jose",
        "rating": 5,
        "comment": "Professional and respectful. The result looked neat.",
        "date": "2026-08-02"
      }
    ]
  },
  {
    "id": 48,
    "name": "Tropical Cool Repair",
    "category": "Air Conditioning",
    "description": "Split AC repair, drain line clearing, and seasonal tune-ups.",
    "barangaysCovered": [
      "Amoingon",
      "Agot",
      "Tabigue",
      "Cawit"
    ],
    "yearsExperience": 5,
    "rate": 450,
    "rateType": "per hour",
    "contactNumber": "09XX-XXX-1048",
    "email": "tropicalcoolrepair@example.com",
    "availability": "Tue to Sat, 8AM to 4PM",
    "rating": 4.1,
    "reviewCount": 33,
    "specialties": [
      "Preventive maintenance",
      "Cleaning",
      "Installation"
    ],
    "languages": [
      "Tagalog",
      "English"
    ],
    "responseTime": "Usually responds within a few hours",
    "reviews": [
      {
        "name": "Cecilia",
        "rating": 4,
        "comment": "Reliable and finished on time. Would hire again.",
        "date": "2026-10-20"
      },
      {
        "name": "Carlos",
        "rating": 4,
        "comment": "Arrived as scheduled and explained the work clearly.",
        "date": "2026-09-10"
      }
    ]
  },
  {
    "id": 49,
    "name": "SafeHome Pest Solutions",
    "category": "Pest Control",
    "description": "Termite treatment, cockroach control, and general household pest spraying.",
    "barangaysCovered": [
      "Tanza",
      "Mercado",
      "Malusak",
      "Isok I"
    ],
    "yearsExperience": 14,
    "rate": 1500,
    "rateType": "per job",
    "contactNumber": "09XX-XXX-1049",
    "email": "safehomepest@example.com",
    "availability": "Mon to Sat, 8AM to 5PM",
    "rating": 4.6,
    "reviewCount": 92,
    "specialties": [
      "Rodents",
      "Termites",
      "Ants"
    ],
    "languages": [
      "Tagalog",
      "English",
      "Marinduque\u00f1o"
    ],
    "responseTime": "Usually responds within a day",
    "reviews": [
      {
        "name": "Mario",
        "rating": 5,
        "comment": "Fair price and clear communication throughout the job.",
        "date": "2026-10-19"
      },
      {
        "name": "Grace",
        "rating": 4,
        "comment": "Good quality work for the rate. Will book again next time.",
        "date": "2026-09-09"
      },
      {
        "name": "Pedro",
        "rating": 5,
        "comment": "Honest assessment of what was needed\u2014no unnecessary extras.",
        "date": "2026-07-31"
      }
    ]
  },
  {
    "id": 50,
    "name": "Boac Bug Busters",
    "category": "Pest Control",
    "description": "Ant, mosquito, and rodent control for homes and small businesses.",
    "barangaysCovered": [
      "Cawit",
      "Tabi",
      "Duyay",
      "Caganhao"
    ],
    "yearsExperience": 7,
    "rate": 1200,
    "rateType": "per job",
    "contactNumber": "09XX-XXX-1050",
    "email": "boacbugbusters@example.com",
    "availability": "Mon to Fri, 8AM to 4PM",
    "rating": 4.4,
    "reviewCount": 41,
    "specialties": [
      "Rodents",
      "Termites",
      "Ants"
    ],
    "languages": [
      "Tagalog",
      "English",
      "Marinduque\u00f1o"
    ],
    "responseTime": "Often available same-day for urgent jobs",
    "reviews": [
      {
        "name": "Rosalie",
        "rating": 5,
        "comment": "Did a careful job and cleaned up after. Recommended.",
        "date": "2026-10-18"
      },
      {
        "name": "Antonio",
        "rating": 4,
        "comment": "Professional and respectful. The result looked neat.",
        "date": "2026-09-08"
      }
    ]
  },
  {
    "id": 51,
    "name": "Island Pest Guard",
    "category": "Pest Control",
    "description": "Preventive pest programs and targeted treatment for kitchens and storage areas.",
    "barangaysCovered": [
      "Balaring",
      "Murallon",
      "Tanza",
      "Mercado"
    ],
    "yearsExperience": 9,
    "rate": 900,
    "rateType": "per job",
    "contactNumber": "09XX-XXX-1051",
    "email": "islandpestguard@example.com",
    "availability": "Tue to Sun, 9AM to 5PM",
    "rating": 4.3,
    "reviewCount": 55,
    "specialties": [
      "Rodents",
      "Termites",
      "Ants"
    ],
    "languages": [
      "Tagalog",
      "English"
    ],
    "responseTime": "Replies within 24 hours on weekdays",
    "reviews": [
      {
        "name": "Dante",
        "rating": 5,
        "comment": "Arrived as scheduled and explained the work clearly.",
        "date": "2026-10-17"
      },
      {
        "name": "Sofia",
        "rating": 4,
        "comment": "Responded quickly and fixed the issue the same day.",
        "date": "2026-09-07"
      },
      {
        "name": "Ramon",
        "rating": 5,
        "comment": "Fair price and clear communication throughout the job.",
        "date": "2026-07-29"
      }
    ]
  },
  {
    "id": 52,
    "name": "Marinduque Termite Control",
    "category": "Pest Control",
    "description": "Termite inspection, soil treatment, and wood protection for older houses.",
    "barangaysCovered": [
      "Isok I",
      "Malusak",
      "Amoingon",
      "Agot"
    ],
    "yearsExperience": 16,
    "rate": 2800,
    "rateType": "per job",
    "contactNumber": "09XX-XXX-1052",
    "email": "marinduquetermite@example.com",
    "availability": "Mon to Sat, 7AM to 3PM",
    "rating": 4.8,
    "reviewCount": 67,
    "specialties": [
      "Rodents",
      "Termites",
      "Ants"
    ],
    "languages": [
      "Tagalog",
      "English",
      "Marinduque\u00f1o"
    ],
    "responseTime": "Usually responds within a few hours",
    "reviews": [
      {
        "name": "Nora",
        "rating": 5,
        "comment": "Good quality work for the rate. Will book again next time.",
        "date": "2026-10-16"
      },
      {
        "name": "Miguel",
        "rating": 5,
        "comment": "Honest assessment of what was needed\u2014no unnecessary extras.",
        "date": "2026-09-06"
      }
    ]
  },
  {
    "id": 53,
    "name": "Boac Roof Care",
    "category": "Roofing",
    "description": "Roof leak repair, gutter clearing, and sheet replacement for homes.",
    "barangaysCovered": [
      "Tanza",
      "Cawit",
      "Tabi",
      "Mercado"
    ],
    "yearsExperience": 11,
    "rate": 500,
    "rateType": "per hour",
    "contactNumber": "09XX-XXX-1053",
    "email": "boacroofcare@example.com",
    "availability": "Mon to Sat, 7AM to 4PM",
    "rating": 4.5,
    "reviewCount": 44,
    "specialties": [
      "Storm damage",
      "Leak repair",
      "Gutter work"
    ],
    "languages": [
      "Tagalog",
      "English",
      "Marinduque\u00f1o"
    ],
    "responseTime": "Usually responds within a day",
    "reviews": [
      {
        "name": "Ben",
        "rating": 5,
        "comment": "Professional and respectful. The result looked neat.",
        "date": "2026-10-15"
      },
      {
        "name": "Maria",
        "rating": 4,
        "comment": "Reliable and finished on time. Would hire again.",
        "date": "2026-09-05"
      },
      {
        "name": "Gil",
        "rating": 5,
        "comment": "Arrived as scheduled and explained the work clearly.",
        "date": "2026-07-27"
      }
    ]
  },
  {
    "id": 54,
    "name": "Island Roofing Works",
    "category": "Roofing",
    "description": "G.I. sheet installation, waterproofing, and storm damage repairs.",
    "barangaysCovered": [
      "Duyay",
      "Balaring",
      "Murallon",
      "Isok I"
    ],
    "yearsExperience": 13,
    "rate": 3500,
    "rateType": "per job",
    "contactNumber": "09XX-XXX-1054",
    "email": "islandroofingworks@example.com",
    "availability": "Mon to Fri, 8AM to 5PM",
    "rating": 4.7,
    "reviewCount": 58,
    "specialties": [
      "Storm damage",
      "Leak repair",
      "Gutter work"
    ],
    "languages": [
      "Tagalog",
      "English"
    ],
    "responseTime": "Often available same-day for urgent jobs",
    "reviews": [
      {
        "name": "Elena",
        "rating": 5,
        "comment": "Responded quickly and fixed the issue the same day.",
        "date": "2026-10-14"
      },
      {
        "name": "Jose",
        "rating": 4,
        "comment": "Fair price and clear communication throughout the job.",
        "date": "2026-09-04"
      }
    ]
  },
  {
    "id": 55,
    "name": "Marinduque Topside Repair",
    "category": "Roofing",
    "description": "Ridge sealing, flashing repair, and minor structural roof fixes.",
    "barangaysCovered": [
      "Malusak",
      "Caganhao",
      "Tanza",
      "Amoingon"
    ],
    "yearsExperience": 8,
    "rate": 450,
    "rateType": "per hour",
    "contactNumber": "09XX-XXX-1055",
    "email": "marinduquetopside@example.com",
    "availability": "Tue to Sat, 8AM to 4PM",
    "rating": 4.2,
    "reviewCount": 31,
    "specialties": [
      "Storm damage",
      "Leak repair",
      "Gutter work"
    ],
    "languages": [
      "Tagalog",
      "English",
      "Marinduque\u00f1o"
    ],
    "responseTime": "Replies within 24 hours on weekdays",
    "reviews": [
      {
        "name": "Carlos",
        "rating": 4,
        "comment": "Honest assessment of what was needed\u2014no unnecessary extras.",
        "date": "2026-10-13"
      },
      {
        "name": "Ana",
        "rating": 4,
        "comment": "Did a careful job and cleaned up after. Recommended.",
        "date": "2026-09-03"
      },
      {
        "name": "Mario",
        "rating": 4,
        "comment": "Professional and respectful. The result looked neat.",
        "date": "2026-07-25"
      }
    ]
  },
  {
    "id": 56,
    "name": "Safe Shelter Roofing",
    "category": "Roofing",
    "description": "Full roof replacement planning and leak tracing for residential roofs.",
    "barangaysCovered": [
      "Agot",
      "Tabigue",
      "Cawit",
      "Tabi"
    ],
    "yearsExperience": 15,
    "rate": 4000,
    "rateType": "per job",
    "contactNumber": "09XX-XXX-1056",
    "email": "safeshelterroofing@example.com",
    "availability": "Mon to Sat, 7AM to 3PM",
    "rating": 4.6,
    "reviewCount": 49,
    "specialties": [
      "Storm damage",
      "Leak repair",
      "Gutter work"
    ],
    "languages": [
      "Tagalog",
      "English",
      "Marinduque\u00f1o"
    ],
    "responseTime": "Usually responds within a few hours",
    "reviews": [
      {
        "name": "Grace",
        "rating": 5,
        "comment": "Reliable and finished on time. Would hire again.",
        "date": "2026-10-12"
      },
      {
        "name": "Pedro",
        "rating": 4,
        "comment": "Arrived as scheduled and explained the work clearly.",
        "date": "2026-09-02"
      }
    ]
  },
  {
    "id": 57,
    "name": "Green Path Landscaping",
    "category": "Landscaping",
    "description": "Lawn mowing, garden clean-up, and basic outdoor plant care.",
    "barangaysCovered": [
      "Tanza",
      "Mercado",
      "Isok I",
      "Malusak"
    ],
    "yearsExperience": 6,
    "rate": 300,
    "rateType": "per hour",
    "contactNumber": "09XX-XXX-1057",
    "email": "greenpathlandscaping@example.com",
    "availability": "Mon to Sat, 7AM to 4PM",
    "rating": 4.4,
    "reviewCount": 52,
    "specialties": [
      "Planting",
      "Lawn mowing",
      "Trimming"
    ],
    "languages": [
      "Tagalog",
      "English"
    ],
    "responseTime": "Usually responds within a day",
    "reviews": [
      {
        "name": "Antonio",
        "rating": 5,
        "comment": "Fair price and clear communication throughout the job.",
        "date": "2026-10-11"
      },
      {
        "name": "Luz",
        "rating": 4,
        "comment": "Good quality work for the rate. Will book again next time.",
        "date": "2026-09-01"
      },
      {
        "name": "Dante",
        "rating": 5,
        "comment": "Honest assessment of what was needed\u2014no unnecessary extras.",
        "date": "2026-07-23"
      }
    ]
  },
  {
    "id": 58,
    "name": "Boac Garden Keepers",
    "category": "Landscaping",
    "description": "Hedge trimming, flower bed setup, and yard maintenance packages.",
    "barangaysCovered": [
      "Cawit",
      "Tabi",
      "Duyay",
      "Caganhao"
    ],
    "yearsExperience": 9,
    "rate": 1500,
    "rateType": "per job",
    "contactNumber": "09XX-XXX-1058",
    "email": "boacgardenkeepers@example.com",
    "availability": "Mon to Fri, 8AM to 5PM",
    "rating": 4.7,
    "reviewCount": 63,
    "specialties": [
      "Planting",
      "Lawn mowing",
      "Trimming"
    ],
    "languages": [
      "Tagalog",
      "English",
      "Marinduque\u00f1o"
    ],
    "responseTime": "Often available same-day for urgent jobs",
    "reviews": [
      {
        "name": "Sofia",
        "rating": 5,
        "comment": "Did a careful job and cleaned up after. Recommended.",
        "date": "2026-10-10"
      },
      {
        "name": "Ramon",
        "rating": 4,
        "comment": "Professional and respectful. The result looked neat.",
        "date": "2026-08-31"
      }
    ]
  },
  {
    "id": 59,
    "name": "Island Greens Service",
    "category": "Landscaping",
    "description": "Tree pruning, grass cutting, and simple landscape layout for homes.",
    "barangaysCovered": [
      "Balaring",
      "Murallon",
      "Tanza",
      "Amoingon"
    ],
    "yearsExperience": 11,
    "rate": 400,
    "rateType": "per hour",
    "contactNumber": "09XX-XXX-1059",
    "email": "islandgreensservice@example.com",
    "availability": "Tue to Sun, 7AM to 3PM",
    "rating": 4.5,
    "reviewCount": 40,
    "specialties": [
      "Planting",
      "Lawn mowing",
      "Trimming"
    ],
    "languages": [
      "Tagalog",
      "English",
      "Marinduque\u00f1o"
    ],
    "responseTime": "Replies within 24 hours on weekdays",
    "reviews": [
      {
        "name": "Miguel",
        "rating": 5,
        "comment": "Arrived as scheduled and explained the work clearly.",
        "date": "2026-10-09"
      },
      {
        "name": "Teresa",
        "rating": 4,
        "comment": "Responded quickly and fixed the issue the same day.",
        "date": "2026-08-30"
      },
      {
        "name": "Ben",
        "rating": 5,
        "comment": "Fair price and clear communication throughout the job.",
        "date": "2026-07-21"
      }
    ]
  },
  {
    "id": 60,
    "name": "Marinduque Outdoor Care",
    "category": "Landscaping",
    "description": "Front-yard makeovers, plant installation, and seasonal garden clean-up.",
    "barangaysCovered": [
      "Agot",
      "Tabigue",
      "Isok I",
      "Malusak"
    ],
    "yearsExperience": 7,
    "rate": 2200,
    "rateType": "per job",
    "contactNumber": "09XX-XXX-1060",
    "email": "marinduqueoutdoor@example.com",
    "availability": "Mon to Sat, 8AM to 4PM",
    "rating": 4.3,
    "reviewCount": 35,
    "specialties": [
      "Planting",
      "Lawn mowing",
      "Trimming"
    ],
    "languages": [
      "Tagalog",
      "English"
    ],
    "responseTime": "Usually responds within a few hours",
    "reviews": [
      {
        "name": "Maria",
        "rating": 5,
        "comment": "Good quality work for the rate. Will book again next time.",
        "date": "2026-10-28"
      },
      {
        "name": "Gil",
        "rating": 4,
        "comment": "Honest assessment of what was needed\u2014no unnecessary extras.",
        "date": "2026-09-18"
      }
    ]
  },
  {
    "id": 61,
    "name": "Glow by Ana Beauty Care",
    "category": "Beauty Care",
    "description": "Home beauty services, makeup, and skincare for everyday and special days.",
    "barangaysCovered": [
      "Tanza",
      "Mercado",
      "Isok I"
    ],
    "yearsExperience": 4,
    "rate": 800,
    "rateType": "per session",
    "contactNumber": "09XX-XXX-1161",
    "email": "provider61@example.com",
    "availability": "Mon to Sat, 9AM to 6PM",
    "rating": 4.4,
    "reviewCount": 20,
    "specialties": [
      "Makeup",
      "Skincare",
      "Home service"
    ],
    "languages": [
      "Tagalog",
      "English"
    ],
    "responseTime": "Usually responds within a day",
    "reviews": [
      {
        "name": "Liza",
        "rating": 5,
        "comment": "Arrived on time and explained everything clearly.",
        "date": "2026-10-20"
      },
      {
        "name": "Carlo",
        "rating": 4,
        "comment": "Fair price and careful work. Would book again.",
        "date": "2026-09-12"
      }
    ]
  },
  {
    "id": 62,
    "name": "Boac Home Glam",
    "category": "Beauty Care",
    "description": "Home beauty services, makeup, and skincare for everyday and special days.",
    "barangaysCovered": [
      "Murallon",
      "Malusak",
      "Caganhao"
    ],
    "yearsExperience": 7,
    "rate": 1000,
    "rateType": "per session",
    "contactNumber": "09XX-XXX-1162",
    "email": "provider62@example.com",
    "availability": "Mon to Sat, 9AM to 6PM",
    "rating": 4.6000000000000005,
    "reviewCount": 32,
    "specialties": [
      "Makeup",
      "Skincare",
      "Home service"
    ],
    "languages": [
      "Tagalog",
      "English"
    ],
    "responseTime": "Usually responds within a day",
    "reviews": [
      {
        "name": "Liza",
        "rating": 5,
        "comment": "Arrived on time and explained everything clearly.",
        "date": "2026-10-20"
      },
      {
        "name": "Carlo",
        "rating": 4,
        "comment": "Fair price and careful work. Would book again.",
        "date": "2026-09-12"
      },
      {
        "name": "Maya",
        "rating": 5,
        "comment": "Professional and easy to coordinate with.",
        "date": "2026-08-05"
      }
    ]
  },
  {
    "id": 63,
    "name": "Kuya Ben's Barbershop",
    "category": "Barbers",
    "description": "Haircuts and grooming at home or in a nearby shop.",
    "barangaysCovered": [
      "Tanza",
      "Mercado",
      "Isok I"
    ],
    "yearsExperience": 4,
    "rate": 150,
    "rateType": "per cut",
    "contactNumber": "09XX-XXX-1163",
    "email": "provider63@example.com",
    "availability": "Mon to Sat, 9AM to 6PM",
    "rating": 4.4,
    "reviewCount": 20,
    "specialties": [
      "Haircut",
      "Grooming",
      "Beard trim"
    ],
    "languages": [
      "Tagalog",
      "English"
    ],
    "responseTime": "Usually responds within a day",
    "reviews": [
      {
        "name": "Liza",
        "rating": 5,
        "comment": "Arrived on time and explained everything clearly.",
        "date": "2026-10-20"
      },
      {
        "name": "Carlo",
        "rating": 4,
        "comment": "Fair price and careful work. Would book again.",
        "date": "2026-09-12"
      }
    ]
  },
  {
    "id": 64,
    "name": "Island Cuts Boac",
    "category": "Barbers",
    "description": "Haircuts and grooming at home or in a nearby shop.",
    "barangaysCovered": [
      "Murallon",
      "Malusak",
      "Caganhao"
    ],
    "yearsExperience": 7,
    "rate": 350,
    "rateType": "per cut",
    "contactNumber": "09XX-XXX-1164",
    "email": "provider64@example.com",
    "availability": "Mon to Sat, 9AM to 6PM",
    "rating": 4.6000000000000005,
    "reviewCount": 32,
    "specialties": [
      "Haircut",
      "Grooming",
      "Beard trim"
    ],
    "languages": [
      "Tagalog",
      "English"
    ],
    "responseTime": "Usually responds within a day",
    "reviews": [
      {
        "name": "Liza",
        "rating": 5,
        "comment": "Arrived on time and explained everything clearly.",
        "date": "2026-10-20"
      },
      {
        "name": "Carlo",
        "rating": 4,
        "comment": "Fair price and careful work. Would book again.",
        "date": "2026-09-12"
      },
      {
        "name": "Maya",
        "rating": 5,
        "comment": "Professional and easy to coordinate with.",
        "date": "2026-08-05"
      }
    ]
  },
  {
    "id": 65,
    "name": "Lola's Catering Boac",
    "category": "Catering",
    "description": "Food packages for gatherings, parties, and small events in Boac.",
    "barangaysCovered": [
      "Tanza",
      "Mercado",
      "Isok I"
    ],
    "yearsExperience": 4,
    "rate": 3500,
    "rateType": "per package",
    "contactNumber": "09XX-XXX-1165",
    "email": "provider65@example.com",
    "availability": "Mon to Sat, 9AM to 6PM",
    "rating": 4.4,
    "reviewCount": 20,
    "specialties": [
      "Party trays",
      "Buffet",
      "Packed meals"
    ],
    "languages": [
      "Tagalog",
      "English"
    ],
    "responseTime": "Usually responds within a day",
    "reviews": [
      {
        "name": "Liza",
        "rating": 5,
        "comment": "Arrived on time and explained everything clearly.",
        "date": "2026-10-20"
      },
      {
        "name": "Carlo",
        "rating": 4,
        "comment": "Fair price and careful work. Would book again.",
        "date": "2026-09-12"
      }
    ]
  },
  {
    "id": 66,
    "name": "Marinduque Table Trays",
    "category": "Catering",
    "description": "Food packages for gatherings, parties, and small events in Boac.",
    "barangaysCovered": [
      "Murallon",
      "Malusak",
      "Caganhao"
    ],
    "yearsExperience": 7,
    "rate": 3700,
    "rateType": "per package",
    "contactNumber": "09XX-XXX-1166",
    "email": "provider66@example.com",
    "availability": "Mon to Sat, 9AM to 6PM",
    "rating": 4.6000000000000005,
    "reviewCount": 32,
    "specialties": [
      "Party trays",
      "Buffet",
      "Packed meals"
    ],
    "languages": [
      "Tagalog",
      "English"
    ],
    "responseTime": "Usually responds within a day",
    "reviews": [
      {
        "name": "Liza",
        "rating": 5,
        "comment": "Arrived on time and explained everything clearly.",
        "date": "2026-10-20"
      },
      {
        "name": "Carlo",
        "rating": 4,
        "comment": "Fair price and careful work. Would book again.",
        "date": "2026-09-12"
      },
      {
        "name": "Maya",
        "rating": 5,
        "comment": "Professional and easy to coordinate with.",
        "date": "2026-08-05"
      }
    ]
  },
  {
    "id": 67,
    "name": "Boac Gather Events",
    "category": "Event Organizers",
    "description": "Coordination help for birthdays, reunions, and community events.",
    "barangaysCovered": [
      "Tanza",
      "Mercado",
      "Isok I"
    ],
    "yearsExperience": 4,
    "rate": 5000,
    "rateType": "per event",
    "contactNumber": "09XX-XXX-1167",
    "email": "provider67@example.com",
    "availability": "Mon to Sat, 9AM to 6PM",
    "rating": 4.4,
    "reviewCount": 20,
    "specialties": [
      "Planning",
      "Coordination",
      "Vendor booking"
    ],
    "languages": [
      "Tagalog",
      "English"
    ],
    "responseTime": "Usually responds within a day",
    "reviews": [
      {
        "name": "Liza",
        "rating": 5,
        "comment": "Arrived on time and explained everything clearly.",
        "date": "2026-10-20"
      },
      {
        "name": "Carlo",
        "rating": 4,
        "comment": "Fair price and careful work. Would book again.",
        "date": "2026-09-12"
      }
    ]
  },
  {
    "id": 68,
    "name": "Simple Celebrations PH",
    "category": "Event Organizers",
    "description": "Coordination help for birthdays, reunions, and community events.",
    "barangaysCovered": [
      "Murallon",
      "Malusak",
      "Caganhao"
    ],
    "yearsExperience": 7,
    "rate": 5200,
    "rateType": "per event",
    "contactNumber": "09XX-XXX-1168",
    "email": "provider68@example.com",
    "availability": "Mon to Sat, 9AM to 6PM",
    "rating": 4.6000000000000005,
    "reviewCount": 32,
    "specialties": [
      "Planning",
      "Coordination",
      "Vendor booking"
    ],
    "languages": [
      "Tagalog",
      "English"
    ],
    "responseTime": "Usually responds within a day",
    "reviews": [
      {
        "name": "Liza",
        "rating": 5,
        "comment": "Arrived on time and explained everything clearly.",
        "date": "2026-10-20"
      },
      {
        "name": "Carlo",
        "rating": 4,
        "comment": "Fair price and careful work. Would book again.",
        "date": "2026-09-12"
      },
      {
        "name": "Maya",
        "rating": 5,
        "comment": "Professional and easy to coordinate with.",
        "date": "2026-08-05"
      }
    ]
  },
  {
    "id": 69,
    "name": "Frame & Light Studio",
    "category": "Photographers",
    "description": "Photo coverage for family events, debuts, and simple portraits.",
    "barangaysCovered": [
      "Tanza",
      "Mercado",
      "Isok I"
    ],
    "yearsExperience": 4,
    "rate": 2500,
    "rateType": "per package",
    "contactNumber": "09XX-XXX-1169",
    "email": "provider69@example.com",
    "availability": "Mon to Sat, 9AM to 6PM",
    "rating": 4.4,
    "reviewCount": 20,
    "specialties": [
      "Events",
      "Portraits",
      "Same-day edit"
    ],
    "languages": [
      "Tagalog",
      "English"
    ],
    "responseTime": "Usually responds within a day",
    "reviews": [
      {
        "name": "Liza",
        "rating": 5,
        "comment": "Arrived on time and explained everything clearly.",
        "date": "2026-10-20"
      },
      {
        "name": "Carlo",
        "rating": 4,
        "comment": "Fair price and careful work. Would book again.",
        "date": "2026-09-12"
      }
    ]
  },
  {
    "id": 70,
    "name": "Boac Moment Photos",
    "category": "Photographers",
    "description": "Photo coverage for family events, debuts, and simple portraits.",
    "barangaysCovered": [
      "Murallon",
      "Malusak",
      "Caganhao"
    ],
    "yearsExperience": 7,
    "rate": 2700,
    "rateType": "per package",
    "contactNumber": "09XX-XXX-1170",
    "email": "provider70@example.com",
    "availability": "Mon to Sat, 9AM to 6PM",
    "rating": 4.6000000000000005,
    "reviewCount": 32,
    "specialties": [
      "Events",
      "Portraits",
      "Same-day edit"
    ],
    "languages": [
      "Tagalog",
      "English"
    ],
    "responseTime": "Usually responds within a day",
    "reviews": [
      {
        "name": "Liza",
        "rating": 5,
        "comment": "Arrived on time and explained everything clearly.",
        "date": "2026-10-20"
      },
      {
        "name": "Carlo",
        "rating": 4,
        "comment": "Fair price and careful work. Would book again.",
        "date": "2026-09-12"
      },
      {
        "name": "Maya",
        "rating": 5,
        "comment": "Professional and easy to coordinate with.",
        "date": "2026-08-05"
      }
    ]
  },
  {
    "id": 71,
    "name": "Cut & Color Edit Lab",
    "category": "Editors",
    "description": "Video and photo editing for events, reels, and simple projects.",
    "barangaysCovered": [
      "Tanza",
      "Mercado",
      "Isok I"
    ],
    "yearsExperience": 4,
    "rate": 1200,
    "rateType": "per project",
    "contactNumber": "09XX-XXX-1171",
    "email": "provider71@example.com",
    "availability": "Mon to Sat, 9AM to 6PM",
    "rating": 4.4,
    "reviewCount": 20,
    "specialties": [
      "Video edit",
      "Photo edit",
      "Reels"
    ],
    "languages": [
      "Tagalog",
      "English"
    ],
    "responseTime": "Usually responds within a day",
    "reviews": [
      {
        "name": "Liza",
        "rating": 5,
        "comment": "Arrived on time and explained everything clearly.",
        "date": "2026-10-20"
      },
      {
        "name": "Carlo",
        "rating": 4,
        "comment": "Fair price and careful work. Would book again.",
        "date": "2026-09-12"
      }
    ]
  },
  {
    "id": 72,
    "name": "Island Frame Editors",
    "category": "Editors",
    "description": "Video and photo editing for events, reels, and simple projects.",
    "barangaysCovered": [
      "Murallon",
      "Malusak",
      "Caganhao"
    ],
    "yearsExperience": 7,
    "rate": 1400,
    "rateType": "per project",
    "contactNumber": "09XX-XXX-1172",
    "email": "provider72@example.com",
    "availability": "Mon to Sat, 9AM to 6PM",
    "rating": 4.6000000000000005,
    "reviewCount": 32,
    "specialties": [
      "Video edit",
      "Photo edit",
      "Reels"
    ],
    "languages": [
      "Tagalog",
      "English"
    ],
    "responseTime": "Usually responds within a day",
    "reviews": [
      {
        "name": "Liza",
        "rating": 5,
        "comment": "Arrived on time and explained everything clearly.",
        "date": "2026-10-20"
      },
      {
        "name": "Carlo",
        "rating": 4,
        "comment": "Fair price and careful work. Would book again.",
        "date": "2026-09-12"
      },
      {
        "name": "Maya",
        "rating": 5,
        "comment": "Professional and easy to coordinate with.",
        "date": "2026-08-05"
      }
    ]
  },
  {
    "id": 73,
    "name": "Tutor Nina Home Lessons",
    "category": "Tutoring",
    "description": "Home or online tutoring for basic subjects and exam review.",
    "barangaysCovered": [
      "Tanza",
      "Mercado",
      "Isok I"
    ],
    "yearsExperience": 4,
    "rate": 300,
    "rateType": "per hour",
    "contactNumber": "09XX-XXX-1173",
    "email": "provider73@example.com",
    "availability": "Mon to Sat, 9AM to 6PM",
    "rating": 4.4,
    "reviewCount": 20,
    "specialties": [
      "Math",
      "English",
      "Exam review"
    ],
    "languages": [
      "Tagalog",
      "English"
    ],
    "responseTime": "Usually responds within a day",
    "reviews": [
      {
        "name": "Liza",
        "rating": 5,
        "comment": "Arrived on time and explained everything clearly.",
        "date": "2026-10-20"
      },
      {
        "name": "Carlo",
        "rating": 4,
        "comment": "Fair price and careful work. Would book again.",
        "date": "2026-09-12"
      }
    ]
  },
  {
    "id": 74,
    "name": "Boac Study Buddy",
    "category": "Tutoring",
    "description": "Home or online tutoring for basic subjects and exam review.",
    "barangaysCovered": [
      "Murallon",
      "Malusak",
      "Caganhao"
    ],
    "yearsExperience": 7,
    "rate": 500,
    "rateType": "per hour",
    "contactNumber": "09XX-XXX-1174",
    "email": "provider74@example.com",
    "availability": "Mon to Sat, 9AM to 6PM",
    "rating": 4.6000000000000005,
    "reviewCount": 32,
    "specialties": [
      "Math",
      "English",
      "Exam review"
    ],
    "languages": [
      "Tagalog",
      "English"
    ],
    "responseTime": "Usually responds within a day",
    "reviews": [
      {
        "name": "Liza",
        "rating": 5,
        "comment": "Arrived on time and explained everything clearly.",
        "date": "2026-10-20"
      },
      {
        "name": "Carlo",
        "rating": 4,
        "comment": "Fair price and careful work. Would book again.",
        "date": "2026-09-12"
      },
      {
        "name": "Maya",
        "rating": 5,
        "comment": "Professional and easy to coordinate with.",
        "date": "2026-08-05"
      }
    ]
  },
  {
    "id": 75,
    "name": "Raffy Motorcycle Service",
    "category": "Mechanic",
    "description": "Motorcycle and small vehicle check-ups, tune-ups, and basic repairs.",
    "barangaysCovered": [
      "Tanza",
      "Mercado",
      "Isok I"
    ],
    "yearsExperience": 4,
    "rate": 500,
    "rateType": "per job",
    "contactNumber": "09XX-XXX-1175",
    "email": "provider75@example.com",
    "availability": "Mon to Sat, 9AM to 6PM",
    "rating": 4.4,
    "reviewCount": 20,
    "specialties": [
      "Tune-up",
      "Oil change",
      "Basic repair"
    ],
    "languages": [
      "Tagalog",
      "English"
    ],
    "responseTime": "Usually responds within a day",
    "reviews": [
      {
        "name": "Liza",
        "rating": 5,
        "comment": "Arrived on time and explained everything clearly.",
        "date": "2026-10-20"
      },
      {
        "name": "Carlo",
        "rating": 4,
        "comment": "Fair price and careful work. Would book again.",
        "date": "2026-09-12"
      }
    ]
  },
  {
    "id": 76,
    "name": "Boac Roadside Mechanic",
    "category": "Mechanic",
    "description": "Motorcycle and small vehicle check-ups, tune-ups, and basic repairs.",
    "barangaysCovered": [
      "Murallon",
      "Malusak",
      "Caganhao"
    ],
    "yearsExperience": 7,
    "rate": 700,
    "rateType": "per job",
    "contactNumber": "09XX-XXX-1176",
    "email": "provider76@example.com",
    "availability": "Mon to Sat, 9AM to 6PM",
    "rating": 4.6000000000000005,
    "reviewCount": 32,
    "specialties": [
      "Tune-up",
      "Oil change",
      "Basic repair"
    ],
    "languages": [
      "Tagalog",
      "English"
    ],
    "responseTime": "Usually responds within a day",
    "reviews": [
      {
        "name": "Liza",
        "rating": 5,
        "comment": "Arrived on time and explained everything clearly.",
        "date": "2026-10-20"
      },
      {
        "name": "Carlo",
        "rating": 4,
        "comment": "Fair price and careful work. Would book again.",
        "date": "2026-09-12"
      },
      {
        "name": "Maya",
        "rating": 5,
        "comment": "Professional and easy to coordinate with.",
        "date": "2026-08-05"
      }
    ]
  }
];
