# SOURCE OF TRUTH — Dominikův ekosystém: CV + Study Hub (Varianta B, oddělené jazyky)

**Status:** Finální vize + závazná specifikace (co stavíme a jak přesně se to má chovat).  
**Pozn.:** CV část je hotová. Tahle specifikace se týká hlavně **Study Hub** + **sdílené administrace**, ale zároveň definuje, jak se Study musí chovat vedle CV (izolace, jazyky, design, data, bot).

---

## 0) Proč to vzniklo (myšlenka a cíl)

Dominik žije v Česku, míří do Koreje a buduje dvě věci zároveň:

1. **CV web** pro korejského zaměstnavatele (HR-safe, profesionální, faktický).
2. **Study Hub** pro korejskou komunitu kolem YouTube “Study With Me” streamů (klidné studijní café).

Study Hub má sloužit jako **“hub” kolem streamu**, ne sociální síť:

- **Žádný chat na webu.**
- **Žádné video/cam na webu.**
- Pro video + chat + cam se používá **externí korejská služba GOOROOMEE (구루미)**.
- Web ukazuje jen **link + heslo + pravidla**.

**Zdrojem pravdy pro live stav a statistiky je BOT.**  
Web nic „nevymýšlí“ (žádné fake view counts), pouze zobrazuje data z Firestore + lokálně dopočítává countdown.

---

## 1) Velký obraz: jedna doména, jeden projekt, dvě části, jedna administrace

### 1.1 Co je pro koho

**A) CV část (zaměstnavatel)**

- Korejsky přirozený styl, HR-safe, faktický.
- Webový životopis + portfolio + dokumenty.
- První věc, kterou uvidí employer.

**B) Study část (komunita z YouTube)**

- “Study café hub”: live status, režimy pomodoro, records, plán, FAQ + quiet inbox.
- Klidné prostředí bez toxických mechanik.

**C) Jedna administrace**

- Jeden login, jedna routa `/admin/*`.
- Admin menu rozdělené na 2 sekce:
  - **CV**
  - **STUDY**
- Vstup do adminu je schovaný **POUZE na CV webu** ve footeru.
- Study web nemá hidden entry.

### 1.2 Zásadní pravidlo: Varianta B (oddělené jazyky)

**CV_LANG** a **STUDY_LANG** jsou dvě oddělené věci:

- CV má vlastní jazykový toggle (KR default, EN second).
- Study má vlastní jazykový toggle (KR default, EN second).
- Přepnutí jazyka v CV **NEMĚNÍ** Study a naopak.

**Důvod:** CV je profesionální styl a slovník, Study je komunitní friendly styl. Nechceme míchat tón ani překladový slovník.

---

## 2) Navigace (IA) — jeden header, dvě sekce v menu

### 2.1 Menu bloky

V headeru jsou jasně 2 bloky (vizuálně oddělené nadpisem / separator line):

**CV**

- 홈
- 프로필
- 시공사례
- 증빙서류

**STUDY**

- 지금
- 기록
- 학습 계획
- 스터디룸(구루미)
- FAQ

Employer na Study klikat nemusí. Když klikne, uvidí klidné prostředí, které podporuje dojem disciplíny a konzistence.

---

## 3) Study Hub — uživatelský pohled (co přesně vidí a co se stane po kliknutí)

**Cílový uživatel:** korejské publikum z YouTube.  
**Zásady UX:**

- Mobile-first.
- Žádné “toxické leaderboardy”.
- Žádné osobní údaje ostatních.
- Žádné zobrazování obsahu chat zpráv ani jmen.
- Kdo “studuje” = pouze ti, co udělali **!start/!stop** nebo jsou přihlášení (a je to vždy transparentně napsané).

---

# 3.1 Study Header (na všech /study stránkách)

**✅ IMPLEMENTOVÁNO** - Header je jednotný komponent jako na CV, ale chování je study-izolované:

- Aktivní sekce je "스터디".
- Jazyk toggle ovládá **STUDY_LANG**, ne CV_LANG.
- Theme toggle (Day/Night) ovládá **STUDY_THEME**, ne CV theme.

### Co je vlevo (AKTUÁLNÍ IMPLEMENTACE)

**Photo Frame** (obdélníkový s lightboxem):

- Rozměry: `w-32 sm:w-40` (jako CV Header.tsx)
- Styl: `rounded-md` (zakulacené rohy)
- Obrázek: `/img/profile/youtube_profil.webp`
- Placeholder: "DT" na pozadí
- **Lightbox**: Klik na foto → otevře full size obrázek (Expand ikona na hover)

**Info Block** (vedle fotky):

- **Název kanálu**: "도미니크" (h1, text-3xl, bold)
- **Podnadpis**: "Quiet Study Room" (text-sm, muted)
- **Motivační věta**: "조용히, 꾸준히. 함께 집중하고 성장하는 공간입니다." (KR) / "Quietly, consistently. A space to focus and grow together." (EN)
- **Social Links** (vertikálně pod sebou):
  - YouTube: `@dominiktyrkr` (ikona + handle, red hover)
  - Instagram: `@dominiktyrnel` (..., pink hover)
  - KakaoChat: "Open KakaoChat" (..., amber hover)

### Co je vpravo

- Toggle **STUDY_LANG**: KR / EN (pill buttons)
- Toggle **STUDY_THEME**: Day / Night (sun/moon)
- "Back to CV" link (MapPin ikona)

### Kliknutí (interakce)

- Klik na **foto** → otevře lightbox s full size obrázkem
- Klik na social ikonky → otevře příslušný profil (YouTube, Instagram, KakaoChat)
- Klik na položky menu → přejde na konkrétní study route
- Klik na KR/EN → přepne study texty na všech study stránkách (persistuje se do localStorage)
- Klik na Day/Night → přepne vizuál study (persistuje se do localStorage)

**Footer Text** (AKTUÁLNÍ):

- "같이 공부해요. 같이 성장해요. 계속 나아가요."
- "© 2025 Dominik Tyrnel. All rights reserved. (모든 권리 보유)"

---

# 3.2 /study/now — “지금 (Now)” (Study Dashboard)

## Účel

Jedním pohledem:

- jestli stream běží
- v jakém je režimu (Focus/Break…)
- kolik zbývá času (lokální countdown)
- rychlý vstup do YouTube + Gooroomee

## Layout (bez scrollu na mobilu — “above the fold”)

### Karta 1: Live status (nejdůležitější)

Zobrazení:

- Badge: **LIVE** (červený) / **OFFLINE** (šedý)
- `연결됨`: čas od připojení (connectedAt)
- `진행 시간`: HH:MM:SS (uptimeSeconds)
- `현재 모드`: Focus / Break / Long Break / Pause
- `남은 시간`: 12:34 (lokální countdown z endsAt)
- `오늘 함께`: dnešní souhrn (blocks + minutes)

**Důležité:** countdown se nesmí číst každou sekundu z DB. DB dává endsAt, UI si odpočítává lokálně.

### CTA řada (tlačítka)

1. **YouTube 라이브 열기**

- Pokud `streamOnline=true`: otevře konkrétní stream URL (streamId)
- Pokud offline: otevře kanál / poslední stream (podle implementace)

2. **스터디룸 입장 (구루미)**

- Klik otevře rozbalovací kartu s:
  - link (URL)
  - heslo
  - copy tlačítka (Copy link / Copy password)
  - krátká pravidla (mic off, respekt, nerušit)
- Druhý klik nebo “X” → zavře kartu

## Další sekce (po scrollu)

### Sekce A: 활동 (Activity)

- 최근 5분 활동: `activeAuthorsLast5minCount` (nebo anonymní list)
- 메시지 수: `chatMessagesCount`
- 마지막 메시지 시간: relativně (“n před minutami”)

**Zásada:** neukazovat obsah zpráv ani reálné jméno autora. Max anonymní.

### Sekce B: 함께 공부 중 (Sessions)

- “지금 공부 중: X”
- Vysvětlující poznámka (povinná):  
  `기준: 채팅에서 !start 입력(또는 웹 로그인)`
- (Volitelně) anonymní list: “User #12” bez identity

### Sekce C: 타임라인 (Feed)

- Události (bez osobních dat):
  - STREAM_ONLINE / STREAM_OFFLINE
  - FOCUS_START / BREAK_START / LONG_BREAK_START
  - DAILY_SUMMARY (pokud existuje)
- Každý event: ikona + krátký text + čas

### Sekce D: Mini stats preview

- Mini heatmap (14–30 dní)
- Weekly avg
- Streak
- Tlačítko: “기록 보기” → /study/records

## Stavy a chování při výpadku

- Pokud bot neupdate > 60s: UI ukáže “데이터 업데이트 지연” (stale indicator)
- Pokud dokumenty v DB neexistují: ukáže fallback “준비 중” (nesmí spadnout)

---

# 3.3 /study/records — “기록 (Records)”

## Účel

Ukaž konzistenci bez toxických motivací. Records jsou primárně “důkaz rutiny”.

## Data zdroj (zásadní)

**Heatmap a souhrny čtou primárně `daily_stats`**, ne všechny sessions:

- levnější (30–60 dokumentů)
- stabilnější
- rychlejší

`study_sessions` je jen pro případný detail dne / debug / budoucí rozšíření.

## Layout

### Heatmap (30 dní, volitelně 60)

- CSS grid, 7 sloupců (dny v týdnu)
- Barvy podle minut (stupně), žádná knihovna nutná

### Souhrnné karty

- 주간 평균
- 최고 기록일
- 연속 기록 (streak)

### Seznam dní

- každý řádek: datum + totalMinutes + blocks
- klik na řádek dne → otevře detail dne (inline rozbalení nebo samostatný route /study/records/YYYY-MM-DD)

### Detail dne (pokud implementováno)

- souhrn dne
- timeline dne (z events nebo daily payload)
- volitelně “오늘의 한 줄” (krátká věta generovaná botem)

---

# 3.4 /study/plan — “학습 계획 (Plan)”

## Účel

Transparentní 10měsíční roadmapa (studium korejštiny + příprava na Koreu).

## Data model (doporučeno kvůli admin UX)

**Single document:** `study_plan/current`

- měsíce + checklisty + statusy
- snadné editování v adminu
- méně reads

## Layout

- Timeline po měsících (vertikální)
- Každý měsíc:
  - název + krátký cíl
  - checklist items
  - status ikony:
    - ✅ done
    - ⏳ doing
    - ❌ miss / skipped
- Progress bar: % splněno

Kliknutí:

- klik na měsíc → rozbalí/zbaluje detail
- klik na item neprovádí změnu (změny dělá admin)

---

# 3.5 /study/room — “스터디룸 (구루미)”

## Účel

Jednoduchý “landing” pro externí room.

Obsah:

- link + heslo
- copy tlačítka
- jednoduchý návod “2 kroky”
- pravidla (mic off, respekt, nerušit)

Kliknutí:

- Copy link → zkopíruje URL, ukáže toast “복사됨”
- Copy password → zkopíruje heslo, toast “복사됨”
- Open room → otevře link v nové záložce

Pozn.: Room může být veřejně dostupný (s heslem). Nepotřebujeme web chat ani web video.

---

# 3.6 /study/faq — “FAQ”

## Účel

Udělat pořádek v opakovaných otázkách + vyhledávání.

Layout:

- Search input nahoře
- Kategorie chips
- seznam článků (accordion nebo cards)
- detail článku

Kliknutí:

- klik na chip → filtruje list
- klik na článek → otevře detail
- klik na “관련 글” → otevře další článek

CTA:

- “질문 남기기”
  - pokud user není přihlášen → redirect na /study/auth (ne admin)
  - pokud user přihlášen → otevře quiet inbox form (modal nebo /study/inbox)

---

# 3.7 Quiet Inbox (bez chatu) — jen pro přihlášené

## Účel

Lidi posílají otázky, ty odpovíš později. Workflow je “Inbox → FAQ”.

### Uživatel flow

1. Klikne “질문 남기기”
2. Není přihlášen → redirect `/study/auth`
3. Přihlášen → formulář:
   - textarea “질문”
   - checkbox “FAQ로 공개해도 괜찮아요” (default ON)
4. Klik “보내기”:
   - uloží se inbox item do Firestore
   - UI ukáže potvrzení:  
     “접수되었습니다. 답변은 FAQ에 올라갈 수 있어요 🌿”
5. Otázka se nikde veřejně nezobrazí, dokud ji admin nezpracuje.

---

## 4) Auth pro Study (komunitní přihlášení)

Study login je oddělený od admin loginu:

- `/admin/login` je pouze pro tebe (admin).
- `/study/auth` je pro komunitu (uživatelé), aby mohli posílat otázky do inboxu.

Možnosti přihlášení:

- Email/password (jednoduché)
- volitelně OAuth (YouTube/Google) později — není povinné hned

---

# 5) Data model (Firestore) — BOT je source of truth

## 5.1 Zásady bezpečnosti dat

- Veřejná část webu má **read-only** přístup k public study datům.
- Zápisy (write) do bot statusu dělá bot (server/externí), ne běžný user.
- Uživatelé mohou zapisovat pouze do `inbox/questions/*` (a jen svoje).
- Admin může zapisovat do všeho v “study content”.

## 5.2 Kolekce / dokumenty (doporučený “finální” kontrakt)

### A) bot_status/current

- `schemaVersion: number`
- `streamOnline: boolean`
- `streamId: string | null`
- `connectedAt: Timestamp | null`
- `uptimeSeconds: number`
- `mode: 'FOCUS' | 'BREAK' | 'LONG_BREAK' | 'PAUSE' | 'OFFLINE'`
- `modeStartedAt: Timestamp | null`
- `endsAt: Timestamp | null` _(konec aktuálního bloku)_
- `updatedAt: Timestamp` _(poslední validní update od bota)_
- `lastPollAt: Timestamp` _(heartbeat)_

### B) stream_stats/current

- `schemaVersion: number`
- `chatMessagesCount: number`
- `activeAuthorsLast5minCount: number`
- `lastMessageAt: Timestamp | null`
- `updatedAt: Timestamp`

### C) events/{eventId}

- `schemaVersion: number`
- `type: 'STREAM_ONLINE' | 'STREAM_OFFLINE' | 'FOCUS_START' | 'BREAK_START' | 'LONG_BREAK_START' | 'PAUSE' | 'DAILY_SUMMARY'`
- `createdAt: Timestamp`
- `streamId: string | null`
- `dayKey: string` _(YYYY-MM-DD, jednotně definované timezone)_
- `payload: map` _(jen safe data, žádná jména, žádné message texty)_

### D) daily_stats/{dayKey}

- `schemaVersion: number`
- `dayKey: string` _(YYYY-MM-DD)_
- `date: Timestamp` _(start dne, pro query range)_
- `totalMinutes: number`
- `focusMinutes?: number`
- `blocks?: number`
- `sessionsCount?: number`
- `activeUsersCount?: number`
- `summaryLine?: string` _(volitelné)_
- `updatedAt: Timestamp`

### E) study_sessions/{sessionId} (sekundární)

- `schemaVersion: number`
- `userId: string` _(anonym/uid)_
- `startedAt: Timestamp`
- `endedAt: Timestamp | null`
- `minutes: number` _(může být computed po uzavření)_
- `source: 'bot_command' | 'web_manual'`

> Pozn.: Records UI nesmí stát na tom, že stáhne tisíce sessions. Primární je `daily_stats`.

### F) study_plan/current (single doc)

- `schemaVersion: number`
- `updatedAt: Timestamp`
- `months: MonthPlan[]`
  - `monthKey: 'YYYY-MM'`
  - `titleKR`, `titleEN`
  - `goalKR?`, `goalEN?`
  - `items: PlanItem[]`
    - `id`
    - `textKR`, `textEN`
    - `status: 'done' | 'doing' | 'todo'`
    - `order`

### G) room_settings/current

- `schemaVersion: number`
- `updatedAt: Timestamp`
- `roomLink: string`
- `roomPassword: string`
- `rulesKR: string[]`
- `rulesEN: string[]`

### H) faq_items/{id}

Doporučení: jeden dokument obsahuje KR i EN (kvůli Variant B a editaci):

- `schemaVersion`
- `published: boolean`
- `category: string`
- `tags: string[]`
- `kr: { title, perex, body }`
- `en: { title, perex, body }`
- `createdAt`, `updatedAt`

### I) inbox_questions/{id}

- `schemaVersion`
- `userId: string`
- `question: string`
- `consentPublish: boolean`
- `status: 'NEW' | 'IN_PROGRESS' | 'ANSWERED' | 'PUBLISHED' | 'ARCHIVED'`
- `adminAnswer?: string` _(neveřejné dokud publish)_
- `linkedFaqId?: string`
- `createdAt`, `updatedAt`

---

## 6) BOT kontrakt + finanční bezpečnost (Firestore náklady nesmí “zabít” projekt)

### 6.1 Zásady zápisů (NEPŘEKROČIT)

**Bot nesmí zapisovat každou vteřinu.**  
Zápisy musí být minimalizované, ale UI má působit realtime.

**Write policy (závazné):**

- Heartbeat do `bot_status/current`: **1× za 10–30 sekund**
- `stream_stats/current`: max **1× za 30–60 sekund** (nebo při významné změně)
- `events/*`: zapisovat jen při změně režimu / online/offline / summary (ne spam)
- `daily_stats/*`: agregovat a zapisovat rozumně (např. 1× za pár minut, nebo při ukončení bloku, nebo batch)

### 6.2 Lokální countdown (zásadní)

UI dostane `endsAt` a odpočítává lokálně.

- Žádné čtení z DB každou sekundu.
- Žádné přepisování endsAt každou sekundu.

### 6.3 Nejhorší scénář, co nesmí nastat

- bot zapisuje 1×/sek → rychle narostou write náklady a může to zlobit.
- web klient načítá tisíce sessions → mnoho reads.

Tomu se vyhýbáme:

- agregace do `daily_stats`
- heartbeat max 10–30s
- limitované query (events limit 10/20)
- lazy loading /study rout
- caching s verzí (v adminu bump content version)

---

## 7) Izolace Study od CV (musí být separátně “ve všem”)

### 7.1 Styling: scoped design tokens

Study musí mít vlastní design systém bez zásahu do CV:

- vše v `/study/*` je obalené wrapperem `.study-scope`
- CSS proměnné pro study se definují uvnitř `.study-scope` (ne v :root)

### 7.2 Contexty

- CV používá `LanguageContext` (CV_LANG) + (případně CV theme)
- Study používá `StudyLanguageContext` (STUDY_LANG) a `StudyThemeContext` (STUDY_THEME)
- Persistuje se:
  - `app-lang` (CV)
  - `app-study-lang` (Study)
  - `app-study-theme` (Study)
- Změna jednoho nesmí měnit druhé.

### 7.3 Routing a lazy loading

- `/study` redirect → `/study/now`
- Study routy lazy-loaded (study bundle se načítá až při vstupu do /study)
- Study layout je izolovaný (StudyLayout), ale header zůstává konzistentní vizuálně.

---

# 8) DESIGN SPECIFIKACE (Study Hub) — “Study café u Dominika”

**Cíl designu:** klidné, teplé, návratové. Žádný “gaming UI”. Mobile-first.

## 8.1 Palety — source of truth (HEX)

### Light Theme (Day) — “Ranní káva u stolu”

- Background (Warm Paper): **#F9F7F2**
- Surface/Card (Clean Desk): **#FFFFFF**
- Primary Text (Espresso): **#3D3630**
- Secondary Text (Pencil Grey): **#787066**
- Primary Accent (Desk Wood): **#C59D5F**
- Accent Hover (Cozy Lamp): **#E6B877**
- Borders/Dividers (Light Oak): **#E8E0D5**

### Dark Theme (Night) — “Bulmeong & Focus”

- Background (Deep Room): **#1A1816**
- Surface/Card (Shadow Surface): **#262320**
- Primary Text (Book Page): **#EBE5DA**
- Secondary Text (Dim Light): **#A69E94**
- Primary Accent (Fireplace Glow): **#FF9F43**
- Accent Hover (Warm Ember): **#D67D34**
- Borders/Dividers (Dark Wood): **#3D3630**

### Status barvy

LIVE badge:

- bg **#FF4D4D**, text **#FFFFFF**

OFFLINE badge:

- Light: bg **#E8E0D5**, text **#3D3630**
- Dark: bg **#3D3630**, text **#EBE5DA**

DONE (✅):

- Light: bg **#2E7D32**, text **#FFFFFF**
- Dark: bg **#7AD97A**, text **#1A1816**

PENDING (⏳):

- Light: bg **#C59D5F**, text **#3D3630**
- Dark: bg **#FF9F43**, text **#1A1816**

MISS (❌):

- Light: bg **#B23B3B**, text **#FFFFFF**
- Dark: bg **#FF6B6B**, text **#1A1816**

## 8.2 Typografie + spacing

- KR: Noto Sans KR (nebo Pretendard, pokud bude)
- EN: Inter / system fallback

Mobile-first:

- H1: 20–22px / 700
- H2: 16–18px / 700
- Body: 14–15px / 400–500
- Meta: 12–13px

- Page padding mobile: 16px
- Max width desktop: 1040px (center)
- Card radius: 14px
- Border: 1px (Light Oak / Dark Wood)
- Shadow: jemný pouze v Light, v Dark spíš kontrast surface

## 8.3 Komponenty (všude stejné)

### Card

- bg: Light #FFFFFF / Dark #262320
- border: Light #E8E0D5 / Dark #3D3630
- primary text: Light #3D3630 / Dark #EBE5DA
- secondary: Light #787066 / Dark #A69E94

### Primary CTA button

- Light: bg #C59D5F, text #3D3630, hover #E6B877
- Dark: bg #FF9F43, text #1A1816, hover #D67D34

### Secondary button

- Light: border #E8E0D5, text #3D3630, hover bg #F9F7F2
- Dark: border #3D3630, text #EBE5DA, hover bg #262320

### Inputs

- bg: Light #FFFFFF / Dark #262320
- border: Light #E8E0D5 / Dark #3D3630
- focus ring: Light #C59D5F / Dark #FF9F43

---

# 9) Administrace (jedna společná) — uživatelský popis (admin)

**Admin UI je v češtině.**  
Edituje KR/EN texty (dual view nebo toggle KR/EN).

## 9.1 Přístup (zásadní)

- Admin je dostupný na `/admin/login`
- **Vstup JE POUZE přes CV footer hidden entry:**
  - Desktop: multi-click na “Dominik Tyrnel”
  - Mobile: long-press na “Dominik Tyrnel”
- Study footer nemá hidden entry.

## 9.2 Admin Layout

- Sidebar vlevo (desktop), hamburger (mobile)
- Sidebar sekce:
  - **CV**
  - **STUDY**
- Nahoře status bar:
  - přihlášen jako…
  - save state: “Neuloženo / Uloženo ✓ (čas)”
- Každý editor má fixní tlačítko “Uložit změny” dole vpravo + toast po uložení.

## 9.3 Admin Dashboard

Karty:

- CV: poslední úprava, počet projektů, počet dokumentů
- STUDY: live status read-only, dnešní souhrn, poslední eventy
- Inbox: počet NEW
- FAQ: počet draft/published

Volitelné (pokud měříme):

- návštěvy (dnes/týden/měsíc/rok/celkem)
- stažení dokumentů (track kliků)

## 9.4 STUDY sekce v adminu (povinné moduly)

1. **Room (구루미)**
   - edit: link, heslo, pravidla (KR/EN)
   - uložení → okamžitě se projeví na webu

2. **Plan**
   - editor `study_plan/current` (months + checklist)
   - statusy ✅/⏳/❌

3. **FAQ**
   - CRUD článků
   - kategorie, tags
   - draft/publish

4. **Inbox**
   - list otázek: NEW/IN_PROGRESS/ANSWERED/PUBLISHED/ARCHIVED
   - odpověď admina
   - tlačítko “Publikovat do FAQ”
     - vybere kategorii + upraví titulek/perex
     - vytvoří FAQ item a propojí linkedFaqId
     - inbox status → PUBLISHED

5. **Bot / Status (read-only)**
   - aktuální bot_status/current + stream_stats/current
   - ukázat “stale data” indikaci i v adminu

## 9.5 Quiet Inbox → FAQ workflow (source of truth)

1. User (přihlášen) odešle otázku → uloží se inbox item (status NEW)
2. Admin otevře Inbox → napíše odpověď
3. Admin klikne “Publikovat do FAQ”
4. Vznikne FAQ článek + inbox item přejde do PUBLISHED
5. Uživatel najde odpověď přes FAQ search

---

# 10) Překlady (oddělené od CV) — pravidla

- CV texty a Study texty mají oddělené content modely a tón.
- Study překlady se dělají tak, aby zněly jako komunita (friendly, klidné).
- CV překlady se dělají profesionálně (fakticky, bez marketingu).

Technicky:

- CV content: `src/content/kr.ts`, `src/content/en.ts` + `kr_common.ts` / `en_common.ts`
- Study content: separátní (např. `src/study/content/kr.ts`, `src/study/content/en.ts`) nebo Firestore dokumenty s `kr/en` uvnitř
- Důležité: nesmí se sdílet slovník “na sílu”, protože se liší tón.

---

# 11) Bezpečnost, soukromí, pravidla

Study sekce nesmí:

- zobrazovat jména / handle lidí
- zobrazovat obsah zpráv
- zobrazovat přesné viewer count, pokud to není pravda a stabilní
- být “doxxing” riziko

Bot data v DB:

- pouze agregovaná, safe
- žádná osobní data uživatelů kromě anonymního userId (pokud vůbec)

---

# 12) “Co z aktuální verze použít jako stavebnici”

Použít:

- StudyLayout + routy
- Theme Day/Night systém (pokud je čistý)
- Widgety dashboardu (Status/Timer/Activity/Timeline) jako základ
- Admin rozdělení CV/STUDY
- Pattern cache invalidace + verze

Nepoužít:

- web chat
- web video/cam
- fake counts
- zveřejňování autorů/jmen

---

# 13) Acceptance Criteria (hotové = hotové)

Study Hub je “done”, když:

- /study/now ukazuje live/offline + režim + lokální countdown + CTA na YT + Gooroomee card
- /study/records čte `daily_stats` a zobrazuje heatmap + souhrny
- /study/plan čte `study_plan/current` a zobrazuje 10 měsíců + statusy
- /study/room ukazuje link+heslo+rules z `room_settings/current`
- /study/faq má search + kategorie + detail článku
- Quiet Inbox lze poslat jen po loginu a admin to umí převést do FAQ
- Jazyky jsou oddělené (CV_LANG ≠ STUDY_LANG)
- Study design je plně scoped (.study-scope) a neovlivňuje CV
- Bot write policy je dodržena (10–30s heartbeat), žádné DB spamování
- Firestore náklady jsou kontrolované: žádné masivní čtení sessions na heatmap

---

KONEC — Tahle specifikace je závazná “pravda”.
Všechno mimo ni (staré implementace, experimenty) je vedlejší a může se zahodit.
#   1 4 )   F i r e s t o r e   S e c u r i t y   R u l e s   ( r o z 9�� 9"!e n �  s p e c i f i k a c e ) 
 
 
 
 # #   1 4 . 1   O b e c n �  P o l i t i k a 
 
 
 
 -   V e 9"!e j n �  � d�s t   S t u d y   H u b   j e   * * r e a d - o n l y * *   p r o   a n o n y m n �   u 9>i v a t e l e 
 
 -   Z �p i s y   d o   b o t   c o l l e c t i o n s   d � : l �  * * b o t   s e r v e r * *   ( A d m i n   S D K ,   n e   c l i e n t ) 
 
 -   U 9>i v a t e l �   m 9{9>o u   z a p i s o v a t   * * p o u z e   d o   ` i n b o x _ q u e s t i o n s / * ` * *   ( a   j e n   s v o j e ) 
 
 -   A d m i n   m 9{9>e   z a p i s o v a t   d o   * * v 9�e h o * *   ( s   v a l i d a c �   ` a d m i n s / { u i d } . i s A d m i n   = =   t r u e ` ) 
 
 
 
 # #   1 4 . 2   K o n k r � t n �   P r a v i d l a 
 
 
 
 # # #   S t u d y   C o n t e n t   ( P u b l i c   R e a d ,   A d m i n   W r i t e ) 
 
 
 
 ` ` ` j a v a s c r i p t 
 
 / /   s t u d y _ p l a n / c u r r e n t ,   r o o m _ s e t t i n g s / c u r r e n t ,   f a q _ i t e m s / * 
 
 a l l o w   r e a d :   i f   t r u e ;     / /   V e 9"!e j n � :   � di t e l n � 
 
 a l l o w   w r i t e :   i f   r e q u e s t . a u t h   ! =   n u l l   & & 
 
                                 g e t ( / d a t a b a s e s / $ ( d a t a b a s e ) / d o c u m e n t s / a d m i n s / $ ( r e q u e s t . a u t h . u i d ) ) . d a t a . i s A d m i n   = =   t r u e ; 
 
 ` ` ` 
 
 
 
 # # #   B o t   S t a t u s   ( P u b l i c   R e a d ,   B o t   W r i t e ) 
 
 
 
 ` ` ` j a v a s c r i p t 
 
 / /   b o t _ s t a t u s / c u r r e n t ,   s t r e a m _ s t a t s / c u r r e n t ,   e v e n t s / * ,   d a i l y _ s t a t s / * 
 
 a l l o w   r e a d :   i f   t r u e ; 
 
 a l l o w   w r i t e :   i f   f a l s e ;     / /   P o u z e   A d m i n   S D K   ( b o t   s e r v e r ) ,   n i k d y   c l i e n t 
 
 ` ` ` 
 
 
 
 # # #   I n b o x   ( A u t h   R e q u i r e d ,   O w n   D a t a ) 
 
 
 
 ` ` ` j a v a s c r i p t 
 
 / /   i n b o x _ q u e s t i o n s / * 
 
 a l l o w   r e a d :   i f   r e q u e s t . a u t h   ! =   n u l l ;     / /   P 9"!i h l �9�e n �   m o h o u   � d� s t 
 
 a l l o w   c r e a t e :   i f   r e q u e s t . a u t h   ! =   n u l l   & & 
 
                                   r e q u e s t . r e s o u r c e . d a t a . u s e r I d   = =   r e q u e s t . a u t h . u i d ;     / /   J e n   s v o j e 
 
 a l l o w   u p d a t e :   i f   r e q u e s t . a u t h   ! =   n u l l   & & 
 
                                   ( r e s o u r c e . d a t a . u s e r I d   = =   r e q u e s t . a u t h . u i d   | |     / /   U s e r   e d i t s   o w n 
 
                                     g e t ( / d a t a b a s e s / $ ( d a t a b a s e ) / d o c u m e n t s / a d m i n s / $ ( r e q u e s t . a u t h . u i d ) ) . d a t a . i s A d m i n   = =   t r u e ) ;     / /   A d m i n   e d i t s   a n y 
 
 a l l o w   d e l e t e :   i f   r e q u e s t . a u t h   ! =   n u l l   & & 
 
                                   g e t ( / d a t a b a s e s / $ ( d a t a b a s e ) / d o c u m e n t s / a d m i n s / $ ( r e q u e s t . a u t h . u i d ) ) . d a t a . i s A d m i n   = =   t r u e ;     / /   O n l y   a d m i n 
 
 ` ` ` 
 
 
 
 - - - 
 
 
 
 #   1 5 )   B o t   H e a l t h   M o n i t o r i n g   &   R e l i a b i l i t y 
 
 
 
 B o t   m o n i t o r i n g   v   a d m i n   d a s h b o a r d u   +   a l e r t i n g   +   r a t e   l i m i t i n g   e n f o r c e m e n t . 
 
 
 
 [ K o m p l e t n �   o b s a h   v i z   i m p l e m e n t a t i o n _ p l a n . m d ] 
 
 
 
 - - - 
 
 
 
 #   1 6 )   U X   I m p r o v e m e n t s   ( L o a d i n g ,   O f f l i n e ,   E r r o r s ) 
 
 
 
 L o a d i n g   s t a t e s ,   P W A   o f f l i n e   s u p p o r t ,   S e n t r y   e r r o r   t r a c k i n g . 
 
 
 
 [ K o m p l e t n �   o b s a h   v i z   i m p l e m e n t a t i o n _ p l a n . m d ] 
 
 
 
 - - - 
 
 
 
 #   1 7 )   A d m i n   B u l k   O p e r a t i o n s   &   I m p r o v e m e n t s 
 
 
 
 F A Q   b u l k   p u b l i s h / d e l e t e ,   I n b o x   b u l k   a r c h i v e ,   P l a n   t e m p l a t e s . 
 
 
 
 [ K o m p l e t n �   o b s a h   v i z   i m p l e m e n t a t i o n _ p l a n . m d ] 
 
 
 
 - - - 
 
 
 
 #   1 8 )   S c a l a b i l i t y   &   L o n g - t e r m   M a i n t e n a n c e 
 
 
 
 D y n a m i c k �   m � : s � c e   v   p l �n u ,   m u l t i - l a n g u a g e   s c a l i n g ,   e v e n t   c l e a n u p   T T L . 
 
 
 
 [ K o m p l e t n �   o b s a h   v i z   i m p l e m e n t a t i o n _ p l a n . m d ] 
 
 
 
 - - - 
 
 
 
 #   1 9 )   D e v e l o p e r   E x p e r i e n c e   &   C I / C D 
 
 
 
 P r e - c o m m i t   h o o k s ,   e n v i r o n m e n t   m a n a g e m e n t ,   G i t H u b   A c t i o n s . 
 
 
 
 [ K o m p l e t n �   o b s a h   v i z   i m p l e m e n t a t i o n _ p l a n . m d ] 
 
 
 
 - - - 
 
 
 
 #   2 0 )   A k t u a l i z o v a n �  A c c e p t a n c e   C r i t e r i a 
 
 
 
 S t u d y   H u b   j e   * * D O N E * * ,   k d y 9>: 
 
 
 
 # #   C o r e   F e a t u r e s   ( P . 1 - P . 4 . 5 )   � [&
 
 
 
 -   [ x ]   / s t u d y / n o w   u k a z u j e   l i v e / o f f l i n e   +   r e 9>i m   +   l o k �l n �   c o u n t d o w n 
 
 -   [ x ]   / s t u d y / r e c o r d s   � dt e   ` d a i l y _ s t a t s `   a   z o b r a z u j e   h e a t m a p 
 
 -   [ x ]   / s t u d y / p l a n   z o b r a z u j e   m � : s � c e   +   s t a t u s y   ( n y n �   d y n a m i c k � ) 
 
 -   [ x ]   / s t u d y / f a q   m �  s e a r c h   +   k a t e g o r i e 
 
 -   [ x ]   Q u i e t   I n b o x   +   a d m i n   p 9"!e v o d   d o   F A Q 
 
 -   [ x ]   J a z y k y   o d d � : l e n �   ( C V * L A N G   � 0 �   S T U D Y * L A N G ) 
 
 -   [ x ]   S t u d y   d e s i g n   s c o p e d   ( . s t u d y - s c o p e ) 
 
 
 
 # #   B o t   &   B a c k e n d   ( P . 5 . 1 )   z 
 
 
 
 -   [   ]   B o t   b � : 9>�   ( p m 2 )   +   z a p i s u j e   d o   F i r e s t o r e 
 
 -   [   ]   B o t   h e a l t h   m o n i t o r i n g   v   a d m i n 
 
 -   [   ]   W r i t e   p o l i c y   d o d r 9>e n a   ( t h r o t t l e ) 
 
 -   [   ]   D a i l y   s t a t s   a g r e g a c e 
 
 
 
 # #   A d m i n   C R U D   ( P . 5 . 2 )   z 
 
 
 
 -   [   ]   S i d e b a r   C V / S T U D Y   s e k c e 
 
 -   [   ]   U I   1 0 0 %   � de s k y   +   t o a s t 
 
 -   [   ]   R o o m   S e t t i n g s   C R U D 
 
 -   [   ]   F A Q   +   b u l k   o p e r a t i o n s 
 
 -   [   ]   I n b o x   w o r k f l o w   +   b u l k   a r c h i v e 
 
 -   [   ]   P l a n   t e m p l a t e s 
 
 
 
 # #   S e c u r i t y   &   R e l i a b i l i t y   ( P . 6 )   z 
 
 
 
 -   [   ]   F i r e s t o r e   r u l e s   c o m p l e t e 
 
 -   [   ]   O f f l i n e   s u p p o r t   ( P W A ) 
 
 -   [   ]   E r r o r   t r a c k i n g   ( S e n t r y ) 
 
 -   [   ]   L o a d i n g   s t a t e s 
 
 
 
 # #   Q u a l i t y   &   D e v E x   ( P . 6 )   z 
 
 
 
 -   [   ]   P r e - c o m m i t   h o o k s 
 
 -   [   ]   E n v   m a n a g e m e n t 
 
 -   [   ]   E v e n t   c l e a n u p   F u n c t i o n 
 
 -   [   ]   B o t   a l e r t i n g 
 
 
 
 * * V e r z e * * :   2 . 1   ( r o z 9�� 9"!e n o   2 0 2 4 - 1 2 - 2 3 ) 
 
 
