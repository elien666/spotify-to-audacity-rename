# Spotify Rename MP3

Simple script to rename a bunch of MP3 files recorded with Audactiy from Spotify and exported as separate labelled tracks to ```{track} {Artist} - {Title}```.

# How-to

1. Record spotify playlist with Audacity via Synium Audio device
2. Save playlist as CSV, e.g. https://www.tunemymusic.com/de/transfer/spotify-to-file
3. Save CSV with columns ```track;title;artist;…```, e.g. using Apple Numbers
4. Configure ```const```values in ```rename.js```
5. Run with Bun

       $ bun rename.js