## Passos realizados...

### 1

docker compose up --build

### 2

docker compose exec app bash
npm install jest @types/jest --save-dev
npx jest --init

### 2.1 Adicionando compilador SWC

npm install @swc/core @swc/jest --save-dev

No jest.config.ts:
testRegex: ".*\\..*spec\\.ts$",
transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
},
