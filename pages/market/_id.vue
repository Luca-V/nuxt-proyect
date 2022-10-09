<template>
  <div>
    <div>
      <card>
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
            <h1>{{ plugin.title }}</h1>
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
                <el-option class="text-dark" value="2" label="2"> </el-option>
                <el-option class="text-dark" value="3" label="3"> </el-option>
                <el-option class="text-dark" value="4" label="4"> </el-option>
                <el-option class="text-dark" value="5" label="5"> </el-option>
                <el-option class="text-dark" value="6" label="6"> </el-option>
                <el-option class="text-dark" value="7" label="7"> </el-option>
                <el-option class="text-dark" value="8" label="8"> </el-option>
                <el-option class="text-dark" value="9" label="9"> </el-option>
                <el-option class="text-dark" value="10" label="10"> </el-option>
              </el-select>
            </div>
            <div v-if="quantity === 0">
              <el-tooltip
                content="Please add quantity"
                :open-delay="300"
                placement="top"
              >
                <base-button
                  disabled
                  type="success"
                  size="lg"
                  class="mb-3"
                  block
                >
                  Buy Now!
                </base-button>
              </el-tooltip>
              <el-tooltip
                content="Please add quantity"
                :open-delay="300"
                placement="top"
              >
                <base-button
                  :disabled="quantity === 0"
                  type="warning"
                  size="lg"
                  class="mb-3"
                  block
                >
                  Add to cart
                </base-button>
              </el-tooltip>
            </div>
            <div v-else>
              <base-button
                @click="payNow()"
                type="success"
                size="lg"
                class="mb-3"
                block
              >
                Buy Now!
              </base-button>
              <base-button
                @click.prevent="
                  addToCart();
                  $nuxt.$emit('update-cart');
                "
                type="warning"
                size="lg"
                class="mb-3"
                block
              >
                Add to cart
              </base-button>

            </div>
          </div>
        </div>
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
      quantity: 0,
    };
  },
  mounted() {
    this.getPlugin();
  },
  methods: {
    getPlugin() {
      this.$axios.get(`/plugin/${this.id}`).then((res) => {
        this.plugin = res.data.data;
        console.log(this.plugin);
      });
    },
    addToCart() {
      let config = {
        headers: {
          token: this.$store.state.auth.token,
        },
      };
      const IPs = Number(this.quantity);

      const pluginName = this.plugin.title;
      const pluginId = this.plugin._id;
      const toCreate = {
        IPs: IPs,
        pluginName: pluginName,
        pluginId: pluginId,
        userId: this.$store.state.auth.userData._id,
        totalPrice: this.plugin.price * this.quantity,
        price: this.plugin.price,
        pluginImage: this.plugin.photo,
      };
      console.log(config);
      this.$axios
        .post("/new-cart", toCreate, config)
        .then((res) => {
          $nuxt.$emit("update-cart");
          this.quantity = 0;
          this.$notify({
            type: "success",
            icon: "tim-icons icon-check-2",
            message: "Plugin added to cart",
          });
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
    payNow(){
      if (this.$store.state.auth !== null) {
        let toPay = {
          pluginName: this.plugin.title,
          pluginId: this.plugin._id,
          quantity: this.quantity,
          unitPrice: this.plugin.price,
          totalPrice: this.plugin.price * this.quantity,
          pluginPhoto: this.plugin.photo,
          userId: this.$store.state.auth.userData._id
        }
        sessionStorage.setItem('Paynow', JSON.stringify(toPay))
          $nuxt.$router.push("/checkout");
        return
      }
    }
  },
};
</script>

<style>
</style>