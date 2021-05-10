{
  "name":"Svetilo",
  "help":"# Predloga za vnos svetila. \n",
  "json": [
    {
      "type": "select",
      "id": "oznaka",
      "label": "oznaka",
      "default": "svt",
      "options": [
        {"label": "svt", "value": "svt"}
      ],
      "rules": [
        {
          "required": true
        }
      ],
      "help": "Izberi ustrezno oznako: \n  * svt: Svetilo."
    },
    {
      "type": "input",
      "id": "proizvajalec",
      "label": "proizvajalec",
      "rules": [
        {
          "required": false
        }
      ],
      "help": "Vpiši proizvajalca."
    },
    {
      "type": "input",
      "id": "tip",
      "label": "tip",
      "rules": [
        {
          "required": false
        }
      ],
      "help": "Vpiši tip svetila."
    },
    {
      "type": "input",
      "id": "stevilo_svetil",
      "label": "število svetil",
      "rules": [
        {
          "required": false
        }
      ],
      "help": "Vpiši število oz. količino svetil."
    },
    {
      "type": "input",
      "id": "moc",
      "label": "moč",
      "rules": [
        {
          "required": false
        }
      ],
      "help": "Vpiši moč svetila v W. Prva številka samo eno svetilo, drugo skupno (npr. 400, 7500; 250, 1500; 125, 400 ...)."
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

