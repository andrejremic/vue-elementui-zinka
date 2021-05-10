{
  "name":"Oddajnik",
  "help":"# Predloga za vnos oddajnika. \n",
  "json": [
    {
      "type": "select",
      "id": "oznaka",
      "label": "oznaka",
      "default": "dtx",
      "options": [
        {"label": "dtx", "value": "dtx"},
        {"label": "fmtx", "value": "fmtx"}
      ],
      "rules": [
        {
          "required": true
        }
      ],
      "help": "Izberi ustrezno oznako: \n  * fmtx: fm oddajnik.\n  * dtx: digitalni oddajnik."
    },
    {
      "type": "select",
      "id": "proizvajalec",
      "label": "proizvajalec",
      "options": [
        {"label": "SIEL Broadcast s.p.a", "value": "SIEL Broadcast s.p.a"},
        {"label": "ELTI", "value": "ELTI"},
        {"label": "IMP Telekom", "value": "IMP telekom"},
        {"label": "Worldcast Ecreso", "value": "Worldcast Ecreso"},
        {"label": "Promax", "value": "Promax"},
        {"label": "r&s", "value": "r&s"}
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
      "help": "Vpiši model (npr. EXC105, EXC300GT, FM300, SKY-50W, OTVP 4/50-D)."
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
      "help": "Vpiši način delovanja oz. mode (npr. tx - 1+0, tx (1+1), tx (1+1) vodno hlajen, dd - dual drive, gf - gapfiller, mfn - pretvornik ...)."
    },
    {
      "type": "select",
      "id": "vhodna_modulacija",
      "label": "vhodna modulacija",
      "options": [
        {"label": "E1", "value": "E1"},
        {"label": "ASI", "value": "ASI"},
        {"label": "IP", "value": "IP"},
        {"label": "MPX", "value": "MPX"}
      ],
      "rules": [
        {
          "required": true
        }
      ],
      "help": "Izberi vhodno modulacijo signala katerega oddajnik potrebuje za oddajanje."
    },
    {
      "type": "select",
      "id": "maska_filtra",
      "default": "/",
      "label": "maska filtra",
      "options": [
        {"label": "/", "value": "/"},
        {"label": "kritična", "value": "kritična"},
        {"label": "nekritična", "value": "nekritična"}
      ],
      "rules": [
        {
          "required": false
        }
      ],
      "help": "Izberi masko filtra, ki je jo oddajnik ima za svoje delovanje in vpljiv na ostale frekvence."
    },
    {
      "type": "input",
      "id": "oddajna_moc",
      "label": "oddajna moč",
      "rules": [
        {
          "required": true
        }
      ],
      "help": "Vpiši moč (npr. 100W, 500W ...)."
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
      "type": "select",
      "id": "napajanje_exciter",
      "default": "/",
      "label": "napajanje exciter",
      "options": [
        {"label": "/", "value": "/"},
        {"label": "zunanji UPS", "value": "zunanji UPS"},
        {"label": "notranji UPS", "value": "notranji UPS"}
      ],
      "rules": [
        {
          "required": false
        }
      ],
      "help": "Dodatno napajanje za delovanje exciterja."
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
