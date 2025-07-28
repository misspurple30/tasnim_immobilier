"use client"

import { useState } from "react"
import { Plus, Search, Edit, Eye, MoreHorizontal, Phone, Mail, Calendar, FileText, Users, Download } from "lucide-react"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LocatairesTab() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("particuliers")

  const [selectedLocataire, setSelectedLocataire] = useState<any>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isContractDialogOpen, setIsContractDialogOpen] = useState(false)

  const particuliers: any[] = []
  const professionnels: any[] = []

  const filteredParticuliers = particuliers.filter(
    (loc) =>
      `${loc.nom} ${loc.prenoms}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredProfessionnels = professionnels.filter(
    (loc) =>
      loc.raisonSociale.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Locataires</h1>
          <p className="text-muted-foreground">Gestion des locataires particuliers et professionnels</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white border-0 shadow-sm">
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un locataire
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Nouveau locataire</DialogTitle>
              <DialogDescription>Enregistrer un nouveau locataire dans le système</DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="particulier" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="particulier">Particulier</TabsTrigger>
                <TabsTrigger value="professionnel">Professionnel</TabsTrigger>
              </TabsList>
              <TabsContent value="particulier" className="space-y-4">
                <div className="grid gap-4">
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
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fonction">Fonction</Label>
                      <Input id="fonction" placeholder="Profession" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="employeur">Employeur</Label>
                      <Input id="employeur" placeholder="Nom de l'employeur" />
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="professionnel" className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="raisonSociale">Raison sociale</Label>
                      <Input id="raisonSociale" placeholder="Nom de l'entreprise" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="formeJuridique">Forme juridique</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SARL">SARL</SelectItem>
                          <SelectItem value="SA">SA</SelectItem>
                          <SelectItem value="SAS">SAS</SelectItem>
                          <SelectItem value="EI">Entreprise Individuelle</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactEnt">Contact entreprise</Label>
                      <Input id="contactEnt" placeholder="+225 XX XX XX XX" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emailEnt">Email entreprise</Label>
                      <Input id="emailEnt" type="email" placeholder="contact@entreprise.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gerant">Gérant/Représentant</Label>
                    <Input id="gerant" placeholder="Nom du gérant" />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
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
              <DialogTitle>Détails du locataire</DialogTitle>
              <DialogDescription>Informations complètes du locataire</DialogDescription>
            </DialogHeader>
            {selectedLocataire && (
              <div className="grid gap-6 py-4">
                {selectedLocataire.civilite ? (
                  // Particulier
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="font-medium">Identité</Label>
                        <p className="text-sm bg-gray-50 p-3 rounded font-medium">
                          {selectedLocataire.civilite} {selectedLocataire.nom} {selectedLocataire.prenoms}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label className="font-medium">Contact</Label>
                        <p className="text-sm bg-gray-50 p-3 rounded">{selectedLocataire.contact}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-medium">Email</Label>
                      <p className="text-sm bg-gray-50 p-3 rounded">{selectedLocataire.email}</p>
                    </div>
                  </>
                ) : (
                  // Professionnel
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="font-medium">Raison sociale</Label>
                        <p className="text-sm bg-gray-50 p-3 rounded font-medium">{selectedLocataire.raisonSociale}</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="font-medium">Forme juridique</Label>
                        <p className="text-sm bg-gray-50 p-3 rounded">{selectedLocataire.formeJuridique}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="font-medium">Contact</Label>
                        <p className="text-sm bg-gray-50 p-3 rounded">{selectedLocataire.contact}</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="font-medium">Gérant</Label>
                        <p className="text-sm bg-gray-50 p-3 rounded">{selectedLocataire.gerant}</p>
                      </div>
                    </div>
                  </>
                )}
                <div className="space-y-2">
                  <Label className="font-medium">Location</Label>
                  <p className="text-sm bg-indigo-50 p-3 rounded text-indigo-700 font-medium">
                    {selectedLocataire.location} - {selectedLocataire.propriete}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="font-medium">Loyer mensuel</Label>
                    <p className="text-sm bg-emerald-50 p-3 rounded text-emerald-700 font-medium">
                      {selectedLocataire.loyer} FCFA
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-medium">Début bail</Label>
                    <p className="text-sm bg-gray-50 p-3 rounded">
                      {new Date(selectedLocataire.debutBail).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-medium">Fin bail</Label>
                    <p className="text-sm bg-gray-50 p-3 rounded">
                      {new Date(selectedLocataire.finBail).toLocaleDateString("fr-FR")}
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
              <DialogTitle>Modifier le locataire</DialogTitle>
              <DialogDescription>Modifier les informations du locataire</DialogDescription>
            </DialogHeader>
            {selectedLocataire && (
              <div className="grid gap-4 py-4">
                {selectedLocataire.civilite ? (
                  // Formulaire particulier
                  <>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label>Civilité</Label>
                        <Select defaultValue={selectedLocataire.civilite}>
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
                        <Label>Nom</Label>
                        <Input defaultValue={selectedLocataire.nom} />
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label>Prénoms</Label>
                        <Input defaultValue={selectedLocataire.prenoms} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Contact</Label>
                        <Input defaultValue={selectedLocataire.contact} />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input defaultValue={selectedLocataire.email} />
                      </div>
                    </div>
                  </>
                ) : (
                  // Formulaire professionnel
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Raison sociale</Label>
                        <Input defaultValue={selectedLocataire.raisonSociale} />
                      </div>
                      <div className="space-y-2">
                        <Label>Forme juridique</Label>
                        <Select defaultValue={selectedLocataire.formeJuridique}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SARL">SARL</SelectItem>
                            <SelectItem value="SA">SA</SelectItem>
                            <SelectItem value="SAS">SAS</SelectItem>
                            <SelectItem value="EI">Entreprise Individuelle</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Contact</Label>
                        <Input defaultValue={selectedLocataire.contact} />
                      </div>
                      <div className="space-y-2">
                        <Label>Gérant</Label>
                        <Input defaultValue={selectedLocataire.gerant} />
                      </div>
                    </div>
                  </>
                )}
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

        {/* Modale de contrat */}
        <Dialog open={isContractDialogOpen} onOpenChange={setIsContractDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Contrat de bail</DialogTitle>
              <DialogDescription>Informations du contrat de bail</DialogDescription>
            </DialogHeader>
            {selectedLocataire && (
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label className="font-medium">Locataire</Label>
                  <p className="text-sm bg-gray-50 p-3 rounded">
                    {selectedLocataire.civilite
                      ? `${selectedLocataire.civilite} ${selectedLocataire.nom} ${selectedLocataire.prenoms}`
                      : selectedLocataire.raisonSociale}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-medium">Location</Label>
                    <p className="text-sm bg-indigo-50 p-3 rounded text-indigo-700">{selectedLocataire.location}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-medium">Loyer mensuel</Label>
                    <p className="text-sm bg-emerald-50 p-3 rounded text-emerald-700 font-medium">
                      {selectedLocataire.loyer} FCFA
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-medium">Début du bail</Label>
                    <p className="text-sm bg-gray-50 p-3 rounded">
                      {new Date(selectedLocataire.debutBail).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-medium">Fin du bail</Label>
                    <p className="text-sm bg-gray-50 p-3 rounded">
                      {new Date(selectedLocataire.finBail).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Statut du contrat</Label>
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                    {selectedLocataire.statut}
                  </Badge>
                </div>
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsContractDialogOpen(false)}>
                Fermer
              </Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Télécharger PDF
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Particuliers</CardTitle>
            <div className="h-10 w-10 rounded-lg bg-violet-50 flex items-center justify-center">
              <Users className="h-5 w-5 text-violet-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">0</div>
            <p className="text-xs text-gray-500">Locataires particuliers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Professionnels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Locataires professionnels</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Contrats en cours</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des locataires</CardTitle>
          <CardDescription>Gestion des locataires particuliers et professionnels</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="particuliers">Particuliers ({particuliers.length})</TabsTrigger>
                <TabsTrigger value="professionnels">Professionnels ({professionnels.length})</TabsTrigger>
              </TabsList>
              <div className="relative w-80">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un locataire..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <TabsContent value="particuliers">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Locataire</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Loyer</TableHead>
                    <TableHead>Bail</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredParticuliers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        Aucun locataire particulier enregistré.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredParticuliers.map((locataire) => (
                      <TableRow key={locataire.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {locataire.civilite} {locataire.nom} {locataire.prenoms}
                            </div>
                            <div className="text-sm text-muted-foreground flex items-center">
                              <Mail className="mr-1 h-3 w-3" />
                              {locataire.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Phone className="mr-1 h-3 w-3 text-muted-foreground" />
                            {locataire.contact}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{locataire.location}</div>
                            <div className="text-sm text-muted-foreground">{locataire.propriete}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{locataire.loyer} FCFA</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-3 w-3" />
                              {new Date(locataire.debutBail).toLocaleDateString("fr-FR")}
                            </div>
                            <div className="text-muted-foreground">
                              au {new Date(locataire.finBail).toLocaleDateString("fr-FR")}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                            {locataire.statut}
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
                                  setSelectedLocataire(locataire)
                                  setIsDetailsDialogOpen(true)
                                }}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                Voir détails
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedLocataire(locataire)
                                  setIsEditDialogOpen(true)
                                }}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Modifier
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedLocataire(locataire)
                                  setIsContractDialogOpen(true)
                                }}
                              >
                                <FileText className="mr-2 h-4 w-4" />
                                Contrat
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="professionnels">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Entreprise</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Gérant</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Loyer</TableHead>
                    <TableHead>Bail</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProfessionnels.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        Aucun locataire professionnel enregistré.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredProfessionnels.map((locataire) => (
                      <TableRow key={locataire.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{locataire.raisonSociale}</div>
                            <div className="text-sm text-muted-foreground">{locataire.formeJuridique}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="flex items-center">
                              <Phone className="mr-1 h-3 w-3 text-muted-foreground" />
                              {locataire.contact}
                            </div>
                            <div className="text-sm text-muted-foreground flex items-center">
                              <Mail className="mr-1 h-3 w-3" />
                              {locataire.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{locataire.gerant}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{locataire.location}</div>
                            <div className="text-sm text-muted-foreground">{locataire.propriete}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{locataire.loyer} FCFA</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-3 w-3" />
                              {new Date(locataire.debutBail).toLocaleDateString("fr-FR")}
                            </div>
                            <div className="text-muted-foreground">
                              au {new Date(locataire.finBail).toLocaleDateString("fr-FR")}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{locataire.statut}</Badge>
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
                                  setSelectedLocataire(locataire)
                                  setIsDetailsDialogOpen(true)
                                }}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                Voir détails
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedLocataire(locataire)
                                  setIsEditDialogOpen(true)
                                }}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Modifier
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedLocataire(locataire)
                                  setIsContractDialogOpen(true)
                                }}
                              >
                                <FileText className="mr-2 h-4 w-4" />
                                Contrat
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
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
