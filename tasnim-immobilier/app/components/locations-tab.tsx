"use client"

import { useState } from "react"
import { Plus, Search, Edit, Eye, MoreHorizontal, Home, Calendar } from "lucide-react"

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

export default function LocationsTab() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<any>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const locations: any[] = []

  const filteredLocations = locations.filter(
    (location) =>
      location.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.propriete.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (location.locataire && location.locataire.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "Occupé":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "Vacant":
        return "bg-amber-100 text-amber-700 border-amber-200"
      case "Maintenance":
        return "bg-rose-100 text-rose-700 border-rose-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Locations</h1>
          <p className="text-muted-foreground">Gestion des unités locatives</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Créer une location
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Nouvelle location</DialogTitle>
              <DialogDescription>Créer une nouvelle unité locative</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom/Numéro</Label>
                  <Input id="nom" placeholder="Ex: Appartement A12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="propriete">Propriété</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Résidence Les Palmiers</SelectItem>
                      <SelectItem value="2">Villa Moderne Plateau</SelectItem>
                      <SelectItem value="3">Complexe Yopougon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="appartement">Appartement</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="duplex">Duplex</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pieces">Pièces</Label>
                  <Input id="pieces" type="number" placeholder="Nombre" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="etage">Étage</Label>
                  <Input id="etage" type="number" placeholder="Étage" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="superficie">Superficie (m²)</Label>
                  <Input id="superficie" type="number" placeholder="Superficie" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loyer">Loyer (FCFA)</Label>
                  <Input id="loyer" type="number" placeholder="Montant du loyer" />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>Créer</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modale de détails */}
        <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Détails de la location</DialogTitle>
              <DialogDescription>Informations complètes de l'unité locative</DialogDescription>
            </DialogHeader>
            {selectedLocation && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-medium">Nom/Numéro</Label>
                    <p className="text-sm bg-gray-50 p-3 rounded font-medium">{selectedLocation.nom}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-medium">Type</Label>
                    <p className="text-sm bg-gray-50 p-3 rounded">{selectedLocation.type}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Propriété</Label>
                  <p className="text-sm bg-indigo-50 p-3 rounded text-indigo-700 font-medium">
                    {selectedLocation.propriete}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="font-medium">Pièces</Label>
                    <p className="text-sm bg-blue-50 p-3 rounded text-blue-700 font-medium text-center">
                      {selectedLocation.pieces}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-medium">Étage</Label>
                    <p className="text-sm bg-gray-50 p-3 rounded text-center">{selectedLocation.etage}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-medium">Superficie</Label>
                    <p className="text-sm bg-gray-50 p-3 rounded text-center">{selectedLocation.superficie} m²</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-medium">Loyer mensuel</Label>
                    <p className="text-sm bg-emerald-50 p-3 rounded text-emerald-700 font-medium">
                      {selectedLocation.loyer} FCFA
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-medium">Statut</Label>
                    <Badge className={getStatusColor(selectedLocation.statut)}>{selectedLocation.statut}</Badge>
                  </div>
                </div>
                {selectedLocation.locataire && (
                  <div className="space-y-2">
                    <Label className="font-medium">Locataire actuel</Label>
                    <p className="text-sm bg-violet-50 p-3 rounded text-violet-700 font-medium">
                      {selectedLocation.locataire}
                    </p>
                  </div>
                )}
                {selectedLocation.debutBail && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-medium">Début du bail</Label>
                      <p className="text-sm bg-gray-50 p-3 rounded">
                        {new Date(selectedLocation.debutBail).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-medium">Fin du bail</Label>
                      <p className="text-sm bg-gray-50 p-3 rounded">
                        {new Date(selectedLocation.finBail).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                  </div>
                )}
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
              <DialogTitle>Modifier la location</DialogTitle>
              <DialogDescription>Modifier les informations de l'unité locative</DialogDescription>
            </DialogHeader>
            {selectedLocation && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-nom">Nom/Numéro</Label>
                    <Input id="edit-nom" defaultValue={selectedLocation.nom} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-type">Type</Label>
                    <Select defaultValue={selectedLocation.type.toLowerCase()}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="studio">Studio</SelectItem>
                        <SelectItem value="appartement">Appartement</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="duplex">Duplex</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-pieces">Pièces</Label>
                    <Input id="edit-pieces" type="number" defaultValue={selectedLocation.pieces} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-etage">Étage</Label>
                    <Input id="edit-etage" type="number" defaultValue={selectedLocation.etage} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-superficie">Superficie (m²)</Label>
                    <Input id="edit-superficie" type="number" defaultValue={selectedLocation.superficie} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-loyer">Loyer (FCFA)</Label>
                  <Input id="edit-loyer" type="number" defaultValue={selectedLocation.loyer.replace(/,/g, "")} />
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

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Locations</CardTitle>
            <div className="h-10 w-10 rounded-lg bg-slate-50 flex items-center justify-center">
              <Home className="h-5 w-5 text-slate-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">0</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupées</CardTitle>
            <Home className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">0</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vacantes</CardTitle>
            <Home className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">0</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux d'occupation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des locations</CardTitle>
          <CardDescription>{filteredLocations.length} location(s) enregistrée(s)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Location</TableHead>
                <TableHead>Propriété</TableHead>
                <TableHead>Caractéristiques</TableHead>
                <TableHead>Loyer</TableHead>
                <TableHead>Locataire</TableHead>
                <TableHead>Bail</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLocations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    Aucune location enregistrée. Cliquez sur "Créer une location" pour commencer.
                  </TableCell>
                </TableRow>
              ) : (
                filteredLocations.map((location) => (
                  <TableRow key={location.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{location.nom}</div>
                        <div className="text-sm text-muted-foreground">{location.type}</div>
                      </div>
                    </TableCell>
                    <TableCell>{location.propriete}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>
                          {location.pieces} pièce(s) - Étage {location.etage}
                        </div>
                        <div className="text-muted-foreground">{location.superficie} m²</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{location.loyer} FCFA</TableCell>
                    <TableCell>
                      {location.locataire || <span className="text-muted-foreground">Non attribué</span>}
                    </TableCell>
                    <TableCell>
                      {location.debutBail ? (
                        <div className="text-sm">
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3" />
                            {new Date(location.debutBail).toLocaleDateString("fr-FR")}
                          </div>
                          <div className="text-muted-foreground">
                            au {new Date(location.finBail!).toLocaleDateString("fr-FR")}
                          </div>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Aucun bail</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(location.statut)}>{location.statut}</Badge>
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
                              setSelectedLocation(location)
                              setIsDetailsDialogOpen(true)
                            }}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Voir détails
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedLocation(location)
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
