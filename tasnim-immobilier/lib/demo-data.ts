import { Proprietaire, Propriete, Locataire, Location, Paiement } from './types'

export const demoProprietaires: Proprietaire[] = [
  {
    id: '1',
    civilite: 'M.',
    nom: 'KOUAME',
    prenoms: 'Jean Baptiste',
    contact: '+225 07 12 34 56 78',
    email: 'j.kouame@email.com',
    adresse: 'Cocody Riviera',
    dateCreation: new Date('2024-01-15'),
    proprietes: 2,
    locationsActives: 3,
    recettesMois: 450000,
    statut: 'Actif'
  },
  {
    id: '2',
    civilite: 'Mme',
    nom: 'TRAORE',
    prenoms: 'Aminata',
    contact: '+225 05 98 76 54 32',
    email: 'a.traore@email.com',
    adresse: 'Plateau Centre',
    dateCreation: new Date('2024-02-10'),
    proprietes: 1,
    locationsActives: 2,
    recettesMois: 300000,
    statut: 'Actif'
  },
  {
    id: '3',
    civilite: 'M.',
    nom: 'DIABATE',
    prenoms: 'Ibrahim',
    contact: '+225 01 23 45 67 89',
    email: 'i.diabate@email.com',
    adresse: 'Yopougon',
    dateCreation: new Date('2024-01-20'),
    proprietes: 1,
    locationsActives: 1,
    recettesMois: 180000,
    statut: 'Actif'
  }
]

export const demoProprietes: Propriete[] = [
  {
    id: '1',
    nom: 'Résidence Les Palmiers',
    type: 'Immeuble',
    proprietaireId: '1',
    proprietaire: 'M. KOUAME Jean Baptiste',
    commune: 'Cocody',
    quartier: 'Riviera',
    localisation: 'Face à la pharmacie centrale',
    dateCreation: new Date('2024-01-15'),
    locationsTotal: 4,
    locationsOccupees: 3,
    locationsVacantes: 1,
    recettesMois: 300000,
    statut: 'Actif'
  },
  {
    id: '2',
    nom: 'Villa Moderne',
    type: 'Villa',
    proprietaireId: '1',
    proprietaire: 'M. KOUAME Jean Baptiste',
    commune: 'Cocody',
    quartier: 'Angré',
    localisation: 'Près du carrefour d\'Angré',
    dateCreation: new Date('2024-01-20'),
    locationsTotal: 1,
    locationsOccupees: 1,
    locationsVacantes: 0,
    recettesMois: 150000,
    statut: 'Actif'
  },
  {
    id: '3',
    nom: 'Complexe Liberté',
    type: 'Complexe',
    proprietaireId: '2',
    proprietaire: 'Mme TRAORE Aminata',
    commune: 'Plateau',
    quartier: 'Centre',
    localisation: 'Boulevard Lagunaire',
    dateCreation: new Date('2024-02-10'),
    locationsTotal: 3,
    locationsOccupees: 2,
    locationsVacantes: 1,
    recettesMois: 300000,
    statut: 'Actif'
  },
  {
    id: '4',
    nom: 'Appartement Standing',
    type: 'Appartement',
    proprietaireId: '3',
    proprietaire: 'M. DIABATE Ibrahim',
    commune: 'Yopougon',
    quartier: 'Siporex',
    localisation: 'Immeuble moderne',
    dateCreation: new Date('2024-01-25'),
    locationsTotal: 1,
    locationsOccupees: 1,
    locationsVacantes: 0,
    recettesMois: 180000,
    statut: 'Actif'
  }
]

export const demoLocataires: Locataire[] = [
  {
    id: '1',
    civilite: 'M.',
    nom: 'OUATTARA',
    prenoms: 'Mamadou',
    contact: '+225 07 11 22 33 44',
    email: 'm.ouattara@email.com',
    adresse: 'Adjamé',
    dateCreation: new Date('2024-02-01'),
    statut: 'Actif',
    locationsActives: 1
  },
  {
    id: '2',
    civilite: 'Mme',
    nom: 'KONE',
    prenoms: 'Fatoumata',
    contact: '+225 05 55 66 77 88',
    email: 'f.kone@email.com',
    adresse: 'Treichville',
    dateCreation: new Date('2024-02-05'),
    statut: 'Actif',
    locationsActives: 1
  },
  {
    id: '3',
    civilite: 'M.',
    nom: 'DIALLO',
    prenoms: 'Sekou',
    contact: '+225 01 99 88 77 66',
    email: 's.diallo@email.com',
    adresse: 'Marcory',
    dateCreation: new Date('2024-02-10'),
    statut: 'Actif',
    locationsActives: 1
  },
  {
    id: '4',
    civilite: 'Mlle',
    nom: 'BAMBA',
    prenoms: 'Aïcha',
    contact: '+225 07 44 55 66 77',
    email: 'a.bamba@email.com',
    adresse: 'Cocody',
    dateCreation: new Date('2024-02-15'),
    statut: 'Actif',
    locationsActives: 1
  }
]

export const demoLocations: Location[] = [
  {
    id: '1',
    proprieteId: '1',
    locataireId: '1',
    typeLoca: 'Appartement 2 pièces',
    reference: 'LOC-2024-001',
    montantLoyer: 100000,
    depot: 200000,
    dateDebut: new Date('2024-02-01'),
    statut: 'Active',
    dernierPaiement: new Date('2024-07-01'),
    montantDu: 0
  },
  {
    id: '2',
    proprieteId: '1',
    locataireId: '2',
    typeLoca: 'Appartement 3 pièces',
    reference: 'LOC-2024-002',
    montantLoyer: 120000,
    depot: 240000,
    dateDebut: new Date('2024-02-05'),
    statut: 'Active',
    dernierPaiement: new Date('2024-07-05'),
    montantDu: 0
  },
  {
    id: '3',
    proprieteId: '2',
    locataireId: '3',
    typeLoca: 'Villa complète',
    reference: 'LOC-2024-003',
    montantLoyer: 150000,
    depot: 300000,
    dateDebut: new Date('2024-02-10'),
    statut: 'Active',
    dernierPaiement: new Date('2024-07-10'),
    montantDu: 0
  },
  {
    id: '4',
    proprieteId: '3',
    locataireId: '4',
    typeLoca: 'Bureau moderne',
    reference: 'LOC-2024-004',
    montantLoyer: 180000,
    depot: 360000,
    dateDebut: new Date('2024-02-15'),
    statut: 'Active',
    dernierPaiement: new Date('2024-07-15'),
    montantDu: 0
  }
]

export const demoPaiements: Paiement[] = [
  {
    id: '1',
    locationId: '1',
    montant: 100000,
    datePaiement: new Date('2024-07-01'),
    periode: 'Juillet 2024',
    typePaiement: 'Loyer',
    statut: 'Payé',
    remarques: 'Paiement à temps'
  },
  {
    id: '2',
    locationId: '2',
    montant: 120000,
    datePaiement: new Date('2024-07-05'),
    periode: 'Juillet 2024',
    typePaiement: 'Loyer',
    statut: 'Payé',
    remarques: 'Paiement à temps'
  },
  {
    id: '3',
    locationId: '3',
    montant: 150000,
    datePaiement: new Date('2024-07-10'),
    periode: 'Juillet 2024',
    typePaiement: 'Loyer',
    statut: 'Payé',
    remarques: 'Paiement à temps'
  },
  {
    id: '4',
    locationId: '4',
    montant: 180000,
    datePaiement: new Date('2024-07-15'),
    periode: 'Juillet 2024',
    typePaiement: 'Loyer',
    statut: 'Payé',
    remarques: 'Paiement à temps'
  }
]