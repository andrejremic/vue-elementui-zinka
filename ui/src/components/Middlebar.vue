<template>
  <ul>
    <li><a
      href="http://oze.rtvslo.si/dokuwiki"
      title="OZ Wiki"><img
        src="http://oze.rtvslo.si/dokuwiki/lib/tpl/middlebar/images/wiki.png"
        alt="Wiki"
        border="0" ></a></li>
    <li><a
      href="http://172.30.0.9/nagios3/"
      title="Nadzorni sistem"><img
        src="http://oze.rtvslo.si/dokuwiki/lib/tpl/middlebar/images/nagios.png"
        alt="Nagios"
        border="0" ></a></li>
    <li><a
      href="http://oze.rtvslo.si/dnevnik/?go_home"
      title="Dnevnik"><img
        src="http://oze.rtvslo.si/dokuwiki/lib/tpl/middlebar/images/dnevnik.png"
        alt="Dnevnik"
        border="0" ></a></li>
    <li><a
      href="http://172.30.0.9/nscada"
      title="nScada"><img
        src="http://oze.rtvslo.si/dokuwiki/lib/tpl/middlebar/images/nscada.png"
        alt="nScada"
        border="0"></a></li>
    <li><a
      href="http://ozn.rtvslo.si/photo/"
      title="PhotoStation - Slike"><img
        src="http://oze.rtvslo.si/dokuwiki/lib/tpl/middlebar/images/photostation.png"
        alt="Slike"
        border="0"></a></li>
    <li><a
      href="http://oze.rtvslo.si/zinka/dokumenti"
      title="Dokumenti"><svgicon
        :original="true"
        name="zinka"
        width="16"
        height="16"/></a></li>
    <li><a
      href="http://oze.rtvslo.si/pagat/signal/"
      target="_blank"
      title="Pagat"><img
        src="http://oze.rtvslo.si/dokuwiki/lib/tpl/middlebar/images/pagat.png"
        alt="Pagat"
        border="0" ></a></li>
    <li><a
      href="http://oze.rtvslo.si/dokuwiki/net:meganet_blue"
      title="Modra mreža"><img
        src="http://oze.rtvslo.si/dokuwiki/lib/tpl/middlebar/images/blue.png"
        alt="meganet blue"
        border="0" ></a></li>
    <li><a
      href="http://oze.rtvslo.si/dokuwiki/net:meganet_red"
      title="Rdeča mreža"><img
        src="http://oze.rtvslo.si/dokuwiki/lib/tpl/middlebar/images/red.png"
        alt="meganet red"
        border="0" ></a></li>
    <li><a
      href="http://oze.rtvslo.si/dokuwiki/net:meganet_yellow"
      title="Rumena mreža"><img
        src="http://oze.rtvslo.si/dokuwiki/lib/tpl/middlebar/images/yelo.png"
        alt="meganet yellow"
        border="0" ></a></li>
    <li><a
      href="http://oze.rtvslo.si/dokuwiki/xxx:"
      title="XXX"><img
        src="http://oze.rtvslo.si/dokuwiki/lib/tpl/middlebar/images/xxx.png"
        border="0" ></a></li>
    <li><a href="http://oze.rtvslo.si/nos"><img
      src="http://oze.rtvslo.si/dokuwiki/lib/tpl/middlebar/images/nos.png"
      alt="noScheme"
      border="0" ></a></li>
    <li><a
      href="http://172.30.0.9/bridgetech"
      title="SFN Monitor"><img
        src="http://oze.rtvslo.si/dokuwiki/lib/tpl/middlebar/images/sfnmon.png"
        alt="SfnMon"
        border="0"></a></li>
  </ul>
</template>

<script>
export default {
  name: 'Middlebar'
}
</script>

<style lang="scss" scoped>
li {
  padding: 0 2px !important;
  a {
    filter: grayscale(90%);
  }
  a:hover {
    filter: drop-shadow(0px 1px 0.5px rgba(0,0,0,0.3)) grayscale(0%);
    img, svg {
      padding-bottom: 2px;
    }
  }
}
</style>
