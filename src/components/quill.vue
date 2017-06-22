<template>
  <div class="quill-inline-editor" @dblclick="handleDoubleClick">
    <div class="quill-inline-editor-controls" ref="tooltip">
      <button @click="bold()" :class="{ 'is-active': status.bold === true }"><icon name="bold" /></button>
      <button @click="italic()" :class="{ 'is-active': status.italic === true }"><icon name="italic" /></button>
      <button @click="underline()" :class="{ 'is-active': status.underline === true }"><icon name="underline" /></button>
      <button @click="subscript()" :class="{ 'is-active': status.script === 'sub' }"><icon name="subscript" /></button>
      <button @click="superscript()" :class="{ 'is-active': status.script === 'super' }"><icon name="superscript" /></button>
      <button @click="strikethrough()" :class="{ 'is-active': status.strike === true }"><icon name="strikethrough" /></button>
      <button @click="blockquote()" :class="{ 'is-active': status.blockquote === true }"><icon name="quote-right" /></button>
      <button @click="align('')" :class="{ 'is-active': !status.align }"><icon name="align-left" /></button>
      <button @click="align('right')" :class="{ 'is-active': status.align === 'right' }"><icon name="align-right" /></button>
      <button @click="align('center')" :class="{ 'is-active': status.align === 'center' }"><icon name="align-center" /></button>
      <button @click="h1()" :class="{ 'is-active': status.header === 1 }"><icon name="header" />1</button>
      <button @click="h2()" :class="{ 'is-active': status.header === 2 }"><icon name="header" />2</button>
    </div>
    <div class="ql-container" ref="editor"
         :class="{ 'ql-editor': !quill }"></div>
  </div>
</template>

<style>
.quill-inline-editor {
  border: 1px solid #999;
  position: relative;
}

.quill-inline-editor .ql-editor {
  padding: 0;
}

.quill-inline-editor-controls {
  display: none;
  position: absolute;
  top: -36px;
  left: 0;
  background-color: #111;
  border-radius: 4px;
  padding: 5px 10px;
}

.quill-inline-editor-controls button {
  background-color: transparent;
  color: #fff;
  border: none;
}

.quill-inline-editor-controls button.is-active {
  color: #21b384;
}

.ql-stroke {
  fill: none;
  stroke: #444;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2;
}
</style>

<script>
  require('quill/dist/quill.core.css');
  if (!window.Quill) {
    window.Quill = require('quill/dist/quill.js');
  }

  import 'vue-awesome/icons/align-center';
  import 'vue-awesome/icons/align-justify';
  import 'vue-awesome/icons/align-left';
  import 'vue-awesome/icons/align-right';
  import 'vue-awesome/icons/bold';
  import 'vue-awesome/icons/header';
  import 'vue-awesome/icons/italic';
  import 'vue-awesome/icons/quote-right';
  import 'vue-awesome/icons/list-ul';
  import 'vue-awesome/icons/list-ol';
  import 'vue-awesome/icons/subscript';
  import 'vue-awesome/icons/superscript';
  import 'vue-awesome/icons/underline';
  import 'vue-awesome/icons/strikethrough';

  import Icon from 'vue-awesome/components/Icon';

  const Quill = window.Quill;

  export default {
    name: 'quill-inline-editor',

    data() {
      return {
        enabled: false,
        quill: null,
        mounted: false,
        status: {
          bold: false,
          align: null,
          header: null,
          script: null,
          underline: false,
          blockquote: false,
          italic: false,
          strike: false
        }
      };
    },

    components: {
      Icon
    },

    props: {
      content: {}
    },

    watch: {
      enabled(val) {
        if (this.quill) {
          this.quill.enable(val);
        }
      },
      content(val) {
        this.setContent(val);
      }
    },

    mounted() {
      this.setContent(this.content || '');
    },

    methods: {
      bold() {
        const status = this.status;
        this.quill.format('bold', !status.bold);
        this.status = this.quill.getFormat();
      },
      align(val) {
        this.quill.format('align', val);
        this.status = this.quill.getFormat();
      },
      italic() {
        const status = this.status;
        this.quill.format('italic', !status.italic);
        this.status = this.quill.getFormat();
      },
      strikethrough() {
        const status = this.status;
        this.quill.format('strike', !status.strike);
        this.status = this.quill.getFormat();
      },
      blockquote() {
        const status = this.status;
        this.quill.format('blockquote', !status.blockquote);
        this.status = this.quill.getFormat();
      },
      subscript() {
        const status = this.status;
        const value = status.script === 'sub' ? false : 'sub';
        this.quill.format('script', value, Quill.sources.USER);
        this.status = this.quill.getFormat();
      },
      superscript() {
        const status = this.status;
        const value = status.script === 'super' ? false : 'super';
        this.quill.format('script', value);
        this.status = this.quill.getFormat();
      },
      underline() {
        const status = this.status;
        this.quill.format('underline', !status.underline);
        this.status = this.quill.getFormat();
      },
      h1() {
        this.quill.format('header', 1);
        this.status = this.quill.getFormat();
      },
      h2() {
        this.quill.format('header', 2);
        this.status = this.quill.getFormat();
      },
      setContent(content) {
        if (!this.quill) {
          this.$refs.editor.innerHTML = content;
        } else {
          this.quill.clipboard.dangerouslyPasteHTML(this.content || '', 'api');
        }
      },
      handleDoubleClick() {
        if (!this.quill) {
          this.initQuill();
        }
        this.enabled = true;
        this.$nextTick(() => {
          this.quill.setSelection(0, 0);
          this.quill.focus();
        });
      },
      initQuill() {
        const quill = this.quill = new Quill(this.$refs.editor);

        quill.clipboard.dangerouslyPasteHTML(this.content || '', 'api');

        quill.on('selection-change', (range) => {
          const tooltip = this.$refs.tooltip;
          if (!range) {
            this.enabled = false;
            tooltip.style.display = 'none';
            this.$emit('blur', quill);
          } else {
            if (this.enabled) {
              tooltip.style.display = 'block';
            }
            this.status = this.quill.getFormat(range.index, range.length);
            this.$emit('focus', quill);
          }
        });
      }
    }
  };
</script>
