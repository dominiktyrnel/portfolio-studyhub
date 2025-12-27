# Porting OBS Logic to Study Bot

## Core Concept
We will port `detectObsAnnouncement` from `ytb_bot/.../obsAnnouncements.ts` to `study_bot/src/core/obsDetector.ts`.
This function accepts `prev` and `next` OBS states (read from Firestore) and returns an event if a transition occurred.

## Modfications
1.  **Simplify Interfaces**: Remove deep dependency on `ytb_bot` Repositories. Define local interfaces for `ObsState`.
2.  **Firestore Writing**: The original code returned a result, and `index.ts` handled the writing. We will encapsulate the writing logic in `ObsManager`.
3.  **Event Schema**: We will write to the `events` collection (as defined in P2) instead of `eventsObsPomodoro` to unify the feed.

## Directory Structure
- `src/core/obsDetector.ts`: Pure logic (detects changes).
- `src/core/obsManager.ts`: Watcher (onSnapshot) -> calls Detector -> Writes to DB.
