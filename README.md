
## Demo Video

Link: https://devpost.com/software/fairtime?_gl=1*9n9vvc*_gcl_au*MjExNDI5NjA4MS4xNzkzMjIzNzk5*_ga*MTgxMjE5MTQ1OC4xNzkyMjUzNDI4

# FairTime

A meeting scheduler that finds the fairest time for everyone, then books it.

FairTime pulls calendars from different platforms into one view, uses a custom
fairness algorithm to choose the best meeting time, and pushes the result back
into each person's own calendar. It was built in one weekend at the IKU women's hackathon
and won the side track for **Best Use of TigerData**.

**Live demo:** https://fairtime-xi.vercel.app

## The problem

Finding a time that works for a group usually means a long chain of messages,
and the "best" slot often suits some people far better than others (for example,
one person always gets the early or late meeting). 

## The fairness algorithm

FairTime doesn't just pick the time that suits the most people. It picks the
time that is **least bad for whoever has it worst**.

- **Minimax approach.** For each possible slot, FairTime works out how
  inconvenient it is for every attendee, then looks at the worst-off person.
  The slot where that worst case is smallest wins. In other words, it minimises
  the maximum inconvenience.
- **Time differences.** Inconvenience is based on how far a slot is from a
  person's [normal hours / preferred times], including time-zone differences,
  so a 7am call for someone and a 3pm call for someone else are not treated
  as equal.
- **Fairness over time.** FairTime remembers who has been inconvenienced
  before. Whoever had the hardest slot last time gets priority in the next
  booking, so the burden is shared across meetings and not dumped on the same
  person every time.


## How it works

1. **Connect** calendars from [list platforms, e.g. Google Calendar, Outlook].
2. **Combine** everyone's availability into one view.
3. **Score** possible times with a fairness algorithm [one or two sentences:
   what does it balance? e.g. time-of-day, who has compromised before].
4. **Book** the chosen slot, which is pushed back into each calendar.

A browser extension lets you do this without leaving your calendar.

## Tech stack

- **Framework:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS 4
- **Database:** PostgreSQL on TigerData
- **AI:** Google Gemini via
- **Testing:** Vitest
- **Hosting:** Vercel

## Getting started

Requirements: Node.js [version] and a PostgreSQL database.

    git clone https://github.com/yusiaeng/fairtime.git
    cd fairtime
    npm install

Create a `.env.local` file with:

    DATABASE_URL=
    [other variables, e.g. calendar API keys, Gemini API key]

Set up the database using the files in `/database` 
then start the app:

    npm run dev

Open http://localhost:3000.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run start` | Run the production build |
| `npm run lint` | Check code style with ESLint |
| `npm test` | Run the test suite with Vitest |

### Chrome extension (developer mode)

The extension isn't on the Chrome Web Store yet, so load it manually:

1. Open `chrome://extensions` in Chrome.
2. Turn on **Developer mode** (top right).
3. Click **Load unpacked** and select the [extension folder name] folder.

## Project structure

    database/   Database schema and setup files [confirm]
    public/     Static assets
    src/        Application code [add subfolders, e.g. app, lib]



## What's next

- **Make setup seamless.** The Chrome extension currently runs in developer
  mode only, so it has to be loaded manually. With more time I'd publish it to
  the Chrome Web Store so anyone can install it in one click.
- **Smoother calendar connection.** Linking calendars should feel effortless,
  with as few steps as possible.
- **Simpler UX design.** I'd keep refining the interface until using FairTime
  is incredibly easy, because the goal was always to make a mundane job faster
  and more seamless.

