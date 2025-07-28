"use client"

import { useState } from "react"
import { Plus, Search, Edit, Eye, MoreHorizontal, MapPin, Building } from "lucide-react"

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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"

export default function ProprietesTab() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const [selectedPropriete, setSelectedPropriete] = useState<any>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const proprietes: any[] = []

  const filteredProprietes = proprietes.filter(
    (prop) =>
      prop.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.proprietaire.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Propriétés</h1>
          <p className="text-muted-foreground">Gestion du patrimoine immobilier</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white border-0 shadow-sm">
              <Plus className="mr-2 h-4 w-4" />
              Ajouter une propriété
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Nouvelle propriété</DialogTitle>
              <DialogDescription>Enregistrer une nouvelle propriété dans le système</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom de la propriété</Label>
                  <Input id="nom" placeholder="Ex: Résidence Les Palmiers" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type de propriété</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immeuble">Immeuble</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="complexe">Complexe</SelectItem>
                      <SelectItem value="appartement">Appartement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="proprietaire">Propriétaire</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un propriétaire" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">M. KOUAME Jean Baptiste</SelectItem>
                    <SelectItem value="2">Mme TRAORE Aminata</SelectItem>
                    <SelectItem value="3">M. DIABATE Ibrahim</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="commune">Commune</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cocody">Cocody</SelectItem>
                      <SelectItem value="plateau">Plateau</SelectItem>
                      <SelectItem value="yopougon">Yopougon</SelectItem>
                      <SelectItem value="adjame">Adjamé</SelectItem>
                      <SelectItem value="treichville">Treichville</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quartier">Quartier</Label>
                  <Input id="quartier" placeholder="Ex: Riviera" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="localisation">Localisation précise</Label>
                <Textarea id="localisation" placeholder="Description de la localisation" />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>Enregistrer</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modale de détails */}
        <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Détails de la propriété</DialogTitle>
              <DialogDescription>Informations complètes de la propriété</DialogDescription>
            </DialogHeader>
            {selectedPropriete && (
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-medium">Nom de la propriété</Label>
                    <p className="text-sm bg-gray-50 p-3 rounded font-medium">{selectedPropriete.nom}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-medium">Type</Label>
                    <p className="text-sm bg-gray-50 p-3 rounded">{selectedPropriete.type}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Propriétaire</Label>
                  <p className="text-sm bg-indigo-50 p-3 rounded text-indigo-700 font-medium">
                    {selectedPropriete.proprietaire}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-medium">Localisation</Label>
                    <p className="text-sm bg-gray-50 p-3 rounded">
                      {selectedPropriete.commune}, {selectedPropriete.quartier}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-medium">Recettes mensuelles</Label>
                    <p className="text-sm bg-emerald-50 p-3 rounded text-emerald-700 font-medium">
                      {selectedPropriete.recettesMois} FCFA
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="font-medium">Total locations</Label>
                    <p className="text-sm bg-blue-50 p-3 rounded text-blue-700 font-medium text-center">
                      {selectedPropriete.locationsTotal}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-medium">Occupées</Label>
                    <p className="text-sm bg-green-50 p-3 rounded text-green-700 font-medium text-center">
                      {selectedPropriete.locationsOccupees}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-medium">Vacantes</Label>
                    <p className="text-sm bg-amber-50 p-3 rounded text-amber-700 font-medium text-center">
                      {selectedPropriete.locationsVacantes}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>
                Fermer
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modale de modification */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Modifier la propriété</DialogTitle>
              <DialogDescription>Modifier les informations de la propriété</DialogDescription>
            </DialogHeader>
            {selectedPropriete && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-nom">Nom de la propriété</Label>
                    <Input id="edit-nom" defaultValue={selectedPropriete.nom} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-type">Type de propriété</Label>
                    <Select defaultValue={selectedPropriete.type.toLowerCase()}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immeuble">Immeuble</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="complexe">Complexe</SelectItem>
                        <SelectItem value="appartement">Appartement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-commune">Commune</Label>
                    <Select defaultValue={selectedPropriete.commune.toLowerCase()}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cocody">Cocody</SelectItem>
                        <SelectItem value="plateau">Plateau</SelectItem>
                        <SelectItem value="yopougon">Yopougon</SelectItem>
                        <SelectItem value="adjame">Adjamé</SelectItem>
                        <SelectItem value="treichville">Treichville</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-quartier">Quartier</Label>
                    <Input id="edit-quartier" defaultValue={selectedPropriete.quartier} />
                  </div>
                </div>
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={() => setIsEditDialogOpen(false)}>Sauvegarder</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Propriétés</CardTitle>
            <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center">
              <Building className="h-5 w-5 text-indigo-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">0</div>
            <p className="text-xs text-gray-500">Propriétés enregistrées</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Locations Occupées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Sur 0 locations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recettes Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0 FCFA</div>
            <p className="text-xs text-muted-foreground">Ce mois-ci</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des propriétés</CardTitle>
          <CardDescription>{filteredProprietes.length} propriété(s) enregistrée(s)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une propriété..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Propriété</TableHead>
                <TableHead>Propriétaire</TableHead>
                <TableHead>Localisation</TableHead>
                <TableHead>Occupancy</TableHead>
                <TableHead>Recettes</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProprietes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Aucune propriété enregistrée. Cliquez sur "Ajouter une propriété" pour commencer.
                  </TableCell>
                </TableRow>
              ) : (
                filteredProprietes.map((propriete) => (
                  <TableRow key={propriete.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{propriete.nom}</div>
                        <div className="text-sm text-muted-foreground">{propriete.type}</div>
                      </div>
                    </TableCell>
                    <TableCell>{propriete.proprietaire}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">
                          {propriete.commune}, {propriete.quartier}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <span className="font-medium">{propriete.locationsOccupees}</span>
                        <span className="text-muted-foreground">/{propriete.locationsTotal}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{propriete.locationsVacantes} vacante(s)</div>
                    </TableCell>
                    <TableCell className="font-medium">{propriete.recettesMois} FCFA</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{propriete.statut}</Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedPropriete(propriete)
                              setIsDetailsDialogOpen(true)
                            }}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Voir détails
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedPropriete(propriete)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Modifier
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
