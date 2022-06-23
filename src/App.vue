<template>
  <div id="app">
    <div class="container-fluid">
      <div class="headertxt"><h1>POC: XSL Editor with Live Preview</h1></div>
      <div class="config">
        <div class="cnfg conlft">
          <h2 class="mt-5">XML to render</h2>
          <input type="file" @change="processXml($event.target.files[0])" />
          <button @click="renderPreview">Render</button>
        </div>
        <div class="cnfg conrght">
          <h2 class="mt-5">XSL TEMPLATE</h2>
          <a class="btn-dwnld" href="#">master-catalog</a>
          <a class="btn-dwnld" href="#">nav-catalog</a>
          <a class="btn-dwnld" href="#">library - folder</a>
          <a class="btn-dwnld" href="#">library - content</a>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col">
          <h2>XSL</h2>
          <prism-editor v-model="xsl" language="xml" line-numbers />
        </div>
        <div class="col">
          <h2>Preview</h2>
          <iframe
            ref="preview"
            height="100%"
            width="100%"
            frameborder="0"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PrismEditor from "vue-prism-editor";
import { parseXml } from "./XmlParser";
import { renderXslToIframe } from "./XslRenderer";

export default {
  name: "App",
  data() {
    return {
      xsl: null,
      xml: null,
      timer: null,
    };
  },
  components: {
    PrismEditor,
  },
  methods: {
    processXml(file) {
      const reader = new FileReader();
      reader.onload = (res) => {
        this.xml = res.target.result;
        if (this.xsl) {
          this.renderPreview();
        }
      };
      reader.readAsText(file);
    },
    async renderPreview() {
      console.log("render");
      const xml = parseXml(this.xml);
      const xsl = parseXml(this.xsl);
      renderXslToIframe(xml, xsl, this.$refs.preview.contentWindow.document);
    },
    handleRenderTimeout() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.renderPreview();
      }, 1200);
    },
  },
  watch: {
    xsl() {
      this.handleRenderTimeout();
    },
  },
};
</script>

