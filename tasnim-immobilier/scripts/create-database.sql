
CREATE TABLE IF NOT EXISTS T_Pays (
    CodePays TINYINT AUTO_INCREMENT NOT NULL,
    LibellePays VARCHAR(50) NOT NULL,
    Nationalite VARCHAR(50) NOT NULL,
    PRIMARY KEY (CodePays)
);

CREATE TABLE IF NOT EXISTS T_Ville (
    CodeVille TINYINT AUTO_INCREMENT NOT NULL,
    CodePays TINYINT NOT NULL,
    LibelleVille VARCHAR(50) NOT NULL,
    PRIMARY KEY (CodeVille),
    FOREIGN KEY (CodePays) REFERENCES T_Pays(CodePays)
);

CREATE TABLE IF NOT EXISTS T_Commune (
    CodeVille TINYINT NOT NULL,
    CodeCommune SMALLINT AUTO_INCREMENT NOT NULL,
    LibelleCommune VARCHAR(50) NOT NULL,
    PRIMARY KEY (CodeCommune),
    FOREIGN KEY (CodeVille) REFERENCES T_Ville(CodeVille)
);

CREATE TABLE IF NOT EXISTS T_TypePieceId (
    CodePieceId VARCHAR(5) NOT NULL,
    LibellePieceId VARCHAR(50) NOT NULL,
    LongNumId TINYINT NOT NULL,
    PRIMARY KEY (CodePieceId)
);

CREATE TABLE IF NOT EXISTS T_ModePaiement (
    CodeModePaiement TINYINT AUTO_INCREMENT NOT NULL,
    LibelleModePaiement VARCHAR(50) NOT NULL,
    PRIMARY KEY (CodeModePaiement)
);

CREATE TABLE IF NOT EXISTS T_FormeJuridique (
    CodeFormeJuridique VARCHAR(4) NOT NULL,
    LibelleFormeJuridique VARCHAR(35) NOT NULL,
    PRIMARY KEY (CodeFormeJuridique)
);

-- Tables principales
CREATE TABLE IF NOT EXISTS Tim_Proprietaire (
    CodeProprio SMALLINT AUTO_INCREMENT NOT NULL,
    Sexe VARCHAR(1) NOT NULL,
    Civilite VARCHAR(5) NOT NULL,
    Nom VARCHAR(25) NOT NULL,
    Prenoms VARCHAR(60) NOT NULL,
    DateNais DATETIME NOT NULL,
    LieuNais VARCHAR(30) NOT NULL,
    CodePieceId VARCHAR(5) NOT NULL,
    NumPieceId VARCHAR(20) NOT NULL,
    CodePays TINYINT NOT NULL,
    AdresseComp VARCHAR(150) NOT NULL,
    Indicatif VARCHAR(3) NOT NULL,
    Tel1 VARCHAR(20) NOT NULL,
    Tel2 VARCHAR(20) NOT NULL,
    Tel3 VARCHAR(20) NOT NULL,
    AbonneSms VARCHAR(1) NOT NULL,
    RepEnt VARCHAR(1) NOT NULL,
    RaisonSoc VARCHAR(50) NOT NULL,
    SiegeSoc VARCHAR(50) NOT NULL,
    AdresseEnt VARCHAR(50) NOT NULL,
    TelEnt VARCHAR(20) NOT NULL,
    DateSaisie DATETIME NOT NULL,
    DateModif DATETIME NOT NULL,
    Operateur VARCHAR(10) NOT NULL,
    PRIMARY KEY (CodeProprio),
    FOREIGN KEY (CodePieceId) REFERENCES T_TypePieceId(CodePieceId),
    FOREIGN KEY (CodePays) REFERENCES T_Pays(CodePays)
);

CREATE TABLE IF NOT EXISTS Tim_TypePropriete (
    CodeTypePropriete TINYINT AUTO_INCREMENT NOT NULL,
    LibelleType VARCHAR(50) NOT NULL,
    PRIMARY KEY (CodeTypePropriete)
);

CREATE TABLE IF NOT EXISTS Tim_Propriete (
    CodePropriete SMALLINT AUTO_INCREMENT NOT NULL,
    CodeProprio SMALLINT NOT NULL,
    NomPropriete VARCHAR(100) NOT NULL,
    CodeTypePropriete TINYINT NOT NULL,
    TauxPrestat TINYINT NOT NULL,
    CodeCommune SMALLINT NOT NULL,
    Quartier VARCHAR(50) NOT NULL,
    Localisation VARCHAR(150) NOT NULL,
    DateSaisie DATETIME NOT NULL,
    DateModif DATETIME NOT NULL,
    Operateur VARCHAR(10) NOT NULL,
    PRIMARY KEY (CodePropriete),
    FOREIGN KEY (CodeProprio) REFERENCES Tim_Proprietaire(CodeProprio),
    FOREIGN KEY (CodeTypePropriete) REFERENCES Tim_TypePropriete(CodeTypePropriete),
    FOREIGN KEY (CodeCommune) REFERENCES T_Commune(CodeCommune)
);

CREATE TABLE IF NOT EXISTS Tim_TypeLocation (
    CodeTypeLocation TINYINT AUTO_INCREMENT NOT NULL,
    LibelleType VARCHAR(50) NOT NULL,
    PRIMARY KEY (CodeTypeLocation)
);

CREATE TABLE IF NOT EXISTS Tim_Location (
    CodeLocation INT AUTO_INCREMENT NOT NULL,
    CodePropriete SMALLINT NOT NULL,
    NomLocation VARCHAR(20) NOT NULL,
    CodeTypeLocation TINYINT NOT NULL,
    NbrePiece TINYINT NOT NULL,
    NumEtage TINYINT NOT NULL,
    Superficie SMALLINT NOT NULL,
    MontLoyerHT DECIMAL(18,0) NOT NULL,
    MontTvaLoyer DECIMAL(18,0) NOT NULL,
    TvaCharges VARCHAR(1) NOT NULL,
    LoyerDefinitifTTC DECIMAL(18,0) NOT NULL,
    DateSaisie DATETIME NOT NULL,
    DateModif DATETIME NOT NULL,
    Operateur VARCHAR(10) NOT NULL,
    PRIMARY KEY (CodeLocation),
    FOREIGN KEY (CodePropriete) REFERENCES Tim_Propriete(CodePropriete),
    FOREIGN KEY (CodeTypeLocation) REFERENCES Tim_TypeLocation(CodeTypeLocation)
);

-- Tables pour les locataires
CREATE TABLE IF NOT EXISTS Tim_Particulier (
    CodeParticulier INT AUTO_INCREMENT NOT NULL,
    Civilite VARCHAR(4) NOT NULL,
    Nom VARCHAR(35) NOT NULL,
    Prenoms VARCHAR(60) NOT NULL,
    DateNais DATETIME NOT NULL,
    LieuNais VARCHAR(50) NOT NULL,
    CodePieceId VARCHAR(5) NOT NULL,
    NumPieceId VARCHAR(20) NOT NULL,
    CodePays TINYINT NOT NULL,
    Fonction VARCHAR(50) NOT NULL,
    Employeur VARCHAR(50) NOT NULL,
    SitMatri VARCHAR(15) NOT NULL,
    NbPersonne TINYINT NOT NULL,
    AncResidence VARCHAR(50) NOT NULL,
    Indicatif VARCHAR(3) NOT NULL,
    Contact VARCHAR(20) NOT NULL,
    ObjetLocation VARCHAR(50) NOT NULL,
    CodeModePaiement TINYINT NOT NULL,
    RIB VARCHAR(50) NOT NULL,
    CivUrg VARCHAR(4) NOT NULL,
    NomPrenUrg VARCHAR(60) NOT NULL,
    ContactUrg VARCHAR(20) NOT NULL,
    ObservUrg VARCHAR(50) NOT NULL,
    PRIMARY KEY (CodeParticulier),
    FOREIGN KEY (CodePieceId) REFERENCES T_TypePieceId(CodePieceId),
    FOREIGN KEY (CodePays) REFERENCES T_Pays(CodePays),
    FOREIGN KEY (CodeModePaiement) REFERENCES T_ModePaiement(CodeModePaiement)
);

CREATE TABLE IF NOT EXISTS Tim_Professionnel (
    CodeEnt INT AUTO_INCREMENT NOT NULL,
    RaisonSoc VARCHAR(100) NOT NULL,
    CodeFormeJuridique VARCHAR(4) NOT NULL,
    NatureActivite VARCHAR(50) NOT NULL,
    BpEnt VARCHAR(30) NOT NULL,
    Indicatif VARCHAR(3) NOT NULL,
    ContactEnt VARCHAR(20) NOT NULL,
    Banque VARCHAR(50) NOT NULL,
    NumCompte VARCHAR(25) NOT NULL,
    CodeModePaiement TINYINT NOT NULL,
    CivGerant VARCHAR(4) NOT NULL,
    NomGerant VARCHAR(35) NOT NULL,
    PrenGerant VARCHAR(60) NOT NULL,
    DateNaisGerant DATETIME NOT NULL,
    LieuNaisGerant VARCHAR(50) NOT NULL,
    CodePieceId VARCHAR(5) NOT NULL,
    NumPieceId VARCHAR(20) NOT NULL,
    CodePays TINYINT NOT NULL,
    SitMatri VARCHAR(20) NOT NULL,
    BpGerant VARCHAR(30) NOT NULL,
    AdresseGeo VARCHAR(50) NOT NULL,
    ContactGerant VARCHAR(20) NOT NULL,
    BanqueGerant VARCHAR(50) NOT NULL,
    NumCompteGerant VARCHAR(25) NOT NULL,
    PRIMARY KEY (CodeEnt),
    FOREIGN KEY (CodeFormeJuridique) REFERENCES T_FormeJuridique(CodeFormeJuridique),
    FOREIGN KEY (CodePieceId) REFERENCES T_TypePieceId(CodePieceId),
    FOREIGN KEY (CodePays) REFERENCES T_Pays(CodePays),
    FOREIGN KEY (CodeModePaiement) REFERENCES T_ModePaiement(CodeModePaiement)
);

-- Table des baux
CREATE TABLE IF NOT EXISTS Tim_BailLocation (
    CodeBail INT AUTO_INCREMENT NOT NULL,
    CodeLocation INT NOT NULL,
    DureeBail TINYINT NOT NULL,
    DebutBail DATETIME NOT NULL,
    BailRenouvel VARCHAR(1) NOT NULL,
    CodeParticulier INT NOT NULL,
    CodeEnt INT NOT NULL,
    BailTermine VARCHAR(1) NOT NULL,
    DateFin DATETIME NULL,
    Motif VARCHAR(100) NOT NULL,
    CodeBon INT NOT NULL,
    DateSaisie DATETIME NOT NULL,
    DateModif DATETIME NOT NULL,
    Operateur VARCHAR(10) NOT NULL,
    ModeFacturation VARCHAR(4) NOT NULL,
    PRIMARY KEY (CodeBail),
    FOREIGN KEY (CodeLocation) REFERENCES Tim_Location(CodeLocation),
    FOREIGN KEY (CodeParticulier) REFERENCES Tim_Particulier(CodeParticulier),
    FOREIGN KEY (CodeEnt) REFERENCES Tim_Professionnel(CodeEnt)
);

-- Tables de gestion financière
CREATE TABLE IF NOT EXISTS Tim_Quittance (
    CodeBail INT NOT NULL,
    CodeQuittance INT NOT NULL,
    MontantVerse DECIMAL(18,0) NOT NULL,
    MontantReporte DECIMAL(18,0) NOT NULL,
    ReliquatQuittance DECIMAL(18,0) NOT NULL,
    LibelleQuittance VARCHAR(50) NOT NULL,
    CodeModePaiement TINYINT NOT NULL,
    RefPaiement VARCHAR(50) NOT NULL,
    DateSaisie DATETIME NOT NULL,
    Operateur VARCHAR(10) NOT NULL,
    LieuOp VARCHAR(3) NOT NULL,
    Sync VARCHAR(2) NOT NULL,
    Contexte VARCHAR(9) NOT NULL,
    PRIMARY KEY (CodeBail, CodeQuittance),
    FOREIGN KEY (CodeBail) REFERENCES Tim_BailLocation(CodeBail),
    FOREIGN KEY (CodeModePaiement) REFERENCES T_ModePaiement(CodeModePaiement)
);

CREATE TABLE IF NOT EXISTS Tim_PaiementLoyer (
    CodeBail INT NOT NULL,
    CodeQuittance INT NOT NULL,
    Periode VARCHAR(7) NOT NULL,
    MontLoyer DECIMAL(18,0) NOT NULL,
    MontCharge DECIMAL(18,0) NOT NULL,
    Penalite DECIMAL(18,0) NOT NULL,
    PRIMARY KEY (CodeBail, CodeQuittance, Periode),
    FOREIGN KEY (CodeBail, CodeQuittance) REFERENCES Tim_Quittance(CodeBail, CodeQuittance)
);

-- Table des opérateurs
CREATE TABLE IF NOT EXISTS T_Operateur (
    LoginOp VARCHAR(10) NOT NULL,
    MotPasseOp VARCHAR(50) NOT NULL,
    TitreOperateur VARCHAR(5) NOT NULL,
    NomOperateur VARCHAR(25) NOT NULL,
    PrenOperateur VARCHAR(60) NOT NULL,
    DateNaisOp DATETIME NOT NULL,
    LieuNaisOp VARCHAR(50) NOT NULL,
    FonctOperateur VARCHAR(100) NOT NULL,
    Indicatif VARCHAR(3) NOT NULL,
    TelOperateur VARCHAR(20) NOT NULL,
    DernTentative VARCHAR(19) NOT NULL,
    DernPoste VARCHAR(100) NOT NULL,
    DernAuthentif DATETIME NOT NULL,
    DernSystem VARCHAR(50) NOT NULL,
    DateSaisie DATETIME NOT NULL,
    DateModif DATETIME NOT NULL,
    Operateur VARCHAR(10) NOT NULL,
    PRIMARY KEY (LoginOp)
);
