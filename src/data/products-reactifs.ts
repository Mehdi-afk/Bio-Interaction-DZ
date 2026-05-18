export type Product = {
  kind: 'product';
  cat: string;
  marque: string;
  type: string;
  desc: string;
  ref: string;
  conditionnement: string;
  description: string;
  testsKit?: string;
  image?: string;
};

export type SectionLabel = {
  kind: 'section';
  label: string;
};

export type GridItem = Product | SectionLabel;

export const REACTIFS: GridItem[] = [
    {
        "label":  "Biochimie Clinique - Reactifs Systeme Ferme",
        "kind":  "section"
    },
    {
        "ref":  "XSYS0001",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Albumin",
        "marque":  "ERBA",
        "desc":  "ALB 440",
        "cat":  "biochimie",
        "conditionnement":  "2000 tests"
    },
    {
        "ref":  "XSYS0002",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Alkaline Phosphatase",
        "marque":  "ERBA",
        "desc":  "ALP 110",
        "cat":  "biochimie",
        "conditionnement":  "500 tests"
    },
    {
        "ref":  "XSYS0003",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Alpha Amylase",
        "marque":  "ERBA",
        "desc":  "AMY 110",
        "cat":  "biochimie",
        "conditionnement":  "500 tests"
    },
    {
        "ref":  "XSYS0017",
        "kind":  "product",
        "type":  "reactif",
        "description":  "ALT/GPT",
        "marque":  "ERBA",
        "desc":  "ALT/GPT 330",
        "cat":  "biochimie",
        "conditionnement":  "1500 tests"
    },
    {
        "ref":  "XSYS0046",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Antistreptolysine O",
        "marque":  "ERBA",
        "desc":  "ASO",
        "cat":  "biochimie",
        "conditionnement":  "400 tests"
    },
    {
        "ref":  "XSYS0016",
        "kind":  "product",
        "type":  "reactif",
        "description":  "AST/GOT",
        "marque":  "ERBA",
        "desc":  "AST/GOT 330",
        "cat":  "biochimie",
        "conditionnement":  "1500 tests"
    },
    {
        "ref":  "XSYS0028",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Bilirubine Directe",
        "marque":  "ERBA",
        "desc":  "BIL D 330",
        "cat":  "biochimie",
        "conditionnement":  "1200 tests"
    },
    {
        "ref":  "XSYS0023",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Bilirubine Totale",
        "marque":  "ERBA",
        "desc":  "BIL T 330",
        "cat":  "biochimie",
        "conditionnement":  "1200 tests"
    },
    {
        "ref":  "XSYS0007",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Calcium",
        "marque":  "ERBA",
        "desc":  "CA 120",
        "cat":  "biochimie",
        "conditionnement":  "500 tests"
    },
    {
        "ref":  "XSYS0009",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Cholestérol",
        "marque":  "ERBA",
        "desc":  "CHOL 440",
        "cat":  "biochimie",
        "conditionnement":  "2000 tests"
    },
    {
        "ref":  "XSYS0047",
        "kind":  "product",
        "type":  "reactif",
        "description":  "C-Réactive Protéine",
        "marque":  "ERBA",
        "desc":  "CRP",
        "cat":  "biochimie",
        "conditionnement":  "400 tests"
    },
    {
        "ref":  "XSYS0024",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Créatinine Jaffé",
        "marque":  "ERBA",
        "desc":  "CREA 275",
        "cat":  "biochimie",
        "conditionnement":  "1250 tests"
    },
    {
        "ref":  "XSYS0085",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Créatinine Enzymatique",
        "marque":  "ERBA",
        "desc":  "CREA ENZ 200",
        "cat":  "biochimie",
        "conditionnement":  "750 tests"
    },
    {
        "ref":  "XSYS0022",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Créatine Kinase",
        "marque":  "ERBA",
        "desc":  "CK 110",
        "cat":  "biochimie",
        "conditionnement":  "500 tests"
    },
    {
        "ref":  "XSYS0029",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Créatine Kinase MB",
        "marque":  "ERBA",
        "desc":  "CK MB 110",
        "cat":  "biochimie",
        "conditionnement":  "500 tests"
    },
    {
        "ref":  "XSYS0011",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Gamma Glutamyl Transférase",
        "marque":  "ERBA",
        "desc":  "GGT 110",
        "cat":  "biochimie",
        "conditionnement":  "500 tests"
    },
    {
        "ref":  "XSYS0012",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Glucose",
        "marque":  "ERBA",
        "desc":  "GLU 440",
        "cat":  "biochimie",
        "conditionnement":  "2000 tests"
    },
    {
        "ref":  "XSYS0096",
        "kind":  "product",
        "type":  "reactif",
        "description":  "HbA1c",
        "marque":  "ERBA",
        "desc":  "HbA1c 2R",
        "cat":  "biochimie",
        "conditionnement":  "200 tests"
    },
    {
        "ref":  "XSYS0043",
        "kind":  "product",
        "type":  "reactif",
        "description":  "HDL Direct",
        "marque":  "ERBA",
        "desc":  "HDL C 160",
        "cat":  "biochimie",
        "conditionnement":  "600 tests"
    },
    {
        "ref":  "XSYS0049",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Fer",
        "marque":  "ERBA",
        "desc":  "FE 125",
        "cat":  "biochimie",
        "conditionnement":  "440 tests"
    },
    {
        "ref":  "XSYS0101",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Ferritine",
        "marque":  "ERBA",
        "desc":  "FRTN",
        "cat":  "biochimie",
        "conditionnement":  "200 tests"
    },
    {
        "ref":  "XSYS0013",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Lactate Déshydrogénase",
        "marque":  "ERBA",
        "desc":  "LDH 110",
        "cat":  "biochimie",
        "conditionnement":  "500 tests"
    },
    {
        "ref":  "XSYS0044",
        "kind":  "product",
        "type":  "reactif",
        "description":  "LDL Direct",
        "marque":  "ERBA",
        "desc":  "LDL C 80",
        "cat":  "biochimie",
        "conditionnement":  "300 tests"
    },
    {
        "ref":  "XSYS0081",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Lipase",
        "marque":  "ERBA",
        "desc":  "LIP 110",
        "cat":  "biochimie",
        "conditionnement":  "500 tests"
    },
    {
        "ref":  "XSYS0040",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Magnésium",
        "marque":  "ERBA",
        "desc":  "MG 88",
        "cat":  "biochimie",
        "conditionnement":  "400 tests"
    },
    {
        "ref":  "XSYS0083",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Microalbumine",
        "marque":  "ERBA",
        "desc":  "MAL",
        "cat":  "biochimie",
        "conditionnement":  "300 tests"
    },
    {
        "ref":  "XSYS0027",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Microprotéine",
        "marque":  "ERBA",
        "desc":  "MP 120",
        "cat":  "biochimie",
        "conditionnement":  "500 tests"
    },
    {
        "ref":  "XSYS0015",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Phosphore",
        "marque":  "ERBA",
        "desc":  "PHOS 120",
        "cat":  "biochimie",
        "conditionnement":  "500 tests"
    },
    {
        "ref":  "XSYS0048",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Facteur Rhumatoïde",
        "marque":  "ERBA",
        "desc":  "RF",
        "cat":  "biochimie",
        "conditionnement":  "400 tests"
    },
    {
        "ref":  "XSYS0018",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Protéines Totales",
        "marque":  "ERBA",
        "desc":  "TP 440",
        "cat":  "biochimie",
        "conditionnement":  "2000 tests"
    },
    {
        "ref":  "XSYS0041",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Triglycérides",
        "marque":  "ERBA",
        "desc":  "TG 440",
        "cat":  "biochimie",
        "conditionnement":  "2000 tests"
    },
    {
        "ref":  "XSYS0050",
        "kind":  "product",
        "type":  "reactif",
        "description":  "UIBC",
        "marque":  "ERBA",
        "desc":  "UIBC 125",
        "cat":  "biochimie",
        "conditionnement":  "440 tests"
    },
    {
        "ref":  "XSYS0020",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Urée",
        "marque":  "ERBA",
        "desc":  "UREA 275",
        "cat":  "biochimie",
        "conditionnement":  "1250 tests"
    },
    {
        "ref":  "XSYS0021",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Acide Urique",
        "marque":  "ERBA",
        "desc":  "UA 275",
        "cat":  "biochimie",
        "conditionnement":  "1000 tests"
    },
    {
        "ref":  "XSYS0042",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Acide Urique",
        "marque":  "ERBA",
        "desc":  "UA 440",
        "cat":  "biochimie",
        "conditionnement":  "2000 tests"
    },
    {
        "label":  "Biochimie Clinique - Controles et Calibrants",
        "kind":  "section"
    },
    {
        "ref":  "BLT20013",
        "kind":  "product",
        "type":  "controle",
        "description":  "CRP Control High",
        "marque":  "ERBA",
        "desc":  "CRP CON H",
        "cat":  "biochimie",
        "conditionnement":  "1×1"
    },
    {
        "ref":  "BLT20014",
        "kind":  "product",
        "type":  "controle",
        "description":  "CRP Control Low",
        "marque":  "ERBA",
        "desc":  "CRP CON L",
        "cat":  "biochimie",
        "conditionnement":  "1×1"
    },
    {
        "ref":  "BLT00080",
        "kind":  "product",
        "type":  "controle",
        "description":  "Erba Normal",
        "marque":  "ERBA",
        "desc":  "ERBA NORM",
        "cat":  "biochimie",
        "conditionnement":  "4×5"
    },
    {
        "ref":  "BLT00081",
        "kind":  "product",
        "type":  "controle",
        "description":  "Erba Pathologique",
        "marque":  "ERBA",
        "desc":  "ERBA PATH",
        "cat":  "biochimie",
        "conditionnement":  "4×5"
    },
    {
        "ref":  "BLT20042",
        "kind":  "product",
        "type":  "controle",
        "description":  "Ferritin Control Low",
        "marque":  "ERBA",
        "desc":  "FRTN CON L",
        "cat":  "biochimie",
        "conditionnement":  "1×1"
    },
    {
        "ref":  "BLT20041",
        "kind":  "product",
        "type":  "controle",
        "description":  "Ferritin Control High",
        "marque":  "ERBA",
        "desc":  "FRTN CON H",
        "cat":  "biochimie",
        "conditionnement":  "1×1"
    },
    {
        "ref":  "XSYS0098",
        "kind":  "product",
        "type":  "controle",
        "description":  "HbA1c 2R Control Low",
        "marque":  "ERBA",
        "desc":  "HbA1c 2R CON L",
        "cat":  "biochimie",
        "conditionnement":  "4×0,5"
    },
    {
        "ref":  "XSYS0099",
        "kind":  "product",
        "type":  "controle",
        "description":  "HbA1c 2R Control High",
        "marque":  "ERBA",
        "desc":  "HbA1c 2R CON H",
        "cat":  "biochimie",
        "conditionnement":  "4×0,5"
    },
    {
        "ref":  "BLT20033",
        "kind":  "product",
        "type":  "controle",
        "description":  "Microalb Control",
        "marque":  "ERBA",
        "desc":  "MAL CON",
        "cat":  "biochimie",
        "conditionnement":  "1×1"
    },
    {
        "ref":  "BLT20034",
        "kind":  "product",
        "type":  "controle",
        "description":  "Multicontrol Level 1",
        "marque":  "ERBA",
        "desc":  "MULTICON L1",
        "cat":  "biochimie",
        "conditionnement":  "1×1"
    },
    {
        "ref":  "BLT20035",
        "kind":  "product",
        "type":  "controle",
        "description":  "Multicontrol Level 2",
        "marque":  "ERBA",
        "desc":  "MULTICON L2",
        "cat":  "biochimie",
        "conditionnement":  "1×1"
    },
    {
        "ref":  "BLT20039",
        "kind":  "product",
        "type":  "controle",
        "description":  "RF Control",
        "marque":  "ERBA",
        "desc":  "RF CON",
        "cat":  "biochimie",
        "conditionnement":  "1×1"
    },
    {
        "ref":  "XSYS0051",
        "kind":  "product",
        "type":  "controle",
        "description":  "ASO Calibrateur",
        "marque":  "ERBA",
        "desc":  "ASO CAL SH",
        "cat":  "biochimie",
        "conditionnement":  "1×1"
    },
    {
        "ref":  "XSYS0053",
        "kind":  "product",
        "type":  "controle",
        "description":  "CRP Calibrateur",
        "marque":  "ERBA",
        "desc":  "CRP CAL SH",
        "cat":  "biochimie",
        "conditionnement":  "1×1"
    },
    {
        "ref":  "XSYS0104",
        "kind":  "product",
        "type":  "controle",
        "description":  "Ferritin Calibrateur",
        "marque":  "ERBA",
        "desc":  "FRTN CAL",
        "cat":  "biochimie",
        "conditionnement":  "1×1"
    },
    {
        "ref":  "XSYS0097",
        "kind":  "product",
        "type":  "controle",
        "description":  "HbA1c 2R Calibrateur Set",
        "marque":  "ERBA",
        "desc":  "HbA1c 2R CAL SET",
        "cat":  "biochimie",
        "conditionnement":  "5×0,5"
    },
    {
        "ref":  "XSYS0061",
        "kind":  "product",
        "type":  "controle",
        "description":  "HDL/LDL Calibrateur",
        "marque":  "ERBA",
        "desc":  "HDL/LDL CAL",
        "cat":  "biochimie",
        "conditionnement":  "2×1"
    },
    {
        "ref":  "BLT20032",
        "kind":  "product",
        "type":  "controle",
        "description":  "Microalb Calibrateur",
        "marque":  "ERBA",
        "desc":  "MAL CAL",
        "cat":  "biochimie",
        "conditionnement":  "1×1"
    },
    {
        "ref":  "XSYS0052",
        "kind":  "product",
        "type":  "controle",
        "description":  "RF Calibrateur",
        "marque":  "ERBA",
        "desc":  "RF CAL SH",
        "cat":  "biochimie",
        "conditionnement":  "1×1"
    },
    {
        "ref":  "XSYS0034",
        "kind":  "product",
        "type":  "controle",
        "description":  "XL Multicalibrant",
        "marque":  "ERBA",
        "desc":  "XL MULTICAL",
        "cat":  "biochimie",
        "conditionnement":  "4×3"
    },
    {
        "ref":  "XSYS0066",
        "kind":  "product",
        "type":  "controle",
        "description":  "XL Wash",
        "marque":  "ERBA",
        "desc":  "XL WASH",
        "cat":  "biochimie",
        "conditionnement":  "4×100"
    },
    {
        "ref":  "XSYS0082",
        "kind":  "product",
        "type":  "controle",
        "description":  "XL Auto Wash AC/AL",
        "marque":  "ERBA",
        "desc":  "XL AUTOWASH AC/AL",
        "cat":  "biochimie",
        "conditionnement":  "5×44 / 5×44"
    },
    {
        "ref":  "XSYS0125",
        "kind":  "product",
        "type":  "controle",
        "description":  "XL Cleaner",
        "marque":  "ERBA",
        "desc":  "XL CLEANER",
        "cat":  "biochimie",
        "conditionnement":  "4×100"
    },
    {
        "label":  "Biochimie Clinique - Reactifs Systeme Ouvert",
        "kind":  "section"
    },
    {
        "ref":  "BLT00001",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Albumine",
        "marque":  "ERBA",
        "desc":  "ALB 250",
        "cat":  "biochimie",
        "conditionnement":  "250 tests"
    },
    {
        "ref":  "BLT00003",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Phosphatase Alcaline",
        "marque":  "ERBA",
        "desc":  "ALP AMP 150",
        "cat":  "biochimie",
        "conditionnement":  "150 tests"
    },
    {
        "ref":  "BLT00006",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Alpha Amylase",
        "marque":  "ERBA",
        "desc":  "AMY SINGLE 100",
        "cat":  "biochimie",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "BLT00052",
        "kind":  "product",
        "type":  "reactif",
        "description":  "ALT/GPT",
        "marque":  "ERBA",
        "desc":  "ALT/GPT 250",
        "cat":  "biochimie",
        "conditionnement":  "250 tests"
    },
    {
        "ref":  "BLT00050",
        "kind":  "product",
        "type":  "reactif",
        "description":  "AST/GOT",
        "marque":  "ERBA",
        "desc":  "AST/GOT 250",
        "cat":  "biochimie",
        "conditionnement":  "250 tests"
    },
    {
        "ref":  "BLT00009",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Bilirubine Directe",
        "marque":  "ERBA",
        "desc":  "BIL D 200",
        "cat":  "biochimie",
        "conditionnement":  "200 tests"
    },
    {
        "ref":  "BLT00010",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Bilirubine Totale",
        "marque":  "ERBA",
        "desc":  "BIL T 200",
        "cat":  "biochimie",
        "conditionnement":  "200 tests"
    },
    {
        "ref":  "BLT00011",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Bilirubine Totale \u0026 Directe",
        "marque":  "ERBA",
        "desc":  "BIL T\u0026D 200",
        "cat":  "biochimie",
        "conditionnement":  "200 tests"
    },
    {
        "ref":  "BLT00015",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Calcium",
        "marque":  "ERBA",
        "desc":  "CA 100",
        "cat":  "biochimie",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "BLT00034",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Cholestérol",
        "marque":  "ERBA",
        "desc":  "CHOL 5x50",
        "cat":  "biochimie",
        "conditionnement":  "500 tests"
    },
    {
        "ref":  "BLT00020",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Créatinine",
        "marque":  "ERBA",
        "desc":  "CREA 200",
        "cat":  "biochimie",
        "conditionnement":  "200 tests"
    },
    {
        "ref":  "BLT00017",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Créatine Kinase",
        "marque":  "ERBA",
        "desc":  "CK 100",
        "cat":  "biochimie",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "BLT00018",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Créatine Kinase MB",
        "marque":  "ERBA",
        "desc":  "CK MB 100",
        "cat":  "biochimie",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "BLT00023",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Gamma Glutamyltransférase",
        "marque":  "ERBA",
        "desc":  "GGT 100",
        "cat":  "biochimie",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "BLT00025",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Glucose",
        "marque":  "ERBA",
        "desc":  "GLU 500",
        "cat":  "biochimie",
        "conditionnement":  "500 tests"
    },
    {
        "ref":  "BLT00028",
        "kind":  "product",
        "type":  "reactif",
        "description":  "HDL Direct",
        "marque":  "ERBA",
        "desc":  "HDL 80",
        "cat":  "biochimie",
        "conditionnement":  "160 tests"
    },
    {
        "ref":  "BLT00032",
        "kind":  "product",
        "type":  "reactif",
        "description":  "HDL Préc",
        "marque":  "ERBA",
        "desc":  "HDL PREC 100",
        "cat":  "biochimie",
        "conditionnement":  "200 tests"
    },
    {
        "ref":  "BLT00037",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Lactate Déshydrogénase",
        "marque":  "ERBA",
        "desc":  "LDH 100",
        "cat":  "biochimie",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "BLT00043",
        "kind":  "product",
        "type":  "reactif",
        "description":  "LDL Cholestérol Direct",
        "marque":  "ERBA",
        "desc":  "LDL C DIRECT 80",
        "cat":  "biochimie",
        "conditionnement":  "160 tests"
    },
    {
        "ref":  "BLT00049",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Magnésium",
        "marque":  "ERBA",
        "desc":  "MG 250",
        "cat":  "biochimie",
        "conditionnement":  "250 tests"
    },
    {
        "ref":  "BLT00047",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Phosphore",
        "marque":  "ERBA",
        "desc":  "PHOS 100",
        "cat":  "biochimie",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "BLT00054",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Protéines Totales",
        "marque":  "ERBA",
        "desc":  "TP 250",
        "cat":  "biochimie",
        "conditionnement":  "250 tests"
    },
    {
        "ref":  "BLT00057",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Triglycérides",
        "marque":  "ERBA",
        "desc":  "TG 100",
        "cat":  "biochimie",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "BLT00061",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Urée",
        "marque":  "ERBA",
        "desc":  "UREA 250",
        "cat":  "biochimie",
        "conditionnement":  "250 tests"
    },
    {
        "ref":  "BLT00062",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Acide Urique",
        "marque":  "ERBA",
        "desc":  "UA SINGLE 200",
        "cat":  "biochimie",
        "conditionnement":  "200 tests"
    },
    {
        "label":  "Biochimie Clinique - Reactifs Ionogramme EC 90",
        "kind":  "section"
    },
    {
        "ref":  "REG00065",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "EC cartridge XS",
        "cat":  "biochimie",
        "conditionnement":  "250 Tests/2 mois"
    },
    {
        "ref":  "REG00058",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "EC cartridge S",
        "cat":  "biochimie",
        "conditionnement":  "500 Tests/3 mois"
    },
    {
        "ref":  "REG00056",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "EC cartridge M",
        "cat":  "biochimie",
        "conditionnement":  "1000 Tests/3 mois"
    },
    {
        "ref":  "REG00057",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "EC cartridge L",
        "cat":  "biochimie",
        "conditionnement":  "3000 Tests/3 mois"
    },
    {
        "ref":  "REG00066",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "EC cartridge XS plus iCa",
        "cat":  "biochimie",
        "conditionnement":  "250 Tests/2 mois"
    },
    {
        "ref":  "REG00061",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "EC cartridge S plus iCa",
        "cat":  "biochimie",
        "conditionnement":  "500 Tests/3 mois"
    },
    {
        "ref":  "REG00062",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "EC cartridge M plus iCa",
        "cat":  "biochimie",
        "conditionnement":  "1000 Tests/3 mois"
    },
    {
        "ref":  "REG00063",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "EC cartridge L plus iCa",
        "cat":  "biochimie",
        "conditionnement":  "3000 Tests/3 mois"
    },
    {
        "ref":  "REG00059",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "EC Urine Diluent",
        "cat":  "biochimie",
        "conditionnement":  "100 mL"
    },
    {
        "label":  "Hematologie -Reactifs H360",
        "kind":  "section"
    },
    {
        "ref":  "HEM00028",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "Erba H360 Dil",
        "cat":  "hematologie",
        "conditionnement":  "20 L"
    },
    {
        "ref":  "HEM00029",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "Erba H360 Lyse",
        "cat":  "hematologie",
        "conditionnement":  "500 mL"
    },
    {
        "ref":  "HEM00023",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "ELite H Clean",
        "cat":  "hematologie",
        "conditionnement":  "50 mL"
    },
    {
        "ref":  "HEM00033",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "Erba H3 CON L",
        "cat":  "hematologie",
        "conditionnement":  "3 mL"
    },
    {
        "ref":  "HEM00034",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "Erba H3 CON N",
        "cat":  "hematologie",
        "conditionnement":  "3 mL"
    },
    {
        "ref":  "HEM00035",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "Erba H3 CON H",
        "cat":  "hematologie",
        "conditionnement":  "3 mL"
    },
    {
        "ref":  "HEM00027",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "ELite HEM Calibrator",
        "cat":  "hematologie",
        "conditionnement":  "3 mL"
    },
    {
        "label":  "Hematologie -Reactifs H560",
        "kind":  "section"
    },
    {
        "ref":  "HEM00030",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "Erba H560 Dil",
        "cat":  "hematologie",
        "conditionnement":  "20 L"
    },
    {
        "ref":  "HEM00031",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "Erba H560 Lyse1",
        "cat":  "hematologie",
        "conditionnement":  "200 mL"
    },
    {
        "ref":  "HEM00032",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "Erba H560 Lyse2",
        "cat":  "hematologie",
        "conditionnement":  "500 mL"
    },
    {
        "ref":  "HEM00023",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "ELite H Clean",
        "cat":  "hematologie",
        "conditionnement":  "50 mL"
    },
    {
        "ref":  "HEM00024",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "ELite H5 CON L",
        "cat":  "hematologie",
        "conditionnement":  "3 mL"
    },
    {
        "ref":  "HEM00025",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "ELite H5 CON N",
        "cat":  "hematologie",
        "conditionnement":  "3 mL"
    },
    {
        "ref":  "HEM00026",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "ELite H5 CON H",
        "cat":  "hematologie",
        "conditionnement":  "3 mL"
    },
    {
        "ref":  "HEM00027",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "ELite HEM Calibrator",
        "cat":  "hematologie",
        "conditionnement":  "3 mL"
    },
    {
        "label":  "Hematologie -Reactifs ELITE 580",
        "kind":  "section"
    },
    {
        "ref":  "HEM00019",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "ELite H580 Dil",
        "cat":  "hematologie",
        "conditionnement":  "20 L"
    },
    {
        "ref":  "HEM00020",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "ELite H580 Lyse1",
        "cat":  "hematologie",
        "conditionnement":  "500 mL"
    },
    {
        "ref":  "HEM00021",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "ELite H580 Lyse2",
        "cat":  "hematologie",
        "conditionnement":  "500 mL"
    },
    {
        "ref":  "HEM00022",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "ELite H580 Lyse3",
        "cat":  "hematologie",
        "conditionnement":  "1 L"
    },
    {
        "ref":  "HEM00023",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "ELite H Clean",
        "cat":  "hematologie",
        "conditionnement":  "50 mL"
    },
    {
        "ref":  "HEM00024",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "ELite H5 CON L",
        "cat":  "hematologie",
        "conditionnement":  "3 mL"
    },
    {
        "ref":  "HEM00025",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "ELite H5 CON N",
        "cat":  "hematologie",
        "conditionnement":  "3 mL"
    },
    {
        "ref":  "HEM00026",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "ELite H5 CON H",
        "cat":  "hematologie",
        "conditionnement":  "3 mL"
    },
    {
        "ref":  "HEM00027",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "ELite HEM Calibrator",
        "cat":  "hematologie",
        "conditionnement":  "3 mL"
    },
    {
        "label":  "Hematologie -Reactifs H7100",
        "kind":  "section"
    },
    {
        "ref":  "HEM00044",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "H7100 Dil",
        "cat":  "hematologie",
        "conditionnement":  "20 L"
    },
    {
        "ref":  "HEM00045",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "H7100 Dil Ret",
        "cat":  "hematologie",
        "conditionnement":  "1 L"
    },
    {
        "ref":  "HEM00047",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "H7100 Lyse 1",
        "cat":  "hematologie",
        "conditionnement":  "500 mL"
    },
    {
        "ref":  "HEM00048",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "H7100 Lyse 2",
        "cat":  "hematologie",
        "conditionnement":  "1 L"
    },
    {
        "ref":  "HEM00054",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "H7100 Fluro Diff",
        "cat":  "hematologie",
        "conditionnement":  "42 mL"
    },
    {
        "ref":  "HEM00052",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "H7100 Fluro Ret",
        "cat":  "hematologie",
        "conditionnement":  "24 mL"
    },
    {
        "ref":  "HEM00064",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "H Clean",
        "cat":  "hematologie",
        "conditionnement":  "4 mL"
    },
    {
        "ref":  "HEM00055",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "Erba H7 CON",
        "cat":  "hematologie",
        "conditionnement":  "3×3 mL"
    },
    {
        "ref":  "HEM00057",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "Erba H7 CON N",
        "cat":  "hematologie",
        "conditionnement":  "3 mL"
    },
    {
        "ref":  "HEM00059",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "Erba H7 Ret CON",
        "cat":  "hematologie",
        "conditionnement":  "3×3 mL"
    },
    {
        "ref":  "HEM00061",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "Erba H7 Ret CON N",
        "cat":  "hematologie",
        "conditionnement":  "3 mL"
    },
    {
        "ref":  "BLT00083",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "LEUCODIF 200",
        "cat":  "hematologie",
        "conditionnement":  "3×(2×100) mL"
    },
    {
        "label":  "Hemostase - Reactifs ECL",
        "kind":  "section"
    },
    {
        "ref":  "EHL00001",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "ERBA Protime TP",
        "cat":  "hemostase",
        "conditionnement":  "4×5 mL"
    },
    {
        "ref":  "EHL00003",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "ERBA Actime TCK",
        "cat":  "hemostase",
        "conditionnement":  "6×5 mL"
    },
    {
        "ref":  "EHL00005",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "ERBA Thrombin Reagent FIBRINOGENE",
        "cat":  "hemostase",
        "conditionnement":  "2×5 mL"
    },
    {
        "ref":  "EHL00007",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "ERBA Thrombin Time",
        "cat":  "hemostase",
        "conditionnement":  "2×10 mL"
    },
    {
        "ref":  "EHL00009",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "Erba Chrom Protein C",
        "cat":  "hemostase",
        "conditionnement":  "1 kit"
    },
    {
        "ref":  "EHL00012",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "Erba Standard Plasma",
        "cat":  "hemostase",
        "conditionnement":  "5×1 mL"
    },
    {
        "ref":  "EHL00014",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "ERBA Control N",
        "cat":  "hemostase",
        "conditionnement":  "10×1 mL"
    },
    {
        "ref":  "EHL00015",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "ERBA Control P",
        "cat":  "hemostase",
        "conditionnement":  "10×1 mL"
    },
    {
        "ref":  "EHL00020",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "ERBA Calcium Chloride",
        "cat":  "hemostase",
        "conditionnement":  "10×10 mL"
    },
    {
        "ref":  "EHL00021",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "ERBA Owerns Veronal Buffer",
        "cat":  "hemostase",
        "conditionnement":  "6×25 mL"
    },
    {
        "ref":  "EHL00049",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "Erba DDimer R 60",
        "cat":  "hemostase",
        "conditionnement":  "1×4 mL"
    },
    {
        "ref":  "EHL00019",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "ERBA",
        "desc":  "Erba DDimer Control N + P",
        "cat":  "hemostase",
        "conditionnement":  "10×1 mL"
    },
    {
        "label":  "Urines -Reactifs LAURA Smart",
        "kind":  "section"
    },
    {
        "ref":  "URPH0028",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Leucocytes, Nitrite, pH, Protéine, Glucose, Urobilinogène, Bilirubine, Cétones, Sang, Densité, CP",
        "marque":  "ERBA",
        "desc":  "DekaPHAN Laura",
        "cat":  "urines",
        "conditionnement":  "100 bandelettes"
    },
    {
        "ref":  "URPH0029",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Densité, Microalbumine, Créatinine, CP",
        "marque":  "ERBA",
        "desc":  "MicroalbuPHAN LAURA",
        "cat":  "urines",
        "conditionnement":  "50 bandelettes"
    },
    {
        "ref":  "REG00053",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Contrôle",
        "marque":  "ERBA",
        "desc":  "Urinorm",
        "cat":  "urines",
        "conditionnement":  "2×(3×15 mL)"
    },
    {
        "label":  "Urines -Reactifs LAURA XL",
        "kind":  "section"
    },
    {
        "ref":  "URPH0030",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Leucocytes, Nitrite, pH, Protéine, Glucose, Urobilinogène, Bilirubine, Cétones, Sang, Densité",
        "marque":  "ERBA",
        "desc":  "DekaPHAN Auto",
        "cat":  "urines",
        "conditionnement":  "100 bandelettes"
    },
    {
        "ref":  "URPH0031",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Acide ascorbique + Leucocytes, Nitrite, pH, Protéine, Glucose, Urobilinogène, Bilirubine, Cétones, Sang, Densité",
        "marque":  "ERBA",
        "desc":  "UndekaPHAN Auto",
        "cat":  "urines",
        "conditionnement":  "100 bandelettes"
    },
    {
        "ref":  "REG00060",
        "kind":  "product",
        "type":  "reactif",
        "description":  "Contrôle",
        "marque":  "ERBA",
        "desc":  "Urinorm XL",
        "cat":  "urines",
        "conditionnement":  "2×120 mL"
    },
    {
        "label":  "Auto-Immunite -ELISA Manuel",
        "kind":  "section"
    },
    {
        "ref":  "3002",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "Medizym Anti TPO",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests"
    },
    {
        "ref":  "3102",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "Medizym Anti Tg",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests"
    },
    {
        "ref":  "3505",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "Medizym TRA human",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests"
    },
    {
        "ref":  "3506",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "Medizym IA2 M",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests"
    },
    {
        "ref":  "3507",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "Medizym Anti GAD M",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests"
    },
    {
        "ref":  "3806",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "Medizym IAA",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests"
    },
    {
        "ref":  "3600",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "Anti Intrinsic Factor",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests"
    },
    {
        "ref":  "3610",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "Anti GPC",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests"
    },
    {
        "ref":  "3665",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "Anti CCP",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests"
    },
    {
        "ref":  "3710",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "GliaDea IgA",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests"
    },
    {
        "ref":  "3810",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "GliaDea IgG",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests"
    },
    {
        "ref":  "4033",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "Anti hu Ttg IgA",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests"
    },
    {
        "ref":  "4044",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "Anti hu tTG IgG",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests"
    },
    {
        "ref":  "4035",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "CeliaK EmA IgA",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests"
    },
    {
        "ref":  "4045",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "CeliaK EmA IgG",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests"
    },
    {
        "ref":  "3950",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "Pancreatitis GP2",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests"
    },
    {
        "ref":  "3900",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "Anti ASGPR",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests"
    },
    {
        "ref":  "4006",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "ASCA IgA",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests"
    },
    {
        "ref":  "4007",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "ASCA IgG",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests"
    },
    {
        "ref":  "4010",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "ANA screen",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests"
    },
    {
        "ref":  "4012",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "ANA Pro",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests"
    },
    {
        "ref":  "4015",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "Anti dsDNA",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests"
    },
    {
        "ref":  "3750",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "Anti GP2 IgA",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests"
    },
    {
        "ref":  "3850",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "Anti GP2 IgG",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests"
    },
    {
        "ref":  "4036",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "Anti beta2GP-I Screen",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests"
    },
    {
        "ref":  "4041",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "Anti beta2GP-I",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests"
    },
    {
        "ref":  "4014",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "Anti cardiolipine screen",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests"
    },
    {
        "ref":  "4016",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "Anti cardiolipin IgG IgM",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests"
    },
    {
        "ref":  "4050",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "Anti Phospholipid Screen",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests"
    },
    {
        "ref":  "4056",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "Anti phosphatidyl-serin",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests"
    },
    {
        "ref":  "4027",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "RF IgA",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests"
    },
    {
        "ref":  "4046",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "RF IgM",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests"
    },
    {
        "ref":  "4085",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "RF IgG",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests"
    },
    {
        "ref":  "4058",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "Anti MPO",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests"
    },
    {
        "ref":  "4259",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "Anti PR3",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests"
    },
    {
        "ref":  "4052",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "Anti M2",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests"
    },
    {
        "ref":  "4053",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "Anti LKM1",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests"
    },
    {
        "ref":  "4067",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "Anti Faktor H",
        "cat":  "autoimmunite",
        "conditionnement":  "48 Tests"
    },
    {
        "ref":  "6012",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "Helicobacter pylori Antigen",
        "cat":  "autoimmunite",
        "conditionnement":  "48/96 tests"
    },
    {
        "label":  "Auto-Immunite -DOT Manuel",
        "kind":  "section"
    },
    {
        "ref":  "5003",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "Dot Anti gangiosid",
        "cat":  "autoimmunite",
        "conditionnement":  "20 Tests"
    },
    {
        "ref":  "5012",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "Dot Anti phospholipide 10",
        "cat":  "autoimmunite",
        "conditionnement":  "20 Tests"
    },
    {
        "ref":  "4028",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "Dot ANCA",
        "cat":  "autoimmunite",
        "conditionnement":  "20 Tests"
    },
    {
        "ref":  "4030",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "Dot HepAk plus",
        "cat":  "autoimmunite",
        "conditionnement":  "24 Tests"
    },
    {
        "ref":  "4099",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "Dot HepAk 7plus",
        "cat":  "autoimmunite",
        "conditionnement":  "24 Tests"
    },
    {
        "ref":  "4074",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "Dot ANAscl plus",
        "cat":  "autoimmunite",
        "conditionnement":  "24 Tests"
    },
    {
        "ref":  "4049",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "Dot PMScl plus",
        "cat":  "autoimmunite",
        "conditionnement":  "24 Tests"
    },
    {
        "ref":  "4289",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "LINE ANA 12",
        "cat":  "autoimmunite",
        "conditionnement":  "20 Tests"
    },
    {
        "ref":  "4291",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "LINE ANA 18",
        "cat":  "autoimmunite",
        "conditionnement":  "20 Tests"
    },
    {
        "ref":  "4202",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "LINE CELIAK IgG",
        "cat":  "autoimmunite",
        "conditionnement":  "20 Tests"
    },
    {
        "ref":  "4208",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "LINE CELIAK IgA",
        "cat":  "autoimmunite",
        "conditionnement":  "20 Tests"
    },
    {
        "ref":  "4220",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "LINE BiermAK",
        "cat":  "autoimmunite",
        "conditionnement":  "20 Tests"
    },
    {
        "label":  "Auto-Immunite -IFI Manuel",
        "kind":  "section"
    },
    {
        "ref":  "8101",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "ANA HEP-2 PLUS",
        "cat":  "autoimmunite",
        "conditionnement":  "120 Tests (10 Lames de 12 Puits)"
    },
    {
        "ref":  "81040",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "ANA HEP-2 PLUS XL",
        "cat":  "autoimmunite",
        "conditionnement":  "480 Tests (40 Lames de 12 Puits)"
    },
    {
        "ref":  "86048",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "IFA EmA S",
        "cat":  "autoimmunite",
        "conditionnement":  "48 Tests (12 Lames de 4 Puits)"
    },
    {
        "ref":  "86096",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "IFA EmA L",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests (12 Lames de 8 Puits)"
    },
    {
        "ref":  "81050",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "IFA plus nDNA S",
        "cat":  "autoimmunite",
        "conditionnement":  "60 Tests (10 Lames de 6 Puits)"
    },
    {
        "ref":  "81100",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "IFA plus nDNA L",
        "cat":  "autoimmunite",
        "conditionnement":  "120 Tests (10 Lames de 12 Puits)"
    },
    {
        "ref":  "8049",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "IFA Anti-MuSK",
        "cat":  "autoimmunite",
        "conditionnement":  "60 Tests (10 Lames de 6 Puits)"
    },
    {
        "ref":  "83048",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "IFA AMA",
        "cat":  "autoimmunite",
        "conditionnement":  "48 Tests (12 Lames de 4 Puits)"
    },
    {
        "ref":  "84048",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "IFA ASMA",
        "cat":  "autoimmunite",
        "conditionnement":  "48 Tests (12 Lames de 4 Puits)"
    },
    {
        "ref":  "85048",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "IFA Triple Substrat LKS S",
        "cat":  "autoimmunite",
        "conditionnement":  "48 Tests (12 Lames de 4 Puits)"
    },
    {
        "ref":  "85096",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "IFA Triple Substrat LKS L",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests (12 Lames de 8 Puits)"
    },
    {
        "ref":  "85848",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "IFA ICA",
        "cat":  "autoimmunite",
        "conditionnement":  "48 Tests (12 Lames de 4 Puits)"
    },
    {
        "ref":  "86148",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "IFA ASA",
        "cat":  "autoimmunite",
        "conditionnement":  "48 Tests (12 Lames de 4 Puits)"
    },
    {
        "ref":  "86448",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "IFA Anti-GBM",
        "cat":  "autoimmunite",
        "conditionnement":  "48 Tests (12 Lames de 4 Puits)"
    },
    {
        "ref":  "87061",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "IFA plus cANCA",
        "cat":  "autoimmunite",
        "conditionnement":  "60 Tests (10 Lames de 6 Puits)"
    },
    {
        "ref":  "87161",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "IFA plus pANCA",
        "cat":  "autoimmunite",
        "conditionnement":  "60 Tests (10 Lames de 6 Puits)"
    },
    {
        "ref":  "87261",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "IFA ANCA DUAL",
        "cat":  "autoimmunite",
        "conditionnement":  "24 Tests (6 Lames de 4 Puits)"
    },
    {
        "ref":  "8063",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "CytoBead ANCA",
        "cat":  "autoimmunite",
        "conditionnement":  "48 Tests (6 Lames de 8 Puits)"
    },
    {
        "ref":  "8064",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "CytoBead CeliAK",
        "cat":  "autoimmunite",
        "conditionnement":  "48 Tests (6 Lames de 8 Puits)"
    },
    {
        "ref":  "8065",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "CytoBead ANA",
        "cat":  "autoimmunite",
        "conditionnement":  "80 Tests (10 Lames de 6 Puits)"
    },
    {
        "ref":  "8066",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "CytoBead RPGN",
        "cat":  "autoimmunite",
        "conditionnement":  "48 Tests (6 Lames de 8 Puits)"
    },
    {
        "ref":  "8220",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "CytoBead ANA 2",
        "cat":  "autoimmunite",
        "conditionnement":  "80 Tests (10 Lames de 6 Puits)"
    },
    {
        "ref":  "8260",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "CytoBead ANA DFS-70",
        "cat":  "autoimmunite",
        "conditionnement":  "80 Tests (10 Lames de 6 Puits)"
    },
    {
        "label":  "Auto-Immunite -Reactifs DOT Automatises",
        "kind":  "section"
    },
    {
        "ref":  "5014",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "DotDiver CeliAK IgA",
        "cat":  "autoimmunite",
        "conditionnement":  "24 Tests"
    },
    {
        "ref":  "5015",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "DotDiver CeliAK IgG",
        "cat":  "autoimmunite",
        "conditionnement":  "24 Tests"
    },
    {
        "ref":  "5016",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "DotDiver ANA",
        "cat":  "autoimmunite",
        "conditionnement":  "24 Tests"
    },
    {
        "ref":  "5017",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "DotDiver PmScl",
        "cat":  "autoimmunite",
        "conditionnement":  "24 Tests"
    },
    {
        "ref":  "5045",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "DotDiver PmScl 12",
        "cat":  "autoimmunite",
        "conditionnement":  "24 Tests"
    },
    {
        "ref":  "5066",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "DotDiver ANAcyto 10",
        "cat":  "autoimmunite",
        "conditionnement":  "24 Tests"
    },
    {
        "ref":  "5020",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "DotDiver Quantrix ANA",
        "cat":  "autoimmunite",
        "conditionnement":  "24 Tests"
    },
    {
        "ref":  "5018",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "DotDiver ANCA",
        "cat":  "autoimmunite",
        "conditionnement":  "24 Tests"
    },
    {
        "ref":  "5019",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "DotDiver BiermAK",
        "cat":  "autoimmunite",
        "conditionnement":  "24 Tests"
    },
    {
        "ref":  "5070",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "DotDiver HepAK 10",
        "cat":  "autoimmunite",
        "conditionnement":  "24 Tests"
    },
    {
        "ref":  "5021",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "DotDiver HepAK 7plus",
        "cat":  "autoimmunite",
        "conditionnement":  "24 Tests"
    },
    {
        "ref":  "50301",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "DotDiver Anti Gangliosid screen",
        "cat":  "autoimmunite",
        "conditionnement":  "24 Tests"
    },
    {
        "ref":  "5035",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "DotDiver ANA PCNA",
        "cat":  "autoimmunite",
        "conditionnement":  "24 Tests"
    },
    {
        "ref":  "50381",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "DotDiver Anti Gangliosid IgG",
        "cat":  "autoimmunite",
        "conditionnement":  "24 Tests"
    },
    {
        "ref":  "50391",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "DotDiver Anti Gangliosid IgM",
        "cat":  "autoimmunite",
        "conditionnement":  "24 Tests"
    },
    {
        "ref":  "50401",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "DotDiver Anti Phospholipid IgG",
        "cat":  "autoimmunite",
        "conditionnement":  "24 Tests"
    },
    {
        "ref":  "50411",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "DotDiver Anti Phospholipid IgM",
        "cat":  "autoimmunite",
        "conditionnement":  "24 Tests"
    },
    {
        "ref":  "5069",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "DotDiver Scleroderma 10",
        "cat":  "autoimmunite",
        "conditionnement":  "24 Tests"
    },
    {
        "ref":  "5093",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "DotDiver Myositis 12",
        "cat":  "autoimmunite",
        "conditionnement":  "24 Tests"
    },
    {
        "ref":  "5291",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "DotDiver ANA 18",
        "cat":  "autoimmunite",
        "conditionnement":  "24 Tests"
    },
    {
        "label":  "Auto-Immunite -Reactifs IFI Automatises AKLIDES",
        "kind":  "section"
    },
    {
        "ref":  "4060",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "AKLIDES cANCA",
        "cat":  "autoimmunite",
        "conditionnement":  "60 Tests"
    },
    {
        "ref":  "4065",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "AKLIDES ANA plus S",
        "cat":  "autoimmunite",
        "conditionnement":  "120 Tests"
    },
    {
        "ref":  "4063",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "AKLIDES ANA plus L",
        "cat":  "autoimmunite",
        "conditionnement":  "480 Tests"
    },
    {
        "ref":  "4072",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "AKLIDES pANCA",
        "cat":  "autoimmunite",
        "conditionnement":  "60 Tests"
    },
    {
        "ref":  "4117",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "AKLIDES AMA",
        "cat":  "autoimmunite",
        "conditionnement":  "48 Tests"
    },
    {
        "ref":  "4119",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "AKLIDES ASMA",
        "cat":  "autoimmunite",
        "conditionnement":  "48 Tests"
    },
    {
        "ref":  "4121",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "AKLIDES Triple substrat LKS S",
        "cat":  "autoimmunite",
        "conditionnement":  "48 Tests"
    },
    {
        "ref":  "4122",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "AKLIDES Triple substrat LKS L",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests"
    },
    {
        "ref":  "4123",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "AKLIDES Anti-GBM",
        "cat":  "autoimmunite",
        "conditionnement":  "48 Tests"
    },
    {
        "ref":  "4125",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "AKLIDES ASA",
        "cat":  "autoimmunite",
        "conditionnement":  "60 Tests"
    },
    {
        "ref":  "4129",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "AKLIDES ICA",
        "cat":  "autoimmunite",
        "conditionnement":  "48 Tests"
    },
    {
        "ref":  "4131",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "AKLIDES EmA Endomysium S",
        "cat":  "autoimmunite",
        "conditionnement":  "48 Tests"
    },
    {
        "ref":  "4132",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "AKLIDES EmA Endomysium L",
        "cat":  "autoimmunite",
        "conditionnement":  "96 Tests"
    },
    {
        "ref":  "4282",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "AKLIDES Ndna",
        "cat":  "autoimmunite",
        "conditionnement":  "60 Tests"
    },
    {
        "ref":  "4270",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "AKLIDES CytoBead ANCA",
        "cat":  "autoimmunite",
        "conditionnement":  "48 Tests"
    },
    {
        "ref":  "4271",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "AKLIDES CytoBead CeliAK",
        "cat":  "autoimmunite",
        "conditionnement":  "48 Tests"
    },
    {
        "ref":  "4272",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "AKLIDES CytoBead ANA",
        "cat":  "autoimmunite",
        "conditionnement":  "80 Tests"
    },
    {
        "ref":  "4277",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "AKLIDES CytoBead ANA 2",
        "cat":  "autoimmunite",
        "conditionnement":  "80 Tests"
    },
    {
        "ref":  "4281",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "AKLIDES CytoBead RPGN",
        "cat":  "autoimmunite",
        "conditionnement":  "48 Tests"
    },
    {
        "ref":  "4471",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "Generic Assays",
        "desc":  "AKLIDES ANCA DUAL",
        "cat":  "autoimmunite",
        "conditionnement":  "60 Tests"
    },
    {
        "label":  "Auto-Immunite - Reactifs CLIA",
        "kind":  "section"
    },
    {
        "ref":  "CLIA-dsDNA",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA dsDNA",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-Ro60",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA Ro-60",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-SSBLa",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA SS-B/La",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-nRNPSm",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA nRNP/Sm",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-Sm",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA Sm",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-Jo1",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA Jo-1",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-Scl70",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA Scl-70",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-Ro52",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA Ro-52",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-RibP",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA Rib-P",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-PCNA",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA PCNA",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-PMScl",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA PM-Scl",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-His",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA His",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-CENPB",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA CENP-B",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-Nuc",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA Nuc",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-MPO",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA MPO",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-PR3",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA PR3",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-GBM",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA GBM",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-gp210",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA gp210",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-sp100",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA sp100",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-LKM1",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA LKM-1",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-LC1",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA LC-1",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-AMAM2",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA AMA-M2",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-SLALP",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA SLA/LP",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-aCLA",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA aCL-A",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-aCLG",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA aCL-G",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-aCLM",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA aCL-M",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-aCLAMG",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA aCL-A/M/G",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-b2GP1A",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA beta2GP1-A",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-b2GP1G",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA beta2GP1-G",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-b2GP1M",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA beta2GP1-M",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-b2GP1AMG",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA beta2GP1-A/M/G",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-RFA",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA RF-A",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-RFG",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA RF-G",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-RFM",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA RF-M",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-RFAMG",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA RF-A/M/G",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-CCP",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA CCP",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-IAA",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA IAA",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-htTGA",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA h-tTG-A",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-htTGG",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA h-tTG-G",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-DGPA",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA DGP GLIADINE-A",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-DGPG",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA DGP-G",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-GAD",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA GAD",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-IA2",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA IA2",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-ICA",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA ICA",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-ENAMix1",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA ENA Mix-1",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-CTD",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA CTD",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-IF",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA IF",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-PCA",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA PCA",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-ZnT8",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA ZnT8",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "ref":  "CLIA-MDA5",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioCLIA MDA5",
        "cat":  "autoimmunite",
        "conditionnement":  "100 tests"
    },
    {
        "label":  "Allergie - Reactifs BioLINE DOT",
        "kind":  "section"
    },
    {
        "ref":  "MB00268",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioLINE Allergy FOOD FD-1 + CCD",
        "cat":  "allergie",
        "conditionnement":  "24 Tests"
    },
    {
        "ref":  "MB00269",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioLINE Allergy INHALATION INH-1 + CCD",
        "cat":  "allergie",
        "conditionnement":  "24 Tests"
    },
    {
        "ref":  "MB00272",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioLINE Allergy MIX-20 A",
        "cat":  "allergie",
        "conditionnement":  "24 Tests"
    },
    {
        "ref":  "MB00277",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioLINE Allergy MIX-14 A1",
        "cat":  "allergie",
        "conditionnement":  "24 Tests"
    },
    {
        "ref":  "MB00278",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioLINE Allergy INH-7 A2",
        "cat":  "allergie",
        "conditionnement":  "24 Tests"
    },
    {
        "ref":  "MB00279",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioLINE Allergy INH-7 A3",
        "cat":  "allergie",
        "conditionnement":  "24 Tests"
    },
    {
        "ref":  "MB00273",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioLINE Allergy MIX-20 B",
        "cat":  "allergie",
        "conditionnement":  "24 Tests"
    },
    {
        "ref":  "MB00280",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioLINE Allergy INH-10 B1",
        "cat":  "allergie",
        "conditionnement":  "24 Tests"
    },
    {
        "ref":  "MB00281",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioLINE Allergy FD-10 B2",
        "cat":  "allergie",
        "conditionnement":  "24 Tests"
    },
    {
        "ref":  "MB00274",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioLINE Allergy MIX-20 C",
        "cat":  "allergie",
        "conditionnement":  "24 Tests"
    },
    {
        "ref":  "MB00282",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioLINE Allergy INH-10 C1",
        "cat":  "allergie",
        "conditionnement":  "24 Tests"
    },
    {
        "ref":  "MB00283",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioLINE Allergy INH-10 C2",
        "cat":  "allergie",
        "conditionnement":  "24 Tests"
    },
    {
        "ref":  "MB00275",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioLINE Allergy MIX-20 D + CCD",
        "cat":  "allergie",
        "conditionnement":  "24 Tests"
    },
    {
        "ref":  "MB00284",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioLINE Allergy MIX-16 D1 + CCD",
        "cat":  "allergie",
        "conditionnement":  "24 Tests"
    },
    {
        "ref":  "MB00285",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioLINE Allergy INH-10 D2 + CCD",
        "cat":  "allergie",
        "conditionnement":  "24 Tests"
    },
    {
        "ref":  "MB00286",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioLINE Allergy FD-8 D3",
        "cat":  "allergie",
        "conditionnement":  "24 Tests"
    },
    {
        "ref":  "MB00287",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioLINE Allergy MIX-12 D4 + CCD",
        "cat":  "allergie",
        "conditionnement":  "24 Tests"
    },
    {
        "ref":  "MB00276",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "HOB Biotech",
        "desc":  "BioLINE Allergy MIX-20 E",
        "cat":  "allergie",
        "conditionnement":  "24 Tests"
    },
    {
        "label":  "Parasitologie -Western Blot",
        "kind":  "section"
    },
    {
        "ref":  "TOP-WBGM",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "LDBIO",
        "desc":  "TOXOPLASMA WB IgG-IgM",
        "cat":  "parasitologie",
        "conditionnement":  "12 / 24 / 96 tests"
    },
    {
        "ref":  "TXA-WBG",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "LDBIO",
        "desc":  "TOXOCARA WB IgG",
        "cat":  "parasitologie",
        "conditionnement":  "12 / 24 / 96 tests"
    },
    {
        "ref":  "LES-WBG",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "LDBIO",
        "desc":  "LEISHMANIA WB IgG",
        "cat":  "parasitologie",
        "conditionnement":  "12 / 24 / 96 tests"
    },
    {
        "ref":  "ECH-WBG",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "LDBIO",
        "desc":  "ECHINOCOCCUS WB IgG",
        "cat":  "parasitologie",
        "conditionnement":  "12 / 24 / 96 tests"
    },
    {
        "ref":  "CYS-WBG",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "LDBIO",
        "desc":  "CYSTICERCOSIS WB IgG",
        "cat":  "parasitologie",
        "conditionnement":  "12 / 24 / 96 tests"
    },
    {
        "ref":  "TRI ES-WBG",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "LDBIO",
        "desc":  "TRICHINELLA ES WB IgG",
        "cat":  "parasitologie",
        "conditionnement":  "12 / 24 / 96 tests"
    },
    {
        "ref":  "SCH II-WBG",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "LDBIO",
        "desc":  "SCHISTO II IgG",
        "cat":  "parasitologie",
        "conditionnement":  "12 / 24 / 96 tests"
    },
    {
        "ref":  "FAS ES-WBG",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "LDBIO",
        "desc":  "FASCIOLA ES WB IgG",
        "cat":  "parasitologie",
        "conditionnement":  "12 / 24 / 96 tests"
    },
    {
        "ref":  "TOXO II G",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "LDBIO",
        "desc":  "TOXO II IgG",
        "cat":  "parasitologie",
        "conditionnement":  "12 / 24 / 96 tests"
    },
    {
        "ref":  "T2MM",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "LDBIO",
        "desc":  "TOXO II IgM",
        "cat":  "parasitologie",
        "conditionnement":  "12 / 24 / 96 tests"
    },
    {
        "ref":  "ASP-WBG",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "LDBIO",
        "desc":  "ASPERGILLUS WB IgG",
        "cat":  "parasitologie",
        "conditionnement":  "12 / 24 / 96 tests"
    },
    {
        "ref":  "CHA-WB G",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "LDBIO",
        "desc":  "CHAGAS WB IgG",
        "cat":  "parasitologie",
        "conditionnement":  "12 / 24 / 96 tests"
    },
    {
        "ref":  "PEO-WBG",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "LDBIO",
        "desc":  "PEO WB IgG",
        "cat":  "parasitologie",
        "conditionnement":  "12 / 24 / 96 tests"
    },
    {
        "label":  "Parasitologie -Tests Rapides ICT",
        "kind":  "section"
    },
    {
        "ref":  "TOXO Ab ICT",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "LDBIO",
        "desc":  "TOXOPLASMA ICT IgG-IgM",
        "cat":  "parasitologie",
        "conditionnement":  "20 / 100 tests"
    },
    {
        "ref":  "BILZ Ab ICT",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "LDBIO",
        "desc":  "SCHISTOSOMA ICT IgG-IgM",
        "cat":  "parasitologie",
        "conditionnement":  "20 / 100 tests"
    },
    {
        "ref":  "ASPG Ab ICT",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "LDBIO",
        "desc":  "ASPERGILLUS ICT IgG-IgM",
        "cat":  "parasitologie",
        "conditionnement":  "20 / 100 tests"
    },
    {
        "ref":  "MPEO Ab ICT",
        "kind":  "product",
        "type":  "reactif",
        "description":  "",
        "marque":  "LDBIO",
        "desc":  "PEO ICT IgG-IgM",
        "cat":  "parasitologie",
        "conditionnement":  "20 / 100 tests"
    },
    {
        "label":  "Parasitologie -Consommables Western Blot",
        "kind":  "section"
    },
    {
        "ref":  "WB-DE125",
        "kind":  "product",
        "type":  "consommable",
        "description":  "",
        "marque":  "LDBIO",
        "desc":  "R2-Sample Buffer",
        "cat":  "parasitologie",
        "conditionnement":  "30 mL / 125 mL"
    },
    {
        "ref":  "WB-IG30",
        "kind":  "product",
        "type":  "consommable",
        "description":  "",
        "marque":  "LDBIO",
        "desc":  "R3-Anti IgG Conjugate",
        "cat":  "parasitologie",
        "conditionnement":  "30 mL / 60 mL"
    },
    {
        "ref":  "WB-IM60",
        "kind":  "product",
        "type":  "consommable",
        "description":  "",
        "marque":  "LDBIO",
        "desc":  "R4-Anti IgM Conjugate",
        "cat":  "parasitologie",
        "conditionnement":  "30 mL / 60 mL"
    },
    {
        "ref":  "WB-IA30",
        "kind":  "product",
        "type":  "consommable",
        "description":  "",
        "marque":  "LDBIO",
        "desc":  "R8-Anti IgA Conjugate",
        "cat":  "parasitologie",
        "conditionnement":  "30 mL"
    },
    {
        "ref":  "WB-SA125",
        "kind":  "product",
        "type":  "consommable",
        "description":  "",
        "marque":  "LDBIO",
        "desc":  "R5-NBT BCIP Substrate",
        "cat":  "parasitologie",
        "conditionnement":  "30 mL / 125 mL"
    },
    {
        "ref":  "WB-LC60",
        "kind":  "product",
        "type":  "consommable",
        "description":  "",
        "marque":  "LDBIO",
        "desc":  "R6-Washing Buffer",
        "cat":  "parasitologie",
        "conditionnement":  "60 mL / 125 mL"
    },
    {
        "ref":  "B200",
        "kind":  "product",
        "type":  "consommable",
        "description":  "",
        "marque":  "LDBIO",
        "desc":  "UVIBIO MICROSPORIDIAE",
        "cat":  "parasitologie",
        "conditionnement":  "10 mL"
    },
    {
        "ref":  "WBPP08",
        "kind":  "product",
        "type":  "consommable",
        "description":  "",
        "marque":  "LDBIO",
        "desc":  "Incubation Tray 8 Channels",
        "cat":  "parasitologie",
        "conditionnement":  "Unité"
    }
];
