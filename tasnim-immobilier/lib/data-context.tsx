"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Proprietaire, Propriete, Locataire, Location, Paiement, Activity } from './types'
import { demoProprietaires, demoProprietes, demoLocataires, demoLocations, demoPaiements } from './demo-data'

interface DataContextType {
  // Data
  proprietaires: Proprietaire[]
  proprietes: Propriete[]
  locataires: Locataire[]
  locations: Location[]
  paiements: Paiement[]
  activities: Activity[]
  
  // Actions pour les propriétaires
  addProprietaire: (proprietaire: Omit<Proprietaire, 'id' | 'dateCreation'>) => void
  updateProprietaire: (id: string, updates: Partial<Proprietaire>) => void
  deleteProprietaire: (id: string) => void
  
  // Actions pour les propriétés
  addPropriete: (propriete: Omit<Propriete, 'id' | 'dateCreation'>) => void
  updatePropriete: (id: string, updates: Partial<Propriete>) => void
  deletePropriete: (id: string) => void
  
  // Actions pour les locataires
  addLocataire: (locataire: Omit<Locataire, 'id' | 'dateCreation'>) => void
  updateLocataire: (id: string, updates: Partial<Locataire>) => void
  deleteLocataire: (id: string) => void
  
  // Actions pour les locations
  addLocation: (location: Omit<Location, 'id'>) => void
  updateLocation: (id: string, updates: Partial<Location>) => void
  deleteLocation: (id: string) => void
  
  // Actions pour les paiements
  addPaiement: (paiement: Omit<Paiement, 'id'>) => void
  
  // Actions pour les activités
  addActivity: (activity: Omit<Activity, 'id'>) => void
  
  // Charger les données de démonstration
  loadDemoData: () => void
  clearAllData: () => void
  
  // Statistiques
  stats: {
    totalProprietes: number
    locationsActives: number
    recettesMois: number
    totalLocataires: number
  }
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [proprietaires, setProprietaires] = useState<Proprietaire[]>([])
  const [proprietes, setProprietes] = useState<Propriete[]>([])
  const [locataires, setLocataires] = useState<Locataire[]>([])
  const [locations, setLocations] = useState<Location[]>([])
  const [paiements, setPaiements] = useState<Paiement[]>([])
  const [activities, setActivities] = useState<Activity[]>([])

  // Charger les données depuis localStorage au démarrage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('tasnim-immobilier-data')
      if (savedData) {
        try {
          const data = JSON.parse(savedData)
          setProprietaires(data.proprietaires || [])
          setProprietes(data.proprietes || [])
          setLocataires(data.locataires || [])
          setLocations(data.locations || [])
          setPaiements(data.paiements || [])
          setActivities(data.activities || [])
        } catch (error) {
          console.error('Erreur lors du chargement des données:', error)
        }
      }
    }
  }, [])

  // Sauvegarder les données dans localStorage à chaque changement
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = {
        proprietaires,
        proprietes,
        locataires,
        locations,
        paiements,
        activities
      }
      localStorage.setItem('tasnim-immobilier-data', JSON.stringify(data))
    }
  }, [proprietaires, proprietes, locataires, locations, paiements, activities])

  // Fonctions utilitaires
  const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9)

  // Actions pour les propriétaires
  const addProprietaire = (proprietaire: Omit<Proprietaire, 'id' | 'dateCreation'>) => {
    const newProprietaire: Proprietaire = {
      ...proprietaire,
      id: generateId(),
      dateCreation: new Date(),
      proprietes: 0,
      locationsActives: 0,
      recettesMois: 0,
      statut: 'Actif'
    }
    setProprietaires(prev => [...prev, newProprietaire])
    addActivity({
      type: 'contract',
      message: `Nouveau propriétaire ajouté: ${proprietaire.civilite} ${proprietaire.nom} ${proprietaire.prenoms}`,
      time: new Date().toLocaleString('fr-FR')
    })
  }

  const updateProprietaire = (id: string, updates: Partial<Proprietaire>) => {
    setProprietaires(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
  }

  const deleteProprietaire = (id: string) => {
    setProprietaires(prev => prev.filter(p => p.id !== id))
  }

  // Actions pour les propriétés
  const addPropriete = (propriete: Omit<Propriete, 'id' | 'dateCreation'>) => {
    const newPropriete: Propriete = {
      ...propriete,
      id: generateId(),
      dateCreation: new Date(),
      locationsTotal: 0,
      locationsOccupees: 0,
      locationsVacantes: 0,
      recettesMois: 0,
      statut: 'Actif'
    }
    setProprietes(prev => [...prev, newPropriete])
    addActivity({
      type: 'contract',
      message: `Nouvelle propriété ajoutée: ${propriete.nom}`,
      time: new Date().toLocaleString('fr-FR')
    })
  }

  const updatePropriete = (id: string, updates: Partial<Propriete>) => {
    setProprietes(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
  }

  const deletePropriete = (id: string) => {
    setProprietes(prev => prev.filter(p => p.id !== id))
  }

  // Actions pour les locataires
  const addLocataire = (locataire: Omit<Locataire, 'id' | 'dateCreation'>) => {
    const newLocataire: Locataire = {
      ...locataire,
      id: generateId(),
      dateCreation: new Date(),
      statut: 'Actif',
      locationsActives: 0
    }
    setLocataires(prev => [...prev, newLocataire])
    addActivity({
      type: 'contract',
      message: `Nouveau locataire ajouté: ${locataire.civilite} ${locataire.nom} ${locataire.prenoms}`,
      time: new Date().toLocaleString('fr-FR')
    })
  }

  const updateLocataire = (id: string, updates: Partial<Locataire>) => {
    setLocataires(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l))
  }

  const deleteLocataire = (id: string) => {
    setLocataires(prev => prev.filter(l => l.id !== id))
  }

  // Actions pour les locations
  const addLocation = (location: Omit<Location, 'id'>) => {
    const newLocation: Location = {
      ...location,
      id: generateId()
    }
    setLocations(prev => [...prev, newLocation])
    addActivity({
      type: 'contract',
      message: `Nouveau contrat de location créé: ${location.reference}`,
      time: new Date().toLocaleString('fr-FR')
    })
  }

  const updateLocation = (id: string, updates: Partial<Location>) => {
    setLocations(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l))
  }

  const deleteLocation = (id: string) => {
    setLocations(prev => prev.filter(l => l.id !== id))
  }

  // Actions pour les paiements
  const addPaiement = (paiement: Omit<Paiement, 'id'>) => {
    const newPaiement: Paiement = {
      ...paiement,
      id: generateId()
    }
    setPaiements(prev => [...prev, newPaiement])
    addActivity({
      type: 'payment',
      message: `Paiement encaissé: ${paiement.periode}`,
      time: new Date().toLocaleString('fr-FR'),
      amount: `${paiement.montant.toLocaleString()} FCFA`
    })
  }

  // Actions pour les activités
  const addActivity = (activity: Omit<Activity, 'id'>) => {
    const newActivity: Activity = {
      ...activity,
      id: generateId()
    }
    setActivities(prev => [newActivity, ...prev.slice(0, 9)]) // Garder seulement les 10 dernières
  }

  // Charger les données de démonstration
  const loadDemoData = () => {
    setProprietaires(demoProprietaires)
    setProprietes(demoProprietes)
    setLocataires(demoLocataires)
    setLocations(demoLocations)
    setPaiements(demoPaiements)
    setActivities([
      {
        id: '1',
        type: 'payment',
        message: 'Paiement encaissé: Juillet 2024',
        time: new Date().toLocaleString('fr-FR'),
        amount: '100,000 FCFA'
      },
      {
        id: '2',
        type: 'contract',
        message: 'Nouveau contrat signé: LOC-2024-004',
        time: new Date(Date.now() - 3600000).toLocaleString('fr-FR')
      },
      {
        id: '3',
        type: 'payment',
        message: 'Paiement encaissé: Juillet 2024',
        time: new Date(Date.now() - 7200000).toLocaleString('fr-FR'),
        amount: '150,000 FCFA'
      }
    ])
  }

  const clearAllData = () => {
    setProprietaires([])
    setProprietes([])
    setLocataires([])
    setLocations([])
    setPaiements([])
    setActivities([])
  }

  // Calcul des statistiques
  const stats = {
    totalProprietes: proprietes.length,
    locationsActives: locations.filter(l => l.statut === 'Active').length,
    recettesMois: paiements
      .filter(p => {
        const paymentDate = new Date(p.datePaiement)
        const currentDate = new Date()
        return paymentDate.getMonth() === currentDate.getMonth() && 
               paymentDate.getFullYear() === currentDate.getFullYear()
      })
      .reduce((total, p) => total + p.montant, 0),
    totalLocataires: locataires.length
  }

  const value: DataContextType = {
    proprietaires,
    proprietes,
    locataires,
    locations,
    paiements,
    activities,
    addProprietaire,
    updateProprietaire,
    deleteProprietaire,
    addPropriete,
    updatePropriete,
    deletePropriete,
    addLocataire,
    updateLocataire,
    deleteLocataire,
    addLocation,
    updateLocation,
    deleteLocation,
    addPaiement,
    addActivity,
    loadDemoData,
    clearAllData,
    stats
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}