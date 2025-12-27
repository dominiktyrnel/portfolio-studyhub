# Firebase / Firestore – Billing Audit pro Tyrnel Site

**Datum auditu**: 25. prosince 2024  
**Projekt**: dominik.tyrnel.com (Study Hub + CV)  
**Verze**: 2.4

---

## 📊 Účtování Firebase (Shrnutí)

| Operace    | Účtuje se                                                     |
| ---------- | ------------------------------------------------------------- |
| **Read**   | Dokument doručen klientovi (getDoc/getDocs/onSnapshot update) |
| **Write**  | create/update dokumentu (setDoc/updateDoc)                    |
| **Delete** | smazání dokumentu                                             |

**Free tier (Spark)**: 50,000 reads/day, 20,000 writes/day, 20,000 deletes/day

---

## ✅ Co je DOBŘE (již optimalizováno)

### 1. `useStudyStatus.ts` - OPTIMALIZOVANÝ

```
PŘED: Real-time listener → ~4,000 reads/hour
PO: Polling 60s → 36 reads/hour (99% redukce!)
```

**Důkaz** ([useStudyStatus.ts](file:///c:/Users/domin/Projekty/3_Tyrnel_site/src/hooks/useStudyStatus.ts)):

- Používá `getDoc` + `getDocs` místo `onSnapshot`
- Poll interval: 60 sekund
- Timeline limit: 5 dokumentů (ne 10+)
- Cost: ~36 reads/hour na uživatele

### 2. Security Rules - BEZ get/exists pro public read

```javascript
// ✅ SPRÁVNĚ - žádné extra reads
match /bot_status/current {
  allow read: if true;
}

// ⚠️ POZOR - isAdmin() používá get() ale pouze pro admin operace
function isAdmin() {
  return exists(...) && get(...).data.isAdmin == true;
}
```

**Závěr**: Public read paths nepoužívají get/exists → žádné skryté billing náklady.

---

## ⚠️ Místa ke sledování

### onSnapshot Listenery (10 nalezených)

| Soubor               | Kolekce                                    | Účel       | Riziko               |
| -------------------- | ------------------------------------------ | ---------- | -------------------- |
| `useStudyPlan.ts`    | `study_plan/current`                       | 1 doc      | 🟢 Nízké             |
| `useUserProfile.ts`  | `study_users/{uid}`                        | 1 doc      | 🟢 Nízké (auth-only) |
| `useUserFAQ.ts`      | `inbox_questions` (query)                  | User's FAQ | 🟡 Střední           |
| `StudyBotPage.tsx`   | `config/bot`, `bot_status`, `bot_commands` | Admin      | 🟢 Admin-only        |
| `StudyFAQEditor.tsx` | `faq_items` (query)                        | Admin      | 🟢 Admin-only        |
| `InboxPage.tsx`      | `inbox_questions` (query)                  | Admin      | 🟢 Admin-only        |

**Hodnocení**: Většina listenerů je v admin sekcích (nízký traffic). Veřejná `/study` stránka používá polling.

### getDocs Query Calls

| Soubor               | Kolekce                         | Optimalizace             |
| -------------------- | ------------------------------- | ------------------------ |
| `useStudyStatus.ts`  | `events`                        | ✅ limit(5)              |
| `useStudyRecords.ts` | `daily_stats`, `study_sessions` | ✅ limit(365), limit(20) |
| `StudyFAQPage.tsx`   | `faq_items`                     | ⚠️ Bez limitu            |

---

## 🔴 Potenciální problémy

### 1. `StudyFAQPage.tsx` - FAQ bez limitu

```typescript
// Aktuální kód:
const q = query(collection(db!, "faq_items"), orderBy("order"));
const snap = await getDocs(q);
```

**Riziko**: Pokud bude 100+ FAQ položek, každý návštěvník stránky udělá 100+ reads.

**Doporučení**:

```typescript
const q = query(collection(db!, "faq_items"), orderBy("order"), limit(50));
```

### 2. `useStudyPlan.ts` - používá onSnapshot místo getDoc

**Proč**: Real-time listener na `study_plan/current` pro jednoho uživatele.

**Dopad**: Minimální (1 dokument), ale zbytečný pro statický obsah.

**Doporučení**: Přepnout na `getDoc` + manuální refresh, nebo ponechat (1 doc = nízký cost).

### 3. Chybí `study_schedule` pravidla

Nově přidaná kolekce `study_schedule/current` není v `firestore.rules`.

**Oprava potřeba**:

```javascript
match /study_schedule/current {
  allow read: if true;
  allow write: if isAdmin();
}
```

---

## 📋 Checklist pro budoucí audit

### Kde hledat v kódu:

| Pattern                  | Co sledovat                                |
| ------------------------ | ------------------------------------------ |
| `onSnapshot(`            | Realtime listener - účtuje se každý update |
| `getDocs(`               | Query - účtuje se počet vrácených docs     |
| `getDoc(`                | Single doc - 1 read                        |
| `setDoc(` / `updateDoc(` | Write - 1 write                            |
| `limit(`                 | Kontrola že query mají limit               |

### Security Rules audit:

- [ ] Žádné `get()` nebo `exists()` v public read pravidlech
- [ ] Všechny nové kolekce mají pravidla
- [ ] Default deny rule na konci

---

## 📈 Odhad denních costs

### Scénář: 100 denních návštěvníků Study Hubu

| Oblast           | Reads/návštěvník | Total/den        |
| ---------------- | ---------------- | ---------------- |
| Dashboard status | ~36 (1h session) | 3,600            |
| FAQ stránka      | ~20 (bez limitu) | 2,000            |
| Plan stránka     | ~1               | 100              |
| Records          | ~20              | 2,000            |
| **TOTAL**        |                  | **~7,700 reads** |

**Závěr**: Daleko pod 50,000 free limit. ✅

---

## 🛠️ Akce ke zvážení

### Priorita VYSOKÁ:

1. ✅ Přidat `study_schedule/current` do `firestore.rules`
2. ⚠️ Přidat `limit(50)` do FAQ query

### Priorita NÍZKÁ:

3. Zvážit přepnutí `useStudyPlan` z onSnapshot na getDoc
4. Při růstu návštěvnosti: implementovat cached endpoint (Cloud Functions)

---

## 🔗 Reference

- [Firebase Pricing](https://firebase.google.com/docs/firestore/pricing)
- [Firestore Quotas](https://firebase.google.com/docs/firestore/quotas)
- [Security Rules Conditions](https://firebase.google.com/docs/firestore/security/rules-conditions)
- [Listening to Query Results](https://firebase.google.com/docs/firestore/query-data/listen)
