[![Netlify Status](https://api.netlify.com/api/v1/badges/d1eeaa2a-6c5b-4363-bb21-c1b5b061cf5d/deploy-status)](https://app.netlify.com/sites/boaz-demo/deploys)

# BOAZ - Marketplace
- name: BOAZ
- version: 1.0.0
- description: BOAZ - Marketplace

# Author
- author:
    - name: BOAZ
    - url: https://github.com/imb-tech

# Repository
repository:
    - type: git
    - url: https://github.com/imb-tech/boaz

# Versions
- node: 22.12.0
- npm: 10.9.0

# Install dependencies
- git clone https://github.com/imb-tech/boaz.git
- cd boaz
- npm install
- npm run dev

# Build
- build:
    - command: npm run build
