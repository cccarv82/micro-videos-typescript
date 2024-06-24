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

### 3

adding powerlevel10k as zsh theme
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k

in ~/.zshrc:
ZSH_THEME="powerlevel10k/powerlevel10k"
alias dockerdeleteall="docker rm -vf $(docker ps -a -q)"
alias dockerstopall="docker stop $(docker ps -a -q)"
alias k="kubectl"
alias repoinit="commitizen init cz-conventional-changelog --save-dev --save-exact"
[[! -f ~/.p10k.zsh]] || source ~/.p10k.zsh
