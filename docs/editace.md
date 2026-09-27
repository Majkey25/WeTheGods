# Úpravy webu bez programování

Web se upravuje přes **Pages CMS**, formuláře v prohlížeči. Programovat není potřeba.

## Přihlášení

1. Otevři **https://app.pagescms.org** a přihlas se přes GitHub.
2. Vyber repozitář **WeTheGods**.
3. Vlevo je menu: **Koncerty a akce, Hudba, Klipy, Galerie, Členové kapely, O kapele, Nastavení webu**.

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
| Nastavení webu  | E-mail pro formulář, texty, tlačítka a video na úvodu, sociální sítě, press kit, merch.      |

## Nový koncert

1. **Koncerty a akce** → **Add**.
2. Vyplň aspoň **datum, klub a město**. Čas piš jako `20:00`.
3. **Save**. Koncert se sám zařadí mezi nadcházející. Po datu se přesune do proběhlých.

Každá akce má vlastní stránku s navigací a tlačítkem **Přidat do kalendáře**.

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
- **Kontaktní formulář** posílá zprávy přes FormSubmit. Po první skutečné zprávě přijde na
  e-mail kapely aktivační e-mail. Jednou na odkaz klikni, jinak zprávy chodit nebudou.
