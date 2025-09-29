## Discussion

### notes

- Created a GitHub repo for the assignment and copied the files to main branch
- Discovered a bug immediately upon initial run, fixed and moved on

### task division

I divided this assignment into 4 main parts and worked on each at different times

1. discovery, setup, create initial stable version with functional search
2. enhance search functionality, make more dynamic with fewer steps
3. create alternative presentation using cards instead of table, more modern approach
4. convert to postgres data source

#### using postgres

I was able to get this working doing the following:

- Downloaded Docker Desktop
- unremmed DATABASE_URL in .env
- modified route.ts - use db.select() instead of advocateData
- $ docker compose up -d
- inspected database
  - note: solaceassignment database exists
- $ npx drizzle-kit push
- status: page is blank, getting data:[] back
- $ curl -X POST http://localhost:3000/api/seed
- we now have advocate data again

#### performance considerations

- debounce to delay filtering with larger data sets
- pagination for larger data sets as well
