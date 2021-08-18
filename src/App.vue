<template>
  <div id="app">
    <div class="controls" v-if="currentComponent === 'Graph'">
      <button class="btn" @click="switchComponent('Uploader')">上传</button>
      <button class="btn" @click="switchComponent('Keyboard')">生成</button>
    </div>
    <div class="controls" v-if="currentComponent === 'Keyboard'">
      <button class="btn" @click="switchComponent('Uploader')">上传</button>
      <button class="btn" @click="switchComponent('Graph')">分析</button>
    </div>
    <main>
      <Loader :isLoading="isLoading" />
      <keep-alive>
        <Component :is="currentComponent" v-bind="dynamicProps" @onload="onload"/>
      </keep-alive>
    </main>
  </div>
</template>

<script>
import thePinyinJs from 'thepinyin.js'
import Uploader from './components/Uploader.vue'
import Loader from './components/Loader.vue'
import { splitPinyin } from './utils/pinyin.js'
import Graph from './components/Graph'
import Keyboard from './components/Keyboard'
import startGen from './generator'
export default {
  name: 'App',
  data () {
    return {
      currentComponent: 'Uploader',
      isLoading: false,
      stats: {},
      layout: {}
    }
  },
  computed: {
    dynamicProps () {
      if (this.currentComponent === 'Graph') {
        return { stats: this.stats }
      } else {
        return { scheme: this.layout }
      }
    }
  },
  methods: {
    switchComponent (comp) {
      if (this.currentComponent === 'Uploader' && comp === 'Graph') {
        this.loading()
      }
      this.currentComponent = comp
    },
    loading () {
      this.isLoading = true
    },
    loaded () {
      this.isLoading = false
    },
    onload (text) {
      this.switchComponent('Graph')
      setTimeout(() => {
        this.convertToPinyin(text)
        this.collect()
        this.sortData()
        this.prepareCharts()
        this.layout = startGen(this.stats)
        this.loaded()
      }, 0)
    },
    convertToPinyin (text) {
      const source = text
        .split('')
        .map((c) => thePinyinJs.py(c, thePinyinJs.NOMARK))
        .map((bopo) => {
          if (Array.isArray(bopo)) return bopo[0]
          return bopo
        })
        .filter((c) => c)
      this.rawData = source
    },

    collect () {
      this.initStatsData()
      this.rawData.forEach(char => {
        this.collectChars(char)
        const [consonant, vowel] = splitPinyin(char)
        this.collectVowels(vowel)
        this.collectConsonants(consonant)
        this.collectCombinations(consonant, vowel)
      })
    },

    collectChars (char) {
      if (this.stats.chars[char]) {
        this.stats.chars[char] += 1
      } else {
        this.stats.chars[char] = 1
      }
    },
    collectVowels (vow) {
      if (this.stats.vowels[vow]) {
        this.stats.vowels[vow] += 1
      } else {
        this.stats.vowels[vow] = 1
      }
    },
    collectConsonants (con) {
      if (this.stats.consonants[con]) {
        this.stats.consonants[con] += 1
      } else {
        this.stats.consonants[con] = 1
      }
    },
    collectCombinations (con, vow) {
      if (!this.stats.cc[con]) {
        this.stats.cc[con] = { [vow]: 1 }
      } else {
        if (!this.stats.cc[con][vow]) {
          this.stats.cc[con][vow] = 1
        } else {
          this.stats.cc[con][vow] += 1
        }
      }

      if (!this.stats.cv[vow]) {
        this.stats.cv[vow] = { [con]: 1 }
      } else {
        if (!this.stats.cv[vow][con]) {
          this.stats.cv[vow][con] = 1
        } else {
          this.stats.cv[vow][con] += 1
        }
      }
    },

    initStatsData () {
      this.stats = {
        chars: {},
        vowels: {},
        consonants: {},
        // combinationConsonant {b: {ao...}, c: {an,...}}
        cc: {},
        // combinationVowel {a: {b, ...}, o: {c...}}
        cv: {}
      }
    },
    sortData () {
      const stats = {}
      stats.chars = sortKeyValue(this.stats.chars)
      stats.vowels = sortKeyValue(this.stats.vowels)
      stats.consonants = sortKeyValue(this.stats.consonants)

      stats.cc = {}
      Object.keys(this.stats.cc).forEach(con => {
        stats.cc[con] = sortKeyValue(this.stats.cc[con])
      })
      stats.cv = {}
      Object.keys(this.stats.cv).forEach(vow => {
        stats.cv[vow] = sortKeyValue(this.stats.cv[vow])
      })

      // obj: { a: 1, b: 100,c: 1000 }
      // return: [["c", 1000], ["b", 100], ["a", 1]]
      function sortKeyValue (obj) {
        return Object.keys(obj).map(k => [k, obj[k]]).sort((a, b) => { return b[1] - a[1] })
      }
      this.stats = stats
    },
    prepareCharts () {
      if (!this.stats) return []
      const ret = []
      let id = 0
      ret.push({
        id: id++,
        title: '字频',
        data: transform(this.stats.chars)
      })
      ret.push({
        id: id++,
        title: '韵母',
        data: transform(this.stats.vowels)
      })
      ret.push({
        id: id++,
        title: '声母',
        data: transform(this.stats.consonants)
      })
      if (this.stats.cv) {
        Object.keys(this.stats.cv).forEach(vow => {
          ret.push({
            id: id++,
            title: `${vow}之声母`,
            data: transform(this.stats.cv[vow])
          })
        })
      }

      if (this.stats.cc) {
        Object.keys(this.stats.cc).forEach(con => {
          ret.push({
            id: id++,
            title: `${con}之韵母`,
            data: transform(this.stats.cc[con])
          })
        })
      }

      /*
      arr: [[a, 100], [e, 2000], [i, 1000]]
      ret: [[a, e, i], [100, 2000, 1000]]
      */
      function transform (arr) {
        if (!arr) return [[], []]
        return [arr.map(ele => ele[0]), arr.map(ele => ele[1])]
      }
      this.stats = ret
    }
  },

  created () {
    this.initStatsData()
  },

  components: {
    Uploader,
    Loader,
    Graph,
    Keyboard
  }
}
</script>

<style>
/* css reset */
/* https://gist.github.com/sfengyun/fc6df3a44da336db62859f286352ac7a */
html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  font-size: 100%;
  vertical-align: baseline;
}

:link, :visited, ins {
  text-decoration: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

ul {
  list-style: none;
}

caption, th {
  text-align: left;
}

blockquote:before, blockquote:after, q:before, q:after {
  content: "";
}

blockquote, q {
  quotes: "" "";
}

address {
  font-style:normal
}
/* end of css reset */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.btn {
  width: 100%;
  border: none;
  background: #1FB264;
  color: #FFF;
  /* border-bottom: 3px solid #15824B; */
  padding: 0.5em;
  font-weight: 400;
  border-radius: 0.3em;
  outline: none;
  transition: all 0.2s ease;
  box-shadow: 0 3px 0 0px #15824b;
}

.btn:hover {
  cursor: pointer;
}
.btn:active {
  /* border-bottom-color: #FFF; */
  box-shadow: 0 0px 0 0px #15824b;
}
.btn-disabled {
  background: #ccc;
  box-shadow: 0 3px 0 0px #ccc;
}

.btn-disabled:hover {
  cursor: not-allowed;
}
.controls {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
  display: flex;
  flex-flow: row nowrap
}

.controls .btn:first-child {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.controls .btn:last-child {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

main {
  position: relative;
  min-height: 100vh;
  max-width: 1440px;
}
</style>
