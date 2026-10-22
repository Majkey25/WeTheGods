# Úpravy webu bez programování

Web se upravuje přes **Pages CMS**, formuláře v prohlížeči. Programovat není potřeba.

## Přihlášení

1. Otevři **https://app.pagescms.org** a přihlas se přes GitHub.
2. Vyber repozitář **WeTheGods**.
3. Vlevo je menu: **Koncerty a akce, Hudba, Skladby, Klipy, Galerie, Členové kapely, O kapele, Nastavení webu**.

Co uložíš, je na webu zhruba **do 3 minut**.

## Co kde upravíš

| Sekce           | Co tam je                                                                                    |
| --------------- | -------------------------------------------------------------------------------------------- |
| Koncerty a akce | Koncerty, vydání, oslavy, autogramiády. Datum, čas, místo, adresa, vstupenky, popis, plakát. |
| Hudba           | Alba, EP a singly: obal, datum, odkaz na poslech, skladby, odkazy na Spotify a další.        |
| Klipy           | Odkaz na YouTube, název, rok. Náhled se vezme z YouTube, pokud nenahraješ vlastní.           |
| Galerie         | Fotky: přidat, smazat, přetáhnout pořadí. Každá potřebuje krátký popis česky a anglicky.     |
| Členové kapely  | Jméno, přezdívka, nástroj, fotka (na výšku).                                                 |
| O kapele        | Texty česky i anglicky a fotka vedle nich.                                                   |
| Nastavení webu  | E-mail, klíč Web3Forms, texty, tlačítka, úvodní video, sociální sítě, press kit, merch.      |

## Nový koncert

1. **Koncerty a akce** → **Add**.
2. Vyplň aspoň **datum, klub a město**. Čas piš jako `20:00`.
3. **Save**. Koncert se sám zařadí mezi nadcházející. Po datu se přesune do proběhlých.

Každá akce má vlastní stránku s navigací a tlačítkem **Přidat do kalendáře**.

## Hudba: detaily skladeb a lyrics

Kliknutí na obal, skladbu v seznamu EP nebo tlačítko **Prozkoumat vydání** otevře detail.
Uvnitř je obal, datum, popis, výklad a odkazy na poslech a Musixmatch. Z detailu EP lze
otevřít jednotlivé skladby a tlačítkem s názvem EP se vrátit zpět.

- **Hudba (vydání):** obal, datum, odkaz na poslech, popis EP v obou jazycích, seznam skladeb
  a odkazy na služby. Musixmatch je mezi službami vedle Spotify, Apple Music a Deezer.
- **Skladby (popisy a texty):** jedna položka pro každou píseň. Název musí přesně odpovídat
  názvu singlu nebo položce seznamu skladeb EP. Vyplň unikátní identifikátor, oba jazykové
  popisy a výklady a přímý odkaz na Musixmatch. Jedna položka se sdílí mezi singlem a EP.
- **Výklady** jsou na webu označené jako interpretace. U Disconnect.exe vycházejí pouze
  z názvu, protože Musixmatch při přípravě změny text neuváděl. Až bude dostupný, uprav výklad,
  jeho zdroj i přepínač dostupnosti textu.
- **Vlastní text skladby od kapely:** volitelné pole pro lyrics dodané kapelou k publikování.
  Zachová zalomení řádků a zobrazí text přímo v detailu. Když zůstane prázdné, zobrazí se
  odkaz na kompletní text na Musixmatch, případně zpráva o jeho nedostupnosti.
- **Nová skladba:** nejprve přidej její detail do Skladeb, potom ji použij v Hudbě. Chybějící
  detail nebo duplicitní identifikátor zastaví sestavení, aby se na web nedostal nefunkční odkaz.

Bez JavaScriptu vedou odkazy dál přímo na původní poslechovou službu.

## Úvod: tlačítka a video za logem

V **Nastavení webu**:

- **Tlačítka pod podtitulem:** nejvýš 3. První je bílé, další červená. Odkaz může být
  `https://...`, stránka webu jako `/videos/` (jazyk se doplní sám), nebo `#videos` (sekce na úvodu).
- **Video za logem:** nahraj krátkou smyčku `.mp4` bez zvuku, 10–20 s, 720p–1080p, ideálně do 3 MB.
  Větší než 10 MB web nepřijme. Web video pustí až po načtení stránky. Na pomalém připojení,
  při úsporném režimu dat a při vypnutých animacích ho nestahuje vůbec.
- **Obrázek za logem:** ukáže se hned a na pomalém připojení místo videa. Vyber záběr podobný videu.

## Když se něco pokazí

Web před zveřejněním každou změnu zkontroluje. Když najde chybu (třeba špatné datum nebo
chybějící fotku), **nezveřejní se nic a web zůstane jak byl**. Chybu opravíš ve stejném formuláři.

## Pro správce (Majkey)

- **Přidání člena kapely:** GitHub → repozitář → Settings → Collaborators → Add people,
  role **Write**. Pak se může přihlásit do Pages CMS.
- **Pages CMS** si při prvním přihlášení vyžádá instalaci své GitHub aplikace. Povol ji jen
  pro repozitář WeTheGods.
- **Kontaktní formulář** posílá zprávy přes Web3Forms. V Nastavení webu vlož veřejný UUID
  do pole **Web3Forms access key**. Příjemce se nastavuje ve Web3Forms zvlášť, změna kontaktního
  e-mailu na webu ho nezmění. Bez klíče se formulář nezobrazí; kontaktní e-mail zůstane dostupný.
  Účet spravuje osobní přihlášení, příjemcem musí být ověřená kapelní schránka. Pro formulář je
  nastavená bezplatná šablona Plain a mazání podání starších než 7 dní; při změně uchování uprav
  také české a anglické informace o soukromí na kontaktní stránce.
