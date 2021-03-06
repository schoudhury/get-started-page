<template>
  <q-page class="flex flex-center">
    <section class="hero-overview">
      <div class="overview-container">
        <h3 class="overview-statement">The leading high-performance distributed SQL database</h3>
        <h1>Get started</h1>
        <p>YugabyteDB server and SQL shell are released under open source Apache 2.0 license</p>
      </div>
    </section>
    <ul id="dropdown-options-container">
      <li>
        <q-select style="width: 300px"
          filled
          label="Service"
          v-model="selectedService"
          :options="serviceOptions" />
      </li>
      <li v-if="selectedService.value === 'local'">
        <q-select style="width: 300px" filled label="Platform" v-model="selectedPlatform" :options="platformOptions" />
      </li>
      <li v-else-if="selectedService.value === 'cloud'">
        <q-select style="width: 300px" filled label="Cloud Provider" v-model="selectedDeploy" :options="deployOptions" />
      </li>
    </ul>
    <div class="service-tabs-container">
      <div class="service-options">
        <div :class="selectedService.value === 'local' ? 'service-cluster-option active' : 'service-cluster-option'"
          @click="clickServiceTab(0)"
        >
          <h3>Local Install</h3>
          <h2>Download</h2>
        </div>
        <div :class="selectedService.value === 'cloud' ? 'service-cluster-option active' : 'service-cluster-option'"
          @click="clickServiceTab(1)"
        >
          <h3>Multi-node cluster</h3>
          <h2>Deploy</h2>
        </div>
        <div :class="selectedService.value === 'managed' ? 'service-cluster-option active' : 'service-cluster-option'"
          @click="clickServiceTab(2)"
        >
          <h3>Fully-Managed Cloud</h3>
          <h2>Sign Up</h2>
        </div>
      </div>
    </div>
    <div v-if="selectedService.value === 'local'" id="local-cluster-content" class="content">
      <div class="os-selection-container">
        <yb-button label="macOS" :active="selectedPlatform.value === 'macos'" v-bind:handleClick="() => handleSelectSection(this.platformOptions[0])">
          <img src="../assets/macos-icon.svg" />
        </yb-button>
        <yb-button label="Linux" :active="selectedPlatform.value === 'linux'" v-bind:handleClick="() => handleSelectSection(this.platformOptions[1])">
          <img src="../assets/linux-icon.svg" />
        </yb-button>
        <yb-button label="Kubernetes" :active="selectedPlatform.value === 'kubernetes'" v-bind:handleClick="() => handleSelectSection(this.platformOptions[2])">
          <img src="../assets/kubernetes-icon.svg" />
        </yb-button>
        <yb-button label="Docker" :active="selectedPlatform.value === 'docker'" v-bind:handleClick="() => handleSelectSection(this.platformOptions[3])">
          <img src="../assets/docker-icon.png" />
        </yb-button>
      </div>

      <div class="os-install-content">
        <mac-install v-if="selectedPlatform.value === 'macos'"></mac-install>
        <linux-install v-if="selectedPlatform.value === 'linux'"></linux-install>
        <kubernetes-install v-if="selectedPlatform.value === 'kubernetes'"></kubernetes-install>
        <docker-install v-if="selectedPlatform.value === 'docker'"></docker-install>
      </div>

    </div>
    <div v-else-if="selectedService.value === 'cloud'" id="cloud-cluster-content" class="content">
      <div class="cloud-selection-container">
        <div>
          <q-btn :ripple="false" class="testing" id="aws-header-btn"
            :class="selectedDeploy.value === 'aws' ? 'cloud-providers-container active' : 'cloud-providers-container'"
            v-on:click="handleSelectSection(deployOptions[0])"
          >
            <div><img width="95" src="../assets/aws-logo-black.png" /></div>
          </q-btn>
        </div>
        <div>
          <q-btn :ripple="false" id="gcp-header-btn"
            :class="selectedDeploy.value === 'gcp' ? 'cloud-providers-container active' : 'cloud-providers-container'"
            v-on:click="handleSelectSection(deployOptions[1])"
          >
            <img width="200" src="../assets/gcp-logo.svg" />
          </q-btn>
        </div>
        <div>
          <q-btn :ripple="false" id="azure-header-btn"
            :class="selectedDeploy.value === 'azure' ? 'cloud-providers-container active' : 'cloud-providers-container'"
            v-on:click="handleSelectSection(deployOptions[2])"
          >
            <img width="220" src="../assets/azure-logo-small.png" />
          </q-btn>
        </div>
        <div>
          <q-btn :ripple="false" id="pivotal-header-btn"
            :class="selectedDeploy.value === 'pivotal' ? 'cloud-providers-container active' : 'cloud-providers-container'"
            v-on:click="handleSelectSection(deployOptions[3])"
          >
            <div><img width="150" src="../assets/pivotal.svg" /></div>
          </q-btn>
        </div>
      </div>

      <div class="os-install-content">
        <aws-deploy v-if="selectedDeploy.value === 'aws'"></aws-deploy>
        <gcp-deploy v-if="selectedDeploy.value === 'gcp'"></gcp-deploy>
        <azure-deploy v-if="selectedDeploy.value === 'azure'"></azure-deploy>
        <pivotal-deploy v-if="selectedDeploy.value === 'pivotal'"></pivotal-deploy>
      </div>
    </div>
    <div v-else id="managed-cluster-content" class="content">
      <div class="managed-cluster-container">
        <div>
          <p>Experience our fully-managed cloud service using the link below.</p>
        </div>
        <a href="https://cloud.yugabyte.com/register" target="_blank">
          <q-btn size="24px" class="sign-up-btn" color="secondary" label="Sign Up"></q-btn>
        </a>
      </div>
    </div>
  </q-page>
</template>

<script>
import MacInstall from 'components/MacInstall'
import LinuxInstall from 'components/LinuxInstall'
import DockerInstall from 'components/DockerInstall'
import KubernetesInstall from 'components/KubernetesInstall'
import AWSDeploy from 'components/AWSDeploy'
import GCPDeploy from 'components/GCPDeploy'
import AzureDeploy from 'components/AzureDeploy'
import PivotalDeploy from 'components/PivotalDeploy'
import YBButton from 'components/YBButton'

import { event, page } from 'vue-analytics'

export default {
  name: 'PageIndex',
  data: function () {
    const serviceOptions = [
      {
        label: 'Local Install',
        value: 'local'
      },
      {
        label: 'Multi-Node Cluster',
        value: 'cloud'
      },
      {
        label: 'Fully-Managed Cloud',
        value: 'managed'
      }
    ]
    const platformOptions = [
      {
        label: 'macOS',
        value: 'macos'
      },
      {
        label: 'Linux',
        value: 'linux'
      },
      {
        label: 'Kubernetes',
        value: 'kubernetes'
      },
      {
        label: 'Docker',
        value: 'docker'
      }
    ]
    const deployOptions = [
      {
        label: 'Amazon Web Services',
        value: 'aws'
      },
      {
        label: 'Google Cloud Platform',
        value: 'gcp'
      },
      {
        label: 'Microsoft Azure',
        value: 'azure'
      },
      {
        label: 'Pivotal',
        value: 'pivotal'
      }
    ]
    let selectedService = serviceOptions[0]
    let selectedPlatform = platformOptions[0]
    let selectedDeploy = deployOptions[0]

    if (this.$route.params.service) {
      switch (this.$route.params.service) {
        case 'cloud':
          selectedService = serviceOptions[1]
          break
        case 'managed':
          selectedService = serviceOptions[2]
          break
        default:
          selectedService = serviceOptions[0]
      }
    }
    if (this.$route.hash) {
      switch (this.$route.hash) {
        case '#macos':
          selectedPlatform = platformOptions[0]
          break
        case '#linux':
          selectedPlatform = platformOptions[1]
          break
        case '#kubernetes':
          selectedPlatform = platformOptions[2]
          break
        case '#docker':
          selectedPlatform = platformOptions[3]
          break
        case '#aws':
          selectedDeploy = deployOptions[0]
          break
        case '#gcp':
          selectedDeploy = deployOptions[1]
          break
        case '#azure':
          selectedDeploy = deployOptions[2]
          break
        case '#pivotal':
          selectedDeploy = deployOptions[3]
          break
        default:
          break
      }
    }

    return {
      selectedService,
      serviceOptions,
      selectedPlatform,
      platformOptions,
      selectedDeploy,
      deployOptions,

      // Dirty means a tab or button was clicked
      dirty: false,
      scrolled: false
    }
  },
  components: {
    'mac-install': MacInstall,
    'linux-install': LinuxInstall,
    'docker-install': DockerInstall,
    'kubernetes-install': KubernetesInstall,
    'yb-button': YBButton,
    'aws-deploy': AWSDeploy,
    'gcp-deploy': GCPDeploy,
    'azure-deploy': AzureDeploy,
    'pivotal-deploy': PivotalDeploy
  },
  props: ['onScroll'],
  methods: {
    handleSelectSection: function (section) {
      if (this.selectedService.value === 'local') {
        this.selectedPlatform = section
      } else {
        this.selectedDeploy = section
      }
      window.history.pushState('platform', '', `${window.location.pathname}#${section.value}`)
      this.dirty = true
      event({
        eventCategory: 'Install-Page',
        eventAction: `click.${this.selectedService.value}.${section.value}`,
        eventLabel: `User clicked ${section.value} section button`
      })
    },
    clickServiceTab: function (index) {
      this.selectedService = this.serviceOptions[index]
      window.history.pushState('service', '', this.selectedService.value)
      this.dirty = true
      event({
        eventCategory: 'Install-Page',
        eventAction: `click.${this.selectedService.value}.tab`,
        eventLabel: `User clicked ${this.selectedService.label}`
      })
    },
    scrollContent: function () {
      if (!this.dirty && !this.scrolled) {
        if (this.selectedService.value === 'local') {
          event({
            eventCategory: 'Install-Page',
            eventAction: `click.local.${this.selectedPlatform.value}`,
            eventLabel: `User clicked ${this.selectedPlatform.value} section button`
          })
        } else if (this.selectedService.value === 'cloud') {
          event({
            eventCategory: 'Install-Page',
            eventAction: `click.cloud.${this.selectedDeploy.value}`,
            eventLabel: `User clicked ${this.selectedDeploy.value} section button`
          })
        }
        this.scrolled = true
      }
      if (this.onScroll) {
        // Execute callback from parent if available
        this.onScroll()
      }
    }
  },
  mounted: function () {
    page('/') // Send pageview stat to Google Analytics
  },
  beforeMount () {
    window.addEventListener('scroll', this.scrollContent)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.scrollContent)
  }
}
</script>
