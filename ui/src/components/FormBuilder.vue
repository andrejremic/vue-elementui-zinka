<template>
  <el-main>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="form-builder-header">
          <h2>Primeri obrazcev</h2>
          <el-select
            v-model="selectValue"
            placeholder="Izberi obrazec"
            value-key="name"
            @change="handleChange">
            <el-option
              v-for="obrazec in jsonObrazci"
              :key="obrazec.name"
              :label="obrazec.name"
              :value="obrazec"/>
          </el-select>
          <el-button
            v-show="currentForm"
            type="success"
            style="float: right;"
            @click="copyForm">V urejanje ></el-button>
        </div>
        <section v-show="currentForm">
          <pre class="json">{{ currentForm }}</pre>
          <el-form-renderer
            v-if="currentForm.json"
            ref="obrazec2"
            :content="currentForm.json"
            class="form-panel"
            label-width="120px"/>
        </section>
      </el-col>
      <el-col :span="8">
        <div class="form-builder-header">
          <h2>Ustvari obrazec</h2>
          <el-link
            style="float: right;"
            type="info"
            href="https://femessage.github.io/el-form-renderer/#/Components">Pomoč -> el-form-renderer</el-link>
        </div>
        <el-input
          v-model="jsonString"
          :autosize="{ minRows: 5, maxRows: 40}"
          type="textarea"
          placeholder="Prilepi JSON string"
          class="input-json"/>
      </el-col>
      <el-col :span="8">
        <div class="form-builder-header">
          <h2>Rezultat</h2>
          <el-button
            type="success"
            @click="renderForm">Generiraj obrazec</el-button>
        </div>
        <el-alert
          v-if="parsingError"
          :title="parsingError.name"
          :description="parsingError.message"
          type="error"/>
        <el-dialog
          v-if="inputParsed"
          :visible.sync="helpVisible"
          title="Pomoč"
          width="50%">
          <div
            v-if="currentForm.help"
            v-html="compileMarkdown(inputParsed.help)"/>
          <!-- TODO: Potrebno narediti da prikažemo help tudi za "$type": "group" (prikazujemo samo v prvem nivoju), odstrani v-if > uporabi filtered computed property-->
          <div
            v-for="(field, index) in inputParsed.json"
            v-if="field.help && field.label"
            :key="index">
            <b>{{ field.label }}</b>
            <span v-html="compileMarkdown(field.help)"/>
          </div>
        </el-dialog>
        <!-- :key="inputParsed.json" we add this to forse el-form-renderer to reinitiate, this FIXes showing form value from previous form -->
        <el-form-renderer
          v-if="inputParsed.json&&!parsingError"
          ref="obrazec1"
          :content="inputParsed.json"
          :key="inputParsed.json"
          class="form-panel"
          label-width="120px"/>
        <div v-if="inputParsed.json">
          <el-button
            type="success"
            @click="getFormValue('obrazec1')">
            Pripravi izhodni JSON
          </el-button>
          <el-button
            type="warning"
            @click="validateForm('obrazec1')">
            Preveri polja
          </el-button>
          <el-button
            type="default"
            @click="resetForm('obrazec1')">
            Počisti
          </el-button>
          <!-- <el-button
            type="default"
            @click="getOptions('obrazec1')">
            getOptions
          </el-button> -->
          <el-button
            type="default"
            @click="findSuggestions('obrazec1')">
            findSuggestions
          </el-button>
          <el-button
            type="default"
            @click="updateValueForm('obrazec1')">
            set Ljubljana
          </el-button>
          <el-button
            type="info"
            style="float: right;"
            @click="helpVisible = true">Prikaži navodila</el-button>
          <pre
            v-if="formUserInputData"
            class="form-panel">{{ formUserInputData }}</pre>
        </div>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import marked from 'marked'
import ElFormRenderer from '@femessage/el-form-renderer'

export default {
  name: 'FormBuilder',
  components: {
    ElFormRenderer
  },
  data () {
    return {
      selectValue: [],
      changeCount: 0,
      formUserInputData: '',
      currentForm: '',
      input: '',
      inputParsed: '',
      parsingError: '',
      helpVisible: false,
      jsonObrazci: [
        {
          name: 'Cisterne',
          help: '# Generalni help \n Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
          json: [
            {
              type: 'input',
              id: 'oznaka',
              label: 'Oznaka rezervoarja',
              default: '',
              el: {
                size: 'mini',
                placeholder: 'npr. TOVARNIŠKA OZNAKA: IMP tozd IPKO'
              },
              rules: [
                {
                  required: true,
                  message: 'Prosim vnesite oznako rezervoarja',
                  trigger: 'blur'
                }
              ]
            },
            {
              type: 'input',
              id: 'prostornina',
              label: 'Volumen',
              default: '',
              el: {
                size: 'mini',
                placeholder: 'npr. TOVARNIŠKA OZNAKA: IMP tozd IPKO'
              },
              rules: [
                { required: true, message: 'age is required' },
                { type: 'number', message: 'age must be a number' }
              ]
            },
            {
              type: 'checkbox-group',
              id: 'lastnosti',
              label: 'Vrsta rezervoarja',
              default: [
              ],
              options: [
                {
                  label: 'Jekleni rezervoar izdelan na mestu vgradnje'
                },
                {
                  label: 'Jekleni rezervoar izdelan v delavnici'
                },
                {
                  label: 'Poliesterski'
                },
                {
                  label: 'Enoplaščni'
                },
                {
                  label: 'Dvoplaščni'
                }
              ],
              rules: [
                {
                  type: 'array',
                  required: true,
                  message: 'Prosim izberite vrsto rezervoarja',
                  trigger: 'blur'
                }
              ],
              help: 'Izberi tip rezervoarja'
            }
          ]
        },
        {
          name: 'Primer vsega',
          help: '# Generalni help \n Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
          json: [
            {
              isGroup: true,
              type: 'group',
              id: 'aaaaa',
              items: [
                {
                  type: 'input',
                  id: 'group1',
                  default: 'aaaa',
                  label: 'group1',
                  rules: [
                    {
                      required: true,
                      message: 'sss',
                      trigger: 'change'
                    }
                  ]
                },
                {
                  type: 'select',
                  id: 'group2',
                  label: 'group2',
                  options: [
                    {
                      label: 'Zone 1',
                      value: 'shanghai'
                    },
                    {
                      label: 'Zone 2',
                      value: 'beijing'
                    }
                  ]
                }
              ],
              help: 'Notri vpišeš kar ti paše'
            },
            {
              type: 'tag',
              id: 'name',
              default: 'aaaa2',
              el: {
                type: 'danger'
              },
              help: '* ja to je pa to'
            },
            {
              type: 'alert',
              id: 'name',
              default: 'aaaa2',
              el: {
                title: 'danger',
                type: 'success'
              }
            },
            {
              type: 'select',
              id: 'region',
              label: 'active area',
              options: [
                {
                  label: 'Zone 1',
                  value: 'shanghai'
                },
                {
                  label: 'Zone 2',
                  value: 'beijing'
                }
              ],
              rules: [
                {
                  required: true,
                  message: 'Please select the active area',
                  trigger: 'change'
                }
              ],
              help: '# Izbereš neki aneda?!'
            },
            {
              type: 'date-picker',
              id: 'date',
              label: 'activity time',
              el: {
                'value-format': 'yyyy-MM-ddT00:00:00.000+02:00',
                type: 'datetime',
                placeholder: 'Please select'
              },
              rules: [
                {
                  type: 'date',
                  required: true,
                  message: 'Please select date and time',
                  trigger: 'change'
                }
              ],
              help: 'Ja valda boš vedu da izbereš en datum mona!'
            },
            {
              type: 'switch',
              id: 'delivery',
              label: 'Instant delivery',
              help: '* Ja al je to, al pa uno drugo....\n* Ja al je to, al pa uno drugo.... \n* Ja al je to, al pa uno drugo....'
            },
            {
              type: 'input',
              id: 'enableWhenDelivery',
              el: {
                placeholder: 'If you choose instant delivery, you will see me.'
              },
              label: 'hidden item demo',
              enableWhen: {
                delivery: true
              },
              help: 'Tud jest nevem kva je to... probi...'
            },
            {
              type: 'checkbox-group',
              id: 'type',
              label: 'activity nature',
              default: [
              ],
              options: [
                {
                  label: 'Food / Restaurant Online Events'
                },
                {
                  label: 'Ground push activity'
                },
                {
                  label: ' underline theme activity'
                },
                {
                  label: 'Simple brand exposure'
                }
              ],
              rules: [
                {
                  type: 'array',
                  required: true,
                  message: 'Please select at least one activity nature',
                  trigger: 'change'
                }
              ],
              help: 'Kr neki obkljukaš...'
            },
            {
              type: 'radio-group',
              id: 'resource',
              label: 'Special resources',
              options: [
                {
                  label: 'Online Brand Sponsorship'
                },
                {
                  label: 'Free offline venue'
                }
              ],
              rules: [
                {
                  required: true,
                  message: 'Please select an activity resource',
                  trigger: 'change'
                }
              ],
              help: 'To pa samo ti veš...'
            },
            {
              type: 'input',
              id: 'desc',
              label: 'active form',
              el: {
                type: 'textarea'
              },
              rules: [
                {
                  required: true,
                  message: 'Please fill in the form of activity',
                  trigger: 'blur'
                }
              ],
              help: 'O tem bi se dalo diskutirarati. No recmo da vpišeš notri en tekst.'
            }
          ]
        },
        {
          name: 'autocomplete iz strežnika',
          help: '# Generalni help \n Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
          json: [
            {
              id: 'unit',
              type: 'select',
              label: 'enote',
              remoteOptions: {
                qstr: '',
                search_in: ['unit']
              },
              el: {
                placeholder: 'dsadasd'
              }
            },
            {
              id: 'area2',
              type: 'input',
              label: 'bu',
              el: {
                placeholder: '4324erfds'
              }
            },
            {
              id: 'lokacija',
              type: 'select',
              label: 'lokacije',
              remoteOptions: {
                search_in: ['lokacija']
              },
              el: {
                placeholder: '213123eased'
              }
            }
          ]
        }
      ]
    }
  },
  computed: {
    jsonString: {
      get () {
        // return JSON.stringify(this.currentForm, null, 2)
        return this.input
      },
      set (value) {
        this.input = value
      }
    },
    izbraniObrazec () {
      console.log(this.selectedForm)
      return this.selectedForm
    }
  },
  methods: {
    getFormValue (formName) {
      this.formUserInputData = this.$refs[formName].getFormValue()
    },
    validateForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    updateValueForm (formName) {
      this.$refs[formName].updateForm({
        lokacija: 'ljubljana'
      })
    },
    findSuggestions (formName) {
      var id = 'area'
      var options = [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' }
      ]
      console.log('findSuggestions')
      this.inputParsed.json.map(obj => {
        if (obj.remoteOptions) {
          this.$refs[formName].setOptions(obj.id, options)
          this.$refs[formName].updateForm({ id })
          console.log('remoteOptions', obj.remoteOptions)
        }
      })
    },
    handleChange (selectedFormObj) {
      this.currentForm = selectedFormObj
    },
    renderForm () {
      this.parsingError = ''
      try {
        this.inputParsed = JSON.parse(this.input)
      } catch (e) {
        this.parsingError = e
      }
    },
    copyForm () {
      this.input = JSON.stringify(this.currentForm, null, 2)
    },
    compileMarkdown (md) {
      return marked(md, { sanitize: true })
    }
  }
}
</script>

<style lang="scss" scoped>
.form-builder-header {
  height: 80px;
}
.json {
  background-color: white;
  padding: 10px;
  margin: 10px 0px;
  border: $--border-base;
  border-radius: $--border-radius-base;
  max-height: 400px;
  overflow-y: scroll;
}

.input-json {
  margin: 10px 0px;
}
.form-panel {
  background-color: white;
  padding: 10px;
  margin: 10px 0px;
  border: $--border-base;
  border-radius: $--border-radius-base;
  min-height: 100px;
  overflow: hidden;
}
.el-alert {
  margin-top: 10px;
}
// .input-json > textarea {
//   white-space: nowrap;
// }
</style>
