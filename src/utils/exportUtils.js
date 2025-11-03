// ✅ Utilitaires d'export (PDF, Word, Excel) avec Toasts
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { utils, writeFile } from 'xlsx'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'


// 📤 Exporter les rapports en PDF
export function exportReportsToPDF(reports) {
  if (!reports || reports.length === 0) {
    toast.warning('Aucun rapport à exporter.')
    return
  }

  const doc = new jsPDF({ orientation: 'landscape' })
  doc.setFontSize(14)
  doc.text('Rapports d\'activité des employés', 14, 15)

  const tableData = reports.map((r, i) => [
    i + 1,
    r.period || '',
    r.employee || '',
    r.auteur || r.chef || '',
    r.tasks?.substring(0, 40) || '',
    `${r.prodPercent ?? '—'}%`,
    `${r.quality ?? '—'}/10`,
    r.status || 'En attente',
    r.date || ''
  ])

  autoTable(doc, {
    head: [['#', 'Période', 'Employé', 'Auteur', 'Résumé', 'Productivité', 'Qualité', 'Statut', 'Date']],
    body: tableData,
    startY: 25,
    styles: { fontSize: 8 },
    theme: 'grid'
  })

  const fileName = `Rapports_${new Date().toLocaleDateString('fr-FR')}.pdf`
  doc.save(fileName)

  toast.success(`Export PDF réussi : ${fileName}`)
}

// 📤 Exporter les rapports en Word
export function exportReportsToWord(reports) {
  if (!reports || reports.length === 0) {
    toast.warning('Aucun rapport à exporter.')
    return
  }

  const header = 'RAPPORTS D\'ACTIVITÉ DES EMPLOYÉS\n\n'
  const body = reports
    .map((r, i) => {
      return `${i + 1}. ${r.employee || ''} (${r.period || ''})\nAuteur : ${r.auteur || r.chef || ''}\nTâches : ${
        r.tasks || ''
      }\nProductivité : ${r.prodPercent ?? '—'}%\nQualité : ${r.quality ?? '—'}/10\nStatut : ${
        r.status || 'En attente'
      }\nDate : ${r.date || ''}\n\n`
    })
    .join('')

  const blob = new Blob([header + body], {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  const fileName = `Rapports_${new Date().toISOString().split('T')[0]}.docx`
  a.download = fileName
  a.click()
  URL.revokeObjectURL(url)

  toast.success(`Export Word réussi : ${fileName}`)
}

// 📤 Exporter les rapports en Excel
export function exportReportsToExcel(reports) {
  if (!reports || reports.length === 0) {
    toast.warning('Aucun rapport à exporter.')
    return
  }

  const data = reports.map((r, i) => ({
    ID: i + 1,
    Periode: r.period || '',
    Employe: r.employee || '',
    Auteur: r.auteur || r.chef || '',
    Taches: r.tasks || '',
    Productivite: `${r.prodPercent ?? '—'}%`,
    Qualite: `${r.quality ?? '—'}/10`,
    Statut: r.status || 'En attente',
    Date: r.date || ''
  }))

  const ws = utils.json_to_sheet(data)
  const wb = utils.book_new()
  utils.book_append_sheet(wb, ws, 'Rapports')

  const fileName = `Rapports_${new Date().toISOString().split('T')[0]}.xlsx`
  writeFile(wb, fileName)

  toast.success(`Export Excel réussi : ${fileName}`)
}
