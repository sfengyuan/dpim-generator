<template>
<div class="uploader">
  <button class="btn" id="uploader-button" @click="$refs.input.click()">上传</button>
  <div class="uploader-control">
    <input ref="input" @change="onUpload" type="file" name="uploaderInput" id="uploader-input" accept="text/plain" multiple>
    <div class="drag-zone">
      <h3>拖放文件到这里</h3>
    </div>
  </div>
  <div class="uploader-content" v-if="filesInfo.length">
    <ul>
      <li v-for="file in filesInfo" :key="file.name">
        <h3>{{ file.name }}</h3>
        <p>{{ file.size }} BYTES</p>
      </li>
    </ul>
  </div>
  <div class="reader-control">
    <button :class="{'btn-disabled': !files.length, btn: true, 'reader-btn': true}" @click="onRead" :disabled="!files.length">下一步</button>
  </div>
</div>
</template>

<script>
export default {
  name: 'Uploader',
  data () {
    return {
      files: []
    }
  },
  computed: {
    filesInfo () {
      return [...this.files].map(file => ({ name: file.name, size: file.size }))
    }
  },
  methods: {
    onRead () {
      this.files.forEach(file => {
        const fr = new FileReader()
        fr.onload = () => {
          this.$emit('onload', fr.result)
        }
        fr.readAsText(file)
      })
    },
    onUpload (ev) {
      const curFiles = ev.target.files
      if (curFiles.length === 0) {
        window.alert('No files currently selected for upload')
        return
      }
      this.files = curFiles
    }
  }
}
</script>

<!-- Add scoped attribute to limit CSS to this component only -->
<style scoped>
.uploader {
  padding: 1rem;
}
.uploader-control {
  border: 4px dashed green;
  margin: 2rem auto;
  position: relative;
  transition: all 0.3s ease;
}

.uploader-control:hover {
  background-color: #1FB264;
  border: 4px dashed #ffffff;
}

.uploader-control:hover .drag-zone h3 {
  color: #FFF;
}

#uploader-input {
  position: absolute;
  width: 100%; height: 100%;
  padding: 0; margin: 0;
  opacity: 0;
  outline: none;
}

.drag-zone {
  text-align: center;
}

.drag-zone h3 {
  color: #1FB264;
  padding: 5em;
  transition: all 0.3s ease;
}
.uploader-content ul {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}

.uploader-content li {
  margin: 1rem;
  padding: 1rem;
}

.uploader-content li h3 {
  background: #1FB264;
  padding: 0 5px;
  margin: 0.5rem 0;
  color: #FFF;
  box-shadow: 3px 3px 0px 0px #15824b;
}

.uploader-content li p {
  font-size: 0.8rem;
  font-style: italic;
  padding: 0 5px;
  background: antiquewhite;
  color: #333;
}
</style>
