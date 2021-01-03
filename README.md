# Voicey for Wear OS
An AAC app for WearOS devices


## Important
@nativescript/firebase imports 19.2.0 of the firebase android authentication library
we need minimum 20 to work, (20.0.1 is latest ATM), so after configuring/npm installing you will need to replace any instances of 19.2.0 in gradle/plugin config with 20.0.1 (or a later version).
(grep "19\.2\.0" * -R works nicely for finding them).