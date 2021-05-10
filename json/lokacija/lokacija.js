{
  "name": "Oddajniška lokacija",
  "help":"# Predloga za vnos oddajniške lokacije. \n",
  "json": [
    {
      "type": "input",
      "id": "oznaka",
      "label": "oznaka",
      "rules": [
        {
          "required": true
        }
      ],
      "help": "Vpiši štiričrkovno oznako."
    },
    {
      "type": "input",
      "id": "polno_ime",
      "label": "polno ime",
      "rules": [
        {
          "required": true
        }
      ],
      "help": "Vpiši polno ime za lokacijo."
    },
    {
      "type": "input",
      "id": "koordinata",
      "label": "koordinata",
      "rules": [
        {
          "required": true
        }
      ],
      "help": "Vpiši koordinato lokacije v poljubnem formatu."
    },
    {
      "type": "input",
      "id": "komentar",
      "label": "komentar",
      "el": {
        "type": "textarea",
        "maxlength": 200,
        "show-word-limit": true
      },
      "rules": [
        {
          "required": false,
          "message": "Napiši nekaj o lokaciji, kar bi bilo še dobro dodati.",
          "trigger": "blur"
        }
      ],
      "help": "Napiši nekaj, kar bi bilo še dobro dodati."
    }
  ]
}
