<template>
  <!-- Card Item Start -->
  <div
    v-for="(stat, index) in stats"
    :key="index"
    class="rounded border border-stroke bg-blue-100 py-2 px-5 shadow-default"
  >
    <div
      class="flex h-11.5 w-11.5 items-center justify-start rounded-full bg-meta-2 dark:bg-meta-4"
      v-html="stat.icon"
    ></div>

    <div class="mt-4 flex items-end justify-cenyter">
      <div>
        <h4 class="text-title-md font-bold text-black dark:text-white">
          {{ stat.title }}
        </h4>
        <span class="text-sm font-medium">{{ stat.subtitle }}</span>
      </div>
    </div>
  </div>
  <!-- Card Item End -->
</template>
<script>
import { getStats } from "@/helpers/apiService";
import { ref } from "vue";
export default {
  data() {
    return {
      stats: [],
    };
  },
  mounted() {
    this.fetchStats();
  },
  methods: {
    async fetchStats() {
      try {
        const response = await getStats();
        const data = response.data;

        this.stats = [
          {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>`,
            subtitle: "TOTAL MEMBERS",
            title: data.total_customers,
            description: "Since last month",
            iconName: "far fa-chart-bar",
            iconColor: "bg-red-500",
          },
          {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>`,
            subtitle: "TOTAL TRANSACTIONS",
            title: data.total_transactions,
            description: "Since last month",
            iconName: "fas fa-chart-pie",
            iconColor: "bg-orange-500",
          },
          {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
</svg>`,
            subtitle: "PERFORMANCE",
            title: `${data.performance}%`,
            description: "Since last month",
            iconName: "fas fa-percent",
            iconColor: "bg-emerald-500",
          },
        ];
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    },
  },
};
</script>
