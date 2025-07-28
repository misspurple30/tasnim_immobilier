export interface Proprietaire {
  id: string
  civilite: 'M.' | 'Mme' | 'Mlle'
  nom: string
  prenoms: string
  contact: string
  email?: string
  adresse?: string
  dateCreation: Date
  proprietes: number
  locationsActives: number
  recettesMois: number
  statut: 'Actif' | 'Inactif'
}

export interface Propriete {
  id: string
  nom: string
  type: 'Immeuble' | 'Villa' | 'Complexe' | 'Appartement'
  proprietaireId: string
  proprietaire: string
  commune: string
  quartier: string
  localisation?: string
  dateCreation: Date
  locationsTotal: number
  locationsOccupees: number
  locationsVacantes: number
  recettesMois: number
  statut: 'Actif' | 'Inactif' | 'En maintenance'
}

export interface Locataire {
  id: string
  civilite: 'M.' | 'Mme' | 'Mlle'
  nom: string
  prenoms: string
  contact: string
  email?: string
  adresse?: string
  dateCreation: Date
  statut: 'Actif' | 'Inactif'
  locationsActives: number
}

export interface Location {
  id: string
  proprieteId: string
  locataireId: string
  typeLoca: string
  reference: string
  montantLoyer: number
  depot: number
  dateDebut: Date
  dateFin?: Date
  statut: 'Active' | 'Expiré' | 'Résilié'
  dernierPaiement?: Date
  montantDu: number
}

export interface Paiement {
  id: string
  locationId: string
  montant: number
  datePaiement: Date
  periode: string
  typePaiement: 'Loyer' | 'Charges' | 'Autres'
  statut: 'Payé' | 'En retard' | 'Partiel'
  remarques?: string
}

export interface Activity {
  id: string
  type: 'payment' | 'contract' | 'maintenance' | 'alert'
  message: string
  time: string
  amount?: string
}