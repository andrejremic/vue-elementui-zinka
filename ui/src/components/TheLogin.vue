<template>
  <div class="center">
    <el-main>
      <div class="text-center">
        <svgicon
          :original="true"
          name="zinka"
          width="100"
          height="100"/>
        <h2>Hej! Kdo pa ste vi?</h2>
      </div>
      <div class="center">
        <el-form
          ref="loginForm"
          :model="ruleForm"
          :rules="rules"
          :validate-on-rule-change="false"
          label-width="130px">
          <el-form-item
            label="Uporabniško ime"
            prop="u">
            <el-input v-model="ruleForm.u"/>
          </el-form-item>
          <el-form-item
            label="Geslo"
            prop="p">
            <el-input
              v-model="ruleForm.p"
              type="password"
              auto-complete="off"/>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('loginForm')">Prijava</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </div>
</template>

<script>
import '@/compiled-icons/zinka'
export default {
  name: 'TheLogin',
  data () {
    return {
      ruleForm: {
        u: '',
        p: ''
      },
      rules: {
        u: [
          { required: true, message: 'RTV uporabniško ime', trigger: 'blur' }
        ],
        p: [
          { required: true, message: 'RTV geslo', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) { // if form validaton OK
          var that = this
          this.$store.dispatch('postUserAA', this.ruleForm) // send login data
            .then(function (response) { // on success
              if (response.status === 200) {
                console.info(response.data.name + ' is authenticated. Redirecting to last path.')
                that.$notify({
                  title: response.data.name,
                  message: 'Pozdravljeni!',
                  type: 'success'
                })
                that.$router.push({ path: that.$route.query.redirect ? that.$route.query.redirect : '/' }) // redirect back to path where user was asked to login
              }
            }).catch(function (response) { // on fail
              that.$refs[formName].resetFields()
              that.$store.commit('updateUserAA', response.data)
            })
        } else { // if validation not ok
          console.warn('Form validation failed!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
