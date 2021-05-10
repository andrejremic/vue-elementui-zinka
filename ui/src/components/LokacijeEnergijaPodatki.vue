<template>
  <el-alert
    v-if="merilnoMesto === null"
    :title="'Ni podatkov o merilnem mestu'"
    :closable="false"
    type="info"
    show-icon/>
  <div v-else>
    <el-alert
      v-if="merilnoMesto.datum_izklopa"
      :title="'Lokacija izklopljena od ' + merilnoMesto.datum_izklopa"
      :description="opombe_izklop"
      type="warning"
      show-icon/>
    <div class="panel">
      <div class="z-section">
        <div class="h3 text-strong">Merilno mesto</div>
        <div class="h1">
          <a title="Št. odjemnega mesta">{{ merilnoMesto.st_odjemnega_mesta ? merilnoMesto.st_odjemnega_mesta + '-' : '?-' }}</a><a title="Št. merilnega mesta">{{ merilnoMesto.st_merilnega_mesta }}</a><a title="SODO">/{{ merilnoMesto.sodo }}</a>
        </div>
      </div>
      <div class="z-section">
        <table>
          <tr>
            <td class="name">Priključna moč</td>
            <td class="value">{{ merilnoMesto.moc_obracunska }} kW</td>
          </tr>
          <tr>
            <td class="name">Varovalke</td>
            <td class="value">{{ merilnoMesto.varovalka }} A</td>
          </tr>
          <tr>
            <td class="name">Vrsta odjema</td>
            <td class="value">{{ merilnoMesto.vrsta_odjema }}</td>
          </tr>
          <tr>
            <td class="name">Napetostni nivo</td>
            <td class="value">{{ merilnoMesto.napetostni_nivo }}</td>
          </tr>
        </table>
      </div>
      <div class="z-section">
        <div class="h3 text-strong">Naslov</div>
        <table>
          <tr>
            <td class="value">{{ merilnoMesto.ime_elektro }}</td>
          </tr>
          <tr>
            <td class="value">{{ merilnoMesto.naslov }}</td>
          </tr>
          <tr>
            <td class="value">{{ merilnoMesto.posta }}</td>
          </tr>
          <tr>
            <td class="value">{{ merilnoMesto.distrib_enota }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LokacijeEnergijaPodatki',
  props: {
    merilnoMesto: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="scss">
table td.name {
  width: 100px;
  font-size: 14px;
  text-transform: lowercase;
}
</style>
