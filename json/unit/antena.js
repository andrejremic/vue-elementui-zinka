{
  "name":"Antena",
  "help":"# Predloga za vnos antene. \n",
  "json": [
    {
      "type": "select",
      "id": "oznaka",
      "label": "oznaka",
      "default": "antm",
      "options": [
        {"label": "antm", "value": "antm"},
        {"label": "antu", "value": "antu"},
        {"label": "antv", "value": "antv"},
        {"label": "ants", "value": "ants"},
        {"label": "antr", "value": "antr"}
      ],
      "rules": [
        {
          "required": true
        }
      ],
      "help": "Izberi ustrezno oznako: \n  * antm: mikrovalovna antena\n  * antu: uhf antena\n  * antv: vhf antena\n  * ants: satelitska antena\n  * antr: spremejna (rx) antena."
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
      "id": "oznaka",
      "label": "oznaka",
      "rules": [
        {
          "required": false
        }
      ],
      "help": "Vpiši oznako antene."
    },
    {
      "type": "input",
      "id": "smer",
      "label": "smer",
      "rules": [
        {
          "required": false
        }
      ],
      "help": "Vpiši kam je antena usmerjena (npr. KRVA, elevacija?, azimut?)."
    },
    {
      "type": "input",
      "id": "visina_montaze",
      "label": "višina montaže",
      "rules": [
        {
          "required": false
        }
      ],
      "help": "Vpiši višino montaže od tal."
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
    }
  ]
}

