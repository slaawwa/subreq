<template>
  <AceEditor 
    v-model="contentResult" 
    @init="editorInit"
    @onChange1="onChangeContent"
    lang="json" 
    data-theme="chrome"
    width="100%" 
    height="auto"
    data-min-height="100px"
    :options="{
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      fontSize: 14,
      highlightActiveLine: true,
      enableSnippets: true,
      showLineNumbers: true,
      tabSize: 2,
      showPrintMargin: false,
      showGutter: true,
    }"
    :commands="[{
      name: 'save',
      bindKey: { win: 'Ctrl-s', mac: 'Command-s' },
      exec: dataSumit,
      readOnly: true,
    }]"
  />
</template>

<script>
import AceEditor from 'vuejs-ace-editor';

const ace = require('brace');
const Range = ace.acequire('ace/range').Range;

const FULL_LINE = 'myMarker';

function removeAllMargers(session = {}) {
  const markers = session?.getMarkers();

  Object.keys(markers).forEach((k) => {
    const item = markers[k];
    if (item.clazz === FULL_LINE) {
      session?.removeMarker(k)
    }
  })
  // console.log(' - c:65 >', cc.map((_c, i) => [i, _c.match(/"(.*?)"/)?.[1]])); // eslint-disable-line no-console
}

function getNewMargers(validKeys = [], contentJsonString) {
  const markers = [];
  try {
    const res = contentJsonString.split('\n').map((k, i) => [i, k.trim().split('":')[0].replace(/^"/, '')])
    res.forEach(([line, key]) => {
      if (!['{', '}', '},', ...validKeys].includes(key)) {
        const range = new Range(line, 0, line, 10);
        markers.push([range, FULL_LINE, 'fullLine'])
      }
    })
  } catch (e) {
    //
  }
  return markers;
}

function setMargers(session, markers = []) {
  markers.forEach(params => session?.addMarker(...params))
}

export default {
  props: {
    validKeys: {
      default: () => [],
      type: Array,
    },
    value: {
      default: null,
      type: String,
    },
    onInit: {
      default: null,
      type: Function,
    },
    // onChange: {
    //   default: null,
    //   type: Function,
    // },
  },
  data() {
    return {
      editor: null,
      // VALID_KEYS: ['name', 'test0', 'test1'],
      contentResult: typeof this.value === 'string' ? this.value : (
        JSON.stringify(this.value, null, 2)
      ),
      // content: JSON.stringify({
      //   name: 'Slawwa js dev',
      //   test: true,
      //   test0: {
      //     test1: true,
      //     test2: true,
      //     test_: !true,
      //     test3: false,
      //     test4: true,
      //   },
      // }, null, 2),
    };
  },
  components: {
    AceEditor,
    // editor: require('vue2-ace-editor'),
  },
  // computed: {
  //   contentObj() {
  //     return JSON.stringify(this.contentObj, null, 2);
  //   },
  // },
  watch: {
    contentResult(content) {
      removeAllMargers(this?.editor?.session)
      const markers = getNewMargers(this.validKeys, content)
      setMargers(this?.editor?.session, markers)
      // console.log(' - this.onChange:114 >', this.onChange); // eslint-disable-line no-console
      this.$emit('input', content);
      // this.$emit('onChange', content);
      // if (this.onChange) {
      //   console.log(' - content:114 >', content); // eslint-disable-line no-console
      //   this.onChange(content);
      // }
    },
    value(content) {
      this.contentResult = typeof content === 'string' ? content : (
        JSON.stringify(content, null, 2)
      );
    },
  },
  methods: {
    dataSumit() {
      // code here
    },
    onChangeContent(/* c */) {
      // code here
    },
    editorInit(editor) {
      this.editor = editor;
      this.$emit('onInit', editor);
      window.editor = editor;
      require('brace/ext/language_tools') //language extension prerequsite...
      // require('brace/mode/html')                
      require('brace/mode/json')    //language
      // require('brace/mode/javascript')    //language
      // require('brace/mode/less')
      // require('brace/theme/monokai')
      require('brace/theme/chrome')
      require('brace/snippets/json') //snippet
      // require('brace/snippets/javascript') //snippet

      if (this.contentResult) {
        const markers = getNewMargers(this.validKeys, this.contentResult)
        setMargers(this?.editor?.session, markers)
      }

      // const m1 = new Range(5, 0, 5, 10);
      // window.m1 = m1;
      // editor.session.addMarker(
      //   m1, "myMarker", "fullLine"
      // );
    }
  },
};
</script>
