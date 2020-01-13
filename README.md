# space game

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

## Game overview
```
Key concepts:
[Demo Link](https://space-game-fb8cc.firebaseapp.com)
The game is built using html canvas element representing the space and the mouse cursor representing the spaceship

Astroids:
- As soon as the user starts the game, asteroids are created using a constructor and are pushed into an array.
- Each asteroid has attributes for position, speed, behavior(+ve or -ve), radius and a function to update it's position and
a function to draw the asteroid on canvas.
- With every frame the canvas is cleared and the position of asteroids are updated and redrawn.
- Depending upon the behaviour of the asteroid, the number of collisions increase or gives a booster to spaceship
- +ve asteroids appear once per minute


Levels:
- Levels are updated calling a function once every 1.5 minute.
- With increase of levels, the radii, positions & speed of asteroids increases and new asteroids are pushed into the array.
- A custom snackBar appears on right side of the screen on each increment of level


Spaceship:
- Position of spaceship are just the coordinates of mouse in the canvas
- The position is updated listening to "mousemove" event.


Collision:
- A collision function is called with every frame which looks for collision and performs further actions on basis of collided asteroid's behaviour
- An asteroid is considered to be collided if x-coordinate of cursor lies between the diameter of asteroid on x-axis and y-coordinate of cursor lies between the diameter of asteroid on y-axis
- If the collision is with a +ve asteroid and the booster of asteroid is shield, further collisions for next 30sec are not taken into consideration

```

## Project structure
```
src
    assets
        fonts(proximanova)
    constructors
        asteroid.js(exports a constructor function to create new asteroid)
    pages
        game.vue(file containing canvas and related login)
    plugins
        appSnackBar(plugin for custom notification bar)
    scss
        main.scss(contains all the css classes used in game.vue)
    utils
        goodAsteroidMapping.js (exports an array of goodAsteroid action options)
```