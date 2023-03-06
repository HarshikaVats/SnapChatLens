var alphabets = []
var questionNum = ""
var questionIndex = 0
var totalAnsLength = 0
var livesLost = 0

//script.getSceneObject().getChild(9).getComponent('Component.AudioComponent').play(1)

alphabets = ["A","B","C","D","E","F","G","H","I","J"]

global.sessionScore = 0

global.enableInstruction = function() {    
    script.getSceneObject().getChild(6).enabled = false
    script.getSceneObject().getChild(7).enabled = true
}

global.enableGame = function() {
    
    script.getSceneObject().getChild(8).getChild(0).getComponent('Component.Text').text = "SS:  "+sessionScore
    script.getSceneObject().getChild(8).enabled = true   
    
    script.getSceneObject().getChild(6).enabled = false
    script.getSceneObject().getChild(7).enabled = false
    script.getSceneObject().getChild(0).enabled = true
    script.getSceneObject().getChild(2).enabled = true
    script.getSceneObject().getChild(3).enabled = true
    initPatSection()
}

global.reInitGame = function() {
    script.getSceneObject().getChild(0).enabled = true
    script.getSceneObject().getChild(2).enabled = true
    script.getSceneObject().getChild(3).enabled = true    
    
    script.getSceneObject().getChild(1).enabled = false
    script.getSceneObject().getChild(2).enabled = false
    
    initPatSection()
}

function updateScores(ss) {
    // for -ve points, I have to check whether adding the same won't make the overall score negative   
    if(ss + sessionScore >= 0) {
        sessionScore = sessionScore + ss
    }
    
    //updating the visual scores also
    script.getSceneObject().getChild(8).getChild(0).getComponent('Component.Text').text = "SS:  "+sessionScore
}

global.placeObject = {
    0: {
        played: 0,
        qa1: {
            hint: 'Pyramid of Tirana',
            ans: 'Albania',
            option: 'Afghanistan',
            brief: 'Tirana is the capital city of Albania'
        },
        qa2: {
            hint: 'Sahara desert',
            ans: 'Algeria',
            option: 'Andorra',
            brief: 'Sahara is the hottest desert in the world'
        },
        qa3: {
            hint: 'Land of fire',
            ans: 'Azerbaijan',
            option: 'Argentina',
            brief: 'Azer means fire & that is why Azerbaijan is called Land Of Fire'
        }
    },
    1: {
        played: 0,
        qa1: {
            hint: 'Tree of life',
            ans: 'Bahrain',
            option: 'Bangladesh',
            brief: '400 years old tree that spans accorss 9.75 metres'
        },
        qa2: {
            hint: 'Pankcake week',
            ans: 'Belarus',
            option: 'Barbados',
            brief: 'Pancake week / Maslenitsa is a traditional russian festival'
        },
        qa3: {
            hint: 'Okavango delta',
            ans: 'Botswana',
            option: 'Brazil',
            brief: 'Okavango delta is a vast inland river delta in Botswana'
        }
    },
    2: {
        played: 0,
        qa1: {
            hint: 'Easter island',
            ans: 'Chile',
            option: 'Chad',
            brief: 'Easter island is one of the most remote islands in the world'
        },
        qa2: {
            hint: 'Liquid rainbow',
            ans: 'Colombia',
            option: 'Comoros',
            brief: 'Liquid rainbow coloration is attributed to a weed named Macarenia Clavigera'
        },
        qa3: {
            hint: 'Goddess of love',
            ans: 'Cyprus',
            option: 'Czechia',
            brief: 'Goddess of love is also known as Aphrodite'
        }
    },
    3: {
        played: 0,
        qa1: {
            hint: 'Folketinget',
            ans: 'Denmark',
            option: 'Dominica',
            brief: 'Folketinget is the parliament of Denmark'
        },
        qa2: {
            hint: 'Colorado',
            ans: 'Denver',
            option: 'Dallas'
        },
        qa3: {
            hint: 'India Gate',
            ans: 'Delhi',
            option: 'Dehradun',
            brief: 'India Gate is one of the largest wargraves of soldiers killed in first world war'
        }
    },
    4: {
        played: 0,
        qa1: {
           hint: 'Galapogas island',
            ans: 'Ecuador',
            option: 'Eristrea'
        },
        qa2: {
           hint: 'Giza',
            ans: 'Egypt',
            option: 'El Salvador'
        }, 
        qa3: {
           hint: 'Online voting',
            ans: 'Estonia',
            option: 'Eswatini'
        }
    },
    5: {
        played: 0,
        qa1: {
           hint: 'Kava drink',
            ans: 'Figi',
            option: 'Finland'
        },
        qa2: {
           hint: 'Mainhattan',
            ans: 'Frankfurt',
            option: 'France',
            brief: 'Frankfurt is known as Mianhattan since it is located along the river MAINE and has some skyscrapers'
        }, 
        qa3: {
           hint: 'Sunshine state',
            ans: 'Florida',
            option: 'Foggia'
        }
    }, 
    6: {
        played: 0,
        qa1: {
           hint: 'Dolphin',
            ans: 'Greece',
            option: 'Ghana',
            brief: 'Dolphin is the national animal of Greece'
        },
        qa2: {
           hint: 'Football',
            ans: 'Germany',
            option: 'Guana'
        }, 
        qa3: {
           hint: '12 climate zones',
            ans: 'Georgia',
            option: 'Gambia'
        }
    }, 
    7: {
        played: 0,
        qa1: {
           hint: 'Forint',
            ans: 'Hungary',
            option: 'Haiti',
            brief: 'Forint is the currency of Hungary'
        },
        qa2: {
           hint: 'Residence of Pope',
            ans: 'Holy See',
            option: 'Honduras'
        }, 
        qa3: {
           hint: 'Charminar',
            ans: 'Hyderabad',
            option: 'Himachal'
        }
    },
    8: {
        played: 0,
        qa1: {
           hint: 'Largest democracy',
            ans: 'India',
            option: 'Iran'
        },
        qa2: {
           hint: 'Jujube',
            ans: 'Israel',
            option: 'Iceland',
            brief: 'Jujube is the oldest tree in Israel aging around 1500 - 2000 years'
        }, 
        qa3: {
           hint: 'Largest archipelago',
            ans: 'Indonesia',
            option: 'Italy',
            brief: 'Archipelago is a group of islands & the see around them'
        }
    }, 
    9: {
        played: 0,
        qa1: {
           hint: 'Oldest business',
            ans: 'Japan',
            option: 'Jeddah',
            brief: 'Kongo Gumi, situated in Japan, is the oldest operating business in the world'
        },
        qa2: {
           hint: 'Petra',
            ans: 'Jordan',
            option: 'Jakarta'
        }, 
        qa3: {
           hint: 'Ackee & Saltfish',
            ans: 'Jamaica',
            option: 'Juba',
            brief: 'Ackee & Saltfish is the national dish of Jamaica'
        }
    }
//    10: {
//        played: 0,
//        qa1: {
//           hint: 'Massai Mara Reserve',
//            ans: 'Kenya',
//            option: 'Kiribati'
//        },
//        qa2: {
//           hint: '0 UNESCO sites',
//            ans: 'Kuwait',
//            option: 'Kiribati'
//        }, 
//        qa3: {
//           hint: 'Medeo',
//            ans: 'Kazakhstan',
//            option: 'Kyrgyzstan',
//            brief: 'Medeo is the highest mountain skating rink in the world situated in Kazakhstan'
//        }
//    },
//    11: {
//        played: 0,
//        qa1: {
//           hint: 'Richest country',
//            ans: 'Luxembuorg',
//            option: 'Laos'
//        },
//        qa2: {
//           hint: 'Semitic origin',
//            ans: 'Lebanon',
//            option: 'Lesotho',
//            brief: 'The word LBN means white which refers to the snow capped mount lebanon'
//        }, 
//        qa3: {
//           hint: 'Basketball',
//            ans: 'Lithuania',
//            option: 'Lebanon',
//            brief: 'Basketball is the national sport of Lithuania'
//        }
//    },
//    12: {
//        played: 0,
//        qa1: {
//           hint: 'Prickly Pear',
//            ans: 'Malta',
//            option: 'Madagascar',
//            brief: 'Prickly Pear is the national fruit of Malta'
//        },
//        qa2: {
//           hint: 'Dodo',
//            ans: 'Mauritius',
//            option: 'Mongolia',
//            brief: 'Mauritius was the onlt habitat of DODO'
//        }, 
//        qa3: {
//           hint: 'Food capital',
//            ans: 'Malaysia',
//            option: 'Mexico'
//        }
//    }, 
//    13: {
//        played: 0,
//        qa1: {
//           hint: 'Ceiling of the world',
//            ans: 'Nepal',
//            option: 'North Korea'
//        },
//        qa2: {
//           hint: 'Land of midnight sun',
//            ans: 'Norway',
//            option: 'Nauru',
//            brief: 'As the sun never dips btw late May & July, norway is known as Land of Midnight Sun'
//        }, 
//        qa3: {
//           hint: 'Steepest street',
//            ans: 'New Zealand',
//            option: 'Netherlands',
//            brief: 'Baldwin street is the steepest street in New Zealand in the world with a slope of 19 degrees'
//        }
//    },
//    14: {
//        played: 0,
//        qa1: {
//           hint: 'Pearl of Arabia',
//            ans: 'Oman',
//            option: 'Oakland'
//        },
//        qa2: {
//           hint: 'Wright brothers',
//            ans: 'Ohio',
//            option: 'Oklahoma'
//        }, 
//        qa3: {
//           hint: 'Universal studios',
//            ans: 'Omaha',
//            option: 'Orlando'
//        }
//    } 
}

global.animalObject = {
    0: {
        qa1: {
            hint: 'Hardworking',
            ans: 'Ant',
            option: 'Antelope'
        },
        qa2: {
            hint: 'Largest wingpan',
            ans: 'Albatross',
            option: 'Armadillo'
        },
        qa3: {
            hint: 'Frog with teeth',
            ans: 'Bullfrog',
            option: 'Clawed frog'
        }
    },
    1: {
        qa1: {
            hint: 'Omnivore',
            ans: 'Bear',
            option: 'Buffalo'
        },
        qa2: {
            hint: 'Echolocation',
            ans: 'Bat',
            option: 'Bug'
        },
        qa3: {
            hint: 'Sharp vision',
            ans: 'Bald eagle',
            option: 'Butterfly'
        }
    },
    2: {
        qa1: {
            hint: 'Changes color',
            ans: 'Chamelon',
            option: 'Crocodile'
        },
        qa2: {
            hint: 'Fastest mammal',
            ans: 'Cheetah',
            option: 'Cape lion'
        },
        qa3: {
            hint: 'Poisonous',
            ans: 'Cobra',
            option: 'Cat'
        }
    },
    3: {
        qa1: {
            hint: 'Staggered horns',
            ans: 'Deer',
            option: 'Duck'
        },
        qa2: {
            hint: 'Dumb',
            ans: 'Donkey',
            option: 'Dolphin'
        },
        qa3: {
            hint: 'Cannot Fly',
            ans: 'Dog',
            option: 'Dragonfly'
        }
    },
    4: {
        played: 0,
        qa1: {
           hint: 'Invertebrate',
            ans: 'Earthworm',
            option: 'Earwig'
        },
        qa2: {
           hint: 'Swims backward',
            ans: 'Eel',
            option: 'Elk'
        }, 
        qa3: {
           hint: 'Smartest animal',
            ans: 'Elephant',
            option: 'Eider'
        }
    },
    5: {
        played: 0,
        qa1: {
           hint: 'Parasite',
            ans: 'Flea',
            option: 'Flounder'
        },
        qa2: {
           hint: 'Bird',
            ans: 'Flamingo',
            option: 'Firefly'
        }, 
        qa3: {
           hint: 'Solitary animal',
            ans: 'Fox',
            option: 'Fisher cat'
        }
    },
    6: {
        played: 0,
        qa1: {
           hint: 'Longest animal',
            ans: 'Giraffe',
            option: 'Gazelle'
        },
        qa2: {
           hint: 'Scales',
            ans: 'Gharial',
            option: 'Goat'
        }, 
        qa3: {
           hint: 'Unique fingerprints',
            ans: 'Gorilla',
            option: 'Gibbon'
        }
    },
    7: {
        played: 0,
        qa1: {
           hint: 'Dye their bills',
            ans: 'Hornbill',
            option: 'Heron'
        },
        qa2: {
           hint: 'Spines',
            ans: 'Hedgehog',
            option: 'Horse'
        }, 
        qa3: {
           hint: 'Husk',
            ans: 'Hare',
            option: 'Hyena',
            brief: 'A group of hare is called a HUSK'
        }
    },
    8: {
        played: 0,
        qa1: {
           hint: 'Climb cliffs',
            ans: 'Ibex',
            option: 'Ibis'
        },
        qa2: {
           hint: 'Antelope',
            ans: 'Impala',
            option: 'Indri'
        }, 
        qa3: {
           hint: 'Peneal gland',
            ans: 'Iguana',
            option: 'Iberian frog',
            brief: 'Iguana has a peneal gland which is a photosensory organ'
        }
    },
    9: {
        played: 0,
        qa1: {
           hint: 'Rodent',
            ans: 'Jerboa',
            option: 'Jackdaw'
        },
        qa2: {
           hint: 'Panthara onca',
            ans: 'Jaguar',
            option: 'Jackal'
        }, 
        qa3: {
           hint: 'No brain',
            ans: 'Jellyfish',
            option: 'Javanese'
        }
    },
//    10: {
//        played: 0,
//        qa1: {
//           hint: 'Good sense of smell',
//            ans: 'Kiwi',
//            option: 'Kudu'
//        },
//        qa2: {
//           hint: 'Stands on tail',
//            ans: 'Kangaroo',
//            option: 'Kiko goat'
//        }, 
//        qa3: {
//           hint: 'Venomous',
//            ans: 'King cobra',
//            option: 'Kingfisher'
//        }
//    },
//    11: {
//        played: 0,
//        qa1: {
//           hint: 'Songbird',
//            ans: 'Lyrebird',
//            option: 'Loon'
//        },
//        qa2: {
//           hint: 'Vampire fish',
//            ans: 'Lamprey',
//            option: 'Leech'
//        }, 
//        qa3: {
//           hint: 'Resides in Arctic',
//            ans: 'Lemming',
//            option: 'Lemur'
//        }
//    },
//    12: {
//        played: 0,
//        qa1: {
//           hint: 'Parliament',
//            ans: 'Magpies',
//            option: 'Manatee',
//            brief: 'A group of magpies is called a Parliament'
//        },
//        qa2: {
//           hint: 'Cheek pouches',
//            ans: 'Mandrill',
//            option: 'Mealybug'
//        }, 
//        qa3: {
//           hint: 'Species of goat',
//            ans: 'Markhor',
//            option: 'Mule'
//        }
//    },
//    13: {
//        played: 0,
//        qa1: {
//           hint: 'Salamander family',
//            ans: 'Newt',
//            option: 'Nematodes'
//        },
//        qa2: {
//           hint: 'Melodious voice',
//            ans: 'Nightangle',
//            option: 'Nubian goat'
//        }, 
//        qa3: {
//           hint: 'Dog',
//            ans: 'Newfoundland',
//            option: 'Neanderthal'
//        }
//    },
//    14: {
//        played: 0,
//        qa1: {
//           hint: 'Largest egg',
//            ans: 'Ostrich',
//            option: 'Owl'
//        },
//        qa2: {
//           hint: 'Noise makers',
//            ans: 'Olters',
//            option: 'Osprey'
//        }, 
//        qa3: {
//           hint: 'Painted leopards',
//            ans: 'Occlots',
//            option: 'Oryx'
//        }
//    }
}
    
global.thingObject = {
    0: {
        qa1: {
            hint: 'Good for health',
            ans: 'Apple',
            option: 'Aspirin'
        },
        qa2: {
            hint: 'Measuring unit',
            ans: 'Angle',
            option: 'Angel'
        },
        qa3: {
            hint: 'Metal',
            ans: 'Aluminium',
            option: 'Agar Agar'
        }
    },
    1: {
        qa1: {
            hint: 'JS compiler',
            ans: 'Babel',
            option: 'Babble'
        },
        qa2: {
            hint: 'For Sleeping',
            ans: 'Bed',
            option: 'Bad'
        },
        qa3: {
            hint: 'Taste',
            ans: 'Bitter',
            option: 'Butter'
        }
    },
    2: {
        qa1: {
            hint: 'Clicking Pics',
            ans: 'Camera',
            option: 'Crayon'
        },
        qa2: {
            hint: "Fastest memory",
            ans: 'Cache',
            option: 'Cash'
        },
        qa3: {
            hint: 'Saucer',
            ans: 'Cup',
            option: 'Cap'
        }
    },
    3: {
        qa1: {
            hint: 'Erasing',
            ans: 'Duster',
            option: 'Drum'
        },
        qa2: {
            hint: 'Precious Stone',
            ans: 'Diamond',
            option: 'Dynamite'
        },
        qa3: {
            hint: 'Body Part',
            ans: 'Diaphragm',
            option: 'Dimples'
        }
    },
    4: {
        played: 0,
        qa1: {
           hint: 'Cornea',
            ans: 'Eye',
            option: 'Ear'
        },
        qa2: {
           hint: 'Polymer',
            ans: 'Epoxy',
            option: 'Epoch'
        }, 
        qa3: {
           hint: 'Drawing',
            ans: 'Easel',
            option: 'Erget'
        }
    },
    5: {
        played: 0,
        qa1: {
           hint: 'Clothing material',
            ans: 'Flannel',
            option: 'Falchion'
        },
        qa2: {
           hint: 'Water',
            ans: 'Faucet',
            option: 'Fleabane'
        }, 
        qa3: {
           hint: 'Ocean depth',
            ans: 'Fathometer',
            option: 'Fraxinus'
        }
    },
    6: {
        played: 0,
        qa1: {
           hint: 'Glove',
            ans: 'Gauntlet',
            option: 'Gobbler',
            brief: 'Gobbler is a male turkey & gauntlet is a leather glove'
        },
        qa2: {
           hint: 'Instrument',
            ans: 'Gravimeter',
            option: 'Gauze',
            brief: 'Gravimeter measures gravitational field'
        }, 
        qa3: {
           hint: 'Dish',
            ans: 'Guacamole',
            option: 'Gateleg',
            brief: 'Guacamole is a dish and gateleg is a table leg'
        }
    },
    7: {
        played: 0,
        qa1: {
           hint: 'Insect',
            ans: 'Hornet',
            option: 'Hyrax',
            brief: 'Hornet is a flying insect & hyrax is a rock rabit'
        },
        qa2: {
           hint: 'Armour',
            ans: 'Hauberk',
            option: 'Hearth',
            brief: 'Hearth is a fireplace & hauberk is a neck & shoulder armour'
        }, 
        qa3: {
           hint: 'Inn for students',
            ans: 'Hostel',
            option: 'Hotel'
        }
    },
    8: {
        played: 0,
        qa1: {
           hint: 'Frozen water',
           ans: 'Iceicle',
           option: 'Iglu'
        },
        qa2: {
           hint: 'Small island',
           ans: 'Isle',
           option: 'Impeller',
           brief: 'Isle is a small island & impeller is a rotor to increase pressure flow'
        }, 
        qa3: {
           hint: 'Fragnance',
           ans: 'Incense',
           option: 'Inlay'
        }
    },
    9: {
        played: 0,
        qa1: {
           hint: 'Precious',
           ans: 'Jewellery',
           option: 'Jar'
        },
        qa2: {
           hint: 'Tool',
           ans: 'Jigsaw',
           option: 'Jetliner',
        }, 
        qa3: {
           hint: 'Statue',
           ans: 'Joss',
           option: 'Jerkin',
            brief: 'Joss is a chinese religious statue & jerkin is a sleveless jacket'
        }
    }
//    10: {
//        played: 0,
//        qa1: {
//           hint: 'Optical toy',
//           ans: 'Kaleidoscope',
//           option: 'Kaon'
//        },
//        qa2: {
//           hint: 'Church',
//           ans: 'Kirk',
//           option: 'Kernel',
//        }, 
//        qa3: {
//           hint: 'Soldiers',
//           ans: 'Knight',
//           option: 'Knit'
//        }
//    },
//    11: {
//        played: 0,
//        qa1: {
//           hint: 'Edible',
//           ans: 'Lentils',
//           option: 'Lumber'
//        },
//        qa2: {
//           hint: 'Spoon',
//           ans: 'Ladle',
//           option: 'Lectern',
//        }, 
//        qa3: {
//           hint: 'Chemicals',
//           ans: 'Laboratory',
//           option: 'Lavatory'
//        }
//    },
//    12: {
//        played: 0,
//        qa1: {
//           hint: 'Place to stay',
//           ans: 'Mansion',
//           option: 'Mention'
//        },
//        qa2: {
//           hint: 'Insect',
//           ans: 'Moth',
//           option: 'Moose',
//        }, 
//        qa3: {
//           hint: 'Tree',
//           ans: 'Maple',
//           option: 'Machete'
//        }
//    },
//    13: {
//        played: 0,
//        qa1: {
//           hint: 'Writing',
//           ans: 'Notepad',
//           option: 'Needle'
//        },
//        qa2: {
//           hint: 'Ornament',
//           ans: 'Necklace',
//           option: 'Nylon',
//        }, 
//        qa3: {
//           hint: 'Body part',
//           ans: 'Nail',
//           option: 'Napkin'
//        }
//    },
//    14: {
//        played: 0,
//        qa1: {
//           hint: 'Gas',
//           ans: 'Oxygen',
//           option: 'Ozone'
//        },
//        qa2: {
//           hint: 'Tree',
//           ans: 'Oak',
//           option: 'Oasis',
//        }, 
//        qa3: {
//           hint: 'Music',
//           ans: 'Opera',
//           option: 'Oval'
//        }
//    }
}

const facts = [
    "Founded in 2011 by Evan Spiegel, Reggie Brown, Bobby Murphy", 
    "All 3 of the founders were from STANFORD UNIVERSITY",
    "PICABOO was the precursor to Snapchat",
    "Relaunced the company as Snapchat in Sept 2011",
    "In 2013, Snapchat introduced Stories & Chats",
    "Available in 37 languages", 
    "In Sept 2016, Snapchat rebranded to Snap Inc.",
    "4.36.1 is the latest version of Lens Studio", 
    "Based on Ephemeral Content Marketing", 
    "Snapchat mascot is GhostFace chillah"
]

global.checkAns = "false"
global.placeAns = ""
global.animalAns = ""
global.thingAns = ""

global.touchSystem.touchBlocking = false

function resetSelection(type, number) {
    var res    
    switch(type) {
        case 'place':
            res = script.getSceneObject().getChild(0).getChild(4).getChild(number).getComponent("Component.Text")
            break;
        
        case 'animal':
            res = script.getSceneObject().getChild(0).getChild(5).getChild(number).getComponent("Component.Text")
            break;
        
        case 'thing':
            res = script.getSceneObject().getChild(0).getChild(6).getChild(number).getComponent("Component.Text")
            break;
    }
    return res
}

global.highlightInput = function(component, variant) {
    var variantNumber = parseInt(variant.split(" ")[1])
    var variantType = variant.split(" ")[0]
    
    var childToBeLowerCased = variantNumber == 1 ? 1 : 0    
    var childToBeLowerCasedText = ''
    
    if(variantType == "place") {
        childToBeLowerCasedObject = resetSelection("place", childToBeLowerCased)
    } else if(variantType == "animal") {
        childToBeLowerCasedObject = resetSelection("animal", childToBeLowerCased)
    } else {
        childToBeLowerCasedObject = resetSelection("thing", childToBeLowerCased)
    }
    
    childToBeLowerCasedObject.text = childToBeLowerCasedObject.text.charAt(0).toUpperCase()+childToBeLowerCasedObject.text.slice(1, childToBeLowerCasedObject.text.length).toLowerCase()
    component.text = component.text.toUpperCase()
}

global.submitAns = function() {
    if(placeAns.text != undefined) {
        placeAns = placeAns.text 
    }
    if(animalAns.text != undefined) {
        animalAns = animalAns.text
    }
    if(thingAns.text != undefined) {
        thingAns = thingAns.text  
    }
    
    if((global.placeAns+global.animalAns+global.thingAns).split("undefined")[0].length >= totalAnsLength) { 
        if(
            global.placeAns.toLowerCase() == placeObject[questionIndex]["qa"+(questionNum+1).toString()].ans.toLowerCase() && 
            global.animalAns.toLowerCase() == animalObject[questionIndex]["qa"+(questionNum+1).toString()].ans.toLowerCase() &&
            global.thingAns.toLowerCase() == thingObject[questionIndex]["qa"+(questionNum+1).toString()].ans.toLowerCase()
        ) {
            
            // increasing the played property so that the user don't sees/visits the questions again
            placeObject[questionIndex].played++;
            
            //playing the clpas sound
            script.getSceneObject().getChild(4).getComponent('Component.AudioComponent').play(1)

            // incrementing the global and session scores
            if(livesLost == 0) {
                updateScores(3)
            } else if(livesLost == 1) {
                updateScores(2)
            } else if(livesLost == 2) {
                updateScores(1)
            }
            
            print(placeObject)
            
            //disable the pat section
            script.getSceneObject().getChild(0).enabled = false
            script.getSceneObject().getChild(3).enabled = false        
            
            script.getSceneObject().getChild(1).enabled = true
            script.getSceneObject().getChild(2).getChild(0).enabled = true
            
            var patObject = [placeObject, animalObject, thingObject]
            var briefPlace = patObject[0][questionIndex]["qa"+(questionNum+1).toString()].brief            
            var briefAnimal = patObject[1][questionIndex]["qa"+(questionNum+1).toString()].brief        
            var briefThing = patObject[2][questionIndex]["qa"+(questionNum+1).toString()].brief            
            
            // will choose one of the 10 facts randomly        
            var factIndex = Math.floor(Math.random()*10)
            print(factIndex)
            
            script.getSceneObject().getChild(1).enabled = true
            script.getSceneObject().getChild(2).enabled = true
            
            if(briefPlace == undefined && briefAnimal == undefined && briefThing == undefined) {
                script.getSceneObject().getChild(2).getChild(0).getComponent('Component.Text').text = facts[factIndex]   
            } else if(briefPlace != undefined) {
                script.getSceneObject().getChild(2).getChild(0).getComponent('Component.Text').text = briefPlace
            } else if(briefAnimal != undefined) {
                script.getSceneObject().getChild(2).getChild(0).getComponent('Component.Text').text = briefAnimal
            } else if(briefThing != undefined) {
                script.getSceneObject().getChild(2).getChild(0).getComponent('Component.Text').text = briefThing
            }
        }
        else {
            
            //playing the buzzer sound to inform the user that the choices are wrong
            script.getSceneObject().getChild(5).getComponent('Component.AudioComponent').play(1)
             
            // doing a -1 on the scores
            updateScores(-1)
            
            // checking in reducing one life for each wrong submission      
            livesLost++
            print(livesLost)
            if(livesLost < 3) {
                script.getSceneObject().getChild(3).getChild(3 - livesLost).enabled = false
            }
            
            placeAns = ""
            animalAns = ""
            thingAns = ""
            
            resetSelection("place",0).text = resetSelection("place",0).text.charAt(0).toUpperCase()+resetSelection("place",0).text.slice(1, resetSelection("place",0).text.length).toLowerCase()
            resetSelection("place",1).text = resetSelection("place",1).text.charAt(0).toUpperCase()+resetSelection("place",1).text.slice(1, resetSelection("place",1).text.length).toLowerCase()
            resetSelection("animal",0).text = resetSelection("animal",0).text.charAt(0).toUpperCase()+resetSelection("animal",0).text.slice(1, resetSelection("animal",0).text.length).toLowerCase()
            resetSelection("animal",1).text = resetSelection("animal",0).text.charAt(0).toUpperCase()+resetSelection("animal",1).text.slice(1, resetSelection("animal",1).text.length).toLowerCase()
            resetSelection("thing",0).text = resetSelection("thing",0).text.charAt(0).toUpperCase()+resetSelection("thing",0).text.slice(1, resetSelection("thing",0).text.length).toLowerCase()
            resetSelection("thing",1).text = resetSelection("thing",0).text.charAt(0).toUpperCase()+resetSelection("thing",1).text.slice(1, resetSelection("thing",1).text.length).toLowerCase()
        
            if(livesLost == 3) {
                livesLost = 0
                totalAnsLength = 0
                initPatSection()
            }        
        }   
    }
}

global.initPatSection = function() {
    
    placeAns = ""
    animalAns = ""
    thingAns = ""
    
    resetSelection("place",0).text = resetSelection("place",0).text.charAt(0).toUpperCase()+resetSelection("place",0).text.slice(1, resetSelection("place",0).text.length).toLowerCase()
    resetSelection("place",1).text = resetSelection("place",1).text.charAt(0).toUpperCase()+resetSelection("place",1).text.slice(1, resetSelection("place",1).text.length).toLowerCase()
    resetSelection("animal",0).text = resetSelection("animal",0).text.charAt(0).toUpperCase()+resetSelection("animal",0).text.slice(1, resetSelection("animal",0).text.length).toLowerCase()
    resetSelection("animal",1).text = resetSelection("animal",0).text.charAt(0).toUpperCase()+resetSelection("animal",1).text.slice(1, resetSelection("animal",1).text.length).toLowerCase()
    resetSelection("thing",0).text = resetSelection("thing",0).text.charAt(0).toUpperCase()+resetSelection("thing",0).text.slice(1, resetSelection("thing",0).text.length).toLowerCase()
    resetSelection("thing",1).text = resetSelection("thing",0).text.charAt(0).toUpperCase()+resetSelection("thing",1).text.slice(1, resetSelection("thing",1).text.length).toLowerCase()
    
    livesLost = 0
    totalAnsLength = 0    
    
    const screenObject = script.getSceneObject()
    screenObject.getChild(3).getChild(0).enabled = true
    screenObject.getChild(3).getChild(1).enabled = true
    screenObject.getChild(3).getChild(2).enabled = true
    
    questionIndex = Math.floor(Math.random()*10)
    
    var pairFound = false
    
    const failedNumOfTries = 10 
    while(failedNumOfTries) {
        print("Question Index: "+questionIndex)
        if(placeObject[questionIndex].played < 3) {
            pairFound = true      
            
            screenObject.getChild(0).getChild(0).getComponent('Component.Text').text = alphabets[questionIndex]                 
            
            // according to the played param, the current question (qa-1/2/3) will be chosen
            questionNum = placeObject[questionIndex].played
                        
            var option1Index = Math.floor(Math.random()*2)            
            var option2Index = option1Index == 1 ? 0 : 1            
            
            //for the place attribute        
            screenObject.getChild(0).getChild(1).getComponent('Component.Text').text = placeObject[questionIndex]["qa"+(questionNum+1).toString()].hint
            screenObject.getChild(0).getChild(4).getChild(option1Index).getComponent("Component.Text").text = placeObject[questionIndex]["qa"+(questionNum+1).toString()].ans
            screenObject.getChild(0).getChild(4).getChild(option2Index).getComponent("Component.Text").text = placeObject[questionIndex]["qa"+(questionNum+1).toString()].option 
    
            totalAnsLength += Math.min(placeObject[questionIndex]["qa"+(questionNum+1).toString()].ans.length, placeObject[questionIndex]["qa"+(questionNum+1).toString()].option.length)
            
            option1Index = Math.floor(Math.random()*2)            
            option2Index = option1Index == 1 ? 0 : 1 
            
            //for the animal attribute            
            screenObject.getChild(0).getChild(2).getComponent('Component.Text').text = animalObject[questionIndex]["qa"+(questionNum+1).toString()].hint
            screenObject.getChild(0).getChild(5).getChild(option1Index).getComponent("Component.Text").text = animalObject[questionIndex]["qa"+(questionNum+1).toString()].ans
            screenObject.getChild(0).getChild(5).getChild(option2Index).getComponent("Component.Text").text = animalObject[questionIndex]["qa"+(questionNum+1).toString()].option            
            
            totalAnsLength += Math.min(animalObject[questionIndex]["qa"+(questionNum+1).toString()].ans.length, animalObject[questionIndex]["qa"+(questionNum+1).toString()].option.length)            
            
            option1Index = Math.floor(Math.random()*2)            
            option2Index = option1Index == 1 ? 0 : 1            
            
            //for the thing attribute            
            screenObject.getChild(0).getChild(3).getComponent('Component.Text').text = thingObject[questionIndex]["qa"+(questionNum+1).toString()].hint
            screenObject.getChild(0).getChild(6).getChild(option1Index).getComponent("Component.Text").text = thingObject[questionIndex]["qa"+(questionNum+1).toString()].ans
            screenObject.getChild(0).getChild(6).getChild(option2Index).getComponent("Component.Text").text = thingObject[questionIndex]["qa"+(questionNum+1).toString()].option         
    
            totalAnsLength += Math.min(thingObject[questionIndex]["qa"+(questionNum+1).toString()].ans.length, thingObject[questionIndex]["qa"+(questionNum+1).toString()].option.length)
            print("TotalAnsLength is: "+totalAnsLength)   
            
            break 
        } else {
            questionIndex = (questionIndex + 1) % 10
            failedNumOfTries--;   
        }
    }    
    print("Num of tries: "+failedNumOfTries) 
    
    if(!pairFound) {
        script.getSceneObject().getChild(0).enabled = false
        script.getSceneObject().getChild(3).enabled = false
        script.getSceneObject().getChild(1).enabled = true
        script.getSceneObject().getChild(1).getChild(0).enabled = true
        script.getSceneObject().getChild(1).getChild(0).getComponent('Component.Text').text = "GAME OVER" 
    }
}