"use client"

import { useState } from "react"
import { Plus, Search, Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react"

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
import { useData } from "@/lib/data-context"
import { useToast } from "@/components/ui/use-toast"
import { Proprietaire } from "@/lib/types"

export default function ProprietairesTab() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedProprietaire, setSelectedProprietaire] = useState<Proprietaire | null>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  
  // Formulaire
  const [formData, setFormData] = useState({
    civilite: '',
    nom: '',
    prenoms: '',
    contact: '',
    email: '',
    adresse: ''
  })

  const { proprietaires, addProprietaire, updateProprietaire, deleteProprietaire } = useData()
  const { toast } = useToast()

  const filteredProprietaires = proprietaires.filter((prop) =>
    `${prop.nom} ${prop.prenoms}`.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const resetForm = () => {
    setFormData({
      civilite: '',
      nom: '',
      prenoms: '',
      contact: '',
      email: '',
      adresse: ''
    })
  }

  const handleSubmit = () => {
    if (!formData.civilite || !formData.nom || !formData.prenoms || !formData.contact) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      return
    }

    addProprietaire(formData)
    resetForm()
    setIsAddDialogOpen(false)
    toast({
      title: "Succès",
      description: "Propriétaire ajouté avec succès",
    })
  }

  const handleUpdate = () => {
    if (!selectedProprietaire) return
    
    updateProprietaire(selectedProprietaire.id, {
      civilite: formData.civilite as 'M.' | 'Mme' | 'Mlle',
      nom: formData.nom,
      prenoms: formData.prenoms,
      contact: formData.contact,
      email: formData.email,
      adresse: formData.adresse
    })
    
    setIsEditDialogOpen(false)
    toast({
      title: "Succès",
      description: "Propriétaire modifié avec succès",
    })
  }

  const handleDelete = (proprietaire: Proprietaire) => {
    deleteProprietaire(proprietaire.id)
    toast({
      title: "Suppression",
      description: `${proprietaire.civilite} ${proprietaire.nom} ${proprietaire.prenoms} a été supprimé`,
    })
  }

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
                  <Label htmlFor="civilite">Civilité *</Label>
                  <Select value={formData.civilite} onValueChange={(value) => setFormData({...formData, civilite: value})}>
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
                  <Label htmlFor="nom">Nom *</Label>
                  <Input 
                    id="nom" 
                    placeholder="Nom de famille" 
                    value={formData.nom}
                    onChange={(e) => setFormData({...formData, nom: e.target.value})}
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="prenoms">Prénoms *</Label>
                  <Input 
                    id="prenoms" 
                    placeholder="Prénoms" 
                    value={formData.prenoms}
                    onChange={(e) => setFormData({...formData, prenoms: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact *</Label>
                  <Input 
                    id="contact" 
                    placeholder="+225 XX XX XX XX" 
                    value={formData.contact}
                    onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="email@exemple.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="adresse">Adresse complète</Label>
                <Input 
                  id="adresse" 
                  placeholder="Adresse complète" 
                  value={formData.adresse}
                  onChange={(e) => setFormData({...formData, adresse: e.target.value})}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => {
                setIsAddDialogOpen(false)
                resetForm()
              }}>
                Annuler
              </Button>
              <Button onClick={handleSubmit}>Enregistrer</Button>
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
                    <Select value={formData.civilite} onValueChange={(value) => setFormData({...formData, civilite: value})}>
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
                    <Input 
                      id="edit-nom" 
                      value={formData.nom}
                      onChange={(e) => setFormData({...formData, nom: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="edit-prenoms">Prénoms</Label>
                    <Input 
                      id="edit-prenoms" 
                      value={formData.prenoms}
                      onChange={(e) => setFormData({...formData, prenoms: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-contact">Contact</Label>
                    <Input 
                      id="edit-contact" 
                      value={formData.contact}
                      onChange={(e) => setFormData({...formData, contact: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-email">Email</Label>
                    <Input 
                      id="edit-email" 
                      type="email" 
                      placeholder="email@exemple.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-adresse">Adresse complète</Label>
                  <Input 
                    id="edit-adresse" 
                    placeholder="Adresse complète" 
                    value={formData.adresse}
                    onChange={(e) => setFormData({...formData, adresse: e.target.value})}
                  />
                </div>
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleUpdate}>
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
                              setFormData({
                                civilite: proprietaire.civilite,
                                nom: proprietaire.nom,
                                prenoms: proprietaire.prenoms,
                                contact: proprietaire.contact,
                                email: proprietaire.email || '',
                                adresse: proprietaire.adresse || ''
                              })
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(proprietaire)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Supprimer
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
