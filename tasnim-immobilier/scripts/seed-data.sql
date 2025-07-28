
INSERT INTO T_Pays (LibellePays, Nationalite) VALUES 
('Côte d''Ivoire', 'Ivoirienne'),
('France', 'Française'),
('Mali', 'Malienne'),
('Burkina Faso', 'Burkinabé'),
('Ghana', 'Ghanéenne');

-- Insertion des villes
INSERT INTO T_Ville (CodePays, LibelleVille) VALUES 
(1, 'Abidjan'),
(1, 'Bouaké'),
(1, 'Yamoussoukro'),
(1, 'San Pedro'),
(1, 'Korhogo');

-- Insertion des communes d'Abidjan
INSERT INTO T_Commune (CodeVille, LibelleCommune) VALUES 
(1, 'Cocody'),
(1, 'Plateau'),
(1, 'Yopougon'),
(1, 'Adjamé'),
(1, 'Treichville'),
(1, 'Marcory'),
(1, 'Koumassi'),
(1, 'Port-Bouët'),
(1, 'Abobo'),
(1, 'Attécoubé');

-- Types de pièces d'identité
INSERT INTO T_TypePieceId (CodePieceId, LibellePieceId, LongNumId) VALUES 
('CNI', 'Carte Nationale d''Identité', 12),
('PASS', 'Passeport', 9),
('PERM', 'Permis de Conduire', 10),
('ATTE', 'Attestation d''Identité', 15);

-- Modes de paiement
INSERT INTO T_ModePaiement (LibelleModePaiement) VALUES 
('Espèces'),
('Chèque'),
('Virement bancaire'),
('Mobile Money'),
('Carte bancaire');

-- Formes juridiques
INSERT INTO T_FormeJuridique (CodeFormeJuridique, LibelleFormeJuridique) VALUES 
('SARL', 'Société à Responsabilité Limitée'),
('SA', 'Société Anonyme'),
('SAS', 'Société par Actions Simplifiée'),
('EI', 'Entreprise Individuelle'),
('EURL', 'Entreprise Unipersonnelle à Responsabilité Limitée');

-- Types de propriétés
INSERT INTO Tim_TypePropriete (LibelleType) VALUES 
('Immeuble'),
('Villa'),
('Complexe résidentiel'),
('Maison individuelle'),
('Local commercial'),
('Bureau'),
('Entrepôt');

-- Types de locations
INSERT INTO Tim_TypeLocation (LibelleType) VALUES 
('Appartement'),
('Studio'),
('Villa'),
('Duplex'),
('Bureau'),
('Magasin'),
('Entrepôt');

-- Insertion d'un opérateur administrateur
INSERT INTO T_Operateur (
    LoginOp, MotPasseOp, TitreOperateur, NomOperateur, PrenOperateur,
    DateNaisOp, LieuNaisOp, FonctOperateur, Indicatif, TelOperateur,
    DernTentative, DernPoste, DernAuthentif, DernSystem,
    DateSaisie, DateModif, Operateur
) VALUES (
    'admin', 'admin123', 'M.', 'ADMIN', 'Système',
    '1990-01-01', 'Abidjan', 'Administrateur Système', '225', '0123456789',
    '', 'Poste Admin', NOW(), 'Web Application',
    NOW(), NOW(), 'admin'
);

-- Insertion de quelques propriétaires exemples
INSERT INTO Tim_Proprietaire (
    Sexe, Civilite, Nom, Prenoms, DateNais, LieuNais,
    CodePieceId, NumPieceId, CodePays, AdresseComp,
    Indicatif, Tel1, Tel2, Tel3, AbonneSms, RepEnt,
    RaisonSoc, SiegeSoc, AdresseEnt, TelEnt,
    DateSaisie, DateModif, Operateur
) VALUES 
(
    'M', 'M.', 'KOUAME', 'Jean Baptiste', '1975-03-15', 'Abidjan',
    'CNI', 'CI123456789', 1, 'Cocody Riviera 3, Rue des Jardins',
    '225', '0712345678', '0512345678', '', 'O', 'N',
    '', '', '', '',
    NOW(), NOW(), 'admin'
),
(
    'F', 'Mme', 'TRAORE', 'Aminata', '1980-07-22', 'Bouaké',
    'CNI', 'CI987654321', 1, 'Plateau, Avenue Chardy',
    '225', '0598765432', '', '', 'O', 'N',
    '', '', '', '',
    NOW(), NOW(), 'admin'
),
(
    'M', 'M.', 'DIABATE', 'Ibrahim', '1970-12-10', 'Yamoussoukro',
    'CNI', 'CI456789123', 1, 'Yopougon Niangon, Quartier Résidentiel',
    '225', '0123456789', '0723456789', '', 'O', 'N',
    '', '', '', '',
    NOW(), NOW(), 'admin'
);

-- Insertion de quelques propriétés
INSERT INTO Tim_Propriete (
    CodeProprio, NomPropriete, CodeTypePropriete, TauxPrestat,
    CodeCommune, Quartier, Localisation,
    DateSaisie, DateModif, Operateur
) VALUES 
(
    1, 'Résidence Les Palmiers', 1, 10,
    1, 'Riviera', 'Cocody Riviera 3, près du Golf',
    NOW(), NOW(), 'admin'
),
(
    2, 'Villa Moderne Plateau', 2, 8,
    2, 'Centre-ville', 'Plateau, Avenue Chardy, face à la Cathédrale',
    NOW(), NOW(), 'admin'
),
(
    3, 'Complexe Yopougon', 3, 12,
    3, 'Niangon', 'Yopougon Niangon, Quartier Résidentiel',
    NOW(), NOW(), 'admin'
);

-- Insertion de quelques locations
INSERT INTO Tim_Location (
    CodePropriete, NomLocation, CodeTypeLocation, NbrePiece,
    NumEtage, Superficie, MontLoyerHT, MontTvaLoyer,
    TvaCharges, LoyerDefinitifTTC, DateSaisie, DateModif, Operateur
) VALUES 
(
    1, 'Appartement A12', 1, 3,
    1, 85, 135000, 15000,
    'N', 150000, NOW(), NOW(), 'admin'
),
(
    1, 'Studio B3', 2, 1,
    2, 35, 72000, 8000,
    'N', 80000, NOW(), NOW(), 'admin'
),
(
    2, 'Villa Principale', 3, 5,
    0, 200, 450000, 50000,
    'N', 500000, NOW(), NOW(), 'admin'
),
(
    3, 'Appartement C8', 1, 2,
    0, 65, 108000, 12000,
    'N', 120000, NOW(), NOW(), 'admin'
);

-- Insertion de quelques locataires particuliers
INSERT INTO Tim_Particulier (
    Civilite, Nom, Prenoms, DateNais, LieuNais,
    CodePieceId, NumPieceId, CodePays, Fonction, Employeur,
    SitMatri, NbPersonne, AncResidence, Indicatif, Contact,
    ObjetLocation, CodeModePaiement, RIB,
    CivUrg, NomPrenUrg, ContactUrg, ObservUrg
) VALUES 
(
    'M.', 'KOUASSI', 'Pierre Alain', '1985-05-20', 'Abidjan',
    'CNI', 'CI789123456', 1, 'Ingénieur', 'SODECI',
    'Marié', 3, 'Marcory', '225', '0712345678',
    'Habitation', 1, 'CI001234567890',
    'Mme', 'KOUASSI Adjoua', '0798765432', 'Épouse'
),
(
    'Mme', 'BAMBA', 'Fatou', '1990-08-15', 'Bouaké',
    'CNI', 'CI321654987', 1, 'Comptable', 'Banque Atlantique',
    'Célibataire', 1, 'Adjamé', '225', '0598765432',
    'Habitation', 3, 'CI098765432109',
    'M.', 'BAMBA Seydou', '0512345678', 'Père'
);

-- Insertion de quelques baux
INSERT INTO Tim_BailLocation (
    CodeLocation, DureeBail, DebutBail, BailRenouvel,
    CodeParticulier, CodeEnt, BailTermine, DateFin,
    Motif, CodeBon, DateSaisie, DateModif, Operateur, ModeFacturation
) VALUES 
(
    1, 12, '2024-01-15', 'O',
    1, 0, 'N', NULL,
    '', 0, NOW(), NOW(), 'admin', 'MENS'
),
(
    3, 24, '2023-06-01', 'O',
    2, 0, 'N', NULL,
    '', 0, NOW(), NOW(), 'admin', 'MENS'
);

-- Insertion de quelques quittances
INSERT INTO Tim_Quittance (
    CodeBail, CodeQuittance, MontantVerse, MontantReporte, ReliquatQuittance,
    LibelleQuittance, CodeModePaiement, RefPaiement,
    DateSaisie, Operateur, LieuOp, Sync, Contexte
) VALUES 
(
    1, 1, 150000, 0, 0,
    'Loyer Janvier 2024', 1, '',
    '2024-01-15', 'admin', 'BUR', 'OK', 'RECOUVR'
),
(
    2, 1, 500000, 0, 0,
    'Loyer Janvier 2024', 3, 'VIR20240110001',
    '2024-01-10', 'admin', 'BUR', 'OK', 'RECOUVR'
);

-- Insertion des paiements de loyer correspondants
INSERT INTO Tim_PaiementLoyer (CodeBail, CodeQuittance, Periode, MontLoyer, MontCharge, Penalite) VALUES 
(1, 1, '01-2024', 150000, 0, 0),
(2, 1, '01-2024', 500000, 0, 0);
