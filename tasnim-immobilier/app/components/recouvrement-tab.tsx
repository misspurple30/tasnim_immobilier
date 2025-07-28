"use client"

import { useState } from "react"
import { Plus, Search, DollarSign, Calendar, AlertTriangle, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RecouvrementTab() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isEncaissementDialogOpen, setIsEncaissementDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("encaissements")

  const encaissements: any[] = []
  const retards: any[] = []

  const filteredEncaissements = encaissements.filter(
    (enc) =>
      enc.locataire.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enc.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredRetards = retards.filter(
    (ret) =>
      ret.locataire.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ret.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getRetardSeverity = (jours: number) => {
    if (jours <= 7) return { color: "bg-amber-100 text-amber-700 border-amber-200", label: "Léger" }
    if (jours <= 30) return { color: "bg-orange-100 text-orange-700 border-orange-200", label: "Modéré" }
    return { color: "bg-rose-100 text-rose-700 border-rose-200", label: "Critique" }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Recouvrement</h1>
          <p className="text-muted-foreground">Gestion des encaissements et suivi des impayés</p>
        </div>
        <Dialog open={isEncaissementDialogOpen} onOpenChange={setIsEncaissementDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border-0 shadow-sm">
              <Plus className="mr-2 h-4 w-4" />
              Encaisser un loyer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Nouvel encaissement</DialogTitle>
              <DialogDescription>Enregistrer un paiement de loyer</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="locataire">Locataire</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un locataire" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">M. KOUASSI Pierre - Apt A12</SelectItem>
                      <SelectItem value="2">Mme BAMBA Fatou - Villa Principale</SelectItem>
                      <SelectItem value="3">M. KONE Seydou - Studio B5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="periode">Période</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Mois/Année" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="01-2024">Janvier 2024</SelectItem>
                      <SelectItem value="02-2024">Février 2024</SelectItem>
                      <SelectItem value="03-2024">Mars 2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="montant">Montant (FCFA)</Label>
                  <Input id="montant" type="number" placeholder="Montant versé" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modePaiement">Mode de paiement</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="especes">Espèces</SelectItem>
                      <SelectItem value="cheque">Chèque</SelectItem>
                      <SelectItem value="virement">Virement</SelectItem>
                      <SelectItem value="mobile">Mobile Money</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reference">Référence (optionnel)</Label>
                <Input id="reference" placeholder="Numéro de chèque, référence virement..." />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEncaissementDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={() => setIsEncaissementDialogOpen(false)}>Enregistrer</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Encaissements du mois</CardTitle>
            <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">0 FCFA</div>
            <p className="text-xs text-gray-500">0 paiement(s)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impayés</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">0 FCFA</div>
            <p className="text-xs text-muted-foreground">0 locataire(s) en retard</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pénalités</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">0 FCFA</div>
            <p className="text-xs text-muted-foreground">Pénalités de retard</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de recouvrement</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">0%</div>
            <p className="text-xs text-muted-foreground">Ce mois-ci</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gestion des recouvrements</CardTitle>
          <CardDescription>Suivi des encaissements et des impayés</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="encaissements">Encaissements ({encaissements.length})</TabsTrigger>
                <TabsTrigger value="retards">Retards ({retards.length})</TabsTrigger>
              </TabsList>
              <div className="relative w-80">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <TabsContent value="encaissements">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Locataire</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Période</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Mode</TableHead>
                    <TableHead>Opérateur</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEncaissements.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        Aucun encaissement enregistré ce mois-ci.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredEncaissements.map((encaissement) => (
                      <TableRow key={encaissement.id}>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                            {/* @ts-expect-error */}
                            {new Date(encaissement.date).toLocaleDateString("fr-FR")}
                          </div>
                        </TableCell>
                        <TableCell>{encaissement.locataire}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{encaissement.location}</div>
                            <div className="text-sm text-muted-foreground">{encaissement.propriete}</div>
                          </div>
                        </TableCell>
                        <TableCell>{encaissement.periode}</TableCell>
                        <TableCell className="font-medium">{encaissement.montant} FCFA</TableCell>
                        <TableCell>{encaissement.modePaiement}</TableCell>
                        <TableCell>{encaissement.operateur}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">{encaissement.statut}</Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="retards">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Locataire</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Périodes dues</TableHead>
                    <TableHead>Montant dû</TableHead>
                    <TableHead>Pénalités</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Retard</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRetards.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        Aucun retard de paiement actuellement.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRetards.map((retard) => {
                      const severity = getRetardSeverity(retard.joursRetard)
                      return (
                        <TableRow key={retard.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{retard.locataire}</div>
                              <div className="text-sm text-muted-foreground">{retard.contact}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{retard.location}</div>
                              <div className="text-sm text-muted-foreground">{retard.propriete}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {retard.periodesDues.map((periode, index) => (
                                <div key={index}>{periode}</div>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{retard.montantDu} FCFA</TableCell>
                          <TableCell className="text-orange-600 font-medium">{retard.penalites} FCFA</TableCell>
                          <TableCell className="font-bold text-red-600">{retard.totalDu} FCFA</TableCell>
                          <TableCell>
                            <Badge className={severity.color}>
                              {retard.joursRetard}j - {severity.label}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                SMS
                              </Button>
                              <Button size="sm">Encaisser</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  )}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
