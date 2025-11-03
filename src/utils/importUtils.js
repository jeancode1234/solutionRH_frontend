// ✅ Utilitaires d'import (Excel, JSON) avec Toasts
import { read, utils } from 'xlsx'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'


// 📥 Importer depuis un fichier Excel
export async function importReportsFromExcel(file) {
  try {
    const data = await file.arrayBuffer()
    const workbook = read(data)
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const json = utils.sheet_to_json(worksheet)
    const imported = json.map((r, i) => ({
      id: Date.now() + i,
      period: r.Periode || '',
      employee: r.Employe || '',
      auteur: r.Auteur || '',
      tasks: r.Taches || '',
      prodPercent: parseInt(r.Productivite) || 0,
      quality: parseInt(r.Qualite) || 0,
      status: r.Statut || 'En attente',
      date: r.Date || new Date().toLocaleDateString('fr-FR')
    }))

    toast.success(`${imported.length} rapport(s) importé(s) depuis Excel.`)
    return imported
  } catch (err) {
    console.error('Erreur import Excel :', err)
    toast.error('Erreur lors de l’import du fichier Excel.')
    return []
  }
}

// 📥 Importer depuis un fichier JSON
export async function importReportsFromJSON(file) {
  try {
    const text = await file.text()
    const json = JSON.parse(text)
    const imported = json.map((r, i) => ({
      id: r.id || Date.now() + i,
      period: r.period || '',
      employee: r.employee || '',
      auteur: r.auteur || '',
      tasks: r.tasks || '',
      prodPercent: r.prodPercent || 0,
      quality: r.quality || 0,
      status: r.status || 'En attente',
      date: r.date || new Date().toLocaleDateString('fr-FR')
    }))

    toast.success(`${imported.length} rapport(s) importé(s) depuis JSON.`)
    return imported
  } catch (err) {
    console.error('Erreur import JSON :', err)
    toast.error('Fichier JSON invalide.')
    return []
  }
}
