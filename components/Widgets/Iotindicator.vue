<template>
  <card>
    <div slot="header">
      <h4 class="card-title">
        {{ config.selectedDevice.name }} - {{ config.variableFullName }}
      </h4>
    </div>
    <i class="fa" :class="[config.icon, getIconColorClass()]" style="font-size: 30px"></i>
  </card>
</template>

<script>
export default {
  props: ['config'],
  data() {
    return {
      value: false,
    };
  },
  mounted() {
      //userId/dId/uniquestr/sdata
      const topic = this.config.userId + "/" + this.config.selectedDevice.dId + '/' + this.config.variable + "/sdata"
      this.$nuxt.$on(topic, this.processReceivedData)
  },
  beforeDestroy(){
      const topic = this.config.userId + "/" + this.config.selectedDevice.dId + '/' + this.config.variable + "/sdata"
      this.$nuxt.$off(topic)
  },
  methods: {
      processReceivedData(data){
        try {
          console.log("received");
          console.log(data);
          this.value = data.value;
        } catch (error) {
          console.log(error);
        }
          
      },
      getIconColorClass(){
          if (!this.value){
              return 'text-dark'
          }

          if(this.config.class === 'success'){
              return 'text-success'
          }
          if(this.config.class === 'primary'){
              return 'text-primary'
          }
          if(this.config.class === 'warning'){
              return 'text-warning'
          }
          if(this.config.class === 'danger'){
              return 'text-danger'
          }
      }
  }
};
</script>