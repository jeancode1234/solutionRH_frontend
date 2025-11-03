<template>
  <div class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md min-h-screen">
    <!-- ✅ Header -->
    <div class="flex justify-between items-center mb-6 flex-wrap gap-3">
      <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Gestion de la Paie
      </h2>
      <button
        @click="toggleForm"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {{ showForm ? "Fermer le formulaire" : "➕ Nouveau bulletin" }}
      </button>
    </div>

    <!-- ✅ Formulaire -->
    <div
      v-if="showForm"
      class="p-4 border rounded bg-gray-50 dark:bg-gray-900 mb-6"
    >
      <h3 class="text-lg font-medium mb-3 text-gray-700 dark:text-gray-200">
        Créer un bulletin
      </h3>

      <div class="grid md:grid-cols-2 gap-4">
        <div>
          <label class="block text-gray-600 dark:text-gray-300 mb-1"
            >Employé</label
          >
          <select
            v-model="form.employee"
            class="w-full p-2 border rounded dark:bg-gray-800 dark:text-gray-100"
          >
            <option disabled value="">Sélectionner...</option>
            <option v-for="emp in employees" :key="emp.id" :value="emp.name">
              {{ emp.name }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-gray-600 dark:text-gray-300 mb-1"
            >Mois</label
          >
          <input
            v-model="form.month"
            type="month"
            class="w-full p-2 border rounded dark:bg-gray-800 dark:text-gray-100"
          />
        </div>

        <div>
          <label class="block text-gray-600 dark:text-gray-300 mb-1"
            >Salaire de base (FCFA)</label
          >
          <input
            v-model.number="form.base"
            type="number"
            min="0"
            class="w-full p-2 border rounded dark:bg-gray-800 dark:text-gray-100"
          />
        </div>

        <div>
          <label class="block text-gray-600 dark:text-gray-300 mb-1"
            >Primes (FCFA)</label
          >
          <input
            v-model.number="form.bonus"
            type="number"
            min="0"
            class="w-full p-2 border rounded dark:bg-gray-800 dark:text-gray-100"
          />
        </div>

        <div>
          <label class="block text-gray-600 dark:text-gray-300 mb-1"
            >Retenues (FCFA)</label
          >
          <input
            v-model.number="form.deductions"
            type="number"
            min="0"
            class="w-full p-2 border rounded dark:bg-gray-800 dark:text-gray-100"
          />
        </div>

        <div class="md:col-span-2">
          <label class="block text-gray-600 dark:text-gray-300 mb-1"
            >Commentaire RH</label
          >
          <textarea
            v-model="form.comment"
            rows="2"
            class="w-full p-2 border rounded dark:bg-gray-800 dark:text-gray-100"
          ></textarea>
        </div>
      </div>

      <div class="mt-4 flex justify-end gap-3 flex-wrap">
        <button
          @click="generatePreview"
          class="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          Aperçu
        </button>
        <button
          @click="addBulletin"
          class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Enregistrer
        </button>
      </div>
    </div>

    <!-- ✅ Aperçu -->
    <div
      v-if="preview"
      class="p-4 mb-6 border rounded bg-gray-100 dark:bg-gray-900"
    >
      <h3 class="font-semibold text-gray-800 dark:text-gray-100 mb-2">
        Aperçu du bulletin – {{ form.employee }}
      </h3>
      <div class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        <p><strong>Mois :</strong> {{ form.month }}</p>
        <p>
          <strong>Salaire de base :</strong>
          {{ form.base.toLocaleString() }} FCFA
        </p>
        <p><strong>Primes :</strong> {{ form.bonus.toLocaleString() }} FCFA</p>
        <p>
          <strong>Retenues :</strong>
          {{ form.deductions.toLocaleString() }} FCFA
        </p>
        <p class="mt-2 font-semibold">
          Net à payer :
          {{ (form.base + form.bonus - form.deductions).toLocaleString() }} FCFA
        </p>
        <p
          v-if="form.comment"
          class="mt-2 italic text-gray-500 dark:text-gray-400"
        >
          💬 {{ form.comment }}
        </p>
      </div>
      <div class="mt-4 flex gap-3 flex-wrap">
        <button
          @click="downloadProfessionalPDF(form)"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Télécharger PDF
        </button>
        <button
          @click="sendBulletin"
          class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Envoyer à l’employé
        </button>
      </div>
    </div>

    <!-- ✅ Historique -->
    <div>
      <h3 class="text-lg font-medium mb-3 text-gray-700 dark:text-gray-200">
        Historique des bulletins
      </h3>

      <div v-if="bulletins.length" class="overflow-x-auto">
        <table
          class="min-w-full text-xs sm:text-sm border dark:border-gray-700"
        >
          <thead
            class="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          >
            <tr>
              <th class="p-3 text-left">Employé</th>
              <th class="p-3 text-left">Mois</th>
              <th class="p-3 text-center">Net à payer</th>
              <th class="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(b, i) in bulletins"
              :key="i"
              class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td class="p-3">{{ b.employee }}</td>
              <td class="p-3">{{ b.month }}</td>
              <td class="p-3 text-center">{{ b.net.toLocaleString() }} FCFA</td>
              <td class="p-3 text-center">
                <button
                  @click="downloadOfficialPDF(form)"
                  class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  Télécharger PDF
                </button>

                <button
                  @click="sendExisting(b)"
                  class="text-green-600 hover:underline"
                >
                  Envoyer
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p v-else class="text-gray-500 dark:text-gray-400 text-sm italic mt-4">
        Aucun bulletin enregistré pour le moment.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const showForm = ref(false);
const preview = ref(false);

const employees = ref([
  { id: 1, name: "Alice Dupont" },
  { id: 2, name: "Jean Mbarga" },
  { id: 3, name: "Fatou Ndiaye" },
]);

const bulletins = ref([]);

const form = ref({
  employee: "",
  month: "",
  base: 0,
  bonuses: [
    { label: "Prime de rendement", amount: 0 },
    { label: "Prime de transport", amount: 0 },
  ],
  deductions: [
    { label: "CNPS", amount: 0 },
    { label: "Retard", amount: 0 },
  ],
  comment: "",
});

function toggleForm() {
  showForm.value = !showForm.value;
}

function generatePreview() {
  if (!form.value.employee || !form.value.month) {
    toast.error("Veuillez remplir tous les champs requis.");
    return;
  }
  preview.value = true;
}

function addBulletin() {
  if (!form.value.employee)
    return toast.error("Veuillez sélectionner un employé.");
  const totalBonus = form.value.bonuses.reduce((a, b) => a + b.amount, 0);
  const totalDeduction = form.value.deductions.reduce(
    (a, b) => a + b.amount,
    0
  );
  const net = form.value.base + totalBonus - totalDeduction;
  bulletins.value.push({ ...form.value, totalBonus, totalDeduction, net });
  toast.success("Bulletin enregistré avec succès ✅");
  showForm.value = false;
  preview.value = false;
}

// ✅ Version officielle structurée et esthétique
function downloadOfficialPDF(bulletin) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  const logoUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwM3QGmms-s5_9tMcmABl1CYm6HFawaqZVEbjCgKee0q76yCX-yUpLlFkQSNPCBYCBFHc&usqp=CAU";

  // --- En-tête ---
  doc.addImage(logoUrl, "PNG", 15, 10, 25, 25);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("ENTREPRISE XYZ SARL", 105, 20, { align: "center" });
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(
    "Adresse : Yaoundé, Cameroun | Tél : +237 699 999 999 | Email : contact@xyz.com",
    105,
    26,
    { align: "center" }
  );

  doc.setDrawColor(41, 128, 185);
  doc.setLineWidth(0.5);
  doc.line(15, 32, 195, 32);

  // --- Titre principal ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("BULLETIN DE PAIE OFFICIEL", 105, 42, { align: "center" });

  // --- Bloc employé à gauche ---
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  const startY = 55;
  doc.text(`👤 Employé : ${bulletin.employee}`, 15, startY);
  doc.text(`📅 Mois : ${bulletin.month}`, 15, startY + 6);

  // --- Calculs ---
  const totalBonus = bulletin.bonuses.reduce((a, b) => a + b.amount, 0);
  const totalDeduction = bulletin.deductions.reduce((a, b) => a + b.amount, 0);
  const net = bulletin.base + totalBonus - totalDeduction;

  // --- Encadré principal ---
  doc.setDrawColor(180);
  doc.rect(14, 65, 182, 180);

  // --- Tableau détaillé ---
  autoTable(doc, {
    startY: 75,
    margin: { left: 20, right: 20 },
    head: [["Description", "Montant (FCFA)", "Type"]],
    body: [
      ["Salaire de base", bulletin.base.toLocaleString(), "Fixe"],
      ...bulletin.bonuses.map((b) => [
        b.label,
        b.amount.toLocaleString(),
        "Prime",
      ]),
      ...bulletin.deductions.map((d) => [
        d.label,
        d.amount.toLocaleString(),
        "Retenue",
      ]),
    ],
    styles: { fontSize: 11, cellPadding: 3 },
    headStyles: { fillColor: [41, 128, 185], textColor: 255, halign: "center" },
    bodyStyles: { halign: "center" },
    theme: "grid",
  });

  // --- Totaux ---
  const finalY = doc.lastAutoTable.finalY + 10;
  doc.setFont("helvetica", "bold");
  doc.text(`Total Primes : ${totalBonus.toLocaleString()} FCFA`, 25, finalY);
  doc.text(
    `Total Retenues : ${totalDeduction.toLocaleString()} FCFA`,
    25,
    finalY + 6
  );
  doc.text(`Net à payer : ${net.toLocaleString()} FCFA`, 25, finalY + 12);

  // --- Commentaire RH ---
  if (bulletin.comment) {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10.5);
    doc.text(`💬 Commentaire RH : ${bulletin.comment}`, 25, finalY + 22);
  }

  // --- Signatures encadrées ---
  const signY = finalY + 40;
  doc.setDrawColor(100);
  doc.rect(30, signY, 60, 25);
  doc.rect(120, signY, 60, 25);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("Signature RH", 60, signY + 20, { align: "center" });
  doc.text("Signature Employé", 150, signY + 20, { align: "center" });

  // --- Pied de page ---
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.text(
    "Document généré électroniquement – validité légale interne",
    105,
    pageHeight - 10,
    { align: "center" }
  );

  doc.save(`Bulletin_${bulletin.employee}_${bulletin.month}_officiel.pdf`);
}

function sendBulletin() {
  toast.info(`Bulletin envoyé à ${form.value.employee}`);
}

function sendExisting(bulletin) {
  toast.info(`Bulletin envoyé à ${bulletin.employee}`);
}
</script>

<style scoped>
button {
  transition: all 0.2s ease;
}
</style>
