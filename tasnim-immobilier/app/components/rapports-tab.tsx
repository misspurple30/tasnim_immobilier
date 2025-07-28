"use client"

import { useState } from "react"
import { Download, FileText, Filter, BarChart3, PieChart, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RapportsTab() {
  const [selectedPeriod, setSelectedPeriod] = useState("mois-courant")
  const [selectedType, setSelectedType] = useState("tous")

  const rapportsDisponibles = [
    {
      id: "proprietaires",
      nom: "Liste des propriétaires",
      description: "Liste complète des propriétaires avec leurs coordonnées",
      icon: FileText,
      type: "Liste",
    },
    {
      id: "proprietes",
      nom: "Inventaire des propriétés",
      description: "État du patrimoine immobilier par propriétaire",
      icon: BarChart3,
      type: "Inventaire",
    },
    {
      id: "locations-occupees",
      nom: "Locations occupées",
      description: "Liste des locations actuellement occupées",
      icon: FileText,
      type: "Liste",
    },
    {
      id: "locations-vacantes",
      nom: "Locations vacantes",
      description: "Liste des locations disponibles à la location",
      icon: FileText,
      type: "Liste",
    },
    {
      id: "recouvrements",
      nom: "État des recouvrements",
      description: "Suivi des encaissements et impayés par période",
      icon: TrendingUp,
      type: "Financier",
    },
    {
      id: "penalites",
      nom: "Rapport des pénalités",
      description: "Détail des pénalités appliquées aux locataires",
      icon: PieChart,
      type: "Financier",
    },
    {
      id: "bilan-proprietaire",
      nom: "Bilan par propriétaire",
      description: "Synthèse financière par propriétaire",
      icon: BarChart3,
      type: "Financier",
    },
    {
      id: "locataires-actifs",
      nom: "Locataires actifs",
      description: "Liste des locataires avec contrats en cours",
      icon: FileText,
      type: "Liste",
    },
  ]

  const statistiques = [
    {
      titre: "Rapports générés ce mois",
      valeur: "0",
      evolution: "+0%",
      icon: FileText,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      titre: "Propriétaires suivis",
      valeur: "0",
      evolution: "+0",
      icon: BarChart3,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      titre: "Locations analysées",
      valeur: "0",
      evolution: "+0",
      icon: TrendingUp,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      titre: "Taux de recouvrement",
      valeur: "0%",
      evolution: "+0%",
      icon: PieChart,
      color: "text-violet-600",
      bgColor: "bg-violet-50",
    },
  ]

  const filteredRapports = rapportsDisponibles.filter(
    (rapport) => selectedType === "tous" || rapport.type === selectedType,
  )

  const handleGenerateReport = (rapportId: string) => {
    // Simuler la génération du rapport
    const reportData = generateReportData(rapportId)

    // Créer et télécharger le fichier
    downloadReport(reportData, rapportId)
  }

  const generateReportData = (rapportId: string) => {
    const currentDate = new Date().toLocaleDateString("fr-FR")

    switch (rapportId) {
      case "proprietaires":
        return {
          title: "Liste des Propriétaires",
          data: [
            ["Civilité", "Nom", "Prénoms", "Contact", "Propriétés", "Recettes"],
            // Aucune donnée pour le moment
          ],
          date: currentDate,
        }

      case "proprietes":
        return {
          title: "Inventaire des Propriétés",
          data: [
            ["Nom", "Type", "Propriétaire", "Commune", "Locations Total", "Occupées", "Vacantes", "Recettes"],
            // Aucune donnée pour le moment
          ],
          date: currentDate,
        }

      case "locations-occupees":
        return {
          title: "Locations Occupées",
          data: [
            ["Location", "Propriété", "Type", "Locataire", "Loyer", "Début Bail"],
            // Aucune donnée pour le moment
          ],
          date: currentDate,
        }

      case "locations-vacantes":
        return {
          title: "Locations Vacantes",
          data: [
            ["Location", "Propriété", "Type", "Pièces", "Superficie", "Loyer"],
            // Aucune donnée pour le moment
          ],
          date: currentDate,
        }

      case "recouvrements":
        return {
          title: "État des Recouvrements",
          data: [
            ["Date", "Locataire", "Location", "Période", "Montant", "Mode Paiement", "Statut"],
            // Aucune donnée pour le moment
          ],
          date: currentDate,
        }

      case "penalites":
        return {
          title: "Rapport des Pénalités",
          data: [
            ["Locataire", "Location", "Périodes Dues", "Montant Dû", "Pénalités", "Total", "Jours Retard"],
            // Aucune donnée pour le moment
          ],
          date: currentDate,
        }

      case "bilan-proprietaire":
        return {
          title: "Bilan par Propriétaire",
          data: [
            ["Propriétaire", "Propriétés", "Locations Actives", "Recettes Mois", "Taux Occupation"],
            // Aucune donnée pour le moment
          ],
          date: currentDate,
        }

      case "locataires-actifs":
        return {
          title: "Locataires Actifs",
          data: [
            ["Locataire", "Type", "Contact", "Location", "Loyer", "Début Bail", "Fin Bail"],
            // Aucune donnée pour le moment
          ],
          date: currentDate,
        }

      default:
        return {
          title: "Rapport",
          data: [["Aucune donnée disponible"]],
          date: currentDate,
        }
    }
  }

  const downloadReport = (reportData: any, rapportId: string) => {
    // Générer le contenu CSV
    const csvContent = generateCSV(reportData)

    // Créer le blob et télécharger
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute(
        "download",
        `${reportData.title.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.csv`,
      )
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

    // Afficher une notification de succès
    showNotification(`Rapport "${reportData.title}" généré avec succès !`, "success")
  }

  const generateCSV = (reportData: any) => {
    const { title, data, date } = reportData

    let csv = `"${title}"\n`
    csv += `"Généré le: ${date}"\n`
    csv += `"TASNIM IMMOBILIER"\n\n`

    data.forEach((row: string[]) => {
      csv += row.map((cell) => `"${cell}"`).join(",") + "\n"
    })

    return csv
  }

  const showNotification = (message: string, type: "success" | "error" | "info") => {
    // Créer une notification temporaire
    const notification = document.createElement("div")
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
      type === "success"
        ? "bg-emerald-500 text-white"
        : type === "error"
          ? "bg-rose-500 text-white"
          : "bg-indigo-500 text-white"
    }`
    notification.textContent = message

    document.body.appendChild(notification)

    // Animation d'entrée
    setTimeout(() => {
      notification.style.transform = "translateX(0)"
      notification.style.opacity = "1"
    }, 100)

    // Suppression automatique après 3 secondes
    setTimeout(() => {
      notification.style.transform = "translateX(100%)"
      notification.style.opacity = "0"
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 3000)
  }

  const handleGenerateCustomReport = () => {
    const customReportData = {
      title: "Rapport Personnalisé",
      data: [
        ["Champ", "Valeur"],
        ["Type de données", selectedType || "Tous"],
        ["Période", selectedPeriod || "Mois courant"],
        ["Date de génération", new Date().toLocaleDateString("fr-FR")],
        ["Nombre total de propriétaires", "3"],
        ["Nombre total de propriétés", "3"],
        ["Nombre total de locations", "3"],
        ["Taux d'occupation global", "67%"],
        ["Recettes totales du mois", "3,500,000 FCFA"],
      ],
      date: new Date().toLocaleDateString("fr-FR"),
    }

    downloadReport(customReportData, "rapport-personnalise")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rapports</h1>
          <p className="text-muted-foreground">Génération et consultation des rapports d'activité</p>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-4">
        {statistiques.map((stat, index) => (
          <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.titre}</CardTitle>
              <div className={`h-10 w-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.valeur}</div>
              <p className="text-xs text-gray-500">
                <span className="text-emerald-600 font-medium">{stat.evolution}</span> ce mois
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Génération de rapports</CardTitle>
          <CardDescription>Sélectionnez les paramètres et générez vos rapports</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="rapports" className="w-full">
            <TabsList>
              <TabsTrigger value="rapports">Rapports disponibles</TabsTrigger>
              <TabsTrigger value="personnalise">Rapport personnalisé</TabsTrigger>
            </TabsList>

            <TabsContent value="rapports" className="space-y-4">
              {/* Filtres */}
              <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Filtres:</span>
                </div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Type de rapport" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tous">Tous les types</SelectItem>
                    <SelectItem value="Liste">Listes</SelectItem>
                    <SelectItem value="Financier">Financiers</SelectItem>
                    <SelectItem value="Inventaire">Inventaires</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Période" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mois-courant">Mois courant</SelectItem>
                    <SelectItem value="trimestre">Trimestre</SelectItem>
                    <SelectItem value="annee">Année</SelectItem>
                    <SelectItem value="personnalise">Personnalisé</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Liste des rapports */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredRapports.map((rapport) => (
                  <Card
                    key={rapport.id}
                    className="hover:shadow-lg transition-all duration-200 border-0 shadow-sm group"
                  >
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <rapport.icon className="h-5 w-5 text-white" />
                        </div>
                        <CardTitle className="text-base text-gray-900">{rapport.nom}</CardTitle>
                      </div>
                      <CardDescription className="text-sm text-gray-600">{rapport.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium">
                          {rapport.type}
                        </span>
                        <Button
                          size="sm"
                          onClick={() => handleGenerateReport(rapport.id)}
                          className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white border-0 shadow-sm"
                        >
                          <Download className="h-3 w-3 mr-1" />
                          <span>Générer</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="personnalise" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Paramètres du rapport</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Type de données</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="proprietaires">Propriétaires</SelectItem>
                          <SelectItem value="locataires">Locataires</SelectItem>
                          <SelectItem value="proprietes">Propriétés</SelectItem>
                          <SelectItem value="financier">Données financières</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Période</label>
                      <DatePickerWithRange />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Format de sortie</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="excel">Excel</SelectItem>
                          <SelectItem value="csv">CSV</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Colonnes à inclure</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {["Nom/Raison sociale", "Contact", "Adresse", "Propriétés", "Montants", "Dates", "Statuts"].map(
                        (colonne) => (
                          <div key={colonne} className="flex items-center space-x-2">
                            <input type="checkbox" id={colonne} defaultChecked className="rounded border-gray-300" />
                            <label htmlFor={colonne} className="text-sm">
                              {colonne}
                            </label>
                          </div>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleGenerateCustomReport} className="flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Générer le rapport personnalisé</span>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
