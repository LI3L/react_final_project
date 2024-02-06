const words = [
  {
    "name": "apple",
    "difficulty": "easy",
    "translation": "תפוח",
    "points": 5,
    "succsess": 0,
    "failure": 0
  },
  {
    "name": "banana",
    "difficulty": "medium",
    "translation": "בננה",
    "points": 10,
    "succsess": 0,
    "failure": 0
  },
  {
    "name": "carrot",
    "difficulty": "easy",
    "translation": "גזר",
    "points": 5,
    "succsess": 0,
    "failure": 0
  },
  {
    "name": "dog",
    "difficulty": "easy",
    "translation": "כלב",
    "points": 5,
    "succsess": 0,
    "failure": 0
  },
  {
    "name": "elephant",
    "difficulty": "hard",
    "translation": "פיל",
    "points": 15,
    "succsess": 0,
    "failure": 0
  },
  {
    "name": "cat",
    "difficulty": "easy",
    "translation": "חתול",
    "points": 5,
    "succsess": 0,
    "failure": 0
  },
  {
    "name": "house",
    "difficulty": "easy",
    "translation": "בית",
    "points": 10,
    "succsess": 0,
    "failure": 0
  },
  {
    "name": "flower",
    "difficulty": "easy",
    "translation": "פרח",
    "points": 5,
    "succsess": 0,
    "failure": 0
  },
  {
    "name": "sun",
    "difficulty": "easy",
    "translation": "שמש",
    "points": 5,
    "succsess": 0,
    "failure": 0
  },
  {
    "name": "water",
    "difficulty": "easy",
    "translation": "מים",
    "points": 5,
    "succsess": 0,
    "failure": 0
  },
  {
    "name": "bird",
    "difficulty": "easy",
    "translation": "ציפור",
    "points": 10,
    "succsess": 0,
    "failure": 0
  },
  {
    "name": "tree",
    "difficulty": "easy",
    "translation": "עץ",
    "points": 5,
    "succsess": 0,
    "failure": 0
  },
  {
    "name": "book",
    "difficulty": "easy",
    "translation": "ספר",
    "points": 10,
    "succsess": 0,
    "failure": 0
  },
  {
    "name": "shoe",
    "difficulty": "easy",
    "translation": "נעל",
    "points": 5,
    "succsess": 0,
    "failure": 0
  },
  {
    "name": "clock",
    "difficulty": "easy",
    "translation": "שעון",
    "points": 10,
    "succsess": 0,
    "failure": 0
  },
  {
    "name": "labyrinth",
    "difficulty": "hard",
    "translation": "מבוך",
    "points": 20,
    "succsess": 0,
    "failure": 0
  },
  {
    "name": "enigma",
    "difficulty": "hard",
    "translation": "חידה",
    "points": 20,
    "succsess": 0,
    "failure": 0
  },
  {
    "name": "serendipity",
    "difficulty": "hard",
    "translation": "מקריות",
    "points": 20,
    "succsess": 0,
    "failure": 0
  },
  {
    "name": "ephemeral",
    "difficulty": "hard",
    "translation": "חולף",
    "points": 20,
    "succsess": 0,
    "failure": 0
  },
  {
    "name": "cacophony",
    "difficulty": "hard",
    "translation": "רעש",
    "points": 20,
    "succsess": 0,
    "failure": 0
  },
  {
    "name": "quixotic",
    "difficulty": "hard",
    "translation": "תמהוני",
    "points": 20,
    "succsess": 0,
    "failure": 0
  },
  {
    "name": "laconic",
    "difficulty": "hard",
    "translation": "תמציתי",
    "points": 20,
    "succsess": 0,
    "failure": 0
  },
  {
    "name": "stoicism",
    "difficulty": "hard",
    "translation": "אדישות",
    "points": 20,
    "succsess": 0,
    "failure": 0
  },
  {
    "name": "juxtaposition",
    "difficulty": "hard",
    "translation": "הַצָּבָה כְּצִדָּה",
    "points": 20,
    "succsess": 0,
    "failure": 0
  },
  {
    "name": "enigma",
    "difficulty": "hard",
    "translation": "חידה",
    "points": 20,
    "succsess": 0,
    "failure": 0
  },
  {
    "name": "serendipity",
    "difficulty": "hard",
    "translation": "מקריות",
    "points": 20,
    "succsess": 0,
    "failure": 0
  },
  {
    "name": "ephemeral",
    "difficulty": "hard",
    "translation": "חולף",
    "points": 20,
    "succsess": 0,
    "failure": 0
  },
  {
    "name": "cacophony",
    "difficulty": "hard",
    "translation": "רעש",
    "points": 20,
    "succsess": 0,
    "failure": 0
  },
  {
    "name": "quixotic",
    "difficulty": "hard",
    "translation": "תמהוני",
    "points": 20,
    "succsess": 0,
    "failure": 0
  },
  {
    "name": "laconic",
    "difficulty": "hard",
    "translation": "תמציתי",
    "points": 20,
    "succsess": 0,
    "failure": 0
  },
  {
    "name": "stoicism",
    "difficulty": "hard",
    "translation": "אדישות",
    "points": 20,
    "succsess": 0,
    "failure": 0
  },
  {
    "name": "juxtaposition",
    "difficulty": "hard",
    "translation": "הַצָּבָה כְּצִדָּה",
    "points": 20,
    "succsess": 0,
    "failure": 0
  },
  {
    "name": "malaise",
    "difficulty": "hard",
    "translation": "חולשה",
    "points": 20,
    "succsess": 0,
    "failure": 0
  },
  {
    "name": "mountain",
    "difficulty": "medium",
    "translation": "הר",
    "points": 15,
    "succsess": 0,
    "failure": 0
  },
  {
    "name": "ocean",
    "difficulty": "medium",
    "translation": "אוקיינוס",
    "points": 15,
    "succsess": 0,
    "failure": 0
  },
  {
    "name": "symphony",
    "difficulty": "medium",
    "translation": "סימפוניה",
    "points": 15,
    "succsess": 0,
    "failure": 0
  },
  {
    "name": "rainbow",
    "difficulty": "medium",
    "translation": "קשת",
    "points": 15,
    "succsess": 0,
    "failure": 0
  },
  {
    "name": "marathon",
    "difficulty": "medium",
    "translation": "מרתון",
    "points": 15,
    "succsess": 0,
    "failure": 0
  },
  {
    "name": "galaxy",
    "difficulty": "medium",
    "translation": "גלקסיה",
    "points": 15,
    "succsess": 0,
    "failure": 0
  }
];
