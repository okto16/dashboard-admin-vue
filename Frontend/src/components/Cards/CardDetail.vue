<template>
  <button
    type="button"
    @click="openModal"
    class="mb-2 text-sm font-semibold tracking-tight text-blue-400 underline"
  >
    Lihat Detail Transaksi
  </button>
  <TransitionRoot appear :show="isOpen">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>
      <div class="fixed inset-0 overflow-y-auto">
        <div
          v-for="transaction in transactions"
          :key="transaction.id"
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all divide-y divide-gray-200 dark:divide-gray-700"
            >
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-bold">Detail Transaksi</h3>
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md btransaction btransaction-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  X
                </button>
              </div>
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                <div class="divide-y divide-gray-200 dark:divide-gray-700">
                  <h3 class="py-3">Pesanan {{ transaction.status }}</h3>
                  <div class="flex justify-between font-normal text-sm py-2">
                    <h3 class="text-gray-400">Tanggal Pembelian</h3>
                    <p class="text-gray-600">{{transaction.transaction_date }}</p>
                  </div>
                </div>
              </DialogTitle>
              <div class="mt-2">
                <p class="text-md font-medium py-2">Detail Produk</p>
                <div
                  class="p-6 bg-white btransaction btransaction-gray-200 rounded-lg shadow dark:bg-gray-800 dark:btransaction-gray-700 mb-2"
                >
                  <div class="flex space-x-2 rounded-lg items-center p-2">
                    <img
                      class="object-cover w-full rounded-t-lg h-16 md:h-auto md:w-16 md:rounded-none md:rounded-s-lg"
                      :src="transaction.product_image"
                      alt=""
                    />
                    <div class="flex-col w-full">
                      <h5
                        class="text-md font-semibold tracking-tight text-gray-900 dark:text-white"
                      >
                        {{ transaction.product_name }}
                      </h5>
                      <p class="text-sm font-normal text-gray-400">
                        {{ transaction.product_category }}
                      </p>
                      <p class="text-sm font-normal text-gray-400">
                        {{
                          transaction.product_price.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })
                        }}
                      </p>
                    </div>
                    <div class="btransaction-l-2 w-full">
                      <div class="ml-2 text-sm font-normal text-gray-400">
                        Total Harga
                        <h3 class="text-sm font-bold text-gray-700">
                          {{
                            transaction.subtotal.toLocaleString("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            })
                          }}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p class="text-md font-medium py-2">Detail Pengiriman</p>
                <div
                  class="flex justify-start space-x-4 font-normal text-sm py-2"
                >
                  <p class="text-sm font-normal text-gray-400">Kurir</p>
                  <p>:</p>
                  <p class="text-sm font-normal">JNE</p>
                </div>
                <div
                  class="flex justify-start space-x-4 font-normal text-sm py-2"
                >
                  <p class="text-sm font-normal text-gray-400">Alamat</p>
                  <p>:</p>
                  <p class="text-sm font-normal">{{ transaction.address }}</p>
                </div>
              </div>
              <div>
                <p class="text-md font-medium py-2">Rincian Pembayaran</p>
                <div
                  class="flex justify-start space-x-4 font-normal text-sm py-2"
                >
                  <p class="text-sm font-normal text-gray-400">
                    Metode Pembayaran
                  </p>
                  <p>:</p>
                  <p class="text-sm font-normal">{{ transaction.payment_method }}</p>
                </div>
                <div
                  class="flex justify-start space-x-4 font-normal text-sm py-2"
                >
                  <p class="text-sm font-normal text-gray-400">
                    Total Harga ({{ transaction.qty }} Barang)
                  </p>
                  <p>:</p>
                  <p class="text-sm font-normal">Rp. {{ transaction.subtotal }}</p>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script>
import { ref } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

export default {
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
  },
  data() {
    return {
      transactions: [],
      isOpen: false,
    };
  },
  methods: {
    closeModal() {
      this.isOpen = false;
    },
    openModal() {
      this.isOpen = true;
    },
  },
  created() {
    this.fetchTransaction(this.transactions);
  },
  methods: {
    async fetchTransaction() {
      try {
        const { transactions } = await getTransactionsDetails();
        this.transactions = transactions.data.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
  },
};
</script>
