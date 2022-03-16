const categories = {
    Kühlregal: [
        "milch", "butter", "sahne", "joghurt", "brei", "schmand", "schlagsahne", "käse", "quark", "pudding",
        "milk", "cream", "butter", "yogurt", "sour", "whipped cream", "cheese", "quark", "pudding",
        "lait", "beurre", "yaourt", "aigre", "crème fouettée", "fromage", "quark", "pudding",
        "leche", "mantequilla", "nata", "yogur", "gachas de avena", "crema agria", "nata batida", "queso", "requesón", "pudín"
    ],

    Fleisch: [
        "fleisch", "fisch", "wurst", "hähnchen", "geflügel", "schinken", "lyoner", "salami", "pizzafleischkäse", "bierschinken", "currywurst", "bratwurst", "leberwurst", "landjäger", "weißwürste", "saitenwürste",
        "meat", "chicken", "poultry", "fish", "sausage", "ham",
        "viande", "poulet", "volaille", "poisson", "saucisse", "jambon",
        "carne", "pollo", "aves de corral", "pescado", "salchicha", "jamón"
    ],

    Gefriertruhe: [
        "pommes", "kroketten", "eis", "gefrorenes", "frosta", "pizza",
        "fries", "croquettes", "ice cream", "frozen", "pizza",
        "frites", "croquettes", "glace", "congelé", "pizza",
        "papas fritas", "croquetas", "helado", "congelado", "frosta", "pizza"
    ],

    Obst: [
        "obst", "früchte", "äpfel", "kirschen", "melone", "birne", "banane", "orange", "aprikose", "beeren", "kiwis", "avocado", "ananas", "pfirsich", "trauben", "rosinen", "granatapfel", "granatäpfel", "zitrone", "limette", "mango", "litschi", "kokosnuss", "mandarine", 
        "fruit", "apple", "cherries", "melon", "pear", "banana", "orange", "apricot", "berries", "currants", "kiwis", "avocado", "pineapple", "peach", "grapes", "raisins", "pomegranate", "lemon", "lime", "mango", "lychee", "coconut", "tangerine",
        "fruit", "pomme", "cerises", "melon", "poire", "banane", "orange", "abricot", "baies", "groseilles", "kiwis", "avocat", "ananas ", "pêche", "raisins", "raisins", "grenade", "citron", "citron vert", "mangue", "litchi", "noix de coco", "mandarine",
        "fruta", "manzana", "cerezas", "melón", "pera", "plátano", "naranja", "albaricoque", "bayas", "grosellas", "kiwis", "aguacate", "piña ", "melocotón", "uvas", "pasas", "granada", "limón", "lima", "mango", "lichi", "coco", "mandarina"
    ],

    Gemüse: [
        "paprika", "zwiebel", "kartoffel", "gurke", "salat", "karotten", "erbsen", "bohnen", "brokkoli", "blumenkohl", "fenchel", "kohl", "möhren", "knoblauch", "kichererbsen", "pilze", "kohlrabi", "oliven", "kürbis", "auberginen", "radieschen", "rhabarber", "rosenkohl", "sellerie", "spinat", "spargel", "tomaten", "zucchini", "lauch", "spargel", 
        "pepper", "onion", "potato", "cucumber", "lettuce", "carrot", "peas", "beans", "broccoli", "cauliflower", "fennel", "cabbage", "garlic", "chickpea", "mushroom", "kohlrabi", "olives", "pumpkin", "aubergine", "radishes", "rhubarb", "brussel sprout", "celery", "spinach", "asparagus", "zucchini", "leeks", "asparagus",
        "poivron", "oignon", "pomme de terre", "concombre", "laitue", "carotte", "petits pois", "haricots", "brocoli", "chou-fleur", "fenouil", "chou", "ail ", "pois chiche", "champignon", "chou-rave", "olives", "citrouille", "aubergine", "radis", "rhubarbe", "chou de Bruxelles", "céleri", "épinard", "asperge" , "courgettes", "poireaux", "asperges",
        "pimiento", "cebolla", "patata", "pepino", "lechuga", "zanahoria", "guisantes", "frijoles", "brócoli", "coliflor", "hinojo", "repollo", "ajo ", "garbanzo", "champiñón", "colinabo", "aceitunas", "calabaza", "berenjena", "rábanos", "ruibarbo", "coles de Bruselas", "apio", "espinacas", "espárragos" , "calabacín", "puerros", "espárragos"
    ],

    Vorrat: [
        "brot", "brötchen", "wecken", "gebäck", "laugenstangen", "toast", "brezeln", "backpulver", "vanillinzucker", "kuchen", "empolvados", "croissant", "apfeltaschen", "käsestangen", "weihnachtsgebäck", "salz", "pfeffer", "petersilie", "basilikum", "zimt", "chilipulver", "paprikapulver", "maggi", "muskatnuss", "koriander", "ankerkraut", "curry", "fenchel", "ingwer", "knoblauch", "kümmel", "lorbeer", "minze", "oregano", "rosmarin", "salbei", "schnittlauch", "wacholderbeeren", "olivenöl", "marmelade", "nutella", "honig", "soße", "bratensoße", "ketchup", "rindersoße", "rahmsoße", "bechamelsoße", "hollandaise", "tomatensoße", "mayonnaise", "ravioli", "dosenwurst", "bohnen", "tütensuppen", "tütensuppe", "erbsen", "getrocknete tomaten", "sardinen", "nudeln", "spaghetti", "makkaroni", "fusilli", "penne", "rigatoni", "gnocchi", "tortellini", 
        "bread", "buns", "wakening", "pastry", "pretzel sticks", "toast", "pretzels", "baking powder", "vanillin sugar", "cake", "empolvados", "croissant" , "cheese sticks", "Christmas biscuits", "salt", "pepper", "parsley", "basil", "cinnamon", "chili powder", "paprika powder", "maggi", "nutmeg", " coriander", "anchor herb", "curry", "fennel", "ginger", "garlic", "cumin", "laurel", "mint", "oregano", "rosemary", "sage", "chives" , "juniper berries", "olive oil", "jam", "nutella", "honey", "sauce", "gravy", "ketchup", "beef sauce", "bechamel sauce", "hollandaise", " tomato sauce", "mayonnaise", "ravioli", "canned sausage", "packaged soup", "packaged soup", "peas", "dried tomatoes", "sardines", "noodles", "spaghetti", "macaroni ", "fusilli", "penne", "rigatoni", "gnocchi", "tortellini",
        "pain", "brioches", "réveil", "pâtisserie", "bâtonnets de bretzel", "toast", "bretzels", "levure chimique", "sucre vanillé", "gâteau", "empolvados", "croissant" , "bâtonnets de fromage", "biscuits de Noël", "sel", "poivre", "persil", "basilic", "cannelle", "poudre de chili", "poudre de paprika", "maggi", "noix de muscade", "coriandre", "herbe aux anchois", "curry", "fenouil", "gingembre", "ail", "cumin", "laurier", "menthe", "origan", "romarin", "sauge", "ciboulette", "baies de genièvre", "huile d'olive", "confiture", "nutella", "miel", "sauce", "jus de viande", "ketchup", "sauce au boeuf", "sauce béchamel", "hollandaise", "sauce tomate", "mayonnaise", "ravioli", "saucisse en conserve", "soupe conditionnée", "soupe conditionnée", "petits pois", "tomates séchées", "sardines", "nouilles", "spaghetti", "macaroni", "fusilli", "penne", "rigatoni", "gnocchi", "tortellini",
        "pan", "bollos", "despertar", "pastelería", "palitos de pretzel", "tostadas", "pretzels", "polvo para hornear", "azúcar vainillina", "torta", "empolvados", "croissant" , "palitos de queso", "galletas navideñas", "sal", "pimienta", "perejil", "albahaca", "canela", "chile en polvo", "paprika en polvo", "maggi", "nuez moscada", " cilantro", "hierba de ancla", "curry", "hinojo", "jengibre", "ajo", "comino", "laurel", "menta", "orégano", "romero", "salvia", "cebollino ", "bayas de enebro", "aceite de oliva", "mermelada", "nutella", "miel", "salsa", "gravy", "ketchup", "salsa de ternera", "salsa bechamel", "holandesa", " salsa de tomate", "mayonesa", "ravioli", "salchicha enlatada", "sopa envasada", "sopa envasada", "guisantes", "tomates secos", "sardinas", "fideos", "espaguetis", " macarrones", "fusilli", "penne", "rigatoni", "ñoquis", "tortellini"
    ],

    Getränke: [
        "bier", "wasser", "saft", "orangensaft", "alkohol", "kinderpunsch", "glühwein", "sprudel", "spezi", "fanta", "cola", "capri sonne", "energy drink", "traubensaft", "redbull", "durstlöscher", "sprite", "wein", "wodka", "rotwein", "weißwein", "roséwein", "schnaps", "gin tonic", 
        "beer", "water", "juice", "orange juice", "alcohol", "kids' punch", "special", "fanta", "coke", "energy drink", "grape juice", "redbull", "thirst quencher", "sprite", "wine", "vodka", "schnapps", "gin tonic",
        "bière", "eau", "jus", "jus d'orange", "alcool", "punch enfant", "spécial", "fanta", "coca", "boisson énergisante", "jus de raisin", " redbull", "désaltérant", "sprite", "vin", "vodka", "schnaps", "gin tonic",
        "cerveza", "agua", "jugo", "jugo de naranja", "alcohol", "ponche para niños", "especial", "fanta", "coca cola", "bebida energética", "jugo de uva", " redbull", "apagador de la sed", "sprite", "vino", "vodka", "schnapps", "gin tonic"
    ],

    Haushalt: [
        "waschmittel", "spülmittel", "zahnpasta", "duschgel", "zahnbürste", "zahnbürsten", "handseife", "seife", "lappen", "deo", "gel", "wachs", "rasierer", "kamm", "duschseife", "handtuch", "handtücher", "parfüm", "salbe", "creme", "stifte", "stift", "füller", "patronen", "ordner", "schnellhefter", "tintenkiller", "schere", "kleber", "flüssigkleber", "ordner", "bleistift", "lineal", "geodreieck", "spitzler", "block", "computer", "handy", "iphone", "maus", "tastatur", "monitor", "led kette", "kamera", "mikrofon", "mikro", "headset", "lampe", "telefon", "ladegerät",
        "detergent", "dishwashing liquid", "toothpaste", "shower gel", "toothbrush", "soap", "rag", "deodorant", "gel", "wax" , "razor", "comb", "towel", "perfume", "ointment", "pen", "cartridges", " folder", "fast stapler", "inkkiller", "scissors", "glue", "liquid glue", "folder", "pencil", "ruler", "set triangle", "spitzler", "pad", "computer" , "mobile phone", "iphone", "mouse", "keyboard", "monitor", "led chain", "camera", "microphone", "micro", "headset", "lamp", "phone", "charger",
        "détergent", "liquide vaisselle", "dentifrice", "gel douche", "brosse à dents", "savon", "chiffon", "déodorant", "gel", "cire", "rasoir", "peigne", "serviette", "parfum", "pommade", "stylo", "cartouches", "plieuse", "agrafeuse rapide", "encreur", "ciseaux", "colle", "colle liquide", "plieuse", "crayon", "règle", "set triangle", "spitzler", "pad", "ordinateur", "téléphone portable", "iphone", "souris", "clavier", "moniteur", "chaîne led" , "appareil photo", "microphone", "micro", "casque", "lampe", "téléphone", "chargeur",
        "detergente", "líquido para lavar platos", "pasta de dientes", "gel de ducha", "cepillo de dientes", "jabón", "trapo", "desodorante", "gel", "cera", "maquinilla de afeitar", "peine", "toalla", "perfume", "ungüento", "bolígrafo", "cartuchos", "carpeta", "grapadora rápida", "matatintas", "tijeras", "pegamento", "pegamento líquido", "carpeta", "lápiz", "regla", "set triángulo", "spitzler", "pad", "computadora", "teléfono móvil", "iphone", "ratón", "teclado", "monitor", "cadena led" , "cámara", "micrófono", "micro", "auriculares", "lámpara", "teléfono", "cargador"
    ],

    Süßigkeiten: [
        "nimm2", "haribo", "gummibärchen", "schokolade", "twixx", "smarties", "mars", "chips", "m&m's", "snickers", "toblerone", "donuts", "kinder schokolade", "giotto", "lollis", "duplo", "oreo", "trolliwürmer", "kaugummis", "ritter sport schokolade", "ahoi brause", "esspapier", "rittersport schokolade",
        "haribo", "gummy bears", "chocolate", "twixx", "smarties", "mars", "chips", "m&m's", "snickers", "toblerone", "donuts", "giotto", "lollipops", "duplo", "oreo", "chewing gum", "ahoi fizzy", "edible paper",
        "haribo", "gummy bears", "chocolate", "twixx", "smarties", "mars", "chips", "m&m's", "snickers", "toblerone", "donuts", "giotto", " sucettes", "duplo", "oreo", "chewing gum", "ahoi fizzy", "papier comestible",
        "haribo", "ositos de goma", "chocolate", "twixx", "smarties", "mars", "chips", "m&m's", "snickers", "toblerone", "donuts", "giotto", " piruletas", "duplo", "oreo", "chicle", "ahoi gaseosas", "papel comestible"
    ],
}

// Stringify categories for Supabase

export const stringifyCategories = () => {
    let categorieList = Object.keys(categories);
    let JSONCategories = {};

    categorieList.forEach(category => {
        JSONCategories[category] = [...new Set(categories[category])];
    });

    console.log(JSON.stringify(JSONCategories));
}