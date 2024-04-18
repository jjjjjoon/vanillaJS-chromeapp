let nums = [1, 3, 5, 7, 9, 11];
let median = nums[nums.length / 2];

let data = {
  "age": 21,
  "age_median": 20,
  "company": "CleverZoo",
  "ticket_prices": {
    "adult": 9.95,
    "child": 5.95
  },
  "people": [{
    "first_name": "Aylmar",
    "last_name": "Avison",
    "email": "aavison0@scribd.com",
    "favorite_animal": "Honey badger"
  },
  {
    "first_name": "Jean",
    "last_name": "Jorg",
    "email": "jjorg1@i2i.jp",
    "favorite_animal": "Elephant, asian"
  },
  {
    "first_name": "Bernardo",
    "last_name": "McDuff",
    "email": "bmcduff2@purevolume.com",
    "favorite_animal": "Cockatoo, slender-billed"
  }]
};

function cl(input) {
    console.log(input);
};

cl(data.company);
