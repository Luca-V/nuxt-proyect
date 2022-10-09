<template>
  <div>
    <div>
      <card>
        <template>
          <div class="row">
            <div class="col-md-5">
              <img
                slot="image"
                class="card-img-top"
                :src="`../../${plugin.photo}`"
                alt="Card image cap"
              />
            </div>
            <div class="col-md-7">
              <div class="row">
                <h1 class="col-md-6">{{ plugin.title }}</h1>
                <div class="pull-right col-md-6"></div>
              </div>
              <hr />
              <div v-html="plugin.description"></div>
              <br /><br /><br />
              <hr />
              <div class="row">
                <h2 class="text-on-back col-md-6">${{ plugin.price }}</h2>
                <el-select
                  placeholder="Select Quantitiy"
                  class="select-primary col-md-6"
                  v-model="quantity"
                  style="width: 100%"
                >
                  <el-option class="text-dark" value="1" label="1"> </el-option>
                </el-select>
              </div>

              <el-tooltip
                content="Edit plugin data"
                :open-delay="300"
                placement="top"
              >
                <div style="padding-top: 50px">
                  <nuxt-link
                    :to="`/admin/plugin/${id}`"
                    class="btn btn-block btn-warning mb-5 mx-2"
                    >Change plugin data</nuxt-link
                  >
                </div>
              </el-tooltip>
              <el-tooltip
                content="Edit plugin data"
                :open-delay="300"
                placement="top"
              >
                <base-button
                  @click="editPlugin = true"
                  class="btn btn-block btn-success mb-5 mx-2"
                  >Change plugin file</base-button
                >
              </el-tooltip>
              <modal :show.sync="editPlugin">
                <template slot="header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Plugin file
                  </h5>
                </template>
                <div class="container text-center">
                  <div
                    class="d-flex justify-content-center"
                  >
                    <div class="btn btn-mdb-color btn-rounded float-left">
                      <span>Insert plugin</span>
                      <input
                        type="file"
                        ref="plugin"
                        v-on:change="handleFilePlugin()"
                      />
                    </div>
                  </div>
                </div>
                <template slot="footer">
                  <base-button type="secondary" @click="editPlugin = false"
                    >Close</base-button
                  >
                  <base-button type="primary" @click="onChangePlugin()">Save changes</base-button>
                </template>
              </modal>
            </div>
          </div>
        </template>
      </card>
    </div>
  </div>
</template>

<script>
import { Select, Option } from "element-ui";
export default {
  middleware: ["authenticated", "authenticatedADM"],
  components: {
    [Option.name]: Option,
    [Select.name]: Select,
  },
  data() {
    return {
      id: this.$route.params.id,
      plugin: {},
      pluginFile: "",
      editPlugin: {},
      editPlugin: false,
    };
  },
  created() {
    this.getPlugin();
  },
  methods: {
    getPlugin() {
      this.$axios.get(`/plugin/${this.id}`).then((res) => {
        const data = res.data.data;
        this.plugin = data;
        console.log(this.plugin);
      });
    },
    handleFilePlugin(){
      this.pluginFile = this.$refs.plugin.files[0]
      console.log(this.pluginFile);
    },
    onChangePlugin(){
      let config = {
        headers: {
          token: this.$store.state.auth.token
        },
         params: {
           pluginId: this.plugin._id
         }
      }
      let data = new FormData()
      data.append('pluginFile', this.pluginFile)
      this.$axios.put('/pluginFile',data,config)
      .then(res => {
        console.log(res.data);
         this.$notify({
            type: "success",
            icon: "tim-icons icon-check-2",
            message: "You has changed plugin file!!",
          });
      })
      .catch(err => {
        console.log(err.response);
      })
    }
  },
};
</script>

<style>
#image {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  height: auto;
}
</style>