<template>
  <div>
    <h3 class="config-form-header">
      1. Generate config file
    </h3>
    <div class="config-form-container">
      <div class="form-control">
        <div class="row config-form-row">
          <q-input class="form-input" :label="`${providerName} Access Key`" v-model="accessKeyInput"/>
          <q-input class="form-input" :label="`${providerName} Secret Key`" v-model="secretKeyInput"/>
        </div>
        <div class="row config-form-row">
          <q-input class="form-input" label="SSH Keypair" v-model="sshKeyPairInput"/>
          <q-input class="form-input" label="SSH Key Path" v-model="sshKeyPathInput"/>
        </div>
          <div class="row config-form-row">
          <q-input class="form-input" label="Security Group Id" v-model="securityGroupIdInput"/>
          <q-input class="form-input" label="VPC ID" v-model="vpcIdInput"/>
        </div>
          <q-input label="Subnet IDs" v-model="subnetIdsInput"/>
        </div>
      <q-btn color="secondary" label="Generate" @click="handleButtonClick" />
    </div>
    <div v-if="sampleConfigFile" id="sample-config-block">
      <copy-button :text="sampleConfigFile"></copy-button>
      <pre>{{ sampleConfigFile }}</pre>
    </div>
    <h3 class="config-form-header">
      2. Create cluster
    </h3>
    <div class="bg-grey-3 q-tab-panel code-relative">
      <copy-button :text="terraformBashLines"></copy-button>
      <pre class="code-container" id="exec-code-block">
        <code class="pre-helper pre-helper--shell" v-for="(line, index) in terraformBashLines" v-bind:key="`terraform-${index}`">{{ line }}</code>
      </pre>
    </div>
  </div>
</template>

<script>
import terraformCode, { generateConfig } from './snippets/terraformDeploy'
import CopyButton from './CopyButton'

export default {
  name: 'TerraformForm',
  data: function () {
    return {
      /* Input form bindings */
      accessKeyInput: undefined,
      secretKeyInput: undefined,
      sshKeyPairInput: undefined,
      sshKeyPathInput: undefined,
      securityGroupIdInput: undefined,
      vpcIdInput: undefined,
      subnetIdsInput: undefined,

      sampleConfigFile: '',
      terraformBashLines: terraformCode.trim().split('\n')
    }
  },
  components: {
    'copy-button': CopyButton
  },
  methods: {
    handleButtonClick: function () {
      this.sampleConfigFile = generateConfig(
        this.code,
        this.accessKeyInput,
        this.secretKeyInput,
        this.sshKeyPairInput,
        this.sshKeyPathInput,
        this.securityGroupIdInput,
        this.vpcIdInput,
        this.subnetIdsInput
      )
    }
  },
  props: {
    code: {
      type: String,
      required: true
    },
    providerName: {
      type: String
    }
  }
}
</script>
