import QuillInlineEditor from './components/quill.vue';

export default QuillInlineEditor;

function install(Vue) {
  Vue.component(QuillInlineEditor.name, QuillInlineEditor);
}

if (typeof window !== 'undefined' && window['Vue']) {
  install(window['Vue']);
}
