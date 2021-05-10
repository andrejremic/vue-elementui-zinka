{
  "name":"Cisterna - rezervoar za tekočino",
  "help":"# Predloga za vnos cisterne oz. rezervoarja za tekočino. \n",
  "json": [
    {
      "type": "select",
      "id": "oznaka",
      "label": "oznaka",
      "default": "rzt",
      "options": [
        {"label": "rzt", "value": "rzt"}
      ],
      "rules": [
        {
          "required": true
        }
      ],
      "help": "Izberi ustrezno oznako: \n  * rzt: cisterna oz. rezervoar za tekočino."
    },
    {
      "type": "select",
      "id": "proizvajalec",
      "label": "proizvajalec",
      "options": [
        {"label": "/", "value": "/"},
        {"label": "IMP", "value": "IMP"}
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
      "help": "Vpiši vrsto rezervoarja (npr. Dvoplašni jeklen, Enoplaščni plasta ...)."
    },
    {
      "type": "input",
      "id": "volumen",
      "label": "volumen",
      "rules": [
        {
          "required": false
        }
      ],
      "help": "Prostornina rezervourja v kubišnih metrih - m3 (npr. 20, 2x10 ... )"
    },
    {
      "type": "input",
      "id": "sklediscena_tekocina",
      "label": "sklediščena tekočina",
      "rules": [
        {
          "required": true
        }
      ],
      "help": "Vrsta tekočine, ki je v rezervoarju skladiščena (npr. Kurilno olje, Euro deasel, Voda ...)"
    },
    {
      "type": "input",
      "id": "lega",
      "label": "lega",
      "rules": [
        {
          "required": false
        }
      ],
      "help": "Vpiši lego rezervoarja (npr. Ležeč, Pokončen ...)."
    },

    {
      "type": "input",
      "id": "nacin_vgradnje",
      "label": "način vgradnje",
      "rules": [
        {
          "required": false
        }
      ],
      "help": "Vpiši način vgradnje (npr. Podzemni, Nadzemni, V objektu ...)."
    },
    {
      "type": "input",
      "id": "zaščita",
      "label": "zaščita",
      "rules": [
        {
          "required": false
        }
      ],
      "help": "Zaščita okolja v primeru puščanja rezervoarja (npr. Dvoplaščni, Betonski, Kovinski ...)."
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
      "help": "Če ima rezervoar številko jo vpiši."
    }
  ]
}
