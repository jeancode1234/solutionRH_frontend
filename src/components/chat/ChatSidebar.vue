<template>
  <aside
    class="w-72 bg-white dark:bg-gray-800 border-r dark:border-gray-700 flex flex-col transition-all duration-300"
  >
    <!-- Header -->
    <div class="flex items-center justify-between p-4 border-b dark:border-gray-700">
      <h2 class="font-semibold text-gray-700 dark:text-gray-200">Messagerie</h2>
      <button
        @click="$emit('createGroup')"
        class="p-2 rounded hover:bg-blue-100 dark:hover:bg-gray-700"
        title="Créer un groupe"
      >
        <i class="ri-add-line text-xl text-blue-600"></i>
      </button>
    </div>

    <!-- Onglets -->
    <div class="flex border-b dark:border-gray-700 text-sm">
      <button
        @click="activeTab = 'groups'"
        :class="[
          'flex-1 py-2 font-medium',
          activeTab === 'groups'
            ? 'border-b-2 border-blue-600 text-blue-600'
            : 'text-gray-500 dark:text-gray-400',
        ]"
      >
        Groupes
      </button>
      <button
        @click="activeTab = 'contacts'"
        :class="[
          'flex-1 py-2 font-medium',
          activeTab === 'contacts'
            ? 'border-b-2 border-blue-600 text-blue-600'
            : 'text-gray-500 dark:text-gray-400',
        ]"
      >
        Conversations
      </button>
    </div>

    <!-- Liste des groupes ou contacts -->
    <div class="flex-1 overflow-y-auto">
      <template v-if="activeTab === 'groups'">
        <div
          v-for="g in groups"
          :key="g.id"
          @click="$emit('openChat', g)"
          class="p-3 border-b dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer"
          :class="{ 'bg-blue-100 dark:bg-gray-700': activeChat?.id === g.id }"
        >
          <p class="font-medium">{{ g.name }}</p>
          <p class="text-xs text-gray-500">{{ g.members.length }} membres</p>
        </div>
      </template>

      <template v-else>
        <div
          v-for="c in contacts"
          :key="c.id"
          @click="$emit('openChat', c)"
          class="p-3 border-b dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer"
          :class="{ 'bg-blue-100 dark:bg-gray-700': activeChat?.id === c.id }"
        >
          <div class="flex justify-between items-center">
            <span>{{ c.name }}</span>
            <span
              class="w-2 h-2 rounded-full"
              :class="c.status === 'online' ? 'bg-green-500' : 'bg-gray-400'"
            ></span>
          </div>
        </div>
      </template>
    </div>
  </aside>
</template>

<script setup>
import { ref,defineProps } from "vue";
 defineProps(["groups", "contacts", "activeChat"]);
const activeTab = ref("groups");
</script>
