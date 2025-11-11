<template>
    <div
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm z-50 transition-all">
        <div
            class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 w-8/12 md:w-4/12 transform transition-all duration-300 scale-100">
            <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 text-center mb-2">
                Déconnexion
            </h2>
            <p class="text-gray-500 dark:text-gray-400 text-sm text-center mb-5">
                Êtes-vous sûr de vouloir vous déconnecter ?
            </p>

            <div class="flex justify-between gap-3">
                <button @click="$emit('close')"
                    class="flex-1 py-2 rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                    Annuler
                </button>
                <button @click="$emit('confirm')"
                    class="flex-1 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition">
                    Oui, me déconnecter
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LogoutModal'
}
</script>
