<template>
  <div class="modal">
    <div class="img-container">
      <img :height="imgHeight" :src="full_picture" :width="imgWidth">
      <button id="share-button" @click="shareUrl">Share picture</button>
      <button v-if="hasPrevious" id="button-previous-img" @click="previousImage">Prev</button>
      <button v-if="hasNext" id="button-next-img" @click="nextImage">Next</button>
      <span @click="closeModal">X</span>
    </div>
    <div class="overlay">
      <p><b>Author</b>: {{ author }}</p>
      <p><b>Camera</b>: {{ camera }}</p>
      <p><b>Tags</b>: {{ tags }}</p>
      <div id="zoom-buttons">
        <button id="pane-button" @click="paneImage">-</button>
        <button id="reset-button" @click="resetImageSize">Reset</button>
        <button id="zoom-button" @click="zoomImage">+</button>
      </div>
    </div>
  </div>
</template>

<script>
import {photoDetail} from "@/api/photos";

export default {
  name: 'photo-view',
  props: {
    id: {
      type: String,
      required: true
    },
    hasNext: {
      type: Boolean,
      default: false
    },
    hasPrevious: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    author: null,
    camera: null,
    full_picture: {},
    imgHeight: null,
    imgWidth: null,
    tags: null
  }),
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    getPhotoDetail(_id) {
      photoDetail(_id).then(res => {
        this.author = res.author
        this.camera = res.camera
        this.tags = res.tags
        this.full_picture = res.full_picture
      })
    },
    shareUrl() {
      alert(window.location + this.id)
    },
    zoomImage() {
      this.imgHeight += 100
      this.imgWidth += 50
    },
    paneImage() {
      this.imgHeight -= 100
      this.imgWidth -= 50
    },
    previousImage() {
      this.$emit('previousImage')
    },
    resetImageSize() {
      this.imgWidth = null
      this.imgHeight = null
    },
    nextImage() {
      this.$emit('nextImage')
    }
  },
  mounted() {
    this.getPhotoDetail(this.id)
  },
  watch: {
    id(newVal) {
      this.getPhotoDetail(newVal)
    }
  }
}
</script>

<style scoped>

span {
  position: absolute;
  top: 8px;
  right: 32px;
  color: white;
  font-size: 30px;
  cursor: pointer;
}

img {
  margin-bottom: 32px;
  object-position: center;
  object-fit: cover;
}

p {
  margin: 0;
  width: 100vw;
  color: white;
}

.img-container {
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.img-container > #share-button {
  position: absolute;
  top: 12px;
  left: 18px;
}

.overlay {
  position: absolute;
  bottom: 0;
  background-color: #2c3e50DD;
  padding: 16px 0;
}

#zoom-buttons {
  position: relative;
}

#zoom-buttons > button {
  background-color: #42b983;
  margin: 0 4px;
}

#button-previous-img {
  position: absolute;
  left: 16px;
  top: 50%;
}

#button-next-img {
  position: absolute;
  right: 32px;
  top: 50%;
}

.modal {
  display: flex;
  align-items: center;
  position: fixed;
  background-color: #000000EE;
  height: 100vh;
  overflow: hidden;
}
</style>