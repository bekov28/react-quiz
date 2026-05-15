# BrainSync Quiz App

A React-based quiz application that tests knowledge with real-time feedback and highscore tracking.

## Features
*   **Dynamic Questions:** Fetches data from a REST API.
*   **Highscore Persistence:** Saves the highest score across sessions using `PATCH` requests.
*   **Timer:** Adds pressure with a countdown for each quiz session.

---

## Tech Stack
*   **Frontend:** React (Hooks, Reducer)
*   **Backend:** `json-server` (hosted on Render)
*   **Deployment:** Netlify (Frontend) and Render (API)

---

## Project Structure
*   `src/components/`: Modular React components.
*   `src/components/App.js`: State management using `useReducer`.
*   `data/questions.json`: The source data for questions and scores.

---

<img width="1374" height="1000" alt="image" src="https://github.com/user-attachments/assets/79514f0d-57cf-4c85-8490-f40e7b5ba3da" />

## Challenges

### Shuffling Options
**The Problem:**
The questions in the JSON file always listed options in the same order. This made the quiz predictable, as the correct answer was always at the same index. I needed to randomize the options every time a question appeared without losing track of which answer was correct.

**The Solution:**
I implemented a shuffle function before the question is displayed to the user:
1.  When a question loads, the app extracts the `options` array.
2.  The array is shuffled using a randomization algorithm so the visual order is different every time.
3.  Instead of checking the answer based on a fixed index (like "always index 0"), the logic compares the user's selected text with the original data's correct value.
4.  This ensures the quiz feels fresh for every play while maintaining accurate scoring.

---

## How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>

2. **Install dependencies:**
   npm install
3. **Start the JSON server:**
   npm run server
