"use client"

import { useState } from "react"
import { Plus, Search, Edit, Eye, MoreHorizontal } from "lucide-react"

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

export default function ProprietairesTab() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const [selectedProprietaire, setSelectedProprietaire] = useState<any>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const proprietaires: any[] = []

  const filteredProprietaires = proprietaires.filter((prop) =>
    `${prop.nom} ${prop.prenoms}`.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Propriétaires</h1>
          <p className="text-muted-foreground">Gestion des propriétaires et de leurs biens</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white border-0 shadow-sm">
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un propriétaire
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Nouveau propriétaire</DialogTitle>
              <DialogDescription>Enregistrer un nouveau propriétaire dans le système</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="civilite">Civilité</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M.">M.</SelectItem>
                      <SelectItem value="Mme">Mme</SelectItem>
                      <SelectItem value="Mlle">Mlle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom</Label>
                  <Input id="nom" placeholder="Nom de famille" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="prenoms">Prénoms</Label>
                  <Input id="prenoms" placeholder="Prénoms" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact</Label>
                  <Input id="contact" placeholder="+225 XX XX XX XX" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@exemple.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="adresse">Adresse complète</Label>
                <Input id="adresse" placeholder="Adresse complète" />
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
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Détails du propriétaire</DialogTitle>
              <DialogDescription>Informations complètes du propriétaire</DialogDescription>
            </DialogHeader>
            {selectedProprietaire && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-medium">Identité</Label>
                    <p className="text-sm bg-gray-50 p-2 rounded">
                      {selectedProprietaire.civilite} {selectedProprietaire.nom} {selectedProprietaire.prenoms}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-medium">Contact</Label>
                    <p className="text-sm bg-gray-50 p-2 rounded">{selectedProprietaire.contact}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="font-medium">Propriétés</Label>
                    <p className="text-sm bg-indigo-50 p-2 rounded text-indigo-700 font-medium">
                      {selectedProprietaire.proprietes} propriété(s)
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-medium">Locations actives</Label>
                    <p className="text-sm bg-emerald-50 p-2 rounded text-emerald-700 font-medium">
                      {selectedProprietaire.locationsActives} location(s)
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-medium">Recettes du mois</Label>
                    <p className="text-sm bg-amber-50 p-2 rounded text-amber-700 font-medium">
                      {selectedProprietaire.recettesMois} FCFA
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Statut</Label>
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                    {selectedProprietaire.statut}
                  </Badge>
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
              <DialogTitle>Modifier le propriétaire</DialogTitle>
              <DialogDescription>Modifier les informations du propriétaire</DialogDescription>
            </DialogHeader>
            {selectedProprietaire && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-civilite">Civilité</Label>
                    <Select defaultValue={selectedProprietaire.civilite}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="M.">M.</SelectItem>
                        <SelectItem value="Mme">Mme</SelectItem>
                        <SelectItem value="Mlle">Mlle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-nom">Nom</Label>
                    <Input id="edit-nom" defaultValue={selectedProprietaire.nom} />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="edit-prenoms">Prénoms</Label>
                    <Input id="edit-prenoms" defaultValue={selectedProprietaire.prenoms} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-contact">Contact</Label>
                    <Input id="edit-contact" defaultValue={selectedProprietaire.contact} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-email">Email</Label>
                    <Input id="edit-email" type="email" placeholder="email@exemple.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-adresse">Adresse complète</Label>
                  <Input id="edit-adresse" placeholder="Adresse complète" />
                </div>
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Annuler
              </Button>
              <Button
                onClick={() => {
                  // Logique de sauvegarde ici
                  setIsEditDialogOpen(false)
                }}
              >
                Sauvegarder
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
        <CardHeader>
          <CardTitle>Liste des propriétaires</CardTitle>
          <CardDescription>{filteredProprietaires.length} propriétaire(s) enregistré(s)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un propriétaire..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Propriétaire</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Propriétés</TableHead>
                <TableHead>Locations actives</TableHead>
                <TableHead>Recettes du mois</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProprietaires.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Aucun propriétaire enregistré. Cliquez sur "Ajouter un propriétaire" pour commencer.
                  </TableCell>
                </TableRow>
              ) : (
                filteredProprietaires.map((proprietaire) => (
                  <TableRow key={proprietaire.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {proprietaire.civilite} {proprietaire.nom} {proprietaire.prenoms}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{proprietaire.contact}</TableCell>
                    <TableCell>{proprietaire.proprietes}</TableCell>
                    <TableCell>{proprietaire.locationsActives}</TableCell>
                    <TableCell className="font-medium">{proprietaire.recettesMois} FCFA</TableCell>
                    <TableCell>
                      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                        {proprietaire.statut}
                      </Badge>
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
                              setSelectedProprietaire(proprietaire)
                              setIsDetailsDialogOpen(true)
                            }}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Voir détails
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedProprietaire(proprietaire)
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
