#!/bin/sh
title Vyond 2018
#! Install Vyond 2018
if exist notinstalled (
echo = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
echo Vyond 2018 is not installed! Installing...
echo = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
npm install
ren "notinstalled" "installed"
)
#!Start Vyond 2018
echo = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
echo Vyond 2018 is now starting...
echo Please navigate to http://localhost or http://localhost:80 in your browser.
echo = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
npm start
