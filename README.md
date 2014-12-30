# Reverse Photography

**An iPad web application used to control the display of a selectd picture which is captured via a long exposure on a stationary camera.**

Here are some of my initial rough tests:

![back-yard-1000](https://cloud.githubusercontent.com/assets/218624/5576131/ae6d251a-8fa7-11e4-9105-cb3237daab25.gif)

![bathroom-1000](https://cloud.githubusercontent.com/assets/218624/5576132/ae6e732a-8fa7-11e4-9f5e-72df342986ce.gif)

![p1010724](https://cloud.githubusercontent.com/assets/218624/5576037/745a7628-8fa4-11e4-813c-9703da7b161e.jpg)

![p1010725](https://cloud.githubusercontent.com/assets/218624/5576040/745d8ae8-8fa4-11e4-8053-431becd33a38.jpg)

![p1010728](https://cloud.githubusercontent.com/assets/218624/5576041/745d9eb6-8fa4-11e4-8721-1f1c0f1bf717.jpg)

… more examples to come. Stay tuned! :smile:

## Instructions

This app/idea is still a work in progress … With that in mind, below is an outline of how to use this app.

### Tools needed

1. iPad
1. Tripod
1. Camera with ability to take long exposures in low light
1. Internet connection
1. [Frameless app](https://itunes.apple.com/us/app/frameless-full-screen-web/id933580264) (this removes unwanted browser chrome)

### Steps

1. Take or collect photos and put on your iPad camera roll
1. Wait for night and/or find a room/location with very little ambient light
1. Put camera on tripod and set exposure to 30 seconds (or more) and enable the self timer
1. [Visit my web app](http://mky.io/reverse-photography/demo/) using [Frameless](https://itunes.apple.com/us/app/frameless-full-screen-web/id933580264) (load page when internet is available, and then move to location for shoot)
1. Input desired options or use default and choose an image from your device
1. Begin long exposure with your camera (self timer should be enabled)
1. When camera begins exposure, click the “Submit” button
1. Hold iPad facing camera and shift camera to left, right and downward depending on beep noise heard
1. Once photo completes steps, touch the screen to start over
1. Refresh web page to use a new photo

### Beeps

1. Upon hearing [this beep](https://raw.githubusercontent.com/mhulse/reverse-photography/gh-pages/demo/beep1.mp3) shift ipad to left one iPad length
1. For each beep, continue shifting iPad to left
1. When you hear [this beep](https://raw.githubusercontent.com/mhulse/reverse-photography/gh-pages/demo/beep2.mp3) then shift the iPad down one iPad length
1. For odd rows, shift iPad to the left
1. For even rows, shift iPad to the right

That’s it. Have fun! Experiment. :+1:

## Future

1. Optimize JS (IIFE, plugin, OOP, yadda …)
1. Make app use HTML5 local storage so it can be used offline
1. Better docs
1. Better styles
1. Make intro page accessible at any time
1. Make intro page fade out, then click to play (this would avoid exposing form controls)
