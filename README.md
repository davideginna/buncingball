# Bouncing Balls - Physics Game

Un gioco interattivo di fisica con palline che rimbalzano, supporto al giroscopio e collisioni realistiche.

## Caratteristiche

- Canvas HTML5 con rendering fluido
- Fisica realistica con gravità e collisioni elastiche
- Supporto al giroscopio per dispositivi mobili
- Interfaccia responsive per smartphone e desktop
- Personalizzazione di grandezza, velocità e colore delle palline

## Come Usare

1. Apri il gioco nel browser
2. Regola i parametri:
   - **Grandezza**: da 5 a 50 pixel
   - **Velocità**: da 1 a 10
   - **Colore**: scegli il colore preferito
3. Clicca "Aggiungi Pallina" per creare una nuova pallina
4. Su dispositivi mobili, scuoti il telefono per influenzare il movimento delle palline
5. Usa "Cancella Tutto" per rimuovere tutte le palline

## Deploy su GitHub Pages

Questo progetto è configurato per il deploy automatico su GitHub Pages tramite GitHub Actions.

### Setup:

1. Crea un repository su GitHub
2. Pusha il codice sul branch `main`
3. Vai su Settings > Pages nel tuo repository
4. Sotto "Source", seleziona "GitHub Actions"
5. Il sito sarà automaticamente deployato ad ogni push

### Comandi Git:

```bash
git init
git add .
git commit -m "Initial commit: Bouncing Balls game"
git branch -M main
git remote add origin https://github.com/TUO_USERNAME/buncingballs.git
git push -u origin main
```

## Tecnologie Utilizzate

- HTML5 Canvas
- CSS3 con gradients e animazioni
- JavaScript vanilla (ES6+)
- Device Motion API per il giroscopio
- GitHub Actions per il deploy

## Fisica Implementata

- Gravità costante
- Rimbalzo elastico sui bordi con smorzamento
- Collisioni elastiche tra palline usando conservazione del momento
- Influenza del giroscopio sul movimento
- Resistenza dell'aria (smorzamento della velocità)

## Browser Supportati

- Chrome/Edge (desktop e mobile)
- Safari (iOS per il giroscopio)
- Firefox
- Opera

**Nota**: Il supporto al giroscopio richiede HTTPS su iOS (Safari). GitHub Pages fornisce HTTPS automaticamente.
