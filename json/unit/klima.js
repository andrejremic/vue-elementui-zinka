{
  "name":"Klima",
  "help":"# Predloga za vnos klime. \n",
  "json": [
    {
      "type": "select",
      "id": "oznaka",
      "label": "oznaka",
      "default": "klm",
      "options": [
        {
          "label": "klm",
          "value": "klm"
        }
      ],
      "rules": [
        {
          "required": true
        }
      ],
      "help": "Izberi ustrezno oznako: \n  * klm: Klima naprava."
    },
    {
      "type": "select",
      "id": "proizvajalec",
      "label": "proizvajalec",
      "options": [
        {"label": "Airwell", "value": "Airwell"},
        {"label": "Climaveneta", "value": "Climaveneta"},
        {"label": "Emerson", "value": "Emerson"},
        {"label": "Emerson Hiross", "value": "Emerson Hiross"},
        {"label": "Emerson-Vertiv", "value": "Emerson-Vertiv"},
        {"label": "Gorenje", "value": "Gorenje"},
        {"label": "Knurr-Emerson", "value": "Knurr-Emerson"},
        {"label": "Lennox-DUF", "value": "Lennox-DUF"},
        {"label": "Liebert", "value": "Liebert"},
        {"label": "Liebert Hiross", "value": "Liebert Hiross"},
        {"label": "Mc Quay", "value": "Mc Quay"},
        {"label": "Mitsubishi", "value": "Mitsubishi"},
        {"label": "Mitsubishi electric", "value": "Mitsubishi electric"},
        {"label": "Toshiba", "value": "Toshiba"},
        {"label": "Wesper", "value": "Wesper"}
      ],
      "rules": [
        {
          "required": true
        }
      ],
      "help": "Izberi proizvajalca klime."
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
      "help": "Vpiši model klime."
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
      "id": "vrsta_elektricnega_prikljucka",
      "label": "vrsta električnega priključka",
      "options": [
        {
          "label": "enofazni",
          "value": "enofazni"
        },
        {
          "label": "trofazni",
          "value": "trofazni"
        }
      ],
      "rules": [
        {
          "required": false
        }
      ],
      "help": "Koliko faz potrebuje za delovanje."
    },
    {
      "type": "select",
      "id": "vrsta_plina",
      "label": "vrsta plina",
      "options": [
        {
          "label": "R407c",
          "value": "R407c"
        },
        {
          "label": "R410a",
          "value": "R410a"
        },
        {
          "label": "R22",
          "value": "R22"
        },
        {
          "label": "R134a",
          "value": "R134a"
        }
      ],
      "rules": [
        {
          "required": false
        }
      ],
      "help": "Vrsta plina, ki ga klima vsebuje za svoje delovanje (za hlajenje)."
    },
    {
      "type": "input-number",
      "id": "hladilna_moc",
      "label": "hladilna moč v (kW)",
      "rules": [
        {
          "message": "Moč v kW",
          "required": false
        }
      ],
      "help": "Hladilna moč ni enako priključni moči."
    },
    {
      "type": "input-number",
      "id": "priključna_moc",
      "label": "el. priključna moč v (kW)",
      "rules": [
        {
          "message": "Moč v kW",
          "required": false
        }
      ],
      "help": "Priključna moč naprave v kW."
    },
    {
      "type": "input-number",
      "id": "kolicina_hladiva",
      "label": "količina hladiva v (kg)",
      "rules": [
        {
          "message": "Podatek v kg",
          "required": false
        }
      ],
      "help": "Lahko se zgodi, da tega podatka nimamo."
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
