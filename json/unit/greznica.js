{
  "name":"Greznica",
  "help":"# Predloga za vnos greznice. \n",
  "json": [
    {
      "type": "select",
      "id": "oznaka",
      "label": "oznaka",
      "default": "grez",
      "options": [
        {"label": "grez", "value": "grez"}
      ],
      "rules": [
        {
          "required": true
        }
      ],
      "help": "Izberi ustrezno oznako: \n  * grez: Greznica."
    },
    {
      "type": "input",
      "id": "tip",
      "label": "tip",
      "rules": [
        {
          "required": true
        }
      ],
      "help": "Vpiši tip - Dvoprekatna, triprekatna, zaprta, biološka ČN, ..."
    },
    {
      "type": "input",
      "id": "material",
      "label": "material",
      "rules": [
        {
          "message": "Plastika, Beton, ...",
          "required": false
        }
      ],
      "help": "Iz katerega materiala je izdelana - POZOR uporabi obstoječe, če se da."
    },
    {
      "type": "input",
      "id": "nacin_praznjenja",
      "label": "način praznjenja",
      "rules": [
        {
          "message": "Cisterna s črpalko",
          "required": false
        }
      ],
      "help": "Če ima mehanizem praznjenja ga na kratko opiši - POZOR uporabi obstoječe, če se da."
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
      "help": "Vnesi datum proizvodnje oz. datum izgradnje!"
    }
  ]
}

