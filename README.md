# chatter-chain

## Scripts:
- `npm run start`: 
- `npm run test [t]`: Runs the unit and integration tests. Searches for all files that end in ".spec.js" inside "app/pods".
- `npm run test:acceptance [t:a]`: Runs the acceptance tests. Searches for all files that end in ".spec.js" inside "app/test/acceptance". The app needs to be running on `http://localhost:5050` in order for the acceptance tests to work so be sure to `npm run start` first.
- `npm run lint [l]`: Runs the standard linter.
- `npm run seatbelt [sb]`: Runs the linter, then the unit tests, then the acceptance tests.

## Commit Hooks
- pre-commit: Needs to pass linter.
- pre-push: Needs to pass linter and unit tests.
