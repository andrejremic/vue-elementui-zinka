{
  "name":"Stolp",
  "help":"# Predloga za vnos stolpa. \n",
  "json": [
    {
      "type": "select",
      "id": "oznaka",
      "label": "oznaka",
      "default": "stp",
      "options": [
        {"label": "stp", "value": "stp"}
      ],
      "rules": [
        {
          "required": true
        }
      ],
      "help": "Izberi ustrezno oznako: \n  * stp: Stolp."
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
      "help": "Vpiši proizvajalca oz. izvajalca."
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
      "help": "Vpiši tip - PC, CB, JC, PK, B ..."
    },
    {
      "type": "input",
      "id": "konstrukcija",
      "label": "konstrukcija",
      "rules": [
        {
          "required": false
        }
      ],
      "help": "Vpiši vrsto konstrukcije."
    },
    {
      "type": "input",
      "id": "visina",
      "label": "višina",
      "rules": [
        {
          "required": false
        }
      ],
      "help": "Vpiši višino stolpa v metrih (npr. 51,6; 12; ...)."
    },
    {
      "type": "input",
      "id": "zascita",
      "label": "zaščita",
      "rules": [
        {
          "required": false
        }
      ],
      "help": "Vpiši vrsto zaščite proti koroziji (npr. cinkan, barvan ...)."
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
          "message": "Napiši nekaj o stolpu, kar bi bilo še dobro dodati.",
          "trigger": "blur"
        }
      ],
      "help": "Napiši nekaj o stolpu, kar bi bilo še dobro dodati."
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
      "help": "Vnesi datum proizvodnje oz. datum izgradnje!"
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
      "help": "Će ima kakšno številko, ki bi nakazovalo na tovarniško številko jo vpiši."
    }
  ]
}

