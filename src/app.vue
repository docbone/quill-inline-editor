<template>
  <div>
    <h1>quill-inline</h1>
    <p>A vue project.</p>
    <quill ref="quill" :content="content"></quill>
  </div>
</template>

<script>
  import 'quill/dist/quill.core.css';
  import Quill from './components/quill.vue';

  export default {
    name: 'app',

    components: {
      Quill
    },

    data() {
      return {
        content: '<p>测试内容</p>'
      };
    },

    methods: {
    }
  };
</script>
