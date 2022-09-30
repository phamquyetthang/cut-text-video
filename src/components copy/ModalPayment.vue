<template>
  <div class="text-center">
    <v-dialog v-model="showDialog" max-width="700px" scrollable>
      <v-card>
        <v-card-title class="d-block">
          <div class="d-flex">
            <div style="flex: 1;" class="text-center">
              <h2 class=" font-weight-bold">Nạp Tiền</h2>
            </div>
            <v-btn
              icon
              @click="showDialog = false"
              style="position: absolute; right: 10px;"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
          <div class="font-weight-bold">
            <h5>Lựa chọn phương thức thanh toán:</h5>
          </div>
        </v-card-title>

        <v-card-text style="color: #000 !important">
          <v-row>
            <v-col
              cols="auto"
              v-for="(bank, index) in listPaymentMethod"
              :key="index"
            >
              <v-card
                style="
                padding: 5px;
                border: 1px solid gray;
                border-radius: 5px;
              "
                :style="bank.style"
                :class="{
                  payment_selected: paymentSelected.bank === bank.bank
                }"
              >
                <img
                  @click="onSelectPayment(bank)"
                  :src="bank.icon"
                  alt=""
                  style="
                  height: 50px;
                  width: 120px;
                  border-radius: 10px;
                  cursor: pointer;
                "
                />
              </v-card>
            </v-col>
          </v-row>
          <h3 class="mt-3">Thông tin thanh toán:</h3>

          <v-list class="font-weight-bold">
            <v-list-item>
              <v-col>Phương thức thanh toán</v-col>
              <v-col style="color: green !important">
                {{ paymentSelected.bankName }}</v-col
              >
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-col>Số tài khoản</v-col>
              <v-col style="color: red !important">
                {{ paymentSelected.user_stk }}</v-col
              >
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-col>Người thụ hưởng</v-col>
              <v-col class="text-text-uppercase">
                {{ paymentSelected.user_name }}</v-col
              >
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-col>Số tiền</v-col>
              <v-col>
                {{
                  packageSelected
                    ? packageSelected.price.toLocaleString("it-IT")
                    : "100.000 "
                }}
                <span style="color: black; font-weight: bold">VNĐ </span>
                <span style="color: red !important"
                  >(Nạp tối thiểu 100.000)</span
                ></v-col
              >
            </v-list-item>
            <v-divider></v-divider>

            <v-list-item>
              <v-col>Nội dung chuyển tiền</v-col>
              <v-col style="color: green !important">
                {{
                  packageSelected
                    ? paymentSelected.description
                    : "NAP" + paymentSelected.description
                }}
                <span style="color: red !important"
                  >(Viết In Hoa - Không Cách)</span
                ></v-col
              >
            </v-list-item>
          </v-list>
          <div>
            <span class="font-weight-bold">
              <span style="color: red; font-size: 20px">*</span> Lưu ý:</span
            >
            <p class="m-0">
              - Chuyển khoản theo hình thức
              <span class="font-weight-bold">24/7.</span>
            </p>
            <p class="m-0">- Lưu lại hình ảnh chuyển khoản.</p>
            <p class="m-0">- Không hoàn tiền bất kỳ lí do nào.</p>
            <p class="m-0">
              - Hệ thống sẽ tự động cập nhật trong vòng 1 -> 5 phút. Nếu quá 5
              phút chưa thấy tài khoản được cập nhật. Hãy liên hệ với
              <a
                target="_blank"
                style="font-weight: bold"
                href="https://www.facebook.com/106506441311541"
                >Đội ngũ hỗ trợ</a
              >
              để giải quyết.!
            </p>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDialog: false,
      listPaymentMethod: [
        {
          bank: "TECH_COM_BANK",
          bankName: "Techcombank",
          icon: `/static/assets/icons/payments/Techcombank_logo.png`,
          user_stk: "19036792437015",
          user_name: "NGUYEN TUAN BAC",
          user_chi_nhanh: "",
          style: {
            backgroundColor: "#fff"
          }
        }
        // {
        //   bank: "VIET_COM_BANK",
        //   bankName: "Vietcombank",
        //   icon: `/static/assets/icons/payments/Vietcombank_Logo.png`,
        //   user_stk: "1018924004",
        //   user_name: "NGUYEN TUAN BAC",
        //   user_chi_nhanh: ""
        // }
        // {
        //   bank: "TIEN_PHONG_BANK",
        //   bankName: "Tiên Phong Bank",
        //   icon: `/static/assets/icons/payments/tp-bank.svg`,
        //   user_stk: "00450524002",
        //   user_name: "NGUYEN TUAN BAC",
        //   user_chi_nhanh: "",
        //   style: {
        //     backgroundColor: "#6d3a87"
        //   }
        // }
      ],
      paymentSelected: {
        bank: "",
        bankName: "",
        icon: ``,
        user_stk: "",
        user_name: "",
        user_chi_nhanh: "",
        description: ""
      }
    };
  },
  props: ["packageSelected"],
  methods: {
    show() {
      this.showDialog = true;
    },
    hide() {
      this.showDialog = false;
    },
    async onSelectPayment(bank) {
      this.paymentSelected = {
        ...bank,
        description: this.$store.state.user.index
      };
    },
    async onConfirmPayment() {
      let res = await PaymentApi.onPayment({ bank: this.paymentSelected.bank });
      this.$refs.modalPayment.hide();
    }
  },
  mounted() {
    let index = this.$store.state.user ? this.$store.state.user.index : "";
    this.paymentSelected = {
      ...this.listPaymentMethod[0],
      description: index
    };
  }
};
</script>

<style>
.payment_selected {
  border: 2px solid #007bff !important;
}
</style>



// WEBPACK FOOTER //
// src/components/ModalPayment.vue