// ── FAQ — questions fréquentes (page d'accueil) ────────────────────────────────
// Brouillon rédactionnel : adaptez librement les réponses.
// `keywords` = synonymes / variantes utilisés par le moteur de correspondance local
// (src/components/homepage/FaqAssistant.tsx). Plus il y en a, plus le matching est fiable.

export type FaqItem = {
  id: string;
  q: string;
  a: string;
  keywords?: string[];
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "devis",
    q: "Comment demander un devis ?",
    a:
      "Cliquez sur « Demander un devis » (présent en haut et en bas de chaque page) puis " +
      "renseignez vos coordonnées et les produits souhaités. Vous pouvez aussi constituer " +
      "une liste depuis le catalogue et l'envoyer en un clic. Notre équipe commerciale vous " +
      "répond généralement sous 24 à 48 heures.",
    keywords: ["devis", "prix", "tarif", "cotation", "commander", "commande", "acheter", "achat", "demande"],
  },
  {
    id: "delais",
    q: "Quels sont les délais de livraison ?",
    a:
      "Pour les références en stock, la livraison se fait en moyenne sous 48 heures. Pour les " +
      "équipements ou les réactifs sur commande, le délai vous est communiqué précisément lors " +
      "de l'établissement du devis.",
    keywords: ["delai", "delais", "livraison", "livrer", "expedition", "rapidite", "temps", "48h", "stock", "disponibilite"],
  },
  {
    id: "zones",
    q: "Livrez-vous dans toute l'Algérie ?",
    a:
      "Oui. Nous livrons l'ensemble du territoire national, des grands centres hospitaliers " +
      "aux laboratoires des wilayas les plus éloignées.",
    keywords: ["algerie", "zone", "zones", "region", "wilaya", "wilayas", "territoire", "national", "partout", "couverture", "livraison", "livrer", "livrez"],
  },
  {
    id: "installation",
    q: "Assurez-vous l'installation et la formation du personnel ?",
    a:
      "Oui. Pour chaque équipement, nous assurons l'installation, la mise en service et la " +
      "formation de vos équipes à son utilisation, afin que l'analyseur soit opérationnel " +
      "immédiatement.",
    keywords: ["installation", "installer", "formation", "former", "mise en service", "demarrage", "demonstration", "demo", "accompagnement"],
  },
  {
    id: "sav",
    q: "Proposez-vous un service après-vente et une maintenance ?",
    a:
      "Oui. Nous assurons le service après-vente, la maintenance préventive et corrective ainsi " +
      "que la fourniture des pièces détachées et consommables. Contactez le SAV au " +
      "+213.770.74.72.50 ou à sav@biointeractiondz.com.",
    keywords: ["sav", "service apres vente", "maintenance", "reparation", "panne", "depannage", "garantie", "pieces", "entretien", "support", "technique"],
  },
  {
    id: "marques",
    q: "Quelles marques représentez-vous ?",
    a:
      "Nous représentons en exclusivité sur le marché algérien cinq marques internationales de " +
      "référence : ERBA Mannheim, Generic Assays, Medipan, HOB Biotech et LDBIO Diagnostics.",
    keywords: ["marque", "marques", "partenaire", "partenaires", "fournisseur", "fabricant", "erba", "generic assays", "medipan", "hob", "ldbio", "exclusivite"],
  },
  {
    id: "clients",
    q: "Vendez-vous aux particuliers ou uniquement aux professionnels ?",
    a:
      "Notre activité s'adresse aux professionnels de santé : laboratoires d'analyses médicales, " +
      "hôpitaux, cliniques et centres de diagnostic. Nous ne vendons pas aux particuliers.",
    keywords: ["particulier", "particuliers", "professionnel", "professionnels", "laboratoire", "hopital", "clinique", "client", "qui", "vendez"],
  },
  {
    id: "contact",
    q: "Comment vous contacter ?",
    a:
      "Par téléphone au +213.28.46.48.30, par e-mail à support@biointeractiondz.com, ou via le " +
      "bouton « Nous contacter ». Pour une demande commerciale : +213.770.08.54.53 / " +
      "sales@biointeractiondz.com.",
    keywords: ["contact", "contacter", "joindre", "telephone", "numero", "appeler", "email", "mail", "adresse", "coordonnees"],
  },
];
