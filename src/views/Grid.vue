<template>
  <div id="main">
    <h1>Grid</h1>
    <div class="container-fluid">
      <div id="pagination">
        <span v-for="pageNumber in pageCount" :key="pageNumber" :class="linkClass(pageNumber)"
              @click="getPictures(pageNumber)">
          {{ pageNumber }}
        </span>
      </div>
      <div v-for="(picture, idx) in pictures" :key="picture.id" class="picture-preview"
           @click="pictureDetail(picture.id, idx)">
        <img :src="picture.cropped_picture " alt="">
      </div>
    </div>
    <photo v-if="pictureDetailId" :id="pictureDetailId" :has-next.sync="hasNext" :has-previous.sync="hasPrevious"
           @closeModal="closeModal" @nextImage="nextImg" @previousImage="previousImg"></photo>
  </div>
</template>

<script>
import Photo from '@/components/Photo'
import {photosByPage} from "@/api/photos";

export default {
  name: 'grid-view',
  components: {Photo},
  data: () => ({
    pageCount: null,
    hasMore: false,
    hasNext: false,
    hasPrevious: false,
    page: null,
    pictures: [],
    pictureDetailId: null,
    pictureDetailIndex: null
  }),
  methods: {
    closeModal() {
      this.pictureDetailId = null
    },
    getPictures(_pageNumber) {
      photosByPage(_pageNumber).then(response => {
        this.pageCount = response.pageCount
        this.page = response.page
        this.hasMore = response.hasMore
        this.pictures = response.pictures
      })
    },
    linkClass(_pageNumber) {
      return _pageNumber !== this.page ? '' : 'active'
    },
    pictureDetail(_id, _index) {
      this.hasPrevious = _index > 0
      this.hasNext = _index < (this.pictures.length - 1)

      this.pictureDetailId = _id
      this.pictureDetailIndex = _index
    },
    previousImg() {
      this.pictureDetail(this.pictures[this.pictureDetailIndex - 1].id, this.pictureDetailIndex - 1)
    },
    nextImg() {
      this.pictureDetail(this.pictures[this.pictureDetailIndex + 1].id, this.pictureDetailIndex + 1)
    }
  },
  mounted() {
    this.getPictures(1)
  }
}
</script>

<style>
#pagination {
  width: 100%;
  margin-bottom: 32px;
}

#pagination > span {
  cursor: pointer;
  font-weight: bolder;
}

#pagination > span.active {
  pointer-events: none;
  color: #42b983;
}

.picture-preview {
  cursor: pointer;
  margin: 8px;
}

.picture-preview > img:hover {
  height: 95%;
}
</style>