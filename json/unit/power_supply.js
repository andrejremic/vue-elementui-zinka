{
  "name":"Napajalni sistem",
  "help":"# Predloga za vnos napajalnega sistema. \n",
  "json": [
    {
      "type": "select",
      "id": "oznaka",
      "label": "oznaka",
      "default": "pwr",
      "options": [
        {"label": "pwr", "value": "pwr"},
        {"label": "ups", "value": "ups"},
        {"label": "dcb", "value": "dcb"},
        {"label": "inv", "value": "inv"},
        {"label": "ats", "value": "ats"}
      ],
      "rules": [
        {
          "required": true
        }
      ],
      "help": "Izberi ustrezno oznako: \n  * pwr: 230V->48V in 230V -> 230V.\n  * ups: 230V -> 230V.\n  * dcb: 230V -> 48V.\n  *inv: invertor iz 48V->230V\n  * ats: preklopno stikalo 230V -> 230V."
    },
    {
      "type": "select",
      "id": "proizvajalec",
      "label": "proizvajalec",
      "options": [
        {"label": "Emerson/CET", "value": "Emerson/CET"},
        {"label": "Socomec", "value": "Socomec"},
        {"label": "Delta", "value": "Delta"},
        {"label": "Eltek", "value": "Eltek"},
        {"label": "Apc", "value": "Apc"}
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
      "help": "Vpiši model-"
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
      "help": "Vpiši način delovanja oz. tip naprave (npr. ???)."
    },
    {
      "type": "input",
      "id": "izhodna_moc",
      "label": "izhodna moč",
      "rules": [
        {
          "required": true
        }
      ],
      "help": "Vpiši največjo izhodno moč (npr. 4kW, 2kW ...)."
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
        {"label": "enofazno", "value": "enofazno"},
        {"label": "trofazno", "value": "trofazno"}
      ],
      "rules": [
        {
          "required": true
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
      "id": "tovarniska_stevilka",
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
