{
  "name":"Nadzorna naprava",
  "help":"# Predloga za vnos nadzornih naprav. \n",
  "json": [
    {
      "type": "select",
      "id": "oznaka",
      "label": "oznaka",
      "default": "dio",
      "options": [
        {
          "label": "dio",
          "value": "dio"
        }
      ],
      "rules": [
        {
          "required": true
        }
      ],
      "help": "Izberi ustrezno oznako: \n  * dio: Digital input output."
    },
    {
      "type": "select",
      "id": "proizvajalec",
      "label": "proizvajalec",
      "options": [
        {"label": "Barix", "value": "Barix"}
      ],
      "rules": [
        {
          "required": true
        }
      ],
      "help": "Izberi proizvajalca."
    },
    {
      "type": "input",
      "id": "model",
      "label": "model",
      "rules": [
        {
          "required": true
        }
      ],
      "help": "Vpiši model (npr. barionet 50)."
    },
    {
      "type": "input",
      "id": "nacin_delovanja",
      "label": "način delovanja",
      "rules": [
        {
          "required": false
        }
      ],
      "help": "Vpiši način delovanja oz. mode (npr. 2x digit input ...)."
    },
    {
      "type": "input",
      "id": "opis",
      "label": "opis",
      "el": {
        "type": "textarea",
        "maxlength": 200,
        "show-word-limit": true
      },
      "rules": [
        {
          "required": false,
          "message": "Napiši nekaj o napravi, kar bi bilo še dobro dodati.",
          "trigger": "blur"
        }
      ],
      "help": "Napiši nekaj o napravi, kar bi bilo še dobro dodati."
    },
    {
      "type": "date-picker",
      "id": "datum_proizvodnje",
      "label": "datum proizvodnje",
      "el": {
          "value-format": "yyyy-MM-ddT00:00:00.000+02:00",
          "type": "datetime",
          "placeholder": "izberi"
        },
      "rules": [
        {
          "required": false,
          "message": "Izberi datum.",
          "trigger": "change"
        }
      ],
      "help": "Vnesi datum proizvodnje in ne datum montaže!"
    },
    {
      "type": "select",
      "id": "osnovno_napajanje",
      "label": "osnovno napajanje",
      "options": [
        {
          "label": "AC",
          "value": "AC"
        },
        {
          "label": "DC-48V",
          "value": "DC-48V"
        }
      ],
      "rules": [
        {
          "required": true
        }
      ],
      "help": "Potrebna napetost za delovanje."
    },
    {
      "type": "switch",
      "id": "dvojno_napajanje",
      "label": "dvojno napajanje",
      "help": "Opcija za vnos dodatnega napajalnika."
    },
    {
      "type": "select",
      "id": "dodatno_napajanje",
      "label": "dodatno napajanje",
      "enableWhen": {
        "dvojno_napajanje": true
      },
      "el": {
        "clearable": true
      },
      "options": [
        {
          "label": "AC",
          "value": "AC"
        },
        {
          "label": "DC-48V",
          "value": "DC-48V"
        }
      ],
      "rules": [
        {
          "required": false
        }
      ],
      "help": "Potrebna napetost za delovanje."
    },
    {
      "type": "input",
      "id": "software_verzija",
      "label": "software verzija",
      "rules": [
        {
          "message": "Običajno ni tega podatka",
          "required": false
        }
      ],
      "help": "Če naprava ima ta podatek ga vpiši."
    },
    {
      "type": "input",
      "id": "tovarniška številka",
      "label": "tovarniška številka",
      "rules": [
        {
          "message": "NJ10894920001",
          "required": false
        }
      ],
      "help": "Običajno ima vsaka naprava serijsko številko ali številko produkta."
    },
    {
      "type": "select",
      "id": "nadzor",
      "label": "nadzor",
      "options": [
        {
          "label": "IP",
          "value": "IP"
        },
        {
          "label": "GPIO",
          "value": "GPIO"
        },
        {
          "label": "BREZ NADZORA",
          "value": "BREZ NADZORA"
        }
      ],
      "rules": [
        {
          "required": true
        }
      ],
      "help": "Izberi:\n  * IP - ima naprava svoj web vmesnik.\n  * GPIO - se nadzoruje preko druge napave (npr. Barix) - GPIO.\n  * BREZ NADZORA - ni nadzorovana."
    }
  ]
}
