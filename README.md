# REMEMBER; THIS IS AN UNOFFICIAL PROJECT, USE AT YOUR OWN RISK

# About
A wrapper/web-extension to the popular school management platform, ManageBac. While this project's intended use is to be able to have a desktop based application for ManageBac, it also intends to extend it by incorportating a theming "engine" and plugin "engine".

# Installing
You only need to git clone and install dependencies, which is:
```
git clone https://github.com/robigan/ManageBack_ToBasics.git && npm run install
```

# Straight to compiling
There is a small script in package.json that will do everything for you (including installing deps and compiling), to use it, just run the following command:
```
git clone https://github.com/robigan/ManageBack_ToBasics.git --depth 1 && npm install --production=false && npm run build
```