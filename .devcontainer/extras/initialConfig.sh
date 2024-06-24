#!/bin/bash

git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k

# echo 'alias dockerdeleteall="docker rm -vf $(docker ps -a -q)"' >> ~/.zshrc

# echo 'alias dockerstopall="docker stop $(docker ps -a -q)"' >> ~/.zshrc

# echo 'alias k="kubectl"' >> ~/.zshrc

echo '[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh' >> ~/.zshrc

sed -i 's/^ZSH_THEME="devcontainers"$/ZSH_THEME="powerlevel10k\/powerlevel10k"/' ~/.zshrc

cp .devcontainer/extras/.p10k.zsh ~/.p10k.zsh