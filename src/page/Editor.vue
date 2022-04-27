<template>
  <div>
    <v-btn @click="tryFormat">Try format JSON</v-btn>
    <v-btn @click="setCode">Set code 1</v-btn>
    <Editor
      :validKeys="validKeys"
      v-model="contentString"
      onChange1="onChangeContent"
      @onInit="onInit"
    />
  </div>
</template>

<script>
import Editor from '../components/Editor.vue';

export default {
  components: { Editor },
  data() {
    const content = {
      name: 'Turbo',
      demo: 1,
      test1: true,
    };
    return {
      editor: null,
      validKeys: ['name', 'url', 'test1'],
      contentNew: null,
      contentString: JSON.stringify(content, null, 2),
    };
  },
  computed: {
    content() {
      try {
        return JSON.stringify(this.contentString, null, 2);
      } catch (e) {
        window.e = e;
        return e;
      }
    },
  },
  methods: {
    onInit(editor) {
      this.editor = editor;
      window.ed = editor;
      window.t = this;
    },
    tryFormat() {
      try {
        // const v = this.editor.getValue()
        // const c = JSON.parse(v)
        // const newValue = JSON.stringify(c, null, 2)
        // this.editor.setValue(newValue)
        // window.t = this;

        // console.log(' - c:31 >', c) // eslint-disable-line no-console
        console.log(' - this.contentString:31 >', this.contentString) // eslint-disable-line no-console
        const content = JSON.parse(this.contentString)
        // console.log(' - content:33 >', content) // eslint-disable-line no-console
        this.contentString = JSON.stringify(content, null, 2)
      } catch (e) {
        //
      }
    },
    // onChangeContent(newContentString) {
    //   let newContent = {};
    //   try { newContent = JSON.parse(newContentString); } catch (e) { /*  */ }
    //   console.log(' - newContent:41 >', newContent); // eslint-disable-line no-console
    //   this.contentNew = newContent;
    // },
    setCode() {
      this.contentString = JSON.stringify({
        name: 'Send bot message',
        url: 'https://kpi.wtf/_bot/',
      }, null, 2);
    },
  },
}

</script>
