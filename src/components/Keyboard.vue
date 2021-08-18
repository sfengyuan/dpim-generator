<template>
  <div class="keyboard">
    <div class="row">
      <div class="key key-symbol key-backtick"><span>`</span><span>~</span></div>
      <div class="key key-symbol key-1"><span>1</span>   <span>!</span></div>
      <div class="key key-symbol key-2"><span>2</span>   <span>@</span></div>
      <div class="key key-symbol key-3"><span>3</span>   <span>#</span></div>
      <div class="key key-symbol key-4"><span>4</span>   <span>$</span></div>
      <div class="key key-symbol key-5"><span>5</span>   <span>%</span></div>
      <div class="key key-symbol key-6"><span>6</span>   <span>^</span></div>
      <div class="key key-symbol key-7"><span>7</span>   <span>&</span></div>
      <div class="key key-symbol key-8"><span>8</span>   <span>*</span></div>
      <div class="key key-symbol key-9"><span>9</span>   <span>(</span></div>
      <div class="key key-symbol key-0"><span>0</span>   <span>)</span></div>
      <div class="key key-symbol key-dash"><span>-</span><span>_</span></div>
      <div class="key key-symbol key-equal"><span>=</span><span>+</span></div>
      <div class="key key-symbol key-backspace"><span>Backspace</span><span>⇦</span></div>
    </div>
    <div class="row">
      <div class="key key-control key-tab"><span>Tab</span></div>
      <div class="key key-letter key-q">  <span>Q  </span><span>{{ key.q }}</span></div>
      <div class="key key-letter key-w">  <span>W  </span><span>{{ key.w }}</span></div>
      <div class="key key-letter key-e">  <span>E  </span><span>{{ key.e }}</span></div>
      <div class="key key-letter key-r">  <span>R  </span><span>{{ key.r }}</span></div>
      <div class="key key-letter key-t">  <span>T  </span><span>{{ key.t }}</span></div>
      <div class="key key-letter key-y">  <span>Y  </span><span>{{ key.y }}</span></div>
      <div class="key key-letter key-u">  <span>U  </span><span>{{ key.u }}</span></div>
      <div class="key key-letter key-i">  <span>I  </span><span>{{ key.i }}</span></div>
      <div class="key key-letter key-o">  <span>O  </span><span>{{ key.o }}</span></div>
      <div class="key key-letter key-p">  <span>P  </span><span>{{ key.p }}</span></div>
      <div class="key key-symbol"><span>[</span><span>{</span></div>
      <div class="key key-symbol"><span>]</span><span>}</span></div>
      <div class="key key-symbol key-bslash"><span>|</span><span>\</span></div>
    </div>
    <div class="row">
      <div class="key key-control key-cap"><span>Cap</span></div>
      <div class="key key-letter key-a"><span>A</span><span>{{ key.a }}</span></div>
      <div class="key key-letter key-s"><span>S</span><span>{{ key.s }}</span></div>
      <div class="key key-letter key-d"><span>D</span><span>{{ key.d }}</span></div>
      <div class="key key-letter key-f"><span>F</span><span>{{ key.f }}</span></div>
      <div class="key key-letter key-g"><span>G</span><span>{{ key.g }}</span></div>
      <div class="key key-letter key-h"><span>H</span><span>{{ key.h }}</span></div>
      <div class="key key-letter key-j"><span>J</span><span>{{ key.j }}</span></div>
      <div class="key key-letter key-k"><span>K</span><span>{{ key.k }}</span></div>
      <div class="key key-letter key-l"><span>L</span><span>{{ key.l }}</span></div>
      <div class="key key-symbol key-semicolon"><span>;</span><span>:</span></div>
      <div class="key key-symbol key-quotation"><span>'</span><span>"</span></div>
      <div class="key key-symbol key-enter"><span>Enter</span>
      <span>
        <!-- <i data-feather="corner-down-left"></i> -->
        ←
      </span></div>
    </div>
    <div class="row">
      <div class="key key-control key-lshift"><span>Shift</span></div>
      <div class="key key-letter key-z"><span>Z</span><span>{{ key.z }}</span></div>
      <div class="key key-letter key-x"><span>X</span><span>{{ key.x }}</span></div>
      <div class="key key-letter key-c"><span>C</span><span>{{ key.c }}</span></div>
      <div class="key key-letter key-v"><span>V</span><span>{{ key.v }}</span></div>
      <div class="key key-letter key-b"><span>B</span><span>{{ key.b }}</span></div>
      <div class="key key-letter key-n"><span>N</span><span>{{ key.n }}</span></div>
      <div class="key key-letter key-m"><span>M</span><span>{{ key.m }}</span></div>
      <div class="key key-symbol key-comma"> <span>,</span><span>&lt;</span></div>
      <div class="key key-symbol key-period"><span>.</span><span>&gt;</span></div>
      <div class="key key-symbol key-fslash"><span>/</span><span>?</span></div>
      <div class="key key-control key-rshift"><span>Shift</span></div>
    </div>
    <div class="row">
      <div class="key key-control key-lctrl"><span>Ctrl</span></div>
      <div class="key key-control key-fn">   <span>fn  </span></div>
      <div class="key key-control key-logo"> <span>logo</span></div>
      <div class="key key-control key-alt">  <span>Alt </span></div>
      <div class="key key-control key-space"><span>Space</span></div>
      <div class="key key-control key-rctrl"><span>Ctrl </span></div>
      <div class="key key-control key-left"> <span>←</span></div>
      <div class="key key-control key-up-down"> <span>↑</span><span>↓</span></div>
      <div class="key key-control key-right"><span>→</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Keyboard',
  props: ['scheme'],

  computed: {
    key () {
      const key = {}
      for (const [k, v] of Object.entries(this.scheme)) {
        /* eslint-disable quotes */
        key[k] = v.replaceAll(' ', `\n`)
      }
      return key
    }
  }
}
</script>

<!-- Add scoped attribute to limit CSS to this component only -->
<style scoped>

.keyboard {
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 10px solid #CCC;
  background: #171717;
  box-shadow: 0 7px 0px 4px #bdb0b0;
  color: #666;
}

.key {
  box-sizing: border-box;
  /* display: inline-block; */
  /* float: left; */
  width: 50px; height: 50px;
  border: 1px solid #171717;
  border-radius: 5px;
  background: #FFF;
}
.key span {
  white-space: pre-line;
}
.key-up-down span, .key-left span, .key-right span {
  border: 1px solid #DDD;
  background: #FFF;
}

.key-up-down, .key-left, .key-right {
  background: #eee;
}

.row {
  white-space: nowrap;
  display: flex;
  flex-flow: row nowrap;
}

.key-control {
  line-height: 50px;
  text-align: center;
  padding-left: 2px;
}

.key-symbol {
  display: flex;
  flex-flow: column nowrap;
  align-content: center;
  justify-content: space-evenly;
  align-items: center;
}
.key-letter {
  position: relative;
  overflow: hidden;
}

.key-letter span:first-child {
  bottom: 0;
  left: 2px;
  position: absolute;
  font-size: 12px;
  color: #999;
}
.key-letter span:last-child {
  position: absolute;
  right: 2px;
  color: #15824b;
  font-weight: 600;
}
.key-backspace {
  width: 110px;
}
.key-tab, .key-cap, .key-lshift, .key-lctrl {
  text-align: left;
  padding-left: 2px;
}
.key-backspace, .key-enter, .key-rshift {
  text-align: right;
  padding-right: 2px;
}

.key-backspace, .key-enter {
  align-items: flex-end;
  padding-right: 2px;
}

.key-tab {
  width: 80px;
}

.key-bslash {
  width: 80px;
}

.key-cap {
  width: 90px;
}

.key-enter {
  width: 120px;
}

.key-lshift {
  width: 120px;
}
.key-rshift {
  width: 140px;
}

.key-space {
  width: 360px;
}
.key-up-down, .key-left, .key-right {
  display: flex;
  flex-flow: column nowrap;
}

.key-left, .key-right {
  justify-content: flex-end;
}

/* .key-left span, .key-right span {
  line-height: 25px;
} */
.key-up-down span, .key-left span, .key-right span {
  height: 25px;
  line-height:21px;
  border-radius: 5px;
  box-sizing: border-box;
}

.key-dash span:last-child {
  position: relative;
  top: -8px;
}

.key-backtick span:last-child {
  position: relative;
  top: -4px;
}

.key-backtick span:first-child {
  position: relative;
  top: 6px;
}
</style>
