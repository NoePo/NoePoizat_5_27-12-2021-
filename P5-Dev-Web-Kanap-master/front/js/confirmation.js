
// Récupérer l'orderId
const recupererUrl = new URL(document.location).searchParams;
const orderId = recupererUrl.get("orderId");

// Affiche le numéro de commande 
document.getElementById("orderId").textContent = orderId;